# Plan: Milestone 7 — Future Platform Preparation

**Status: PARTIAL** (backend/openapi.yaml exists; OpenAPI spec completion, contract stabilization, API versioning documentation, Electron vs web component classification not done)

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 7)

**Objective:** Finalize OpenAPI documentation, stabilize authentication contracts, stabilize item and hierarchy contracts, document API versioning, record shared product behavior, identify Electron-specific vs web-specific components.

**Deliverable:** A stable foundation for future desktop and mobile clients.

---

## Tasks

### 7.1 OpenAPI documentation
- [ ] Finalize complete OpenAPI specification for NIWA API
- [ ] Document all endpoints: auth, workspaces, items, search, focus
- [ ] Document request/response schemas
- [ ] Document error response format
- [ ] Document pagination conventions
- [ ] Document authentication flows

### 7.2 Stabilize contracts
- [ ] Authentication contract: register, login, logout, me, refresh
- [ ] Item schema: id, workspaceId, parentId, title, description, type, status, priority, position, tags, dueAt, estimatedMinutes, version, createdAt, updatedAt, completedAt
- [ ] Status enum: not_started, in_progress, blocked, completed
- [ ] Priority enum: none, low, medium, high, critical
- [ ] Parent-child rules: arbitrary depth, no cycles, explicit move operations
- [ ] Concurrency behavior: version numbers / optimistic locking
- [ ] Date and timezone handling: ISO 8601 timestamps
- [ ] Archive and deletion behavior

### 7.3 API versioning
- [ ] Document API versioning strategy (e.g., /api/v1 prefix)
- [ ] Document breaking vs non-breaking change policy

### 7.4 Shared product behavior
- [ ] Record which behaviors are shared across web, Electron, Flutter
- [ ] Document platform-specific assumptions to avoid

### 7.5 Component classification
- [ ] Identify Electron-specific components (native notifications, system tray, global quick capture, desktop shortcuts, offline caching)
- [ ] Identify web-specific components
- [ ] Isolate desktop-specific code from standard browser application
- [ ] Do not use unrestricted Node.js APIs inside shared React components

### 7.6 Flutter compatibility
- [ ] Document contracts sufficient for Flutter/Dart model generation
- [ ] Do not share React components or TypeScript runtime code with Flutter
- [ ] Shared contract, not shared UI implementation

---

## Assumptions
- Future desktop: Electron + React, reuses web components and API client.
- Future mobile: Flutter + Dart, own UI components, same backend and data model.
- Backend remains independently deployable API.

## Exit criteria
- OpenAPI spec complete and published
- All contracts stabilized and documented
- API versioning documented
- Electron vs web components classified
- Foundation ready for desktop and mobile clients
