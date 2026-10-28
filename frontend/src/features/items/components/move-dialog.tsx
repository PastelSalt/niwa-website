"use client";

import { useState } from "react";
import { X, Folder } from "lucide-react";
import type { Item } from "@/features/items/types";
import { cn } from "@/lib/utils";

interface MoveDialogProps {
  item: Item;
  allItems: Item[];
  onClose: () => void;
  onMove: (itemId: string, parentId: string | null) => void;
}

export function MoveDialog({
  item,
  allItems,
  onClose,
  onMove,
}: MoveDialogProps) {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  // Compute depth by walking up parent chain
  const getDepth = (id: string): number => {
    let depth = 0;
    let current: string | null = id;
    const visited = new Set<string>();
    while (current && !visited.has(current)) {
      visited.add(current);
      const parent = allItems.find((i) => i.id === current);
      if (!parent || !parent.parentId) break;
      current = parent.parentId;
      depth++;
    }
    return depth;
  };

  // Build list of eligible parents (exclude self and descendants)
  const getDescendantIds = (id: string): Set<string> => {
    const ids = new Set<string>();
    const walk = (pid: string) => {
      const children = allItems.filter((i) => i.parentId === pid);
      for (const child of children) {
        ids.add(child.id);
        walk(child.id);
      }
    };
    walk(id);
    return ids;
  };

  const descendantIds = getDescendantIds(item.id);
  const eligibleParents = allItems.filter(
    (i) => i.id !== item.id && !descendantIds.has(i.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-card border border-border rounded-lg p-5 shadow-lg w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Move to another parent</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-muted-foreground">
            New parent:
          </span>
          <span className="text-xs text-primary-foreground">
            {selectedParentId
              ? allItems.find((i) => i.id === selectedParentId)?.title ||
                "Root"
              : "Root (no parent)"}
          </span>
        </div>

        <div className="max-h-60 overflow-y-auto border border-input rounded-md p-2 space-y-1">
          {eligibleParents.length > 0 ? (
            eligibleParents.map((i) => (
              <div
                key={i.id}
                onClick={() => setSelectedParentId(i.id)}
                className={cn(
                  "flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors",
                  selectedParentId === i.id
                    ? "bg-primary/10 text-primary-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <span
                  className="inline-block mr-1"
                  style={{ paddingLeft: `${getDepth(i.id) * 12}px` }}
                >
                  <Folder size={12} className="text-muted-foreground shrink-0" />
                </span>
                <span className="text-sm truncate max-w-[140px]">{i.title}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-muted-foreground text-center py-4">
              No eligible parents (would create a cycle).
            </div>
          )}
        </div>

        {selectedParentId !== null && (
          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md text-sm border border-input bg-background hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onMove(item.id, selectedParentId);
                onClose();
              }}
              className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-sage-700 disabled:opacity-50"
            >
              Move
            </button>
          </div>
        )}
      </div>
    </div>
  );
}