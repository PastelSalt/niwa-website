import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
