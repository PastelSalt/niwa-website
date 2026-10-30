# Plan: Milestone 0.5 — Backend Implementation on Render

**Status: PARTIAL** (backend code implemented, typecheck/lint/build pass, render.yaml and openapi.yaml created; not yet deployed to Render with environment variables set)

**Objective:** Add a Node.js/Express/MongoDB backend service to the same repository under a `backend/` directory, deployable independently on Render (free tier), consumed by the React frontend via documented API contracts.

**Source:** NIWA Web — Project Specification, Sections 1.3, 4.1, 10, 11, 12, 19

---

## Decisions (locked in)

| Question | Decision | Rationale |
|----------|----------|-----------|
| MongoDB driver vs Mongoose | **Raw `mongodb` driver** | Consistent with existing `src/lib/db.ts`; fewer dependencies; lighter for free tier |
| Auth strategy | **JWT access token (HttpOnly cookie, 15 min) + JWT refresh token (HttpOnly cookie, 7 days)** | Matches spec's `/auth/refresh` endpoint; stateless; no server-side session store needed on free tier |
| Frontend/backend domains | **Separate domains** (frontend: `*.vercel.app`, backend: `*.onrender.com`) | Free tier = no custom domains; requires CORS + cross-domain cookies (`SameSite=None; Secure`) |
| Repo structure | **Keep frontend at root; add `backend/` alongside** | Avoids disruptive move of all existing frontend code; root `package.json` stays for frontend; `backend/package.json` for backend |

---

## Free Tier Constraints (Render + MongoDB Atlas)

- Render free web services **spin down after ~15 min of inactivity**; first request after spin-down is slow (cold start)
- Render free tier: no custom domains, 512 MB RAM, 100 GB bandwidth/month
- MongoDB Atlas free tier: shared cluster, 512 MB storage
- `COOKIE_SECURE=true`, `COOKIE_SAME_SITE=None` required for cross-domain cookies (Vercel ↔ Render)
- `VITE_API_BASE_URL` must point to the Render backend URL (not `localhost`)
- Backend must not assume always-on; handle connection gracefully on cold start

---

## Repository Structure (final)

```
niwa-website/                          (repo root)
├── package.json                       (frontend only — existing)
├── pnpm-lock.yaml
├── vite.config.ts                     (frontend)
├── vercel.json                        (frontend deployment)
├── .env.local.example                 (frontend env template)
├── README.md                          (both services)
├── LOG.md
├── GAPS.md
├── PLAN-*.md
├── src/                               (frontend — existing, unchanged)
├── public/                            (frontend — existing)
├── backend/                           (NEW)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── src/
│   │   ├── index.ts                   (Express app entry)
│   │   ├── app.ts                     (Express app + middleware)
│   │   ├── config/                    (env validation, constants)
│   │   ├── lib/
│   │   │   ├── db.ts                  (MongoDB connection, adapted from frontend src/lib/db.ts)
│   │   │   └── auth.ts                (JWT sign/verify, cookie helpers)
│   │   ├── middleware/
│   │   │   ├── auth.ts                (authenticate session)
│   │   │   ├── cors.ts                (narrow CORS for frontend origin)
│   │   │   └── error.ts               (consistent error format)
│   │   ├── routes/
│   │   │   ├── auth.ts                (register, login, logout, me, refresh)
│   │   │   ├── workspaces.ts          (CRUD)
│   │   │   ├── items.ts               (CRUD, children, tree, move, archive, restore)
│   │   │   ├── search.ts              (q= search)
│   │   │   └── focus.ts               (focus, overdue, upcoming)
│   │   ├── models/                    (Zod schemas for request validation)
│   │   │   ├── auth.schema.ts
│   │   │   ├── item.schema.ts
│   │   │   └── workspace.schema.ts
│   │   └── controllers/               (route handlers)
│   │       ├── auth.controller.ts
│   │       ├── workspace.controller.ts
│   │       ├── item.controller.ts
│   │       ├── search.controller.ts
│   │       └── focus.controller.ts
│   └── dist/                          (compiled output, gitignored)
│
```

---

## Tasks

### 1. Backend project initialization
- [ ] Create `backend/` directory at repo root
- [ ] Create `backend/package.json` (Node.js 18+, Express, TypeScript)
- [ ] Install dependencies: `express`, `mongodb`, `cors`, `cookie-parser`, `bcryptjs`, `jsonwebtoken`, `zod`, `dotenv`, plus dev: `typescript`, `ts-node`, `@types/*`
- [ ] Configure TypeScript strict mode (`backend/tsconfig.json`)
- [ ] Configure ESLint, Prettier for backend
- [ ] Create `backend/.env.example` (not `.env`):
  - `MONGODB_URI`
  - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
  - `COOKIE_DOMAIN`, `COOKIE_SECURE=true`, `COOKIE_SAME_SITE=None`
  - `PORT=10000`
  - `NODE_ENV=production`
  - `FRONTEND_URL=https://niwa-website-six.vercel.app`

### 2. Database connection (`backend/src/lib/db.ts`)
- [ ] Adapt `connectToMongoDB()` from existing `src/lib/db.ts` (already uses `mongodb` driver + `globalThis` singleton)
- [ ] Read `MONGODB_URI` from `process.env` (never hardcode)
- [ ] Cached client singleton via `globalThis`
- [ ] Export `connectToMongoDB`, `getDatabase(dbName = "niwa")`, `closeMongoDB`
- [ ] Connection retry with exponential backoff (cold-start tolerant)

### 3. Authentication (`backend/src/routes/auth.ts`, `controllers/auth.controller.ts`)
- [ ] `POST /api/v1/auth/register` — Zod-validate input, bcrypt hash (12 rounds), create user doc, issue access+refresh cookies
- [ ] `POST /api/v1/auth/login` — validate credentials, issue cookies
- [ ] `POST /api/v1/auth/logout` — clear both cookies
- [ ] `GET /api/v1/auth/me` — verify access token, return user
- [ ] `POST /api/v1/auth/refresh` — verify refresh token, issue new access token
- [ ] JWT access: 15 min TTL; JWT refresh: 7 day TTL
- [ ] Cookies: `HttpOnly`, `Secure`, `SameSite=None`, path-specific

### 4. Workspaces (`backend/src/routes/workspaces.ts`)
- [ ] `GET /api/v1/workspaces`
- [ ] `POST /api/v1/workspaces`
- [ ] `GET /api/v1/workspaces/:workspaceId`
- [ ] `PATCH /api/v1/workspaces/:workspaceId`
- [ ] `DELETE /api/v1/workspaces/:workspaceId`
- [ ] Authorization: workspace ownership check

### 5. Items (`backend/src/routes/items.ts`)
- [ ] `POST /api/v1/items` — validate hierarchy, workspace ownership, stable ID
- [ ] `GET /api/v1/items/:itemId`
- [ ] `PATCH /api/v1/items/:itemId` — version concurrency check (reject if stale)
- [ ] `DELETE /api/v1/items/:itemId` — archive behavior
- [ ] `GET /api/v1/items/:itemId/children` — paginated
- [ ] `GET /api/v1/items/:itemId/tree` — subtree with depth limit
- [ ] `POST /api/v1/items/:itemId/move` — reject cycles, invalid parent, cross-workspace
- [ ] `POST /api/v1/items/:itemId/archive`
- [ ] `POST /api/v1/items/:itemId/restore`
- [ ] Hierarchy integrity enforced server-side

### 6. Search & Focus (`backend/src/routes/search.ts`, `focus.ts`)
- [ ] `GET /api/v1/search?q=...` — text search across workspace at any depth
- [ ] `GET /api/v1/focus` — filtered aggregate
- [ ] `GET /api/v1/focus/overdue`
- [ ] `GET /api/v1/focus/upcoming`
- [ ] Pagination for all list endpoints

### 7. Middleware & error handling
- [ ] Consistent error format: `{ "error": { "code", "message", "details" } }`
- [ ] Distinguish: validation, auth, permission, not-found, conflict, rate limit, server failure
- [ ] Zod request validation middleware
- [ ] Auth middleware (verify access token cookie)
- [ ] Authz middleware (workspace/item ownership)
- [ ] CORS: only `FRONTEND_URL` origin, credentials enabled
- [ ] Rate limiting (`express-rate-limit`)
- [ ] Helmet.js security headers

### 8. Security
- [ ] No secrets in code; all via `process.env`
- [ ] bcryptjs password hashing
- [ ] JWT secrets strong
- [ ] HttpOnly cookies (tokens never in JS)
- [ ] CSRF protection for cookie-based auth (double-submit or SameSite=None mitigates)
- [ ] Input sanitization
- [ ] No logging of passwords/tokens

### 9. OpenAPI documentation
- [ ] OpenAPI 3.0 spec (YAML or JSON) at `backend/openapi.yaml`
- [ ] Document: auth, workspaces, items, search, focus endpoints
- [ ] Document request/response schemas, error format, pagination, auth flows
- [ ] Document ISO 8601 dates, archive/deletion behavior
- [ ] Serve at `GET /api/docs` (optional, via swagger-ui-express or static)

### 10. Render deployment
- [ ] Create `backend/render.yaml` or configure Render dashboard web service
- [ ] Build: `npm install && npx tsc`
- [ ] Start: `node dist/index.js`
- [ ] Health check: `GET /health`
- [ ] Render env vars: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `COOKIE_DOMAIN`, `COOKIE_SECURE=true`, `COOKIE_SAME_SITE=None`, `PORT=10000`, `NODE_ENV=production`, `FRONTEND_URL=https://niwa-website-six.vercel.app`
- [ ] Enable auto-deploy from GitHub `main`
- [ ] Verify backend responds at Render URL (account for cold start)

### 11. Frontend integration
- [ ] Update `src/lib/api-client.ts` `API_BASE_URL` default to Render backend URL (or keep `/api/v1` and set via `VITE_API_BASE_URL`)
- [ ] Update `frontend/.env.local.example` with `VITE_API_BASE_URL=https://<backend>.onrender.com/api/v1`
- [ ] Test CORS: Vercel frontend → Render backend
- [ ] Test auth cookies cross-domain

### 13. Testing
- [ ] Backend unit tests: auth validation, hierarchy utilities, error formatting
- [ ] Backend integration tests: auth flow, item CRUD, hierarchy moves, search, focus (against test MongoDB Atlas DB)
- [ ] Frontend E2E against deployed backend (Playwright `PLAYWRIGHT_BASE_URL`)

### 14. Documentation
- [ ] `backend/README.md`: setup, env vars, deployment, API overview
- [ ] Update root `README.md` to describe both services
- [ ] Document API versioning (`/api/v1`)
- [ ] Document deployment and recovery

---

## Free Tier Gotchas (mitigations)

| Issue | Mitigation |
|-------|------------|
| Render cold start | Health check endpoint; frontend retries failed API calls |
| No custom domain | CORS configured for `*.vercel.app`; cross-domain cookies |
| 512 MB RAM | Keep backend minimal; avoid large payloads |
| MongoDB shared cluster | Connection pooling limited (`maxPoolSize: 5`); retry logic |
| No persistent disk | All state in MongoDB Atlas; no local file storage |

---

## Open questions remaining

None — all decided above. Ready to implement.
