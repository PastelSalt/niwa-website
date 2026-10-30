"use client";

import { useState } from "react";
import {
  FolderTree,
  LayoutGrid,
  CheckCircle,
  Clock,
  Tag,
  GitBranch,
  Search,
  Download,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  title: string;
  description: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function FeatureCard({
  icon: Icon,
  color,
  bg,
  border,
  title,
  description,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: FeatureCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group p-6 rounded-xl bg-card border transition-all duration-300 ${
        isHovered
          ? "border-primary shadow-lg shadow-sage-200/50 -translate-y-1"
          : "border-border hover:border-sage-200"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 ${bg} group-hover:scale-110 border ${border}`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

const FEATURES = [
  {
    icon: FolderTree,
    color: "text-sage-600",
    bg: "bg-sage-50",
    border: "border-sage-100",
    title: "Unlimited nesting",
    description:
      "Break projects down into tasks, subtasks, and ideas at any depth—no artificial limits.",
  },
  {
    icon: LayoutGrid,
    color: "text-blossom-600",
    bg: "bg-blossom-50",
    border: "border-blossom-100",
    title: "Frictionless capture",
    description:
      "Record ideas in the Inbox before deciding where they belong.",
  },
  {
    icon: CheckCircle,
    color: "text-graygreen-600",
    bg: "bg-graygreen-50",
    border: "border-graygreen-100",
    title: "Cross-project Focus",
    description: "See important work across all your projects in one place.",
  },
  {
    icon: Clock,
    color: "text-sage-700",
    bg: "bg-sage-100",
    border: "border-sage-200",
    title: "Deadlines and priorities",
    description: "Track due dates, status, and priority on every item.",
  },
  {
    icon: Tag,
    color: "text-blossom-700",
    bg: "bg-blossom-50",
    border: "border-blossom-100",
    title: "Lightweight tags",
    description: "Add, remove, and reuse tags across your items.",
  },
  {
    icon: GitBranch,
    color: "text-sage-600",
    bg: "bg-sage-50",
    border: "border-sage-100",
    title: "Version control",
    description:
      "Optimistic concurrency with version numbers—never overwrite newer data.",
  },
  {
    icon: Search,
    color: "text-graygreen-600",
    bg: "bg-graygreen-50",
    border: "border-graygreen-100",
    title: "Global search",
    description: "Find items at any nesting depth with ancestor paths.",
  },
  {
    icon: Download,
    color: "text-sage-700",
    bg: "bg-sage-100",
    border: "border-sage-200",
    title: "Export your data",
    description: "Take your garden with you—export anytime, no lock-in.",
  },
];

export function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section
      id="features"
      className="py-20 border-y border-border bg-sage-50/40"
      aria-labelledby="features-heading"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Everything you need to grow
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for solo creators, students, and independent thinkers who
            collect more ideas than they can immediately act upon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => {
            const isHovered = hoveredFeature === i;
            return (
              <FeatureCard
                key={i}
                icon={feature.icon}
                color={feature.color}
                bg={feature.bg}
                border={feature.border}
                title={feature.title}
                description={feature.description}
                isHovered={isHovered}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
