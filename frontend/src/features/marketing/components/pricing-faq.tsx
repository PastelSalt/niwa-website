"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan includes 3 projects with unlimited nesting depth—enough to start organizing your ideas right away.",
  },
  {
    q: "Can I export my data?",
    a: "Absolutely. Your data belongs to you. Export it anytime in standard formats—no lock-in.",
  },
  {
    q: "How does unlimited nesting work?",
    a: "Every item can contain child items at any depth. A task can have subtasks, which can have their own subtasks, and so on.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use secure authentication and encrypt data in transit. Your garden is yours alone.",
  },
  {
    q: "Can I use NIWA on mobile?",
    a: "The website is responsive and works on mobile browsers. Native mobile apps are planned for the future.",
  },
  {
    q: "What is cross-project Focus?",
    a: "Focus aggregates relevant items from all your projects—overdue, high priority, recently updated—in one place.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 border-y border-border bg-sage-50/30"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions? We have answers.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-card border border-border"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <h3 className="font-semibold text-sm text-foreground">
                    {faq.q}
                  </h3>
                  <span
                    className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-xs ${
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-border text-muted-foreground border border-border"
                    }`}
                  >
                    {isOpen ? "✕" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
