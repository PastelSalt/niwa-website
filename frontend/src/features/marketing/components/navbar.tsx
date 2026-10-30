"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { GitBranch, X, Menu } from "lucide-react";

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = state.isAuthenticated;

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleScrollTo = useCallback(
    (hash: string, e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsOpen(false);
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const navbarHeight = 64;
        const offsetTop =
          el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    },
    []
  );

  const handleAuthAction = () => {
    setIsOpen(false);
    if (isAuthenticated) {
      navigate("/app/projects", { replace: true });
    } else {
      navigate("/register", { replace: true });
    }
  };

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 px-6 py-4 transition-colors duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/", { replace: true })}>
          <div className="flex items-center gap-1">
            <GitBranch className="w-5 h-5 text-sage-600" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              niwa
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium ml-1">
            A garden for your ideas.
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(link.href, e)}
                className="text-muted-foreground hover:text-sage-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleAuthAction}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors shadow-sm"
              >
                Open app
              </button>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-sage-600 hover:bg-accent transition-colors shadow-sm"
                >
                  Log in
                </button>
                <button
                  onClick={handleAuthAction}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors shadow-sm"
                >
                  Get started
                </button>
              </>
            )}
          </div>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-sage-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-muted-foreground hover:text-sage-600 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex flex-col gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleScrollTo(link.href, e);
                  }}
                  className="text-muted-foreground hover:text-sage-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 space-y-3">
              {isAuthenticated ? (
                <button
                  onClick={handleAuthAction}
                  className="w-full px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
                >
                  Open app
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-full px-6 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-sage-600 hover:bg-accent transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={handleAuthAction}
                    className="w-full px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
                  >
                    Get started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
