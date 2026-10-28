import { Response } from "express";
import { getDatabase } from "../lib/db.js";
import { createError } from "../middleware/error.js";
import { createWorkspaceSchema } from "../models/workspace.schema.js";
import type { AuthRequest } from "../middleware/auth.js";
import { ObjectId } from "mongodb";

export async function listWorkspaces(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const workspaces = db.collection("workspaces");
  const userId = req.user?.userId;

  const docs = await workspaces
    .find({ members: userId })
    .sort({ updatedAt: -1 })
    .toArray();

  res.json({
    workspaces: docs.map((w: any) => ({
      id: w._id.toString(),
      name: w.name,
      ownerId: w.ownerId,
      createdAt: w.createdAt?.toISOString(),
      updatedAt: w.updatedAt?.toISOString(),
    })),
  });
}

export async function createWorkspace(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const workspaces = db.collection("workspaces");
  const users = db.collection("users");

  const input = createWorkspaceSchema.parse(req.body);
  const userId = req.user?.userId;
  const now = new Date();

  const result = await workspaces.insertOne({
    name: input.name,
    ownerId: userId,
    members: [userId],
    createdAt: now,
    updatedAt: now,
  });

  const workspaceId = result.insertedId.toString();

  await users.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { workspaceId, updatedAt: now } },
  );

  res.status(201).json({
    workspace: {
      id: workspaceId,
      name: input.name,
      ownerId: userId,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
  });
}

export async function getWorkspace(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const workspaces = db.collection("workspaces");
  const { workspaceId } = req.params;
  const userId = req.user?.userId;

  const ws = await workspaces.findOne({
    _id: new ObjectId(workspaceId),
    members: userId,
  });
  if (!ws) {
    throw createError("Workspace not found.", 404, "WORKSPACE_NOT_FOUND");
  }

  res.json({
    workspace: {
      id: ws._id.toString(),
      name: ws.name,
      ownerId: ws.ownerId,
      createdAt: ws.createdAt?.toISOString(),
      updatedAt: ws.updatedAt?.toISOString(),
    },
  });
}

export async function updateWorkspace(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const workspaces = db.collection("workspaces");
  const { workspaceId } = req.params;
  const userId = req.user?.userId;

  const { name } = req.body;
  if (!name || typeof name !== "string") {
    throw createError("Name is required.", 400, "INVALID_NAME");
  }

  const ws = await workspaces.findOneAndUpdate(
    {
      _id: new ObjectId(workspaceId),
      members: userId,
    },
    { $set: { name, updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  if (!ws) {
    throw createError("Workspace not found.", 404, "WORKSPACE_NOT_FOUND");
  }

  res.json({
    workspace: {
      id: ws._id.toString(),
      name: ws.name,
      ownerId: ws.ownerId,
      createdAt: ws.createdAt?.toISOString(),
      updatedAt: ws.updatedAt?.toISOString(),
    },
  });
}

export async function deleteWorkspace(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const workspaces = db.collection("workspaces");
  const items = db.collection("items");
  const { workspaceId } = req.params;
  const userId = req.user?.userId;

  const ws = await workspaces.findOne({
    _id: new ObjectId(workspaceId),
    ownerId: userId,
  });
  if (!ws) {
    throw createError(
      "Workspace not found or not owned by you.",
      404,
      "WORKSPACE_NOT_FOUND",
    );
  }

  await items.deleteMany({ workspaceId });
  await workspaces.deleteOne({ _id: ws._id });

  res.json({ ok: true });
}
