"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = state.isAuthenticated;

  return (
    <section
      className="py-24 px-6 md:px-12"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-3xl mx-auto rounded-2xl bg-primary text-primary-foreground p-8 md:p-16 text-center overflow-hidden relative">
        <div className="relative z-10">
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
          >
            Ready to plant your first idea?
          </h2>
          <p className="text-primary-foreground/90 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
            Sign up and start organizing your projects today. No credit card
            required.
          </p>
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/app/projects", { replace: true })}
              className="px-8 py-4 rounded-xl text-sm font-medium bg-background text-primary hover:bg-sage-200 transition-all shadow-lg hover:shadow-xl"
            >
              Open app
            </button>
          ) : (
            <button
              onClick={() => navigate("/register", { replace: true })}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium bg-background text-primary hover:bg-sage-200 transition-all shadow-lg hover:shadow-xl"
            >
              Get started — it's free
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* Decorative accents */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-blossom-200/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-sage-300/20 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </section>
  );
}
