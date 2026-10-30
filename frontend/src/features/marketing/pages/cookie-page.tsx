"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, GitBranch } from "lucide-react";

export function CookiePage() {
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
            Cookie Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: October 30, 2026
          </p>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              1. What Are Cookies
            </h2>
            <p className="mb-4">
              Cookies are small text files placed on your device when you visit
              a website. They help the site remember information about your
              visit, such as your preferred language and other settings.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              2. Cookies We Use
            </h2>
            <p className="mb-4">
              We use the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Authentication cookies</strong> — used to keep you
                signed in to your NIWA account.
              </li>
              <li>
                <strong>Preference cookies</strong> — remember your theme
                selection (light/dark) and other app preferences.
              </li>
              <li>
                <strong>Analytics cookies</strong> — help us understand how
                users interact with NIWA so we can improve the service.
              </li>
            </ul>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              3. Third-Party Cookies
            </h2>
            <p className="mb-4">
              We do not currently use third-party advertising or tracking
              cookies. Any embedded services (such as GitHub or social links)
                may set their own cookies, which are governed by their own
                privacy policies.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              4. Managing Cookies
            </h2>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete
              all cookies that are already on your device and you can set most
              browsers to prevent them from being placed. If you do this,
              however, you may have to manually adjust some preferences every
              time you visit a site and some services and functionalities may
              not work.
            </p>

            <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">
              5. Contact Us
            </h2>
            <p className="mb-4">
              If you have questions about this Cookie Policy, please contact us
              at hi@niwa.app.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
