export interface Item {
  id: string;
  workspaceId: string;
  parentId: string | null;
  title: string;
  description: string;
  type: "project" | "task" | "note" | "idea";
  status: "not_started" | "in_progress" | "blocked" | "completed";
  priority: "none" | "low" | "medium" | "high" | "critical";
  position: number;
  tags: string[];
  dueAt: string | null;
  estimatedMinutes: number | null;
  version: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export interface CreateItemInput {
  workspaceId: string;
  parentId?: string | null;
  title: string;
  description?: string;
  type?: Item["type"];
  status?: Item["status"];
  priority?: Item["priority"];
  position?: number;
  tags?: string[];
  dueAt?: string | null;
  estimatedMinutes?: number | null;
}

export interface UpdateItemInput {
  title?: string;
  description?: string;
  type?: Item["type"];
  status?: Item["status"];
  priority?: Item["priority"];
  position?: number;
  tags?: string[];
  dueAt?: string | null;
  estimatedMinutes?: number | null;
  version: number;
}

export interface MoveItemInput {
  parentId: string | null;
  position: number;
  version: number;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
