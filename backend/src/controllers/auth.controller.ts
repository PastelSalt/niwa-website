import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  getCookieOptions,
} from "../lib/auth.js";
import { getDatabase } from "../lib/db.js";
import { registerSchema, loginSchema } from "../models/auth.schema.js";
import { createError } from "../middleware/error.js";
import { compareSync, hashSync } from "bcryptjs";
import { ObjectId } from "mongodb";
import { getEnv } from "../config/env.js";

function parseMs(expiry: string): number {
  const match = expiry.match(/^(\d+)([mhd])$/);
  if (!match) return 15 * 60 * 1000;
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    case "d": return value * 24 * 60 * 60 * 1000;
    default: return 15 * 60 * 1000;
  }
}

export async function register(
  req: Request,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const users = db.collection("users");
  const workspaces = db.collection("workspaces");

  const input = registerSchema.parse(req.body);

  const existing = await users.findOne({ email: input.email });
  if (existing) {
    throw createError("Email already registered.", 409, "EMAIL_EXISTS");
  }

  const passwordHash = hashSync(input.password, 12);

  const now = new Date();

  const result = await users.insertOne({
    email: input.email,
    passwordHash,
    name: input.name ?? null,
    createdAt: now,
    updatedAt: now,
  });

  const userId = result.insertedId.toString();

  const workspaceResult = await workspaces.insertOne({
    name: `${input.email}'s Workspace`,
    ownerId: userId,
    members: [userId],
    createdAt: now,
    updatedAt: now,
  });

  const workspaceId = workspaceResult.insertedId.toString();

  await users.updateOne(
    { _id: result.insertedId },
    { $set: { workspaceId, updatedAt: now } },
  );

  const tokenPayload = {
    userId,
    email: input.email,
    workspaceId,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  const cookieOpts = getCookieOptions();

  res.cookie("access_token", accessToken, cookieOpts);
  res.cookie("refresh_token", refreshToken, cookieOpts);

  res.status(201).json({
    user: {
      id: userId,
      email: input.email,
      name: input.name ?? null,
      avatarUrl: null,
      workspaceId,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    session: {
      accessToken,
      refreshToken,
      expiresAt: new Date(
        Date.now() + parseMs(getEnv().JWT_ACCESS_EXPIRY),
      ).toISOString(),
    },
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const db = await getDatabase();
  const users = db.collection("users");

  const input = loginSchema.parse(req.body);

  const user = await users.findOne({ email: input.email });
  if (!user) {
    throw createError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
  }

  const valid = compareSync(input.password, (user as any).passwordHash);
  if (!valid) {
    throw createError("Invalid email or password.", 401, "INVALID_CREDENTIALS");
  }

  const tokenPayload = {
    userId: (user as any)._id.toString(),
    email: (user as any).email,
    workspaceId: (user as any).workspaceId,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  const cookieOpts = getCookieOptions();

  res.cookie("access_token", accessToken, cookieOpts);
  res.cookie("refresh_token", refreshToken, cookieOpts);

  res.json({
    user: {
      id: (user as any)._id.toString(),
      email: (user as any).email,
      name: (user as any).name ?? null,
      avatarUrl: null,
      workspaceId: (user as any).workspaceId,
      createdAt: (user as any).createdAt
        ? (user as any).createdAt.toISOString()
        : new Date().toISOString(),
      updatedAt: (user as any).updatedAt
        ? (user as any).updatedAt.toISOString()
        : new Date().toISOString(),
    },
    session: {
      accessToken,
      refreshToken,
      expiresAt: new Date(
        Date.now() + parseMs(getEnv().JWT_ACCESS_EXPIRY),
      ).toISOString(),
    },
  });
}

export async function logout(_req: Request, res: Response): Promise<void> {
  const cookieOpts = getCookieOptions();
  res.clearCookie("access_token", cookieOpts);
  res.clearCookie("refresh_token", cookieOpts);
  res.json({ ok: true });
}

export async function me(req: Request, res: Response): Promise<void> {
  const db = await getDatabase();
  const users = db.collection("users");

  const userId = (req as any).user?.userId;
  if (!userId) {
    throw createError("Authentication required.", 401, "UNAUTHENTICATED");
  }

  const user = await users.findOne({
    _id: new ObjectId(userId),
  });
  if (!user) {
    throw createError("User not found.", 404, "USER_NOT_FOUND");
  }

  res.json({
    user: {
      id: (user as any)._id.toString(),
      email: (user as any).email,
      name: (user as any).name ?? null,
      avatarUrl: null,
      workspaceId: (user as any).workspaceId,
      createdAt: (user as any).createdAt
        ? (user as any).createdAt.toISOString()
        : new Date().toISOString(),
      updatedAt: (user as any).updatedAt
        ? (user as any).updatedAt.toISOString()
        : new Date().toISOString(),
    },
  });
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const refreshToken =
    (req as any).cookies?.["refresh_token"] ??
    (req as any).body?.refresh_token;

  if (!refreshToken) {
    throw createError("Refresh token required.", 401, "REFRESH_REQUIRED");
  }

  let payload: any;
  try {
    payload = require("../lib/auth").verifyRefreshToken(refreshToken);
  } catch {
    throw createError(
      "Refresh token expired or invalid.",
      401,
      "TOKEN_EXPIRED",
    );
  }

  const tokenPayload = {
    userId: payload.userId,
    email: payload.email,
    workspaceId: payload.workspaceId,
  };

  const accessToken = generateAccessToken(tokenPayload);

  const cookieOpts = getCookieOptions();
  res.cookie("access_token", accessToken, cookieOpts);

  res.json({
    accessToken,
    expiresAt: new Date(
      Date.now() + parseMs(getEnv().JWT_ACCESS_EXPIRY),
    ).toISOString(),
  });
}
