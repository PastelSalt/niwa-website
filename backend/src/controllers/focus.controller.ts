import { Response } from "express";
import { getDatabase } from "../lib/db.js";
import type { AuthRequest } from "../middleware/auth.js";

export async function getFocus(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const workspaceId = req.user?.workspaceId;

  const { projectId, status, priority, tag } = req.query;

  const filter: any = {
    workspaceId,
    archivedAt: null,
  };

  if (projectId) filter.parentId = projectId;
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (tag) filter.tags = tag;

  const docs = await items.find(filter).sort({ updatedAt: -1 }).limit(100).toArray();

  const sections: any[] = [];

  const inProgress = docs.filter((d: any) => d.status === "in_progress");
  const highPriority = docs.filter(
    (d: any) => d.priority === "high" || d.priority === "critical",
  );
  const overdue = docs.filter(
    (d: any) =>
      d.dueAt &&
      new Date(d.dueAt) < new Date() &&
      d.status !== "completed",
  );
  const upcoming = docs.filter(
    (d: any) =>
      d.dueAt &&
      new Date(d.dueAt) >= new Date() &&
      new Date(d.dueAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) &&
      d.status !== "completed",
  );
  const recentlyUpdated = docs.slice(0, 10);

  if (inProgress.length > 0) {
    sections.push({
      id: "in_progress",
      title: "In Progress",
      items: inProgress.map(serializeFocusItem),
    });
  }
  if (highPriority.length > 0) {
    sections.push({
      id: "high_priority",
      title: "High Priority",
      items: highPriority.map(serializeFocusItem),
    });
  }
  if (overdue.length > 0) {
    sections.push({
      id: "overdue",
      title: "Overdue",
      items: overdue.map(serializeFocusItem),
    });
  }
  if (upcoming.length > 0) {
    sections.push({
      id: "upcoming",
      title: "Upcoming",
      items: upcoming.map(serializeFocusItem),
    });
  }
  if (recentlyUpdated.length > 0) {
    sections.push({
      id: "recently_updated",
      title: "Recently Updated",
      items: recentlyUpdated.map(serializeFocusItem),
    });
  }

  res.json({ sections });
}

export async function getFocusOverdue(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const workspaceId = req.user?.workspaceId;

  const docs = await items
    .find({
      workspaceId,
      archivedAt: null,
      status: { $ne: "completed" },
      dueAt: { $lt: new Date() },
    })
    .sort({ dueAt: 1 })
    .limit(50)
    .toArray();

  res.json({
    sections: [
      {
        id: "overdue",
        title: "Overdue",
        items: docs.map(serializeFocusItem),
      },
    ],
  });
}

export async function getFocusUpcoming(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const workspaceId = req.user?.workspaceId;

  const now = new Date();
  const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const docs = await items
    .find({
      workspaceId,
      archivedAt: null,
      status: { $ne: "completed" },
      dueAt: { $gte: now, $lte: weekLater },
    })
    .sort({ dueAt: 1 })
    .limit(50)
    .toArray();

  res.json({
    sections: [
      {
        id: "upcoming",
        title: "Upcoming",
        items: docs.map(serializeFocusItem),
      },
    ],
  });
}

function serializeFocusItem(doc: any): any {
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
