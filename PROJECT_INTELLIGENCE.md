# PROJECT INTELLIGENCE: Infeworks Corporate Website

## 1. Executive Understanding
Infeworks is a large-scale engineering, infrastructure, and contracting firm operating primarily in Egypt. This repository represents a full-stack corporate website that serves as a high-end portfolio and lead-generation tool. The current implementation is a sophisticated hybrid: it combines a highly interactive frontend with a rigorous backend data layer that categorizes projects, tracks specific evidentiary claims, and integrates directly with an extensive corporate knowledge base.

## 2. Product Purpose & Audience
- **Purpose**: To showcase technical competence, project scale, and corporate reliability. It is designed to act as a definitive proof-of-capability for prospective clients, moving beyond simple marketing to provide evidentiary case studies.
- **Audience**: Corporate clients, procurement officers, government entities (e.g., National Service Projects Organization, Armed Forces Engineering Department), and infrastructure consultants. The tone and presentation must project credibility, trust, and massive scale.

## 3. Current Architecture
- **Framework**: React 19, Vite, TanStack Router (strict file-based routing).
- **Backend/Data Layer**: Supabase (PostgreSQL) handling projects, claims, evidence, locations, and lead generation.
- **Styling & UI**: Tailwind CSS v4, shadcn/ui (Radix UI base).
- **Interactivity/Animation**: `lenis` for smooth scrolling, `tw-animate-css`, and heavy use of custom interactive backdrops (`TopographicBackdrop`, `NetworkFlowBackdrop`).
- **Mapping**: `react-leaflet` and custom Egypt-specific SVG stages.
- **State & Fetching**: `@tanstack/react-query`.

## 4. Application / Route Map
- **Public Routes (Bi-lingual `/$locale/`)**:
  - `index.tsx`: Homepage featuring impact maps, lifecycle flows, and broad capabilities.
  - `about.tsx`: Corporate identity, milestone tracks, and company history.
  - `what-we-do.index.tsx` / `what-we-do.$sector.tsx`: Deep dives into specific infrastructure sectors.
  - `work.index.tsx` / `work.$slug.tsx`: The project portfolio and individual case studies.
  - `contact.tsx`: Lead generation and geographical footprint.
- **Admin Routes (`/admin/`)**:
  - Authenticated internal dashboard.
  - Manages projects, project profiles, leads, capabilities, and system settings directly via Supabase.

## 5. Data & Content Architecture
The content architecture is divided into two distinct layers:
1. **Database Layer (Supabase)**: Stores the mutable, structural data (`projects`, `public_project_profiles`, `claims`, `evidence`, `locations`). It enforces strict business logic (e.g., a "publish gate" trigger prevents internal studies from being published).
2. **Static Metadata Layer (`src/lib/project-meta.ts`)**: Hardcodes the visual asset mapping (covers and galleries) and localized static project attributes (capacity, client, consultant, scope, year) for 43 published projects. 

## 6. Knowledge Base / Source-of-Truth Relationships
- The project includes a massive, meticulously structured internal directory: `Infeworks_KB_Markdown` (extracted from 67,619 SharePoint items).
- The KB enforces a strict **evidence policy** (data must be `observed`, `extracted`, `derived`, or `unknown`).
- The website is effectively a curated, public-facing projection of this KB. The database's `claims` and `evidence` tables directly reflect the KB's philosophy of never separating a claim from its source.

## 7. Asset Architecture & Image Relationships
- According to `PORTFOLIO_STATE.md`, there are 43 published projects.
- **Authentic Assets**: 16 projects have real, curated photographs (3-12 WebP images each).
- **Sector-Pooled / Recycled Assets**: The remaining 27 projects lack original photos. To prevent empty UI states, they dynamically draw from a curated 12-image pool based on their sector.
- All assets are served locally from `public/images/projects/<project-slug>/`.

## 8. User Journeys
- **The Procurement Visitor**: Lands on the homepage -> explores the `ImpactMap` to see national scale -> navigates to a specific sector (e.g., Water Treatment) -> views a specific project case study -> reads validated claims -> submits a highly structured lead via the contact form.
- **The Internal Admin**: Logs into `/admin` -> reviews incoming leads -> updates project profiles, capabilities, or site settings without needing a code deployment.

## 9. Current UI/UX State
- The UI is highly polished, leaning heavily into a "premium engineering" aesthetic.
- Features complex bespoke components: `ImpactMap`, `LifecycleFlow`, `EgyptStage`, `MilestoneTrack`, and `SectorSchematic`.
- Deeply integrated localization (English/Arabic) affects routing, data models, and UI rendering.
- The use of pooled images for 27 projects is a UX compromise designed to maintain visual consistency at the expense of strict authenticity.

## 10. Technical State
- Highly mature and structured codebase.
- Database utilizes robust PostgreSQL features (Row Level Security, trigger functions for `updated_at` and publish gating).
- Type-safe routing via TanStack Router provides strong developer guarantees.
- The presence of a `Lovable` integration constraint (`AGENTS.md`) dictates that git history must not be rewritten, as the project is synced with an external visual builder.

## 11. Important Observations
- The separation of visual/static metadata (`project-meta.ts`) from textual DB data allows the frontend to guarantee UI stability (no broken image links) even if the database changes.
- The strict adherence to "evidence" and "claims" in the DB schema is highly unusual for a standard corporate site and speaks to the specific demands of government/military contracting in Egypt.

## 12. Potential Risk Areas
- **Data Fragmentation**: Having data split between the Markdown KB, the Supabase DB, and `project-meta.ts` creates a high risk of desynchronization.
- **Image Recycling Discovery**: A sharp-eyed client or procurement officer might notice that 27 projects share identical "pooled" images, which could temporarily undermine the "evidence-based" credibility the site strives for.
- **Performance**: The combination of `react-leaflet`, complex SVG animations, and heavy WebP galleries could impact performance if not aggressively optimized and lazy-loaded.

## 13. Unverified / Ambiguous Areas
- **Sync Mechanism**: It is currently unknown how (or if) the `Infeworks_KB_Markdown` syncs with the Supabase database. Is it a manual entry process via the admin panel, or is there an automated pipeline?
- **RTL Completeness**: While `locale` routing exists, the completeness of Right-to-Left (RTL) styling across all complex bespoke components (like `LifecycleFlow` and `SectorSchematic`) remains unverified.

## 14. Constraints & Important Existing Decisions
- **Git History**: Do not rewrite git history, force push, or rebase due to Lovable integration.
- **Publishing Rules**: Projects classified as 'study' are hard-blocked by the database from being published.
- **Asset Fallbacks**: The business has explicitly decided that pooled/recycled images are preferable to empty/text-only project cards.

## 15. Your Current Assessment of the Product
The Infeworks website is not a standard brochure site; it is a highly engineered, data-driven portfolio designed to withstand procurement scrutiny. It successfully merges high-end, animated UI with a rigorous, evidence-backed data model. However, the architectural split between static TS metadata, a PostgreSQL database, and a massive Markdown knowledge base creates a complex maintenance surface. The product is mature, visually ambitious, and functionally complex.

---

## Recommended Next Investigation

**Data Integrity and KB Synchronization Pipeline**

Based on the evidence, the next phase should focus exclusively on understanding the flow of truth between the three data silos: `Infeworks_KB_Markdown`, the Supabase database, and `src/lib/project-meta.ts`. 

*Why?*
The entire credibility of this product relies on its "evidence policy." Before we touch the UI/UX, we must verify if the data presented to the user is accurately reflecting the strict Markdown KB. We need to investigate if there are scripts (like `fetch_projects.py` or `migrate_taxonomy.js` found in the root) that handle this synchronization, or if it is purely manual. If the data pipelines are broken or desynchronized, any UI improvements will be built on a fractured foundation. This must happen before any visual or feature-level audits.
