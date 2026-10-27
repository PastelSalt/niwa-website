"use client";

import { useState } from "react";
import { Filter, Clock, Target, AlertCircle, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Item } from "@/features/items/types";
import { cn } from "@/lib/utils";

interface FocusSection {
  id: string;
  title: string;
  items: Item[];
}

const SECTION_CONFIGS: Record<string, { title: string; icon: React.ElementType; color: string }> = {
  in_progress: { title: "In Progress", icon: Clock, color: "text-primary-600 dark:text-primary-400" },
  high_priority: { title: "High Priority", icon: Target, color: "text-error-600 dark:text-error-400" },
  overdue: { title: "Overdue", icon: AlertCircle, color: "text-error-600 dark:text-error-400" },
  upcoming: { title: "Upcoming", icon: Clock, color: "text-warning-600 dark:text-warning-400" },
  recently_updated: { title: "Recently Updated", icon: RefreshCw, color: "text-secondary-600 dark:text-secondary-400" },
};

export function FocusPage() {
  const [filters] = useState<{
    projectId?: string;
    status?: string;
    priority?: string;
    tag?: string;
  }>({});

  const { data: sections, isLoading, error } = useQuery({
    queryKey: ["focus", filters],
    queryFn: () => {
      const searchParams = new URLSearchParams();
      if (filters.projectId) searchParams.set("projectId", filters.projectId);
      if (filters.status) searchParams.set("status", filters.status);
      if (filters.priority) searchParams.set("priority", filters.priority);
      if (filters.tag) searchParams.set("tag", filters.tag);
      const qs = searchParams.toString();
      return fetch(`/api/v1/focus${qs ? `?${qs}` : ""}`, {
        credentials: "include",
      }).then((res) => res.json()) as Promise<FocusSection[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading focus…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-error-50 border border-error-200 text-error-600 text-sm">
        Failed to load focus: {error.message}
      </div>
    );
  }

  const sectionList: FocusSection[] = sections ?? [];

  return (
    <div className="flex h-full flex-col min-w-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 shrink-0" />
          <h1 className="text-xl font-semibold">Focus</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-md text-sm border border-input bg-background hover:bg-secondary"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 min-w-0">
        {sectionList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <p>No active work to focus on.</p>
          </div>
        ) : (
          <>
            {sectionList.map((section) => {
              const config = SECTION_CONFIGS[section.id];
              const items: Item[] = section.items ?? [];

              if (items.length === 0) return null;

              return (
                <section key={section.id} className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <config.icon asChild={false} className={cn("w-4 h-4 shrink-0", config.color)} />
                    <h2 className="text-sm font-semibold text-charcoal-700 dark:text-charcoal-200">
                      {config.title}
                    </h2>
                    <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md border border-input bg-card hover:bg-secondary transition-colors",
                          item.status === "completed" && "opacity-60"
                        )}
                      >
                        <span className="shrink-0 text-xs font-medium text-muted-foreground">
                          {item.priority}
                        </span>
                        <span className={cn("truncate block text-sm", item.status === "completed" && "line-through text-muted-foreground")}>
                          {item.title}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground shrink-0">
                          {item.type === "project" ? "project" : "task"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
