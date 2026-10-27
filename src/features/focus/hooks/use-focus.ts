import { focusApi } from "../api/focus";
import type { Item } from "../../items/types";
import { normalizeError } from "@/lib/errors";

export const FOCUS_QUERY_KEY = "focus";

export function useFocus(filters?: {
  projectId?: string;
  status?: string;
  priority?: string;
  tag?: string;
}) {
  return {
    queryKey: [FOCUS_QUERY_KEY, filters],
    queryFn: () =>
      focusApi.list(filters).then((res: { sections: FocusSection[] }) => res.sections),
  };
}

export function useFocusOverdue() {
  return {
    queryKey: [FOCUS_QUERY_KEY, "overdue"],
    queryFn: () =>
      focusApi.overdue().then((res: { sections: FocusSection[] }) => res.sections),
  };
}

export function useFocusUpcoming() {
  return {
    queryKey: [FOCUS_QUERY_KEY, "upcoming"],
    queryFn: () =>
      focusApi.upcoming().then((res: { sections: FocusSection[] }) => res.sections),
  };
}

interface FocusSection {
  id: string;
  title: string;
  items: Item[];
}

export { normalizeError };
