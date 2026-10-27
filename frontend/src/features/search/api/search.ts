import { apiClient } from "@/lib/api-client";
import type { Item } from "../../items/types";

const SEARCH_BASE = "/search";

export interface SearchResult {
  id: string;
  workspaceId: string;
  parentId: string | null;
  title: string;
  description: string;
  type: Item["type"];
  status: Item["status"];
  priority: Item["priority"];
  projectName: string;
  ancestorPath: string[];
  excerpt: string | null;
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
}

export const searchApi = {
  search: (q: string) =>
    apiClient.get<SearchResponse>(`${SEARCH_BASE}?q=${encodeURIComponent(q)}`),
};
