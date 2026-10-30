"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { GitBranch, Mail, X } from "lucide-react";

export function Footer() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = state.isAuthenticated;

  const footerNav = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#faq", label: "FAQ" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookie", label: "Cookie policy" },
    { href: "/disclaimer", label: "Disclaimer" },
  ];

  return (
    <footer className="border-t border-border bg-background/50 relative">
      <div className="max-w-6xl mx-auto px-6 py-12 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <GitBranch className="w-4 h-4 text-sage-600" />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                niwa
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              A garden for your ideas.
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs text-muted-foreground">
            {footerNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-sage-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted-foreground">
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

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-sage-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-4 bg-border" />
            <span>© {new Date().getFullYear()} NIWA</span>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
          <span className="text-xs text-muted-foreground">
            Built with sage, cream, and blossom.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/PastelSalt/niwa-website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sage-600 transition-colors"
              aria-label="GitHub"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-sage-600 transition-colors"
              aria-label="Twitter"
            >
              <X className="w-4 h-4" />
            </a>
            <a
              href="mailto:hi@niwa.app"
              className="text-muted-foreground hover:text-sage-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
