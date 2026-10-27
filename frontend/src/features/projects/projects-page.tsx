"use client";

import { useState, useCallback } from "react";
import { ItemTree } from "@/features/items/components/item-tree";
import { DetailPanel } from "@/components/layout/detail-panel";
import type { Item } from "@/features/items/types";
import { useItems } from "@/features/items/hooks/use-items";
import { useCreateItem, useDeleteItem } from "@/features/items/hooks/use-items";

export function ProjectsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useItems();
  const createMutation = useCreateItem();
  const deleteMutation = useDeleteItem();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading projects…
      </div>
    );
  }

  const allItems = data ?? items;

  const handleItemSelect = useCallback((item: Item) => {
    setSelectedItem(item);
    setOpen(true);
  }, []);

  const handleItemCreate = useCallback((parentId: string | null) => {
    const title = window.prompt("Item title:");
    if (!title) return;
    createMutation.mutate(
      { workspaceId: "workspace_123", parentId, title },
      {
        onSuccess: (res) => {
          setItems((prev) => [...prev, res.item]);
        },
      }
    );
  }, [createMutation]);

  const handleItemUpdate = useCallback((item: Item) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    if (selectedItem?.id === item.id) setSelectedItem(item);
  }, [selectedItem?.id]);

  const handleItemDelete = useCallback((itemId: string) => {
    deleteMutation.mutate(itemId, {
      onSuccess: () => {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        if (selectedItem?.id === itemId) {
          setSelectedItem(null);
          setOpen(false);
        }
      },
    });
  }, [deleteMutation, selectedItem?.id]);

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
