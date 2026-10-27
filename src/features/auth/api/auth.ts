import { apiClient } from "@/lib/api-client";
import type { RegisterInput, LoginInput, User } from "../types";

const AUTH_BASE = "/auth";

export interface LoginResponse {
  user: User;
  session: {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: string | null;
  };
}

export interface RegisterResponse {
  user: User;
  session: {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: string | null;
  };
}

export interface MeResponse {
  user: User;
}

export interface RefreshResponse {
  accessToken: string | null;
}

export const authApi = {
  register: (input: RegisterInput) =>
    apiClient.post<RegisterResponse>(`${AUTH_BASE}/register`, input),

  login: (input: LoginInput) =>
    apiClient.post<LoginResponse>(`${AUTH_BASE}/login`, input),

  logout: () => apiClient.post<{ ok: boolean }>(`${AUTH_BASE}/logout`),

  me: () => apiClient.get<MeResponse>(`${AUTH_BASE}/me`),

  refresh: () => apiClient.post<RefreshResponse>(`${AUTH_BASE}/refresh`),
};
