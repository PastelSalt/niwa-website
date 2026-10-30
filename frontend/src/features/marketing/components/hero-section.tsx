"use client";

import { useNavigate } from "react-router-dom";
import { ArrowRight, Mail, ShieldCheck, Clock, GitBranch } from "lucide-react";
import { TreeIllustration } from "./tree-illustration";

export function HeroSection() {
  const navigate = useNavigate();

  const trustItems = [
    { icon: ShieldCheck, label: "Secure authentication" },
    { icon: Mail, label: "Your data, your garden" },
    { icon: Clock, label: "No credit card required" },
  ];

  return (
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
              Plant an idea, grow a project, let it bloom. NIWA is a personal
              productivity app for people who manage many ideas and need a
              flexible way to organize complex work.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="px-6 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-all shadow-sm hover:shadow-md"
              >
                Get started — it's free{" "}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="px-6 py-3 rounded-lg text-sm font-medium border border-border bg-background hover:bg-secondary transition-all"
              >
                Log in
              </button>
            </div>

            <div className="mt-12 flex flex-col gap-3">
              {trustItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className="w-1 h-1 rounded-full bg-sage-600 animate-pulse"
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center h-[400px] lg:h-[500px]">
            <TreeIllustration className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
