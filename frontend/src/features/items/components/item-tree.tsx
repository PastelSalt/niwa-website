"use client";

import { useState, useCallback, useRef } from "react";
import { ChevronRight, ChevronDown, Plus, Edit2, Trash2, ArrowRight } from "lucide-react";
import {
  useUpdateItem,
  useDeleteItem,
  useMoveItem,
} from "@/features/items/hooks/use-items";
import type { Item } from "@/features/items/types";
import { buildTree, type TreeItemNode } from "@/features/items/utils/tree";
import { cn } from "@/lib/utils";
import { MoveDialog } from "./move-dialog";

interface TreeProps {
  items: Item[];
  onItemSelect?: (item: Item) => void;
  onItemCreate?: (parentId: string | null) => void;
  onItemUpdate?: (item: Item) => void;
  onItemDelete?: (itemId: string) => void;
}

export function ItemTree({
  items,
  onItemSelect,
  onItemCreate,
  onItemUpdate,
  onItemDelete,
}: TreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const treeRef = useRef<HTMLDivElement>(null);

  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();
  const moveMutation = useMoveItem();

  const tree = buildTree(items);

  const [moveOpen, setMoveOpen] = useState(false);
  const [moveItemId, setMoveItemId] = useState<string | null>(null);

  const handleMoveItem = (itemId: string, parentId: string | null) => {
    const node = findNode(tree, itemId);
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
          setMoveOpen(false);
          setMoveItemId(null);
        },
      }
    );
  };

  // Build flat list of all item IDs in tree order for keyboard navigation
  const allItemIds = useCallback((): string[] => {
    const ids: string[] = [];
    const walk = (nodes: TreeItemNode[]) => {
      for (const node of nodes) {
        ids.push(node.id);
        if (node.children && node.children.length > 0) {
          walk(node.children);
        }
      }
    };
    walk(tree);
    return ids;
  }, [tree]);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelect = useCallback(
    (item: Item) => {
      setSelectedId(item.id);
      setEditingId(null);
      onItemSelect?.(item);
    },
    [onItemSelect]
  );

  const handleSaveEdit = useCallback(
    (id: string) => {
      if (!editTitle.trim()) {
        setEditingId(null);
        return;
      }
      const node = findNode(tree, id);
      if (!node) return;
      updateMutation.mutate(
        {
          itemId: id,
          input: {
            title: editTitle.trim(),
            version: node.version,
          },
        },
        { onSuccess: () => setEditingId(null) }
      );
    },
    [editTitle, tree, updateMutation]
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          if (selectedId === id) {
            setSelectedId(null);
          }
          onItemDelete?.(id);
        },
      });
    },
    [deleteMutation, selectedId, onItemDelete]
  );

  // Keyboard navigation for tree
  const handleTreeKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Don't handle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const ids = allItemIds();
      if (ids.length === 0) return;

      const currentIndex = selectedId ? ids.indexOf(selectedId) : -1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < ids.length - 1) {
            setSelectedId(ids[currentIndex + 1]);
            setEditingId(null);
          } else {
            setSelectedId(ids[0]);
            setEditingId(null);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            setSelectedId(ids[currentIndex - 1]);
            setEditingId(null);
          } else {
            setSelectedId(ids[ids.length - 1]);
            setEditingId(null);
          }
          break;
        case "ArrowRight": {
          e.preventDefault();
          const node = findNode(tree, selectedId || "");
          if (node && node.children && node.children.length > 0) {
            if (expandedIds.has(node.id)) {
              // Already expanded, move to first child
              setSelectedId(node.children[0].id);
              setEditingId(null);
            } else {
              // Expand the branch
              setExpandedIds((prev) => {
                const next = new Set(prev);
                next.add(node.id);
                return next;
              });
            }
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const node = findNode(tree, selectedId || "");
          if (node && node.parentId) {
            // Move to parent
            setSelectedId(node.parentId);
            setEditingId(null);
          } else if (node && node.children && node.children.length > 0) {
            // Collapse the branch
            setExpandedIds((prev) => {
              const next = new Set(prev);
              next.delete(node.id);
              return next;
            });
          }
          break;
        }
        case "Enter": {
          e.preventDefault();
          const node = findNode(tree, selectedId || "");
          if (node) {
            onItemSelect?.(node);
          }
          break;
        }
        case " ": {
          // Space to toggle expand/collapse
          e.preventDefault();
          const node = findNode(tree, selectedId || "");
          if (node && node.children && node.children.length > 0) {
            setExpandedIds((prev) => {
              const next = new Set(prev);
              if (next.has(node.id)) next.delete(node.id);
              else next.add(node.id);
              return next;
            });
          }
          break;
        }
      }
    },
    [selectedId, tree, expandedIds, allItemIds, onItemSelect]
  );

  return (
    <div
      className="h-full flex flex-col min-w-0"
      onKeyDown={handleTreeKeyDown}
      ref={treeRef}
    >
      <TreeRows
        nodes={tree}
        depth={0}
        isSelected={(id) => id === selectedId}
        onItemSelect={handleSelect}
        onItemCreate={(parentId) => onItemCreate?.(parentId)}
        onItemUpdate={(item) => onItemUpdate?.(item)}
        onItemDelete={handleDelete}
        onItemMove={handleMoveItem}
        onToggleExpand={handleToggleExpand}
        expandedIds={expandedIds}
        editingId={editingId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        onEditChange={setEditTitle}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={() => setEditingId(null)}
        setEditingId={setEditingId}
      />
      {tree.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
          <Plus className="mb-2 opacity-50" size={16} />
          No items yet. Create your first item.
        </div>
      )}
      {moveOpen && moveItemId && (
        <MoveDialog
          item={findNode(tree, moveItemId)!}
          allItems={items}
          onClose={() => {
            setMoveOpen(false);
            setMoveItemId(null);
          }}
          onMove={handleMoveItem}
        />
      )}
    </div>
  );
}

function findNode(
  tree: TreeItemNode[],
  id: string
): TreeItemNode | undefined {
  for (const node of tree) {
    if (node.id === id) return node;
    const found = findNode(node.children, id);
    if (found) return found;
  }
  return undefined;
}

interface TreeRowsProps {
  nodes: TreeItemNode[];
  depth: number;
  isSelected: (id: string) => boolean;
  onItemSelect: (item: Item) => void;
  onItemCreate: (parentId: string | null) => void;
  onItemUpdate: (item: Item) => void;
  onItemDelete: (itemId: string) => void;
  onItemMove: (itemId: string, parentId: string | null) => void;
  onToggleExpand: (id: string) => void;
  expandedIds: Set<string>;
  editingId: string | null;
  editTitle: string;
  setEditTitle: (title: string) => void;
  onEditChange: (title: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  setEditingId: (id: string | null) => void;
}

function TreeRows({
  nodes,
  depth,
  isSelected,
  onItemSelect,
  onItemCreate,
  onItemUpdate,
  onItemDelete,
  onItemMove,
  onToggleExpand,
  expandedIds,
  editingId,
  editTitle,
  setEditTitle,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  setEditingId,
}: TreeRowsProps) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <ul role="tree" className="list-none p-1 space-y-0.5 outline-none min-w-0">
      {nodes.map((node) => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedIds.has(node.id);
        const isSel = isSelected(node.id);
        const isEditing = editingId === node.id;

        return (
          <li
            key={node.id}
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={isSel}
            className={cn(
              "group relative flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors min-w-0",
              isSel && "bg-accent text-accent-foreground",
              !isSel && "hover:bg-secondary"
            )}
          >
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(node.id);
                }}
                className="flex w-4 h-4 items-center justify-center shrink-0 opacity-70 group-hover:opacity-100"
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? (
                  <ChevronDown size={12} />
                ) : (
                  <ChevronRight size={12} />
                )}
              </button>
            ) : (
              <div className="w-4 h-4 shrink-0" />
            )}
            <div
              className={cn(
                "flex-1 min-w-0 flex items-center gap-2 overflow-hidden",
                isEditing ? "opacity-0 pointer-events-none transition-opacity" : "opacity-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onItemSelect(node);
              }}
            >
              <span className="truncate block">{node.title}</span>
              <span className="ml-auto text-xs text-muted-foreground shrink-0">
                {node.type === "project" ? "project" : "task"}
              </span>
              {node.status === "completed" && (
                <span className="text-xs text-success-600 shrink-0">✓</span>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onItemCreate(node.id);
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Add child"
                title="Add child"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(node.id);
                  setEditTitle(node.title);
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Edit"
                title="Edit"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onItemDelete(node.id);
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-error-50 hover:text-error-600"
                aria-label="Delete"
                title="Delete"
              >
                <Trash2 size={12} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(null);
                  onItemMove(node.id, node.parentId);
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Move"
                title="Move to another parent"
              >
                <ArrowRight size={12} />
              </button>
            </div>
            {isEditing && (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => onEditChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSaveEdit(node.id);
                  if (e.key === "Escape") onCancelEdit();
                }}
                onBlur={() => onSaveEdit(node.id)}
                className="flex-1 px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring min-w-0"
                autoFocus
              />
            )}
            {hasChildren && isExpanded && (
              <TreeRows
                nodes={node.children}
                depth={depth + 1}
                isSelected={isSelected}
                onItemSelect={onItemSelect}
                onItemCreate={onItemCreate}
                onItemUpdate={onItemUpdate}
                onItemDelete={onItemDelete}
                onItemMove={onItemMove}
                onToggleExpand={onToggleExpand}
                expandedIds={expandedIds}
                editingId={editingId}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                onEditChange={onEditChange}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                setEditingId={setEditingId}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
