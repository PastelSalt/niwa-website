import { apiClient } from "@/lib/api-client";
import type { Item, CreateItemInput, UpdateItemInput, MoveItemInput } from "../types";

const ITEMS_BASE = "/items";

export interface ItemsResponse {
  items: Item[];
}

export interface ItemResponse {
  item: Item;
}

export interface ChildrenResponse {
  items: Item[];
}

export interface TreeResponse {
  items: Item[];
}

export const itemsApi = {
  create: (input: CreateItemInput) =>
    apiClient.post<ItemResponse>(`${ITEMS_BASE}`, input),

  get: (itemId: string) =>
    apiClient.get<ItemResponse>(`${ITEMS_BASE}/${itemId}`),

  update: (itemId: string, input: UpdateItemInput) =>
    apiClient.patch<ItemResponse>(`${ITEMS_BASE}/${itemId}`, input),

  delete: (itemId: string) =>
    apiClient.delete<{ ok: boolean }>(`${ITEMS_BASE}/${itemId}`),

  children: (itemId: string) =>
    apiClient.get<ChildrenResponse>(`${ITEMS_BASE}/${itemId}/children`),

  tree: (itemId: string) =>
    apiClient.get<TreeResponse>(`${ITEMS_BASE}/${itemId}/tree`),

  move: (itemId: string, input: MoveItemInput) =>
    apiClient.post<{ ok: boolean }>(`${ITEMS_BASE}/${itemId}/move`, input),

  archive: (itemId: string) =>
    apiClient.post<{ ok: boolean }>(`${ITEMS_BASE}/${itemId}/archive`),

  restore: (itemId: string) =>
    apiClient.post<{ ok: boolean }>(`${ITEMS_BASE}/${itemId}/restore`),
};
