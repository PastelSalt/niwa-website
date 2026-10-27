"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { INBOX_QUERY_KEY } from "@/features/inbox/hooks/use-inbox";
import type { Item } from "@/features/items/types";
import { cn } from "@/lib/utils";

export function InboxPage() {
  const [captureOpen, setCaptureOpen] = useState(false);
  const [captureTitle, setCaptureTitle] = useState("");
  const [captureError, setCaptureError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [INBOX_QUERY_KEY],
    queryFn: () =>
      fetch("/api/v1/inbox").then((res) => res.json()) as Promise<{ items: Item[] }>,
  });

  const createMutation = useMutation({
    mutationFn: (input: { title: string }) =>
      fetch("/api/v1/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: "workspace_123", title: input.title }),
        credentials: "include",
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INBOX_QUERY_KEY] });
      setCaptureTitle("");
      setCaptureOpen(false);
      setCaptureError(null);
    },
    onError: (err: unknown) => {
      setCaptureError(err instanceof Error ? err.message : "Failed to create item");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      itemId,
      input,
    }: {
      itemId: string;
      input: { title?: string; description?: string; status?: Item["status"] };
    }) =>
      fetch(`/api/v1/inbox/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: "include",
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INBOX_QUERY_KEY] });
    },
    onError: (err: unknown) => {
      setCaptureError(err instanceof Error ? err.message : "Failed to update item");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: string) =>
      fetch(`/api/v1/inbox/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INBOX_QUERY_KEY] });
    },
    onError: (err: unknown) => {
      setCaptureError(err instanceof Error ? err.message : "Failed to delete item");
    },
  });

  const items: Item[] = Array.isArray(data) ? data : data?.items ?? [];

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureTitle.trim()) return;
    setCaptureError(null);
    createMutation.mutate({ title: captureTitle.trim() });
  };

  const handleToggleStatus = (item: Item) => {
    const nextStatus: Item["status"] =
      item.status === "completed" ? "not_started" : "completed";
    updateMutation.mutate({
      itemId: item.id,
      input: { status: nextStatus },
    });
  };

  const handleDelete = (itemId: string) => {
    if (!window.confirm("Archive this item?")) return;
    deleteMutation.mutate(itemId);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading inbox…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-error-50 border border-error-200 text-error-600 text-sm">
        Failed to load inbox: {error.message}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col min-w-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <button
          onClick={() => setCaptureOpen(true)}
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-sage-700 flex items-center gap-1.5"
        >
          <Plus size={14} /> Capture idea
        </button>
      </div>

      {captureOpen && (
        <div className="border-t border-border p-3 shrink-0">
          <form onSubmit={handleCaptureSubmit} className="space-y-3">
            {captureError && (
              <div className="p-2 rounded-md bg-error-50 border border-error-200 text-error-600 text-sm">
                {captureError}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                value={captureTitle}
                onChange={(e) => setCaptureTitle(e.target.value)}
                placeholder="Capture an idea…"
                className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-2 py-1.5 text-xs font-medium text-primary-foreground bg-primary rounded-md hover:bg-sage-700 disabled:opacity-50"
                disabled={!captureTitle.trim() || createMutation.isPending}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-w-0">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <Plus className="mb-2 opacity-50" size={16} />
            <p>No ideas captured yet. Capture your first idea above.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md border border-input bg-card hover:bg-secondary transition-colors",
                  item.status === "completed" && "opacity-60"
                )}
              >
                <button
                  onClick={() => handleToggleStatus(item)}
                  className={`shrink-0 rounded-full p-0.5 transition-colors ${
                    item.status === "completed"
                      ? "bg-success-600 text-white"
                      : "bg-border text-border hover:bg-primary hover:text-primary-foreground"
                  }`}
                  aria-label={`Mark ${item.status === "completed" ? "incomplete" : "complete"}`}
                />
                <span
                  className={cn(
                    "truncate block text-sm",
                    item.status === "completed" && "line-through text-muted-foreground"
                  )}
                >
                  {item.title}
                </span>
                {item.tags.length > 0 && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded bg-muted text-xs">
                        #{tag}
                      </span>
                    ))}
                  </span>
                )}
                <div className="ml-2 flex items-center gap-1.5 shrink-0">
                  <button
                    className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                    aria-label="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-md text-muted-foreground hover:bg-error-50 hover:text-error-600"
                    aria-label="Archive"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
