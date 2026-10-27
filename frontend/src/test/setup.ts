import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, afterAll, vi } from "vitest";
import { queryClient } from "@/app/query-client";

// Set API base URL for test environment
Object.defineProperty(import.meta, "env", {
  value: { VITE_API_BASE_URL: "/api/v1" },
  writable: true,
});

beforeEach(() => {
  queryClient.clear();

  // Mock fetch to avoid real API calls in component tests
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({}),
    }))
  );
});

afterEach(() => {
  cleanup();
  queryClient.clear();
  vi.unstubAllGlobals();
});

afterAll(() => {
  vi.unstubAllGlobals();
});
