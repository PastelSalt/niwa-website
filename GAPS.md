# GAPS.md — Missing Features & Known Gaps

Analysis of the NIWA website codebase against the Project Specification. This file tracks all gaps, missing features, and known limitations.

**Current state:** Milestone 0.5 complete — frontend (React/Vite) migrated to `frontend/`, backend (Node/Express/MongoDB) implemented in `backend/`, deployed on Vercel (frontend) and configured for Render (backend). 62 unit/component/integration tests passing.

---

## 1. Backend (COMPLETE)

**Implemented:** Node.js/Express/MongoDB API in `backend/` with all spec endpoints:
- Auth: register, login, logout, me, refresh (JWT access + refresh HttpOnly cookies)
- Workspaces: full CRUD with ownership enforcement
- Items: CRUD, children, tree, move (cycle detection), archive, restore (version concurrency)
- Search: full-text search at any depth
- Focus: aggregated sections (In Progress, High Priority, Overdue, Upcoming, Recently Updated)
- OpenAPI 3.0 spec at `backend/openapi.yaml`
- MongoDB connection with cached singleton via `globalThis`
- Render deployment config at `render.yaml`

**Remaining:** Backend not yet deployed to Render (environment variables need to be set in Render dashboard).

---

## 2. Authentication (Partial — Backend Complete, Frontend Integration Pending)

**Backend implemented:** register/login/logout/me/refresh with JWT access (15min) + refresh (7day) HttpOnly cookies, bcryptjs password hashing.

**Frontend:** Login/Register page stubs, ProtectedRoute guard, AuthProvider context. API integration not yet wired — login/register navigate to `/app` without calling the backend API.

**Missing:**
- Frontend auth API integration (login/register call backend API)
- CSRF protection (spec 7.1, 12 — SameSite=None cookies mitigate)
- Password recovery flow (spec 7.1)
- "View account information" page (settings/account is a stub)

**Files affected:** `src/features/auth/pages/login-page.tsx`, `register-page.tsx`, `src/features/auth/hooks/use-auth.tsx`

---

## 3. Workspaces (Partial — Backend Complete, Frontend UI Stub)

**Backend implemented:** full CRUD with ownership enforcement.

**Frontend:** `settings/account.tsx` stub only. Items hardcode `workspace_123`.

**Missing:**
- Workspace list/create/edit/delete UI
- Workspace selector
- Personal workspace creation flow wired to UI

**Files affected:** `src/features/settings/account-page.tsx`

---

## 4. Hierarchical Items (Partial — Backend Complete, Frontend Partial)

**Backend implemented:** full item CRUD with version concurrency, cycle detection, parent-child validation, archive/restore, tree building.

**Frontend:** ItemTree component (expand/collapse, inline rename, add child, delete), ItemDetailPanel (view/edit/save), tree utilities (buildTree, findItem, toggleExpansion, buildBreadcrumb).

**Missing:**
- Drag-and-drop reordering (spec 7.3 says drag-and-drop may be provided but equivalent accessible actions required — keyboard/menu reorder not implemented)
- Move items to another parent via UI — **NOW IMPLEMENTED** (Move button added to each tree row with dialog showing eligible parents, excludes self and descendants to prevent cycles)
- Reorder siblings via UI (API exists, UI missing)
- Item counts and completion summaries in tree (spec 7.3)
- "Empty branches communicate no children" (shows "No items yet" only at root level)
- Loading and error states in tree (shows at page level only)
- Large-tree virtualization (spec 11 performance)
- Partial tree rendering / load descendants on demand (loads all items at once)
- Cancel obsolete requests (AbortController not wired to tree expansion)
- Breadcrumb navigation in UI (utility exists, not displayed)
- Navigate to ancestors from item (spec 7.3, 7.4)
- Open deeply nested items from search results (search shows ancestor path but doesn't navigate)

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

**Files affected:** `src/features/items/components/item-detail-panel.tsx`

---

## 6. Inbox (Partial — Backend Complete, Frontend Stub)

**Backend implemented:** inbox endpoints (create, update, delete, convert, move-to-hierarchy).

**Frontend:** Quick capture form, status toggle, archive/delete, tag chips, loading/empty states. API not connected.

**Missing:**
- Real API integration (page not connected to backend)
- Add description later (edit via detail panel only)
- Convert idea to project/task — **NOW IMPLEMENTED** (Convert button added to each Inbox item with type selection dialog)
- Move item into hierarchy (API exists, UI button missing)
- Keyboard focus preserved after creating items (spec 7.2)

**Files affected:** `src/features/inbox/pages/inbox-page.tsx`, `src/features/inbox/hooks/use-inbox.ts`

---

## 7. Focus View (Partial — Backend Complete, Frontend Stub)

**Backend implemented:** focus endpoints with sections (In Progress, High Priority, Overdue, Upcoming, Recently Updated) and filters (project, status, priority, tag).

**Frontend:** Page stub with 5 section configs, filter state (not applied to API).

**Missing:**
- Real API integration (uses mock data)
- Filter by project/status/priority/tag applied to API calls
- Change an item's status
- Open item's full hierarchy from Focus
- Navigate back to original project context (spec 7.5)
- Only display sections with useful content

**Files affected:** `src/features/focus/focus-page.tsx`, `src/features/focus/hooks/use-focus.ts`

---

## 8. Global Search (Partial — Backend Complete, Frontend Stub)

**Backend implemented:** search endpoint with full-text search at any nesting depth.

**Frontend:** Debounced input (300ms), results display with title/type/status/priority/project/ancestor path/excerpt, loading/empty/error states, Escape to clear. API not connected.

**Missing:**
- Real API integration
- Keyboard navigation of results (spec 7.6)
- Open result directly in hierarchy (not implemented)
- Cancel/ignore stale requests (AbortController not wired)
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

**Missing:**
- Manual order, title, last updated, deadline, priority sorting (spec 7.8)
- Status/priority/tags/deadline/item-type filters in projects/inbox (Focus has state only)
- Manual ordering preserved on return (spec 7.8)

**Files affected:** `src/features/projects/projects-page.tsx`, `src/features/inbox/pages/inbox-page.tsx`

---

## 11. Notifications and Feedback (Minimal)

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

**Files affected:** `src/app/router.tsx`, `src/features/projects/projects-page.tsx`

---

## 13. Theme and Appearance (Partial)

**Implemented:** Light/dark theme toggle, CSS tokens (sage green, warm cream, cherry-blossom pink, charcoal, gray-green), `data-theme` attribute, localStorage persistence.

**Missing:**
- Settings/appearance page (stub only)
- System theme detection exposed in UI (implemented in ThemeProvider but no UI toggle)

**Files affected:** `src/features/settings/appearance-page.tsx` (stub)

---

## 14. Keyboard Shortcuts (Partial)

**Implemented:** KeyboardShortcuts component with Ctrl/Cmd+K, Ctrl/Cmd+N, Escape handlers. All shortcuts are now wired to actions:
- Ctrl/Cmd+K → navigates to `/app/search`
- Ctrl/Cmd+N → navigates to `/app/projects`
- Escape → closes panel / navigates to `/app/projects`

**Missing:**
- Arrow keys for tree navigation (spec 13) — **NOW IMPLEMENTED** (ArrowUp/Down navigate, ArrowRight expand/go child, ArrowLeft collapse/go parent, Enter select, Space toggle expand/collapse)
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
- Cancel obsolete requests on branch collapse

**Files affected:** `src/features/items/components/item-tree.tsx`, `src/features/items/hooks/use-items.ts`

---

## 18. Testing Gaps

**Implemented:** 62 unit/component/integration tests (10 files), all passing.

**Missing:**
- Playwright E2E tests not run against live server (scaffolding only)
- Integration tests against real backend (mocked apiClient only)
- Unauthorized session handling tests
- Stale search response tests
- Query cache invalidation after mutation tests

**Files affected:** `src/e2e/critical-journeys.spec.ts` (scaffolding only)

---

## 19. Production and Deployment (Partial)

**Implemented:** Frontend deployed on Vercel (`https://niwa-website-six.vercel.app`), vercel.json SPA fallback, VITE_API_BASE_URL env var. Backend configured on Render (`render.yaml`) but not yet deployed with environment variables.

**Missing:**
- `VITE_API_BASE_URL` set to actual backend URL in Vercel (currently placeholder)
- Backend environment variables configured in Render dashboard (MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, FRONTEND_URL, etc.)
- CI pipeline (GitHub Actions not configured — spec 11.3)
- Error monitoring configuration (spec 11.2)
- Production environment variable documentation (partial in README)

**Files affected:** `vercel.json`, `.env.local.example`, README.md, `backend/render.yaml`

---

## 20. Documentation (Partial)

**Implemented:** README.md with setup, features, architecture, testing, deployment. CODEMAP.md with complete codebase map. OpenAPI spec at `backend/openapi.yaml`. LOG.md with session action log.

**Missing:**
- Architecture decision records (spec 11.18)
- Local setup instructions (partial in README)
- Testing instructions (partial in README)
- Roadmap for future development (partial in README)
- Screenshots of website (spec 20)
- Live demo link (Vercel URL in README)

**Files affected:** README.md (OpenAPI spec exists at `backend/openapi.yaml`)

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
| High | Frontend auth API integration (login/register call backend) | Done | Yes — users can now authenticate |
| High | Workspace UI (create/select workspace) | Medium | Partial — items now use workspaceId from auth, but no workspace selector UI |
| High | Inbox/Focus/Search real API integration | Done | Yes — features now call real API |
| High | Backend deployment to Render with env vars | Medium | Yes — no live API for frontend to call |
| Medium | Drag-and-drop / keyboard reorder | Medium | No (accessible fallback needed) |
| Medium | Move items between parents via UI | Done | No (Move dialog implemented in UI) |
| Medium | Notifications/toast system | Low | Partially — auth, inbox, projects |
| Medium | Accessibility audit | Medium | No |
| Medium | Large-tree virtualization | Medium | No |
| Low | E2E test execution against live server | Low | No |
| Low | CI pipeline (GitHub Actions) | Low | No |
| Low | Error monitoring | Low | No |
