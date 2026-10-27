import type { Item } from "../types";

export interface TreeItemNode extends Item {
  children: TreeItemNode[];
  isExpanded: boolean;
}

export function buildTree(
  flatItems: Item[],
  rootId: string | null = null
): TreeItemNode[] {
  const itemMap = new Map<string, TreeItemNode>();
  const childrenMap = new Map<string | null, Item[]>();

  for (const item of flatItems) {
    itemMap.set(item.id, { ...item, children: [], isExpanded: true });
  }

  for (const item of flatItems) {
    const parentId = item.parentId;
    if (!childrenMap.has(parentId)) {
      childrenMap.set(parentId, []);
    }
    childrenMap.get(parentId)!.push(item);
  }

  for (const [parentId, children] of childrenMap) {
    const parent = itemMap.get(parentId ?? "");
    if (parent) {
      parent.children = children
        .map((c) => itemMap.get(c.id)!)
        .sort((a: TreeItemNode, b: TreeItemNode) => a.position - b.position);
    }
  }

  const roots: TreeItemNode[] = [];
  for (const item of flatItems) {
    const parentId = item.parentId;
    if (rootId === null && !parentId) {
      roots.push(itemMap.get(item.id)!);
    } else if (rootId !== null && parentId === rootId) {
      roots.push(itemMap.get(item.id)!);
    }
  }

  return roots.sort((a: TreeItemNode, b: TreeItemNode) => a.position - b.position);
}

export function findItem(
  tree: TreeItemNode[],
  id: string
): TreeItemNode | undefined {
  for (const node of tree) {
    if (node.id === id) return node;
    const found = findItem(node.children, id);
    if (found) return found;
  }
  return undefined;
}

export function toggleExpansion(
  tree: TreeItemNode[],
  id: string
): TreeItemNode[] {
  return tree.map((node) => {
    if (node.id === id) {
      return { ...node, isExpanded: !node.isExpanded };
    }
    if (node.children.length > 0) {
      return { ...node, children: toggleExpansion(node.children, id) };
    }
    return node;
  });
}
