"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { RegisterSchema } from "@/features/auth/schemas";
import type { RegisterInput } from "@/features/auth/types";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, state } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await register(data.email, data.password, data.name);
      navigate("/app", { replace: true });
    } catch {
      // Error is already set by the auth hook
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
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
            <label className="block text-sm font-medium mb-1">Name (optional)</label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full px-3 py-2 rounded-md border border-input bg-background"
            />
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
            {state.isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
