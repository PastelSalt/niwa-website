"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Perfect for getting started",
    features: [
      "3 projects",
      "Unlimited nesting depth",
      "Inbox capture",
      "Basic focus view",
      "Community support",
    ],
    isPopular: false,
    cta: "Get started",
  },
  {
    name: "Garden",
    price: "$8",
    period: "/mo",
    description: "For serious project management",
    features: [
      "Unlimited projects",
      "Unlimited nesting depth",
      "Advanced focus filters",
      "Priority support",
      "Version history",
    ],
    isPopular: true,
    cta: "Start growing",
  },
  {
    name: "Greenhouse",
    price: "$15",
    period: "/mo",
    description: "For power users and teams",
    features: [
      "Everything in Garden",
      "Data export",
      "Advanced search",
      "Focus filters by tag",
      "Premium support",
    ],
    isPopular: false,
    cta: "Get greenhouse",
  },
];

const FEATURE_CHECKLIST = [
  "Unlimited items",
  "Nested hierarchy",
  "Status & priority",
  "Tags & deadlines",
  "Cross-project focus",
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const getPrice = (tier: typeof TIERS[number]) => {
    if (!isYearly) return tier.price;
    const monthlyPrice = parseInt(tier.price.replace("$", ""));
    const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);
    return `$${yearlyPrice}`;
  };

  const getPeriod = () => (isYearly ? "/yr" : "/mo");

  return (
    <section
      id="pricing"
      className="py-20 px-6 md:px-8"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="pricing-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Simple, fair pricing
          </h2>
          <p className="text-muted-foreground">
            Start free, grow as your garden grows.
          </p>
        </div>

        <div className="flex items-center justify-center mb-12">
          <span className="text-xs text-muted-foreground mr-2">
            Yearly billing
          </span>
          <button
            onClick={() => setIsYearly((prev) => !prev)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 ${
              isYearly ? "bg-sage-600" : "bg-border"
            }`}
            role="switch"
            aria-checked={isYearly}
            aria-label="Toggle yearly billing"
          >
            <span
              className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
              aria-hidden="true"
            />
          </button>
          <span className="text-xs text-muted-foreground ml-2">
            Save 20% with yearly
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => {
            const price = getPrice(tier);
            const period = getPeriod();
            return (
              <div
                key={i}
                className={`rounded-2xl p-8 border transition-all hover:border-sage-200 flex flex-col ${
                  tier.isPopular
                    ? "border-primary bg-sage-50 shadow-lg shadow-sage-200/50 ring-2 ring-sage-500/20"
                    : "border-border bg-card"
                }`}
              >
                {tier.isPopular && (
                  <div className="mb-4 flex items-center gap-1 px-2 py-1 rounded-full bg-blossom-100 text-blossom-700 text-[10px] font-bold uppercase inline-flex">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-foreground">{price}</span>
                  <span className="text-sm text-muted-foreground">{period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-8">
                  {tier.description}
                </p>
                <ul className="space-y-4 mb-8 flex-1">
                  {FEATURE_CHECKLIST.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
                    tier.isPopular
                      ? "bg-primary text-primary-foreground hover:bg-sage-700 shadow-sm hover:shadow-md"
                      : "border border-border bg-background hover:bg-secondary text-foreground"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
