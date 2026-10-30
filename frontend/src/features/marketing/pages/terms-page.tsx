"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, GitBranch } from "lucide-react";

export function TermsPage() {
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

          <h1 className="text-3xl font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: October 30, 2026
          </p>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using NIWA, you agree to be bound by these Terms
              of Service. If you do not agree, you may not use the service.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              2. User Accounts
            </h2>
            <p className="mb-4">
              You must create an account to use NIWA. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities under your account. You must be at least 13
              years of age to use NIWA.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              3. Acceptable Use
            </h2>
            <p className="mb-4">
              You agree not to use NIWA for any unlawful purpose, to transmit
              harmful code, or to interfere with the service. You own the
              content you create in NIWA and retain all rights to it.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              4. Subscription and Pricing
            </h2>
            <p className="mb-4">
              NIWA is currently offered free of charge. We reserve the right to
              introduce paid features or pricing tiers in the future, with
              advance notice to users.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              5. Termination
            </h2>
            <p className="mb-4">
              We may terminate or suspend your account at any time, without
              notice, for conduct that violates these Terms or is harmful to
              other users or the service.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              6. Limitation of Liability
            </h2>
            <p className="mb-4">
              NIWA is provided "as is" without warranties of any kind. We are
              not liable for any damages arising from your use of or inability
              to use the service.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              7. Changes to These Terms
            </h2>
            <p className="mb-4">
              We may update these Terms from time to time. We will notify you
              of any material changes by posting the new Terms on this page
              with an updated "Last updated" date.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              8. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about these Terms, please contact us at
              hi@niwa.app.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
