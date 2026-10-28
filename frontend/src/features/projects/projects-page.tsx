"use client";

import { useState, useCallback } from "react";
import { ItemTree } from "@/features/items/components/item-tree";
import { DetailPanel } from "@/components/layout/detail-panel";
import type { Item } from "@/features/items/types";
import { useItems } from "@/features/items/hooks/use-items";
import { useCreateItem, useUpdateItem, useDeleteItem, useMoveItem } from "@/features/items/hooks/use-items";
import { toastSuccess, toastError } from "@/lib/toast";

export function ProjectsPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useItems();
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();
  const moveMutation = useMoveItem();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading projects…
      </div>
    );
  }

  const allItems: Item[] = Array.isArray(data) ? data.filter((i) => !i.parentId) : [];

  const handleItemSelect = useCallback((item: Item) => {
    setSelectedItem(item);
    setOpen(true);
  }, []);

  const handleItemCreate = useCallback((parentId: string | null) => {
    const title = window.prompt("Item title:");
    if (!title) return;
    createMutation.mutate(
      {
        workspaceId: "workspace_123",
        parentId,
        title,
      },
      {
        onSuccess: () => {
          toastSuccess("Item created");
        },
        onError: (err) => {
          toastError("Failed to create item", err instanceof Error ? err.message : undefined);
        },
      }
    );
  }, [createMutation]);

  const handleItemUpdate = useCallback((item: Item) => {
    updateMutation.mutate(
      {
        itemId: item.id,
        input: { ...item, version: item.version },
      },
      {
        onSuccess: (res) => {
          toastSuccess("Item updated");
          if (selectedItem?.id === item.id) setSelectedItem(res.item);
        },
        onError: (err) => {
          toastError("Failed to update item", err instanceof Error ? err.message : undefined);
        },
      }
    );
  }, [selectedItem?.id, updateMutation]);

  const handleItemDelete = useCallback((itemId: string) => {
    if (!window.confirm("Archive this item?")) return;
    deleteMutation.mutate(
      itemId,
      {
        onSuccess: () => {
          toastSuccess("Item archived");
          if (selectedItem?.id === itemId) {
            setSelectedItem(null);
            setOpen(false);
          }
        },
        onError: (err) => {
          toastError("Failed to archive item", err instanceof Error ? err.message : undefined);
        },
      }
    );
  }, [deleteMutation, selectedItem?.id]);

  const handleItemMove = useCallback((itemId: string, parentId: string | null) => {
    const node = allItems.find((i) => i.id === itemId);
    if (!node) return;
    moveMutation.mutate(
      {
        itemId,
        input: {
          parentId,
          position: 0,
          version: node.version,
        },
      },
      {
        onSuccess: () => {
          toastSuccess("Item moved");
        },
        onError: (err) => {
          toastError("Failed to move item", err instanceof Error ? err.message : undefined);
        },
      }
    );
  }, [moveMutation, allItems]);

  return (
    <div className="flex h-full flex-col min-w-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <h1 className="text-xl font-semibold">Projects</h1>
        <button
          onClick={() => handleItemCreate(null)}
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-sage-700"
        >
          Create project
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden min-w-0">
        <div className="flex-1 border-r border-border overflow-y-auto min-w-0">
          <ItemTree
            items={allItems}
            onItemSelect={handleItemSelect}
            onItemCreate={handleItemCreate}
            onItemUpdate={handleItemUpdate}
            onItemDelete={handleItemDelete}
            onItemMove={handleItemMove}
          />
        </div>
        <DetailPanel
          item={open ? selectedItem : null}
          onClose={() => setOpen(false)}
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />
      </div>
    </div>
  );
}
