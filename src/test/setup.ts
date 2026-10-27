import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, beforeAll, afterAll, vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

beforeAll(() => {
  vi.stubGlobal("crypto", {
    randomUUID: vi.fn(() => "test-uuid-1234"),
  });
});

afterAll(() => {
  vi.unstubAllGlobals();
});
