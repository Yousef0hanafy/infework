# Admin Funnel Revamp & Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the monolithic, resource-heavy Admin Funnel into a modular, lightweight, high-performance architecture by eliminating client-side media uploads, decomposing the 3,624-line Project Editor into clean tab modules, eliminating legacy fallback dead code, and enabling route-level lazy loading.

**Architecture:** TanStack Start (SSR) + TanStack Router (Client-only admin route trees with lazy-loading), TanStack Query v5 with deduplicated query keys, modular component hierarchy under `src/components/admin/project-editor/`, strict TypeScript interfaces without `any` casts, and static asset catalog references via `src/lib/project-meta.ts`.

**Tech Stack:** React 19, TypeScript, TanStack Router / TanStack Start, TanStack Query v5, Supabase Client, TailwindCSS v4, Lucide React.

**Spec:** [admin_funnel_discovery_report.md](file:///C:/Users/user/.gemini/antigravity-ide/brain/b5c7280e-c9f4-45c7-9a1e-00af7194f36c/admin_funnel_discovery_report.md)

## Global Constraints

- Preserve Lovable git history safety: no force pushes, no rebasing or squashing pushed commits.
- Keep the repository in a 100% buildable state (`npm run build` and `npx tsc --noEmit` must succeed with zero errors at each milestone).
- Do not break existing public project pages (`/$locale/work/$slug` and `/$locale/work`) or static project metadata references.
- All admin routes must remain strictly protected behind `supabase.auth.getUser()` and client-side execution (`ssr: false`).
- Preserve bilingual Arabic (RTL) and English (LTR) editing capabilities in project profiles, claims, and facts.

---

## Phase 1: Remove Media Upload Capability & Heavy Media Processing

### Task 1.1: Strip Media Tab, Lightbox, and Media Card Components from Project Editor

**Files:**

- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: `Project` record from Supabase, `STEPS` wizard array.
- Produces: Lean wizard containing only 6 steps (`basics`, `story`, `facts`, `evidence`, `map`, `preview`), completely eliminating all `MediaTab`, `LightboxModal`, `PhotoCard`, `SchemaCard`, `StaticPhotoCard`, drag-and-drop state, and signed-URL loops.

- [x] **Step 1: Remove unused media Lucide icons and imports**
      Remove `ArrowDown`, `ArrowUp`, `ChevronLeft`, `ChevronRight`, `GripVertical`, `ImageIcon`, `Maximize2`, `Upload` from `src/routes/admin.projects.$projectId.tsx`.
- [x] **Step 2: Update `STEPS` array and remove `media` step**
      Remove `{ key: "media", label: "Media & Downloads", icon: ImageIcon, hint: "Photos, schema and alt text" }` from `STEPS`.
- [x] **Step 3: Remove `media_assets` query and media checklist item from completeness calculation**
      In `ProjectEditor`, remove the `media_assets` count query and `{ label: "Cover or technical media", done: Boolean(completeness?.media), required: false }` from the checklist.
- [x] **Step 4: Remove `{step === "media" ? <MediaTab ... /> : null}` from tab switcher**
      Remove the conditional rendering of `MediaTab`.
- [x] **Step 5: Delete `MediaTab`, `LightboxModal`, `StaticPhotoCard`, `PhotoCard`, and `SchemaCard`**
      Remove lines 2060 through 3880 entirely from `src/routes/admin.projects.$projectId.tsx`.
- [x] **Step 6: Update `PreviewStep` to rely strictly on `getProjectMeta(project.slug)` for cover images**
      Remove `mediaAssets` and `coverUrl` signed URL queries from `PreviewStep`. Use `meta?.cover` directly for preview cards.
- [x] **Step 7: Verify compilation**
      Run: `npx tsc --noEmit`
      Expected: 0 errors in `admin.projects.$projectId.tsx`.

---

### Task 1.2: Update Navigation and Links Referencing the Media Step

**Files:**

- Modify: `src/routes/admin.projects.index.tsx`

**Interfaces:**

- Consumes: Route navigation search params.
- Produces: Links on project cards redirecting to default project view instead of deleted `step: "media"`.

- [x] **Step 1: Update thumbnail link in `admin.projects.index.tsx`**
      Change `search={{ step: "media" }}` to navigate to the project directly without `step: "media"`.
- [x] **Step 2: Run verification build**
      Run: `npm run build`
      Expected: Build passes cleanly with reduced chunk size for `admin.projects.$projectId`.

---

## Phase 2: Modular Architecture — Split Monster File into Dedicated Tab Components

### Task 2.1: Create Directory and Extract Shared Types

**Files:**

- Create: `src/components/admin/project-editor/types.ts`
- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: Supabase database schema.
- Produces: Shared TypeScript types (`Project`, `Profile`, `Claim`, `Evidence`, `LocationRow`, `StepKey`) used by all tab components.

- [x] **Step 1: Create `src/components/admin/project-editor/types.ts`**
      Define and export all shared editor types.
- [x] **Step 2: Verify type imports**
      Import types into `admin.projects.$projectId.tsx`. Run `npx tsc --noEmit`.

---

### Task 2.2: Extract `BasicInfoTab` (MetaTab) and Danger Zone

**Files:**

- Create: `src/components/admin/project-editor/BasicInfoTab.tsx`
- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: `project: Project`.
- Produces: Isolated component managing slug, classification, featured status, capabilities, and project deletion.

- [x] **Step 1: Create `BasicInfoTab.tsx`**
      Extract `MetaTab` from `admin.projects.$projectId.tsx` into `BasicInfoTab.tsx`. Include all capability checklist toggles, audit logs, and the permanent deletion modal.
- [x] **Step 2: Replace `MetaTab` in `admin.projects.$projectId.tsx` with `<BasicInfoTab project={project} />`**
- [x] **Step 3: Run `npx tsc --noEmit` to verify 0 errors.**

---

### Task 2.3: Extract `StoryTab` (ProfileEditor) and `FactsTab`

**Files:**

- Create: `src/components/admin/project-editor/StoryTab.tsx`
- Create: `src/components/admin/project-editor/FactsTab.tsx`
- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: `projectId: string`, `project: Project`.
- Produces:
  - `StoryTab`: Bilingual (EN/AR) challenge, scope, and outcome editor.
  - `FactsTab`: Client, consultant, capacity, year, and region editor.

- [x] **Step 1: Create `StoryTab.tsx`**
      Extract `ProfileEditor` component for EN and AR locales into `StoryTab.tsx`.
- [x] **Step 2: Create `FactsTab.tsx`**
      Extract `FactsTab` component into `FactsTab.tsx`.
- [x] **Step 3: Update `admin.projects.$projectId.tsx` imports and usages**
- [x] **Step 4: Run `npx tsc --noEmit` to verify 0 errors.**

---

### Task 2.4: Extract `ClaimsTab` and `LocationTab`

**Files:**

- Create: `src/components/admin/project-editor/ClaimsTab.tsx`
- Create: `src/components/admin/project-editor/LocationTab.tsx`
- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: `projectId: string`.
- Produces:
  - `ClaimsTab`: Claims CRUD + nested `EvidenceList` component.
  - `LocationTab`: Safe centroid coordinates editor + `EGYPT_COORDINATE_PRESETS`.

- [x] **Step 1: Create `ClaimsTab.tsx`**
      Extract `ClaimsTab` and `EvidenceList` into `ClaimsTab.tsx`.
- [x] **Step 2: Create `LocationTab.tsx`**
      Extract `LocationTab` and `EGYPT_COORDINATE_PRESETS` constant into `LocationTab.tsx`.
- [x] **Step 3: Update `admin.projects.$projectId.tsx` imports and usages**
- [x] **Step 4: Run `npx tsc --noEmit` to verify 0 errors.**

---

### Task 2.5: Extract `PreviewTab` & Streamline `admin.projects.$projectId.tsx`

**Files:**

- Create: `src/components/admin/project-editor/PreviewTab.tsx`
- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: `project: Project`.
- Produces:
  - `PreviewTab`: Public desktop & mobile card previews using metadata and profiles.
  - Lean `admin.projects.$projectId.tsx` (~250-350 lines) serving purely as wizard orchestrator and breadcrumb shell.

- [x] **Step 1: Create `PreviewTab.tsx`**
      Extract `PreviewStep` into `PreviewTab.tsx`.
- [x] **Step 2: Clean up `admin.projects.$projectId.tsx`**
      Ensure `admin.projects.$projectId.tsx` contains only route definition, header, wizard step pills, footer navigation, and tab container.
- [x] **Step 3: Run `npm run build`**
      Verify the build succeeds and verify file line count in `admin.projects.$projectId.tsx` drops from 3,624 to < 350 lines.

---

## Phase 3: Clean Up Dead Fallback Branches & Type Hardening

### Task 3.1: Remove Legacy Column `42703` Fallback Code

**Files:**

- Modify: `src/components/admin/project-editor/BasicInfoTab.tsx`
- Modify: `src/components/admin/project-editor/StoryTab.tsx`
- Modify: `src/components/admin/project-editor/FactsTab.tsx`
- Modify: `src/routes/admin.projects.index.tsx`

**Interfaces:**

- Consumes: Supabase database schema.
- Produces: Streamlined query/mutation functions without repetitive `if (res.error?.code === "42703")` branches.

- [x] **Step 1: Verify database column availability**
      Verify that all current columns exist in Supabase and remove dead `42703` fallback branches in project editor tabs.
- [x] **Step 2: Remove fallback branch in `admin.projects.index.tsx`**
      Clean lines 134-140 in `admin.projects.index.tsx`.
- [x] **Step 3: Run `npx tsc --noEmit` to verify 0 errors.**

---

### Task 3.2: Eliminate Unsafe `any` Casts & Add Strict Error Handling

**Files:**

- Modify: `src/components/admin/project-editor/*.tsx`
- Modify: `src/routes/admin.projects.$projectId.tsx`

**Interfaces:**

- Consumes: Strict TypeScript types.
- Produces: Fully typed database response payloads and error handlers (`catch (err: unknown)`).

- [x] **Step 1: Replace all `as any` casts with typed casts or type guards**
- [x] **Step 2: Ensure all `onError` handlers use `(err: Error | unknown)`**
- [x] **Step 3: Run `npm run lint` and `npx tsc --noEmit`**
      Verify clean lint and zero TypeScript diagnostics.

---

## Phase 4: Route Lazy Loading & Query Performance

### Task 4.1: Enable Route-Level Code Splitting for Admin Routes

**Files:**

- Modify: `src/routes/admin.projects.$projectId.tsx`
- Modify: `src/routes/admin.projects.index.tsx`
- Modify: `src/routes/admin.leads.tsx`
- Modify: `src/routes/admin.settings.tsx`
- Modify: `src/routes/admin.capabilities.tsx`
- Modify: `src/routes/admin.audit.tsx`

**Interfaces:**

- Consumes: TanStack Router file-based route definitions.
- Produces: Route definitions split between route config (`.tsx`) and lazy component implementation (`.lazy.tsx` or `lazyRouteComponent`), ensuring visitors to the public site do NOT download admin bundles.

- [x] **Step 1: Configure TanStack Router route lazy-loading**
      Ensure heavy admin chunks are split into asynchronous chunks loaded only on demand.
- [x] **Step 2: Deduplicate overlapping TanStack Query keys**
      Standardize query keys across editor and list views to maximize query cache hits and reduce unnecessary refetches.

---

## Phase 5: Final Production Build & Performance Verification

### Task 5.1: Full Production Build & Bundle Inspection

**Files:**

- Build artifacts: `.output/` and `dist/`

**Interfaces:**

- Consumes: Vite production build pipeline.
- Produces: Optimized production bundle with significantly reduced JavaScript chunks.

- [x] **Step 1: Run `npm run build`**
      Verify that all public and admin pages build cleanly with zero compiler warnings.
- [x] **Step 2: Inspect JS bundle sizes**
      Compare the new chunk sizes against the baseline (previously 128.47 KB for `admin.projects.$projectId`).
- [x] **Step 3: Run git status check**
      Verify all newly created and modified files are properly tracked and no temporary files linger.
- [x] **Step 4: Verify working tree health**
      Confirm all Lovable git constraints are satisfied.
