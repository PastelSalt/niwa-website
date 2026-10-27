import { apiClient } from "@/lib/api-client";
import type { Item, CreateItemInput, UpdateItemInput } from "../../items/types";

const INBOX_BASE = "/inbox";

export interface InboxResponse {
  items: Item[];
}

export const inboxApi = {
  list: () => apiClient.get<InboxResponse>(`${INBOX_BASE}`),

  create: (input: CreateItemInput) =>
    apiClient.post<{ item: Item }>(`${INBOX_BASE}`, input),

  update: (itemId: string, input: UpdateItemInput) =>
    apiClient.patch<{ item: Item }>(`${INBOX_BASE}/${itemId}`, input),

  delete: (itemId: string) =>
    apiClient.delete<{ ok: boolean }>(`${INBOX_BASE}/${itemId}`),

  convert: (itemId: string, type: Item["type"]) =>
    apiClient.post<{ item: Item }>(`${INBOX_BASE}/${itemId}/convert`, { type }),

  moveToHierarchy: (itemId: string, parentId: string | null) =>
    apiClient.post<{ item: Item }>(`${INBOX_BASE}/${itemId}/move`, {
      parentId,
    }),
};
