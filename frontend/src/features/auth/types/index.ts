export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
