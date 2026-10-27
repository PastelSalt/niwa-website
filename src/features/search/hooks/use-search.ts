import { searchApi } from "../api/search";
import type { SearchResult } from "../api/search";
import { normalizeError } from "@/lib/errors";

export const SEARCH_QUERY_KEY = "search";

export function useSearch(q: string) {
  return {
    queryKey: [SEARCH_QUERY_KEY, q],
    queryFn: () =>
      searchApi.search(q).then((res: { results: SearchResult[] }) => res.results),
    enabled: q.length > 0,
  };
}

export { normalizeError };
