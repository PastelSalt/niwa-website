"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X, ArrowRight, Folder, FileText, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/features/search/api/search";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data: results, isLoading, error } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      fetch(`/api/v1/search?q=${encodeURIComponent(debouncedQuery)}`, {
        credentials: "include",
      }).then((res) => res.json()) as Promise<{ results: SearchResult[] }>,
    enabled: debouncedQuery.length > 0,
  });

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  const searchResults: SearchResult[] = Array.isArray(results) ? results : results?.results ?? [];

  if (isLoading && debouncedQuery.length > 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Searching…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-error-50 border border-error-200 text-error-600 text-sm">
        Failed to search: {error.message}
      </div>
    );
  }

  const iconMap: Record<string, React.ElementType> = {
    project: Folder,
    note: FileText,
    idea: Clock,
  };

  return (
    <div className="flex h-full flex-col min-w-0">
      <div className="border-b border-border p-4 shrink-0">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search items across your workspace…"
            className="w-full px-3 py-2 pl-10 pr-8 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          {(query.length > 0 || debouncedQuery.length > 0) && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-w-0">
        {debouncedQuery.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <Search className="mb-2 opacity-50" size={24} />
            <p>Search for items across your workspace.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 rounded border border-input text-xs">Esc</kbd> to clear.
            </p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <X className="mb-2 opacity-50" size={24} />
            <p>No results for "{debouncedQuery}".</p>
          </div>
        ) : (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
            </h2>
            <div className="space-y-1">
              {searchResults.map((result) => {
                const Icon = iconMap[result.type] || Folder;
                return (
                  <div
                    key={result.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md border border-input bg-card hover:bg-secondary transition-colors group",
                      result.status === "completed" && "opacity-60"
                    )}
                  >
                    <div className="shrink-0 p-1.5 rounded bg-muted text-graygreen-500">
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate block text-sm font-medium">
                          {result.title}
                        </span>
                        {result.status === "completed" && (
                          <span className="text-xs text-success-600">✓</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{result.type}</span>
                        <span>{result.status}</span>
                        <span>{result.priority}</span>
                        <span className="truncate">{result.projectName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-graygreen-500 mt-0.5">
                        {result.ancestorPath.map((segment, i) => (
                          <span key={i}>
                            {i > 0 && <span>/</span>}
                            {segment}
                          </span>
                        ))}
                      </div>
                      {result.excerpt && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-600 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
