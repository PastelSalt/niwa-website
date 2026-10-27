import { Response } from "express";
import { getDatabase } from "../lib/db";
import type { AuthRequest } from "../middleware/auth";

export async function searchItems(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { q } = req.query;
  const workspaceId = req.user?.workspaceId;

  if (!q || typeof q !== "string") {
    res.json({ results: [], query: "" });
    return;
  }

  const searchRegex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const docs = await items
    .find({
      workspaceId,
      $or: [
        { title: searchRegex },
        { description: searchRegex },
      ],
    })
    .sort({ updatedAt: -1 })
    .limit(50)
    .toArray();

  res.json({
    results: docs.map(serializeSearchResult),
    query: q,
  });
}

function serializeSearchResult(doc: any): any {
  return {
    id: doc._id.toString(),
    workspaceId: doc.workspaceId,
    parentId: doc.parentId,
    title: doc.title,
    description: doc.description,
    type: doc.type,
    status: doc.status,
    priority: doc.priority,
    position: doc.position,
    tags: doc.tags,
    dueAt: doc.dueAt,
    estimatedMinutes: doc.estimatedMinutes,
    version: doc.version,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    completedAt: doc.completedAt?.toISOString() ?? null,
  };
}
