import { ApiError, normalizeError } from "./errors";

const API_BASE_URL = (import.meta as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL || "/api/v1";

interface RequestInitExtended extends RequestInit {
  signal?: AbortSignal;
}

async function request<T>(
  input: string,
  init: RequestInitExtended = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const res = await fetch(`${API_BASE_URL}${input}`, {
    ...init,
    signal: init.signal ?? controller.signal,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    credentials: "include",
  });

  clearTimeout(timeoutId);

  if (!res.ok) {
    let errorData: { error?: { code?: string; message?: string; details?: Record<string, unknown> } } | undefined;
    try {
      errorData = (await res.json()) as { error?: { code?: string; message?: string; details?: Record<string, unknown> } };
    } catch {
      errorData = undefined;
    }

    throw new ApiError({
      code: errorData?.error?.code ?? "REQUEST_FAILED",
      message: errorData?.error?.message ?? `Request failed with status ${res.status}`,
      status: res.status,
      details: errorData?.error?.details ?? {},
    });
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export const apiClient = {
  get: <T>(input: string, init?: RequestInitExtended) => request<T>(input, { ...init, method: "GET" }),
  post: <T>(input: string, body?: unknown, init?: RequestInitExtended) =>
    request<T>(input, { ...init, method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(input: string, body?: unknown, init?: RequestInitExtended) =>
    request<T>(input, { ...init, method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  put: <T>(input: string, body?: unknown, init?: RequestInitExtended) =>
    request<T>(input, { ...init, method: "PUT", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(input: string, init?: RequestInitExtended) =>
    request<T>(input, { ...init, method: "DELETE" }),
};

export { normalizeError };
export type { ApiError };
