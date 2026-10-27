import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient } from "@/lib/api-client";
import { itemsApi } from "@/features/items/api/items";
import type { Item } from "@/features/items/types";

vi.mock("@/lib/api-client", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockPost = vi.mocked(apiClient.post);
const mockPatch = vi.mocked(apiClient.patch);
const mockDelete = vi.mocked(apiClient.delete);
const mockGet = vi.mocked(apiClient.get);

const mockItem: Item = {
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
};

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Item API integration — create", () => {
  it("calls POST with create payload", async () => {
    mockPost.mockResolvedValueOnce({ item: mockItem });

    const result = await itemsApi.create({
      workspaceId: "ws_1",
      parentId: null,
      title: "New Project",
    });

    const [url, body] = mockPost.mock.calls[0];
    expect(url).toContain("/items");
    expect(body).toEqual({
      workspaceId: "ws_1",
      parentId: null,
      title: "New Project",
    });
    expect(result.item).toEqual(mockItem);
  });

  it("propagates API errors on create", async () => {
    mockPost.mockRejectedValueOnce(new Error("Validation failed"));

    await expect(
      itemsApi.create({ workspaceId: "ws_1", title: "" })
    ).rejects.toThrow("Validation failed");
  });
});

describe("Item API integration — update with version concurrency", () => {
  it("calls PATCH with version for optimistic concurrency", async () => {
    mockPatch.mockResolvedValueOnce({ item: { ...mockItem, title: "Updated" } });

    const result = await itemsApi.update("item_1", {
      title: "Updated",
      version: mockItem.version,
    });

    const [url, body] = mockPatch.mock.calls[0];
    expect(url).toContain("/items/item_1");
    expect(body).toEqual({
      title: "Updated",
      version: mockItem.version,
    });
    expect(result.item.title).toBe("Updated");
  });
});

describe("Item API integration — delete", () => {
  it("calls DELETE /items/:id", async () => {
    mockDelete.mockResolvedValueOnce({ ok: true });

    const result = await itemsApi.delete("item_1");

    const [url] = mockDelete.mock.calls[0];
    expect(url).toContain("/items/item_1");
    expect(result.ok).toBe(true);
  });
});

describe("Item API integration — children and tree", () => {
  it("calls GET /items/:id/children", async () => {
    mockGet.mockResolvedValueOnce({ items: [mockItem] });

    const result = await itemsApi.children("item_1");

    const [url] = mockGet.mock.calls[0];
    expect(url).toContain("/items/item_1/children");
    expect(result.items).toEqual([mockItem]);
  });

  it("calls GET /items/:id/tree", async () => {
    mockGet.mockResolvedValueOnce({ items: [mockItem] });

    const result = await itemsApi.tree("item_1");

    const [url] = mockGet.mock.calls[0];
    expect(url).toContain("/items/item_1/tree");
    expect(result.items).toEqual([mockItem]);
  });
});

describe("Item API integration — move and archive", () => {
  it("calls POST /items/:id/move", async () => {
    mockPost.mockResolvedValueOnce({ ok: true });

    const result = await itemsApi.move("item_1", {
      parentId: "item_2",
      position: 0,
      version: 1,
    });

    const [url, body] = mockPost.mock.calls[0];
    expect(url).toContain("/items/item_1/move");
    expect(body).toEqual({
      parentId: "item_2",
      position: 0,
      version: 1,
    });
    expect(result.ok).toBe(true);
  });

  it("calls POST /items/:id/archive", async () => {
    mockPost.mockResolvedValueOnce({ ok: true });

    const result = await itemsApi.archive("item_1");

    const [url] = mockPost.mock.calls[0];
    expect(url).toContain("/items/item_1/archive");
    expect(result.ok).toBe(true);
  });

  it("calls POST /items/:id/restore", async () => {
    mockPost.mockResolvedValueOnce({ ok: true });

    const result = await itemsApi.restore("item_1");

    const [url] = mockPost.mock.calls[0];
    expect(url).toContain("/items/item_1/restore");
    expect(result.ok).toBe(true);
  });
});
