# Work & Projects Review Plan

## 1. Page Assessment & Purpose

- **Target Pages**: Portfolio Index (`$locale.work.index.tsx`) and Case Study Detail (`$locale.work.$slug.tsx`).
- **Intended Audience**: Prospective clients and consultants evaluating Infeworks' track record, scale, and specific technical delivery capabilities.
- **Current Effectiveness**: High. The use of a hybrid data-fetching model (Supabase live data + hardcoded flagships) ensures stability. The layout is clean and focuses on deliverables.

## 2. Claim Verification & Content Updates

| Current Text / Claim                | Location                 | Observation & Proposed Update                                                                                                                                                                          |
| :---------------------------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **"100% Single-Contract Delivery"** | Index Page (Hero Stats)  | _Issue_: Repeats the absolute claim we already removed from the About page.<br>_Proposed_: Update to match the new About page standard (e.g., "Full Contract Accountability" / "المسؤولية التعاقدية"). |
| **"Exhaustive case studies..."**    | Index Page (Description) | _Issue_: "Exhaustive" is slightly hyperbolic marketing-speak.<br>_Proposed_: Change to "Detailed case studies..." or "Documented records...".                                                          |

## 3. Visual & Best Practices Audit

| Area                 | Observation                                                                          | Recommendation                                                                                                        |
| :------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **SEO (Schema.org)** | Detail page uses `@type: "Project"` perfectly. Index page lacks schema.              | **Add Schema**: Inject a `CollectionPage` JSON-LD schema into the Index page's `<head>`.                              |
| **Duplicated Code**  | Hero metrics grid (50+ Projects, 20+ Years, etc.) is duplicated from the About page. | **Best Practice**: Extract into a shared `<HeroMetrics />` component to maintain single source of truth.              |
| **Styling**          | Filter buttons use inline React `style={{...}}` for active states.                   | **Best Practice**: Use Tailwind's `data-[active=true]:bg-[...]` or conditional class names via `clsx/tailwind-merge`. |
| **Image Loading**    | Cover images use `loading="lazy"` and `decoding="async"`.                            | **Good**: Excellent performance practice, leave as is.                                                                |

## 4. Next Steps for Approval

1. Update the "100% Single-Contract Delivery" claim in the Work Index page to match the About page.
2. Refine the meta description copy.
3. (Optional) Inject `CollectionPage` JSON-LD schema to the Index page.
4. (Optional) Refactor the duplicated Hero Stats grid into a shared component.

_Awaiting user approval to proceed with implementation._
