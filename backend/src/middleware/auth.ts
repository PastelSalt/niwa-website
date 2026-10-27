import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/auth";

export interface AuthRequest extends Request {
  user?: { userId: string; email: string; workspaceId?: string };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const accessToken =
    req.cookies?.["access_token"] ??
    req.headers.authorization?.replace("Bearer ", "");

  if (!accessToken) {
    res.status(401).json({
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication required.",
        details: {},
      },
    });
    return;
  }

  try {
    const payload = verifyAccessToken(accessToken);
    req.user = {
      userId: payload.userId,
      email: payload.email,
      workspaceId: payload.workspaceId,
    };
    next();
  } catch {
    res.status(401).json({
      error: {
        code: "TOKEN_EXPIRED",
        message: "Access token expired or invalid.",
        details: {},
      },
    });
  }
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  if (!req.user) {
    res.status(401).json({
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication required.",
        details: {},
      },
    });
    return;
  }
  next();
}
