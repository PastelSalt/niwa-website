# GAPS.md — Missing Features & Known Gaps

Analysis of the NIWA website codebase against the Project Specification. This file tracks all gaps, missing features, and known limitations that remain after Milestone 6.

## 1. Backend (Critical Gap)

The backend is a **separate service not included in this repository**. Per spec Section 1.3 and 10, the React app must not connect directly to MongoDB. All frontend API calls currently target `http://localhost:5173/api/v1/*` via mock fetch in tests, or the real `VITE_API_BASE_URL` which is not yet connected to a running backend.

**Missing:**
- Node.js/Express/MongoDB API server (endpoints in Section 10)
- MongoDB Atlas database (connection file `src/lib/db.ts` exists for server-side use but no server routes consume it)
- OpenAPI specification (Section 4.3, 10.5, 17.3)
- Authentication backend (register/login/logout/me/refresh)
- Items backend with hierarchy validation (no cycles, valid parent-child)
- Search and Focus backend endpoints
- Workspace backend

**Files affected:** `src/lib/db.ts` (exists, unused by any server route)

---

## 2. Authentication (Partial)

**Implemented:** Login/Register page stubs, ProtectedRoute guard, AuthProvider context, theme toggle, logout button.

**Missing:**
- Real API integration (login/register currently navigate to `/app` on submit without calling an API)
- HttpOnly cookie handling (api-client sends `credentials: "include"` but no backend sets cookies)
- CSRF protection (spec 7.1, 12)
- Session refresh logic (refresh endpoint defined but not wired)
- Password recovery flow (spec 7.1)
- Account information view (spec 7.1)
- "View account information" page (settings/account is a stub)

**Files affected:** `src/features/auth/pages/login-page.tsx`, `register-page.tsx`, `src/features/auth/api/auth.ts`, `src/features/auth/hooks/use-auth.tsx`

---

## 3. Workspaces (Not Implemented)

Per spec Section 10.2, workspaces have full CRUD endpoints.

**Missing:**
- Workspace list/create/edit/delete UI
- Workspace selector (multiple workspaces not supported; hardcoded `"workspace_123"`)
- Personal workspace creation flow (spec 15 MVP)

**Files affected:** No workspace feature directory exists.

---

## 4. Hierarchical Items (Partial)

**Implemented:** ItemTree component (expand/collapse, inline rename, add child, delete), ItemDetailPanel (view/edit/save), API hooks (create/update/delete/children/tree/move/archive/restore), tree utilities (buildTree, findItem, toggleExpansion, buildBreadcrumb).

**Missing:**
- Drag-and-drop reordering (spec 7.3 says drag-and-drop may be provided but equivalent accessible actions required — keyboard/menu reorder not implemented)
- Move items to another parent via UI (API exists, UI does not expose it)
- Reorder siblings via UI (API exists, UI does not expose it)
- Item counts and completion summaries in tree (spec 7.3)
- "Empty branches communicate no children" (partial — shows "No items yet" only at root level)
- Loading and error states in tree (partial — shows loading at page level only)
- Large-tree virtualization (spec 11 performance)
- Partial tree rendering / load descendants on demand (spec 7.3, 11)
- Cancel obsolete requests (api-client has AbortController but not wired to tree expansion)
- Breadcrumb navigation in UI (utility exists, not displayed anywhere)
- Navigate to ancestors from item (spec 7.3, 7.4)
- Open deeply nested items from search results (search page shows ancestor path but doesn't navigate)

**Files affected:** `src/features/items/components/item-tree.tsx`, `src/features/items/components/item-detail-panel.tsx`, `src/features/items/utils/tree.ts`, `src/features/items/utils/breadcrumb.ts`

---

## 5. Item Detail Panel (Partial)

**Implemented:** View/edit mode, title/description/status/priority/tags/deadline/estimated effort, timestamps, version display, delete with confirmation.

**Missing:**
- Parent breadcrumb display (spec 7.4)
- Child items list in panel (spec 7.4)
- Creation date / last updated / completion date display (partial — shows created/updated/completed)
- Autosave with clear feedback (spec 7.4 — optional)
- Version conflict UI feedback when server rejects stale version (spec 7.4)
- Clear way to close panel and return to prior context (exists — close button)

**Files affected:** `src/features/items/components/item-detail-panel.tsx`

---

## 6. Inbox (Partial)

**Implemented:** Quick capture form, status toggle, archive/delete, tag chips, loading/empty states.

**Missing:**
- Real API integration (uses mock fetch in tests; page not connected to backend)
- Add description later (edit via detail panel only)
- Convert idea to project/task (API exists, UI button missing)
- Move item into hierarchy (API exists, UI button missing)
- Keyboard focus preserved after creating items (spec 7.2)
- Enter submits simple title (exists in capture form)

**Files affected:** `src/features/inbox/pages/inbox-page.tsx`, `src/features/inbox/hooks/use-inbox.ts`

---

## 7. Focus View (Partial)

**Implemented:** Page stub with 5 section configs (In Progress, High Priority, Overdue, Upcoming, Recently Updated), filter state.

**Missing:**
- Real API integration (uses mock fetch)
- Filter by project/status/priority/tag (state exists, not applied to API calls)
- Change an item's status (not implemented)
- Open item's full hierarchy from Focus (not implemented)
- Navigate back to original project context (spec 7.5)
- Only display sections with useful content (logic exists, data comes from mock)

**Files affected:** `src/features/focus/focus-page.tsx`, `src/features/focus/hooks/use-focus.ts`

---

## 8. Global Search (Partial)

**Implemented:** Debounced input (300ms), results display with title/type/status/priority/project/ancestor path/excerpt, loading/empty/error states, Escape to clear.

**Missing:**
- Real API integration (uses mock fetch)
- Keyboard navigation of results (spec 7.6)
- Open result directly in hierarchy (not implemented)
- Cancel/ignore stale requests (api-client supports AbortController, not wired)
- Search within current project (spec 7.3)

**Files affected:** `src/features/search/search-page.tsx`, `src/features/search/hooks/use-search.ts`

---

## 9. Tags (Not Implemented)

Per spec 7.7, tags should be addable/removable/reusable.

**Missing:**
- Tag management UI (add/remove/reuse)
- Tag filter chips in projects/focus/inbox
- Tag-based filtering UI

**Files affected:** No tag feature directory exists.

---

## 10. Sorting and Filtering (Partial)

**Implemented:** Filter state in Focus page; sort/filter options defined in spec but not wired.

**Missing:**
- Manual order, title, last updated, deadline, priority sorting (spec 7.8)
- Status/priority/tags/deadline/item-type filters in projects/inbox (Focus has state only)
- Manual ordering preserved on return (spec 7.8)

**Files affected:** `src/features/projects/projects-page.tsx`, `src/features/inbox/pages/inbox-page.tsx`

---

## 11. Notifications and Feedback (Minimal)

**Implemented:** Error banners in auth pages, save states in detail panel.

**Missing:**
- Success feedback after important operations (spec 7.9)
- Clear validation errors (partial — form errors shown)
- Confirmation for destructive actions (delete has confirm dialog)
- Visible loading states (partial)
- Non-blocking notifications for routine events (no toast/notification system)
- Unsaved-change protection (spec 7.9 — not implemented)

**Files affected:** `src/components/feedback/` (only keyboard-shortcuts exists)

---

## 12. Navigation and Routing (Partial)

**Implemented:** React Router, routes for /login, /register, /app/{inbox,projects,focus,search,settings}, protected routes.

**Missing:**
- `/app/projects/:itemId` deep link loads correct item (route exists but item selection not persisted via URL)
- Refreshing item URL must not lose selected item (not implemented)
- Invalid/deleted item IDs show not-found state (not implemented)
- Routes should not encode sensitive information (OK)

**Files affected:** `src/app/router.tsx`, `src/features/projects/projects-page.tsx`

---

## 13. Theme and Appearance (Partial)

**Implemented:** Light/dark theme toggle, CSS tokens, `data-theme` attribute, localStorage persistence.

**Missing:**
- Settings/appearance page (stub only)
- System theme detection (implemented in ThemeProvider but not exposed in UI)

**Files affected:** `src/features/settings/appearance-page.tsx` (stub)

---

## 14. Keyboard Shortcuts (Partial)

**Implemented:** KeyboardShortcuts component with Ctrl/Cmd+K, Ctrl/Cmd+N, Escape handlers.

**Missing:**
- Wired to actual actions (onOpenSearch/onCreateItem/onClosePanel are no-ops in AppLayout)
- Arrow keys for tree navigation (spec 13)
- Shortcuts documentation page
- Future customization (spec 13)

**Files affected:** `src/components/layout/app-layout.tsx`, `src/components/feedback/keyboard-shortcuts.tsx`

---

## 15. Accessibility (Not Audited)

Per spec Section 13.

**Missing:**
- ARIA tree semantics for ItemTree (role="tree" added but full ARIA not audited)
- Visible focus indicators (not verified)
- Accessible labels for icon-only controls (partial — aria-label on buttons)
- Reduced-motion support (not implemented)
- Screen-reader-friendly loading/error announcements (not implemented)
- Touch-friendly controls (not tested)
- Contrast accessibility audit (tokens defined but not audited)

**Files affected:** `src/features/items/components/item-tree.tsx`, `src/styles/tokens.css`

---

## 16. Responsive Layout (Partial)

**Implemented:** Sidebar/header layout, mobile vs desktop CSS classes.

**Missing:**
- Tablet: collapsible sidebar (not implemented)
- Mobile: compact nav, drawer/dedicated screen for details (not implemented)
- Avoid drag-and-drop for essential actions (not applicable yet since DnD not implemented)
- Touch-friendly tree expansion (not implemented)

**Files affected:** `src/components/layout/app-layout.tsx`, `src/components/layout/sidebar.tsx`

---

## 17. Performance (Not Optimized)

Per spec Section 11.

**Missing:**
- Virtualized rendering for large trees
- Pagination for large lists
- Cache loaded children (TanStack Query caches but tree doesn't leverage it for partial rendering)
- Load root items first, fetch children on expand (tree loads all items at once via `useItems`)

**Files affected:** `src/features/items/components/item-tree.tsx`, `src/features/items/hooks/use-items.ts`

---

## 18. Testing Gaps

**Implemented:** 62 unit/component/integration tests (10 files).

**Missing:**
- Playwright E2E tests not run against live server (scaffolding only, no test execution)
- Integration tests against real backend (mocked apiClient only)
- Unauthorized session handling tests
- Stale search response tests
- Query cache invalidation after mutation tests (hooks have logic, not tested end-to-end)

**Files affected:** `src/e2e/critical-journeys.spec.ts` (scaffolding only)

---

## 19. Production and Deployment (Partial)

**Implemented:** Vercel deployment, vercel.json SPA fallback, VITE_API_BASE_URL env var.

**Missing:**
- `VITE_API_BASE_URL` set to placeholder `https://api.example.com/api/v1` (must be replaced with actual API URL)
- CI pipeline (GitHub Actions not configured — spec 11.3)
- Error monitoring configuration (spec 11.2)
- Production environment variable documentation (partial in README)
- HTTPS configuration (Vercel handles automatically)
- Trusted backend origins / CORS (backend responsibility)

**Files affected:** `vercel.json`, `.env.local.example`, README.md

---

## 20. Documentation (Partial)

**Implemented:** README.md with setup, features, architecture, testing, deployment.

**Missing:**
- OpenAPI documentation (spec 4.3, 10.5, 17.3)
- Architecture decision records (spec 11.18)
- API documentation for frontend contracts
- Local setup instructions (partial in README)
- Testing instructions (partial in README)
- List of implemented features (partial in README)
- List of known limitations (this GAPS.md addresses)
- Roadmap for future development (partial in README)
- Screenshots of website (spec 20)
- Live demo link (Vercel URL in README)

**Files affected:** README.md (no OpenAPI spec or ADR files exist)

---

## 21. MVP Exclusions (Per Spec Section 15)

These are explicitly excluded from MVP and should NOT be implemented yet:
- Native mobile application (Flutter)
- Native desktop packaging (Electron)
- Offline-first synchronization
- Real-time collaborative editing
- Team workspaces
- AI-generated task breakdowns
- Calendar integrations
- Habit tracking
- Finance tracking
- Plugin architecture
- Complex automation rules
- Advanced analytics
- File synchronization
- Graph-based project visualization

---

## 22. Priority Gap Summary

| Priority | Gap | Effort | Blocker for MVP |
|----------|-----|--------|-----------------|
| Critical | Backend API server | High | Yes — frontend cannot function without it |
| High | Real API integration (all features use mocks) | High | Yes |
| High | Workspace CRUD | Medium | Yes — items hardcode workspace_123 |
| High | Drag-and-drop / keyboard reorder | Medium | No (accessible fallback needed) |
| High | Move items between parents | Medium | No (API exists, UI missing) |
| Medium | Focus/Inbox/Search real integration | Medium | Yes |
| Medium | Notifications/toast system | Low | No |
| Medium | Accessibility audit | Medium | No |
| Medium | Large-tree virtualization | Medium | No |
| Low | E2E test execution | Low | No |
| Low | OpenAPI documentation | Medium | No (post-MVP) |
| Low | CI pipeline | Low | No |

---

## 23. Files Created in This Project

**Planning:** LOG.md, PLAN-0.5-GitHub-Vercel-MongoDB.md, PLAN-01 through PLAN-07, GAPS.md

**Source:** src/app/, src/components/, src/features/, src/lib/, src/styles/, src/test/, src/e2e/

**Config:** package.json, pnpm-lock.yaml, tsconfig.json, tsconfig.node.json, vite.config.ts, postcss.config.mjs, .prettierrc, eslint.config.js, vercel.json, playwright.config.ts

**Docs:** README.md, .env.local.example

**Gitignored (not committed):** .env.local, node_modules/, dist/, .vercel/
