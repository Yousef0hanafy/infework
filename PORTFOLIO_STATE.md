# Infeworks Project Portfolio State & Image System

This document provides context for developers and AI assistants regarding the 43-project portfolio, the imagery system, and the database architecture.

---

## 1. Portfolio Structure Overview
- **Total Published Projects:** 43 projects.
- **Database / CMS Source:** Supabase database containing project slugs, titles, descriptions, and capabilities.
- **Static Metadata & Image Map:** Located at [`src/lib/project-meta.ts`](src/lib/project-meta.ts).
- **Public Assets Location:** Images are hosted under [`public/images/projects/<project-slug>/`](public/images/projects/).

---

## 2. Image Recovery & Distribution Status

### A. Authentic Assets (16 Projects)
16 projects have authentic photographs extracted directly from the source archive (`Infeworks_all_project_images.zip`). They use between 3 to 12 curated, high-performance WebP images:
- `sadat-city-ro`
- `toshka-pumping-stations`
- `toshka-farm-potable-water-plant`
- `toshka-expanded-water-networks`
- `arish-water-supply`
- `awlad-el-sheikh-pumping`
- `north-coast-desalination`
- `multi-site-desalination-purification`
- `dairy-effluent-treatment-network`
- `food-city-treatment`
- `qabs-min-nour-mosque`
- `rafah-bedouin-housing`
- `sisi-city-wastewater`
- `salam-city-cattle-farm-networks`
- `ameriya-cold-storage`
- `east-delta-wastewater`

### B. Sector-Pooled / Recycled Assets (27 Projects)
The remaining 27 projects had no original photos in the raw archive. To prevent empty/text-only cards, they were dynamically assigned a curated 12-image pool from other projects in the same **Sector/Capability** (e.g. Water Treatment, Wastewater, MEP, Infrastructure).

**The 27 Projects using Pooled Images:**
1. `gas-egypt-stations-electromechanical`
2. `shubra-shahab-technical-works`
3. `toshka-reclamation-pumping-package`
4. `salam-city-water-pipeline`
5. `beni-suef-water-wastewater`
6. `qibili-qarun-water-purification`
7. `shubra-shahab-industrial-wastewater`
8. `marble-factory-desalination-plants`
9. `qibili-qarun-goat-farm-utilities`
10. `capital-island-infrastructure`
11. `toshka-pumping-basket-screens`
12. `infrastructure-sand-procurement`
13. `cargas-grounding-systems`
14. `date-palm-cold-storage-mep`
15. `manshiyat-nasser-pumping-station`
16. `nuweiba-infrastructure-works`
17. `future-of-egypt-potato-storage-softener`
18. `al-marreikh-stadium-civil-mep`
19. `sisi-city-water-supply-network`
20. `north-sinai-dc-infrastructure`
21. `al-azhar-institute-minya`
22. `abu-minqar-agricultural-farm-utilities`
23. `hayat-karima-health-unit`
24. `bianchi-resort-infrastructure-utilities`
25. `rural-egypt-wells-minya`
26. `palm-hills-infrastructure-utilities`
27. `abu-zaabal-landfill-environmental-works`

---

## 3. Metadata & Component Architecture
- In [`src/lib/project-meta.ts`](src/lib/project-meta.ts), the `ProjectMeta` type defines `cover` and `gallery` as mandatory, and `capacity`, `client`, `consultant`, `scope`, `year`, and `region` as **optional** (`?: Bi`).
- All frontend routes (`src/routes/$locale.work.$slug.tsx`, `src/routes/$locale.work.index.tsx`, `src/routes/$locale.index.tsx`, `src/routes/$locale.what-we-do.$sector.tsx`, and `src/components/infeworks/ImpactMap.tsx`) use safe optional chaining (`meta?.capacity?.ar`) to prevent runtime crashes for projects lacking static text metadata.

---

## 4. How to Update / Replace Images in Future Sessions
1. **Drop New Images:** Place real `.webp` images in `public/images/projects/<project-slug>/`.
2. **Update Dictionary:** If names differ from standard `cover.webp` / `gallery-N.webp`, update the entries in `src/lib/project-meta.ts`.
3. No build scripts or code refactors are needed; the UI automatically updates.
