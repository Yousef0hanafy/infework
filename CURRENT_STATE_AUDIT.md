# CURRENT-STATE VALIDATION & PRIORITY DIAGNOSIS (PHASE 1)

**Audit Date:** August 31, 2026  
**Auditor:** Antigravity Agent  
**Environment:** Windows (Local Development & SSR Runtime)  
**Database Target:** Supabase Production Instance (`cnmuvufxndpiqgqwkkzr`)  

---

## 1. Current-State Executive Summary

The Infeworks project is an advanced, bilingual (EN/AR) full-stack corporate web application built with **React 19, Vite 8, TanStack Start / TanStack Router (SSR-capable), Tailwind CSS v4, and Supabase (PostgreSQL)**. 

Unlike early prototype documentation suggesting missing or empty database tables, the current live database is fully seeded with **43 projects, 86 localized project profiles, 43 geographical coordinates, 6 core engineering capabilities, and 306 verified technical claims**.

However, real runtime execution and constraint testing have revealed **critical functional defects and high-impact presentation misalignments**:
1. **Broken Lead Submission Flow (P0/P1):** Submitting inquiries for standard client categories (e.g., *Real Estate Developer*) or project scopes (e.g., *Water Treatment, Wastewater, Pumping*) triggers an immediate PostgreSQL check constraint violation (`leads_audience_type_check` / `leads_need_type_check`), silently or visibly failing client inquiries.
2. **Homepage & Portfolio Sorting Defect (P1):** The homepage and portfolio sorting algorithm attempts to prioritize projects with dedicated photography (`meta?.cover ? 1 : 0`). Because all 43 projects now have a mapped cover image (16 authentic vs. 27 sector-pooled), the sort is a no-op and falls back to `created_at DESC`. Consequently, secondary and recycled-image projects (e.g., resort utilities, landfill liners) dominate the homepage and top portfolio slots rather than the company's prestigious national flagship projects (Sadat City RO, Toshka Pumping, Arish Water Supply).
3. **Data Architecture Bifurcation:** Project data is split across Supabase (profiles, claims, locations) and static TypeScript dictionaries (`src/lib/project-meta.ts` for technical capacities, clients, consultants, and gallery arrays), creating maintenance friction.

---

## 2. What Changed Since the Previous Discovery

A direct comparison between previous documentation (`PORTFOLIO_STATE.md`, `PROJECT_INTELLIGENCE.md`) and the verified codebase shows major evolutions:

| Area | Documented / Historical State | Actual Current State (Verified) |
|---|---|---|
| **Database Population** | Described as an empty or draft catalogue relying on `flagship-projects.ts` fallbacks. | **Fully Populated**: 43 projects, 86 profiles, 43 locations, 306 claims, and 6 capabilities are live in Supabase. |
| **Taxonomy / Sectors** | 5 legacy capabilities in early schema (`water-treatment`, `wastewater`, `pumping`, `irrigation`, `electrical-control`). | **Updated to 6 Core Sectors**: `water-treatment`, `wastewater`, `pumping-wells`, `industrial-mep`, `infrastructure-networks`, `civil-buildings`. |
| **Asset Distribution** | `ameriya-cold-storage` listed as having WebP files. | `ameriya-cold-storage` uses `.jpg` files, which are correctly handled in `project-meta.ts`. |
| **Build & Bundle** | Unverified build pipeline. | **Verified clean build**: Nitro/Cloudflare worker target compiles successfully in ~20s. |
| **Route Coverage** | 20+ routes all verified returning `200 OK` (SSR-rendered) or intentional redirects (`302` on `/` to `/en`). |

---

## 3. Discovery Revalidation

Evaluating previous findings in `PROJECT_INTELLIGENCE.md` against independent verification:

* **[Confirmed] Hybrid Architecture:** React 19 + TanStack Router + Supabase + Tailwind CSS v4. Verified via `package.json` and build output.
* **[Confirmed] Bi-lingual Routing:** Strict `$locale` (`/en/` and `/ar/`) routing across all public pages, with SSR metadata and localized text.
* **[Confirmed] 16 Authentic vs 27 Pooled Image Projects:** Verified on disk (`public/images/projects/`).
* **[Contradicted] Need for Urgent KB Synchronization Pipeline:** The previous phase recommended investigating the pipeline between `Infeworks_KB_Markdown` and Supabase as the top priority. **Revalidation shows this is NOT the top priority.** The DB already contains the curated 43 projects and 306 claims. Building an automated sync tool for a static SharePoint archive yields no immediate business value compared to fixing broken lead generation and showcase sorting.
* **[No Longer True] Empty DB Fallback Dependency:** `flagship-projects.ts` was written as an emergency fallback if the DB returned 0 rows. In the current runtime, the live DB returns all 43 projects, rendering the fallback dormant.

---

## 4. Current Technical State

* **Framework & Build:** Vite 8.1.5 with `@lovable.dev/vite-tanstack-config`, `@tanstack/react-start` (SSR), and Nitro (Cloudflare module preset). The full production build succeeds with 0 errors.
* **Routing:** TanStack Router with code-splitting and file-based route definitions (`src/routes/`). 
* **State & Data Fetching:** `@tanstack/react-query` with TanStack Start `createServerFn` (`getPublicProjects`, `getPublicProjectBySlug`, `getCapabilities`, `getSiteSettings`, `submitContact`).
* **Database & RLS:** Supabase (PostgreSQL 15). Row Level Security is active. Public view `vw_public_projects` restricts output to published non-study projects.
* **Deprecations:** `createServerFn().inputValidator()` is flagged as deprecated in TanStack Start (should use `.validator()`), generating build warnings but not breaking execution.

---

## 5. Current Runtime / Browser State

* **Dev Server Execution:** Runs cleanly on `http://localhost:8081/`.
* **Route Health (All Verified 200 OK):**
  * `http://localhost:8081/` -> `302` Redirect to `/en`
  * `http://localhost:8081/en` & `/ar` -> `200 OK` (Full SSR HTML: ~812 KB)
  * `http://localhost:8081/en/work` & `/ar/work` -> `200 OK`
  * `http://localhost:8081/en/work/sadat-city-ro` -> `200 OK`
  * `http://localhost:8081/en/work/gas-egypt-stations-electromechanical` -> `200 OK`
  * `http://localhost:8081/en/what-we-do` & `/what-we-do/water-treatment` -> `200 OK`
  * `http://localhost:8081/en/about` & `/ar/about` -> `200 OK`
  * `http://localhost:8081/en/contact` & `/ar/contact` -> `200 OK`
  * `http://localhost:8081/admin` & `/admin/login` -> `200 OK`
  * `http://localhost:8081/sitemap.xml` -> `200 OK` (Generates 86 project entries + static pages)

---

## 6. Current Data & Content State

```
┌────────────────────────────────────────────────────────┐
│               Infeworks Data Topology                 │
├────────────────────────┬───────────────────────────────┤
│ Supabase DB (Live)     │ • 43 Projects                 │
│                        │ • 86 Profiles (EN + AR)       │
│                        │ • 43 Lat/Lng Locations        │
│                        │ • 306 Technical Claims        │
│                        │ • 6 Core Capabilities         │
│                        │ • 28 Global Site Settings     │
├────────────────────────┼───────────────────────────────┤
│ Static project-meta.ts │ • Asset paths (cover/gallery) │
│                        │ • Client name (EN/AR)         │
│                        │ • Consultant name (EN/AR)     │
│                        │ • Scope summary (EN/AR)       │
│                        │ • Capacity benchmark (EN/AR)  │
│                        │ • Region / Year               │
├────────────────────────┼───────────────────────────────┤
│ Asset Storage          │ • 43 project folders on disk  │
│ (public/images/)       │ • 16 authentic photo sets     │
│                        │ • 27 sector-pooled photo sets │
└────────────────────────┴───────────────────────────────┘
```

---

## 7. Current UX State

* **Strengths:** 
  * Seamless locale switching between English and Arabic preserving current routes.
  * Rich interactive widgets (Leaflet `ImpactMap`, SVG `SectorSchematic`, interactive `LifecycleFlow`, `ClientsMarquee`, and `SuppliersShowcase`).
  * Fast navigation with server-rendered HTML payloads.
* **Weaknesses:**
  * **Broken Form Submissions:** Users who select custom audience types or scopes receive unexpected errors.
  * **Misleading Homepage Showcase:** Visitors first see secondary projects rather than flagship water/infrastructure megaprojects.
  * **Pagination / Filtering Friction:** `/work` defaults to 12 projects with a "Load More" button, but capability filtering resets the pagination without deep linking or URL state sync.

---

## 8. Current UI State

* **Visual Identity:** Warm sand (`#f4efe6`) and dark blueprint navy (`#070e1a` / `#0b1628`) with technical cyan (`#00c8d5`) and warm clay (`#b05e2a`) accents.
* **Typography:** `Space Grotesk` for display metrics, `Inter` for body copy, `Cairo` for Arabic typography.
* **RTL Support:** Extensive use of logical CSS properties (`ms-auto`, `border-s`, `rtl:rotate-180`), providing high-quality Arabic rendering.
* **Responsiveness:** Grid layouts collapse smoothly from 3 columns to single-column cards on mobile.

---

## 9. Corporate Credibility Assessment

* **Perception for Government / Sovereign Clients (NSPO, Armed Forces):** The inclusion of authentic client logos (Abnaa Sinai, NSPO, Armed Forces Engineering Authority) and technical claims (with flow rates, hydraulic parameters, and lab standards) projects institutional scale.
* **Vulnerability:** The 27 projects with sector-pooled images use repetitive photography across multiple unrelated projects. If a technical procurement auditor inspects 3 different pumping projects and sees identical pump bays, credibility could be questioned.

---

## 10. Critical / High-Impact Issues

### Issue 1: Lead Submission Check Constraint Violation
* **Severity:** **P0 — Critical**
* **Confidence:** Verified via direct Supabase runtime query (`scratch/test_lead_insert.mjs`).
* **Evidence:** In `src/routes/$locale.contact.tsx`, options such as `developer`, `contractor`, `water-treatment`, `wastewater`, `pumping`, `networks`, `mep`, and general inquiry types are sent directly to `leads.audience_type` and `leads.need_type`. The PostgreSQL schema strictly requires:
  * `audience_type IN ('state','industrial','agricultural','other')`
  * `need_type IN ('design','execution','om','turnkey','other')`
* **Impact:** Submitting inquiries with standard business options throws `leads_audience_type_check` or `leads_need_type_check` errors, preventing lead capture.
* **Root Cause:** Schema check constraints created in initial migrations were never updated when frontend UI dropdowns expanded.
* **Recommended Direction:** Update the database migration / check constraints on `leads` table to accept all modern frontend inquiry and scope types, or map them safely in `submitContact` before insertion.
* **Complexity:** Low (~15 mins).

---

### Issue 2: Ineffective Featured Project Sorting
* **Severity:** **P1 — High**
* **Confidence:** Verified via runtime output (`scratch/test_runtime.js`).
* **Evidence:** The homepage (`$locale.index.tsx`) and work index (`$locale.work.index.tsx`) sort projects using `aHasDedicated = metaA?.cover ? 1 : 0`. Because all 43 projects have a cover, the comparison `bHasDedicated - aHasDedicated` always evaluates to `0`. The query orders by `created_at DESC`, displaying the most recently added projects (`bianchi-resort`, `palm-hills`, `rural-egypt-wells`, `abu-zaabal-landfill`) at the top of the homepage instead of premier flagship projects (`sadat-city-ro`, `toshka-pumping-stations`, `arish-water-supply`, `food-city-treatment`).
* **Impact:** Visitors are presented with secondary projects with recycled imagery rather than the company's verified high-capacity state achievements.
* **Root Cause:** The sorting heuristic assumed projects without authentic photos had `cover: null`, but all projects were assigned a cover file.
* **Recommended Direction:** Introduce an explicit `featured?: boolean` or `priority: number` flag (or authentic photo check) in project metadata/DB to guarantee Tier-1 flagship projects appear first.
* **Complexity:** Low (~20 mins).

---

### Issue 3: Dual Source-of-Truth Maintenance Fragmentation
* **Severity:** **P1 — High**
* **Confidence:** Verified by inspecting `src/lib/project-meta.ts` (1,269 lines) vs Supabase tables.
* **Evidence:** Core project facts (e.g., Client, Consultant, Scope, Capacity) reside in static TypeScript (`project-meta.ts`), while titles, challenges, outcomes, and claims reside in Supabase. Admin dashboard editing in `/admin/projects/$projectId` cannot update the static metadata fields without code redeployment.
* **Impact:** Editing projects via the admin panel creates partial updates where challenge/outcome change, but capacity/scope remain frozen in static code.
* **Root Cause:** Incremental transition from static hardcoded metadata to database records.
* **Recommended Direction:** Unify all project attributes into Supabase or provide an automated export/sync script.
* **Complexity:** Medium (~2 hours).

---

## 11. Medium / Lower-Priority Issues

### Issue 4: Deprecated TanStack Start Server Function Validator
* **Severity:** **P2 — Medium**
* **Evidence:** Build log warnings: `createServerFn().inputValidator() is deprecated. Use createServerFn().validator() instead.` in `public.functions.ts` and `contact.functions.ts`.
* **Impact:** Future TanStack Start version updates will break server function compilation.
* **Complexity:** Low (~10 mins).

---

### Issue 5: Filter State Not Synced to URL Query Params on `/work`
* **Severity:** **P2 — Medium**
* **Evidence:** In `src/routes/$locale.work.index.tsx`, the capability filter is stored in local React state (`useState("all")`) rather than router search params (`useSearch()`).
* **Impact:** Users cannot bookmark or share links to filtered categories (e.g. `/en/work?sector=water-treatment`).
* **Complexity:** Low (~30 mins).

---

### Issue 6: Unused / Dead Fallback Files
* **Severity:** **P3 — Low**
* **Evidence:** `src/lib/flagship-projects.ts` contains duplicate hardcoded copy for 8 projects as a fallback for empty DBs, but is never reached because the DB has 43 rows.
* **Impact:** Code bloat and potential confusion during maintenance.
* **Complexity:** Low (~15 mins).

---

## 12. Root Causes / Systemic Problems

1. **Schema-to-UI Divergence:** The database schema was created with rigid check constraints during early prototyping, while the frontend UI form was subsequently expanded with realistic procurement categories without updating the DB migrations.
2. **Asset Abstraction Incompleteness:** The project metadata dictionary (`project-meta.ts`) successfully resolved broken image paths by assigning pooled images to 27 projects, but masked the distinction between *authentic* and *recycled* assets from the sorting algorithms.

---

## 13. Data Integrity Assessment

* **Is the Database Valid?** **Yes.** All 43 projects, 86 profiles, 43 coordinates, and 306 claims in Supabase match the authoritative technical records from the corporate knowledge base.
* **Is KB Synchronization an Active Blocker?** **No.** The manual/batch migration already completed successfully. The live website is completely decoupled from the SharePoint Markdown archive and runs independently on Supabase.

---

## 14. Priority Matrix

```
┌───────────────┬───────────────────────────────────────────────┐
│ Severity      │ Issue Description                             │
├───────────────┼───────────────────────────────────────────────┤
│ P0 (Critical) │ Fix Lead Submission Check Constraints in DB   │
│ P1 (High)     │ Fix Flagship Showcase Sorting on Home & Work  │
│ P1 (High)     │ Unify Project Meta & DB Architecture          │
│ P2 (Medium)   │ Modernize TanStack Start Server Fn Validators │
│ P2 (Medium)   │ Add URL Search Param Sync to Work Filters     │
│ P3 (Low)      │ Clean Up Obsolete Fallback Code               │
└───────────────┴───────────────────────────────────────────────┘
```

---

## 15. Recommended Remediation Order

1. **Step 1 (Immediate Fix — P0):** Update database constraint or sanitize form input in `contact.functions.ts` to guarantee 100% of contact form submissions succeed regardless of selected dropdown options.
2. **Step 2 (Presentation Polish — P1):** Correct the sorting logic in `src/routes/$locale.index.tsx` and `src/routes/$locale.work.index.tsx` so top-tier authentic projects (Sadat City RO, Toshka Pumping, Food City, Arish Water Supply) are always prioritized on the homepage and top portfolio grid.
3. **Step 3 (UX Polish — P2):** Connect `/work` filter pills to URL query parameters (`?sector=...`) for shareable, bookmarkable deep links.
4. **Step 4 (Technical Modernization — P2):** Migrate `inputValidator()` to `.validator()` in server functions to clear build warnings.

---

## 16. Recommended Next Phase

### Phase 2: Functional Remediation & Showcase Alignment

**Primary Objective:**
Resolve the critical lead capture defect (P0) and align the homepage/portfolio presentation with verified flagship projects (P1), ensuring immediate production readiness and institutional credibility.

*Why?*
The database and asset foundation are already complete and functional. Fixing the lead form directly protects inbound revenue, while showcasing the best authentic projects immediately elevates the site's credibility for procurement stakeholders.
