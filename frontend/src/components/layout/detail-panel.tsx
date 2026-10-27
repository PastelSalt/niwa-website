"use client";

import { ItemDetailPanel } from "@/features/items/components/item-detail-panel";
import type { Item } from "@/features/items/types";

interface DetailPanelProps {
  item: Item | null;
  onClose: () => void;
  onItemUpdate?: (item: Item) => void;
  onItemDelete?: (itemId: string) => void;
}

export function DetailPanel({ item, onClose, onItemUpdate, onItemDelete }: DetailPanelProps) {
  return (
    <ItemDetailPanel
      item={item}
      onClose={onClose}
      onItemUpdate={onItemUpdate}
      onItemDelete={onItemDelete}
    />
  );
}
