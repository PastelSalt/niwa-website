# Plan: Milestone 6 — Production Readiness

**Status: PARTIAL** (frontend deployed on Vercel, lint/typecheck/test/build pass; backend not deployed to Render with env vars, VITE_API_BASE_URL placeholder in Vercel, no CI pipeline, no error monitoring)

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 6)

**Objective:** Complete automated tests, verify API authorization behavior, configure production environment variables, deploy the website and API, configure monitoring and error reporting, document deployment and recovery procedures, prepare a portfolio demonstration.

**Deliverable:** A public web application suitable for a portfolio.

---

## Tasks

### 6.1 Complete automated tests
- [ ] Unit tests: item validation, status/priority handling, breadcrumb construction, search parameter handling, date formatting, API error normalization, frontend hierarchy utilities
- [ ] Component tests: tree expansion/collapse, item selection, inline editing, detail panel behavior, form validation, dialog behavior, loading/error states, keyboard navigation
- [ ] Integration tests: frontend against test backend or controlled API mocks
  - Creating an item updates the visible list
  - Moving an item updates the correct hierarchy
  - Failed mutations display errors
  - Stale search responses do not overwrite newer results
  - Unauthorized sessions are handled correctly
  - Query caches update or invalidate after mutations
- [ ] End-to-end tests (Playwright):
  - Register or log in
  - Create a project
  - Create nested tasks
  - Open an item's details
  - Update its status
  - Move a child to another parent
  - Search for a deeply nested item
  - Find work in Focus
  - Log out
- [ ] Use test environment and test accounts; never destructive tests against production

### 6.2 Verify API authorization behavior
- [ ] Authorization enforced for every workspace and item operation
- [ ] Frontend route protection is usability measure, not substitute for server authorization
- [ ] Invalid or deleted item IDs show clear not-found state
- [ ] Unauthorized workspace/item access prevented

### 6.3 Configure production environment variables
- [ ] `VITE_API_BASE_URL` set to actual deployed API URL
- [ ] Only public configuration in `VITE_` prefixed variables (never secrets)
- [ ] Secrets kept in hosting provider's secret manager

### 6.4 Deploy website and API
- [ ] Build website for production
- [ ] Configure SPA route fallback behavior
- [ ] Enable HTTPS
- [ ] Configure trusted backend origins
- [ ] Configure CORS narrowly
- [ ] Test authentication cookies in production environment
- [ ] Verify direct navigation to nested routes

### 6.5 Monitoring and error reporting
- [ ] Configure error monitoring without leaking sensitive data
- [ ] Avoid logging passwords, session tokens, or sensitive content
- [ ] Configure sensible request limits and rate limiting through backend

### 6.6 Documentation
- [ ] Document deployment procedures
- [ ] Document recovery procedures
- [ ] Document environment variables
- [ ] Document setup instructions

### 6.7 Portfolio demonstration
- [ ] Prepare demo showing:
  - Creating a new project
  - Expanding into deeply nested tasks
  - Editing an item's details
  - Moving items between branches
  - Capturing an unorganized idea
  - Finding relevant work in Focus
  - Searching for a deeply nested item

---

## Assumptions
- Website and API deployable independently.
- Backend implemented with Node.js, Express, MongoDB (separate service).

## Exit criteria
- All automated tests pass
- Production build succeeds
- Website and API deployed
- Authentication works in production (cookies, CSRF, CORS)
- Monitoring and error reporting configured
- Deployment and recovery documented
- Portfolio demo ready
