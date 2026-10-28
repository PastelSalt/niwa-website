import { createRequire } from "node:module";
import { getEnv } from "../config/env.js";

const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");
const sign = jwt.sign;
const verify = jwt.verify;
type Secret = string | Buffer;

const env = getEnv();

const ACCESS_SECRET: Secret = env.JWT_ACCESS_SECRET as Secret;
const REFRESH_SECRET: Secret = env.JWT_REFRESH_SECRET as Secret;

export interface TokenPayload {
  userId: string;
  email: string;
  workspaceId?: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return (sign as any)(payload, ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY,
    issuer: "niwa",
    audience: "niwa-web",
  });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return (sign as any)(payload, REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY,
    issuer: "niwa",
    audience: "niwa-web",
  });
}

export function verifyAccessToken(token: string): TokenPayload {
  return (verify as any)(token, ACCESS_SECRET, {
    issuer: "niwa",
    audience: "niwa-web",
  }) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return (verify as any)(token, REFRESH_SECRET, {
    issuer: "niwa",
    audience: "niwa-web",
  }) as TokenPayload;
}

export function getCookieOptions(): Record<string, unknown> {
  return {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE,
    path: "/",
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  };
}
