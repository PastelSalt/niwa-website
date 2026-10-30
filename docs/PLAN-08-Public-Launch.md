# Plan: Milestone 8 — Public Website Launch

**Source:** NIWA Web — Project Specification, Sections 1–22 (Definition of Done)

**Objective:** Transform the current development-state codebase into a proper, publicly usable website with standard operations: a public landing page, working authentication flow, deployed backend, complete core features, responsive layout, and production-grade polish.

**Deliverable:** A public web application at a stable URL where users can register, log in, create and manage hierarchical items, and where the site behaves like a normal production web app (landing page, 404 handling, auth, loading states, error handling).

---

## Current State

- Frontend: React 19 + TypeScript + Vite + Tailwind v4 in `frontend/`, deployed on Vercel at https://niwa-website-six.vercel.app
- Backend: Express + TypeScript + MongoDB in `backend/`, configured for Render but NOT deployed (no env vars set)
- Typecheck, lint, 62 tests, and production build all pass
- Root route `/` returns 404 — no landing page
- Auth UI exists but GAPS.md indicates frontend auth API integration is incomplete/inconsistent
- Backend not live, so frontend cannot call real API in production
- Missing: workspace UI, tag management, accessibility audit, CI, error monitoring, mobile polish

---

## Tasks

### 8.1 Public landing page and root routing

- [ ] Add a public `LandingPage` component at `src/features/marketing/pages/landing-page.tsx` (or `src/components/layout/landing-page.tsx`)
- [ ] Add `/` route to router rendering `LandingPage` (no auth required)
- [ ] Landing page: NIWA wordmark, tagline ("A garden for your ideas"), feature bullets, login/register/CTA links, theme toggle hint
- [ ] Redirect authenticated users from `/` to `/app/projects` (or show landing with "Open app" button)
- [ ] Add a proper 404 page component and wildcard route `*` → `NotFoundPage`
- [ ] Ensure refreshing `/app/projects/:itemId` does not lose selected item state (persist via URL + query client)

### 8.2 Backend deployment (Render)

- [ ] Deploy backend to Render service using existing `backend/render.yaml`
- [ ] Set Render environment variables: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`, `PORT`, `NODE_ENV`
- [ ] Verify `/health` endpoint responds
- [ ] Update frontend `VITE_API_BASE_URL` in Vercel to point to the live Render API
- [ ] Test auth cookies (HttpOnly, SameSite, secure) work cross-origin between Vercel frontend and Render backend
- [ ] Verify CORS allows only the Vercel frontend origin with credentials

### 8.3 Complete frontend auth integration

- [ ] Verify login/register call the real backend API (not stubs) with toast feedback
- [ ] Session persists across page reloads via `authApi.me()` on mount
- [ ] Protected routes redirect unauthenticated users to `/login` preserving `from` location
- [ ] Logout clears session and redirects to `/login`
- [ ] Show understandable auth errors (invalid credentials, email taken, session expired)
- [ ] Add "View account information" page (settings/account is currently a stub)

### 8.4 Workspace UI

- [ ] Workspace list page (`/app/workspaces`) — list personal workspaces
- [ ] Create workspace form
- [ ] Workspace selector in sidebar/header
- [ ] Items use `workspaceId` from auth context instead of hardcoded values
- [ ] Ownership enforcement — users only see their own workspace items

### 8.5 Core feature polish (per spec Section 7)

- [ ] **Inbox:** real API integration, convert idea to project/task, move into hierarchy, keyboard focus preserved after create
- [ ] **Projects:** item counts and completion summaries in tree, "No items yet" for empty branches, loading/error states visible in tree, breadcrumb navigation, navigate to ancestors
- [ ] **Focus:** real API integration, filters applied (project/status/priority/tag), change item status, open full hierarchy, navigate back to project context, only show sections with content
- [ ] **Search:** real API integration, keyboard navigation of results, open result directly in hierarchy, cancel stale requests (AbortController)
- [ ] **Tags:** add/remove/reuse tags, tag filter chips in projects/inbox/focus
- [ ] **Detail panel:** parent breadcrumb display, child items list, completion date, version conflict UI feedback
- [ ] **Sorting/filtering:** manual order, title, last updated, deadline, priority sorting; status/priority/tags/deadline/item-type filters

### 8.6 Notifications and feedback

- [ ] Toast notifications wired to mutations (sonner already installed — verify usage across all features)
- [ ] Confirmation dialogs for destructive actions (delete/archive)
- [ ] Visible loading states on all async operations
- [ ] Unsaved-change protection for inline edits and detail panel
- [ ] Clear validation errors on forms

### 8.7 Responsive layout and accessibility

- [ ] Tablet: collapsible sidebar
- [ ] Mobile: compact nav, drawer or dedicated screen for details
- [ ] Touch-friendly tree expansion
- [ ] ARIA tree semantics audited (role="tree", aria-label on icon buttons)
- [ ] Visible focus indicators
- [ ] Reduced-motion support
- [ ] Contrast audit against WCAG AA

### 8.8 Testing and CI

- [ ] GitHub Actions CI: install, lint, typecheck, unit+component tests, production build on every PR
- [ ] E2E Playwright tests run against live/test backend (critical journeys: auth, inbox, projects, search, keyboard shortcuts)
- [ ] Integration tests against real backend (not just mocked apiClient)
- [ ] Unauthorized session handling tests
- [ ] Stale search response tests
- [ ] Query cache invalidation after mutation tests

### 8.9 Documentation and portfolio

- [ ] README: local setup, env vars, features, testing, deployment, known limitations, roadmap
- [ ] Architecture decision records (ADRs) for key choices
- [ ] Screenshots of the website
- [ ] Live demo link in README
- [ ] OpenAPI spec complete and linked

---

## Assumptions

- Backend is independently deployable (Express + MongoDB on Render), frontend on Vercel
- Auth uses HttpOnly cookies; CORS restricted to frontend origin
- No team workspaces in MVP — personal workspace only
- No offline-first sync, real-time collaboration, or native apps in this milestone

---

## Exit criteria

- [ ] `pnpm run dev` starts and `/` renders a proper landing page (no 404)
- [ ] `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, `pnpm run build` all pass
- [ ] Backend deployed to Render and reachable via HTTPS
- [ ] Frontend deployed to Vercel with `VITE_API_BASE_URL` pointing to live backend
- [ ] Users can register, log in, create items, nest them, move them, and log out end-to-end
- [ ] Auth cookies work cross-origin in production
- [ ] CI pipeline runs on every PR
- [ ] README accurately describes implemented features and known limitations

---

## Suggested implementation order

1. Landing page + 404 + root routing (unblocks "normal site" feel)
2. Backend deployment to Render (unblocks real API)
3. Frontend auth integration verification
4. Workspace UI
5. Core feature polish (Inbox, Projects, Focus, Search, Tags)
6. Notifications/feedback + responsive + accessibility
7. Testing + CI
8. Documentation + portfolio
