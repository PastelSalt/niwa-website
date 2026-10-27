"use client";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function ProtectedRoute() {
  const { state } = useAuth();
  const location = useLocation();

  if (state.isLoading) {
    return null;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
