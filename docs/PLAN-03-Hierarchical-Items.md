# Plan: Milestone 3 — Hierarchical Items

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 3)

**Objective:** Implement item models and API hooks, build the tree component, add item creation and editing, implement expand and collapse behavior, add item details, implement move and reorder actions, test deeply nested items.

**Deliverable:** Users can create and manage nested projects and tasks.

---

## Tasks

### 3.1 Item types and schemas
- [ ] Define TypeScript types for items (id, workspaceId, parentId, title, description, type, status, priority, position, tags, dueAt, estimatedMinutes, version, createdAt, updatedAt, completedAt)
- [ ] Item types: project, task, note, idea
- [ ] Statuses: not_started, in_progress, blocked, completed
- [ ] Priorities: none, low, medium, high, critical
- [ ] Create Zod schemas for item validation (create, update)
- [ ] Create `src/features/items/types/`, `src/features/items/schemas/`

### 3.2 Item API hooks
- [ ] Create `src/features/items/api/items.ts`
- [ ] Implement `POST /api/v1/items`
- [ ] Implement `GET /api/v1/items/:itemId`
- [ ] Implement `PATCH /api/v1/items/:itemId`
- [ ] Implement `DELETE /api/v1/items/:itemId`
- [ ] Implement `GET /api/v1/items/:itemId/children`
- [ ] Implement `GET /api/v1/items/:itemId/tree`
- [ ] Implement `POST /api/v1/items/:itemId/move`
- [ ] Implement `POST /api/v1/items/:itemId/archive`
- [ ] Implement `POST /api/v1/items/:itemId/restore`
- [ ] Create TanStack Query hooks: useItems, useItem, useChildren, useTree, useCreateItem, useUpdateItem, useDeleteItem, useMoveItem, useArchiveItem, useRestoreItem
- [ ] Support optimistic concurrency through version numbers

### 3.3 Tree component
- [ ] Create `src/features/items/components/ItemTree.tsx`
- [ ] Support arbitrary logical depth (virtualized rendering for large trees)
- [ ] Expand and collapse branches
- [ ] Create root items
- [ ] Create child items at any depth
- [ ] Rename items inline
- [ ] Move items to another parent
- [ ] Reorder siblings (drag-and-drop + accessible menu/keyboard fallback)
- [ ] View item counts and completion summaries
- [ ] Empty branches communicate no children
- [ ] Loading and error states visible
- [ ] Selected item remains identifiable
- [ ] Expanding a branch does not unexpectedly select a different item

### 3.4 Item detail panel
- [ ] Create `src/features/items/components/ItemDetailPanel.tsx`
- [ ] Editable title, description, type, status, priority, deadline, estimated effort, tags
- [ ] Parent breadcrumb
- [ ] Child items list
- [ ] Creation date, last updated date, completion date
- [ ] Save changes through API with saving/success/failure states
- [ ] Prevent silent overwriting of newer server data (version check)
- [ ] Clear way to close panel and return to prior context
- [ ] Usable for deeply nested items

### 3.5 Item creation and editing
- [ ] Quick capture: create item with only a title
- [ ] Add description later
- [ ] Edit item fields
- [ ] Convert an idea into a project or task
- [ ] Keyboard focus preserved after creating items

### 3.6 Tests
- [ ] Unit tests: item validation, status/priority handling, breadcrumb construction, hierarchy utilities
- [ ] Component tests: tree expansion/collapse, item selection, inline editing, detail panel behavior, form validation, dialog behavior, loading/error states, keyboard navigation
- [ ] Test deeply nested items

---

## Assumptions
- Backend rejects invalid hierarchy operations (cycles, invalid parent-child).
- Frontend may perform preliminary checks but backend validation is authoritative.
- Stable server-generated item identifiers.

## Exit criteria
- Users can create root and child items at any depth
- Tree expand/collapse works correctly
- Items can be moved between parents and reordered
- Item details persist correctly
- Moving items does not corrupt hierarchy
- Tests pass for all tree and detail behaviors
