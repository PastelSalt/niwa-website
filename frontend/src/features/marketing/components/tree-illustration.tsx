"use client";

import { GitBranch } from "lucide-react";

interface TreeIllustrationProps {
  className?: string;
}

export function TreeIllustration({ className }: TreeIllustrationProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className ?? ""}`}
      aria-label="Tree illustration"
      role="img"
    >
      {/* Decorative background circles */}
      <div
        className="absolute -right-20 -top-20 w-64 h-64 bg-blossom-200/30 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        className="absolute -left-24 -bottom-24 w-72 h-72 bg-sage-300/20 rounded-full blur-[100px] pointer-events-none"
      />

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
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-1 border-t-2 border-sage-500 rounded-full"
          style={{ transform: "rotate(-25deg)" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-1 border-t-2 border-sage-500 rounded-full"
          style={{ transform: "rotate(25deg)" }}
        />

        {/* Leaves cluster - main */}
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-sage-400/90 shadow-lg animate-bounce-slow"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute -top-6 left-4 w-24 h-24 rounded-full bg-sage-500/80 shadow-md animate-bounce-slow"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="absolute -top-6 right-4 w-24 h-24 rounded-full bg-graygreen-500/80 shadow-md animate-bounce-slow"
          style={{ animationDelay: "0.4s" }}
        />
        <div
          className="absolute -top-2 left-8 w-16 h-16 rounded-full bg-blossom-200/90 shadow-md animate-bounce-slow"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="absolute -top-2 right-8 w-16 h-16 rounded-full bg-blossom-100/90 shadow-md animate-bounce-slow"
          style={{ animationDelay: "0.3s" }}
        />

        {/* Smaller leaf accents */}
        <div
          className="absolute -top-10 left-10 w-12 h-12 rounded-full bg-sage-300/60 animate-bounce-slow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute -top-10 right-10 w-12 h-12 rounded-full bg-blossom-300/60 animate-bounce-slow"
          style={{ animationDelay: "0.6s" }}
        />

        {/* Seedling icon at center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-white/50"
        >
          <GitBranch className="w-6 h-6 text-sage-600" />
        </div>
      </div>
    </div>
  );
}
