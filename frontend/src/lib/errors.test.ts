import { describe, it, expect } from "vitest";
import { normalizeError, ApiError } from "@/lib/errors";

describe("normalizeError", () => {
  it("normalizes an ApiError", () => {
    const err = new ApiError({
      code: "VALIDATION_ERROR",
      message: "Bad request",
      status: 400,
      details: { field: "title" },
    });
    const result = normalizeError(err);
    expect(result.code).toBe("VALIDATION_ERROR");
    expect(result.message).toBe("Bad request");
    expect(result.status).toBe(400);
  });

  it("normalizes a generic Error", () => {
    const err = new Error("Something went wrong");
    const result = normalizeError(err);
    expect(result.code).toBe("UNKNOWN_ERROR");
    expect(result.message).toBe("Something went wrong");
    expect(result.status).toBe(500);
  });

  it("normalizes an unknown value", () => {
    const result = normalizeError("string error");
    expect(result.code).toBe("UNKNOWN_ERROR");
    expect(result.status).toBe(500);
  });
});
