"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { LoginSchema } from "@/features/auth/schemas";
import type { LoginInput } from "@/features/auth/types";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, state } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      navigate("/app", { replace: true });
    } catch {
      // Error is already set by the auth hook
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
        {state.error && (
          <div className="mb-4 p-3 rounded-md bg-error-50 text-error-600 text-sm border border-error-200">
            {state.error}
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
              required
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-error-600">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...form.register("password")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
              required
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-error-600">{form.formState.errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
