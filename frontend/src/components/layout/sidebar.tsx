import { useTheme } from "./theme-provider";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useWorkspaces } from "@/features/workspaces/hooks/use-workspaces";
import type { Workspace } from "@/features/items/types";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Plus } from "lucide-react";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const { state } = useAuth();
  const { data, isLoading } = useWorkspaces();
  const navigate = useNavigate();

  const workspaces = data ?? [];
  const currentWorkspaceId = state.user?.workspaceId ?? null;
  const currentWorkspace =
    workspaces.find((w: Workspace) => w.id === currentWorkspaceId) ??
    workspaces[0];

  const navItems = [
    { label: "Inbox", href: "/app/inbox" },
    { label: "Projects", href: "/app/projects" },
    { label: "Focus", href: "/app/focus" },
    { label: "Search", href: "/app/search" },
    { label: "Settings", href: "/app/settings" },
  ];

  if (isLoading) {
    return (
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-4">
          <div className="text-lg font-semibold tracking-tight">niwa</div>
          <div className="text-xs text-muted-foreground mt-1">
            A garden for your ideas.
          </div>
        </div>
        <div className="p-4 text-muted-foreground text-sm">
          Loading…
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
      <div className="p-4">
        <div className="text-lg font-semibold tracking-tight">niwa</div>
        <div className="text-xs text-muted-foreground mt-1">
          A garden for your ideas.
        </div>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase">
            Workspace
          </span>
          <button
            onClick={() => navigate("/app/workspaces")}
            className="flex items-center gap-2 px-2 py-1 rounded-md text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Manage workspaces"
          >
            {currentWorkspace ? (
              <span className="truncate max-w-[120px]">{currentWorkspace.name}</span>
            ) : (
              <span className="text-muted-foreground">No workspace</span>
            )}
            <MoreVertical size={14} className="text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-1">
          {workspaces.map((workspace: Workspace) => (
            <button
              key={workspace.id}
              onClick={() => {
                // Switching workspaces would require backend support to set active workspace
                // For now, navigate to workspaces page to manage
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                workspace.id === currentWorkspaceId
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {workspace.name}
            </button>
          ))}
          <button
            onClick={() => navigate("/app/workspaces")}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs text-primary hover:bg-accent/50"
            title="Create workspace"
          >
            <Plus size={14} className="shrink-0" />
            New workspace
          </button>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </aside>
  );
}
