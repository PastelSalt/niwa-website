"use client";

import { useState } from "react";
import {
  useWorkspaces,
  useCreateWorkspace,
  useDeleteWorkspace,
} from "@/features/workspaces/hooks/use-workspaces";
import type { Workspace } from "@/features/items/types";
import { toastSuccess, toastError } from "@/lib/toast";

export function WorkspacesPage() {
  const [createName, setCreateName] = useState("");
  const { data, isLoading, error } = useWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();

  const workspaces: Workspace[] = data ?? [];

  const handleCreate = async () => {
    const name = createName.trim();
    if (!name) return;
    try {
      await createWorkspace.mutateAsync({ name });
      setCreateName("");
      toastSuccess("Workspace created");
    } catch (err) {
      toastError(
        "Failed to create workspace",
        err instanceof Error ? err.message : undefined
      );
    }
  };

  const handleDelete = async (workspaceId: string) => {
    if (!window.confirm("Delete this workspace?")) return;
    try {
      await deleteWorkspace.mutateAsync(workspaceId);
      toastSuccess("Workspace deleted");
    } catch (err) {
      toastError(
        "Failed to delete workspace",
        err instanceof Error ? err.message : undefined
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading workspaces…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center p-6">
        <p className="text-error-600 text-sm mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground hover:bg-sage-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Workspaces</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal workspaces.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Workspace name"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-input bg-background"
            />
            <button
              onClick={handleCreate}
              disabled={!createName.trim()}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-700"
            >
              Create
            </button>
          </div>
        </div>

        {workspaces.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No workspaces yet. Create your first workspace above.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {workspaces.map((workspace) => (
              <li key={workspace.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{workspace.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {workspace.id}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(workspace.id)}
                    className="px-3 py-1.5 rounded-md text-xs text-error-600 hover:bg-error-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
