# Project Finalization & Production Deployment Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conduct complete quality assurance, fix all TypeScript & ESLint errors, optimize static assets and bundle payload, unify SEO/canonical metadata, and verify clean production build for final deployment.

**Architecture:** TanStack Start (SSR) + TanStack Router with Vite and Nitro for Cloudflare deployment. TailwindCSS v4 with custom tokens and typography. Client code-splitting and asset optimization.

**Tech Stack:** React 19, TanStack Start/Router, TypeScript, Vite, Nitro, Supabase, TailwindCSS v4, Lucide React.

## Global Constraints

- Preserve Lovable git history safety: no force pushes, no squashing or rebasing pushed commits.
- Ensure all TypeScript types strictly compile with `exactOptionalPropertyTypes: true` and zero compiler warnings.
- Keep all public routes resilient with server-side fallbacks even if external databases/services are unreachable.
- Maintain bilingual (EN / AR) RTL/LTR fidelity across all UI views.

---

### Task 1: Fix Prettier CRLF Configuration and Lint Setup

**Files:**

- Create/Modify: `.prettierrc` (or `.prettierrc.json`)

**Interfaces:**

- Consumes: Prettier CLI / ESLint prettier plugin
- Produces: Normalized line ending parsing (`endOfLine: "auto"`) avoiding 11,000+ Windows CRLF false positives.

- [ ] **Step 1: Check existing Prettier configuration**
- [ ] **Step 2: Add `endOfLine: "auto"` to `.prettierrc`**
- [ ] **Step 3: Run `npx eslint --rule "prettier/prettier: off"` vs normal lint to confirm CRLF errors are eliminated**

---

### Task 2: Fix TypeScript Error in `public-types.ts` & `flagship-projects.ts`

**Files:**

- Modify: `src/lib/public-types.ts:60-63`
- Modify: `src/lib/flagship-projects.ts:550-579`

**Interfaces:**

- Consumes: `PublicProjectDetail`, `SchematicStep`
- Produces: Strictly typed `schematic_steps?: SchematicStep[] | undefined` compatible with `exactOptionalPropertyTypes: true`.

- [ ] **Step 1: Update `PublicProjectDetail` type in `src/lib/public-types.ts` to allow `undefined` explicitly**

```typescript
export type PublicProjectDetail = {
  project: PublicProject;
  location: PublicLocation | null;
  claims: PublicClaim[];
  media: PublicMedia[];
  facts: PublicProjectFacts | null;
  schema: PublicMedia | null;
  schematic_steps?: SchematicStep[] | undefined;
};
```

- [ ] **Step 2: Verify `src/lib/flagship-projects.ts` line 577 matches the type**
- [ ] **Step 3: Run `npx tsc --noEmit` and verify 0 TypeScript errors remain**

---

### Task 3: Fix Genuine ESLint Errors and React Hook Warnings

**Files:**

- Modify: `src/lib/public-data.server.ts:386`
- Modify: `src/routes/$locale.work.index.tsx:115`
- Modify: `src/routes/admin.projects.$projectId.tsx:523,2040`
- Modify: `src/routes/admin.projects.index.tsx:369-380`

**Interfaces:**

- Consumes: ESLint rules (`@typescript-eslint/no-explicit-any`, `prefer-const`, `react-hooks/exhaustive-deps`)
- Produces: Clean lint output across the repository.

- [ ] **Step 1: Replace `any` in `src/lib/public-data.server.ts` with typed interface or `unknown`**
- [ ] **Step 2: Fix `prefer-const` in `src/routes/admin.projects.$projectId.tsx` (lines 523, 2040: `let res` -> `const res`)**
- [ ] **Step 3: Fix `useMemo` dependencies in `src/routes/$locale.work.index.tsx` and `src/routes/admin.projects.index.tsx`**
- [ ] **Step 4: Run `npm run lint` and verify all errors are resolved**

---

### Task 4: Asset Optimization and Payload Slimming

**Files:**

- Remove: `public/downloads/infeworks-company-profil2e.pdf` (unused duplicate 2.41 MB)
- Relocate/Remove: `public/images/team/raw2/` and `public/images/team/raw_originals/` (raw uncompressed PNGs totaling ~10 MB)
- Convert & Optimize: `public/images/about/houssien-derbaze.png` (1.09 MB) -> `public/images/about/houssien-derbaze.webp` (~100 KB)
- Modify: `src/routes/$locale.about.tsx` to reference `houssien-derbaze.webp`

**Interfaces:**

- Consumes: Node script / Image conversion
- Produces: Slimmer public directory and reduced deployment bundle.

- [ ] **Step 1: Delete `public/downloads/infeworks-company-profil2e.pdf`**
- [ ] **Step 2: Remove `raw2` and `raw_originals` from `public/images/team/`**
- [ ] **Step 3: Convert `houssien-derbaze.png` to WebP, update `src/routes/$locale.about.tsx`, and delete large PNG**
- [ ] **Step 4: Run scratch asset check script to guarantee no missing assets remain**

---

### Task 5: SEO, Canonical URLs, and Structured Data Consistency

**Files:**

- Modify: `src/routes/__root.tsx`
- Modify: `src/routes/$locale.index.tsx`
- Modify: `src/routes/$locale.contact.tsx`
- Modify: `src/routes/$locale.work.index.tsx`
- Modify: `src/routes/$locale.work.$slug.tsx`
- Modify: `src/routes/sitemap[.]xml.tsx`

**Interfaces:**

- Consumes: Canonical domain configuration
- Produces: Unified `https://www.infeworks.com` across all canonical tags, OpenGraph URLs, JSON-LD schemas, and sitemap.

- [ ] **Step 1: Check and standardize all `infeworks.com` references to `https://www.infeworks.com`**
- [ ] **Step 2: Verify `sitemap[.]xml.tsx` outputs valid XML with all routes and alternate hreflang tags**
- [ ] **Step 3: Validate OpenGraph and Twitter card tags across all public pages**

---

### Task 6: Full Production Build & Release Verification

**Files:**

- Build artifacts: `.output/`

**Interfaces:**

- Consumes: `npm run build`
- Produces: Verified, ready-to-deploy production build.

- [ ] **Step 1: Run `npm run build` and ensure clean completion without warnings**
- [ ] **Step 2: Inspect generated `.output` size to confirm reduction**
- [ ] **Step 3: Run `git status` to ensure all necessary files are tracked and repo is clean**
- [ ] **Step 4: Commit changes in logical batches conforming to `AGENTS.md` guidelines**
