# PLAN-06.6-Backend-Optimization.md

# Plan: Milestone 0.6 — Backend Performance & Reliability Optimization

**Objective:** Optimize the NIWA backend for production readiness — improve query performance, add caching, implement proper indexing, enhance error handling/observability, and harden the API for production traffic.

**Source:** NIWA Web — Project Specification (Sections 10, 11, 12, 19), GAPS.md, current backend codebase review

**Current State:** Backend is functionally complete with all CRUD endpoints, authentication, and hierarchy operations. However, it lacks production-grade optimizations: no database indexes, no caching layer, no request/response compression, no structured logging/metrics, no rate limiting, inefficient queries (N+1 patterns, full collection scans), and no graceful degradation.

---

## Assumptions / Decisions

| Decision | Rationale |
|----------|-----------|
| Add MongoDB indexes on `workspaceId`, `parentId`, `status`, `priority`, `dueAt` | Critical for query performance as data grows |
| Add Redis for caching (sessions, hot items, focus results) | Reduces DB load, improves response times |
| Add request ID middleware + structured JSON logging | Enables distributed tracing and debugging |
| Add rate limiting middleware | Prevents abuse and brute-force attacks |
| Add response compression (gzip) | Reduces bandwidth, improves load times |
| Add field projection in read endpoints | Reduces payload size and memory usage |
| Add pagination with `limit`/`offset` params | Prevents unbounded result sets |
| Add health check with DB connectivity | Enables Render health checks and monitoring |
| Keep TypeScript strict mode | Maintains type safety |
| No new major dependencies beyond `redis`, `compression`, `express-rate-limit`, `pino` | Minimize surface area |

---

## Tasks

### Phase 1: Database Optimization (Indexing & Query Performance)

**Estimated effort: 1-2 days**

- [ ] **1.1 Add MongoDB indexes**
  - `items` collection: `{ workspaceId: 1, parentId: 1 }` (tree queries)
  - `items` collection: `{ workspaceId: 1, status: 1 }` (focus filtering)
  - `items` collection: `{ workspaceId: 1, priority: 1 }` (focus filtering)
  - `items` collection: `{ workspaceId: 1, dueAt: 1 }` (focus overdue/upcoming)
  - `items` collection: `{ workspaceId: 1, updatedAt: -1 }` (sorting)
  - `items` collection: `{ workspaceId: 1, title: "text" }` (text search — requires text index)
  - `users` collection: `{ email: 1 }` (unique, login lookup)
  - `workspaces` collection: `{ ownerId: 1 }` (workspace lookup)
  - `workspaces` collection: `{ members: 1 }` (workspace listing)

- [ ] **1.2 Optimize `getTree` query** — Currently fetches ALL items in workspace then builds tree in memory
  - Add pagination support (`limit`, `offset`, `cursor`)
  - Consider fetching only root items first, then children on expand (lazy loading)
  - Add index hints for `workspaceId` + `parentId` queries

- [ ] **1.3 Optimize `getChildren` query**
  - Ensure index on `{ workspaceId: 1, parentId: 1 }` is used
  - Add pagination support

- [ ] **1.4 Optimize `search` query**
  - Replace regex search with MongoDB text index (`$text` operator)
  - Add text index on `{ title: "text", description: "text" }`
  - Add pagination support

- [ ] **1.5 Optimize `getFocus` query**
  - Currently fetches all matching items then filters in memory (N sections)
  - Push filtering to MongoDB queries where possible
  - Add pagination per section

- [ ] **1.6 Add database connection pool tuning**
  - Tune `maxPoolSize` based on expected concurrency (default 5 → 50 for production)
  - Add `minPoolSize` to maintain warm connections
  - Add `maxIdleTimeMS` to clean up stale connections

### Phase 2: Caching Layer (Redis)

**Estimated effort: 1-2 days**

- [ ] **2.1 Add Redis dependency** (`ioredis` or `redis` npm package)
- [ ] **2.2 Create `src/lib/cache.ts`** — Redis client wrapper with get/set/del helpers
- [ ] **2.3 Cache authentication middleware** — Cache decoded JWT payload for 5 minutes to avoid repeated JWT verification
- [ ] **2.4 Cache hot items** — Cache frequently accessed items (TTL: 5 minutes) with cache invalidation on write
- [ ] **2.5 Cache focus results** — Cache focus sections with short TTL (1-2 minutes) since focus data changes frequently
- [ ] **2.6 Cache workspace data** — Cache workspace list with longer TTL (10 minutes)
- [ ] **2.7 Implement cache invalidation** — Invalidate relevant cache keys on item create/update/delete/move/archive

### Phase 3: API Performance Optimizations

**Estimated effort: 1 day**

- [ ] **3.1 Add field projection** — Only fetch fields needed by client (exclude `passwordHash`, internal fields)
- [ ] **3.2 Add pagination to all list endpoints**
  - `GET /items/:itemId/children` — `?limit=50&offset=0`
  - `GET /items/:itemId/tree` — `?limit=100`
  - `GET /search` — `?limit=50`
  - `GET /focus` — `?limit=100`
- [ ] **3.3 Add response compression** (`compression` middleware with gzip)
- [ ] **3.4 Add request ID middleware** — Generate `X-Request-ID` for tracing
- [ ] **3.5 Add rate limiting** (`express-rate-limit`)
  - Auth endpoints: 5 requests/minute per IP
  - General API: 100 requests/minute per IP
  - Authenticated endpoints: 1000 requests/minute per user ID

### Phase 4: Observability & Monitoring

**Estimated effort: 1 day**

- [ ] **4.1 Add structured logging** (`pino` logger)
  - JSON structured logs
  - Request ID correlation
  - Log levels (info, warn, error)
  - Redact sensitive data (passwords, tokens)
- [ ] **4.2 Add request timing middleware** — Log request duration, method, path, status code
- [ ] **4.3 Enhance health check endpoint**
  - `GET /health` — returns `{ status, service, version, timestamp }`
  - `GET /health/ready` — checks DB connection
  - `GET /health/live` — basic liveness check
- [ ] **4.4 Add slow query detection** — Log MongoDB queries taking > 500ms

### Phase 5: Code Quality & Reliability

**Estimated effort: 1 day**

- [ ] **5.1 Add input sanitization** — MongoDB injection prevention (validate ObjectId strings)
- [ ] **5.2 Add consistent error wrapping** — All errors go through `createError` with proper codes
- [ ] **5.3 Add graceful shutdown** — Handle SIGTERM/SIGINT, close DB connections
- [ ] **5.4 Add input validation middleware** — Zod schema validation middleware for all endpoints
- [ ] **5.5 Add TypeScript strict mode improvements** — Fix `any` types, add proper interfaces
- [ ] **5.6 Add API documentation comments** — JSDoc on all exported functions

### Phase 6: Deployment & Configuration

**Estimated effort: 0.5 days**

- [ ] **6.1 Add Redis to `render.yaml`** — Add Redis service or use Render's managed Redis
- [ ] **6.2 Add environment variables** — `REDIS_URL`, `LOG_LEVEL`, `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW`
- [ ] **6.3 Add production build optimization** — TypeScript `--declaration`, minification

---

## Exit Criteria

| Criterion | Measurement |
|-----------|-------------|
| MongoDB indexes created and verified | `db.items.getIndexes()` shows all planned indexes |
| API response time < 200ms for 95% of requests | Load testing or monitoring dashboard |
| Cache hit rate > 60% for read-heavy endpoints | Redis `INFO stats` keyspace hits/misses |
| No N+1 queries in critical paths | Query profiling shows single queries per endpoint |
| Health check returns 200 with DB status | `GET /health/ready` returns healthy |
| Rate limiting active | `express-rate-limit` headers present in responses |
| Structured JSON logging enabled | Logs output JSON with request IDs |
| Graceful shutdown tested | `SIGTERM` closes DB connections cleanly |

---

## Open Questions (to resolve before coding)

1. **Redis hosting** — Use Render's managed Redis or self-hosted? Render's managed Redis is simpler but costs more.
2. **Cache invalidation strategy** — Write-through vs write-behind? Write-through is simpler and safer for MVP.
3. **Text search vs regex** — MongoDB `$text` index requires creating a text index; existing data needs migration.
4. **Session store** — Should sessions be stored in Redis instead of cookies? Currently using cookie-only JWT, which is fine for MVP but Redis sessions would enable revocation.

---

## Files to Modify

| File | Changes |
|------|---------|
| `backend/src/lib/db.ts` | Add index creation, connection pool tuning, slow query logging |
| `backend/src/lib/cache.ts` | **NEW** — Redis client wrapper |
| `backend/src/lib/auth.ts` | Add JWT payload caching |
| `backend/src/middleware/cors.ts` | Add compression middleware |
| `backend/src/middleware/auth.ts` | Add rate limiting, cached token verification |
| `backend/src/middleware/error.ts` | Add request ID, structured logging |
| `backend/src/middleware/logging.ts` | **NEW** — Request logging middleware |
| `backend/src/middleware/ratelimit.ts` | **NEW** — Rate limiting middleware |
| `backend/src/controllers/items.controller.ts` | Add projection, pagination, index hints |
| `backend/src/controllers/search.controller.ts` | Use `$text` search instead of regex |
| `backend/src/controllers/focus.controller.ts` | Push filtering to DB queries |
| `backend/src/controllers/workspace.controller.ts` | Add pagination |
| `backend/src/index.ts` | Add graceful shutdown, health check enhancements |
| `backend/render.yaml` | Add Redis service, new env vars |
| `backend/.env.example` | Add `REDIS_URL`, `LOG_LEVEL`, `RATE_LIMIT_*` vars |

---

## Related Files (No Changes Needed)

- `backend/src/app.ts` — Route mounting stays the same, just add new middleware
- `backend/src/models/*.schema.ts` — Zod schemas are already well-defined
- `frontend/src/lib/api-client.ts` — No changes needed (API contracts unchanged)

---

**Next Step:** Review this plan and confirm before implementing Phase 1 (Database Optimization).