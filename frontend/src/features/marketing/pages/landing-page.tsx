"use client";

import { useEffect, useState } from "react";
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

const features = [
  {
    icon: FolderTree,
    color: "text-sage-600",
    bg: "bg-sage-50",
    border: "border-sage-100",
    title: "Unlimited nesting",
    description:
      "Break projects down into tasks, subtasks, and ideas at any depth—no artificial limits.",
  },
  {
    icon: LayoutGrid,
    color: "text-blossom-600",
    bg: "bg-blossom-50",
    border: "border-blossom-100",
    title: "Frictionless capture",
    description:
      "Record ideas in the Inbox before deciding where they belong.",
  },
  {
    icon: CheckCircle,
    color: "text-graygreen-600",
    bg: "bg-graygreen-50",
    border: "border-graygreen-100",
    title: "Cross-project Focus",
    description:
      "See important work across all your projects in one place.",
  },
  {
    icon: Clock,
    color: "text-sage-700",
    bg: "bg-sage-100",
    border: "border-sage-200",
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

export function LandingPage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthenticated = state.isAuthenticated;

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 px-6 py-4 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        } transition-colors duration-300`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
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
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors shadow-sm"
                aria-label="Open app"
              >
                Open app
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login", { replace: true })}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-sage-600 hover:bg-accent transition-colors shadow-sm"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/register", { replace: true })}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors shadow-sm"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 relative">
        {/* Hero section */}
        <section
          className="relative w-full pt-20 pb-24 px-6 md:pt-32 md:pb-32 md:px-8 lg:px-12"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-50 text-sage-600 text-xs font-semibold mb-8 border border-sage-100 shadow-sm">
                  <GitBranch className="w-3 h-3" />
                  Hierarchical project management
                </div>

                <h1
                  id="hero-heading"
                  className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
                >
                  A garden for <br />
                  your ideas.
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
                  Plant an idea, grow a project, let it bloom. NIWA is a
                  personal productivity app for people who manage many ideas
                  and need a flexible way to organize complex work.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                  <button
                    onClick={() => navigate("/register", { replace: true })}
                    className="px-6 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-all shadow-sm hover:shadow-md"
                  >
                    Get started — it's free <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate("/login", { replace: true })}
                    className="px-6 py-3 rounded-lg text-sm font-medium border border-border bg-background hover:bg-secondary transition-all"
                  >
                    Log in
                  </button>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-sage-600 animate-pulse" />
                    <span>Secure authentication</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-sage-600 animate-pulse" />
                    <span>Your data, your garden</span>
                  </div>
                </div>
              </div>

              {/* Tree illustration */}
              <div className="relative flex items-center justify-center h-[400px] lg:h-[500px]">
                <div
                  className="relative w-64 h-64 lg:w-80 lg:h-80 animate-float"
                  style={{ animationDelay: "0s" }}
                >
                  {/* Tree trunk */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-24 bg-sage-700 rounded-full shadow-sm"
                  />
                  {/* Branches */}
                  <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-1 border-t-2 border-sage-600 rounded-full"
                    style={{ transform: "rotate(-15deg)" }}
                  />
                  <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-1 border-t-2 border-sage-600 rounded-full"
                    style={{ transform: "rotate(15deg)" }}
                  />
                  {/* Leaves cluster */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-sage-400/90 shadow-lg animate-bounce-slow" />
                  <div className="absolute -top-6 left-4 -translate-x-1/2 w-24 h-24 rounded-full bg-sage-500/80 shadow-md animate-bounce-slow" style={{ animationDelay: "0.2s" }} />
                  <div className="absolute -top-6 right-4 -translate-x-1/2 w-24 h-24 rounded-full bg-graygreen-500/80 shadow-md animate-bounce-slow" style={{ animationDelay: "0.4s" }} />
                  <div className="absolute -top-2 left-8 -translate-x-1/2 w-16 h-16 rounded-full bg-blossom-200/90 shadow-md animate-bounce-slow" style={{ animationDelay: "0.1s" }} />
                  <div className="absolute -top-2 right-8 -translate-x-1/2 w-16 h-16 rounded-full bg-blossom-100/90 shadow-md animate-bounce-slow" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 border-y border-border bg-sage-50/40">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything you need to grow
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built for solo creators, students, and independent thinkers who
                collect more ideas than they can immediately act upon.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map(({ icon: Icon, ...rest }, i) => {
                const isHovered = hoveredFeature === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredFeature(i)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className={`group p-6 rounded-xl bg-card border transition-all duration-300 ${
                      isHovered
                        ? "border-primary shadow-lg shadow-sage-200/50 -translate-y-1"
                        : "border-border hover:border-sage-200"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 ${
                        rest.bg
                      } group-hover:scale-110 border ${rest.border}`}
                    >
                      <Icon className={`w-5 h-5 ${rest.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                      {rest.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rest.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  From idea to project
                </h2>
                <p className="text-muted-foreground">
                  Capture thoughts as they come, then shape them into something
                  real.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative pl-12 group"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <step.icon className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  {/* Connector line between steps */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-4 top-10 w-1 h-12 bg-sage-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto rounded-2xl bg-primary text-primary-foreground p-8 md:p-16 text-center overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Ready to plant your first idea?
              </h2>
              <p className="text-primary-foreground/90 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
                Sign up and start organizing your projects today. No credit
                card required.
              </p>
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="px-8 py-4 rounded-xl text-sm font-medium bg-background text-primary hover:bg-sage-200 transition-all shadow-lg hover:shadow-xl"
              >
                Get started — it's free <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
            {/* Decorative accents */}
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-blossom-200/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-sage-300/20 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 px-6 py-8 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-sage-600" />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              niwa
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs text-muted-foreground">
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
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>A garden for your ideas.</span>
            {isAuthenticated && (
              <button
                onClick={() => navigate("/app/projects", { replace: true })}
                className="hover:text-sage-600 transition-colors"
              >
                Open app
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
