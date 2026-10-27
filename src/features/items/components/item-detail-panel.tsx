"use client";

import { useState, useCallback } from "react";
import { X, Clock, Calendar, MoreHorizontal } from "lucide-react";
import {
  useUpdateItem,
  useDeleteItem,
} from "@/features/items/hooks/use-items";
import type { Item } from "@/features/items/types";
import { formatDate, formatRelativeTime } from "@/lib/date";
import { cn } from "@/lib/utils";

interface ItemDetailPanelProps {
  item: Item | null;
  onClose: () => void;
  onItemUpdate?: (item: Item) => void;
  onItemDelete?: (itemId: string) => void;
}

export function ItemDetailPanel({
  item,
  onClose,
  onItemUpdate,
  onItemDelete,
}: ItemDetailPanelProps) {
  const [isOpen, setIsOpen] = useState(!!item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const statuses = ["not_started", "in_progress", "blocked", "completed"] as const;
  const priorities = ["none", "low", "medium", "high", "critical"] as const;

  const handleClose = useCallback(() => {
    onClose();
    setIsOpen(false);
    setEditMode(false);
    setError(null);
  }, [onClose]);

  const handleEditToggle = useCallback(() => {
    if (!item) return;
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditStatus(item.status);
    setEditPriority(item.priority);
    setEditMode((prev) => !prev);
    setError(null);
  }, [item]);

  const handleSave = useCallback(() => {
    if (!item) return;
    if (!editTitle.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    updateMutation.mutate(
      {
        itemId: item.id,
        input: {
          title: editTitle.trim(),
          description: editDescription,
          status: editStatus as Item["status"],
          priority: editPriority as Item["priority"],
          version: item.version,
        },
      },
      {
        onSuccess: (res: { item: Item }) => {
          setSaving(false);
          setEditMode(false);
          onItemUpdate?.(res.item);
        },
        onError: (err: unknown) => {
          setSaving(false);
          setError(err instanceof Error ? err.message : "Save failed");
        },
      }
    );
  }, [item, editTitle, editDescription, editStatus, editPriority, updateMutation, onItemUpdate]);

  const handleDelete = useCallback(() => {
    if (!item || !window.confirm(`Delete "${item.title}"?`)) return;
    deleteMutation.mutate(item.id, {
      onSuccess: () => {
        handleClose();
        onItemDelete?.(item.id);
      },
      onError: (err: unknown) => {
        setError(err instanceof Error ? err.message : "Delete failed");
      },
    });
  }, [item, deleteMutation, handleClose, onItemDelete]);

  if (!isOpen || !item) return null;

  return (
    <aside className="flex flex-col h-full border-l border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <h2 className="text-lg font-semibold">Item Details</h2>
        <button onClick={handleClose} className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Close details">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {!editMode ? (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</label>
              <p className="text-lg font-semibold truncate">{item.title}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
              <p className="text-muted-foreground whitespace-pre-wrap">{item.description || "No description"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</label>
                <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                  {item.type}
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</label>
                <span className={cn("px-2 py-1 rounded-md text-xs font-medium", statusColor(item.status))}>
                  {item.status}
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</label>
                <span className={cn("px-2 py-1 rounded-md text-xs font-medium", priorityColor(item.priority))}>
                  {item.priority}
                </span>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.length > 0 ? (
                    item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No tags</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Deadline</label>
              <p className={cn("flex items-center gap-2", item.dueAt ? "" : "text-muted-foreground")}>
                <Calendar size={14} className="shrink-0" />
                {item.dueAt ? formatRelativeTime(item.dueAt) : "No deadline"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Estimated Effort</label>
              <p className={cn("flex items-center gap-2", item.estimatedMinutes ? "" : "text-muted-foreground")}>
                <Clock size={14} className="shrink-0" />
                {item.estimatedMinutes ? `${item.estimatedMinutes} min` : "Not estimated"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</label>
                <p className="text-muted-foreground">{formatDate(item.createdAt)}</p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Updated</label>
                <p className="text-muted-foreground">{formatRelativeTime(item.updatedAt)}</p>
              </div>
              {item.completedAt && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Completed</label>
                  <p className="text-success-600">{formatRelativeTime(item.completedAt)}</p>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center gap-2">
              <button onClick={handleEditToggle} className="flex-1 px-3 py-2 rounded-md border border-input bg-background hover:bg-secondary">
                Edit
              </button>
              <button onClick={handleDelete} className="px-3 py-2 rounded-md border border-input bg-background text-error-600 hover:bg-error-50">
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">Priority</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              {error && (
                <div className="p-2 rounded-md bg-error-50 border border-error-200 text-error-600 text-sm">
                  {error}
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <button type="submit" disabled={saving} className="flex-1 px-3 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50">
                  {saving ? "Saving…" : "Save"}
                </button>
                <button type="button" onClick={() => { setEditMode(false); setError(null); }} className="px-3 py-2 rounded-md border border-input bg-background hover:bg-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <div className="border-t border-border bg-muted p-3 shrink-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MoreHorizontal size={14} />
          <span>ID: {item.id}</span>
          <span>Version: {item.version}</span>
        </div>
      </div>
    </aside>
  );
}

function statusColor(status: string) {
  switch (status) {
    case "completed": return "bg-success-100 text-success-700";
    case "in_progress": return "bg-primary-100 text-primary-700";
    case "blocked": return "bg-error-100 text-error-700";
    default: return "bg-muted text-muted-foreground";
  }
}

function priorityColor(priority: string) {
  switch (priority) {
    case "critical": return "bg-error-100 text-error-700";
    case "high": return "bg-warning-100 text-warning-700";
    case "medium": return "bg-accent text-accent-foreground";
    case "low": return "bg-success-100 text-success-700";
    default: return "bg-muted text-muted-foreground";
  }
}
