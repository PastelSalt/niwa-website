# Plan: Milestone 1 — Project Foundation

**Status: COMPLETE**

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 1)

**Objective:** Initialize the React and TypeScript application, configure Vite, Tailwind CSS, component primitives, linting, formatting, tests, routing structure, theme tokens, application shell, API client, and document the expected backend contract.

**Deliverable:** A clean, testable frontend foundation.

---

## Tasks

### 1.1 Initialize project
- [ ] Initialize pnpm workspace/project in `niwa-web/`
- [ ] Install React + TypeScript + Vite
- [ ] Install Tailwind CSS
- [ ] Install shadcn/ui or accessible UI primitives
- [ ] Install React Router
- [ ] Install TanStack Query
- [ ] Install React Hook Form + Zod
- [ ] Install Lucide icons
- [ ] Install Vitest + React Testing Library + Playwright
- [ ] Install Prettier + ESLint
- [ ] Pin dependencies through lockfile (pnpm-lock.yaml)

### 1.2 Configure tooling
- [ ] Configure TypeScript strict mode (`tsconfig.json`)
- [ ] Configure Vite (`vite.config.ts`)
- [ ] Configure Tailwind (`tailwind.config.ts`, `postcss.config.js`)
- [ ] Configure ESLint (`eslint.config.js` or `.eslintrc`)
- [ ] Configure Prettier (`.prettierrc`)
- [ ] Configure Vitest (`vitest.config.ts`)
- [ ] Add npm scripts: dev, build, lint, typecheck, test, preview

### 1.3 Define theme tokens
- [ ] Create `src/styles/globals.css`
- [ ] Create `src/styles/tokens.css` with color tokens:
  - Primary accent: Sage green
  - Primary background: Warm cream
  - Secondary accent: Cherry-blossom pink
  - Main text: Deep charcoal
  - Secondary text: Muted gray-green
  - Borders: Soft neutral gray
  - Success: Muted green
  - Warning: Soft amber
  - Error: Muted red
- [ ] Support light and dark themes

### 1.4 Set up directory structure
Per Section 9 (Frontend Architecture):
```
src/
├── app/            # App.tsx, router.tsx, providers.tsx, query-client.ts
├── components/     # ui/, layout/, feedback/, shared/
├── features/       # auth/, inbox/, items/, projects/, focus/, search/, settings/
│   └── */{api,components,hooks,pages,schemas,types}
├── lib/            # api-client.ts, errors.ts, date.ts, utils.ts
├── styles/         # globals.css, tokens.css
├── test/           # fixtures/, setup.ts
└── main.tsx
```

### 1.5 Build application shell
- [ ] Create `src/main.tsx`
- [ ] Create `src/app/App.tsx`
- [ ] Create `src/app/router.tsx` with base routes (/login, /register, /app/*, etc.)
- [ ] Create `src/app/providers.tsx` (TanStack Query, auth provider, theme provider)
- [ ] Create `src/app/query-client.ts`
- [ ] Create persistent navigation sidebar
- [ ] Create central workspace area
- [ ] Create optional item-detail panel
- [ ] Make layout responsive (desktop/tablet/mobile per Sections 5.1–5.3)

### 1.6 Create API client
- [ ] Create `src/lib/api-client.ts` (centralized fetch wrapper)
- [ ] Handle base URL configuration (`VITE_API_BASE_URL`)
- [ ] Handle authentication credentials
- [ ] Handle JSON serialization / response parsing
- [ ] Standard error handling (validation, auth, permission, not-found, conflict, rate limit, server failure)
- [ ] Request cancellation where appropriate
- [ ] Consistent timeout and retry policies

### 1.7 Document backend contract
- [ ] Document expected API endpoints (OpenAPI-style notes)
- [ ] Document authentication contract (register, login, logout, me, refresh)
- [ ] Document item contract (create, read, update, delete, children, tree, move, archive, restore)
- [ ] Document search and focus endpoints
- [ ] Document error response format

### 1.8 Configure tests
- [ ] Create `src/test/setup.ts`
- [ ] Create `src/test/fixtures/`
- [ ] Write smoke tests for app shell rendering
- [ ] Run lint, typecheck, and unit tests
- [ ] Verify production build succeeds

---

## Assumptions
- Backend is a separate service; frontend must not connect directly to MongoDB.
- Authentication uses HttpOnly cookies when compatible; CSRF protection configured if cookie-based.
- `VITE_API_BASE_URL` is public config only, never secrets.

## Exit criteria
- `pnpm install` succeeds
- `pnpm run dev` starts the dev server
- `pnpm run lint` passes
- `pnpm run typecheck` passes
- `pnpm run test` passes
- `pnpm run build` succeeds
