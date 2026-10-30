"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, GitBranch } from "lucide-react";

export function DisclaimerPage() {
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
            Disclaimer
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: October 30, 2026
          </p>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              1. Information Accuracy
            </h2>
            <p className="mb-4">
              NIWA strives to provide accurate and up-to-date information, but
              we make no representations or warranties of any kind, express or
              implied, about the completeness, accuracy, reliability, or
              suitability of the information provided through our service.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              2. No Professional Advice
            </h2>
            <p className="mb-4">
              NIWA is a personal productivity tool. It is not intended to
              provide professional advice (including but not limited to legal,
              medical, financial, or business advice). You should consult with
              qualified professionals for advice specific to your situation.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              3. Service Availability
            </h2>
            <p className="mb-4">
              We strive to keep NIWA available at all times, but we do not
              guarantee that the service will be uninterrupted, error-free, or
              free of viruses or other harmful components. We may suspend or
              discontinue the service at any time without notice.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              4. External Links
            </h2>
            <p className="mb-4">
              NIWA may contain links to external websites or resources. We are
              not responsible for the content or practices of third-party
              websites and do not endorse them.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              5. Limitation of Liability
            </h2>
            <p className="mb-4">
              To the fullest extent permitted by law, NIWA and its owners,
              operators, and affiliates shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any
              loss of profits or revenues, whether incurred directly or
              indirectly, or any loss of data, use, goodwill, or other
              intangible losses, resulting from your use of or inability to use
              the service.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              6. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about this Disclaimer, please contact us at
              hi@niwa.app.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
