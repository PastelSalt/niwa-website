"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, GitBranch } from "lucide-react";

export function PrivacyPage() {
  const navigate = useNavigate();
  const { state } = useAuth();
  const isAuthenticated = state.isAuthenticated;

  const handleBack = () => navigate("/", { replace: true });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <nav className="fixed inset-x-0 top-0 z-50 px-6 py-4 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 text-sage-600" />
            <span className="text-sm font-medium text-foreground">Back to home</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
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
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-sage-600 hover:bg-accent transition-colors"
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
        </div>
      </nav>

      <main className="flex-1 px-6 py-12 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <GitBranch className="w-5 h-5 text-sage-600" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              niwa
            </span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: October 30, 2026
          </p>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              NIWA collects personal information you provide directly, such as
              your email address, name, and password when you create an account.
              We also collect usage data related to your interactions with the
              app, including items you create, projects you organize, and
              preferences you set.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              We use your information to provide and maintain our service, to
              authenticate your account, to personalize your experience, and to
              communicate with you about your account or service updates.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              3. Data Storage and Security
            </h2>
            <p className="mb-4">
              Your data is stored securely using industry-standard encryption
              and access controls. We do not sell your personal information to
              third parties. Your garden is yours alone.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              4. Your Rights
            </h2>
            <p className="mb-4">
              You may access, update, or delete your personal information at
              any time through your account settings. You may also request
              account deletion, which will remove your personal data from our
              systems.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              5. Cookies and Tracking
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies to authenticate your
              session, remember your preferences, and analyze usage patterns.
              You may disable cookies through your browser settings, though
              some features may not function properly without them.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              6. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact
              us at hi@niwa.app.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
