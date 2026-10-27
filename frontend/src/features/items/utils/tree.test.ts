import { describe, it, expect } from "vitest";
import {
  buildTree,
  findItem,
  toggleExpansion,
} from "@/features/items/utils/tree";
import type { Item } from "@/features/items/types";

const flatItems: Item[] = [
  {
    id: "item_1",
    workspaceId: "ws_1",
    parentId: null,
    title: "Project A",
    description: "",
    type: "project",
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
    id: "item_2",
    workspaceId: "ws_1",
    parentId: "item_1",
    title: "Task A.1",
    description: "",
    type: "task",
    status: "not_started",
    priority: "none",
    position: 1,
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
    parentId: "item_1",
    title: "Task A.2",
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
    id: "item_4",
    workspaceId: "ws_1",
    parentId: "item_2",
    title: "Subtask A.1.1",
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
];

describe("buildTree", () => {
  it("builds a tree from flat items", () => {
    const tree = buildTree(flatItems);
    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe("item_1");
    expect(tree[0].children).toHaveLength(2);
    // children sorted by position
    expect(tree[0].children[0].id).toBe("item_3");
    expect(tree[0].children[1].id).toBe("item_2");
    expect(tree[0].children[1].children).toHaveLength(1);
    expect(tree[0].children[1].children[0].id).toBe("item_4");
  });

  it("marks all nodes as expanded by default", () => {
    const tree = buildTree(flatItems);
    expect(tree[0].isExpanded).toBe(true);
    expect(tree[0].children[0].isExpanded).toBe(true);
  });
});

describe("findItem", () => {
  it("finds root item", () => {
    const tree = buildTree(flatItems);
    const found = findItem(tree, "item_1");
    expect(found?.id).toBe("item_1");
  });

  it("finds deeply nested item", () => {
    const tree = buildTree(flatItems);
    const found = findItem(tree, "item_4");
    expect(found?.id).toBe("item_4");
    expect(found?.title).toBe("Subtask A.1.1");
  });

  it("returns undefined for unknown item", () => {
    const tree = buildTree(flatItems);
    const found = findItem(tree, "item_999");
    expect(found).toBeUndefined();
  });
});

describe("toggleExpansion", () => {
  it("toggles expansion of a node", () => {
    const tree = buildTree(flatItems);
    const toggled = toggleExpansion(tree, "item_1");
    expect(toggled[0].isExpanded).toBe(false);
  });

  it("does not affect other nodes", () => {
    const tree = buildTree(flatItems);
    const toggled = toggleExpansion(tree, "item_1");
    expect(toggled[0].children[1].isExpanded).toBe(true);
  });

  it("returns unchanged tree for unknown id", () => {
    const tree = buildTree(flatItems);
    const toggled = toggleExpansion(tree, "item_999");
    expect(toggled).toEqual(tree);
  });
});
