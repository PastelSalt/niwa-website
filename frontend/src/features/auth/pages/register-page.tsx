"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { GitBranch, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { RegisterSchema } from "@/features/auth/schemas";
import type { RegisterInput } from "@/features/auth/types";
import { toastSuccess } from "@/lib/toast";

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
      toastSuccess("Account created!");
      navigate("/app", { replace: true });
    } catch {
      // Error is already set by the auth hook
    }
  };

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-600 transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-3 h-3 shrink-0" />
              Back
            </button>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 justify-center mb-4">
              <GitBranch className="w-5 h-5 text-sage-600" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                niwa
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A garden for your ideas.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-center">Create an account</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Join NIWA and start organizing your ideas today.
          </p>

          {state.error && (
            <div className="mb-4 p-3 rounded-md bg-error-50 text-error-600 text-sm border border-error-200">
              {state.error}
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  {...form.register("name")}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-background placeholder:text-muted-foreground/50"
                  placeholder="Alex Rivera"
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-xs text-error-600">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  {...form.register("email")}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-background placeholder:text-muted-foreground/50"
                  placeholder="you@example.com"
                  required
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-xs text-error-600">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  {...form.register("password")}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-background placeholder:text-muted-foreground/50"
                  placeholder="••••••••"
                  required
                />
                {form.formState.errors.password && (
                  <p className="mt-1 text-xs text-error-600">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={state.isLoading}
              className="w-full px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-700 transition-colors"
            >
              {state.isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-sage-600 hover:text-sage-700 hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
