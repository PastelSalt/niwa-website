import { apiClient } from "@/lib/api-client";
import type { Item } from "../../items/types";

const FOCUS_BASE = "/focus";

export interface FocusResponse {
  sections: FocusSection[];
}

export interface FocusSection {
  id: "in_progress" | "high_priority" | "overdue" | "upcoming" | "recently_updated";
  title: string;
  items: Item[];
}

export interface FocusFilters {
  projectId?: string;
  status?: string;
  priority?: string;
  tag?: string;
}

export const focusApi = {
  list: (filters?: FocusFilters) => {
    const searchParams = new URLSearchParams();
    if (filters?.projectId) searchParams.set("projectId", filters.projectId);
    if (filters?.status) searchParams.set("status", filters.status);
    if (filters?.priority) searchParams.set("priority", filters.priority);
    if (filters?.tag) searchParams.set("tag", filters.tag);
    const qs = searchParams.toString();
    return apiClient.get<FocusResponse>(`${FOCUS_BASE}${qs ? `?${qs}` : ""}`);
  },

  overdue: () => apiClient.get<FocusResponse>(`${FOCUS_BASE}/overdue`),

  upcoming: () => apiClient.get<FocusResponse>(`${FOCUS_BASE}/upcoming`),
};
