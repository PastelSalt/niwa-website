# Plan: Milestone 4 — Inbox and Focus

**Status: PARTIAL** (pages created and wired to real API; filters not fully applied to API calls, change item status not implemented, navigate back to project context missing, only-show-useful-sections not implemented)

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 4)

**Objective:** Implement quick capture, add Inbox filtering and actions, build Focus sections, add status and priority filters, link Focus items back to their project context.

**Deliverable:** Users can capture ideas and identify active work.

---

## Tasks

### 4.1 Inbox view
- [ ] Create `/app/inbox` route and page (`src/features/inbox/pages/InboxPage.tsx`)
- [ ] Quick capture: create an item with only a title from main navigation
- [ ] Enter submits a simple title
- [ ] Add a description later
- [ ] Edit the item
- [ ] Convert an idea into a project or task
- [ ] Move the item into a hierarchy
- [ ] Archive or delete the item
- [ ] Open its detail panel
- [ ] Keyboard focus preserved after creating items
- [ ] Successful creation updates interface immediately or after API confirmation
- [ ] Errors must not silently discard user input

### 4.2 Inbox filtering and actions
- [ ] Filter by status, priority, tags, deadline, item type
- [ ] Sorting: manual order, title, last updated, deadline, priority
- [ ] Inbox placement represented explicitly or through documented server-side query rule

### 4.3 Focus view
- [ ] Create `/app/focus` route and page (`src/features/focus/pages/FocusPage.tsx`)
- [ ] Initial sections: In Progress, High Priority, Overdue, Upcoming, Recently Updated
- [ ] Only display sections with useful content
- [ ] Filter by project, status, priority, tag
- [ ] Change an item's status
- [ ] Open the item's full hierarchy
- [ ] Navigate back to its original project context
- [ ] Focus is a filtered view of existing items; no duplicate copies of tasks

### 4.4 Status and priority filters
- [ ] Status filter: not_started, in_progress, blocked, completed
- [ ] Priority filter: none, low, medium, high, critical
- [ ] Display consistently across project trees, detail views, and Focus results

### 4.5 Link Focus items to project context
- [ ] Breadcrumb / ancestor path shown for Focus results
- [ ] Navigate back to original project context from Focus item

---

## Assumptions
- Focus aggregates items from across the workspace via API.
- Focus does not create duplicate copies of tasks.

## Exit criteria
- Users can capture ideas quickly via Inbox
- Inbox items can be filtered, sorted, moved, archived, deleted
- Focus shows relevant work across projects in sections
- Focus items link back to project context
- Status and priority filters work consistently
