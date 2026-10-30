"use client";

import { useNavigate } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center px-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-error-50 text-error-600 mb-4">
          <AlertCircle size={24} />
        </div>
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-8">
          Page not found. The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-sage-700 transition-colors"
        >
          <Home size={16} />
          Go home
        </button>
      </div>
    </div>
  );
}
