import { Response } from "express";
import { getDatabase } from "../lib/db";
import { createError } from "../middleware/error";
import {
  createItemSchema,
  updateItemSchema,
  moveItemSchema,
} from "../models/item.schema";
import type { AuthRequest } from "../middleware/auth";
import { ObjectId } from "mongodb";

function now(): Date {
  return new Date();
}

function serializeItem(doc: any): any {
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
    archivedAt: doc.archivedAt?.toISOString() ?? null,
    children: doc.children,
  };
}

export async function createItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");

  const input = createItemSchema.parse(req.body);
  const workspaceId = input.workspaceId;

  const t = now();

  let parent: any = null;
  if (input.parentId) {
    parent = await items.findOne({
      _id: new ObjectId(input.parentId),
      workspaceId,
    });
    if (!parent) {
      throw createError("Parent item not found.", 404, "PARENT_NOT_FOUND");
    }
  }

  const result = await items.insertOne({
    workspaceId,
    parentId: input.parentId ?? null,
    title: input.title,
    description: input.description ?? "",
    type: input.type,
    status: input.status,
    priority: input.priority,
    position: input.position,
    tags: input.tags,
    dueAt: input.dueAt,
    estimatedMinutes: input.estimatedMinutes,
    version: 1,
    createdAt: t,
    updatedAt: t,
    completedAt: null,
  });

  const item = await items.findOne({ _id: result.insertedId });
  res.status(201).json({ item: serializeItem(item!) });
}

export async function getItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const item = await items.findOne({
    _id: new ObjectId(itemId),
    workspaceId: req.user?.workspaceId,
  });
  if (!item) {
    throw createError("Item not found.", 404, "ITEM_NOT_FOUND");
  }

  res.json({ item: serializeItem(item) });
}

export async function updateItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const input = updateItemSchema.parse(req.body);

  const item = await items.findOne({
    _id: new ObjectId(itemId),
    workspaceId: req.user?.workspaceId,
  });
  if (!item) {
    throw createError("Item not found.", 404, "ITEM_NOT_FOUND");
  }

  if ((item as any).version !== input.version) {
    throw createError(
      "Item has been modified by another client. Please reload and try again.",
      409,
      "CONFLICT",
    );
  }

  const update: Record<string, unknown> = {
    ...input,
    version: (item as any).version + 1,
    updatedAt: now(),
  };
  delete update.version;

  if (input.status === "completed" && (item as any).status !== "completed") {
    update.completedAt = now();
  } else if (input.status !== "completed") {
    update.completedAt = null;
  }

  const result = await items.findOneAndUpdate(
    { _id: new ObjectId(itemId), version: (item as any).version },
    { $set: update },
    { returnDocument: "after" },
  );

  if (!result) {
    throw createError(
      "Item has been modified by another client. Please reload and try again.",
      409,
      "CONFLICT",
    );
  }

  res.json({ item: serializeItem(result) });
}

export async function deleteItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const result = await items.deleteOne({
    _id: new ObjectId(itemId),
    workspaceId: req.user?.workspaceId,
  });

  if (result.deletedCount === 0) {
    throw createError("Item not found.", 404, "ITEM_NOT_FOUND");
  }

  res.json({ ok: true });
}

export async function getChildren(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const docs = await items
    .find({
      parentId: itemId,
      workspaceId: req.user?.workspaceId,
    })
    .sort({ position: 1 })
    .toArray();

  res.json({
    items: docs.map(serializeItem),
  });
}

export async function getTree(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;
  void itemId;
  const workspaceId = req.user?.workspaceId;

  const allDocs = await items
    .find({ workspaceId })
    .sort({ position: 1 })
    .toArray();

  const itemMap = new Map<string, any>();
  const childrenMap = new Map<string | null, any[]>();

  for (const doc of allDocs) {
    itemMap.set(doc._id.toString(), serializeItem(doc));
    const pid = doc.parentId ?? null;
    if (!childrenMap.has(pid)) {
      childrenMap.set(pid, []);
    }
    childrenMap.get(pid)!.push(doc);
  }

  for (const [pid, children] of childrenMap) {
    const parent = itemMap.get(pid ?? "");
    if (parent) {
      parent.children = children
        .map((c) => itemMap.get(c._id.toString())!)
        .sort((a: any, b: any) => a.position - b.position);
    }
  }

  const roots: any[] = [];
  for (const doc of allDocs) {
    if (!doc.parentId) {
      roots.push(itemMap.get(doc._id.toString())!);
    }
  }

  res.json({
    items: roots.sort((a: any, b: any) => a.position - b.position),
  });
}

export async function moveItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const input = moveItemSchema.parse(req.body);

  const item = await items.findOne({
    _id: new ObjectId(itemId),
    workspaceId: req.user?.workspaceId,
  });
  if (!item) {
    throw createError("Item not found.", 404, "ITEM_NOT_FOUND");
  }

  if ((item as any).version !== input.version) {
    throw createError(
      "Item has been modified by another client.",
      409,
      "CONFLICT",
    );
  }

  if (input.parentId === itemId) {
    throw createError("Cannot move item to itself.", 400, "CYCLE_DETECTED");
  }

  if (input.parentId) {
    const wouldBeParent = await items.findOne({
      _id: new ObjectId(input.parentId),
      workspaceId: req.user?.workspaceId,
    });
    if (!wouldBeParent) {
      throw createError("Parent item not found.", 404, "PARENT_NOT_FOUND");
    }

    if (await isDescendant(db, input.parentId, itemId, req.user?.workspaceId)) {
      throw createError(
        "Cannot move item to its own descendant.",
        400,
        "CYCLE_DETECTED",
      );
    }
  }

  const result = await items.findOneAndUpdate(
    { _id: new ObjectId(itemId), version: (item as any).version },
    {
      $set: {
        parentId: input.parentId ?? null,
        position: input.position,
        version: (item as any).version + 1,
        updatedAt: now(),
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    throw createError(
      "Item has been modified by another client.",
      409,
      "CONFLICT",
    );
  }

  res.json({ ok: true });
}

export async function archiveItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const result = await items.findOneAndUpdate(
    {
      _id: new ObjectId(itemId),
      workspaceId: req.user?.workspaceId,
    },
    {
      $set: {
        archivedAt: now(),
        updatedAt: now(),
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    throw createError("Item not found.", 404, "ITEM_NOT_FOUND");
  }

  res.json({ ok: true });
}

export async function restoreItem(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  const db = await getDatabase();
  const items = db.collection("items");
  const { itemId } = req.params;

  const result = await items.findOneAndUpdate(
    {
      _id: new ObjectId(itemId),
      workspaceId: req.user?.workspaceId,
    },
    {
      $set: {
        archivedAt: null,
        updatedAt: now(),
      },
    },
    { returnDocument: "after" },
  );

  if (!result) {
    throw createError("Item not found.", 404, "ITEM_NOT_FOUND");
  }

  res.json({ ok: true });
}

async function isDescendant(
  db: any,
  possibleDescendantId: string,
  ancestorId: string,
  workspaceId: string | undefined,
): Promise<boolean> {
  let currentId: string | null = possibleDescendantId;
  const visited = new Set<string>();

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId);
    if (currentId === ancestorId) {
      return true;
    }
    const doc: any = await db
      .collection("items")
      .findOne({ _id: new ObjectId(currentId), workspaceId });
    currentId = (doc as any)?.parentId ?? null;
  }

  return false;
}
