"use client";

import { Search } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const handleSearch = () => {
    navigate("/app/search");
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold tracking-tight">niwa</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleSearch}
          className="px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Search"
        >
          <Search size={16} />
        </button>
        {state.isAuthenticated && state.user ? (
          <>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {state.user.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Log in
          </button>
        )}
      </div>
    </header>
  );
}
