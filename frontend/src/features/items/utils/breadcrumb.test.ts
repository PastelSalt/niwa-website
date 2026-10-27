import { describe, it, expect } from "vitest";
import { buildBreadcrumb } from "@/features/items/utils/breadcrumb";
import type { Item } from "@/features/items/types";

const items: Item[] = [
  {
    id: "item_1",
    workspaceId: "ws_1",
    parentId: null,
    title: "Project A",
    description: "",
    type: "project",
    status: "in_progress",
    priority: "medium",
    position: 0,
    tags: [],
    dueAt: null,
    estimatedMinutes: null,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    completedAt: null,
  },
  {
    id: "item_2",
    workspaceId: "ws_1",
    parentId: "item_1",
    title: "Task A.1",
    description: "",
    type: "task",
    status: "not_started",
    priority: "none",
    position: 0,
    tags: [],
    dueAt: null,
    estimatedMinutes: null,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    completedAt: null,
  },
  {
    id: "item_3",
    workspaceId: "ws_1",
    parentId: "item_2",
    title: "Subtask A.1.1",
    description: "",
    type: "task",
    status: "not_started",
    priority: "low",
    position: 0,
    tags: [],
    dueAt: null,
    estimatedMinutes: null,
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    completedAt: null,
  },
];

describe("buildBreadcrumb", () => {
  it("builds breadcrumb for root item", () => {
    const result = buildBreadcrumb(items, "item_1");
    expect(result).toEqual([{ id: "item_1", title: "Project A" }]);
  });

  it("builds breadcrumb for nested item", () => {
    const result = buildBreadcrumb(items, "item_3");
    expect(result).toEqual([
      { id: "item_1", title: "Project A" },
      { id: "item_2", title: "Task A.1" },
      { id: "item_3", title: "Subtask A.1.1" },
    ]);
  });

  it("returns empty array for unknown item", () => {
    const result = buildBreadcrumb(items, "item_999");
    expect(result).toEqual([]);
  });
});
