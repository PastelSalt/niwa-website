"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  FolderTree,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

export function LandingPage() {
  const { state } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: FolderTree,
      title: "Unlimited nesting",
      description:
        "Break projects down into tasks, subtasks, and ideas at any depth.",
    },
    {
      icon: LayoutGrid,
      title: "Frictionless capture",
      description: "Record ideas in the Inbox before deciding where they belong.",
    },
    {
      icon: CheckCircle,
      title: "Cross-project Focus",
      description:
        "See important work across all your projects in one place.",
    },
    {
      icon: Clock,
      title: "Deadlines and priorities",
      description: "Track due dates, status, and priority on every item.",
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground">
      <nav className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">niwa</span>
          <span className="text-xs text-muted-foreground font-medium">
            A garden for your ideas.
          </span>
        </div>
        <div className="flex items-center gap-3">
          {state.isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/app/projects", { replace: true })}
                className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700"
              >
                Open app
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
              >
                Get started
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          NIWA
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
          Plant an idea. Grow a project. Let it bloom.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
            >
              <feature.icon className="w-6 h-6 shrink-0 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Hierarchical project management for solo creators.
          </span>
        </div>
      </main>
    </div>
  );
}
