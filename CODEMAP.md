# CODEMAP.md — NIWA Web Codebase Map

Complete file-by-file map of the NIWA web application codebase.

## Repository Root

| File | Purpose |
|------|---------|
| `package.json` | Root package — delegates scripts to `frontend/` (dev, build, lint, typecheck, test, e2e, start) |
| `vercel.json` | Vercel deployment config — `rootDirectory: frontend/`, SPA route fallback |
| `render.yaml` | Render deployment config — builds `backend/`, runs health check |
| `.gitignore` | Ignores `node_modules/`, `dist/`, `.env*`, `.vercel/`, `coverage/` |
| `README.md` | Project overview, setup, features, testing, deployment docs |
| `LOG.md` | Session action log — every change recorded per session rule |
| `GAPS.md` | Gap analysis — missing features vs. Project Specification |
| `NIWA Web — Project Specification.md` | Full product specification (source of truth) |
| `LOG.md` | Action log |

---

## Backend (`backend/`)

Node.js/Express/MongoDB API service, deployed on Render.

### Entry & Config

| File | Purpose |
|------|---------|
| `backend/package.json` | Backend dependencies (express, mongodb, zod, bcryptjs, jsonwebtoken, cors, cookie-parser, dotenv) |
| `backend/tsconfig.json` | TypeScript strict config (module: Node16, moduleResolution: node16) |
| `backend/.env.example` | Environment variable template (not committed) |
| `backend/.gitignore` | Backend-specific ignore rules |
| `backend/eslint.config.js` | ESLint flat config |

### Source (`backend/src/`)

| File | Purpose |
|------|---------|
| `src/index.ts` | Express app entry — creates HTTP server, listens on PORT |
| `src/app.ts` | Express app — middleware, route mounting, health check (`/health`) |
| `src/config/env.ts` | Environment validation via Zod, typed env access |
| `src/lib/db.ts` | MongoDB connection — cached singleton via `globalThis`, `connectToMongoDB()`, `getDatabase()`, `closeMongoDB()` |
| `src/lib/auth.ts` | JWT helpers — `generateAccessToken()`, `generateRefreshToken()`, `verifyAccessToken()`, `verifyRefreshToken()`, `getCookieOptions()` (uses `createRequire` for CommonJS `jsonwebtoken`) |
| `src/middleware/auth.ts` | `authenticate()` — validates access token cookie, populates `req.user` |
| `src/middleware/cors.ts` | CORS middleware — restricted to `FRONTEND_URL` origin, credentials enabled |
| `src/middleware/error.ts` | `errorHandler()` — consistent error format `{ error: { code, message, details } }`; `notFoundHandler()` |

### Routes (`backend/src/routes/`)

| File | Endpoints |
|------|-----------|
| `routes/auth.ts` | `POST /register`, `POST /login`, `POST /logout`, `GET /me`, `POST /refresh` |
| `routes/workspaces.ts` | `GET /workspaces`, `POST /workspaces`, `GET /workspaces/:id`, `PATCH /workspaces/:id`, `DELETE /workspaces/:id` |
| `routes/items.ts` | `POST /items`, `GET /items/:id`, `PATCH /items/:id`, `DELETE /items/:id`, `GET /items/:id/children`, `GET /items/:id/tree`, `POST /items/:id/move`, `POST /items/:id/archive`, `POST /items/:id/restore` |
| `routes/search.ts` | `GET /search?q=...` — full-text search |
| `routes/focus.ts` | `GET /focus`, `GET /focus/overdue`, `GET /focus/upcoming` |

### Controllers (`backend/src/controllers/`)

| File | Purpose |
|------|---------|
| `controllers/auth.controller.ts` | Register (creates user + default workspace), login, logout, me, refresh |
| `controllers/workspace.controller.ts` | Workspace CRUD with ownership enforcement |
| `controllers/items.controller.ts` | Item CRUD, version concurrency (409 conflict), cycle detection on move, archive/restore, tree building |
| `controllers/search.controller.ts` | Full-text search on title/description |
| `controllers/focus.controller.ts` | Focus sections: In Progress, High Priority, Overdue, Upcoming, Recently Updated |

### Models (`backend/src/models/`)

| File | Purpose |
|------|---------|
| `models/auth.schema.ts` | Zod schemas: `registerSchema`, `loginSchema` |
| `models/item.schema.ts` | Zod schemas: `createItemSchema`, `updateItemSchema`, `moveItemSchema`, enums (type, status, priority) |
| `models/workspace.schema.ts` | Zod schema: `createWorkspaceSchema` |

---

## Frontend (`frontend/`)

React 19 + TypeScript + Vite + Tailwind CSS v4 + TanStack Query + React Router + React Hook Form + Zod.

### Entry & Config

| File | Purpose |
|------|---------|
| `frontend/package.json` | Frontend dependencies and scripts |
| `frontend/tsconfig.json` | TypeScript strict config |
| `frontend/vite.config.ts` | Vite config — React plugin, `@` alias, Vitest config |
| `frontend/postcss.config.mjs` | Tailwind CSS v4 + Autoprefixer |
| `frontend/.prettierrc` | Prettier formatting config |
| `frontend/eslint.config.js` | ESLint flat config |
| `frontend/index.html` | HTML entry — mounts `#root` |
| `frontend/vercel.json` | Vercel static build config — SPA route fallback |
| `frontend/.env.local.example` | `VITE_API_BASE_URL` template (gitignored `.env.local` not committed) |
| `frontend/playwright.config.ts` | Playwright E2E config — 5 browser projects |

### App Shell (`frontend/src/`)

| File | Purpose |
|------|---------|
| `src/main.tsx` | React root render — wraps `Providers` > `App` |
| `src/app/App.tsx` | `RouterProvider` — React Router |
| `src/app/router.tsx` | Route definitions — `/login`, `/register`, `/app/{inbox,projects,focus,search,settings}`, protected routes |
| `src/app/providers.tsx` | `QueryClientProvider`, `ThemeProvider`, `AuthProvider` |
| `src/app/query-client.ts` | TanStack Query client — staleTime 5min, gcTime 30min |

### Components (`frontend/src/components/`)

| File | Purpose |
|------|---------|
| `components/layout/app-layout.tsx` | Sidebar + Header + main content + KeyboardShortcuts |
| `components/layout/sidebar.tsx` | Navigation: Inbox, Projects, Focus, Search, Settings + theme toggle |
| `components/layout/header.tsx` | NIWA wordmark, search button, account/logout |
| `components/layout/theme-provider.tsx` | Light/dark theme context + localStorage persistence |
| `components/layout/protected-route.tsx` | Redirects to `/login` if unauthenticated, preserves `from` location |
| `components/layout/detail-panel.tsx` | Wraps `ItemDetailPanel` |
| `components/ui/` | shadcn/ui primitives (index) |
| `components/feedback/keyboard-shortcuts.tsx` | Global hotkeys: Ctrl/Cmd+K (search), Ctrl/Cmd+N (create), Escape (close) |
| `components/shared/` | Shared utilities (index) |

### Features (`frontend/src/features/`)

| Feature | Files | Purpose |
|---------|-------|---------|
| **auth** | `api/auth.ts`, `hooks/use-auth.tsx`, `pages/login-page.tsx`, `pages/register-page.tsx`, `schemas/index.ts`, `types/index.ts` | Register/login/logout/session, React Hook Form + Zod validation, AuthContext |
| **inbox** | `api/inbox.ts`, `hooks/use-inbox.ts`, `pages/inbox-page.tsx` | Quick capture, status toggle, archive/delete |
| **items** | `api/items.ts`, `hooks/use-items.ts`, `components/item-tree.tsx`, `components/item-detail-panel.tsx`, `types/index.ts`, `schemas/index.ts`, `utils/tree.ts`, `utils/breadcrumb.ts` | Hierarchical item tree, detail panel with version concurrency, tree utilities |
| **projects** | `projects-page.tsx` | Projects view — tree + detail panel |
| **focus** | `api/focus.ts`, `hooks/use-focus.ts`, `focus-page.tsx` | Focus sections with filters |
| **search** | `api/search.ts`, `hooks/use-search.ts`, `search-page.tsx` | Debounced search, ancestor paths in results |
| **settings** | `settings-page.tsx`, `account-page.tsx`, `appearance-page.tsx` | Account and appearance stubs |

### Library (`frontend/src/lib/`)

| File | Purpose |
|------|---------|
| `lib/api-client.ts` | Centralized fetch wrapper — base URL, credentials, error normalization, 30s timeout |
| `lib/errors.ts` | `ApiError` class, `normalizeError()` |
| `lib/date.ts` | `formatDate()`, `formatRelativeTime()`, `isOverdue()`, `parseISO8601()` |
| `lib/utils.ts` | `cn()`, `debounce()`, `generateId()` |

### Tests (`frontend/src/`)

| File | Purpose |
|------|---------|
| `src/test/setup.ts` | Vitest setup — fake timers, crypto mock, fetch mock, queryClient cleanup |
| `src/test/helpers.tsx` | `withProviders()` wrapper for component tests |
| `src/test/fixtures/items.ts` | Mock workspace/item data |
| `src/features/items/schemas/item-schemas.test.ts` | Zod schema unit tests |
| `src/features/items/utils/breadcrumb.test.ts` | `buildBreadcrumb()` tests |
| `src/features/items/utils/tree.test.ts` | `buildTree()`, `findItem()`, `toggleExpansion()` tests |
| `src/features/items/components/item-tree.test.tsx` | ItemTree component tests (expand/collapse, select, create, update, delete) |
| `src/features/items/components/item-detail-panel.test.tsx` | Detail panel tests (view/edit/save/delete) |
| `src/features/items/api/item-api.integration.test.ts` | Item API integration tests (mocked) |
| `src/lib/date.test.ts` | Date utility tests |
| `src/lib/errors.test.ts` | Error normalization tests |
| `src/lib/utils.test.ts` | `cn()` utility tests |
| `src/smoke.test.ts` | Smoke test |

### E2E (`frontend/src/e2e/`)

| File | Purpose |
|------|---------|
| `e2e/critical-journeys.spec.ts` | Playwright tests — auth, inbox capture, projects/hierarchy, search, keyboard shortcuts |

### Styles (`frontend/src/styles/`)

| File | Purpose |
|------|---------|
| `styles/globals.css` | Base CSS — Tailwind imports, theme tokens (sage green, warm cream, cherry-blossom pink, charcoal, gray-green) |
| `styles/tokens.css` | CSS custom properties — light/dark theme variables |
| `styles/css.d.ts` | CSS module type declarations |

---

## Documentation

| File | Purpose |
|------|---------|
| `docs/PLAN-0.5-GitHub-Vercel-MongoDB.md` | Milestone 0.5 plan — GitHub, Vercel, MongoDB Atlas setup |
| `docs/PLAN-01-Foundation.md` | Milestone 1 plan — project foundation |
| `docs/PLAN-02-Auth-Workspace.md` | Milestone 2 plan — authentication and workspace |
| `docs/PLAN-03-Hierarchical-Items.md` | Milestone 3 plan — hierarchical items |
| `docs/PLAN-04-Inbox-Focus.md` | Milestone 4 plan — inbox and focus |
| `docs/PLAN-05-Search-Polish.md` | Milestone 5 plan — search and polish |
| `docs/PLAN-06-Production-Readiness.md` | Milestone 6 plan — production readiness |
| `docs/PLAN-06.4-Frontend-Migration.md` | Frontend migration to `frontend/` folder |
| `docs/PLAN-06.5-Backend-Render.md` | Backend implementation on Render |
| `docs/PLAN-07-Future-Platform.md` | Milestone 7 plan — future platform preparation |

---

## Architecture Summary

**Frontend** (Vercel): React 19 + TypeScript 5.5 + Vite + Tailwind CSS v4 + TanStack Query + React Router + React Hook Form + Zod + Lucide React. Feature-based architecture under `frontend/src/features/`.

**Backend** (Render): Node.js + Express + TypeScript + MongoDB driver. REST API at `/api/v1/*`. JWT auth with HttpOnly cookies. CORS restricted to Vercel frontend.

**Data Flow**: Frontend → `api-client.ts` (fetch with cookies) → Express API → MongoDB driver → MongoDB Atlas. Auth via HttpOnly cookies (access token 15min, refresh token 7days). Hierarchy stored via `parentId` with server-side cycle detection.
