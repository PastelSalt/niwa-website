# Plan: Milestone 0.6 — Frontend Performance & Integration

**Objective:** Optimize the NIWA frontend for production — connect all features to the real backend API, add missing UI interactions (toasts, drag-and-drop, virtualization), improve accessibility, and prepare for production deployment.

**Source:** NIWA Web — Project Specification (Sections 5-13), GAPS.md, current frontend codebase review

**Current State:** Frontend is feature-complete but most pages use mock data instead of real API calls. Backend API is implemented and ready. Frontend needs API integration, accessibility improvements, toast notifications, drag-and-drop reordering, and large-tree virtualization.

---

## Decisions (locked in)

| Decision | Rationale |
|----------|-----------|
| Connect all frontend features to real backend API | Highest priority gap — frontend cannot function without real API |
| Use TanStack Query for all data fetching | Already configured, consistent with existing patterns |
| Add `sonner` or `hot-toast` for toast notifications | Lightweight, accessible, React-friendly |
| Add `@dnd-kit` for drag-and-drop reordering | Accessible, well-maintained, React 19 compatible |
| Add `react-window` or `react-virtuoso` for large-tree virtualization | Prevents performance issues with deep/nested trees |
| Keep shadcn/ui primitives | Already established in codebase |
| Keep TypeScript strict mode | Maintains type safety |
| No new major dependencies beyond toast, dnd-kit, virtualization lib | Minimize surface area |

---

## Tasks

### Phase 1: Frontend-to-Backend API Integration (Critical)

**Estimated effort: 2-3 days**

- [ ] **1.1 Auth API integration**
  - Wire login page to call `POST /api/v1/auth/login` with HttpOnly cookie handling
  - Wire register page to call `POST /api/v1/auth/register`
  - Store session state from API response (user info from response body)
  - Handle 401/409 errors with user-friendly messages
  - Redirect to `/app` on successful login/register

- [ ] **1.2 Inbox API integration**
  - Connect `GET /api/v1/inbox` to fetch inbox items
  - Connect `POST /api/v1/inbox` for quick capture
  - Connect `PATCH /api/v1/inbox/:itemId` for status toggle/edit
  - Connect `DELETE /api/v1/inbox/:itemId` for archive/delete
  - Connect `POST /api/v1/inbox/:itemId/convert` for convert-to-project/task

- [ ] **1.3 Projects API integration**
  - Connect `GET /api/v1/items/:itemId/tree` for project tree loading
  - Connect `POST /api/v1/items` for creating items
  - Connect `PATCH /api/v1/items/:itemId` for inline editing
  - Connect `DELETE /api/v1/items/:itemId` for deletion
  - Connect `POST /api/v1/items/:itemId/move` for moving items
  - Connect `POST /api/v1/items/:itemId/archive` / `restore`

- [ ] **1.4 Focus API integration**
  - Connect `GET /api/v1/focus` with filters (projectId, status, priority, tag)
  - Connect `GET /api/v1/focus/overdue` and `GET /api/v1/focus/upcoming`
  - Display focus sections with real data

- [ ] **1.5 Search API integration**
  - Connect `GET /api/v1/search?q=...` with debounced input
  - Display search results with ancestor paths
  - Open result directly in hierarchy (navigate to project context)

- [ ] **1.6 Workspace UI integration**
  - Connect `GET /api/v1/workspaces` to list user workspaces
  - Connect `POST /api/v1/workspaces` for creating workspaces
  - Workspace selector in sidebar/header
  - Remove hardcoded `workspace_123`

### Phase 2: Notifications & Feedback System

**Estimated effort: 1 day**

- [ ] **2.1 Add toast notification library** (`sonner` or `hot-toast`)
- [ ] **2.2 Create toast utility** — `src/lib/toast.ts` with success/error/warning/info variants
- [ ] **2.3 Add toast on mutation success/failure** — Create, update, delete, move, archive operations
- [ ] **2.4 Add loading skeletons** — Skeleton placeholders for loading states
- [ ] **2.5 Add unsaved-change protection** — `beforeunload` listener for unsaved form data

### Phase 3: Drag-and-Drop Reordering

**Estimated effort: 1-2 days**

- [ ] **3.1 Add `@dnd-kit` dependency** — Core, sortables, and utilities
- [ ] **3.2 Create draggable tree item component** — Wrap tree rows with drag handles
- [ ] **3.3 Implement drag-and-drop reorder** — Drag items to reorder siblings or move between parents
- [ ] **3.4 Add visual feedback** — Drag overlay, drop zones, animation
- [ ] **3.5 Call move API on drop** — `POST /api/v1/items/:itemId/move` with new parentId/position

### Phase 4: Large-Tree Virtualization

**Estimated effort: 1-2 days**

- [ ] **4.1 Add virtualization library** (`react-window` or `react-virtuoso`)
- [ ] **4.2 Virtualize tree rows** — Only render visible tree rows
- [ ] **4.3 Lazy-load children on expand** — Fetch children when branch expands
- [ ] **4.4 Cache loaded children** — Avoid re-fetching already-expanded branches
- [ ] **4.5 Cancel obsolete requests** — AbortController for stale expand requests

### Phase 5: Accessibility Improvements

**Estimated effort: 1 day**

- [ ] **5.1 ARIA tree semantics** — `role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-selected`, `aria-level`, `aria-setsize`, `aria-posinset`
- [ ] **5.2 Visible focus indicators** — Ensure all interactive elements have visible focus states
- [ ] **5.3 Accessible labels for icon-only controls** — All buttons with icons have `aria-label`
- [ ] **5.4 Reduced-motion support** — Respect `prefers-reduced-motion` media query
- [ ] **5.5 Screen-reader announcements** — Announce loading states, errors, and mutations via ARIA live regions

### Phase 6: Error Handling & Resilience

**Estimated effort: 0.5 days**

- [ ] **6.1 Add retry logic** — Retry failed API calls with exponential backoff
- [ ] **6.2 Add error boundaries** — React ErrorBoundary for component-level error isolation
- [ ] **6.3 Add offline detection** — Detect network loss, show offline indicator
- [ ] **6.4 Add request cancellation** — AbortController for obsolete search/tree requests

### Phase 7: Production Configuration

**Estimated effort: 0.5 days**

- [ ] **7.1 Update `VITE_API_BASE_URL`** — Point to actual Render backend URL
- [ ] **7.2 Add production error monitoring** — Sentry or similar (optional)
- [ ] **7.3 Add build optimization** — Code splitting, tree shaking verification
- [ ] **7.4 Add CI pipeline** — GitHub Actions for lint, typecheck, test, build

---

## Exit Criteria

| Criterion | Measurement |
|-----------|-------------|
| All frontend features call real backend API | No mock data remains in production pages |
| Login/register authenticate against backend | Successful login returns session cookies |
| Inbox items persist to backend | Created items visible after page refresh |
| Tree moves persist to backend | Moved items retain new parent after refresh |
| Search returns results from backend | Search results match backend data |
| Focus sections show real data | Focus items match backend focus endpoint |
| Toast notifications appear on mutations | Success/error toasts display for all mutations |
| Drag-and-drop reordering works | Dragging items updates hierarchy via API |
| Tree virtualization renders large trees | 100+ items render without lag |
| Accessibility audit passes | Keyboard navigation, ARIA labels, focus indicators |
| Lint, typecheck, test, build all pass | Zero errors/warnings |

---

## Files to Modify

| File | Changes |
|------|---------|
| `frontend/src/features/auth/pages/login-page.tsx` | Call `POST /api/v1/auth/login`, handle cookies/redirect |
| `frontend/src/features/auth/pages/register-page.tsx` | Call `POST /api/v1/auth/register`, handle cookies/redirect |
| `frontend/src/features/auth/hooks/use-auth.tsx` | Use real API client, store session from response |
| `frontend/src/features/inbox/pages/inbox-page.tsx` | Connect to real Inbox API endpoints |
| `frontend/src/features/inbox/hooks/use-inbox.ts` | Use real API client with TanStack Query |
| `frontend/src/features/items/components/item-tree.tsx` | Add drag-and-drop, virtualization, move integration |
| `frontend/src/features/items/components/item-detail-panel.tsx` | Connect to real item API |
| `frontend/src/features/items/components/move-dialog.tsx` | Connect move API call |
| `frontend/src/features/items/hooks/use-items.ts` | Add pagination, field projection, caching |
| `frontend/src/features/projects/projects-page.tsx` | Connect to real tree API |
| `frontend/src/features/focus/focus-page.tsx` | Connect to real Focus API with filters |
| `frontend/src/features/search/search-page.tsx` | Connect to real search API |
| `frontend/src/features/settings/account-page.tsx` | Connect to workspace API |
| `frontend/src/lib/api-client.ts` | Add request/response interceptors, retry logic |
| `frontend/src/lib/toast.ts` | **NEW** — Toast notification utility |
| `frontend/src/components/layout/app-layout.tsx` | Add workspace selector, wired keyboard shortcuts |
| `frontend/src/components/layout/sidebar.tsx` | Add workspace selector |

---

## Related Files (No Changes Needed)

- `frontend/src/styles/globals.css` — Theme tokens already defined
- `frontend/src/components/layout/theme-provider.tsx` — Theme context already works
- `frontend/src/components/layout/protected-route.tsx` — Already functional
- `frontend/src/components/layout/header.tsx` — Already functional (needs workspace selector addition)

---

## Open Questions (to resolve before coding)

1. **Toast library** — `sonner` vs `react-hot-toast`? Both are good; sonner is slightly more modern.
2. **Drag-and-drop library** — `@dnd-kit` vs `react-beautiful-dnd`? `@dnd-kit` is more actively maintained.
3. **Virtualization library** — `react-window` vs `react-virtuoso`? `react-virtuoso` handles variable-height items better for trees.
4. **Workspace selector UI** — Dropdown in sidebar or header? Header is more visible.
5. **Cache invalidation strategy** — Write-through vs write-behind? Write-through is simpler.

---

**Next Step:** Review this plan and confirm before implementing Phase 1 (Frontend-to-Backend API Integration).