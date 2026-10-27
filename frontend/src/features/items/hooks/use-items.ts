import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { itemsApi } from "../api/items";
import type { Item, CreateItemInput, UpdateItemInput, MoveItemInput } from "../types";
import { normalizeError } from "@/lib/errors";

const ITEMS_QUERY_KEY = "items";
const ITEM_QUERY_KEY = "item";
const CHILDREN_QUERY_KEY = "children";
const TREE_QUERY_KEY = "tree";

export function useItems(options?: UseQueryOptions<Item[], Error>) {
  return useQuery({
    queryKey: [ITEMS_QUERY_KEY],
    queryFn: () => itemsApi.tree("root").then((res: { items: Item[] }) => res.items),
    ...options,
  });
}

export function useItem(itemId: string) {
  return useQuery({
    queryKey: [ITEM_QUERY_KEY, itemId],
    queryFn: () => itemsApi.get(itemId).then((res: { item: Item }) => res.item),
    enabled: !!itemId,
  });
}

export function useChildren(itemId: string) {
  return useQuery({
    queryKey: [CHILDREN_QUERY_KEY, itemId],
    queryFn: () => itemsApi.children(itemId).then((res: { items: Item[] }) => res.items),
    enabled: !!itemId,
  });
}

export function useTree(itemId: string) {
  return useQuery({
    queryKey: [TREE_QUERY_KEY, itemId],
    queryFn: () => itemsApi.tree(itemId).then((res: { items: Item[] }) => res.items),
    enabled: !!itemId,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateItemInput) => itemsApi.create(input),
    onSuccess: (res: { item: Item }) => {
      const item = res.item;
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CHILDREN_QUERY_KEY, item.parentId ?? "root"] });
    },
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, input }: { itemId: string; input: UpdateItemInput }) =>
      itemsApi.update(itemId, input),
    onSuccess: (res: { item: Item }, variables) => {
      const item = res.item;
      queryClient.setQueryData([ITEM_QUERY_KEY, variables.itemId], item);
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CHILDREN_QUERY_KEY, item.parentId ?? "root"] });
    },
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => itemsApi.delete(itemId),
    onSuccess: (_, itemId) => {
      queryClient.removeQueries({ queryKey: [ITEM_QUERY_KEY, itemId] });
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  });
}

export function useMoveItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, input }: { itemId: string; input: MoveItemInput }) =>
      itemsApi.move(itemId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TREE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [CHILDREN_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  });
}

export function useArchiveItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => itemsApi.archive(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  });
}

export function useRestoreItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => itemsApi.restore(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      throw normalizeError(error);
    },
  });
}
