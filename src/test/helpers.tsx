import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/query-client";

export function withProviders(ui: React.ReactNode) {
  return (
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}
