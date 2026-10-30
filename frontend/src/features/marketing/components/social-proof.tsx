"use client";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Solo developer",
    avatar: "AR",
    rating: 5,
    quote:
      "NIWA finally lets me organize my side projects the way my brain works—deeply nested, no limits.",
  },
  {
    name: "Sam Chen",
    role: "Graduate student",
    avatar: "SC",
    rating: 5,
    quote:
      "The Inbox is perfect for capturing research ideas before I decide where they fit.",
  },
  {
    name: "Jordan Lee",
    role: "Freelance designer",
    avatar: "JL",
    rating: 5,
    quote:
      "Focus view keeps me across all client projects without losing context.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-20 border-y border-border bg-sage-50/30"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Loved by creators
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people using NIWA to organize their ideas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span
                    key={j}
                    className="w-4 h-4 text-blossom-500"
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 text-xs font-bold"
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    icon: "💻",
    title: "Solo developer",
    description:
      "Track features, bugs, and refactors across multiple repositories.",
  },
  {
    icon: "🎓",
    title: "Student",
    description:
      "Organize courses, assignments, and research ideas in one place.",
  },
  {
    icon: "✍️",
    title: "Writer",
    description:
      "Outline chapters, collect research, and track publishing progress.",
  },
  {
    icon: "🎨",
    title: "Designer",
    description:
      "Manage client projects, design iterations, and feedback cycles.",
  },
  {
    icon: "🌱",
    title: "Hobbyist",
    description:
      "Capture every idea before it slips away—no pressure to ship.",
  },
];

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="py-20 px-6 md:px-8"
      aria-labelledby="use-cases-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="use-cases-heading"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            For every kind of gardener
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whatever you're growing, NIWA helps you tend to it.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {USE_CASES.map((useCase, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-card border border-border hover:border-sage-200 transition-colors"
            >
              <div className="text-2xl mb-4">{useCase.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{useCase.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
