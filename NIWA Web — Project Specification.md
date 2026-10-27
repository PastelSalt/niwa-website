NIWA Web — Project Specification
NIWA (庭) — A garden for your ideas.

Plant an idea. Grow a project. Let it bloom.

Project type: Personal productivity and hierarchical project management web application.

Platform: Web browser.

Future platforms: Desktop application using Electron and mobile application using Flutter.

Repository name: niwa-web

Status: Initial development specification.

1. Project Overview
1.1 What is NIWA?

NIWA is a personal productivity application for people who have many ideas, manage multiple projects simultaneously, and need a flexible way to organize complex work.

Traditional to-do lists often limit how users can break down their work. NIWA takes a different approach: every item can contain child items at any logical depth, and every child can contain further children.

A single idea can gradually become a complete project plan without requiring the user to create a separate document or switch applications.

Example:

text
Build a Java Game Engine
├── Rendering System
│   ├── Camera Controls
│   │   ├── Implement Camera Panning
│   │   ├── Implement Zoom
│   │   └── Clamp Camera Bounds
│   ├── Viewport Management
│   └── Sprite Rendering
├── Physics System
│   ├── Collision Detection
│   └── Collision Resolution
└── Asset Management
    ├── Texture Loading
    └── Resource Caching


Every item can have its own description, status, priority, tags, deadline, notes, and child items.

NIWA is intended for solo developers, students, hobbyists, independent creators, and anyone who frequently starts multiple projects or collects more ideas than they can immediately act upon.

1.2 Core philosophy

NIWA should be built around three principles:

Unlimited logical nesting: Users can break down work as deeply as necessary.
Frictionless capture: Users can record ideas before deciding how to organize them.
Cross-project focus: Users can work on important tasks across multiple projects without needing to finish one project first.

The application should feel calm, organized, and approachable without sacrificing the capabilities expected from a serious productivity tool.

1.3 Product scope

This repository is specifically for the NIWA website.

It contains the React frontend, website-specific UI components, frontend state management, API client, and related tests.

The backend is a separate logical service, even if it is temporarily developed in the same repository during early development. The production architecture must treat the backend as an independently deployable API.

The future Electron and Flutter applications will use the same backend and compatible API contracts.

2. Product Identity
2.1 Name

NIWA (庭)

庭 is the Japanese word for garden.

The name represents a place where ideas can be planted, organized, nurtured, and eventually completed.

2.2 Tagline

Primary tagline:

A garden for your ideas.

Secondary tagline:

Plant an idea. Grow a project. Let it bloom.

2.3 Visual direction

The visual design should be minimalist, botanical, calm, and functional.

Recommended palette:

Purpose	Suggested color
Primary accent	Sage green
Primary background	Warm cream
Secondary accent	Cherry-blossom pink
Main text	Deep charcoal
Secondary text	Muted gray-green
Borders	Soft neutral gray
Success	Muted green
Warning	Soft amber
Error	Muted red

These colors are starting points, not mandatory final values. Establish actual color tokens during implementation and maintain contrast accessibility.

The website should support light and dark themes.

Logo direction

Use a simple wordmark:

niwa in lowercase for the primary logo.
庭 as an optional Japanese wordmark.
A small flower or rabbit motif as a secondary brand symbol.

A rabbit mascot is optional. Do not make the product dependent on elaborate illustrations or complex artwork.

The interface must remain attractive using typography, spacing, borders, subtle icons, and a consistent color system.

2.4 Terminology

The application should use familiar productivity terms for navigation.

UI term	Purpose
Inbox	Unorganized ideas and tasks
Projects	Browse and organize work
Focus	Relevant tasks across projects
Search	Find items anywhere
Settings	Account and application preferences

Garden-themed terminology can appear in onboarding, illustrations, empty states, and marketing copy. It should not make core navigation confusing.

3. Technology Stack

Use the following stack for the website.

Layer	Technology
UI framework	React
Language	TypeScript
Build tool	Vite
Styling	Tailwind CSS
UI primitives	shadcn/ui or accessible equivalents
Routing	React Router
Server-state management	TanStack Query
Form management	React Hook Form
Schema validation	Zod
API communication	Fetch API or a typed HTTP client
Icons	Lucide
Unit testing	Vitest
Component testing	React Testing Library
End-to-end testing	Playwright
Formatting and linting	Prettier and ESLint
Package manager	pnpm

Use stable, mutually compatible versions when initializing the project. Pin dependencies through the lockfile.

Avoid adding libraries without a clear requirement.

3.1 Frontend architecture principles
Use TypeScript strict mode.
Separate API communication from presentation components.
Keep reusable UI components independent of specific pages.
Use TanStack Query for server state.
Keep local interaction state local whenever possible.
Validate untrusted API responses and form input where appropriate.
Avoid duplicating backend business rules in the frontend.
Make the frontend usable without depending on browser-specific Node.js APIs.

The frontend must communicate with the backend through HTTP APIs rather than connecting directly to MongoDB.

4. Future Platform Compatibility

NIWA will eventually have three clients:

Web application built with React and TypeScript.
Desktop application built with Electron, reusing suitable React components.
Mobile application built with Flutter and Dart.

The current repository implements the website only.

4.1 Shared backend

All clients will communicate with a shared REST API.

text
                  NIWA SYSTEM

        ┌─────────┼──────────┐
        │         │          │
      Web      Desktop     Mobile
     React     Electron    Flutter
        │         │          │
        └─────────┼──────────┘
                  │
             HTTPS / JSON
                  │
             NIWA API
                  │
               MongoDB


The diagram describes the planned architecture, not a claim that every component already exists.

4.2 Compatibility requirements

The website must:

Use documented API endpoints.
Avoid storing authoritative project data exclusively in browser storage.
Use stable server-generated item identifiers.
Follow consistent status and priority enums.
Use ISO 8601 timestamps.
Handle server-side validation errors consistently.
Support paginated or incrementally loaded data.
Use a predictable authentication flow.
Keep item hierarchy rules enforced by the backend.
Avoid making business logic dependent on the React component tree.

The frontend may cache data for responsiveness, but the backend remains the source of truth.

4.3 Shared contracts

The backend API will be documented through OpenAPI.

The website should consume types generated from the OpenAPI specification or use carefully maintained TypeScript contracts.

The Flutter application will use the same API specification to generate or maintain Dart models.

Do not attempt to share React components or TypeScript runtime code with Flutter.

The goal is a shared contract, not a shared UI implementation.

5. Application Layout

The main application should use a persistent navigation sidebar, a central workspace, and an optional item-detail panel.

text
┌───────────────────────────────────────────────────────────┐
│ NIWA                                          Search  User │
├───────────────┬───────────────────────────┬───────────────┤
│               │                           │               │
│ Inbox         │ Project / Workspace       │ Item Details  │
│ Projects      │                           │               │
│ Focus         │ Hierarchical item tree    │ Description   │
│ Search        │                           │ Status        │
│               │                           │ Priority      │
│               │                           │ Notes         │
│               │                           │               │
│ Settings      │                           │               │
└───────────────┴───────────────────────────┴───────────────┘


This is a conceptual layout. The actual implementation should adapt to different screen sizes.

5.1 Desktop browser layout

For wide screens:

Left sidebar for navigation.
Main content area for lists and trees.
Optional right-side detail panel.
Persistent global search.
Clear visual hierarchy.
Minimal unnecessary decoration.

The detail panel should be resizable or collapsible if doing so improves usability.

5.2 Tablet layout
Preserve the primary workspace.
Allow the sidebar to collapse.
Open item details as an overlay or dedicated panel.
Keep touch targets comfortable.
5.3 Mobile browser layout

Although Flutter will eventually provide the native mobile experience, the website should still be responsive.

Use a compact navigation layout.
Display item details on a dedicated screen or drawer.
Avoid requiring drag-and-drop for essential actions.
Make quick capture easy to reach.
Support touch-friendly tree expansion and editing.

Responsive web support is required; native mobile-specific features are outside this repository's scope.

6. Core Data Model

The website must treat projects, tasks, notes, and ideas as instances of one hierarchical item model.

6.1 Item types

Initial types:

project
task
note
idea

All types share the same core hierarchy.

For example, an idea can become a project without requiring a separate database entity. The backend should validate any type-specific rules.

6.2 Item fields

Each item should support:

id
workspaceId
parentId
title
description
type
status
priority
position
tags
dueAt
estimatedMinutes
version
createdAt
updatedAt
completedAt

The backend owns the persistent representation. Frontend types must match the documented API contract.

6.3 Example item
json
{
  "id": "item_123",
  "workspaceId": "workspace_123",
  "parentId": "item_100",
  "title": "Implement camera zoom",
  "description": "",
  "type": "task",
  "status": "in_progress",
  "priority": "medium",
  "position": 0,
  "tags": ["java", "rendering"],
  "dueAt": null,
  "estimatedMinutes": null,
  "version": 1,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z",
  "completedAt": null
}

6.4 Statuses

Use a small, consistent set of statuses:

not_started
in_progress
blocked
completed

Inbox placement should be represented explicitly or through a documented server-side query rule. Do not infer Inbox membership solely from a missing status.

6.5 Priorities
none
low
medium
high
critical

The website should display these consistently across project trees, detail views, and Focus results.

6.6 Hierarchy rules

The website must support arbitrary logical depth, subject to practical API and performance limits.

It must not assume that projects have only one level of subtasks.

The UI must support:

Expanding and collapsing branches.
Creating children at any depth.
Moving items.
Reordering siblings.
Navigating to ancestors.
Opening deeply nested items.
Rendering partial trees.
Loading descendants on demand when appropriate.

The backend must reject invalid hierarchy operations.

The frontend may perform preliminary checks for better feedback, but those checks are not a substitute for backend validation.

7. Feature Specifications
7.1 Authentication

Users should be able to:

Register.
Log in.
Log out.
View account information.
Recover access through a supported recovery flow.
Maintain an authenticated session across page reloads.
Requirements
Use the backend authentication API.
Never store passwords in browser storage.
Prefer secure, HttpOnly cookies for browser sessions when compatible with the authentication architecture.
Configure CSRF protection when cookie-based authentication requires it.
Configure CORS narrowly for trusted frontend origins.
Avoid exposing long-lived authentication secrets to JavaScript.
Show understandable authentication errors.
Protect private routes.

The website must not assume that hiding a page is sufficient authorization. The API must enforce access controls.

7.2 Inbox

The Inbox is the primary place to capture unorganized ideas.

Users should be able to:

Create an item with only a title.
Add a description later.
Edit the item.
Convert an idea into a project or task.
Move the item into a hierarchy.
Archive or delete the item.
Open its detail panel.

Quick capture should be available from the main navigation.

Interaction requirements
Enter submits a simple title when appropriate.
Keyboard focus is preserved after creating items when practical.
Successful creation updates the interface immediately or as soon as the API confirms the operation.
Errors must not silently discard user input.
7.3 Projects

The Projects view is the main hierarchy explorer.

Users should be able to:

View root projects.
Expand and collapse branches.
Create root items.
Create child items.
Rename items inline.
Open item details.
Move items to another parent.
Reorder siblings.
Search within the current project.
View item counts and completion summaries.
Tree behavior
Each row must have a predictable keyboard and mouse interaction model.
Expanding a branch should not unexpectedly select a different item.
Item actions should not require opening a separate page for simple operations.
The selected item should remain identifiable.
Large trees should not render every descendant unnecessarily.
Empty branches should communicate that they have no children.
Loading and error states must be visible.

Drag-and-drop may be provided for reordering, but equivalent accessible actions should be available through menus or keyboard interactions.

7.4 Item Detail Panel

Selecting an item should open a detail panel or route.

The panel should display:

Editable title.
Description.
Type.
Status.
Priority.
Deadline.
Estimated effort.
Tags.
Parent breadcrumb.
Child items.
Creation date.
Last updated date.
Completion date when applicable.
Editing behavior
Save changes through the API.
Display saving, success, and failure states.
Prevent silent overwriting of newer server data.
Use version numbers or another documented concurrency strategy.
Keep the panel usable for deeply nested items.
Provide a clear way to close the panel and return to the prior context.

Autosave may be introduced for selected fields, but it must have clear feedback and safe error handling.

7.5 Focus View

Focus aggregates relevant items from across the workspace.

Initial sections:

In Progress.
High Priority.
Overdue.
Upcoming.
Recently Updated.

Only sections with useful content need to be displayed.

Users should be able to:

Filter by project.
Filter by status.
Filter by priority.
Filter by tag.
Change an item's status.
Open the item's full hierarchy.
Navigate back to its original project context.

Focus is a filtered view of existing items. It must not create duplicate copies of tasks.

7.6 Global Search

Search should find items at any nesting depth.

Results should include:

Title.
Type.
Status.
Priority when relevant.
Project name.
Ancestor path.
Matching description excerpts when supported by the API.

Example:

text
Build a Java Game Engine
  / Rendering System
  / Camera Controls
  / Implement Zoom

Requirements
Debounce search input.
Cancel or ignore stale requests.
Display loading, empty, and error states.
Support keyboard navigation.
Open a result directly in its hierarchy.
Preserve the parent path so the user understands where the item belongs.

Search must be backed by the API rather than relying exclusively on currently loaded tree nodes.

7.7 Tags

Users should be able to add, remove, and reuse tags.

Examples:

java
learning
research
personal
urgent

Tag management should remain lightweight.

Do not introduce complex tag permissions, nested tags, or an advanced taxonomy system in the MVP.

7.8 Sorting and filtering

Initial sorting options:

Manual order.
Title.
Last updated.
Deadline.
Priority.

Initial filters:

Status.
Priority.
Tags.
Deadline.
Item type.

Manual ordering must be preserved when the user returns to the relevant project view.

7.9 Notifications and feedback

The website should provide:

Success feedback after important operations.
Clear validation errors.
Confirmation for destructive actions.
Visible loading states.
Non-blocking notifications for routine events.
Unsaved-change protection where appropriate.

Do not show success messages before the server confirms a mutation unless the interface clearly supports rollback for optimistic updates.

8. Navigation and Routing

Use React Router.

Suggested routes:

text
/login
/register

/app
/app/inbox
/app/projects
/app/projects/:itemId
/app/focus
/app/search
/app/settings
/app/settings/account
/app/settings/appearance


These routes are a starting point. Adjust them to fit the final navigation model.

Routing rules
Private application routes require authentication.
Deep links should load the correct item when authorized.
Refreshing an item URL must not lose the selected item.
Invalid or deleted item IDs should show a clear not-found state.
The UI should preserve relevant navigation context when opening and closing details.
Routes should not encode sensitive information.
9. Frontend Architecture

Organize the frontend by feature rather than putting the entire application into a single component directory.

Suggested structure:

text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── query-client.ts
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── feedback/
│   └── shared/
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   │
│   ├── inbox/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   │
│   ├── items/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── types/
│   │
│   ├── projects/
│   ├── focus/
│   ├── search/
│   └── settings/
│
├── lib/
│   ├── api-client.ts
│   ├── errors.ts
│   ├── date.ts
│   └── utils.ts
│
├── styles/
│   ├── globals.css
│   └── tokens.css
│
├── test/
│   ├── fixtures/
│   └── setup.ts
│
└── main.tsx


Each feature should own its page-specific components, hooks, and API functions.

Shared components should contain genuinely reusable UI and behavior rather than becoming a dumping ground for unrelated code.

9.1 State management

Use TanStack Query for server state.

Examples:

Current user.
Workspace data.
Item details.
Child item collections.
Search results.
Focus results.

Use local React state for transient UI state:

Whether a branch is expanded.
Which menu is open.
Current unsaved input.
Whether a dialog is visible.
Current selection when it is not already represented by routing.

Do not introduce a global state library unless a demonstrated need justifies it.

9.2 API client

Centralize HTTP communication.

The API client should handle:

Base URL configuration.
Authentication credentials.
JSON serialization.
Response parsing.
Standard error handling.
Request cancellation where appropriate.
Consistent timeout and retry policies.

Avoid scattering raw fetch calls throughout UI components.

9.3 Error model

Define a consistent error format with the backend, for example:

json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data.",
    "details": {}
  }
}


The actual contract should be documented in OpenAPI.

The frontend should distinguish between validation errors, authentication errors, permission errors, missing resources, conflicts, rate limits, and unexpected server failures.

10. Backend API Contract

The website depends on an independently deployable NIWA API.

The API will be implemented with Node.js, Express, and MongoDB.

Do not connect the React application directly to MongoDB.

All endpoints should use a versioned prefix such as /api/v1.

10.1 Authentication
text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/refresh


The final authentication endpoints must match the actual backend implementation.

10.2 Workspaces
text
GET    /api/v1/workspaces
POST   /api/v1/workspaces
GET    /api/v1/workspaces/:workspaceId
PATCH  /api/v1/workspaces/:workspaceId
DELETE /api/v1/workspaces/:workspaceId

10.3 Items
text
POST   /api/v1/items
GET    /api/v1/items/:itemId
PATCH  /api/v1/items/:itemId
DELETE /api/v1/items/:itemId

GET    /api/v1/items/:itemId/children
GET    /api/v1/items/:itemId/tree

POST   /api/v1/items/:itemId/move
POST   /api/v1/items/:itemId/archive
POST   /api/v1/items/:itemId/restore

10.4 Search and Focus
text
GET /api/v1/search?q=...
GET /api/v1/focus
GET /api/v1/focus/overdue
GET /api/v1/focus/upcoming


These are proposed endpoints. The implementation should consolidate or separate them according to the documented API design.

10.5 API requirements
Validate all incoming parameters and request bodies.
Enforce authorization for every workspace and item operation.
Prevent invalid hierarchy moves.
Return consistent error formats.
Use pagination or incremental loading for large collections.
Support optimistic concurrency through version numbers or another explicit strategy.
Document the complete API in OpenAPI.
Avoid sending the entire hierarchy for every ordinary mutation.

The frontend must not assume that an endpoint exists until it is documented and implemented.

11. Database and Hierarchy Expectations

MongoDB stores individual items as separate documents.

A parent-child relationship is represented through parentId, while workspaceId identifies the ownership boundary.

The website must not depend on a particular MongoDB document layout beyond what the API contract exposes.

Required hierarchy behavior
Stable item IDs.
Arbitrary logical depth.
Valid parent-child relationships.
No cycles.
Explicit move operations.
Predictable deletion and archive behavior.
Consistent sibling ordering.
Conflict detection for concurrent edits.
Performance expectations

The frontend must not fetch every item in every project at startup.

Prefer:

Loading root items first.
Fetching children when branches expand.
Caching loaded children.
Paginating large lists.
Using virtualized rendering when necessary.
Cancelling obsolete requests.
Invalidating or updating affected queries after mutations.

The backend remains responsible for hierarchy integrity.

12. Security Requirements

Security is a core requirement, even for a personal productivity application.

The website must:

Use HTTPS in production.
Avoid exposing secrets in frontend environment variables.
Never place private server credentials in client bundles.
Use a secure authentication strategy.
Handle session expiration gracefully.
Validate and sanitize user-provided content where appropriate.
Prevent unauthorized workspace and item access.
Avoid rendering untrusted HTML without safe sanitization.
Use a restrictive Content Security Policy where practical.
Configure CORS narrowly.
Protect cookie-based authentication against CSRF where necessary.
Avoid logging passwords, session tokens, or sensitive content.
Apply sensible request limits and rate limiting through the backend.

Frontend route protection is a usability measure, not a substitute for server authorization.

13. Accessibility and User Experience

NIWA should be usable without relying exclusively on a mouse.

Requirements
Keyboard-accessible navigation.
Visible focus indicators.
Accessible labels for icon-only controls.
Sufficient text and control contrast.
Semantic HTML.
Appropriate ARIA tree semantics if the hierarchy is implemented as an interactive tree.
Accessible dialogs and menus.
Reduced-motion support.
Screen-reader-friendly loading and error announcements.
Touch-friendly controls on smaller screens.
Keyboard shortcuts

Potential initial shortcuts:

Shortcut	Action
Ctrl/Cmd + K	Open search
Ctrl/Cmd + N	Create a new item
Escape	Close the current dialog or panel
Enter	Confirm an appropriate focused action
Arrow keys	Navigate tree items when tree navigation is active

Avoid conflicting with browser shortcuts unnecessarily. Document the shortcuts and allow future customization.

14. Testing Strategy

Use automated tests throughout development.

14.1 Unit tests

Test:

Item validation.
Status and priority handling.
Breadcrumb construction.
Search parameter handling.
Date formatting.
API error normalization.
Frontend hierarchy utilities.
14.2 Component tests

Test:

Tree expansion and collapse.
Item selection.
Inline editing.
Detail panel behavior.
Form validation.
Dialog behavior.
Loading and error states.
Keyboard navigation.
14.3 Integration tests

Test the frontend against a test backend or controlled API mocks.

Important scenarios:

Creating an item updates the visible list.
Moving an item updates the correct hierarchy.
Failed mutations display errors.
Stale search responses do not overwrite newer results.
Unauthorized sessions are handled correctly.
Query caches update or invalidate after mutations.
14.4 End-to-end tests

Use Playwright to verify critical user journeys:

Register or log in.
Create a project.
Create nested tasks.
Open an item's details.
Update its status.
Move a child to another parent.
Search for a deeply nested item.
Find work in Focus.
Log out.

Use a test environment and test accounts. Never run destructive tests against production user data.

15. MVP Scope

The initial website release should prioritize a complete and reliable core workflow.

Required for the MVP
Authentication.
Personal workspace.
Create, read, update, and delete items.
Arbitrarily deep logical nesting.
Expandable project tree.
Item detail panel.
Move and reorder operations.
Status and priority.
Descriptions and notes.
Idea Inbox.
Focus view.
Global search.
Responsive layout.
Light and dark themes.
API validation and error handling.
Automated tests.
Production deployment.
Excluded from the MVP
Native mobile application.
Native desktop packaging.
Offline-first synchronization.
Real-time collaborative editing.
Team workspaces.
AI-generated task breakdowns.
Calendar integrations.
Habit tracking.
Finance tracking.
Plugin architecture.
Complex automation rules.
Advanced analytics.
File synchronization.
Graph-based project visualization.

These can be reconsidered after the core workflow is stable.

16. Development Milestones
Milestone 1: Project foundation
Initialize the React and TypeScript application.
Configure Vite, Tailwind CSS, and component primitives.
Configure linting, formatting, and tests.
Establish the routing structure.
Define theme tokens.
Build the application shell.
Create the API client.
Document the expected backend contract.

Deliverable: A clean, testable frontend foundation.

Milestone 2: Authentication and workspace
Implement login and registration screens.
Integrate the authentication API.
Add protected routes.
Build the workspace layout.
Handle loading, errors, and session expiration.

Deliverable: An authenticated user can enter NIWA.

Milestone 3: Hierarchical items
Implement item models and API hooks.
Build the tree component.
Add item creation and editing.
Implement expand and collapse behavior.
Add item details.
Implement move and reorder actions.
Test deeply nested items.

Deliverable: Users can create and manage nested projects and tasks.

Milestone 4: Inbox and Focus
Implement quick capture.
Add Inbox filtering and actions.
Build Focus sections.
Add status and priority filters.
Link Focus items back to their project context.

Deliverable: Users can capture ideas and identify active work.

Milestone 5: Search and polish
Implement global search.
Add breadcrumbs and search navigation.
Improve loading and empty states.
Add keyboard shortcuts.
Add light and dark themes.
Audit accessibility and responsive behavior.
Improve large-tree performance.

Deliverable: A coherent, comfortable daily-use experience.

Milestone 6: Production readiness
Complete automated tests.
Verify API authorization behavior.
Configure production environment variables.
Deploy the website and API.
Configure monitoring and error reporting.
Document deployment and recovery procedures.
Prepare a portfolio demonstration.

Deliverable: A public web application suitable for a portfolio.

Milestone 7: Future platform preparation
Finalize OpenAPI documentation.
Stabilize authentication contracts.
Stabilize item and hierarchy contracts.
Document API versioning.
Record shared product behavior.
Identify which components are Electron-specific versus web-specific.

Deliverable: A stable foundation for future desktop and mobile clients.

17. Future Desktop and Mobile Applications

NIWA is planned as a multi-platform product, but the current repository implements only the website.

17.1 Desktop application

The future desktop application will use Electron and React.

It should reuse appropriate web components and the shared API client where practical.

Potential desktop-specific capabilities:

Installable application.
Native notifications.
System tray integration.
Global quick capture.
Desktop keyboard shortcuts.
Optional offline caching.

Desktop-specific code should be isolated from the standard browser application.

Do not use unrestricted Node.js APIs inside shared React components.

17.2 Mobile application

The future mobile application will use Flutter and Dart.

It will use the same backend and data model, with a mobile-optimized interface.

Potential mobile-specific capabilities:

Fast idea capture.
Touch-friendly hierarchy browsing.
Item detail screens.
Status updates.
Focus view.
Push notifications.
Optional offline caching.

Flutter will implement its own UI components. It will not reuse React components.

17.3 Compatibility contract

Before developing the other clients, the following must be documented:

Authentication flows.
Item schema.
Status and priority enums.
Parent-child rules.
API error responses.
Pagination conventions.
Concurrency behavior.
Date and timezone handling.
Archive and deletion behavior.

Avoid adding platform-specific assumptions to the backend contract unless they are genuinely necessary.

18. AI Coding Agent Guidelines

This project may be developed with assistance from AI coding agents.

The repository must remain understandable and maintainable regardless of which agent is used.

Agent workflow
Read this specification and the relevant architecture documentation.
Inspect existing code before changing files.
Work on one bounded feature at a time.
State assumptions when API contracts are missing.
Add tests for meaningful behavior.
Run linting, type checks, tests, and builds.
Review the diff for unnecessary complexity.
Update documentation when decisions change.
Good tasks
Implement the item tree component with keyboard navigation.
Add TanStack Query hooks for the documented item endpoints.
Implement the item detail panel and validation.
Write tests for hierarchy navigation.
Improve accessibility of the sidebar.
Add Playwright coverage for quick capture.
Audit the frontend for unsafe HTML rendering.
Avoid
Generating the entire website in one enormous implementation step.
Inventing backend endpoints without documenting them.
Duplicating server state in multiple global stores.
Adding dependencies without explaining why they are necessary.
Implementing offline synchronization before online workflows are reliable.
Rewriting working architecture to accommodate a minor feature.
Claiming features work without running relevant tests.

Use architecture decision records for important choices that future contributors or agents need to understand.

19. Deployment and Configuration

The website and API should be deployable independently.

Frontend configuration

Use environment variables for deployment-specific configuration.

For example:

text
VITE_API_BASE_URL=https://api.example.com/api/v1


The value above is illustrative. Replace it with the actual deployed API URL.

Only public configuration belongs in variables prefixed with VITE_. These variables are embedded in the client build and must never contain secrets.

Deployment requirements
Build the website for production.
Configure the correct API base URL.
Configure SPA route fallback behavior.
Enable HTTPS.
Configure trusted backend origins.
Test authentication cookies in the production environment.
Verify direct navigation to nested routes.
Configure error monitoring without leaking sensitive data.
Keep secrets in the hosting provider's secret manager.
CI pipeline

Every pull request should run:

Dependency installation using the lockfile.
Formatting checks.
ESLint.
TypeScript type checking.
Unit and component tests.
Production build.

Run end-to-end tests in an appropriate test environment.

20. Portfolio Presentation

The website should demonstrate engineering ability through both the product and the implementation.

The public repository should include:

A clear README.
Screenshots of the website.
A live demo link when available.
Architecture documentation.
API documentation.
Local setup instructions.
Environment variable documentation.
Testing instructions.
A list of implemented features.
A list of known limitations.
A roadmap for future development.

The demonstration should show:

Creating a new project.
Expanding it into deeply nested tasks.
Editing an item's details.
Moving items between branches.
Capturing an unorganized idea.
Finding relevant work in Focus.
Searching for a deeply nested item.

The repository should accurately describe what is implemented and what remains planned.

21. Definition of Done

The initial website is ready for its first public release when:

Users can register and log in securely.
Users can create and manage a personal workspace.
Items can be nested at arbitrary logical depths.
Moving items does not corrupt the hierarchy.
Item details persist correctly.
The Inbox supports fast idea capture.
Focus shows relevant work across projects.
Search locates nested items.
Loading, empty, validation, and error states are handled.
The website works on desktop, tablet, and mobile browser sizes.
Core user flows have automated tests.
The production build succeeds.
The website and API are deployed.
Setup and architecture are documented.
22. Final Product Direction

NIWA Web is the first client of the larger NIWA ecosystem.

Its defining capabilities are:

Unlimited logical nesting for projects, tasks, notes, and ideas.
Frictionless capture through a dedicated Inbox.
Cross-project Focus for managing work in parallel.
A consistent garden-inspired identity.
A stable API foundation for future clients.

Build the web application as a complete product first.

The desktop and mobile applications will follow, using the same backend and documented API contracts.

The immediate objective is not to build every possible productivity feature. It is to build a reliable hierarchical workspace that is genuinely useful, maintainable, and demonstrable as a portfolio project.