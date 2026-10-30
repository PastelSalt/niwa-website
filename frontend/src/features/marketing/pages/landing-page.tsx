"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import {
  FolderTree,
  LayoutGrid,
  CheckCircle,
  Clock,
  ArrowRight,
  GitBranch,
  Sparkles,
  Mail,
} from "lucide-react";

export function LandingPage() {
  const { state } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = state.isAuthenticated;

  const features = [
    {
      icon: FolderTree,
      color: "text-sage-600",
      title: "Unlimited nesting",
      description:
        "Break projects down into tasks, subtasks, and ideas at any depth—no artificial limits.",
    },
    {
      icon: LayoutGrid,
      color: "text-blossom-600",
      title: "Frictionless capture",
      description:
        "Record ideas in the Inbox before deciding where they belong.",
    },
    {
      icon: CheckCircle,
      color: "text-graygreen-600",
      title: "Cross-project Focus",
      description:
        "See important work across all your projects in one place.",
    },
    {
      icon: Clock,
      color: "text-sage-700",
      title: "Deadlines and priorities",
      description:
        "Track due dates, status, and priority on every item.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Capture",
      description: "Drop an idea into the Inbox with just a title.",
      icon: Mail,
    },
    {
      number: "02",
      title: "Organize",
      description: "Grow it into a project with nested tasks at any depth.",
      icon: FolderTree,
    },
    {
      number: "03",
      title: "Focus",
      description: "Surface the work that matters across all projects.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <GitBranch className="w-5 h-5 text-sage-600" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              niwa
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/app/projects", { replace: true })}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
            >
              Open app
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
              >
                Get started
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative">
        {/* Hero section */}
        <div className="flex-1 w-full px-6 py-12 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-50 text-sage-600 text-xs font-semibold mb-6 border border-sage-100">
              <GitBranch className="w-3 h-3" />
              Hierarchical project management
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              A garden for your ideas.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Plant an idea, grow a project, let it bloom. NIWA is a personal
              productivity app for people who manage many ideas and need a
              flexible way to organize complex work.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="flex-1 sm:flex-none px-6 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
              >
                Get started — it's free
              </button>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="flex-1 sm:flex-none px-6 py-3 rounded-lg text-sm font-medium border border-border bg-background hover:bg-secondary transition-colors"
              >
                Log in
              </button>
            </div>
          </div>
        </div>

        {/* Features section */}
        <section className="py-16 border-y border-border bg-sage-50/30">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Everything you need to grow
              </h2>
              <p className="text-muted-foreground">Built for solo creators and independent thinkers.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-card border border-border hover:border-sage-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center mb-4 border border-border/50">
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  From idea to project
                </h2>
                <p className="text-muted-foreground">
                  Capture thoughts as they come, then shape them into something
                  real.
                </p>
              </div>
              <div className="flex gap-4 border-t border-border pt-4">
                <ArrowRight className="w-4 h-4 text-sage-400 shrink-0" />
                <span className="text-sm font-medium text-muted-foreground">
                  Start capturing in 30 seconds
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                    {step.number}
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <step.icon className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-6 md:px-8">
          <div className="max-w-2xl mx-auto rounded-xl bg-primary text-primary-foreground p-8 md:p-12 text-center overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to plant your first idea?</h2>
              <p className="text-primary-foreground/90 mb-8 text-lg">
                Sign up and start organizing your projects today.
              </p>
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="px-6 py-3 rounded-lg text-sm font-medium bg-background text-primary hover:bg-sage-200 transition-colors"
              >
                Get started
              </button>
            </div>
            {/* Decorative accent */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blossom-200/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-sage-300/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 px-6 py-6 z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-sage-600" />
            <span className="text-sm font-semibold tracking-tight text-foreground">niwa</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/app/projects", { replace: true })}
                className="hover:text-sage-600 transition-colors"
              >
                Open app
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login", { replace: true })}
                  className="hover:text-sage-600 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/register", { replace: true })}
                  className="hover:text-sage-600 transition-colors"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
