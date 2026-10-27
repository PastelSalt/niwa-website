import { describe, it, expect } from "vitest";
import { formatDate, formatRelativeTime, isOverdue, parseISO8601 } from "@/lib/date";

describe("formatDate", () => {
  it("formats a date string", () => {
    expect(formatDate("2026-01-15T00:00:00.000Z")).toContain("2026");
  });
});

describe("formatRelativeTime", () => {
  it("returns 'Just now' for recent dates", () => {
    const now = new Date().toISOString();
    expect(formatRelativeTime(now)).toBe("Just now");
  });
});

describe("isOverdue", () => {
  it("returns true for past due dates", () => {
    const past = new Date(Date.now() - 86400000).toISOString();
    expect(isOverdue(past)).toBe(true);
  });

  it("returns false for null due date", () => {
    expect(isOverdue(null)).toBe(false);
  });

  it("returns false for future due dates", () => {
    const future = new Date(Date.now() + 86400000).toISOString();
    expect(isOverdue(future)).toBe(false);
  });
});

describe("parseISO8601", () => {
  it("parses a valid ISO string", () => {
    const d = parseISO8601("2026-01-01T00:00:00.000Z");
    expect(d).toBeInstanceOf(Date);
    expect(d!.getFullYear()).toBe(2026);
  });

  it("returns null for null input", () => {
    expect(parseISO8601(null)).toBeNull();
  });
});
