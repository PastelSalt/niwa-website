"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { authApi } from "../api/auth";
import type { AuthState, User } from "../types";

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
} | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const setError = useCallback((message: string | null) => {
    setState((prev) => ({ ...prev, error: message }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev: AuthState) => ({ ...prev, isLoading: loading }));
  }, []);

  const setAuthenticated = useCallback((user: User | null, session: { accessToken: string | null; refreshToken: string | null; expiresAt: string | null } | null) => {
    setState((prev: AuthState) => ({
      ...prev,
      user,
      session,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    }));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authApi.login({ email, password });
        const { user, session } = res;
        setAuthenticated(user, session);
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Login failed");
        throw err;
      }
    },
    [setLoading, setError, setAuthenticated]
  );

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await authApi.register({ email, password, name });
        const { user, session } = res;
        setAuthenticated(user, session);
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Registration failed");
        throw err;
      }
    },
    [setLoading, setError, setAuthenticated]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Ignore logout errors; always clear local state
    } finally {
      setState({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, [setLoading]);

  const refreshSession = useCallback(async () => {
    try {
      const res = await authApi.refresh();
      setState((prev) => ({
        ...prev,
        session: prev.session
          ? { ...prev.session, accessToken: res.accessToken }
          : null,
      }));
    } catch {
      // Refresh failed; session will be invalidated on next request
    }
  }, []);

  const loadSession = useCallback(async () => {
    try {
      const res = await authApi.me();
      setAuthenticated(res.user, null);
    } catch {
      setState(() => ({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }));
    }
  }, [setAuthenticated]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const value = {
    state,
    login,
    register,
    logout,
    refreshSession,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
