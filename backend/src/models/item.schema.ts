import { z } from "zod";

export const itemTypeSchema = z.enum(["project", "task", "note", "idea"]);
export const itemStatusSchema = z.enum([
  "not_started",
  "in_progress",
  "blocked",
  "completed",
]);
export const itemPrioritySchema = z.enum([
  "none",
  "low",
  "medium",
  "high",
  "critical",
]);

export const createItemSchema = z.object({
  workspaceId: z.string().min(1, "Workspace is required"),
  parentId: z.string().nullable().optional(),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().optional(),
  type: itemTypeSchema.default("task"),
  status: itemStatusSchema.default("not_started"),
  priority: itemPrioritySchema.default("none"),
  position: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()).default([]),
  dueAt: z.string().datetime().nullable().optional(),
  estimatedMinutes: z.number().int().nonnegative().nullable().optional(),
});

export const updateItemSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  type: itemTypeSchema.optional(),
  status: itemStatusSchema.optional(),
  priority: itemPrioritySchema.optional(),
  position: z.number().int().nonnegative().optional(),
  tags: z.array(z.string()).optional(),
  dueAt: z.string().datetime().nullable().optional(),
  estimatedMinutes: z.number().int().nonnegative().nullable().optional(),
  version: z.number().int().nonnegative(),
});

export const moveItemSchema = z.object({
  parentId: z.string().nullable(),
  position: z.number().int().nonnegative(),
  version: z.number().int().nonnegative(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type MoveItemInput = z.infer<typeof moveItemSchema>;
