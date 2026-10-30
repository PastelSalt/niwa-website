# Plan: NIWA Landing Page — Maximum Complexity Version

**Source:** NIWA Web — Project Specification, Section 2 (Product Identity), Section 5 (Application Layout), Section 20 (Portfolio Presentation)

**Objective:** Define the most complete, production-ready landing page possible for niwa-website — a conversion-focused, visually rich, accessible, and performant marketing page that sells the product, explains the value proposition, and drives sign-ups.

**Deliverable:** A single-page marketing site at `/` with multiple sections, scroll-triggered animations, interactive demos, social proof, pricing, FAQ, and full accessibility compliance.

---

## 1. Design System

### 1.1 Color Palette (existing tokens)

| Token | Usage |
|-------|-------|
| `--color-sage-600` (#7a9358) | Primary actions, headings, accents |
| `--color-cream-50` (#fffbf7) | Page background |
| `--color-charcoal-900` (#1a1a1a) | Primary text |
| `--color-blossom-600` (#b8556c) | Secondary accents, CTAs |
| `--color-graygreen-600` (#628762) | Tertiary accents |
| `--color-error-500` (#b34040) | Destructive actions |
| `--color-success-600` (#3d6448) | Success states |

### 1.2 Typography

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| H1 (hero) | 4xl–7xl | bold | Main headline |
| H2 (section) | 3xl–4xl | bold | Section headings |
| H3 (feature) | sm–base | semibold | Feature titles |
| Body | base–lg | normal | Descriptions |
| Small | xs–sm | normal | Captions, legal |
| Label | xs | medium | Form labels, nav |

Font: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### 1.3 Spacing & Border Radius

- Section padding: `py-16` (desktop), `py-12` (mobile)
- Container max-width: `max-w-6xl`
- Border radius: `rounded-xl` (cards), `rounded-2xl` (CTA), `rounded-full` (pills)
- Gap: `gap-6` (default), `gap-8` (features), `gap-12` (hero)

### 1.4 Motion & Animation

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Float | 6s | ease-in-out | Tree illustration |
| Bounce slow | 4s | ease-in-out | Leaves |
| Fade-in-up | 0.6s | ease-out | Section entries |
| Scale | 0.3s | ease-out | Button hovers, card hovers |
| Slide | 0.4s | ease-out | Mobile menu |

### 1.5 Breakpoints

- Mobile: `< 768px` (single column, stacked)
- Tablet: `768px–1024px` (2-column grids)
- Desktop: `> 1024px` (3–4 column grids, side-by-side hero)

---

## 2. Page Structure (Sections)

### 2.1 Navbar (fixed, transparent → blur on scroll)

- **Left:** NIWA wordmark (GitBranch icon + "niwa" text + tagline micro-text)
- **Right (unauthenticated):** Log in (text), Get started (primary button)
- **Right (authenticated):** Open app (primary button)
- **Mobile:** Hamburger menu → drawer with links + auth CTAs
- **Scroll effect:** Background fades from transparent → `bg-background/90 backdrop-blur`, border-bottom appears

### 2.2 Hero Section

**Left column (copy):**
- Eyebrow badge: `Seedling icon + "Hierarchical project management"` (pill, sage-50 bg)
- H1: "A garden for your ideas." (large, tracking-tight, two-line)
- Subheadline: 2–3 sentences explaining value prop
- Primary CTA: "Get started — it's free" + ArrowRight icon
- Secondary CTA: "Log in" (outline style)
- Trust row: 2–3 pulse-dot items (Secure authentication, Your data, your garden, No credit card required)

**Right column (visual):**
- Animated CSS tree illustration (trunk, branches, bouncing leaves)
- Floating decorative circles (blossom/sage gradients, blurred)
- Responsive: visual stacks below copy on mobile

### 2.3 Features Section ("Everything you need to grow")

- Section heading + centered subheadline
- 4 feature cards in grid (md: 2-col, lg: 4-col)
- Each card: colored icon badge, title, description, hover lift + shadow
- Features:
  1. Unlimited nesting (FolderTree, sage)
  2. Frictionless capture (LayoutGrid, blossom)
  3. Cross-project Focus (CheckCircle, graygreen)
  4. Deadlines and priorities (Clock, sage-dark)
- 4 more possible: Tags, Version control, Search, Export

### 2.4 How It Works Section ("From idea to project")

- 3-step horizontal flow with numbered badges (01, 02, 03)
- Each step: icon, title, description
- Connector lines between steps
- CTA micro-copy: "Start capturing in 30 seconds"

Steps:
1. Capture — Drop an idea into the Inbox with just a title (Mail icon)
2. Organize — Grow it into a project with nested tasks at any depth (FolderTree icon)
3. Focus — Surface the work that matters across all projects (Sparkles icon)

### 2.5 Social Proof / Testimonials Section

- Heading: "Trusted by creators"
- 3–5 testimonial cards (avatar, name, role, quote, star rating)
- Logos row: "Used by" placeholder company logos (grayscale → color on hover)
- Stats row: items created, projects nested, ideas captured (animated counters)

### 2.6 Use Cases Section

- Grid of use-case cards with icons
- Examples: Solo developer, Student, Writer, Hobbyist, Freelancer
- Each: icon, title, 2-line description, "Learn more" link

### 2.7 Pricing Section

- Toggle: Monthly / Yearly (yearly = 20% off badge)
- 3 tiers:
  1. **Free** — $0/mo — 3 projects, basic nesting, community support
  2. **Garden** — $8/mo — Unlimited projects, unlimited depth, priority support
  3. **Greenhouse** — $15/mo — Everything in Garden + export, advanced search, focus filters
- Feature checklist per tier
- Primary CTA on middle tier

### 2.8 FAQ Section

- Accordion: 6–8 questions (collapsible answers)
- Examples: Is there a free plan? Can I export my data? How does nesting work? Is my data secure? Can I use it on mobile?
- Link to contact/support

### 2.9 Final CTA Section

- Centered, large, colored background (sage or cream)
- Headline: "Ready to plant your first idea?"
- Subheadline: "Sign up and start organizing your projects today."
- Primary button: "Get started — it's free"
- Decorative blurred gradient circles behind

### 2.10 Footer

- NIWA wordmark
- Nav links: Features, Pricing, FAQ, Log in, Get started
- Auth-aware: Open app (if logged in)
- Legal: Privacy, Terms, Cookie policy
- Social: GitHub, Twitter, Email
- Copyright

---

## 3. Interactive Elements

### 3.1 Animated Tree Illustration

- Pure CSS/React component (no image)
- Trunk, 2+ branches, 4–6 leaf clusters with staggered bounce animations
- Hover: leaves rustle (slight rotation + scale)
- Responsive sizing

### 3.2 Scroll-Triggered Reveals

- Intersection Observer: sections fade in + slide up as user scrolls
- Staggered children: feature cards animate in one-by-one
- Threshold: 0.1–0.2

### 3.3 Micro-interactions

- Buttons: scale down 0.95 on active press
- Cards: lift + shadow on hover
- Feature icons: scale 1.1 on card hover
- Links: underline animation
- CTA buttons: arrow icon slides right on hover

### 3.4 Mobile Interactions

- Hamburger → full-screen or side drawer menu
- Smooth scroll to sections (anchor links)
- Touch-friendly tap targets (min 44px)

### 3.5 Form Interactions (if email capture added)

- Real-time validation
- Success toast on submit
- Loading state on button

---

## 4. Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| Keyboard navigation | All interactive elements reachable via Tab |
| Focus indicators | Visible focus-visible ring on all buttons/links |
| ARIA labels | Icon-only buttons have `aria-label` |
| Heading hierarchy | Single H1, sequential H2/H3 |
| Color contrast | WCAG AA minimum (4.5:1 text, 3:1 large) |
| Reduced motion | Respect `prefers-reduced-motion` (disable animations) |
| Screen readers | Semantic HTML (nav, section, main, footer) |
| Skip link | "Skip to content" link at top |
| Focus trap | Mobile menu traps focus when open |

---

## 5. Performance Requirements

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| Bundle size impact | < 50KB gzip added |
| Image optimization | None (all CSS/SVG illustrations) |
| Font loading | System fonts only (no web fonts) |
| JS | Minimal, tree-shaken |

---

## 6. Content / Copy Strategy

### 6.1 Voice & Tone

- Calm, botanical, gentle, professional
- Avoid corporate jargon
- Short sentences, active voice
- Garden metaphor used sparingly (not overdone)

### 6.2 Key Messages

- "Plant an idea. Grow a project. Let it bloom."
- "Hierarchical project management for solo creators."
- "Unlimited nesting. No artificial limits."
- "Your data, your garden."

### 6.3 Localization Readiness

- All strings in JSX (ready for i18n later)
- No hardcoded dates/numbers that won't translate
- RTL-aware layout considerations noted

---

## 7. Technical Implementation

### 7.1 File Structure

```
frontend/src/features/marketing/
├── pages/
│   ├── landing-page.tsx      (main page component)
│   └── not-found-page.tsx    (404)
├── components/
│   ├── navbar.tsx            (fixed navigation)
│   ├── footer.tsx            (site footer)
│   ├── hero-section.tsx      (hero with tree illustration)
│   ├── features-section.tsx  (feature grid)
│   ├── how-it-works.tsx      (3-step flow)
│   ├── testimonials.tsx      (social proof)
│   ├── use-cases.tsx         (use case cards)
│   ├── pricing.tsx           (pricing tiers)
│   ├── faq.tsx               (accordion)
│   ├── cta-section.tsx       (final call to action)
│   ├── tree-illustration.tsx (animated CSS tree)
│   ├── feature-card.tsx      (reusable feature card)
│   └── faq-item.tsx          (accordion item)
├── hooks/
│   └── use-scroll-reveal.ts  (Intersection Observer hook)
└── utils/
    └── animations.ts         (animation variants, timing)
```

### 7.2 State Management

- Local React state only (hover states, mobile menu open, FAQ accordion)
- No global store needed for landing page
- `useAuth` for auth-aware CTAs (existing pattern)

### 7.3 Dependencies

- No new dependencies (lucide-react, react-router-dom, Tailwind already available)
- All animations via CSS classes + Intersection Observer

### 7.4 SEO

- `<title>NIWA — A garden for your ideas</title>`
- Meta description
- Open Graph tags (title, description, image)
- Twitter Card tags
- Canonical URL
- Semantic HTML5 landmarks

---

## 8. Testing Checklist

### 8.1 Visual

- [ ] Renders correctly on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Dark mode renders correctly
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No layout shift on load
- [ ] Images/icons load (none — all SVG)

### 8.2 Functional

- [ ] All nav links work (scroll to section or route)
- [ ] Auth-state buttons show correctly (login vs open app)
- [ ] FAQ accordion opens/closes
- [ ] Pricing toggle switches monthly/yearly
- [ ] Mobile menu opens/closes, traps focus

### 8.3 Accessibility

- [ ] Keyboard can reach all interactive elements
- [ ] Focus indicators visible
- [ ] Screen reader announces page sections
- [ ] Color contrast meets WCAG AA
- [ ] ARIA labels on icon buttons

### 8.4 Performance

- [ ] Lighthouse score 90+ on mobile
- [ ] No console errors
- [ ] Bundle size impact minimal

---

## 9. Implementation Order (Suggested)

1. **Phase 1:** Navbar + Footer (shared shell)
2. **Phase 2:** Hero section (copy + tree illustration)
3. **Phase 3:** Features section
4. **Phase 4:** How it works section
5. **Phase 5:** Social proof + Use cases
6. **Phase 6:** Pricing + FAQ
7. **Phase 7:** Final CTA
8. **Phase 8:** Animations + scroll reveals
9. **Phase 9:** Accessibility audit + polish
10. **Phase 10:** Testing + deployment

---

## 10. Exit Criteria

- [ ] Landing page renders at `/` with no errors
- [ ] Typecheck, lint, tests, build all pass
- [ ] Mobile + desktop responsive verified
- [ ] Accessibility audit passes (keyboard, ARIA, contrast)
- [ ] Animations smooth (60fps), respect reduced motion
- [ ] SEO meta tags present
- [ ] Committed and pushed to `main`
