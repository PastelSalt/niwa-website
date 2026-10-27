import { z } from "zod";

export const ItemTypeSchema = z.enum(["project", "task", "note", "idea"]);
export const ItemStatusSchema = z.enum(["not_started", "in_progress", "blocked", "completed"]);
export const ItemPrioritySchema = z.enum(["none", "low", "medium", "high", "critical"]);

export const CreateItemSchema = z.object({
  workspaceId: z.string().min(1, "Workspace is required"),
  parentId: z.string().nullable().optional(),
  title: z.string().min(1, "Title is required").max(200, "Title must be under 200 characters"),
  description: z.string().optional(),
  type: ItemTypeSchema.default("task"),
  status: ItemStatusSchema.default("not_started"),
  priority: ItemPrioritySchema.default("none"),
  position: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()).default([]),
  dueAt: z.string().datetime().nullable().optional(),
  estimatedMinutes: z.number().int().nonnegative().nullable().optional(),
});

export const UpdateItemSchema = z.object({
  title: z.string().min(1, "Title is required").max(200).optional(),
  description: z.string().optional(),
  type: ItemTypeSchema.optional(),
  status: ItemStatusSchema.optional(),
  priority: ItemPrioritySchema.optional(),
  position: z.number().int().nonnegative().optional(),
  tags: z.array(z.string()).optional(),
  dueAt: z.string().datetime().nullable().optional(),
  estimatedMinutes: z.number().int().nonnegative().nullable().optional(),
  version: z.number().int().nonnegative(),
});

export const MoveItemSchema = z.object({
  parentId: z.string().nullable(),
  position: z.number().int().nonnegative(),
  version: z.number().int().nonnegative(),
});

export type CreateItemInput = z.infer<typeof CreateItemSchema>;
export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;
export type MoveItemInput = z.infer<typeof MoveItemSchema>;
