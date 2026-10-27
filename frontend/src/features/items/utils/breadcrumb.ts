import type { Item } from "../types";

export interface Breadcrumb {
  id: string;
  title: string;
}

export function buildBreadcrumb(
  items: Item[],
  targetId: string
): Breadcrumb[] {
  const itemMap = new Map<string, Item>();
  for (const item of items) {
    itemMap.set(item.id, item);
  }

  const breadcrumbs: Breadcrumb[] = [];
  let current: Item | undefined = itemMap.get(targetId);

  while (current) {
    breadcrumbs.unshift({ id: current.id, title: current.title });
    current = current.parentId ? itemMap.get(current.parentId) : undefined;
  }

  return breadcrumbs;
}
