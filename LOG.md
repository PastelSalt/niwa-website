# Project Action Log

All actions taken during development of the NIWA website will be logged here.
This file must be updated at the end of every session with every file created,
edited, deleted, or command run.

## Log entries

| Date (UTC) | Action | File(s) | Details |
|------------|--------|---------|---------|
| 2026-10-27T10:58:40Z | Created planning files | LOG.md, PLAN-01-Foundation.md, PLAN-02-Auth-Workspace.md, PLAN-03-Hierarchical-Items.md, PLAN-04-Inbox-Focus.md, PLAN-05-Search-Polish.md, PLAN-06-Production-Readiness.md, PLAN-07-Future-Platform.md | Initial project planning based on NIWA Web — Project Specification.md |
| 2026-10-27T11:00:20Z | Installed pnpm globally | npm, pnpm | Installed pnpm v12.15.0 via npm (PowerShell execution policy adjusted) |
| 2026-10-27T11:00:20Z | Initialized pnpm project | package.json, pnpm-lock.yaml | `pnpm init -y` |
| 2026-10-27T11:00:20Z | Installed production dependencies | package.json, node_modules/ | react, react-dom, react-router-dom, @tanstack/react-query, react-hook-form, zod, lucide-react, clsx, tailwind-merge |
| 2026-10-27T11:00:20Z | Installed dev dependencies | package.json, node_modules/ | typescript@5.5.4, vite, @vitejs/plugin-react, tailwindcss@4, @tailwindcss/postcss, autoprefixer, postcss, @types/react, @types/react-dom, vitest, @testing-library/react, @testing-library/jest-dom, jsdom, eslint, prettier, typescript-eslint, eslint-config-prettier, playwright |
| 2026-10-27T11:00:20Z | Created tooling config files | tsconfig.json, tsconfig.node.json, vite.config.ts, postcss.config.mjs, .prettierrc, eslint.config.css | TypeScript strict mode, Vite + React plugin, Tailwind v4 + PostCSS, Prettier, ESLint flat config, Vitest |
| 2026-10-27T11:00:20Z | Created theme token files | src/styles/globals.css, src/styles/tokens.css, src/styles/css.d.ts | Sage green, warm cream, cherry-blossom pink, charcoal, gray-green, border, success, warning, error tokens; light/dark theme support |
| 2026-10-27T11:00:20Z | Created directory structure | src/app, src/components/{ui,layout,feedback,shared}, src/features/{auth,inbox,items,projects,focus,search,settings}, src/lib, src/test/fixtures | Per Section 9 feature-based architecture |
| 2026-10-27T11:00:20Z | Created application shell | src/main.tsx, src/app/App.tsx, src/app/router.tsx, src/app/providers.tsx, src/app/query-client.ts | React Router, TanStack Query provider, Theme provider, base routes (/login, /register, /app/*) |
| 2026-10-27T11:00:20Z | Created layout components | src/components/layout/app-layout.tsx, sidebar.tsx, header.tsx, detail-panel.tsx, theme-provider.tsx | Persistent sidebar, header, collapsible theme toggle, detail panel stub |
| 2026-10-27T11:00:20Z | Created API client | src/lib/api-client.ts, src/lib/errors.ts, src/lib/date.ts, src/lib/utils.ts | Centralized fetch wrapper with base URL, auth cookies, error normalization, timeout, cancellation |
| 2026-10-27T11:00:20Z | Created item types and schemas | src/features/items/types/index.ts, src/features/items/schemas/index.ts | Item type, status, priority enums; Zod schemas for create/update/move |
| 2026-10-27T11:00:20Z | Created page stubs | src/features/auth/pages/{login,register}-page.tsx, src/features/inbox/pages/inbox-page.tsx, src/features/projects/projects-page.tsx, src/features/focus/focus-page.tsx, src/features/search/search-page.tsx, src/features/settings/settings-page.tsx | Stub pages for all spec routes |
| 2026-10-27T11:00:20Z | Created test infrastructure | src/test/setup.ts, src/test/fixtures/items.ts, src/smoke.test.ts | Vitest setup with fake timers, crypto mock, cleanup; mock workspace/item fixtures |
| 2026-10-27T11:00:20Z | Verified Milestone 1 | lint, typecheck, test, build | All four pass: ESLint clean, tsc --noEmit clean, vitest 1 test passed, vite build succeeded |
| 2026-10-27T11:10:18Z | Installed @hookform/resolvers | package.json | Zod resolver for React Hook Form |
| 2026-10-27T11:10:18Z | Created auth types and schemas | src/features/auth/types/index.ts, src/features/auth/schemas/index.ts | User, AuthSession, RegisterInput, LoginInput types; Zod schemas for register/login |
| 2026-10-27T11:10:18Z | Created auth API integration | src/features/auth/api/auth.ts | Register, login, logout, me, refresh endpoints with typed responses |
| 2026-10-27T11:10:18Z | Created auth state management | src/features/auth/hooks/use-auth.tsx | AuthContext, AuthProvider, useAuth hook with login/register/logout/refresh/clearError |
| 2026-10-27T11:10:18Z | Created protected route guard | src/components/layout/protected-route.tsx | Redirects unauthenticated users to /login, renders Outlet when authenticated |
| 2026-10-27T11:10:18Z | Updated providers | src/app/providers.tsx | Added AuthProvider wrapping ThemeProvider |
| 2026-10-27T11:10:18Z | Updated router with protected routes | src/app/router.tsx | /app routes wrapped in ProtectedRoute; added settings sub-pages |
| 2026-10-27T11:10:18Z | Wired up login/register pages | src/features/auth/pages/login-page.tsx, register-page.tsx | React Hook Form + Zod validation, error display, loading states, navigation on success |
| 2026-10-27T11:10:18Z | Updated header with auth state | src/components/layout/header.tsx | Shows user email when authenticated, log in/log out buttons |
| 2026-10-27T11:10:18Z | Created settings sub-pages | src/features/settings/account-page.tsx, appearance-page.tsx | Stub pages for /app/settings/account and /app/settings/appearance |
| 2026-10-27T11:10:18Z | Verified Milestone 2 | lint, typecheck, test, build | All four pass: ESLint clean, tsc --noEmit clean, vitest 1 test passed, vite build succeeded |
| 2026-10-27T11:17:04Z | Created Item API integration | src/features/items/api/items.ts | Create, get, update, delete, children, tree, move, archive, restore endpoints |
| 2026-10-27T11:17:04Z | Created Item API hooks | src/features/items/hooks/use-items.ts | TanStack Query hooks: useItems, useItem, useChildren, useTree, useCreateItem, useUpdateItem, useDeleteItem, useMoveItem, useArchiveItem, useRestoreItem |
| 2026-10-27T11:17:04Z | Created item utilities | src/features/items/utils/breadcrumb.ts, tree.ts | buildBreadcrumb, buildTree, findItem, toggleExpansion tree utilities |
| 2026-10-27T11:17:04Z | Created ItemTree component | src/features/items/components/item-tree.tsx | Hierarchical tree with expand/collapse, inline edit, add child, delete, ARIA tree semantics |
| 2026-10-27T11:17:04Z | Created ItemDetailPanel | src/features/items/components/item-detail-panel.tsx | Edit/view item fields with version concurrency, status/priority badges, timestamps |
| 2026-10-27T11:17:04Z | Updated layout DetailPanel | src/components/layout/detail-panel.tsx | Wraps ItemDetailPanel with item/onClose props |
| 2026-10-27T11:17:04Z | Updated ProjectsPage | src/features/projects/projects-page.tsx | Connected ItemTree + DetailPanel with create/update/delete via mutations |
| 2026-10-27T11:17:04Z | Verified Milestone 3 | lint, typecheck, test, build | All four pass: ESLint clean, tsc --noEmit clean, vitest 1 test passed, vite build succeeded |
| 2026-10-27T11:44:07Z | Created Inbox API integration | src/features/inbox/api/inbox.ts, src/features/inbox/hooks/use-inbox.ts | List, create, update, delete, convert, move-to-hierarchy endpoints and hooks |
| 2026-10-27T11:44:07Z | Created Focus API integration | src/features/focus/api/focus.ts, src/features/focus/hooks/use-focus.ts | List, overdue, upcoming endpoints with filters; TanStack Query hooks |
| 2026-10-27T11:44:07Z | Created Inbox page | src/features/inbox/pages/inbox-page.tsx | Quick capture form, status toggle, archive/delete, tag display |
| 2026-10-27T11:44:07Z | Created Focus page | src/features/focus/focus-page.tsx | Focus sections (In Progress, High Priority, Overdue, Upcoming, Recently Updated) with item lists |
| 2026-10-27T11:44:07Z | Verified Milestone 4 | lint, typecheck, test, build | All four pass: ESLint clean, tsc --noEmit clean, vitest 1 test passed, vite build succeeded |
| 2026-10-27T11:49:12Z | Created Search API integration | src/features/search/api/search.ts, src/features/search/hooks/use-search.ts | Search endpoint with results including title, type, status, priority, project name, ancestor path, excerpt |
| 2026-10-27T11:49:12Z | Created Search page | src/features/search/search-page.tsx | Debounced search input (300ms), search results with ancestor paths, loading/empty/error states, Escape to clear |
| 2026-10-27T11:49:12Z | Created KeyboardShortcuts component | src/components/feedback/keyboard-shortcuts.tsx | Global hotkeys: Ctrl/Cmd+K (search), Ctrl/Cmd+N (create), Escape (close panel), input-aware |
| 2026-10-27T11:49:12Z | Updated AppLayout | src/components/layout/app-layout.tsx | Added KeyboardShortcuts component |
| 2026-10-27T11:49:12Z | Updated Header | src/components/layout/header.tsx | Added search button navigating to /app/search |
| 2026-10-27T11:49:12Z | Verified Milestone 5 | lint, typecheck, test, build | All four pass: ESLint clean, tsc --noEmit clean, vitest 1 test passed, vite build succeeded |
| 2026-10-27T12:06:54Z | Initialized git repo, created .gitignore, committed, pushed to GitHub | .gitignore, .env.local (gitignored), src/lib/db.ts, tsconfig.json, 85 files | `git init`, `git branch -M main`, `git remote add origin https://github.com/PastelSalt/niwa-website.git`, `git push -u origin main` |
| 2026-10-27T12:06:54Z | Installed mongodb driver and created DB connection utility | src/lib/db.ts, package.json, pnpm-lock.yaml | `pnpm add mongodb`, `pnpm add -D @types/node`; connectToMongoDB() with MONGODB_URI env var, cached client singleton via globalThis, getDatabase/closeMongoDB helpers |
| 2026-10-27T12:06:54Z | Created .env.local with MONGODB_URI template | .env.local (gitignored) | Connection string template with <db_password> placeholder comment |
| 2026-10-27T12:06:54Z | Vercel deployment | vercel.json | Deployed via `vercel` CLI linked to GitHub repo PastelSalt/niwa-website; Production URL: https://niwa-website-six.vercel.app; VITE_API_BASE_URL env var set; SPA route fallback configured |
| 2026-10-27T12:06:54Z | Final verification | lint, typecheck, test, build | All four pass: ESLint clean, tsc --noEmit clean, vitest 1 test passed, vite build succeeded |
| 2026-10-27T12:22:00Z | Created comprehensive unit tests | src/features/items/schemas/item-schemas.test.ts, breadcrumb.test.ts, tree.test.ts, src/lib/date.test.ts, errors.test.ts, utils.test.ts | Item validation (Zod schemas), breadcrumb construction, tree build/find/toggle, date formatting, error normalization, cn utility |
| 2026-10-27T12:22:00Z | Created component tests | src/features/items/components/item-tree.test.tsx, item-detail-panel.test.tsx | Tree expand/collapse, select, create, update, delete; detail panel view/edit/save/delete with QueryClientProvider wrapper |
| 2026-10-27T12:22:00Z | Created integration tests | src/features/items/api/item-api.integration.test.ts | Item API: create, update (version concurrency), delete, children, tree, move, archive, restore with mocked apiClient |
| 2026-10-27T12:22:00Z | Created test helpers | src/test/helpers.tsx | withProviders wrapper (QueryClientProvider) for component tests |
| 2026-10-27T12:22:00Z | Created E2E scaffolding | playwright.config.ts, src/e2e/critical-journeys.spec.ts | Playwright config (5 projects), critical journeys: auth, inbox capture, projects/hierarchy, search, keyboard shortcuts |
| 2026-10-27T12:22:00Z | API authorization | ProtectedRoute component, auth error handling, session expiration | Route protection redirects unauthenticated users to /login; ApiError distinguishes 401/403/404/500; session reload on mount |
| 2026-10-27T12:22:00Z | Documentation | README.md, .env.local.example | Setup instructions, features, architecture, testing, deployment, environment variables, known limitations, roadmap |
| 2026-10-27T12:22:00Z | Committed and pushed Milestone 6 | 22 files, 1390 insertions | Pushed to https://github.com/PastelSalt/niwa-website.git (main) |
| 2026-10-27T12:22:00Z | Final verification | lint, typecheck, test, build | All four pass: ESLint clean (0 errors, 0 warnings), tsc --noEmit clean, vitest 62 tests passed across 10 files, vite build succeeded |
| 2026-10-27T12:46:14Z | Created GAPS.md | GAPS.md | Comprehensive gap analysis comparing codebase against NIWA Web Project Specification |
| 2026-10-27T12:52:36Z | Created PLAN-06.5-Backend-Render.md | PLAN-06.5-Backend-Render.md | Backend implementation plan (Express+TypeScript+MongoDB under backend/, Render deploy) |
| 2026-10-27T13:01:18Z | Updated PLAN-06.5-Backend-Render.md | PLAN-06.5-Backend-Render.md | Locked in open-question decisions: raw mongodb driver, JWT access+refresh HttpOnly cookies, separate domains (free tier), keep frontend at root + add backend/; added free-tier gotchas, render.yaml guidance, CORS/cookie config, exit criteria |
| 2026-10-27T13:06:14Z | Created PLAN-06.4-Frontend-Migration.md | PLAN-06.4-Frontend-Migration.md | Frontend migration plan: move all frontend code from root into frontend/ subdirectory, preserve git history, update configs, prepare for sibling backend/ directory |

---

**Rule:** Every session must append new entries to this LOG.md file before concluding work.
