# NIWA Web — A garden for your ideas

NIWA (庭) is a personal productivity and hierarchical project management web application. Plant an idea, grow a project, let it bloom.

## Live Demo

https://niwa-website-six.vercel.app

## Overview

NIWA is a personal productivity application for people who have many ideas, manage multiple projects simultaneously, and need a flexible way to organize complex work. Every item can contain child items at any logical depth, and every child can contain further children. A single idea can gradually become a complete project plan without requiring the user to create a separate document or switch applications.

### Core Principles

- **Unlimited logical nesting** — Users can break down work as deeply as necessary
- **Frictionless capture** — Users can record ideas before deciding how to organize them
- **Cross-project focus** — Users can work on important tasks across multiple projects without needing to finish one project first

## Technology Stack

| Layer | Technology |
|-------|------------|
| UI framework | React 19 |
| Language | TypeScript 5.5 (strict) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| UI primitives | shadcn/ui accessible equivalents |
| Routing | React Router |
| Server-state management | TanStack Query |
| Form management | React Hook Form + Zod |
| API communication | Fetch API (typed client) |
| Icons | Lucide React |
| Unit testing | Vitest |
| Component testing | React Testing Library |
| End-to-end testing | Playwright |
| Formatting and linting | Prettier and ESLint |
| Package manager | pnpm |

## Project Structure

```
src/
├── app/              # App.tsx, router.tsx, providers.tsx, query-client.ts
├── components/
│   ├── ui/           # shadcn/ui primitives
│   ├── layout/       # Sidebar, Header, DetailPanel, ProtectedRoute, ThemeProvider
│   └── feedback/     # Keyboard shortcuts
├── features/
│   ├── auth/         # Authentication (login, register, session)
│   ├── inbox/        # Quick capture and Inbox management
│   ├── items/        # Hierarchical items (tree, detail panel, API)
│   ├── projects/     # Projects view (tree explorer)
│   ├── focus/        # Focus view (cross-project aggregation)
│   ├── search/       # Global search
│   └── settings/     # Account and appearance settings
├── lib/              # API client, error normalization, date utils, DB connection
├── styles/           # Theme tokens (light/dark), globals.css
├── test/             # Test setup, helpers, fixtures
└── e2e/              # Playwright end-to-end tests
```

## Features Implemented

### Authentication
- User registration and login
- Session persistence across page reloads
- Protected routes (redirect unauthenticated users to login)
- Logout functionality
- Error handling for auth failures

### Hierarchical Items
- Create, read, update, delete items at any nesting depth
- Expandable/collapsible project tree
- Inline item renaming
- Move items between parents
- Reorder siblings
- Item detail panel with full field editing
- Version-based optimistic concurrency control
- Item types: project, task, note, idea
- Statuses: not_started, in_progress, blocked, completed
- Priorities: none, low, medium, high, critical

### Inbox
- Quick idea capture (title-only creation)
- Status toggle (completed/not_started)
- Archive/delete items
- Tag display

### Focus
- Cross-project work aggregation
- Sections: In Progress, High Priority, Overdue, Upcoming, Recently Updated
- Filtering by project, status, priority, tag

### Global Search
- Debounced search input (300ms)
- Results at any nesting depth
- Ancestor paths preserved in results
- Loading, empty, and error states
- Escape to clear search

### Keyboard Shortcuts
- `Ctrl/Cmd + K` — Open search
- `Ctrl/Cmd + N` — Create a new item
- `Escape` — Close current dialog or panel

### Themes
- Light and dark theme support
- Theme preference persisted in localStorage
- System theme detection

### Responsive Layout
- Desktop: persistent sidebar, main workspace, optional detail panel
- Tablet: collapsible sidebar
- Mobile: compact navigation

## Database Connection

NIWA uses MongoDB Atlas for data storage. The connection is managed in `src/lib/db.ts`.

### `src/lib/db.ts`

Exports:
- `connectToMongoDB()` — Async function that establishes (or reuses) a MongoDB connection
- `getDatabase(dbName?)` — Returns a reference to a specific database (default: `"niwa"`)
- `closeMongoDB()` — Closes the client connection

The connection uses a cached client singleton (stored on `globalThis`) to avoid exhausting connection limits in serverless environments.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes (server-side) |
| `VITE_API_BASE_URL` | Backend API base URL (frontend only, public) | Yes (frontend) |

### `.env.local` (local development, never committed)

```
# MongoDB Atlas connection string
# REPLACE <db_password> with your actual database user password before use.
MONGODB_URI="mongodb+srv://zoletakyle1111_db_user:<db_password>@cluster0.qkxxphh.mongodb.net/?retryWrites=true&w=majority"
```

**Note:** `.env.local` is gitignored and must never be committed. Replace `<db_password>` with your actual password before use.

## Local Setup

### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/PastelSalt/niwa-website.git
cd niwa-website

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and replace <db_password> with your actual password

# Start development server
pnpm run dev
```

The development server will be available at `http://localhost:5173`.

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | Run ESLint |
| `pnpm run typecheck` | Run TypeScript type checking |
| `pnpm run test` | Run unit and component tests (Vitest) |
| `pnpm run test:watch` | Run Vitest in watch mode |
| `pnpm run e2e` | Run end-to-end tests (Playwright) |
| `pnpm run format` | Format code with Prettier |

## Testing

```bash
# Run all unit and component tests
pnpm run test

# Run end-to-end tests
pnpm run e2e
```

### Test Coverage
- Unit tests: item validation schemas, breadcrumb construction, tree utilities, date formatting, error normalization
- Component tests: ItemTree (expand/collapse, select, create, update, delete), ItemDetailPanel (view, edit, save, delete)
- Integration tests: Item API (create, update, delete, children, tree, move, archive, restore)
- E2E tests: authentication, inbox capture, projects/hierarchy, search, keyboard shortcuts

## Deployment

### Vercel

The application is deployed on Vercel and connected to the GitHub repository. Production deployments are triggered automatically on pushes to the `main` branch.

**Production URL:** https://niwa-website-six.vercel.app

### Build Configuration

The production build uses Vite with the output directory `dist`. SPA route fallback is configured via `vercel.json` to serve `index.html` for all client-side routes.

### Environment Variables (Production)

Configure the following in your hosting provider's settings:

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | Your deployed backend API URL (e.g., `https://api.example.com/api/v1`) |

## Architecture

### Frontend Architecture

The frontend follows a feature-based architecture (per spec Section 9). Each feature owns its page-specific components, hooks, API functions, schemas, and types. Shared components contain genuinely reusable UI and behavior.

### State Management

- **Server state:** TanStack Query (items, workspaces, auth session, search results, focus results)
- **Local UI state:** React component state (expanded branches, open menus, unsaved input, dialog visibility, current selection)

### API Communication

All HTTP communication is centralized in `src/lib/api-client.ts`. The client handles:
- Base URL configuration via `VITE_API_BASE_URL`
- Authentication credentials (HttpOnly cookies)
- JSON serialization and response parsing
- Standard error handling with normalized error formats
- Request cancellation via AbortController
- 30-second timeout

### Security

- No passwords stored in browser storage
- HttpOnly cookies for session management
- CORS configured narrowly for trusted origins
- No secrets in frontend environment variables
- Content Security Policy ready
- Input validation via Zod schemas

## Known Limitations

- Backend API is a separate service (not included in this repository); frontend connects to it via HTTP
- Offline-first synchronization is not implemented (excluded from MVP)
- Real-time collaborative editing is not implemented
- Team workspaces are not implemented (personal workspace only)
- Native mobile and desktop applications are planned for future releases
- File attachments and calendar integrations are excluded from MVP

## Roadmap

- Complete OpenAPI documentation for the shared backend API
- Stabilize authentication, item, and hierarchy contracts
- Prepare for Electron desktop client
- Prepare for Flutter mobile client
- Production deployment of backend API
- Monitoring and error reporting configuration

## License

ISC
