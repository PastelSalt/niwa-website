# Plan: Milestone 5 — Search and Polish

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 5)

**Objective:** Implement global search, add breadcrumbs and search navigation, improve loading and empty states, add keyboard shortcuts, add light and dark themes, audit accessibility and responsive behavior, improve large-tree performance.

**Deliverable:** A coherent, comfortable daily-use experience.

---

## Tasks

### 5.1 Global search
- [ ] Create `/app/search` route and page (`src/features/search/pages/SearchPage.tsx`)
- [ ] Search finds items at any nesting depth (API-backed, not just loaded tree nodes)
- [ ] Results include: title, type, status, priority, project name, ancestor path, matching description excerpts
- [ ] Debounce search input
- [ ] Cancel or ignore stale requests
- [ ] Display loading, empty, and error states
- [ ] Support keyboard navigation
- [ ] Open a result directly in its hierarchy
- [ ] Preserve parent path so user understands where item belongs

### 5.2 Breadcrumbs and search navigation
- [ ] Parent breadcrumb in item detail panel
- [ ] Ancestor path in search results
- [ ] Navigate to ancestors from item/tree

### 5.3 Loading and empty states
- [ ] Visible loading states for all async operations
- [ ] Empty states for inbox, projects, focus, search with no results
- [ ] Non-blocking notifications for routine events
- [ ] Confirmation for destructive actions
- [ ] Unsaved-change protection where appropriate

### 5.4 Keyboard shortcuts
- [ ] Ctrl/Cmd + K: Open search
- [ ] Ctrl/Cmd + N: Create a new item
- [ ] Escape: Close current dialog or panel
- [ ] Enter: Confirm appropriate focused action
- [ ] Arrow keys: Navigate tree items when tree navigation is active
- [ ] Avoid conflicting with browser shortcuts
- [ ] Document shortcuts and allow future customization

### 5.5 Light and dark themes
- [ ] Theme toggle in settings / header
- [ ] Persist theme preference
- [ ] System theme detection
- [ ] All components render correctly in both themes
- [ ] Contrast accessibility maintained

### 5.6 Accessibility audit
- [ ] Keyboard-accessible navigation
- [ ] Visible focus indicators
- [ ] Accessible labels for icon-only controls
- [ ] Sufficient text and control contrast
- [ ] Semantic HTML
- [ ] ARIA tree semantics for hierarchy
- [ ] Accessible dialogs and menus
- [ ] Reduced-motion support
- [ ] Screen-reader-friendly loading and error announcements
- [ ] Touch-friendly controls on smaller screens

### 5.7 Responsive behavior audit
- [ ] Desktop: persistent sidebar, main workspace, optional detail panel
- [ ] Tablet: collapsible sidebar, overlay/drawer details
- [ ] Mobile: compact nav, dedicated screen/drawer for details, touch-friendly tree expansion
- [ ] Avoid requiring drag-and-drop for essential actions

### 5.8 Large-tree performance
- [ ] Load root items first
- [ ] Fetch children when branches expand
- [ ] Cache loaded children
- [ ] Paginate large lists
- [ ] Virtualized rendering when necessary
- [ ] Cancel obsolete requests
- [ ] Invalidate/update affected queries after mutations

---

## Assumptions
- Search is backed by the API (`GET /api/v1/search?q=...`).
- Theme tokens established in Milestone 1.

## Exit criteria
- Global search returns results at any depth with ancestor paths
- Keyboard shortcuts work as specified
- Light and dark themes toggle correctly
- Accessibility audit passes (keyboard, ARIA, contrast, screen reader)
- Responsive layouts work on desktop/tablet/mobile
- Large trees render performantly
