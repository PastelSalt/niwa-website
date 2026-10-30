"use client";

import { useNavigate } from "react-router-dom";
import { Mail, FolderTree, Sparkles, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Capture",
    description: "Drop an idea into the Inbox with just a title.",
    icon: Mail,
  },
  {
    number: "02",
    title: "Organize",
    description:
      "Grow it into a project with nested tasks at any depth.",
    icon: FolderTree,
  },
  {
    number: "03",
    title: "Focus",
    description: "Surface the work that matters across all projects.",
    icon: Sparkles,
  },
];

export function HowItWorksSection() {
  const navigate = useNavigate();

  const handleStartCapturing = () => {
    navigate("/register", { replace: true });
  };

  return (
    <section
      id="how-it-works"
      className="py-20 px-6 md:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              From idea to project
            </h2>
            <p className="text-muted-foreground">
              Capture thoughts as they come, then shape them into something
              real.
            </p>
          </div>
          <button
            onClick={handleStartCapturing}
            className="flex items-center gap-4 border-t border-border pt-4 w-full md:w-auto text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors"
            aria-label="Start capturing in 30 seconds"
          >
            <ArrowRight className="w-4 h-4 shrink-0" />
            Start capturing in 30 seconds
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="relative pl-12 group"
            >
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                {step.number}
              </div>
              <div className="flex items-start gap-3 mb-4">
                <step.icon className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <h3 className="font-semibold text-sm">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {i < STEPS.length - 1 && (
                <div className="absolute left-4 top-10 w-1 h-12 bg-sage-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
