export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number;
  public readonly details: Record<string, unknown>;

  constructor({ code, message, status, details }: { code: string; message: string; status: number; details?: Record<string, unknown> }) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details ?? {};
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function normalizeError(error: unknown): { code: string; message: string; status: number } {
  if (isApiError(error)) {
    return { code: error.code, message: error.message, status: error.status };
  }

  if (error instanceof Error) {
    return { code: "UNKNOWN_ERROR", message: error.message, status: 500 };
  }

  return { code: "UNKNOWN_ERROR", message: "An unexpected error occurred.", status: 500 };
}
