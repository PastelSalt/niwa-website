import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/features/auth/hooks/use-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
