# Plan: Milestone 0.5 — GitHub, Vercel Deploy, and MongoDB Atlas Setup

**Objective:** Push the local repository to GitHub, deploy via Vercel using the GitHub repo, and set up a MongoDB Atlas connection file (`src/lib/db.ts`) following clean architecture and security best practices.

---

## Tasks

### 1. GitHub repository setup
- [ ] Initialize a local git repository (`git init`)
- [ ] Add all project files (excluding `node_modules`, `dist`, `.env.local`, build artifacts via `.gitignore`)
- [ ] Create initial commit with message matching repo style
- [ ] Add remote: `https://github.com/PastelSalt/niwa-website.git`
- [ ] Push to `main` branch

### 2. `.gitignore` verification
- [ ] Ensure `.gitignore` includes: `node_modules/`, `dist/`, `.env.local`, `.env.*.local`, `*.log`, `coverage/`, `.vercel/`
- [ ] Ensure `.env.local` is never committed (contains `MONGODB_URI` with password placeholder)

### 3. Vercel deployment (via GitHub repo)
- [ ] Link the GitHub repo `PastelSalt/niwa-website` to Vercel (`vercel login` if needed)
- [ ] Import the repository in Vercel dashboard or via CLI (`vercel` command)
- [ ] Configure build settings: Vite build command (`pnpm run build`), output directory (`dist`)
- [ ] Configure production environment variables in Vercel:
  - `VITE_API_BASE_URL` = actual deployed API URL
- [ ] Enable SPA route fallback (catch-all routes to `index.html`)
- [ ] Trigger a production deployment from the `main` branch
- [ ] Verify the deployed site loads correctly

### 4. MongoDB Atlas connection file
- [ ] Install the MongoDB driver: `pnpm add mongodb`
- [ ] Create `src/lib/db.ts`:
  - Import `MongoClient` from `mongodb`
  - Export async function `connectToMongoDB()`
  - Read `MONGODB_URI` from `process.env.MONGODB_URI`
  - Throw a clear error if `MONGODB_URI` is missing
  - Implement a cached client singleton (globalThis pattern) to avoid creating new connections per request in serverless environments
  - Export the connected `MongoClient` instance and/or a helper to get a `Db` reference
- [ ] Do NOT hardcode the connection string anywhere
- [ ] Add JSDoc documentation for the function

### 5. `.env.local` setup
- [ ] Create `.env.local` in project root with:
  ```
  # MongoDB Atlas connection string
  # REPLACE <db_password> with your actual database user password before use
  MONGODB_URI="mongodb+srv://zoletakyle1111_db_user:<db_password>@cluster0.qkxxphh.mongodb.net/?retryWrites=true&w=majority"
  ```
- [ ] Add comment reminding to replace `<db_password>` manually
- [ ] Confirm `.env.local` is in `.gitignore` (never committed)

---

## Assumptions
- Vercel CLI is already installed locally.
- The user has a Vercel account and access to the `PastelSalt/niwa-website` GitHub repo.
- MongoDB Atlas cluster `cluster0.qkxxphh.mongodb.net` exists with user `zoletakyle1111_db_user`.
- The frontend is a Vite SPA; API/backend is separate (per spec Section 1.3).
- `src/lib/db.ts` is intended for server-side API routes / server actions, not the browser bundle (MongoDB driver is Node.js-only).

---

## Exit criteria
- Code pushed to `https://github.com/PastelSalt/niwa-website.git` on `main`
- Vercel production deployment succeeds and site loads
- `src/lib/db.ts` exists with `connectToMongoDB()` using `MONGODB_URI` env var
- `.env.local` exists locally with the MongoDB URI template and password placeholder comment
- `.env.local` is NOT committed to git
- `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, `pnpm run build` all pass
