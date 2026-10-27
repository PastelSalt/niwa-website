# Plan: Milestone 0.4 — Frontend Migration to `frontend/` Folder

**Objective:** Reorganize the repository root so all frontend code lives under `frontend/`, leaving room for a sibling `backend/` directory. This is a pure move/repoint — no feature changes.

**Source:** NIWA Web — Project Specification, Sections 1.3, 9 (frontend architecture), 19 (deployment)

---

## Motivation

- Clean monorepo-style structure: `frontend/` and `backend/` are independent, deployable services
- Matches spec intent: "The website and API should be deployable independently" (Section 19)
- Prepares for Milestone 0.5 backend addition under `backend/`

---

## Current State (root)

```
niwa-website/                          (repo root)
├── package.json                       (frontend)
├── pnpm-lock.yaml
├── vite.config.ts                     (frontend)
├── postcss.config.mjs                 (frontend)
├── .prettierrc
├── eslint.config.js                   (frontend)
├── tsconfig.json                      (frontend)
├── tsconfig.node.json                 (frontend)
├── index.html                         (frontend entry)
├── vercel.json                        (frontend deployment)
├── .env.local.example                 (frontend)
├── .gitignore
├── README.md
├── LOG.md
├── GAPS.md
├── PLAN-*.md
├── scripts/                           (frontend scripts)
├── src/                               (frontend source)
└── public/                            (frontend assets)
```

---

## Target State

```
niwa-website/                          (repo root)
├── package.json                       (root — lightweight, workspaces or scripts only)
├── pnpm-lock.yaml                     (root lockfile if using workspaces)
├── .gitignore                         (root — covers frontend/ and backend/)
├── README.md                          (root — describes both services)
├── LOG.md
├── GAPS.md
├── PLAN-*.md
├── frontend/                          (frontend service)
│   ├── package.json
│   ├── pnpm-lock.yaml                 (or rely on root lockfile)
│   ├── vite.config.ts
│   ├── postcss.config.mjs
│   ├── .prettierrc
│   ├── eslint.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── index.html
│   ├── vercel.json
│   ├── .env.local.example
│   ├── scripts/
│   ├── src/
│   └── public/
└── backend/                           (backend service — added in Milestone 0.5)
    ├── package.json
    ├── ...
```

---

## Migration Tasks

### 1. Pre-migration checks
- [ ] Verify working tree is clean (all changes committed)
- [ ] Record current `git log --oneline -5` for reference
- [ ] Confirm `pnpm run build`, `pnpm run test`, `pnpm run lint`, `pnpm run typecheck` all pass on current state (baseline)

### 2. Create `frontend/` directory and move files
- [ ] `mkdir frontend`
- [ ] Move all frontend files into `frontend/`:
  - `package.json` → `frontend/package.json`
  - `pnpm-lock.yaml` → `frontend/pnpm-lock.yaml`
  - `vite.config.ts` → `frontend/vite.config.ts`
  - `postcss.config.mjs` → `frontend/postcss.config.mjs`
  - `.prettierrc` → `frontend/.prettierrc`
  - `eslint.config.js` → `frontend/eslint.config.js`
  - `tsconfig.json` → `frontend/tsconfig.json`
  - `tsconfig.node.json` → `frontend/tsconfig.node.json`
  - `index.html` → `frontend/index.html`
  - `vercel.json` → `frontend/vercel.json`
  - `.env.local.example` → `frontend/.env.local.example`
  - `scripts/` → `frontend/scripts/`
  - `src/` → `frontend/src/`
  - `public/` → `frontend/public/`
- [ ] Use `git mv` for all moves to preserve history

### 3. Update path references in moved files
- [ ] `frontend/vite.config.ts` — update `resolve.alias` path if it references `__dirname` or relative paths (should still work since `__dirname` moves with the file)
- [ ] `frontend/tsconfig.json` — update `paths` `@/*` → `./src/*` (relative, should still work)
- [ ] `frontend/eslint.config.js` — update `project` path to `tsconfig.json` (relative, should still work)
- [ ] `frontend/vercel.json` — `distDir` should be `dist` (relative, still works)
- [ ] `frontend/package.json` — verify `dev` script points to `vite` (works from `frontend/` dir)
- [ ] `frontend/scripts/init-playwright.mjs` — update any path references

### 4. Create root-level files
- [ ] Create root `package.json` (lightweight):
  - Name: `niwa`
  - Scripts: `dev` (runs `pnpm --filter frontend run dev` or `cd frontend && pnpm run dev`), `build`, `test`, `lint`, `typecheck` (delegate to frontend)
  - Optional: `"workspaces": ["frontend", "backend"]` if using pnpm workspaces
- [ ] Create root `.gitignore`:
  - `frontend/node_modules/`, `frontend/dist/`, `frontend/.env.local`
  - `backend/node_modules/`, `backend/dist/`, `backend/.env`
  - `node_modules/`, `dist/`, `.env*`, `.vercel/`, `coverage/`
- [ ] Update root `README.md` to describe both services and how to run frontend

### 5. Update Vercel deployment configuration
- [ ] `frontend/vercel.json` — ensure build command runs from `frontend/` directory (Vercel root directory setting: set root directory to `frontend` in Vercel project settings, or keep `vercel.json` in `frontend/` and point Vercel to that folder)
- [ ] If using Vercel dashboard: set "Root Directory" to `frontend`
- [ ] `VITE_API_BASE_URL` env var in Vercel points to backend (set in Milestone 0.5)

### 6. Update LOG.md and GAPS.md references
- [ ] `LOG.md` — append migration entries
- [ ] `GAPS.md` — no changes needed (structure change doesn't affect gaps)

### 7. Verification
- [ ] `cd frontend && pnpm install` (or root `pnpm install` if workspaces)
- [ ] `cd frontend && pnpm run typecheck` — passes
- [ ] `cd frontend && pnpm run lint` — passes
- [ ] `cd frontend && pnpm run test` — passes
- [ ] `cd frontend && pnpm run build` — passes, outputs to `frontend/dist/`
- [ ] `git log --oneline --all` — history preserved across the move

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| `git mv` breaks history | `git mv` preserves history; verify with `git log --follow` |
| Import paths break | All imports are relative within `src/`; only config files reference `__dirname` which moves with the file |
| Vercel build fails | Set Vercel project root directory to `frontend/` |
| pnpm-lock.yaml path | If using root workspaces, regenerate lockfile; otherwise keep `frontend/pnpm-lock.yaml` standalone |

---

## Exit Criteria

- All frontend files live under `frontend/`
- Root contains only lightweight orchestration files (`package.json`, `.gitignore`, `README.md`, `LOG.md`, `GAPS.md`, `PLAN-*.md`)
- `frontend/package.json`, `frontend/vite.config.ts`, etc. all present
- `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, `pnpm run build` all pass from `frontend/`
- Git history preserved (verified with `git log --follow frontend/vite.config.ts`)
- Ready for `backend/` addition in Milestone 0.5
