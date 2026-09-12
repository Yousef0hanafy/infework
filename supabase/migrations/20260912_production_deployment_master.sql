-- ==============================================================================
-- INFEWORKS MASTER PRODUCTION MIGRATION
-- Project: cnmuvufxndpiqgqwkkzr (Infeworks Production Database)
-- Scope:
--   1. media_assets columns (media_type, sort_order, mime_type) & indexes
--   2. projects technical fact columns (client, consultant, scope, capacity, year, region)
--   3. Anonymous permissions (public read for facts & featured)
--   4. Storage bucket policy (public read for project-media)
--   5. Backfill facts for all existing projects
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- 1. EXTEND media_assets TABLE
-- ------------------------------------------------------------------------------
ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'photo'
    CHECK (media_type IN ('photo', 'schema'));

ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS mime_type TEXT;

-- Backfill sort_order for any pre-existing media
UPDATE public.media_assets ma
SET sort_order = sub.rn
FROM (
  SELECT id,
    ROW_NUMBER() OVER (
      PARTITION BY project_id
      ORDER BY created_at ASC
    ) AS rn
  FROM public.media_assets
  WHERE media_type = 'photo'
) sub
WHERE ma.id = sub.id;

-- Indexes for performance & uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS media_assets_one_schema_per_project
  ON public.media_assets (project_id)
  WHERE media_type = 'schema';

CREATE INDEX IF NOT EXISTS media_assets_project_type_order
  ON public.media_assets (project_id, media_type, sort_order ASC);

-- ------------------------------------------------------------------------------
-- 2. EXTEND projects TABLE (BILINGUAL TECHNICAL FACTS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS client_en     TEXT,
  ADD COLUMN IF NOT EXISTS client_ar     TEXT,
  ADD COLUMN IF NOT EXISTS consultant_en TEXT,
  ADD COLUMN IF NOT EXISTS consultant_ar TEXT,
  ADD COLUMN IF NOT EXISTS scope_en      TEXT,
  ADD COLUMN IF NOT EXISTS scope_ar      TEXT,
  ADD COLUMN IF NOT EXISTS capacity_en   TEXT,
  ADD COLUMN IF NOT EXISTS capacity_ar   TEXT,
  ADD COLUMN IF NOT EXISTS year          TEXT,
  ADD COLUMN IF NOT EXISTS region_en     TEXT,
  ADD COLUMN IF NOT EXISTS region_ar     TEXT;

-- ------------------------------------------------------------------------------
-- 3. PERMISSIONS FOR ANONYMOUS PUBLIC ACCESS
-- ------------------------------------------------------------------------------
GRANT SELECT (
  client_en, client_ar, 
  consultant_en, consultant_ar, 
  scope_en, scope_ar, 
  capacity_en, capacity_ar, 
  year, 
  region_en, region_ar, 
  featured
) ON public.projects TO anon;

-- ------------------------------------------------------------------------------
-- 4. STORAGE BUCKET PUBLIC READ POLICY
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Access for project-media'
  ) THEN
    CREATE POLICY "Public Access for project-media"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'project-media');
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 5. BACKFILL TECHNICAL FACTS FOR ALL EXISTING PROJECTS
-- ------------------------------------------------------------------------------

-- Project: sadat-city-ro
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Macaroni & Biscuit Factories Complex — NSPO'),
    client_ar = COALESCE(client_ar, 'مجمع مصانع المكرونة والبسكويت — الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'MAST Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة ماست'),
    scope_en = COALESCE(scope_en, 'Process Design · RO Supply · Skid Assembly · Commissioning · 24/7 O&M'),
    scope_ar = COALESCE(scope_ar, 'تصميم العمليات · توريد التناضح العكسي · تجميع الوحدات · تشغيل تجريبي · تشغيل وصيانة'),
    capacity_en = COALESCE(capacity_en, '1,500 m³/day'),
    capacity_ar = COALESCE(capacity_ar, '1,500 م³/يوم'),
    year = COALESCE(year, '2021'),
    region_en = COALESCE(region_en, 'Sadat City, Menoufia'),
    region_ar = COALESCE(region_ar, 'مدينة السادات، المنوفية')
WHERE slug = 'sadat-city-ro';

-- Project: toshka-pumping-stations
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization (NSPO)'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'Al-Amar Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة العمار'),
    scope_en = COALESCE(scope_en, 'Turnkey Mechanical & Electrical Pumping · Basket Screens · Automation · Long-Term O&M'),
    scope_ar = COALESCE(scope_ar, 'أعمال كهروميكانيكية متكاملة · مصافي شوائب · تحكم آلي · تشغيل وصيانة ممتدة'),
    capacity_en = COALESCE(capacity_en, '22 Irrigation & Water Pumping Stations'),
    capacity_ar = COALESCE(capacity_ar, 'منظومة 22 محطة رفع وضخ مياه'),
    year = COALESCE(year, '2022'),
    region_en = COALESCE(region_en, 'Toshka, Aswan'),
    region_ar = COALESCE(region_ar, 'توشكى، أسوان')
WHERE slug = 'toshka-pumping-stations';

-- Project: toshka-farm-potable-water-plant
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization (NSPO)'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'Al-Amar Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة العمار'),
    scope_en = COALESCE(scope_en, 'Compact Water Treatment · Clarifiers · UV Disinfection · Distribution Pumps'),
    scope_ar = COALESCE(scope_ar, 'تنقية مياه مدمجة · مروقات · تعقيم UV · طلمبات توزيع'),
    capacity_en = COALESCE(capacity_en, '150 m³/day Potable Purification Station'),
    capacity_ar = COALESCE(capacity_ar, 'محطة تنقية مياه شرب 150 م³/يوم'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'Toshka, Aswan'),
    region_ar = COALESCE(region_ar, 'توشكى، أسوان')
WHERE slug = 'toshka-farm-potable-water-plant';

-- Project: toshka-expanded-water-networks
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization (NSPO)'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'MAST Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة ماست'),
    scope_en = COALESCE(scope_en, 'Wet Wells · Turbine Pumps · HDPE Manifolds · Electrical MCC'),
    scope_ar = COALESCE(scope_ar, 'بيارات خرسانية · طلمبات رأسية · خطوط طرد HDPE · لوحات تحكم'),
    capacity_en = COALESCE(capacity_en, 'Expanded Desert Lift Stations'),
    capacity_ar = COALESCE(capacity_ar, 'محطات رفع مياه صحراوية مستجدة'),
    year = COALESCE(year, '2021'),
    region_en = COALESCE(region_en, 'Toshka, Aswan'),
    region_ar = COALESCE(region_ar, 'توشكى، أسوان')
WHERE slug = 'toshka-expanded-water-networks';

-- Project: arish-water-supply
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Al-Organi Group'),
    client_ar = COALESCE(client_ar, 'مجموعة العرجاني (أبناء سيناء)'),
    consultant_en = COALESCE(consultant_en, 'Amar Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة عمار'),
    scope_en = COALESCE(scope_en, 'Supply Trunk Lines · Strategic Storage Tanks · Booster Stations · Valve Chambers'),
    scope_ar = COALESCE(scope_ar, 'خطوط التغذية الناقلة · خزانات التكديس الاستراتيجية · محطات الرفع · غرف المحابس'),
    capacity_en = COALESCE(capacity_en, 'Regional Trunk Lines & Booster Stations'),
    capacity_ar = COALESCE(capacity_ar, 'خطوط نقل رئيسية ومحطات رافع'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'Arish Airport & North Sinai'),
    region_ar = COALESCE(region_ar, 'مطار العريش وشمال سيناء')
WHERE slug = 'arish-water-supply';

-- Project: awlad-el-sheikh-pumping
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Potable Water & Sanitation Authority (NOPWASD)'),
    client_ar = COALESCE(client_ar, 'الهيئة القومية لمياه الشرب والصرف الصحي — سوهاج'),
    consultant_en = COALESCE(consultant_en, 'Third Field Army Engineering Department'),
    consultant_ar = COALESCE(consultant_ar, 'شعبة المهندسين العسكريين'),
    scope_en = COALESCE(scope_en, 'Civil Well Construction · Submersible & Booster Pump Sets · Control Panels · Testing'),
    scope_ar = COALESCE(scope_ar, 'الأعمال المدنية للبيارات · مجموعات الضخ الغاطس والرافع · لوحات التشغيل والتحكم'),
    capacity_en = COALESCE(capacity_en, 'Potable Water Lifting Hub'),
    capacity_ar = COALESCE(capacity_ar, 'محطة رفع وتغذية مياه الشرب'),
    year = COALESCE(year, '2022'),
    region_en = COALESCE(region_en, 'Awlad El-Sheikh, Sohag'),
    region_ar = COALESCE(region_ar, 'أولاد الشيخ، سوهاج')
WHERE slug = 'awlad-el-sheikh-pumping';

-- Project: north-coast-desalination
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Commercial & Regional Development Authority'),
    client_ar = COALESCE(client_ar, 'جهاز تنمية وتطوير المشروعات الإقليمية والساحلية'),
    consultant_en = COALESCE(consultant_en, 'Coastal Water Works Committee'),
    consultant_ar = COALESCE(consultant_ar, 'لجنة الأعمال المائية الساحلية'),
    scope_en = COALESCE(scope_en, 'Pre-Filtration · Brackish RO Trains · Chemical Dosing · Lab Quality Verification'),
    scope_ar = COALESCE(scope_ar, 'مراحل الفلترة الرملية والميكرونية · وحدات التناضح العكسي · منظومة الحقن الكيميائي'),
    capacity_en = COALESCE(capacity_en, 'Multi-Unit Brackish RO Trains'),
    capacity_ar = COALESCE(capacity_ar, 'وحدات تحلية متتابعة بالتناضح العكسي'),
    year = COALESCE(year, '2019'),
    region_en = COALESCE(region_en, 'El Hamam & Coastal Strip, Matrouh'),
    region_ar = COALESCE(region_ar, 'الحمام والشريط الساحلي، مطروح')
WHERE slug = 'north-coast-desalination';

-- Project: multi-site-desalination-purification
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organizations'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'MAST Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة ماست'),
    scope_en = COALESCE(scope_en, 'Skid Fabrication · RO Trains · Pre-Filtration · Multi-Site Commissioning'),
    scope_ar = COALESCE(scope_ar, 'تصميم وتصنيع شاسيهات · وحدات تناضح عكسي · فلترة أولية · تشغيل متعدد المواقع'),
    capacity_en = COALESCE(capacity_en, 'Multi-Site Decentralized RO Stations'),
    capacity_ar = COALESCE(capacity_ar, 'محطات تحلية مياه بالتناضح العكسي متعددة المواقع'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'El Hamam, Fayoum, New Valley & Wadi Natrun'),
    region_ar = COALESCE(region_ar, 'الحمام، الفيوم، الوادي الجديد، وادي النطرون')
WHERE slug = 'multi-site-desalination-purification';

-- Project: dairy-effluent-treatment-network
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Livestock Production Directorate'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الإنتاج الحيواني'),
    consultant_en = COALESCE(consultant_en, 'Environmental Engineering Advisory Board'),
    consultant_ar = COALESCE(consultant_ar, 'هيئة الاستشارات البيئية والهندسية'),
    scope_en = COALESCE(scope_en, 'Biological Treatment · Aeration Basins · Clarifiers · Sludge Dewatering'),
    scope_ar = COALESCE(scope_ar, 'معالجة بيولوجية · أحواض تهوية · مروقات · نزح الحمأة'),
    capacity_en = COALESCE(capacity_en, 'High-Load Organic Effluent Treatment'),
    capacity_ar = COALESCE(capacity_ar, 'معالجة صرف عضوي عالي الأحمال'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'El Hamam, Wadi Natrun, Sadat & Yesh'),
    region_ar = COALESCE(region_ar, 'الحمام، وادي النطرون، السادات، يشع')
WHERE slug = 'dairy-effluent-treatment-network';

-- Project: food-city-treatment
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Food City Industrial Complex (Biscuit Factory)'),
    client_ar = COALESCE(client_ar, 'مجمع المدينة الغذائية الصناعي (مصنع البسكويت)'),
    consultant_en = COALESCE(consultant_en, 'MAST Engineering Consultants'),
    consultant_ar = COALESCE(consultant_ar, 'استشاريو ماست الهندسيون'),
    scope_en = COALESCE(scope_en, 'Biological & Chemical Treatment · Skid Fabrication · Compliance Testing · Handover'),
    scope_ar = COALESCE(scope_ar, 'معالجة بيولوجية وكيميائية · تصنيع الوحدات · اختبارات المطابقة البيئية · التسليم'),
    capacity_en = COALESCE(capacity_en, '50 m³/day Industrial Wastewater'),
    capacity_ar = COALESCE(capacity_ar, '50 م³/يوم صرف صناعي غذائي'),
    year = COALESCE(year, '2021'),
    region_en = COALESCE(region_en, 'Sadat City Industrial Zone'),
    region_ar = COALESCE(region_ar, 'المنطقة الصناعية بالسادات')
WHERE slug = 'food-city-treatment';

-- Project: qabs-min-nour-mosque
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Qabs Min Nour Charity Foundation'),
    client_ar = COALESCE(client_ar, 'جمعية قبس من نور الخيرية'),
    consultant_en = COALESCE(consultant_en, 'Engineering Consultant Bureau — Qabs Min Nour'),
    consultant_ar = COALESCE(consultant_ar, 'المكتب الاستشاري الهندسي لجمعية قبس من نور'),
    scope_en = COALESCE(scope_en, 'Turnkey General Contracting · Civil Concrete & Dome Masonry · Architectural Stone Facades & Integrated MEP'),
    scope_ar = COALESCE(scope_ar, 'مقاولات عامة متكاملة على المفتاح · الهيكل الخرساني والقباب · الواجهات الحجرية والأعمال الكهروميكانيكية'),
    capacity_en = COALESCE(capacity_en, '2,050 m² Built Area · 1,500 Worshipers'),
    capacity_ar = COALESCE(capacity_ar, 'مسطح بنائي 2,050 م² · سعة 1,500 مصلٍ'),
    year = COALESCE(year, '2025'),
    region_en = COALESCE(region_en, 'New Administrative Capital'),
    region_ar = COALESCE(region_ar, 'العاصمة الإدارية الجديدة')
WHERE slug = 'qabs-min-nour-mosque';

-- Project: rafah-bedouin-housing
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Al-Organi Group'),
    client_ar = COALESCE(client_ar, 'مجموعة العرجاني (أبناء سيناء)'),
    consultant_en = COALESCE(consultant_en, 'Diaa Consulting'),
    consultant_ar = COALESCE(consultant_ar, 'مكتب ضياء للاستشارات الهندسية'),
    scope_en = COALESCE(scope_en, 'Housing Units · Potable Water & Sanitation Loops'),
    scope_ar = COALESCE(scope_ar, 'إنشاءات مدنية ومباني سكنية · شبكات مياه الشرب والصرف الصحي'),
    capacity_en = COALESCE(capacity_en, 'Zone 1 Development · 100+ Bedouin Residential Units'),
    capacity_ar = COALESCE(capacity_ar, 'المرحلة الأولى · أكثر من 100 وحدة سكنية بدوية متكاملة'),
    year = COALESCE(year, '2025'),
    region_en = COALESCE(region_en, 'Rafah, North Sinai'),
    region_ar = COALESCE(region_ar, 'رفح، شمال سيناء')
WHERE slug = 'rafah-bedouin-housing';

-- Project: sisi-city-wastewater
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Al-Organi Group'),
    client_ar = COALESCE(client_ar, 'مجموعة العرجاني (أبناء سيناء)'),
    consultant_en = COALESCE(consultant_en, 'AL-Shima Engineering'),
    consultant_ar = COALESCE(consultant_ar, 'مكتب شيما للاستشارات الهندسية'),
    scope_en = COALESCE(scope_en, 'Gravity Pipeline Laying · Inspection Manholes & Chambers · Storm Catch Basins · Hydrostatic Testing'),
    scope_ar = COALESCE(scope_ar, 'مد خطوط الانحدار · غرف التفتيش والمطابق · بالوعات صرف الأمطار · الاختبارات الهيدروليكية الميدانية'),
    capacity_en = COALESCE(capacity_en, 'Gravity Sewer & Stormwater Drainage Trunk Line'),
    capacity_ar = COALESCE(capacity_ar, 'شبكة انحدار رئيسية للصرف الصحي وتصريف مياه الأمطار'),
    year = COALESCE(year, '2025'),
    region_en = COALESCE(region_en, 'Al-Salam City, North Sinai'),
    region_ar = COALESCE(region_ar, 'مدينة السلام، شمال سيناء')
WHERE slug = 'sisi-city-wastewater';

-- Project: salam-city-cattle-farm-networks
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization (NSPO)'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'Armed Forces Engineering Authority Consulting Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة المهندسين العسكريين — الهيئة الهندسية'),
    scope_en = COALESCE(scope_en, 'Feedlot Potable Supply · Effluent Drainage Collection · Milking Parlor Power & Water Lines'),
    scope_ar = COALESCE(scope_ar, 'شبكات التغذية للحظائر · تجميع وصرف المخلفات · شبكات المياه والكهرباء للمحالب الآلية'),
    capacity_en = COALESCE(capacity_en, 'Livestock Facility Wet Utilities · 2,500 Head Farm'),
    capacity_ar = COALESCE(capacity_ar, 'مرافق وشبكات مجمع إنتاج حيواني سعة 2,500 رأس'),
    year = COALESCE(year, '2025'),
    region_en = COALESCE(region_en, 'New Salam City, North Sinai'),
    region_ar = COALESCE(region_ar, 'مدينة السلام الجديدة، شمال سيناء')
WHERE slug = 'salam-city-cattle-farm-networks';

-- Project: toshka-reclamation-pumping-package
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'Al-Amar Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة العمار'),
    scope_en = COALESCE(scope_en, 'Station Civil Works · Heavy Pump Sets · Trash Screens · SCADA Integration'),
    scope_ar = COALESCE(scope_ar, 'أعمال مدنية للمحطات · طلمبات خدمة شاقة · مصافي شوائب · تحكم سكادا'),
    capacity_en = COALESCE(capacity_en, 'Dual Agricultural Pumping Stations'),
    capacity_ar = COALESCE(capacity_ar, 'محطتا ضخ ورفع زراعي'),
    year = COALESCE(year, '2022'),
    region_en = COALESCE(region_en, 'Toshka, Aswan'),
    region_ar = COALESCE(region_ar, 'توشكى، أسوان')
WHERE slug = 'toshka-reclamation-pumping-package';

-- Project: salam-city-water-pipeline
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization (NSPO)'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'AL-Shima Engineering'),
    consultant_ar = COALESCE(consultant_ar, 'مكتب الشيما للاستشارات الهندسية'),
    scope_en = COALESCE(scope_en, 'Transmission Pipeline Laying · Valve Chambers & Air Release · Hydrostatic Pressure Testing · Commissioning'),
    scope_ar = COALESCE(scope_ar, 'مد خطوط المياه الناقلة · غرف المحابس ومحابس الهواء · اختبارات الضغط الهيدروستاتيكي · تدشين الخط'),
    capacity_en = COALESCE(capacity_en, 'High-Pressure Strategic Water Transmission Line'),
    capacity_ar = COALESCE(capacity_ar, 'خط مياه ناقل استراتيجي عالي الضغط من رافع الشلاق'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'Sheikh Zuweid to New Salam City, North Sinai'),
    region_ar = COALESCE(region_ar, 'من الشيخ زويد إلى مدينة السلام، شمال سيناء')
WHERE slug = 'salam-city-water-pipeline';

-- Project: beni-suef-water-wastewater
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Beni Suef Potable Water & Sanitation Authority'),
    client_ar = COALESCE(client_ar, 'شركة مياه الشرب والصرف الصحي ببني سويف'),
    consultant_en = COALESCE(consultant_en, 'National Infrastructure Consulting Board'),
    consultant_ar = COALESCE(consultant_ar, 'جهاز استشارات البنية التحتية'),
    scope_en = COALESCE(scope_en, 'Civil Works · MEP Fit-Out · Filter Media · Commissioning'),
    scope_ar = COALESCE(scope_ar, 'أعمال مدنية · كهروميكانيك · فلاتر وترويق · تشغيل تجريبي'),
    capacity_en = COALESCE(capacity_en, 'Municipal Multi-Train Treatment'),
    capacity_ar = COALESCE(capacity_ar, 'محطات معالجة وتنقية بلدية متعددة المراحل'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'Beni Suef'),
    region_ar = COALESCE(region_ar, 'بني سويف')
WHERE slug = 'beni-suef-water-wastewater';

-- Project: qibili-qarun-water-purification
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Service Projects Organization'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الخدمة الوطنية'),
    consultant_en = COALESCE(consultant_en, 'Amar Misr Consultions'),
    consultant_ar = COALESCE(consultant_ar, 'عمار مصر للاستشارات الهندسية'),
    scope_en = COALESCE(scope_en, 'MEP Fit-Out · Sand Filtration · Chemical Dosing · Control Panels'),
    scope_ar = COALESCE(scope_ar, 'أعمال كهروميكانيكية · فلاتر رملية · حقن كيميائي · لوحات تحكم'),
    capacity_en = COALESCE(capacity_en, 'Agricultural & Process Water Purification'),
    capacity_ar = COALESCE(capacity_ar, 'تنقية مياه عمليات وإنتاج زراعي'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'Qibili Qarun, Fayoum'),
    region_ar = COALESCE(region_ar, 'قبلي قارون، الفيوم')
WHERE slug = 'qibili-qarun-water-purification';

-- Project: shubra-shahab-industrial-wastewater
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Agro-Industrial Development Authority'),
    client_ar = COALESCE(client_ar, 'جهاز الصناعات والتنمية الزراعية'),
    consultant_en = COALESCE(consultant_en, 'MAST Group'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة ماست'),
    scope_en = COALESCE(scope_en, 'Civil Basins · DAF Units · Chemical Dosing · Environmental Compliance'),
    scope_ar = COALESCE(scope_ar, 'أحواض خرسانية · وحدات DAF · حقن كيميائي · مطابقة بيئية'),
    capacity_en = COALESCE(capacity_en, 'Industrial Agro-Effluent Treatment Train'),
    capacity_ar = COALESCE(capacity_ar, 'محطة معالجة صرف صناعي زراعي متقدمة'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'Shubra Shahab, Qalyubia'),
    region_ar = COALESCE(region_ar, 'شبرا شهاب، القليوبية')
WHERE slug = 'shubra-shahab-industrial-wastewater';

-- Project: marble-factory-desalination-plants
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Mining & Marble Industries Complex'),
    client_ar = COALESCE(client_ar, 'مجمع صناعات الرخام والتعدين'),
    consultant_en = COALESCE(consultant_en, 'Ideal Group Consulting Office'),
    consultant_ar = COALESCE(consultant_ar, 'مجموعة ايديال للاستشارات الهندسية'),
    scope_en = COALESCE(scope_en, 'Industrial RO · Sediment Hydrocyclones · Process Water Recovery · Automation'),
    scope_ar = COALESCE(scope_ar, 'تحلية صناعية · فواصل رواسب · استرجاع مياه التبريد · تحكم آلي'),
    capacity_en = COALESCE(capacity_en, 'Heavy Industrial Process Water & RO Trains'),
    capacity_ar = COALESCE(capacity_ar, 'تحلية مياه عمليات للخدمة الصناعية الشاقة'),
    year = COALESCE(year, '2020'),
    region_en = COALESCE(region_en, 'Ras Sedr, South Sinai'),
    region_ar = COALESCE(region_ar, 'رأس سدر، جنوب سيناء')
WHERE slug = 'marble-factory-desalination-plants';

-- Project: qibili-qarun-goat-farm-utilities
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Livestock Production Directorate'),
    client_ar = COALESCE(client_ar, 'جهاز مشروعات الإنتاج الحيواني'),
    consultant_en = COALESCE(consultant_en, 'Fayoum Agricultural Projects Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'مديرية المشروعات الزراعية بالفيوم'),
    scope_en = COALESCE(scope_en, 'Water Supply · Drainage Piping · Holding Tanks · Booster Pumps'),
    scope_ar = COALESCE(scope_ar, 'تغذية مياه · شبكات صرف · خزانات تجميع · طلمبات رفع ضغط'),
    capacity_en = COALESCE(capacity_en, 'Specialized Agricultural Utility Networks'),
    capacity_ar = COALESCE(capacity_ar, 'شبكات مرافق متخصصة لمزارع الإنتاج الحيواني'),
    year = COALESCE(year, '2021'),
    region_en = COALESCE(region_en, 'Qibili Qarun, Fayoum'),
    region_ar = COALESCE(region_ar, 'قبلي قارون، الفيوم')
WHERE slug = 'qibili-qarun-goat-farm-utilities';

-- Project: capital-island-infrastructure
UPDATE public.projects
SET client_en = COALESCE(client_en, 'New Administrative Capital Urban Authority'),
    client_ar = COALESCE(client_ar, 'جهاز تنمية العاصمة الإدارية الجديدة'),
    consultant_en = COALESCE(consultant_en, 'Capital Engineering Supervision Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة الإشراف الهندسي بالعاصمة'),
    scope_en = COALESCE(scope_en, 'Water Mains · Gravity Sewer · Storm Drainage · Electrical Duct Banks'),
    scope_ar = COALESCE(scope_ar, 'خطوط مياه · انحدار صرف · صرف أمطار · مسارات كابلات كهربائية'),
    capacity_en = COALESCE(capacity_en, 'Integrated Multi-Utility Urban Infrastructure'),
    capacity_ar = COALESCE(capacity_ar, 'بنية تحتية متكاملة لشبكات المرافق الحضرية'),
    year = COALESCE(year, '2023'),
    region_en = COALESCE(region_en, 'New Administrative Capital'),
    region_ar = COALESCE(region_ar, 'العاصمة الإدارية الجديدة')
WHERE slug = 'capital-island-infrastructure';

-- Project: date-palm-cold-storage-mep
UPDATE public.projects
SET client_en = COALESCE(client_en, 'National Agricultural Logistics Authority'),
    client_ar = COALESCE(client_ar, 'جهاز اللوجستيات والمشروعات الزراعية'),
    consultant_en = COALESCE(consultant_en, 'Industrial Facilities Engineering Bureau'),
    consultant_ar = COALESCE(consultant_ar, 'مكتب هندسة المنشآت الصناعية'),
    scope_en = COALESCE(scope_en, 'Cooling Loops · Fire Suppression Pumps · Power Switchboards · Automated Controls'),
    scope_ar = COALESCE(scope_ar, 'دوائر تبريد · طلمبات إطفاء حريق · لوحات قوى · تحكم آلي'),
    capacity_en = COALESCE(capacity_en, 'Agro-Industrial Cold Storage Utilities'),
    capacity_ar = COALESCE(capacity_ar, 'مرافق وخدمات التخزين المبرد الصناعي'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'New Valley'),
    region_ar = COALESCE(region_ar, 'الوادي الجديد')
WHERE slug = 'date-palm-cold-storage-mep';

-- Project: manshiyat-nasser-pumping-station
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Cairo Potable Water & Sanitation Authority'),
    client_ar = COALESCE(client_ar, 'شركة الصرف الصحي للقاهرة الكبرى'),
    consultant_en = COALESCE(consultant_en, 'Urban Infrastructure Engineering Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة المشروعات الهندسية للتطوير الحضري'),
    scope_en = COALESCE(scope_en, 'Deep Wet Well · Non-Clog Submersibles · Valve Chambers · Ultrasonic Telemetry'),
    scope_ar = COALESCE(scope_ar, 'بيارة عميقة · طلمبات غاطسة · غرف محابس · تحكم بالموجات فوق الصوتية'),
    capacity_en = COALESCE(capacity_en, 'High-Head Urban Lift Station'),
    capacity_ar = COALESCE(capacity_ar, 'محطة رفع حضرية عالية الرفع والتصرف'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'Manshiyat Nasser, Cairo'),
    region_ar = COALESCE(region_ar, 'منشأة ناصر، القاهرة')
WHERE slug = 'manshiyat-nasser-pumping-station';

-- Project: nuweiba-infrastructure-works
UPDATE public.projects
SET client_en = COALESCE(client_en, 'South Sinai Development Directorate'),
    client_ar = COALESCE(client_ar, 'جهاز تنمية وتعمير جنوب سيناء'),
    consultant_en = COALESCE(consultant_en, 'Sinai Coastal Engineering Bureau'),
    consultant_ar = COALESCE(consultant_ar, 'مكتب هندسة المشروعات الساحلية'),
    scope_en = COALESCE(scope_en, 'HDPE Butt-Fusion · Booster Station · Surge Protection · Saline Area Trenching'),
    scope_ar = COALESCE(scope_ar, 'لحام حراري HDPE · محطة تقوية · حماية مطرقة مائية · حفر ساحلي'),
    capacity_en = COALESCE(capacity_en, 'Saline Soil Coastal Transmission Mains'),
    capacity_ar = COALESCE(capacity_ar, 'خطوط نقل مياه ساحلية مقاومة للملوحة'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'Nuweiba, South Sinai'),
    region_ar = COALESCE(region_ar, 'نويبع، جنوب سيناء')
WHERE slug = 'nuweiba-infrastructure-works';

-- Project: future-of-egypt-potato-storage-softener
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Future of Egypt Sustainable Development Authority'),
    client_ar = COALESCE(client_ar, 'جهاز مستقبل مصر للتنمية المستدامة'),
    consultant_en = COALESCE(consultant_en, 'Agro-Industrial Engineering Consultants'),
    consultant_ar = COALESCE(consultant_ar, 'استشاريو المشروعات الزراعية والصناعية'),
    scope_en = COALESCE(scope_en, 'Water Softener Vessel · Ion Exchange Resin · Brine Tanks · Cooling Tower Protection'),
    scope_ar = COALESCE(scope_ar, 'وحدات تليين مياه · ريزن تبادل أيوني · خزانات ملح · حماية أبراج التبريد'),
    capacity_en = COALESCE(capacity_en, '8 m³/hr Automated Ion-Exchange Softener'),
    capacity_ar = COALESCE(capacity_ar, 'محطة إزالة عسر مياه آلية بطاقة 8 م³/س'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'Dabaa Corridor, Western Desert'),
    region_ar = COALESCE(region_ar, 'محور الضبعة، الصحراء الغربية')
WHERE slug = 'future-of-egypt-potato-storage-softener';

-- Project: al-marreikh-stadium-civil-mep
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Ministry of Youth & Sports & Port Said'),
    client_ar = COALESCE(client_ar, 'وزارة الشباب والرياضة ومحافظة بورسعيد'),
    consultant_en = COALESCE(consultant_en, 'Sports Facilities Engineering Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة المشروعات الهندسية للمنشآت الرياضية'),
    scope_en = COALESCE(scope_en, 'Concrete Remediation · Pitch Drainage · Floodlighting Power · Facility Handover'),
    scope_ar = COALESCE(scope_ar, 'ترميم خرساني · تصريف أرضية الملعب · قوى الإنارة · تسليم المنشأة'),
    capacity_en = COALESCE(capacity_en, 'Municipal Sports Facility Upgrades'),
    capacity_ar = COALESCE(capacity_ar, 'تطوير ورفع كفاءة منشآت رياضية'),
    year = COALESCE(year, '2024'),
    region_en = COALESCE(region_en, 'Port Said, Egypt'),
    region_ar = COALESCE(region_ar, 'بورسعيد، مصر')
WHERE slug = 'al-marreikh-stadium-civil-mep';

-- Project: sisi-city-water-supply-network
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Al-Organi Group'),
    client_ar = COALESCE(client_ar, 'مجموعة العرجاني (أبناء سيناء)'),
    consultant_en = COALESCE(consultant_en, 'Sinai Infrastructure Engineering Committee'),
    consultant_ar = COALESCE(consultant_ar, 'لجنة الإشراف الهندسي على مشروعات سيناء'),
    scope_en = COALESCE(scope_en, 'Ductile Mains · HDPE Distribution · Valve Chambers · Disinfection Testing'),
    scope_ar = COALESCE(scope_ar, 'خطوط زهر مرن · شبكات HDPE · غرف محابس · غسيل وتعقيم واختبار'),
    capacity_en = COALESCE(capacity_en, 'Urban Potable Transmission & Distribution Network'),
    capacity_ar = COALESCE(capacity_ar, 'شبكة نقل وتوزيع مياه شرب حضرية متكاملة'),
    year = COALESCE(year, '2025'),
    region_en = COALESCE(region_en, 'Al-Salam City, North Sinai'),
    region_ar = COALESCE(region_ar, 'مدينة السلام، شمال سيناء')
WHERE slug = 'sisi-city-water-supply-network';

-- Project: north-sinai-dc-infrastructure
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Sinai Reconstruction Directorate & Engineering Authority'),
    client_ar = COALESCE(client_ar, 'جهاز تعمير سيناء والهيئة الهندسية'),
    consultant_en = COALESCE(consultant_en, 'Engineering Authority Supervision Bureau'),
    consultant_ar = COALESCE(consultant_ar, 'مكتب الإشراف الهندسي'),
    scope_en = COALESCE(scope_en, 'Utility Lines · Power Distribution · Reinforced Pads · Accelerated Handover'),
    scope_ar = COALESCE(scope_ar, 'خطوط مرافق · شبكات قوى · قواعد خرسانية · تسليم سريع'),
    capacity_en = COALESCE(capacity_en, 'Strategic Regional Utility Infrastructure'),
    capacity_ar = COALESCE(capacity_ar, 'بنية مرافق استراتيجية إقليمية'),
    year = COALESCE(year, '2025'),
    region_en = COALESCE(region_en, 'North Sinai'),
    region_ar = COALESCE(region_ar, 'شمال سيناء')
WHERE slug = 'north-sinai-dc-infrastructure';

-- Project: al-azhar-institute-minya
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Qabs Min Nour Charitable Foundation & Al-Azhar Al-Sharif'),
    client_ar = COALESCE(client_ar, 'جمعية قبس من نور الخيرية والأزهر الشريف'),
    consultant_en = COALESCE(consultant_en, 'Educational Facilities Consulting Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'هيئة استشارات الأبنية التعليمية'),
    scope_en = COALESCE(scope_en, 'Civil Structure · Architectural Fit-Out · Electrical Networks · Sanitary Plumbing'),
    scope_ar = COALESCE(scope_ar, 'هيكل خرساني · تشطيبات معمارية · شبكات كهرباء · سباكة وتغذية'),
    capacity_en = COALESCE(capacity_en, 'Educational & Community Facility Complex'),
    capacity_ar = COALESCE(capacity_ar, 'مجمع منشآت تعليمية ومجتمعية متكامل'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'Minya'),
    region_ar = COALESCE(region_ar, 'المنيا')
WHERE slug = 'al-azhar-institute-minya';

-- Project: abu-minqar-agricultural-farm-utilities
UPDATE public.projects
SET client_en = COALESCE(client_en, 'New Valley Agricultural Development Authority'),
    client_ar = COALESCE(client_ar, 'جهاز التنمية الزراعية بالوادي الجديد'),
    consultant_en = COALESCE(consultant_en, 'Groundwater & Agricultural Reclamation Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة المياه الجوفية واستصلاح الأراضي'),
    scope_en = COALESCE(scope_en, 'Deep Well Pumps · Pressurized Mains · Solar Hybrid Drives · Flow Calibration'),
    scope_ar = COALESCE(scope_ar, 'طلمبات آبار عميقة · خطوط ري مضغوطة · طاقة شمسية · معايرة تصرفات'),
    capacity_en = COALESCE(capacity_en, 'Deep Artesian Well & Irrigation Hub'),
    capacity_ar = COALESCE(capacity_ar, 'منظومة آبار ارتوازية وشبكات ري زراعي'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'Abu Minqar, New Valley'),
    region_ar = COALESCE(region_ar, 'أبو منقار، الوادي الجديد')
WHERE slug = 'abu-minqar-agricultural-farm-utilities';

-- Project: hayat-karima-health-unit
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Decent Life Initiative & Armed Forces Engineering Authority'),
    client_ar = COALESCE(client_ar, 'مبادرة حياة كريمة والهيئة الهندسية'),
    consultant_en = COALESCE(consultant_en, 'Ministry of Health Engineering Bureau'),
    consultant_ar = COALESCE(consultant_ar, 'الإدارة الهندسية لوزارة الصحة'),
    scope_en = COALESCE(scope_en, 'Civil Shell · Medical Fit-Out · Anti-Bacterial Plumbing · Emergency Power'),
    scope_ar = COALESCE(scope_ar, 'هيكل خرساني · تشطيبات طبية · سباكة معقمة · قوى طوارئ'),
    capacity_en = COALESCE(capacity_en, 'Presidential Decent Life Healthcare Clinic'),
    capacity_ar = COALESCE(capacity_ar, 'وحدة طب أسرة ريفية (حياة كريمة)'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'Upper Egypt Rural Sectors'),
    region_ar = COALESCE(region_ar, 'قطاعات ريف صعيد مصر')
WHERE slug = 'hayat-karima-health-unit';

-- Project: bianchi-resort-infrastructure-utilities
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Bianchi Tourism & Real Estate Development'),
    client_ar = COALESCE(client_ar, 'شركة بيانكي للتطوير السياحي والعقاري'),
    consultant_en = COALESCE(consultant_en, 'Coastal Resorts Engineering Advisory Group'),
    consultant_ar = COALESCE(consultant_ar, 'المجموعة الاستشارية لهندسة المنتجعات الساحلية'),
    scope_en = COALESCE(scope_en, 'Ring Mains · Gravity Sewer · Landscape Irrigation · Hydrostatic Certification'),
    scope_ar = COALESCE(scope_ar, 'شبكات حلقية · انحدار صرف · ري لاندسكيب · اختبارات هيدروليكية'),
    capacity_en = COALESCE(capacity_en, 'High-End Coastal Resort Utility Infrastructure'),
    capacity_ar = COALESCE(capacity_ar, 'بنية مرافق متطورة للمنتجعات الساحلية'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'North Coast, Matrouh'),
    region_ar = COALESCE(region_ar, 'الساحل الشمالي، مطروح')
WHERE slug = 'bianchi-resort-infrastructure-utilities';

-- Project: rural-egypt-wells-minya
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Egyptian Countryside Development Company'),
    client_ar = COALESCE(client_ar, 'شركة تنمية الريف المصري الجديد'),
    consultant_en = COALESCE(consultant_en, 'Groundwater Research & Technical Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'معهد بحوث المياه الجوفية'),
    scope_en = COALESCE(scope_en, 'Well Drilling · Submersible Pumps · Solar Inverters · Step-Drawdown Testing'),
    scope_ar = COALESCE(scope_ar, 'حفر وتجهيز آبار · طلمبات أعماق · مغيرات طاقة شمسية · اختبارات ضخ'),
    capacity_en = COALESCE(capacity_en, 'Deep Solar-Powered Artesian Wells'),
    capacity_ar = COALESCE(capacity_ar, 'آبار جوفية عميقة بمحطات ضخ شمسية'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'West Minya, Upper Egypt'),
    region_ar = COALESCE(region_ar, 'غرب المنيا، صعيد مصر')
WHERE slug = 'rural-egypt-wells-minya';

-- Project: palm-hills-infrastructure-utilities
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Palm Hills Developments'),
    client_ar = COALESCE(client_ar, 'شركة بالم هيلز للتعمير'),
    consultant_en = COALESCE(consultant_en, 'Premier Real Estate Infrastructure Advisory'),
    consultant_ar = COALESCE(consultant_ar, 'استشاريو المشروعات العقارية الكبرى'),
    scope_en = COALESCE(scope_en, 'Ductile Water Mains · Gravity Sewer · Storm Attenuation · CCTV Inspection'),
    scope_ar = COALESCE(scope_ar, 'خطوط مياه زهر · انحدار صرف · صرف أمطار · فحص تلفزيوني CCTV'),
    capacity_en = COALESCE(capacity_en, 'Luxury Residential Multi-Utility Infrastructure'),
    capacity_ar = COALESCE(capacity_ar, 'بنية مرافق متطورة للتجمعات السكنية الراقية'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'West Cairo, Giza'),
    region_ar = COALESCE(region_ar, 'غرب القاهرة، الجيزة')
WHERE slug = 'palm-hills-infrastructure-utilities';

-- Project: abu-zaabal-landfill-environmental-works
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Waste Management Regulatory Authority & Qalyubia'),
    client_ar = COALESCE(client_ar, 'جهاز تنظيم إدارة المخلفات ومحافظة القليوبية'),
    consultant_en = COALESCE(consultant_en, 'Environmental Geo-Engineering Advisory Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة الاستشارات الجيوبيئية والهندسية'),
    scope_en = COALESCE(scope_en, 'Geomembrane Lining · Perforated Leachate Pipes · Neutralization Sumps · Monitoring Wells'),
    scope_ar = COALESCE(scope_ar, 'تبطين جيوممبرين · مواسير رشيح مثقبة · بيارات تحييد · آبار مراقبة'),
    capacity_en = COALESCE(capacity_en, 'Environmental Containment & Leachate Drainage'),
    capacity_ar = COALESCE(capacity_ar, 'حماية بيئية وتجميع مياه رشيح متخصصة'),
    year = COALESCE(year, '2026'),
    region_en = COALESCE(region_en, 'Abu Zaabal, Qalyubia'),
    region_ar = COALESCE(region_ar, 'أبو زعبل، القليوبية')
WHERE slug = 'abu-zaabal-landfill-environmental-works';

-- Project: ameriya-cold-storage
UPDATE public.projects
SET client_en = COALESCE(client_en, 'Industrial Logistics & Cold Storage Complex'),
    client_ar = COALESCE(client_ar, 'مجمع الثلاجات والمشروعات اللوجستية الصناعية بالعامرية'),
    consultant_en = COALESCE(consultant_en, 'Armed Forces Engineering Authority Consulting Directorate'),
    consultant_ar = COALESCE(consultant_ar, 'إدارة المهندسين العسكريين — الهيئة الهندسية'),
    scope_en = COALESCE(scope_en, 'Process Cooling Loops · Water Distribution Network · Pressure Balancing · Commissioning'),
    scope_ar = COALESCE(scope_ar, 'دوائر التبريد للعمليات · شبكة التوزيع والضخ · موازنة الضغوط الهيدروليكية · التشغيل التجريبي'),
    capacity_en = COALESCE(capacity_en, 'Industrial Cooling & Water Distribution Loops'),
    capacity_ar = COALESCE(capacity_ar, 'دوائر تبريد عمليات وشبكات توزيع مياه متكاملة'),
    year = COALESCE(year, '2021'),
    region_en = COALESCE(region_en, 'Ameriya, Alexandria'),
    region_ar = COALESCE(region_ar, 'العامرية، الإسكندرية')
WHERE slug = 'ameriya-cold-storage';

COMMIT;

-- Verification query
SELECT id, slug, client_en, capacity_en, year, featured 
FROM public.projects 
LIMIT 5;
