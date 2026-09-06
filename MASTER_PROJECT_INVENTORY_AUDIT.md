# Infeworks Project Portfolio: Master Inventory & Reconciliation Audit

**Audit Version:** 1.0 (Master Discovery & Forensic Reconciliation)  
**Audit Date:** September 2026  
**Auditor:** Antigravity AI Forensic Engine
**Workspace:** `g:\Freelance Projects\Projects\Infeworks\Website\v9_L_origin`  
**Classification:** DISCOVERY / AUDIT (Non-Destructive)

---

## 1. Executive Summary

This forensic audit evaluates the entity integrity and source-of-truth reconciliation of the **Infeworks Project Portfolio**. Every project currently published in the application has been cross-examined against four primary evidence layers:

1. **The Live Database & Frontend Layer:** Supabase production tables (`projects`, `public_project_profiles`, `claims`, `locations`) and static dictionaries ([`src/lib/project-meta.ts`](src/lib/project-meta.ts)).
2. **The Markdown Knowledge Base (KB):** `Infeworks_KB_Markdown` containing 2,946 structured Markdown files and 2,485 extracted Office documents derived from 67,619 SharePoint items.
3. **The Raw Image Archive:** `Infeworks_all_project_images.zip` (1,052 high-resolution site photographs across 14 project folders).
4. **The Source SharePoint Directory Tree:** `01- Master` (56 top-level directories spanning 2020–2026, Historical Archives, and Tenders/Studies).

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         EVIDENCE TOPOLOGY SUMMARY                                │
├──────────────────────────┬──────────────────────┬────────────────────────────────┤
│ Source Evidence Layer    │ Raw Item Count       │ Entity Interpretation          │
├──────────────────────────┼──────────────────────┼────────────────────────────────┤
│ Live Portfolio Database  │ 43 Published Slugs   │ 43 Projects / 86 Profiles      │
│ SharePoint 01- Master    │ 56 Top-Level Folders │ 42 Active + 7 Study + 7 Hist. │
│ KB PROJECT_INDEX.md      │ 42 Master Records    │ INF-P-2020-001 to 2026-009     │
│ KB 02_PROJECTS           │ 45 Markdown Files    │ 42 Base + 3 Supplemental       │
│ KB 02_ALL_PROJECTS       │ 56 Markdown Files    │ 56 Directory-Mapped Files      │
│ Raw Image Archive        │ 1,052 Photographs    │ 14 Project Folders with Photos │
├──────────────────────────┴──────────────────────┴────────────────────────────────┤
│ ESTIMATED CANONICAL CATALOG : 36 Genuine Engineering Projects (or 37 with Villa) │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Forensic Inventory Counts

| Metric                                      | Count  | Forensic Explanation                                                                                                                                                                                                                                                                          |
| ------------------------------------------- | :----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Current Portfolio Projects**              | **43** | Currently published in database and frontend routes.                                                                                                                                                                                                                                          |
| **Source Project Folders (2020–2026)**      | **42** | Active execution project folders identified in SharePoint `01- Master`.                                                                                                                                                                                                                       |
| **KB Index Project Records**                | **42** | Mapped in [`01_INDEX/PROJECT_INDEX.md`](Infeworks_KB_Markdown/01_INDEX/PROJECT_INDEX.md) (`INF-P-2020-001` through `INF-P-2026-009`).                                                                                                                                                         |
| **Estimated Canonical Projects**            | **36** | True independent contracting/engineering projects after consolidating duplicates, subcontracts, and non-project entries.                                                                                                                                                                      |
| **Confirmed Valid Projects**                | **35** | Real engineering projects with verified client, scope, and technical documentation.                                                                                                                                                                                                           |
| **Projects Requiring Review / Decision**    | **8**  | Records with structural ambiguities, dual origins, or scope overlap.                                                                                                                                                                                                                          |
| **Probable Duplicates / Subcontracts**      | **5**  | 1 umbrella duplicate (`toshka-pumping-stations`), 1 compensation claim (`shubra-shahab-technical-works`), 1 screen fabrication component (`toshka-pumping-basket-screens`), 1 earthing subcontract (`cargas-grounding-systems`), and 1 dual-attributed RO plant (`north-coast-desalination`). |
| **Suspicious / Non-Project Records**        | **2**  | 1 materials procurement PO (`infrastructure-sand-procurement` / "شراء رمال") and 1 fictional prototype (`east-delta-wastewater`).                                                                                                                                                             |
| **Fictional / Ghost Records**               | **1**  | `east-delta-wastewater` has 0 hits across all 67,619 SharePoint items and KB files.                                                                                                                                                                                                           |
| **Missing Portfolio Projects (Primary)**    | **1**  | `INF-P-2021-005` (Toshka Water & Sewer Contract 115-2020 Supplemental — 243 files, 23 authentic photos) was skipped during batch ingestion.                                                                                                                                                   |
| **Missing Projects (Historical/Reference)** | **4**  | `villa maged kedwani` (18 authentic photos), `ابو المطامير`, `الصينيين`, `مرزعه 5000 فدان`.                                                                                                                                                                                                   |
| **Projects with Authentic Photography**     | **15** | 14 extracted from image zip + 1 (`ameriya-cold-storage`) with local authentic JPGs.                                                                                                                                                                                                           |
| **Projects with Sector-Pooled Photography** | **27** | Photoless projects drawing from a shared 12-image capability pool.                                                                                                                                                                                                                            |
| **Direct Image Mismatches**                 | **2**  | `food-city-treatment` (assigned Dairy Effluent photos) and `north-coast-desalination` (assigned Multi-Site El-Hamam photos).                                                                                                                                                                  |
| **Projects with Weak / Incomplete Data**    | **6**  | Records with < 8 source files and minimal technical claim parameters.                                                                                                                                                                                                                         |

---

## 2. Master Project Reconciliation Table

The following table reconciles every single one of the **43 currently published portfolio projects** against the Knowledge Base, SharePoint file trees, raw image archives, and database batch sources.

|   #    | Current Portfolio Slug                     | Current Portfolio Title (EN / AR)                                                                                                          | Source / KB ID                      | SharePoint Source Folder                         | Client / Entity                         | Discipline / Sector       | Media State                              | Evidence Status & Action                                                                                |
| :----: | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------ | --------------------------------------- | ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **01** | `sadat-city-ro`                            | Sadat City RO Desalination Plant<br/>_(محطة تحلية مياه البحر بالسادات 1500 م³/يوم)_                                                        | `INF-P-2021-003`                    | `2021/03-(محطه التحليه بالسادات...)`             | NSPO / Macaroni Factory                 | `water-treatment`         | ✅ Authentic (12 WebP / 16 Raw)          | **Confirmed Valid Flagship**. Fix title ("مياه بحر" -> "مياه آبار / مياه صناعية").                      |
| **02** | `toshka-pumping-stations`                  | Toshka Agricultural Water & Wastewater Stations<br/>_(محطات المياه والصرف الزراعي بتوشكى)_                                                 | Synthetic Umbrella                  | Multiple Toshka folders                          | NSPO / Ministry of Agriculture          | `pumping-wells`           | ⚠️ Pooled (4 WebP from 2021/05)          | **Umbrella Duplicate**. Duplicates 4 specific Toshka contracts. Retire or consolidate.                  |
| **03** | `food-city-treatment`                      | Food City Industrial Wastewater Treatment Facility<br/>_(محطة المعالجة الصناعية بالمدينة الغذائية 50 م³/يوم)_                              | `INF-P-2021-002`                    | `2021/02- محطه المعالجه بالمدينة الغذائية...`    | NSPO / Biscuit Factory                  | `wastewater`              | ❌ Mismatch (5 WebP from Dairy Effluent) | **Confirmed Real Project**. Has image mismatch (uses Dairy Effluent photos).                            |
| **04** | `arish-water-supply`                       | Arish Infrastructure & Water Supply Network<br/>_(شبكات البنية التحتية وتغذية المياه بالعريش)_                                             | `INF-P-2024-005`                    | `2024/05-مشروع تغذيه مطار العريش...`             | Al-Organi Group / Armed Forces          | `infrastructure-networks` | ✅ Authentic (12 WebP / 206 Raw)         | **Confirmed Valid Flagship**. Clarify title to reflect Airport Feed project.                            |
| **05** | `awlad-el-sheikh-pumping`                  | Awlad El-Sheikh Potable Water Pumping Station<br/>_(محطة ضخ مياه الشرب — أولاد الشيخ)_                                                     | `INF-P-2022-001`                    | `2022/01- محطه رفع بقريه اولاد الشيخ`            | Upper Egypt Water Authority             | `pumping-wells`           | ✅ Authentic (2 WebP / 8 Raw)            | **Confirmed Valid Project**. Strengthen media & technical claim data.                                   |
| **06** | `north-coast-desalination`                 | North Coast Commercial RO Water Treatment<br/>_(معالجة مياه بالتناضح العكسي — الساحل الشمالي)_                                             | `INF-P-2024-003` / `INF-P-2020-003` | `2024/03-مشروع الساحل الشمالى...` & `2020/03`    | Regional Coastal Authority              | `water-treatment`         | ⚠️ Cross-Mapped (10 WebP from 2020/03)   | **Ambiguous Dual Origin**. Reconcile 2024 (500 m³) vs 2020 El-Hamam package.                            |
| **07** | `ameriya-cold-storage`                     | Ameriya Industrial Cooling & Water Distribution<br/>_(التبريد الصناعي وتوزيع المياه — العامرية)_                                           | `INF-P-2021-001`                    | `2021/01- انشاء ثلاجات بقطاع العامريه`           | NSPO Logistics                          | `industrial-mep`          | ✅ Authentic (6 JPGs)                    | **Confirmed Valid Project**. High-quality BOQ/QS structure in KB.                                       |
| **08** | `east-delta-wastewater`                    | East Delta Municipal Wastewater Treatment<br/>_(معالجة الصرف الصحي — دلتا الشرق)_                                                          | **NONE**                            | **NO SOURCE RECORD**                             | Unknown / Synthetic                     | `wastewater`              | ❌ Fictional / Stock (6 WebP)            | **Fictional Prototype**. 0 source occurrences. Must be removed from production.                         |
| **09** | `beni-suef-water-wastewater`               | Beni Suef Potable Water & Wastewater Treatment Plants<br/>_(محطات تنقية مياه الشرب ومعالجة الصرف الصحي — بني سويف)_                        | `INF-P-2020-001`                    | `2020/01-محطات التنقية للمياه...`                | Beni Suef Water Authority               | `water-treatment`         | 🔄 Sector-Pooled (9 WebP)                | **Confirmed Valid Project**. Detailed internal documentation in KB.                                     |
| **10** | `qibili-qarun-water-purification`          | Qibili Qarun Water Purification Electromechanical Works<br/>_(الأعمال الكهروميكانيكية لتنقية المياه — قبلي قارون)_                         | `INF-P-2020-002`                    | `2020/02-الأعمال الميكانيكية و الكهربائية...`    | NSPO (Contract 136-2019)                | `water-treatment`         | 🔄 Sector-Pooled (9 WebP)                | **Confirmed Valid Project**. Part of National Agriculture program.                                      |
| **11** | `multi-site-desalination-purification`     | Multi-Site Desalination & Water Purification Hubs<br/>_(محطات تحلية وتنقية المياه متعددة المواقع — مكمل 1)_                                | `INF-P-2020-003`                    | `2020/03-محطة تحلية وتنقية المياه...`            | NSPO / Armed Forces                     | `water-treatment`         | ✅ Authentic (12 WebP / 92 Raw)          | **Confirmed Valid Mega-Contract**. Covers El-Hamam, Fayoum, New Valley, Wadi Natrun.                    |
| **12** | `dairy-effluent-treatment-network`         | Livestock & Dairy Effluent Wastewater Networks<br/>_(محطات معالجة مياه صرف حلابات ومجمعات الألبان — مكمل 2)_                               | `INF-P-2020-004`                    | `2020/04-محطة معالجة مياه صرف حلابات...`         | NSPO / Dairy Directorate                | `wastewater`              | ✅ Authentic (7 WebP / 7 Raw)            | **Confirmed Valid Real Project**. Specialized industrial agro-effluent DAF.                             |
| **13** | `shubra-shahab-industrial-wastewater`      | Shubra Shahab Industrial Wastewater Treatment Facility<br/>_(محطة معالجة الصرف الصناعي بشبرا شهاب)_                                        | `INF-P-2020-005`                    | `2020/05-محطة معالجة الصرف الصناعي...`           | Agro-Industrial Authority               | `wastewater`              | 🔄 Sector-Pooled (6 WebP)                | **Confirmed Valid Project**. Flagship agro-industrial effluent plant.                                   |
| **14** | `marble-factory-desalination-plants`       | Marble Factory Industrial Desalination & Water Recovery<br/>_(محطات التحلية وإعادة تدوير المياه لمجمعات الرخام)_                           | `INF-P-2020-006`                    | `2020/06- (إنشاء محطة التحلية لمصنع الرخام...`   | National Mining & Marble                | `water-treatment`         | 🔄 Sector-Pooled (11 WebP)               | **Confirmed Valid Project**. Jafjaafa, Minya, and Ras Sedr heavy industrial RO.                         |
| **15** | `toshka-farm-potable-water-plant`          | Toshka Farm Potable Water Purification Plant (150 m³/day)<br/>_(محطة تنقية مياه الشرب بمزرعة توشكى 150 م³/يوم)_                            | `INF-P-2020-007`                    | `2020/07-(محطة تنقية مياه الشرب... عقد 115-2020` | NSPO / Armed Forces                     | `water-treatment`         | ✅ Authentic (10 WebP / 25 Raw)          | **Confirmed Valid Project**. Contract 115-2020 base water purification.                                 |
| **16** | `qibili-qarun-goat-farm-utilities`         | Qibili Qarun Livestock Facility Water & Sewer Utilities<br/>_(أعمال التغذية والصرف لمشروع إنشاء مزرعة الماعز — قبلي قارون)_                | `INF-P-2021-004`                    | `2021/04-أعمال التغذية و الصرف... عقد 48-2021`   | NSPO (Contract 48-2021)                 | `infrastructure-networks` | 🔄 Sector-Pooled (10 WebP)               | **Confirmed Valid Project**. Extensive document repository (350 files).                                 |
| **17** | `toshka-expanded-water-networks`           | Toshka Expanded Potable & Drainage Networks<br/>_(محطات وشبكات المياه والصرف بتوشكى — المقاولة المستجدة)_                                  | `INF-P-2021-006`                    | `2021/06- محطات المياه و الصرف... مقاولة النوبي` | Armed Forces / El-Noubi                 | `infrastructure-networks` | ✅ Authentic (8 WebP)                    | **Confirmed Valid Project**. Represents 2021 Toshka networks expansion.                                 |
| **18** | ~~`gas-egypt-stations-electromechanical`~~ | Gas Egypt Natural Gas Stations Electrical Works<br/>_(أعمال محطات غاز مصر — التجهيزات الكهروميكانيكية والتأريض)_                           | `INF-P-2021-007`                    | `2021/07-اعمال محطات غاز مصر`                    | Gas Egypt / EGAS                        | `industrial-mep`          | ❌ Removed                               | **Removed by User Directive**. Deleted from database, static metadata, and assets.                      |
| **19** | `shubra-shahab-technical-works`            | Shubra Shahab Scope Adjustments & Technical Upgrades<br/>_(التعديلات والتجهيزات الفنية التكميلية — شبرا شهاب)_                             | `INF-P-2022-002`                    | `2022/تعويضات شبرا شهاب`                         | Agro-Industrial Authority               | `wastewater`              | 🔄 Sector-Pooled (7 WebP)                | **Administrative Claim Record**. Only 3 source files. Merge into `shubra-shahab-industrial-wastewater`. |
| **20** | `toshka-reclamation-pumping-package`       | Toshka Agricultural Reclamation Pumping (Contract 39-2022)<br/>_(محطات مياه وصرف توشكى للاستصلاح الزراعي عقد 39-2022)_                     | `INF-P-2022-003`                    | `2022/محطات توشكا... عقد رقم 39-2022`            | Agriculture Land Reclamation            | `pumping-wells`           | 🔄 Sector-Pooled (4 WebP / 3 Raw)        | **Confirmed Valid Mega-Contract**. 529 source files. Major pumping stations.                            |
| **21** | `capital-island-infrastructure`            | Capital Island Strategic Utilities & Site Development<br/>_(البنية التحتية وتطوير الموقع — جزيرة العاصمة)_                                 | `INF-P-2023-001`                    | `2023/01-جزيرة العاصمة`                          | New Capital Authority                   | `infrastructure-networks` | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Real Project**. Strategic urban utilities in New Administrative Capital.                    |
| **22** | `toshka-pumping-basket-screens`            | Toshka Pumping Well Heavy-Duty Basket Screens<br/>_(تصنيع وتركيب مصافي السلال الهيدروليكية لبيارات توشكى)_                                 | `INF-P-2023-002`                    | `2023/02-الباسكت سكرين لبيارات توشكي`            | Toshka Pumping Directorate              | `industrial-mep`          | 🔄 Sector-Pooled (5 WebP)                | **Fabrication Subcontract Component**. 6 source files. Specialized intake screening.                    |
| **23** | `infrastructure-sand-procurement`          | Strategic Infrastructure Materials & Sand Supply Logistics<br/>_(التوريدات اللوجستية وتوريد رمال البنية التحتية والمشروعات القومية)_       | `INF-P-2024-001`                    | `2024/01-شراء رمال`                              | National Contracting Authorities        | `infrastructure-networks` | 🔄 Sector-Pooled (12 WebP)               | **Materials Procurement Record**. Pure sand purchasing (5 files). Exclude from engineering projects.    |
| **24** | `cargas-grounding-systems`                 | Cargas Natural Gas Stations Earthing Systems<br/>_(منظومات التأريض والحماية الكهرومغناطيسية لمحطات كارجاس)_                                | `INF-P-2024-002`                    | `2024/02-محطات كارجاس تأريض ارضي`                | Cargas / Ministry of Petroleum          | `industrial-mep`          | 🔄 Sector-Pooled (10 WebP)               | **Minor Electrical Subcontract**. Only 2 files. Merge into Gas Infrastructure package.                  |
| **25** | `date-palm-cold-storage-mep`               | Commercial Date Palm Refrigeration & Cold Chain MEP<br/>_(التجهيزات الكهروميكانيكية ومستودعات التبريد لتمور الواحات)_                      | `INF-P-2024-004`                    | `2024/04-تلاجة التمور`                           | Agro-Logistics Directorate              | `industrial-mep`          | 🔄 Sector-Pooled (7 WebP)                | **Confirmed Real Project**. Specialized cold-chain MEP in Oasis region.                                 |
| **26** | `manshiyat-nasser-pumping-station`         | New Manshiyat Nasser Sewage Pumping Station<br/>_(محطة رفع الصرف الصحي — منشأة ناصر الجديدة)_                                              | `INF-P-2024-006`                    | `2024/06-مشروع محطة رفع منشاه ناصر الجديدة`      | Cairo Wastewater Authority              | `pumping-wells`           | 🔄 Sector-Pooled (6 WebP)                | **Confirmed Real Project**. Urban wastewater lifting station in Cairo.                                  |
| **27** | `nuweiba-infrastructure-works`             | Nuweiba Coastal & Port District Infrastructure<br/>_(شبكات البنية التحتية وتطوير المنطقة الساحلية — نويبع)_                                | `INF-P-2024-007`                    | `2024/07- نويبع`                                 | South Sinai Development                 | `infrastructure-networks` | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Real Project**. Coastal wet utilities & trunk infrastructure.                               |
| **28** | `future-of-egypt-potato-storage-softener`  | Future of Egypt Potato Storage Water Softening Plant<br/>_(محطة معالجة وتيسير المياه لثلاجات البطاطس — مستقبل مصر)_                        | `INF-P-2024-008`                    | `2024/08- محطة معالجة مياه ثلاجات البطاطس...`    | Future of Egypt Authority               | `water-treatment`         | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Real Project**. 8 m³/hr automated ion-exchange softener station.                            |
| **29** | `al-marreikh-stadium-civil-mep`            | Al-Marreikh Stadium Rehabilitation & Civil-MEP Upgrades<br/>_(رفع كفاءة وتطوير الأعمال المدنية والكهروميكانيكية — ملعب المريخ البورسعيدي)_ | `INF-P-2024-009`                    | `2024/09-رفع كفاءه ملعب المريخ البورسعيدي`       | Ministry of Youth & Sports              | `civil-buildings`         | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Real Project**. Civic sports stadium facility rehabilitation in Port Said.                  |
| **30** | `qabs-min-nour-mosque`                     | Qabs Min Nour Grand Mosque & Community Complex<br/>_(جامع ومجمع قبس من نور — العاصمة الإدارية الجديدة)_                                    | `INF-P-2025-001`                    | `2025/1- مسجد قبس من نور`                        | Armed Forces / Sovereign Entity         | `civil-buildings`         | ✅ Authentic (3 WebP / 3 Raw)            | **Confirmed Civil Landmark**. Massive record (3,101 files) in New Capital.                              |
| **31** | `rafah-bedouin-housing`                    | Rafah Bedouin Residential Development Infrastructure<br/>_(البنية التحتية والإنشاءات للتجمعات البدوية — رفح)_                              | `INF-P-2025-002`                    | `2025/2- البيوت البدوية رفح`                     | North Sinai Reconstruction              | `civil-buildings`         | ✅ Authentic (12 WebP / 269 Raw)         | **Confirmed Megaproject**. 2,125 files and 269 authentic site photos.                                   |
| **32** | `sisi-city-wastewater`                     | Al-Sisi City Gravity Sewer & Storm Drainage Network<br/>_(شبكات الصرف الصحي وتصريف الأمطار — مدينة السيسي)_                                | `INF-P-2025-003`                    | `2025/3- مدينة السيسى عقد الصرف`                 | North Sinai Urban Authority             | `wastewater`              | ✅ Authentic (11 WebP / 341 Raw)         | **Confirmed Flagship Contract 3**. 1,524 files and 341 authentic site photos.                           |
| **33** | `sisi-city-water-supply-network`           | Al-Sisi City Potable Water Transmission Network<br/>_(شبكة مياه الشرب والخطوط الناقلة — مدينة السيسي)_                                     | `INF-P-2025-004`                    | `2025/4-مدينة السيسى عقد المياه`                 | North Sinai Urban Authority             | `infrastructure-networks` | 🔄 Sector-Pooled (9 WebP)                | **Confirmed Flagship Contract 4**. Distinct water transmission contract (376 files).                    |
| **34** | `north-sinai-dc-infrastructure`            | North Sinai District Centre Integrated Infrastructure<br/>_(البنية التحتية المتكاملة لمشروعات شمال سيناء DC)_                              | `INF-P-2025-005`                    | `2025/DC مشاريع شمال سيناء`                      | Armed Forces Engineering Auth.          | `infrastructure-networks` | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Massive Program**. 15,898 files in SharePoint. Regional hub.                                |
| **35** | `al-azhar-institute-minya`                 | Al-Azhar Model Institute Educational Complex — Minya<br/>_(المجمع التعليمي للمعهد الأزهري النموذجي — المنيا)_                              | `INF-P-2026-001`                    | `2026/01- المعهد الازهري المنيا-قبس من نور`      | Al-Azhar / Sovereign Endowments         | `civil-buildings`         | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Educational Landmark**. Turnkey civil/MEP complex.                                          |
| **36** | `abu-minqar-agricultural-farm-utilities`   | Abu Minqar Agricultural Reclamation Infrastructure<br/>_(شبكات الري والبنية التحتية الزراعية — مزرعة أبو منقار)_                           | `INF-P-2026-002`                    | `2026/02-مزرعة ابو منقار`                        | Land Reclamation Authority              | `infrastructure-networks` | 🔄 Sector-Pooled (6 WebP)                | **Confirmed Real Project**. Farafra Oasis / New Valley agricultural networks.                           |
| **37** | `salam-city-water-pipeline`                | New Salam City Strategic Water Transmission Line<br/>_(خط نقل المياه الاستراتيجي لمدينة السلام من رافع الشلاق)_                            | `INF-P-2026-003`                    | `2026/03- مشروع خط تغذية مدينة السلام...`        | Sinai Water & Sanitation Auth.          | `infrastructure-networks` | 🔄 Sector-Pooled (11 WebP)               | **Confirmed Strategic Pipeline**. Trunk transmission from Shalla pumping.                               |
| **38** | `hayat-karima-health-unit`                 | Hayat Karima Primary Healthcare Clinic Unit<br/>_(إنشاء وتجهيز الوحدة الصحية — المبادرة الرئاسية حياة كريمة)_                              | `INF-P-2026-004`                    | `2026/04- الوحدة الصحية - حياة كريمة`            | Ministry of Health / Presidential Init. | `civil-buildings`         | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Civic Health Project**. Standard rural healthcare facility.                                 |
| **39** | `bianchi-resort-infrastructure-utilities`  | Bianchi Ilios Luxury Resort Wet Utilities & Infrastructure<br/>_(شبكات المرافق والبنية التحتية لمنتجع بيانكي الساحلي)_                     | `INF-P-2026-005`                    | `2026/05- Bianchi`                               | Developer X / Commercial Real Estate    | `infrastructure-networks` | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Hospitality Project**. 473 files. Sidi Abdel Rahman resort utilities.                       |
| **40** | `rural-egypt-wells-minya`                  | Egyptian Countryside Deep Artesian Well Pumping — Minya<br/>_(محطات طلمبات الآبار الارتوازية العميقة لشركة الريف المصري — المنيا)_         | `INF-P-2026-006`                    | `2026/06-مشروع ابار الريف المصرى - المنيا`       | Egyptian Countryside Dev. (1.5M Feddan) | `pumping-wells`           | 🔄 Sector-Pooled (6 WebP)                | **Confirmed Deep Wells Project**. Heavy deep-well turbine pumps & manifold lines.                       |
| **41** | `salam-city-cattle-farm-networks`          | Agricultural Dairy Complex Utilities Infrastructure<br/>_(شبكات البنية التحتية لمجمع الإنتاج الحيواني — مدينة السلام)_                     | `INF-P-2026-007`                    | `2026/07- مشروع شبكات مزرعة الابقار...`          | Sovereign Livestock Directorate         | `infrastructure-networks` | ✅ Authentic (11 WebP / 29 Raw)          | **Confirmed Valid Project**. 161 files and 29 authentic site photos.                                    |
| **42** | `palm-hills-infrastructure-utilities`      | Palm Hills Developments Gated Community Infrastructure<br/>_(شبكات البنية التحتية ومرافق المجتمعات العمرانية — بالم هيلز)_                 | `INF-P-2026-008`                    | `2026/08- بالم هيلز`                             | Palm Hills Developments                 | `infrastructure-networks` | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Commercial Project**. 413 files. High-end gated community utilities.                        |
| **43** | `abu-zaabal-landfill-environmental-works`  | Abu Zaabal Sanitary Landfill Environmental Lining<br/>_(الأعمال المدنية والتبطين البيئي لمقلب أبو زعبل الصحي)_                             | `INF-P-2026-009`                    | `2026/11- مقلب ابو زعبل`                         | Ministry of Environment / Cairo Gov.    | `wastewater`              | 🔄 Sector-Pooled (12 WebP)               | **Confirmed Environmental Project**. HDPE geomembrane lining and leachate control.                      |

---

## 3. Canonical Project Inventory

The Canonical Inventory represents the **evidence-based reconstruction of what Infeworks' real contracting catalog should be**. Projects are grouped logically under the **6 Core Engineering Disciplines**.

### Sector 1: Water & Treatment (`water-treatment`)

#### 1.1 Sadat City 1,500 m³/day Food-Grade RO Desalination Plant

- **Canonical Name (EN / AR):** Sadat City Industrial RO Desalination Plant (1,500 m³/day) / محطة تحلية مياه الآبار والعمليات الصناعية بالسادات (1500 م³/يوم)
- **Current Portfolio Slug:** `sadat-city-ro`
- **KB ID / Year:** `INF-P-2021-003` / 2021
- **Source Folder:** `01- Master/2021/03-(محطه التحليه بالسادات بطاقة 1500م3 (بمصنع المكرونه)عقد 120-2020 مكمل( 1`
- **Client / Consultant:** Macaroni & Biscuit Factories Complex — NSPO / MAST Group
- **Scope & Capacity:** Turnkey 1,500 m³/day RO train, food-grade process loops, automated CIP, 24/7 O&M.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 108 source files, 16 authentic photos in archive.
- **Image Asset State:** ✅ Complete (12 authentic WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship. Correct Arabic title from "مياه بحر" to "مياه آبار / مياه صناعية".

#### 1.2 Multi-Site Decentralized RO Desalination & Potable Water Hubs

- **Canonical Name (EN / AR):** Multi-Site Modular RO Desalination & Purification Stations / محطات تحلية وتنقية المياه متعددة المواقع — العقد المكمل 1
- **Current Portfolio Slug:** `multi-site-desalination-purification`
- **KB ID / Year:** `INF-P-2020-003` / 2020
- **Source Folder:** `01- Master/2020/03-محطة تحلية وتنقية المياه ب(الحمام-قبلي قارون-الوادي الجديد-وادي النطرون) عقد 136-2019مكمل 1`
- **Client / Consultant:** National Service Projects Organization (NSPO) / Armed Forces Engineering Authority
- **Scope & Capacity:** Modular brackish RO skids, sand/carbon pre-filtration, and automated backwash installed across El-Hamam, Fayoum, New Valley, and Wadi Natrun.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 422 source files, 92 authentic photos across 4 regional sites.
- **Image Asset State:** ✅ Complete (12 authentic WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship megaproject.

#### 1.3 Toshka Farm Potable Water Purification Plant (150 m³/day)

- **Canonical Name (EN / AR):** Toshka Farm Potable Water Treatment Station (150 m³/day) / محطة تنقية مياه الشرب بمزرعة توشكى (سعة 150 م³/يوم — عقد 115-2020)
- **Current Portfolio Slug:** `toshka-farm-potable-water-plant`
- **KB ID / Year:** `INF-P-2020-007` / 2020
- **Source Folder:** `01- Master/2020/07-(محطة تنقية مياه الشرب بمزرعة توشكي سعة 150م3-يوم (عقد 115-2020`
- **Client / Consultant:** National Service Projects Organization (NSPO)
- **Scope & Capacity:** Compact clarification skids, multi-media pressure filters, UV disinfection, and high-pressure potable distribution pumps.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 79 source files, 25 authentic site photos.
- **Image Asset State:** ✅ Complete (10 authentic WebP photos).
- **Recommended Action:** Retain as Primary Toshka Water Treatment Project.

#### 1.4 Marble Factory Heavy Industrial RO & Water Recovery Complexes

- **Canonical Name (EN / AR):** Marble & Mining Complexes Process Water Desalination & Recycling / محطات تحلية ومعالجة وتدوير مياه مجمعات صناعات الرخام
- **Current Portfolio Slug:** `marble-factory-desalination-plants`
- **KB ID / Year:** `INF-P-2020-006` / 2020
- **Source Folder:** `01- Master/2020/06- (إنشاء محطة التحلية لمصنع الرخام (الجفجافة-المنيا-رأس سدر`
- **Client / Consultant:** National Mining & Marble Industries Complex (Jafjaafa, Minya, Ras Sedr) / Armed Forces
- **Scope & Capacity:** Heavy industrial RO trains, hydrocyclone sediment separators, and closed-loop process water cooling and recycling loops.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 198 source files.
- **Image Asset State:** 🔄 Sector-Pooled (11 WebP photos).
- **Recommended Action:** Retain as key industrial water reference. Obtain dedicated site photos if possible.

#### 1.5 Qibili Qarun Water Purification Electromechanical Hub

- **Canonical Name (EN / AR):** Qibili Qarun Potable & Agricultural Water Purification Works / الأعمال الكهروميكانيكية لتنقية المياه بقبلي قارون (عقد 136-2019)
- **Current Portfolio Slug:** `qibili-qarun-water-purification`
- **KB ID / Year:** `INF-P-2020-002` / 2020
- **Source Folder:** `01- Master/2020/02-الأعمال الميكانيكية و الكهربائية لتنقية المياه بقبلي قارون عقد 136-2019`
- **Client / Consultant:** National Service Projects Organization (Contract 136-2019) / Armed Forces
- **Scope & Capacity:** Mechanical pump manifolds, chemical dosing, multi-media filtration skids, and electrical control panels.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 71 source files.
- **Image Asset State:** 🔄 Sector-Pooled (9 WebP photos).
- **Recommended Action:** Retain as core agricultural water purification project.

#### 1.6 Beni Suef Potable Water Purification & Treatment Works

- **Canonical Name (EN / AR):** Beni Suef Regional Potable Water Treatment Station / محطات تنقية مياه الشرب بمحافظة بني سويف
- **Current Portfolio Slug:** `beni-suef-water-wastewater` (Water component)
- **KB ID / Year:** `INF-P-2020-001` / 2020
- **Source Folder:** `01- Master/2020/01-محطات التنقية للمياه و معالجة الصرف الصحي ببني سويف`
- **Client / Consultant:** Beni Suef Potable Water & Sanitation Authority
- **Scope & Capacity:** Municipal water filtration trains, flocculation clarifiers, and booster pumping systems.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 84 source files with full internal documentation.
- **Image Asset State:** 🔄 Sector-Pooled (9 WebP photos).
- **Recommended Action:** Retain as primary municipal utility project.

#### 1.7 Future of Egypt Potato Cold Storage Water Softening Station

- **Canonical Name (EN / AR):** Future of Egypt Agro-Industrial Water Softening & Treatment Plant / محطة معالجة وتيسير المياه لثلاجات البطاطس — مشروع مستقبل مصر
- **Current Portfolio Slug:** `future-of-egypt-potato-storage-softener`
- **KB ID / Year:** `INF-P-2024-008` / 2024
- **Source Folder:** `01- Master/2024/08- محطة معالجة مياه ثلاجات البطاطس مستقبل مصر`
- **Client / Consultant:** Future of Egypt Sustainable Development Authority / Agro-Industrial Consultants
- **Scope & Capacity:** 8 m³/hr automated ion-exchange softening station, brine regeneration, and cooling tower feed.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 3 source files with verified technical parameters.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as specialized softening/water treatment case study.

---

### Sector 2: Wastewater Infrastructure (`wastewater`)

#### 2.1 Shubra Shahab Industrial Agro-Effluent Treatment Facility

- **Canonical Name (EN / AR):** Shubra Shahab Industrial Agro-Effluent Treatment Plant / محطة معالجة الصرف الصناعي والزراعي بشبرا شهاب
- **Current Portfolio Slug:** `shubra-shahab-industrial-wastewater` (incorporates `shubra-shahab-technical-works`)
- **KB ID / Year:** `INF-P-2020-005` (+ `INF-P-2022-002`) / 2020–2022
- **Source Folder:** `01- Master/2020/05-محطة معالجة الصرف الصناعي بشبرا شهاب` (198 files) & `2022/تعويضات شبرا شهاب` (3 files)
- **Client / Consultant:** Agro-Industrial Development Authority / Qalyubia Governorate
- **Scope & Capacity:** Civil equalisation basins, Dissolved Air Flotation (DAF), chemical dosing, biological aeration, sludge dewatering, and technical variation management.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 201 total files.
- **Image Asset State:** 🔄 Sector-Pooled (6 WebP photos).
- **Recommended Action:** Consolidate `shubra-shahab-technical-works` into this record.

#### 2.2 Food City Industrial Effluent Treatment Facility (50 m³/day)

- **Canonical Name (EN / AR):** Food City High-Load Industrial Effluent Treatment Plant (50 m³/day) / محطة معالجة الصرف الصناعي بالمدينة الغذائية بالسادات (50 م³/يوم)
- **Current Portfolio Slug:** `food-city-treatment`
- **KB ID / Year:** `INF-P-2021-002` / 2021
- **Source Folder:** `01- Master/2021/02- محطه المعالجه بالمدينة الغذائية بالسادات بطاقة 50م3 (مصنع البسكوت) عقد 120-2020`
- **Client / Consultant:** Food City Industrial Complex (Biscuit Factory) / MAST Engineering Consultants
- **Scope & Capacity:** 50 m³/day high-load organic effluent treatment, physico-chemical separation, Skid fabrication, and environmental compliance sign-off.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 82 source files.
- **Image Asset State:** ❌ Mismatched (Uses Dairy Effluent photos).
- **Recommended Action:** Retain project. Re-assign correct imagery (or assign neutral wastewater pool instead of borrowing dairy effluent photos).

#### 2.3 Livestock & Dairy Effluent Multi-Site Treatment Networks

- **Canonical Name (EN / AR):** Dairy & Livestock Effluent Treatment Networks (Contract 136 Supplemental 2) / محطات وشبكات معالجة مياه صرف مجمعات الألبان والحلابات — العقد المكمل 2
- **Current Portfolio Slug:** `dairy-effluent-treatment-network`
- **KB ID / Year:** `INF-P-2020-004` / 2020
- **Source Folder:** `01- Master/2020/04-محطة معالجة مياه صرف حلابات ب(الحمام-وادي النطرون-السادات-يشع) عقد 136-2019مكمل 2`
- **Client / Consultant:** National Service Projects Organization (NSPO) / Armed Forces
- **Scope & Capacity:** Industrial dairy wastewater treatment plants, grease/fat separators, and effluent conveyance networks across El-Hamam, Wadi Natrun, Sadat City, and Yesha.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 361 source files, 7 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (7 authentic WebP photos).
- **Recommended Action:** Retain as core industrial wastewater project.

#### 2.4 Al-Sisi City Gravity Sewer & Storm Drainage Network (Contract 3)

- **Canonical Name (EN / AR):** Al-Sisi City Gravity Sewer & Stormwater Drainage Trunk Networks / شبكات الصرف الصحي وتصريف مياه الأمطار بمدينة السيسي (عقد الصرف)
- **Current Portfolio Slug:** `sisi-city-wastewater`
- **KB ID / Year:** `INF-P-2025-003` / 2025
- **Source Folder:** `01- Master/2025/3- مدينة السيسى عقد الصرف`
- **Client / Consultant:** Al-Organi Group
- **Scope & Capacity:** Turnkey supply and laying of UPVC SN8 Ø160–400mm gravity sewer trunks, precast concrete manholes, stormwater catch basins, and hydrostatic pressure testing.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 1,524 source files, 341 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (11 authentic WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship megaproject.

#### 2.5 Abu Zaabal Sanitary Landfill Environmental Lining & Civil Works

- **Canonical Name (EN / AR):** Abu Zaabal Landfill Environmental Containment & Civil Engineering / الأعمال المدنية والتبطين البيئي وعزل مقلب أبو زعبل الصحي
- **Current Portfolio Slug:** `abu-zaabal-landfill-environmental-works`
- **KB ID / Year:** `INF-P-2026-009` / 2026
- **Source Folder:** `01- Master/2026/11- مقلب ابو زعبل`
- **Client / Consultant:** Ministry of Environment / Cairo Governorate Sanitary Solid Waste Authority
- **Scope & Capacity:** Heavy earthmoving, clay leveling, HDPE 2.0mm geomembrane impermeable lining, geotextile protection, and leachate collection sumps.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 15 source files with verified technical specifications.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as key environmental infrastructure reference.

---

### Sector 3: Pumping Stations & Deep Wells (`pumping-wells`)

#### 3.1 Toshka Agricultural Reclamation Pumping Stations (Contract 39-2022)

- **Canonical Name (EN / AR):** Toshka Mega Agricultural Reclamation Pumping Complexes (Contract 39-2022) / محطات الرفع والضخ لاستصلاح أراضي توشكى الزراعية (عقد 39-2022)
- **Current Portfolio Slug:** `toshka-reclamation-pumping-package` (and consolidates `toshka-pumping-stations` umbrella + `toshka-pumping-basket-screens`)
- **KB ID / Year:** `INF-P-2022-003` (+ `INF-P-2023-002`) / 2022–2023
- **Source Folder:** `01- Master/2022/محطات توشكا محطتي صرف و مياه (الاستصلاح الزراعي) عقد رقم 39-2022` (529 files) & `2023/02-الباسكت سكرين...` (6 files)
- **Client / Consultant:** National Land Reclamation Authority / Armed Forces Engineering Authority
- **Scope & Capacity:** Heavy agricultural lift pumping stations, vertical turbine pumps, intake manifolds, heavy-duty hydraulic basket screens, MCC automation, and discharge canals.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 535 total files.
- **Image Asset State:** 🔄 Sector-Pooled (4 WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship pumping megaproject. Consolidate Toshka umbrella and basket screen component.

#### 3.2 Awlad El-Sheikh Pumping & Potable Water Lifting Station

- **Canonical Name (EN / AR):** Awlad El-Sheikh Potable Water Booster & Lifting Station / محطة رفع وضخ مياه الشرب بقرية أولاد الشيخ
- **Current Portfolio Slug:** `awlad-el-sheikh-pumping`
- **KB ID / Year:** `INF-P-2022-001` / 2022
- **Source Folder:** `01- Master/2022/01- محطه رفع بقريه اولاد الشيخ`
- **Client / Consultant:** Upper Egypt Potable Water & Sanitation Authority / Armed Forces
- **Scope & Capacity:** Potable water intake pumping house, split-case centrifugal booster pumps, surge vessels, and automated chlorination feed.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 300 source files, 8 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (2 authentic WebP photos).
- **Recommended Action:** Retain. Strengthen gallery with remaining raw photos from archive.

#### 3.3 New Manshiyat Nasser Municipal Wastewater Pumping Station

- **Canonical Name (EN / AR):** New Manshiyat Nasser Sewage Lifting & Pumping Hub / محطة رفع الصرف الصحي لمنشأة ناصر الجديدة
- **Current Portfolio Slug:** `manshiyat-nasser-pumping-station`
- **KB ID / Year:** `INF-P-2024-006` / 2024
- **Source Folder:** `01- Master/2024/06-مشروع محطة رفع منشاه ناصر الجديدة`
- **Client / Consultant:** Cairo Wastewater Authority / Infrastructure Supervision Board
- **Scope & Capacity:** Deep wet-well pump chamber, submersible chopper pumps, screening baskets, odor control units, and dual rising mains.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 7 source files.
- **Image Asset State:** 🔄 Sector-Pooled (6 WebP photos).
- **Recommended Action:** Retain as primary municipal pumping reference.

#### 3.4 Egyptian Countryside Deep Artesian Well Pumping Stations — Minya

- **Canonical Name (EN / AR):** Egyptian Countryside 1.5M Feddan Deep Artesian Wells & Pumping Units / محطات طلمبات الآبار الارتوازية العميقة لشركة تنمية الريف المصري — المنيا
- **Current Portfolio Slug:** `rural-egypt-wells-minya`
- **KB ID / Year:** `INF-P-2026-006` / 2026
- **Source Folder:** `01- Master/2026/06-مشروع ابار الريف المصرى - المنيا`
- **Client / Consultant:** Egyptian Countryside Development Co. (1.5 Million Feddan National Reclamation Program)
- **Scope & Capacity:** Deep artesian groundwater well pump equipment, high-head multistage submersible pumps, solar/diesel generator hybrid power, and discharge headers.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 38 source files.
- **Image Asset State:** 🔄 Sector-Pooled (6 WebP photos).
- **Recommended Action:** Retain as strategic deep-wells engineering reference.

---

### Sector 4: Infrastructure & Utilities (`infrastructure-networks`)

#### 4.1 Arish International Airport Water Supply & Transmission Network

- **Canonical Name (EN / AR):** Arish International Airport Strategic Water Transmission Pipeline / مشروع خط تغذية وشبكات مياه مطار العريش الدولي (مجموعة العرجاني)
- **Current Portfolio Slug:** `arish-water-supply`
- **KB ID / Year:** `INF-P-2024-005` / 2024
- **Source Folder:** `01- Master/2024/05-مشروع تغذيه مطار العريش العرجاني جروب`
- **Client / Consultant:** Al-Organi Group
- **Scope & Capacity:** Strategic ductile iron and HDPE trunk water pipeline, valve chambers, booster pump skids, and ground storage reservoirs supplying Arish International Airport.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 947 source files, 206 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (12 authentic WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship. Adjust title to explicitly name the Airport project.

#### 4.2 Al-Sisi City Potable Water Transmission & Distribution Network (Contract 4)

- **Canonical Name (EN / AR):** Al-Sisi City Potable Water Transmission Mains & Distribution System / شبكة توزيع وخطوط نقل مياه الشرب بمدينة السيسي (عقد المياه)
- **Current Portfolio Slug:** `sisi-city-water-supply-network`
- **KB ID / Year:** `INF-P-2025-004` / 2025
- **Source Folder:** `01- Master/2025/4-مدينة السيسى عقد المياه`
- **Client / Consultant:** Al-Organi Group
- **Scope & Capacity:** High-pressure potable water feeder pipelines, sectional isolation valves, air release/washout chambers, and district metering units.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 376 source files.
- **Image Asset State:** 🔄 Sector-Pooled (9 WebP photos).
- **Recommended Action:** Retain as companion flagship to Sisi City Wastewater.

#### 4.3 North Sinai District Centre (DC) Integrated Strategic Infrastructure

- **Canonical Name (EN / AR):** North Sinai District Centre Regional Infrastructure & Utilities Hub / شبكات ومرافق البنية التحتية المتكاملة لمشروعات شمال سيناء (DC)
- **Current Portfolio Slug:** `north-sinai-dc-infrastructure`
- **KB ID / Year:** `INF-P-2025-005` / 2025
- **Source Folder:** `01- Master/2025/DC مشاريع شمال سيناء`
- **Client / Consultant:** Armed Forces Engineering Authority / North Sinai Reconstruction Authority
- **Scope & Capacity:** Massive regional multi-utility program encompassing high-voltage power conduits, potable trunks, sewage interceptors, and stormwater channels.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 15,898 source files (largest folder in entire archive).
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as sovereign institutional scale reference.

#### 4.4 Toshka Expanded Potable & Drainage Infrastructure Networks

- **Canonical Name (EN / AR):** Toshka Regional Potable Water & Wastewater Infrastructure Networks / شبكات ومحطات البنية التحتية لمياه الشرب والصرف بتوشكى (المقاولة المستجدة والمكمل)
- **Current Portfolio Slug:** `toshka-expanded-water-networks` (incorporates unmapped `INF-P-2021-005`)
- **KB ID / Year:** `INF-P-2021-006` (+ `INF-P-2021-005`) / 2021
- **Source Folder:** `01- Master/2021/06- محطات المياه و الصرف ب توشكي (مستجدة)...` (96 files) & `2021/05-محطات الصرف والمياه ف توشكى عقد(115-2020) مكمل` (243 files, 23 photos)
- **Client / Consultant:** Armed Forces Engineering Department / El-Noubi Contracting
- **Scope & Capacity:** Regional water mains, sewer trunks, pumping stations, and pressure pipelines connecting agricultural zones and staff communities.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 339 total files, 23 authentic photos.
- **Image Asset State:** ✅ Complete (8 authentic WebP photos).
- **Recommended Action:** Retain. Formally absorb missing `INF-P-2021-005` metadata into this record.

#### 4.5 New Salam City Strategic Water Transmission Pipeline from Shalla

- **Canonical Name (EN / AR):** New Salam City Strategic Water Transmission Pipeline from Shalla Booster / خط نقل المياه الاستراتيجي لمدينة السلام من رافع الشلاّء
- **Current Portfolio Slug:** `salam-city-water-pipeline`
- **KB ID / Year:** `INF-P-2026-003` / 2026
- **Source Folder:** `01- Master/2026/03- مشروع خط تغذية مدينة السلام من رافع الشلاء`
- **Client / Consultant:** North Sinai Water & Wastewater Authority / Armed Forces
- **Scope & Capacity:** Large-diameter transmission pipeline, thrust blocks, pressure reduction stations, and pipeline disinfection.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 55 source files.
- **Image Asset State:** 🔄 Sector-Pooled (11 WebP photos).
- **Recommended Action:** Retain as major water transmission case study.

#### 4.6 Salam City Livestock & Cattle Farm Infrastructure Utilities

- **Canonical Name (EN / AR):** Salam City Agro-Industrial Livestock Complex Infrastructure Networks / شبكات المرافق والبنية التحتية لمجمع الإنتاج الحيواني ومزرعة الأبقار بمدينة السلام
- **Current Portfolio Slug:** `salam-city-cattle-farm-networks`
- **KB ID / Year:** `INF-P-2026-007` / 2026
- **Source Folder:** `01- Master/2026/07- مشروع شبكات مزرعة الابقار - مدينة السلام`
- **Client / Consultant:** National Service Projects Organization (NSPO) / Livestock Directorate
- **Scope & Capacity:** Potable feed lines, farm drainage, animal waste washing networks, fire protection, and underground electrical distribution.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 161 source files, 29 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (11 authentic WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship agro-infrastructure project.

#### 4.7 Qibili Qarun Goat Farm Water & Sewage Utilities Network

- **Canonical Name (EN / AR):** Qibili Qarun Livestock Farm Utilities & Wet Infrastructure (Contract 48-2021) / أعمال التغذية والصرف لمشروع إنشاء مزرعة الماعز بقبلي قارون (عقد 48-2021)
- **Current Portfolio Slug:** `qibili-qarun-goat-farm-utilities`
- **KB ID / Year:** `INF-P-2021-004` / 2021
- **Source Folder:** `01- Master/2021/04-أعمال التغذية و الصرف لمشروع انشاء مزرعة الماعز بقبلي قارون(عقد رقم 48-2021)`
- **Client / Consultant:** National Service Projects Organization (Contract 48-2021) / Armed Forces
- **Scope & Capacity:** Gravity wastewater pipes, farm water distribution, storage tanks, and pump manifolds.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 350 source files.
- **Image Asset State:** 🔄 Sector-Pooled (10 WebP photos).
- **Recommended Action:** Retain as comprehensive agro-utility reference.

#### 4.8 Capital Island Utilities & Site Development

- **Canonical Name (EN / AR):** Capital Island Strategic Infrastructure & Site Development / أعمال البنية التحتية والمرافق العامة وتطوير الموقع — جزيرة العاصمة
- **Current Portfolio Slug:** `capital-island-infrastructure`
- **KB ID / Year:** `INF-P-2023-001` / 2023
- **Source Folder:** `01- Master/2023/01-جزيرة العاصمة`
- **Client / Consultant:** New Administrative Capital Development Authority / Armed Forces
- **Scope & Capacity:** District wet utilities, underground electrical ducts, storm runoff networks, and civil road crossings.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 8 source files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as prestigious New Capital infrastructure reference.

#### 4.9 Nuweiba Coastal & Port District Infrastructure Works

- **Canonical Name (EN / AR):** Nuweiba Coastal Strip & Port District Infrastructure / شبكات المرافق وتطوير البنية التحتية للمنطقة الساحلية بنويبع
- **Current Portfolio Slug:** `nuweiba-infrastructure-works`
- **KB ID / Year:** `INF-P-2024-007` / 2024
- **Source Folder:** `01- Master/2024/07- نويبع`
- **Client / Consultant:** South Sinai Reconstruction & Development Directorate
- **Scope & Capacity:** Coastal water supply mains, high-salinity resistant drainage lines, and valve chamber installations.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 32 source files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as coastal infrastructure reference.

#### 4.10 Abu Minqar Agricultural Reclamation Infrastructure

- **Canonical Name (EN / AR):** Abu Minqar Agricultural Reclamation Water & Irrigation Infrastructure / شبكات الري وتوزيع المياه والبنية التحتية الزراعية — مزرعة أبو منقار
- **Current Portfolio Slug:** `abu-minqar-agricultural-farm-utilities`
- **KB ID / Year:** `INF-P-2026-002` / 2026
- **Source Folder:** `01- Master/2026/02-مزرعة ابو منقار`
- **Client / Consultant:** National Land Reclamation Authority (Farafra / New Valley)
- **Scope & Capacity:** Irrigation transmission pipelines, booster manifolds, and agricultural farm utilities.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 29 source files.
- **Image Asset State:** 🔄 Sector-Pooled (6 WebP photos).
- **Recommended Action:** Retain as New Valley reclamation reference.

#### 4.11 Bianchi Ilios Luxury Resort Infrastructure & Wet Utilities

- **Canonical Name (EN / AR):** Bianchi Ilios Luxury Resort Wet Utilities & Infrastructure Networks / شبكات المرافق والبنية التحتية لمنتجع بيانكي الساحلي (سيدي عبد الرحمن)
- **Current Portfolio Slug:** `bianchi-resort-infrastructure-utilities`
- **KB ID / Year:** `INF-P-2026-005` / 2026
- **Source Folder:** `01- Master/2026/05- Bianchi`
- **Client / Consultant:** Developer X / Coastal Real Estate Directorate
- **Scope & Capacity:** Potable water networks, sewage gravity mains, irrigation distribution loops, and fire hydrant lines in North Coast resort.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 473 source files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as premier commercial hospitality reference.

#### 4.12 Palm Hills Developments Gated Community Infrastructure

- **Canonical Name (EN / AR):** Palm Hills Gated Communities Civil Utilities & Wet Infrastructure / شبكات البنية التحتية والمرافق لمشروعات بالم هيلز العمرانية
- **Current Portfolio Slug:** `palm-hills-infrastructure-utilities`
- **KB ID / Year:** `INF-P-2026-008` / 2026
- **Source Folder:** `01- Master/2026/08- بالم هيلز`
- **Client / Consultant:** Palm Hills Developments
- **Scope & Capacity:** Potable, irrigation, and wastewater pipe networks, telecommunication ducts, and manhole installations.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 413 source files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as prime private developer reference.

---

### Sector 5: Industrial Utilities & Electromechanical (`industrial-mep`)

#### 5.1 Ameriya Industrial Logistics Cold Storage Complex

- **Canonical Name (EN / AR):** Ameriya Logistics Complex Cold Storage & Refrigeration Facilities / إنشاء وتجهيز مجمع ثلاجات التبريد والتخزين اللوجستي بقطاع العامرية
- **Current Portfolio Slug:** `ameriya-cold-storage`
- **KB ID / Year:** `INF-P-2021-001` / 2021
- **Source Folder:** `01- Master/2021/01- انشاء ثلاجات بقطاع العامريه`
- **Client / Consultant:** National Service Projects Organization (NSPO) Logistics Sector
- **Scope & Capacity:** Large-scale commercial cold storage halls, ammonia/Freon refrigeration loops, insulated sandwich panels, civil foundation slabs, and fire suppression.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 119 source files, extensive BOQ and QS data.
- **Image Asset State:** ✅ Complete (6 authentic JPG photos).
- **Recommended Action:** Retain as Tier-1 Flagship industrial MEP project.

#### 5.2 Commercial Date Palm Cold Storage & Processing Facility

- **Canonical Name (EN / AR):** Date Palm Agro-Industrial Cold Storage & MEP Facility / التجهيزات الكهروميكانيكية ومستودعات حفظ التمور
- **Current Portfolio Slug:** `date-palm-cold-storage-mep`
- **KB ID / Year:** `INF-P-2024-004` / 2024
- **Source Folder:** `01- Master/2024/04-تلاجة التمور`
- **Client / Consultant:** Agro-Industrial Logistics Directorate (New Valley / Oasis)
- **Scope & Capacity:** Specialized controlled-atmosphere cooling units, thermal insulation, and MEP fit-out for date palm packaging.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 3 source files.
- **Image Asset State:** 🔄 Sector-Pooled (7 WebP photos).
- **Recommended Action:** Retain as industrial food-chain MEP reference.

#### 5.3 Gas Egypt & Natural Gas Stations Electromechanical Infrastructure

- **Canonical Name (EN / AR):** Gas Egypt & CNG Fuel Stations Electromechanical & Earthing Systems / الأعمال الكهروميكانيكية ومنظومات التأريض لمحطات غاز مصر وكارجاس
- **Current Portfolio Slug:** `gas-egypt-stations-electromechanical` (incorporates `cargas-grounding-systems`)
- **KB ID / Year:** `INF-P-2021-007` (+ `INF-P-2024-002`) / 2021–2024
- **Source Folder:** `01- Master/2021/07-اعمال محطات غاز مصر` (35 files) & `2024/02-محطات كارجاس...` (2 files)
- **Client / Consultant:** Gas Egypt / Cargas / Egyptian Natural Gas Holding Co. (EGAS)
- **Scope & Capacity:** Low-resistance grounding grids, lightning protection masts, explosion-proof ATEX electrical conduit, and motor control panels for CNG filling stations.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 37 total files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Consolidate `cargas-grounding-systems` into this record.

---

### Sector 6: Civic & Turnkey Buildings (`civil-buildings`)

#### 6.1 Qabs Min Nour Grand Mosque & Islamic Cultural Landmark

- **Canonical Name (EN / AR):** Qabs Min Nour Grand Mosque & Cultural Complex / جامع ومجمع قبس من نور الحضاري — العاصمة الإدارية الجديدة
- **Current Portfolio Slug:** `qabs-min-nour-mosque`
- **KB ID / Year:** `INF-P-2025-001` / 2025
- **Source Folder:** `01- Master/2025/1- مسجد قبس من نور`
- **Client / Consultant:** Armed Forces Engineering Authority / Sovereign Landmark Directorate
- **Scope & Capacity:** Turnkey construction of monumental main dome, twin minarets, marble cladding, HVAC central chillers, Islamic decorative plaster, and sound/lighting systems.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 3,101 source files, 3 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (3 authentic WebP photos).
- **Recommended Action:** Retain as flagship civic landmark project.

#### 6.2 Rafah Bedouin Sustainable Housing & Integrated Community

- **Canonical Name (EN / AR):** Rafah Bedouin Residential Development & Civic Infrastructure / إنشاء التجمعات السكنية والبدوية المتكاملة بمدينة رفح الجديدة
- **Current Portfolio Slug:** `rafah-bedouin-housing`
- **KB ID / Year:** `INF-P-2025-002` / 2025
- **Source Folder:** `01- Master/2025/2- البيوت البدوية رفح`
- **Client / Consultant:** North Sinai Reconstruction Authority / Armed Forces Engineering Authority
- **Scope & Capacity:** Reinforced concrete residential units, external facades, access roads, internal plumbing, power distribution, and communal courtyards.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 2,125 source files, 269 authentic site photos in archive.
- **Image Asset State:** ✅ Complete (12 authentic WebP photos).
- **Recommended Action:** Retain as Tier-1 Flagship civil/housing development.

#### 6.3 Al-Azhar Model Educational Complex — Minya

- **Canonical Name (EN / AR):** Al-Azhar Model Educational Institute Complex — Minya / المجمع التعليمي للمعهد الأزهري النموذجي — المنيا
- **Current Portfolio Slug:** `al-azhar-institute-minya`
- **KB ID / Year:** `INF-P-2026-001` / 2026
- **Source Folder:** `01- Master/2026/01- المعهد الازهري المنيا-قبس من نور`
- **Client / Consultant:** Al-Azhar Al-Sharif / Sovereign Educational Directorate
- **Scope & Capacity:** Multi-story educational buildings, science laboratories, administrative halls, fire alarm/firefighting, and sports yards.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 32 source files including architectural DWG and QS files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as premier educational building reference.

#### 6.4 Al-Marreikh Sports Stadium Rehabilitation & Civil-MEP Modernization

- **Canonical Name (EN / AR):** Al-Marreikh Sports Stadium Rehabilitation & Facility Upgrades / تطوير ورفع كفاءة المنشآت المدنية والكهروميكانيكية لملعب نادي المريخ البورسعيدي
- **Current Portfolio Slug:** `al-marreikh-stadium-civil-mep`
- **KB ID / Year:** `INF-P-2024-009` / 2024
- **Source Folder:** `01- Master/2024/09-رفع كفاءه ملعب المريخ البورسعيدي`
- **Client / Consultant:** Ministry of Youth & Sports / Port Said Governorate
- **Scope & Capacity:** Structural concrete rehabilitation of spectator stands, lighting towers, players' changing quarters, drainage, and security perimeters.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 31 source files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as specialized sports infrastructure reference.

#### 6.5 Hayat Karima Primary Healthcare Clinic Unit

- **Canonical Name (EN / AR):** Hayat Karima Primary Healthcare Clinic Facility / إنشاء وتجهيز الوحدة الصحية النموذجية — المبادرة الرئاسية حياة كريمة
- **Current Portfolio Slug:** `hayat-karima-health-unit`
- **KB ID / Year:** `INF-P-2026-004` / 2026
- **Source Folder:** `01- Master/2026/04- الوحدة الصحية - حياة كريمة`
- **Client / Consultant:** Ministry of Health / Presidential Initiative "Hayat Karima"
- **Scope & Capacity:** Standard rural medical clinic building, outpatient rooms, medical gas conduits, generator backup, and civil finishes.
- **Evidence & Confidence:** **Confirmed Match (High Confidence)**. 10 source files.
- **Image Asset State:** 🔄 Sector-Pooled (12 WebP photos).
- **Recommended Action:** Retain as government social development reference.

---

## 4. Name & Identity Conflicts

|   #    | Current Portfolio Entity                                                          | Conflict & Discrepancy Description                                                                                                                                                                                                     | Source Evidence                                                      | Recommended Normalization                                                                                   |
| :----: | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **01** | `sadat-city-ro`<br/>_(محطة تحلية مياه البحر بالسادات)_                            | **Geography / Chemistry Conflict:** Sadat City is an inland city in Menoufia (Nile Delta). It has no sea access. The plant is a brackish water/groundwater RO desalination plant producing food-grade water for pasta manufacturing.   | KB `2021/03`: "محطة التحلية بالسادات بمصنع المكرونة بطاقة 1500 م3".  | Rename Arabic title to "محطة تحلية المياه الصناعية بالسادات (1500 م³/يوم)".                                 |
| **02** | `arish-water-supply`<br/>_(شبكات البنية التحتية وتغذية المياه بالعريش)_           | **Genericized Scope Conflict:** The current portfolio title generalizes the project to all of Arish city, whereas source contracts strictly document the water feed pipeline for Arish International Airport under Al-Organi Group.    | KB `2024/05`: "مشروع تغذية مطار العريش - العرجاني جروب" (947 files). | Rename to "مشروع خط تغذية مياه مطار العريش الدولي (مجموعة العرجاني)".                                       |
| **03** | `salam-city-water-pipeline`<br/>_(خط نقل المياه... من رافع الشلاق)_               | **Spelling / Toponym Conflict:** The portfolio Arabic metadata spells the intake pumping station "رافع الشلاق", while the SharePoint folder and contract spell it "رافع الشلاّء" (Shalla Pumping Station).                             | KB `2026/03`: "مشروع خط تغذية مدينة السلام من رافع الشلاء".          | Normalize spelling to "رافع الشلاّء".                                                                       |
| **04** | `toshka-expanded-water-networks`<br/>_(محطات وشبكات المياه... المقاولة المستجدة)_ | **Missing Complementary Package:** The current record only references the "المقاولة المستجدة" (`INF-P-2021-006`), but its authentic photos and twin contract are in `2021/05` ("عقد 115-2020 مكمل" / `INF-P-2021-005`).                | Image archive stores 23 authentic photos under `2021/05`.            | Merge `INF-P-2021-005` and `INF-P-2021-006` into a unified Toshka Networks record.                          |
| **05** | `north-coast-desalination`<br/>_(معالجة مياه بالتناضح العكسي — الساحل الشمالي)_   | **Duplicate / Ambiguous Origin:** The portfolio currently maps this to the El-Hamam plant from the 2020 multi-site contract (`2020/03`), while SharePoint also has a dedicated 2024 project `2024/03-مشروع الساحل الشمالى محطة 500م3`. | KB `2024/03` contains 17 files for a 500 m³/day plant.               | Clarify specification: tie record explicitly to the 2024 500 m³/day plant or define as El-Hamam coastal RO. |

---

## 5. Duplicate & Probable Duplicate Groups

```mermaid
graph TD
    subgraph "Cluster A: Toshka Pumping & Networks"
        A1["toshka-pumping-stations (Umbrella Prototype)"] -.->|Duplicates| A2["toshka-farm-potable-water-plant (INF-P-2020-007)"]
        A1 -.->|Duplicates| A3["toshka-expanded-water-networks (INF-P-2021-006)"]
        A1 -.->|Duplicates| A4["toshka-reclamation-pumping-package (INF-P-2022-003)"]
        A5["toshka-pumping-basket-screens (INF-P-2023-002)"] -->|Subcontract Component of| A4
    end

    subgraph "Cluster B: Shubra Shahab Industrial"
        B1["shubra-shahab-industrial-wastewater (INF-P-2020-005)"] --- B2["shubra-shahab-technical-works (INF-P-2022-002: Claims/Settlement)"]
    end

    subgraph "Cluster C: Natural Gas Electromechanical"
        C1["gas-egypt-stations-electromechanical (INF-P-2021-007)"] --- C2["cargas-grounding-systems (INF-P-2024-002: Earthing Grid)"]
    end
```

### Cluster 1: The Toshka Pumping & Networks Cluster

- **Portfolio Records Involved:**
  1. `toshka-pumping-stations` (4 images, umbrella slug)
  2. `toshka-farm-potable-water-plant` (`INF-P-2020-007`, 10 images)
  3. `toshka-expanded-water-networks` (`INF-P-2021-006`, 8 images)
  4. `toshka-reclamation-pumping-package` (`INF-P-2022-003`, 4 images)
  5. `toshka-pumping-basket-screens` (`INF-P-2023-002`, 5 images)
- **Forensic Diagnosis:** `toshka-pumping-stations` is a synthetic prototype created before batch ingestion that borrows data from the other four real contracts. Furthermore, `toshka-pumping-basket-screens` is an equipment fabrication subcontract (6 files) for the pump wells of Contract 39-2022.
- **Canonical Recommendation:** Retire `toshka-pumping-stations` as a standalone slug. Keep 3 distinct, authentic Toshka projects:
  - Project 1: **Toshka Potable Water Purification Plant 150 m³/day** (`toshka-farm-potable-water-plant`)
  - Project 2: **Toshka Agricultural Reclamation Pumping Stations** (`toshka-reclamation-pumping-package`, absorbing basket screens)
  - Project 3: **Toshka Expanded Water & Sewer Infrastructure Networks** (`toshka-expanded-water-networks`, absorbing `INF-P-2021-005`)

### Cluster 2: The Shubra Shahab Cluster

- **Portfolio Records Involved:**
  1. `shubra-shahab-industrial-wastewater` (`INF-P-2020-005`)
  2. `shubra-shahab-technical-works` (`INF-P-2022-002`)
- **Forensic Diagnosis:** `2022/تعويضات شبرا شهاب` contains only 3 files representing financial variation requests and technical price compensation submitted on the original 2020 plant (`2020/05`). It is NOT a separate engineering project.
- **Canonical Recommendation:** Merge `shubra-shahab-technical-works` into `shubra-shahab-industrial-wastewater`.

### Cluster 3: Natural Gas Fuel Stations Cluster

- **Portfolio Records Involved:**
  1. `gas-egypt-stations-electromechanical` (`INF-P-2021-007`)
  2. `cargas-grounding-systems` (`INF-P-2024-002`)
- **Forensic Diagnosis:** `2024/02-محطات كارجاس تأريض ارضي` contains only 2 files documenting earthing grid tests for Cargas CNG filling stations, exactly matching the scope of `2021/07-اعمال محطات غاز مصر`.
- **Canonical Recommendation:** Consolidate both into a unified **Natural Gas Fuel Stations Electromechanical & Earthing Systems** project.

---

## 6. Suspicious & Non-Project Records

### 1. `infrastructure-sand-procurement` (`INF-P-2024-001` / `2024/01-شراء رمال`)

- **Current Portfolio Presentation:** Strategic Infrastructure Materials & Sand Supply Logistics.
- **Source Reality:** The SharePoint directory contains only 5 procurement invoices and weighbridge slips for raw sand purchases.
- **Forensic Verdict:** **Non-Engineering Commercial Transaction**. Presenting a sand purchase order as a civil engineering contracting project dilutes the technical authority of the portfolio.
- **Recommendation:** **P0/P1 — Remove from public engineering portfolio** (or reclassify under an internal procurement category).

### 2. `east-delta-wastewater` (Synthetic Placeholder)

- **Current Portfolio Presentation:** East Delta Municipal Wastewater Treatment / معالجة الصرف الصحي — دلتا الشرق.
- **Source Reality:** Zero source occurrences across all 67,619 SharePoint items, zero records in Markdown KB, zero BOQ or contract files.
- **Forensic Verdict:** **Fictional Prototype**. Created as a placeholder in early UI wireframing.
- **Recommendation:** **P0 — Delete from database and frontend routing immediately**.

---

## 7. Missing Projects (Source Present, Portfolio Missing)

### Primary Missing Project: `INF-P-2021-005`

- **Source Folder:** `01- Master/2021/05-محطات الصرف والمياه ف توشكى عقد(115-2020) مكمل`
- **KB Record:** [`02_PROJECTS/2021/inf-p-2021-005.md`](Infeworks_KB_Markdown/02_PROJECTS/2021/inf-p-2021-005.md)
- **Evidence Backing:** 243 source files, 50 extracted Office documents, official primary handover report (`محضر استلام ابتدائي 25-12-2021`), tank hydrostatic test results (`نتائج اختبارات الخزانات`), and **23 authentic photographs** in the image archive.
- **Why Missing:** Ingestion script mapped `toshka-expanded-water-networks` to `INF-P-2021-006`, leaving `INF-P-2021-005` unmapped.
- **Recommendation:** Merge metadata and restore its 23 authentic photos to the Toshka Networks showcase.

### Historical / Reference Projects in SharePoint

1. **`Before 2020/villa maged kedwani`:** 27 source files and **18 authentic photographs/renders** of a high-end luxury residential villa. If Infeworks wishes to demonstrate luxury private architectural contracting, this is a ready, verified project.
2. **`Before 2020/ابو المطامير`:** 16 source files documenting Abu El-Matameer water infrastructure works.
3. **`Before 2020/الصينيين`:** 38 source files documenting electromechanical and infrastructure works with Chinese general contractors.
4. **`Before 2020/مرزعه 5000 فدان`:** 17 source files documenting the 5,000 Feddan Agricultural Farm infrastructure works.

---

## 8. Weak & Incomplete Projects

The following projects represent genuine contracting works but currently have very small source file counts in the Knowledge Base, requiring enhanced technical claim verification before enterprise procurement scrutiny:

| Slug                                      | KB ID            | Source File Count | Weakness / Missing Detail                               | Recommended Action                         |
| ----------------------------------------- | ---------------- | :---------------: | ------------------------------------------------------- | ------------------------------------------ |
| `cargas-grounding-systems`                | `INF-P-2024-002` |    **2 files**    | Lacks detailed BOQ and station location roster.         | Merge into Gas Egypt project.              |
| `date-palm-cold-storage-mep`              | `INF-P-2024-004` |    **3 files**    | Lacks detailed refrigeration capacity (kW/tons).        | Supplement metadata with cooling capacity. |
| `future-of-egypt-potato-storage-softener` | `INF-P-2024-008` |    **3 files**    | Technical claims are solid (8 m³/hr), but few drawings. | Retain; claims are verified.               |
| `manshiyat-nasser-pumping-station`        | `INF-P-2024-006` |    **7 files**    | Flow rate and head parameters need extraction from PDF. | Queue PDF extraction for pump parameters.  |
| `capital-island-infrastructure`           | `INF-P-2023-001` |    **8 files**    | Utility line lengths and diameters not fully extracted. | Extract CAD drawings from SharePoint.      |
| `hayat-karima-health-unit`                | `INF-P-2026-004` |   **10 files**    | Clinic location village not specified in title.         | Add specific village/governorate name.     |

---

## 9. Image Reconciliation & Asset Provenance

```
┌────────────────────────────────────────────────────────────────────────┐
│                      PROJECT IMAGERY DISTRIBUTION                      │
├────────────────────────────┬───────────┬───────────────────────────────┤
│ Asset Category             │ Projects  │ Source Provenance             │
├────────────────────────────┼───────────┼───────────────────────────────┤
│ Authentic Photographic Sets│ 15        │ Extracted from raw archive    │
│ Sector-Pooled Shared Sets  │ 27        │ Curated capability pools      │
│ Direct Image Mismatches    │ 2         │ Borrowed from other projects  │
│ Fictional Placeholder Set  │ 1         │ Stock/recycled images         │
├────────────────────────────┴───────────┴───────────────────────────────┤
│ TOTAL PUBLISHED DIRECTORIES : 43 Folders on Disk                       │
└────────────────────────────────────────────────────────────────────────┘
```

### Direct Image Mismatches Identified

1. **`food-city-treatment`:** Contains 5 WebP images that are binary identical to `dairy-effluent-treatment-network` (`04-محطة معالجة مياه صرف حلابات`). A food-factory biscuit effluent plant is visually displaying dairy farm cattle sheds and milking effluent sumps.
2. **`north-coast-desalination`:** Contains 10 WebP images extracted from the El-Hamam subfolder of `multi-site-desalination-purification` (`03-محطة تحلية وتنقية المياه`), creating photo duplication between the two projects.

### Shared Image Clusters (Cross-Project Asset Reuse)

SHA-256 analysis across `public/images/projects/` identified **65 unique image hash clusters** shared across multiple projects. For example:

- `cover.webp` of `east-delta-wastewater` is reused as the cover or gallery image across `beni-suef-water-wastewater`, `gas-egypt-stations-electromechanical`, `cargas-grounding-systems`, `date-palm-cold-storage-mep`, and `manshiyat-nasser-pumping-station`.
- Infrastructure pipe-laying photos from `sisi-city-wastewater` are reused across `nuweiba-infrastructure-works`, `palm-hills-infrastructure-utilities`, and `bianchi-resort-infrastructure-utilities`.

---

## 10. Prioritized Correction Queue

| Priority | Issue / Action                                                | Rationale                                                                                                       |      Effort       |
| :------: | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | :---------------: |
|  **P0**  | **Delete `east-delta-wastewater`**                            | Fictional project with 0 source evidence. Severe credibility risk if audited by sovereign procurement officers. |  Low (~10 mins)   |
|  **P0**  | **Fix `leads` Table Check Constraint**                        | Submitting standard contact form inquiries throws DB check constraint errors (`leads_audience_type_check`).     |  Low (~15 mins)   |
|  **P1**  | **Consolidate Toshka Pumping Umbrella**                       | `toshka-pumping-stations` duplicates 4 specific Toshka contracts and causes confusion in portfolio sorting.     | Medium (~30 mins) |
|  **P1**  | **Reclassify Sand Procurement (`INF-P-2024-001`)**            | Purchasing sand is not an engineering project; undermines specialized contracting positioning.                  |  Low (~10 mins)   |
|  **P1**  | **Fix `food-city-treatment` Image Mismatch**                  | Replace dairy effluent photos with neutral food-grade industrial wastewater imagery.                            |  Low (~15 mins)   |
|  **P1**  | **Merge Shubra Shahab Variation Claim**                       | Combine `shubra-shahab-technical-works` into `shubra-shahab-industrial-wastewater`.                             |  Low (~15 mins)   |
|  **P2**  | **Merge Gas Infrastructure Subcontracts**                     | Combine `cargas-grounding-systems` into `gas-egypt-stations-electromechanical`.                                 |  Low (~15 mins)   |
|  **P2**  | **Restore `INF-P-2021-005` Toshka Supplemental**              | Integrate 243 files and 23 authentic photos into `toshka-expanded-water-networks`.                              | Medium (~25 mins) |
|  **P2**  | **Correct Title Inconsistencies**                             | Fix Sadat City RO ("مياه بحر" -> "مياه صناعية / آبار") and Arish ("تغذية مطار العريش").                         |  Low (~15 mins)   |
|  **P3**  | **Enrich Weak Projects from SharePoint CAD/PDF**              | Extract flow rates, head, and pipe diameters for 6 weak projects from raw PDFs.                                 |  High (~2 hours)  |
|  **P3**  | **Add Villa Maged Kedwani as Private Architecture Reference** | Leverage 18 authentic photos to establish high-end private architectural contracting capability.                |  Low (~20 mins)   |
