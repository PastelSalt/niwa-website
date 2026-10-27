import { describe, it, expect } from "vitest";
import {
  CreateItemSchema,
  UpdateItemSchema,
  MoveItemSchema,
  ItemTypeSchema,
  ItemStatusSchema,
  ItemPrioritySchema,
} from "@/features/items/schemas";

describe("Item validation schemas", () => {
  describe("CreateItemSchema", () => {
    it("accepts a valid create item input", () => {
      const input = {
        workspaceId: "workspace_123",
        title: "Test item",
        type: "task",
        status: "not_started",
        priority: "medium",
        position: 0,
        tags: ["java"],
      };
      const result = CreateItemSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("rejects missing title", () => {
      const result = CreateItemSchema.safeParse({
        workspaceId: "workspace_123",
        title: "",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        // Zod v4 uses .issues instead of .errors
        const issues = (result.error as { issues: Array<{ path: (string | number)[] }> }).issues ?? [];
        const titleIssues = issues.filter((e) =>
          e.path.includes("title")
        );
        expect(titleIssues.length).toBeGreaterThan(0);
      }
    });

    it("rejects missing workspaceId", () => {
      const result = CreateItemSchema.safeParse({
        title: "Test item",
      });
      expect(result.success).toBe(false);
    });

    it("defaults type to task", () => {
      const result = CreateItemSchema.parse({
        workspaceId: "workspace_123",
        title: "Test item",
      });
      expect(result.type).toBe("task");
    });

    it("defaults status to not_started", () => {
      const result = CreateItemSchema.parse({
        workspaceId: "workspace_123",
        title: "Test item",
      });
      expect(result.status).toBe("not_started");
    });

    it("defaults priority to none", () => {
      const result = CreateItemSchema.parse({
        workspaceId: "workspace_123",
        title: "Test item",
      });
      expect(result.priority).toBe("none");
    });

    it("rejects title over 200 characters", () => {
      const result = CreateItemSchema.safeParse({
        workspaceId: "workspace_123",
        title: "x".repeat(201),
      });
      expect(result.success).toBe(false);
    });
  });

  describe("UpdateItemSchema", () => {
    it("accepts partial update input", () => {
      const result = UpdateItemSchema.safeParse({
        title: "Updated",
        version: 1,
      });
      expect(result.success).toBe(true);
    });

    it("requires version", () => {
      const result = UpdateItemSchema.safeParse({
        title: "Updated",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("MoveItemSchema", () => {
    it("accepts valid move input", () => {
      const result = MoveItemSchema.safeParse({
        parentId: null,
        position: 0,
        version: 1,
      });
      expect(result.success).toBe(true);
    });

    it("rejects negative position", () => {
      const result = MoveItemSchema.safeParse({
        parentId: null,
        position: -1,
        version: 1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("enums", () => {
    it("accepts valid item types", () => {
      expect(ItemTypeSchema.safeParse("project").success).toBe(true);
      expect(ItemTypeSchema.safeParse("task").success).toBe(true);
      expect(ItemTypeSchema.safeParse("note").success).toBe(true);
      expect(ItemTypeSchema.safeParse("idea").success).toBe(true);
    });

    it("rejects invalid item type", () => {
      expect(ItemTypeSchema.safeParse("foo").success).toBe(false);
    });

    it("accepts valid statuses", () => {
      expect(ItemStatusSchema.safeParse("not_started").success).toBe(true);
      expect(ItemStatusSchema.safeParse("in_progress").success).toBe(true);
      expect(ItemStatusSchema.safeParse("blocked").success).toBe(true);
      expect(ItemStatusSchema.safeParse("completed").success).toBe(true);
    });

    it("accepts valid priorities", () => {
      expect(ItemPrioritySchema.safeParse("none").success).toBe(true);
      expect(ItemPrioritySchema.safeParse("low").success).toBe(true);
      expect(ItemPrioritySchema.safeParse("medium").success).toBe(true);
      expect(ItemPrioritySchema.safeParse("high").success).toBe(true);
      expect(ItemPrioritySchema.safeParse("critical").success).toBe(true);
    });
  });
});
