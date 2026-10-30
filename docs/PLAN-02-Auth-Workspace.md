# Plan: Milestone 2 — Authentication and Workspace

**Status: PARTIAL** (auth API integrated and protected routes working; workspace UI stub — no workspace list/create/selector)

**Source:** NIWA Web — Project Specification, Section 16 (Milestone 2)

**Objective:** Implement login and registration screens, integrate the authentication API, add protected routes, build the workspace layout, handle loading, errors, and session expiration.

**Deliverable:** An authenticated user can enter NIWA.

---

## Tasks

### 2.1 Authentication API integration
- [ ] Create `src/features/auth/api/auth.ts`
- [ ] Implement `POST /api/v1/auth/register`
- [ ] Implement `POST /api/v1/auth/login`
- [ ] Implement `POST /api/v1/auth/logout`
- [ ] Implement `GET /api/v1/auth/me`
- [ ] Implement `POST /api/v1/auth/refresh`
- [ ] Define Zod schemas for request/response validation
- [ ] Define TypeScript types matching the API contract

### 2.2 Authentication state management
- [ ] Create auth context / provider in `src/app/providers.tsx` or `src/features/auth/`
- [ ] Store session via HttpOnly cookies (preferred); never store passwords in browser storage
- [ ] Maintain authenticated session across page reloads
- [ ] Handle session expiration gracefully (redirect to login)
- [ ] Show understandable authentication errors

### 2.3 Authentication pages
- [ ] Create `/login` page (`src/features/auth/pages/LoginPage.tsx`)
- [ ] Create `/register` page (`src/features/auth/pages/RegisterPage.tsx`)
- [ ] Email + password fields with validation
- [ ] Enter submits form
- [ ] Show loading, success, and failure states
- [ ] Link between login and register

### 2.4 Protected routes
- [ ] Wrap `/app/*` routes with authentication guard
- [ ] Redirect unauthenticated users to `/login`
- [ ] Redirect authenticated users away from `/login` and `/register`
- [ ] Deep links load the correct item when authorized
- [ ] Refreshing an item URL must not lose the selected item

### 2.5 Workspace layout
- [ ] Build persistent navigation sidebar (Inbox, Projects, Focus, Search, Settings)
- [ ] Build central workspace area
- [ ] Build optional item-detail panel
- [ ] Global search in header
- [ ] User account menu in header
- [ ] Responsive: sidebar collapsible on tablet, compact nav on mobile

### 2.6 Error handling
- [ ] Distinguish validation errors, auth errors, permission errors, missing resources, conflicts, rate limits, server failures
- [ ] Display clear error messages to user
- [ ] Do not silently discard user input on error

---

## Assumptions
- Final authentication endpoints match the actual backend implementation.
- CSRF protection configured when cookie-based authentication requires it.
- CORS configured narrowly for trusted frontend origins.

## Exit criteria
- User can register a new account
- User can log in and log out
- Session persists across page reloads
- Protected routes redirect unauthenticated users
- Login/registration show clear errors on failure
- Authenticated user reaches the workspace layout
