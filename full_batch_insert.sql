-- ==========================================================================
-- INFEWORKS - FULL BATCH IMPORT & PUBLISH SCRIPT (30 REMAINING PROJECTS)
-- Idempotent SQL script to insert and publish the full legitimate portfolio
-- ==========================================================================

BEGIN;

-- Project: beni-suef-water-wastewater (INF-P-2020-001)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'beni-suef-water-wastewater', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-001. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'en', 'Beni Suef Potable Water & Wastewater Treatment Plants', 'Municipal water authorities in Beni Suef Governorate required regional water purification and wastewater treatment works to serve expanding rural and peri-urban populations.', 'Turnkey civil construction, electromechanical fit-out, filter trains, and commissioning delivered in-house under state authority supervision.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'ar', 'محطات تنقية مياه الشرب ومعالجة الصرف الصحي — بني سويف', 'احتاجت محافظة بني سويف إلى إنشاء وتجهيز محطات تنقية مياه شرب ومعالجة صرف صحي لخدمة التجمعات السكانية والريفية المتنامية.', 'تنفيذ الأعمال المدنية والكهروميكانيكية وخطوط الترشيح والتشغيل التجريبي بنجاح وتسليمها للجهات المالكة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 29.0661, 31.0994, 'Beni Suef Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a7ac9259-4ef5-53b6-9628-9cd021e9ad99', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a7ac9259-4ef5-53b6-9628-9cd021e9ad99', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'en', 'Water filtration trains and flocculation clarifiers constructed and commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'en', 'Biological and sedimentation wastewater treatment units delivered to standard specifications.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'en', 'Motor control centers (MCC) and instrumentation panels installed for plant automation.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'en', 'Comprehensive lab water quality analysis verified statutory potable and effluent limits.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'ar', 'إنشاء وتشغيل مراحل الفلترة والترويق لمنظومة تنقية مياه الشرب.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'ar', 'تنفيذ وحدات المعالجة البيولوجية والترسيب لمياه الصرف الصحي وفق المواصفات القياسية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'ar', 'توريد وتركيب لوحات التحكم في المحركات (MCC) وأجهزة القياس للمراقبة والتشغيل.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a7ac9259-4ef5-53b6-9628-9cd021e9ad99', 'ar', 'إجراء التحاليل المعملية المعتمدة للتحقق من مطابقة المياه المنتجة للمعايير القانونية.')
ON CONFLICT DO NOTHING;



-- Project: qibili-qarun-water-purification (INF-P-2020-002)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'qibili-qarun-water-purification', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-002. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'en', 'Qibili Qarun Water Purification Electromechanical Works', 'Agricultural and livestock production complexes in Qibili Qarun, Fayoum, required dedicated electromechanical systems to purify canal and well water under Contract 136-2019.', 'Supplied and installed deep-bed media filtration, chemical disinfection dosing systems, booster pumps, and electrical power panels.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'ar', 'الأعمال الكهروميكانيكية لتنقية المياه — قبلي قارون', 'تطلب مجمع الإنتاج الزراعي والحيواني بقبلي قارون بالفيوم تجهيز منظومات كهروميكانيكية لتنقية المياه بموجب عقد 136-2019.', 'توريد وتركيب فلاتر التنقية المتعددة الوسائط وأنظمة الحقن الكيميائي وطلمبات التغذية ولوحات التشغيل والتحكم.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 29.35, 30.55, 'Qibili Qarun, Fayoum Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'en', 'Executed mechanical and electrical installations under Contract 136-2019.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'en', 'Multi-stage sand and anthracite pressure filtration units installed and calibrated.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'en', 'Automated sodium hypochlorite dosing and chemical conditioning systems commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'en', 'Submersible supply pumps and electrical control panels integrated for 24/7 duty.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'ar', 'تنفيذ الأعمال الميكانيكية والكهربائية طبقاً لعقد مقاولة 136-2019.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'ar', 'تركيب ومعايرة فلاتر الرمل والأنثراسيت المضغوطة لتنقية المياه الخام.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'ar', 'تشغيل منظومة الحقن الكيميائي والتعقيم بالكلور لضمان سلامة المياه المنتجة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7ad05cd1-1cb9-5b5d-ad89-6fce1bea579c', 'ar', 'ربط طلمبات السحب الغاطسة ولوحات التحكم الكهربائية لضمان استمرارية التشغيل.')
ON CONFLICT DO NOTHING;



-- Project: multi-site-desalination-purification (INF-P-2020-003)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'multi-site-desalination-purification', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-003. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'en', 'Multi-Site Desalination & Water Purification Hubs', 'Dispersed regional operations across El Hamam, Qibili Qarun, New Valley, and Wadi El Natrun needed decentralized brackish RO desalination plants under Contract 136-2019 Compl. 1.', 'Fabricated, delivered, and commissioned skid-mounted RO trains and multi-media pre-treatment across all 4 governorate sites.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'ar', 'محطات تحلية وتنقية المياه متعددة المواقع — مكمل 1', 'تطلبت المواقع التنموية بالحمام وقبلي قارون والوادي الجديد ووادي النطرون محطات تحلية مياه بالتناضح العكسي بنظام مكمل 1 لعقد 136-2019.', 'تصنيع وتوريد وتشغيل وحدات التحلية المجمعة على شاسيهات متكاملة مع مراحل الفلترة الأولية في المواقع الأربعة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 29.5, 29.5, 'Multi-Site (Matrouh, Fayoum, New Valley, Beheira)')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '85e582f8-fba1-59b1-8318-ae8a98f3028d', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'en', 'Skid-mounted RO desalination units engineered and deployed across 4 governorates.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'en', 'Pre-treatment trains with dual-media filters and cartridge micro-filtration installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'en', 'Energy recovery devices and high-pressure stainless steel pump trains integrated.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'en', 'Comprehensive lab water verification delivered at each site handover.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'ar', 'تصميم وتوريد وحدات تحلية RO مدمجة في 4 محافظات مختلفة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'ar', 'تجهيز مراحل الفلترة الرملية والميكرونية لحماية الأغشية من الانسداد.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'ar', 'تركيب طلمبات الضغط العالي من الاستانلس ستيل المقاوم للأملاح.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('85e582f8-fba1-59b1-8318-ae8a98f3028d', 'ar', 'إجراء الفحوصات المعملية الشاملة للمياه المنتجة في كل موقع قبل التسليم.')
ON CONFLICT DO NOTHING;



-- Project: dairy-effluent-treatment-network (INF-P-2020-004)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'dairy-effluent-treatment-network', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-004. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'en', 'Multi-Site Dairy Effluent Wastewater Treatment Systems', 'Large-scale dairy farming facilities across El Hamam, Wadi Natrun, Sadat City, and Yesh discharged high-BOD wash water and organic effluent requiring specialized biological treatment under Contract 136-2019 Compl. 2.', 'Engineered and deployed anaerobic digestion, aeration basins, secondary clarifiers, and sludge handling facilities across all farm clusters.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'ar', 'محطات معالجة مياه صرف حلابات ومزارع الألبان — مكمل 2', 'أنتجت محالب ومزارع الألبان بالحمام ووادي النطرون والسادات ويشع مياه صرف محملة بأحمال عضوية عالية تطلبت معالجة متخصصة بعقد 136-2019 مكمل 2.', 'تنفيذ أحواض الترويق والتهوية والمعالجة البيولوجية ومنظومات نزح الحمأة وتدوير المياه المعالجة في مواقع المزارع.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 30.5, 30.2, 'Multi-Site Dairy Facilities (Beheira, Menoufia, Matrouh)')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '91d3b1af-0f35-5f31-a841-46f1b407107b', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'en', 'Biological and chemical wastewater treatment facilities built across 4 major livestock clusters.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'en', 'Grease interceptors and rotary screening mechanisms deployed for influent pre-treatment.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'en', 'Submerged aerators and biological digestion loops commissioned for BOD/COD reduction.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'en', 'Treated effluent quality lab-certified compliant for agricultural reuse and forestry irrigation.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'ar', 'إنشاء محطات معالجة بيولوجية وكيميائية في 4 مجمعات إنتاج حيواني كبرى.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'ar', 'تركيب مصافي فصل الشوائب وغرف عزل الزيوت والشحوم في مرحلة المعالجة الأولية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'ar', 'تشغيل هوايات التهوية وأحواض الأكسدة لخفض الأحمال العضوية والأكسجين الحيوي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('91d3b1af-0f35-5f31-a841-46f1b407107b', 'ar', 'اعتماد نتائج التحاليل المعملية للمياه المعالجة ومطابقتها لمعايير إعادة الاستخدام الزراعي.')
ON CONFLICT DO NOTHING;



-- Project: shubra-shahab-industrial-wastewater (INF-P-2020-005)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'shubra-shahab-industrial-wastewater', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-005. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'en', 'Shubra Shahab Industrial Wastewater Treatment Facility', 'Industrial agro-processing operations in Shubra Shahab, Qalyubia Governorate, required an advanced industrial effluent treatment plant to prevent environmental contamination and comply with law 48/1982.', 'Turnkey civil basins, physical-chemical treatment train, DAF system, and sludge pressing unit engineered and handed over.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'ar', 'محطة معالجة الصرف الصناعي — شبرا شهاب', 'تطلبت منشآت التصنيع الزراعي والصناعي بشبرا شهاب بمحافظة القليوبية محطة معالجة صرف صناعي مطابقة للضوابط البيئية والقانون 48 لسنة 1982.', 'تنفيذ الأعمال الإنشائية للأحواض ووحدات المعالجة الفيزيوكيميائية ونظام التعويم بالهواء المذاب (DAF) وتجفيف الحمأة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 30.265, 31.25, 'Shubra Shahab, Qalyubia Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '7befaf35-235d-5d3c-a6c9-4eaac33050f9', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'en', 'Dissolved air flotation (DAF) and chemical coagulation-flocculation trains installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'en', 'Reinforced concrete equalization and neutralization basins constructed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'en', 'Automated pH neutralization and chemical dosing skids commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'en', 'Effluent compliance verified through independent environmental laboratory audits.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'ar', 'تركيب منظومة التعويم بالهواء المذاب (DAF) ومراحل التخثير والترويق الكيميائي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'ar', 'إنشاء أحواض التجميع والمعادلة الهيدروليكية من الخرسانة المسلحة المعزولة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'ar', 'تشغيل وحدات الضبط الآلي للرقم الهيدروجيني (pH) ومنظومات الحقن الكيميائي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('7befaf35-235d-5d3c-a6c9-4eaac33050f9', 'ar', 'اعتماد مطابقة المياه المعالجة من خلال تقارير الفحص المعملي البيئي المستقل.')
ON CONFLICT DO NOTHING;



-- Project: marble-factory-desalination-plants (INF-P-2020-006)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'marble-factory-desalination-plants', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-006. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'en', 'Industrial Marble Factory Desalination & Process Water Plants', 'Heavy marble cutting and polishing complexes in Jafjaafa (Sinai), Minya, and Ras Sedr demanded continuous demineralized process water to protect high-precision cutting diamond gang saws from mineral scaling.', 'Supplied and commissioned high-capacity brackish water RO desalination trains, sediment pre-filtration, and closed-loop process water recycling.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'ar', 'محطات التحلية لمصانع الرخام — الجفجافة والمنيا ورأس سدر', 'تطلبت مجمعات تصنيع وتلميع الرخام بالجفجافة بسيناء والمنيا ورأس سدر مياه منزوعة الأملاح لحماية شفرات ومناشير القطع الدقيقة من التكلس.', 'توريد وتشغيل وحدات تحلية مياه عالية الكفاءة بالتناضح العكسي مع منظومات الفلترة وإعادة تدوير مياه العمليات المغلقة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 30.3, 33.4, 'Jafjaafa (Sinai), Minya & Ras Sedr')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'da860b21-697c-57b3-bfe5-de1269a485ad', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'en', 'Heavy-duty brackish water RO desalination trains installed at 3 major marble industrial hubs.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'en', 'High-capacity multi-media and cyclone sand separators deployed for cutting abrasive removal.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'en', 'Closed-circuit water recycling loops engineered to recover up to 85% of industrial process water.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'en', 'Automated PLC control panels with conductivity and pressure monitoring commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'ar', 'تركيب محطات تحلية بالتناضح العكسي للخدمة الشاقة في 3 مجمعات صناعية كبرى للرخام.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'ar', 'تجهيز فلاتر متعددة الأوساط وفواصل هيدروسيكلون لإزالة برادة الصخور والرواسب الخشنة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'ar', 'تصميم دوائر مغلقة لإعادة تدوير مياه التبريد واسترجاع حتى 85% من المياه المستهلكة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('da860b21-697c-57b3-bfe5-de1269a485ad', 'ar', 'تشغيل لوحات التحكم المبرمجة (PLC) المزودة بحساسات قياس الملوحة والضغوط الهيدروليكية.')
ON CONFLICT DO NOTHING;



-- Project: toshka-farm-potable-water-plant (INF-P-2020-007)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'toshka-farm-potable-water-plant', 'public', 'published', 'Imported in Full Batch integration from INF-P-2020-007. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'en', 'Toshka Agricultural Farm Potable Water Purification Facility', 'The presidential agricultural reclamation project in Toshka required an independent 150 m³/day drinking water purification station under Contract 115-2020 to supply residential farm communities in remote desert sectors.', 'Engineered, fabricated, and installed a compact 150 m³/day water treatment train complete with clarifiers, sand filters, UV disinfection, and distribution pumps.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'ar', 'محطة تنقية مياه الشرب بمزرعة توشكى (150 م³/يوم)', 'تطلب مشروع الاستصلاح الزراعي بتوشكى محطة تنقية مياه شرب مستقلة بطاقة 150 م³/يوم بعقد 115-2020 لتغذية التجمعات السكنية بالمزارع الصحراوية.', 'تصميم وتصنيع وتركيب وحدة تنقية مياه مدمجة بطاقة 150 م³/يوم مع أحواض الترويق وفلاتر الرمل والتعقيم بالأشعة فوق البنفسجية وطلمبات التوزيع.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 22.58, 31.55, 'Toshka Farm Sectors, Aswan')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'e73fd971-7aec-5ac2-b104-7f0da420da03', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'e73fd971-7aec-5ac2-b104-7f0da420da03', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'en', '150 m³/day compact drinking water purification station built under Contract 115-2020.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'en', 'Multi-stage coagulation, lamella clarification, and pressurized dual-media filtration installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'en', 'Ultraviolet (UV) disinfection reactor and chlorine residual dosing systems integrated.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'en', 'Treated potable water lab-certified compliant with Egyptian Ministry of Health standards.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'ar', 'إنشاء محطة مدمجة لتنقية مياه الشرب بطاقة 150 م³/يوم طبقاً لعقد 115-2020.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'ar', 'تجهيز مراحل التخثير والترويق بالصفائح المائلة (Lamella) والترشيح الرملي المضغوط.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'ar', 'تركيب منظومة التعقيم بالأشعة فوق البنفسجية (UV) والحقن النهائي للكلور المتبقي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e73fd971-7aec-5ac2-b104-7f0da420da03', 'ar', 'اعتماد المياه المنتجة معملياً ومطابقتها للمواصفات القياسية لوزارة الصحة المصرية.')
ON CONFLICT DO NOTHING;



-- Project: qibili-qarun-goat-farm-utilities (INF-P-2021-004)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'qibili-qarun-goat-farm-utilities', 'public', 'published', 'Imported in Full Batch integration from INF-P-2021-004. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'en', 'Qibili Qarun Goat Farm Water Supply & Drainage Networks', 'Developing a specialized livestock goat farm in Qibili Qarun, Fayoum, required complete site water supply networks, drinking troughs distribution, and wastewater drainage under Contract 48-2021.', 'Executed complete buried piping networks, livestock drinking manifolds, septic collection chambers, and hydraulic balancing.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'ar', 'أعمال التغذية والصرف لمزرعة الماعز — قبلي قارون', 'تطلب إنشاء مزرعة الماعز النموذجية بقبلي قارون بالفيوم تنفيذ شبكات تغذية المياه وأحواض الشرب وخطوط الصرف بعقد رقم 48-2021.', 'تنفيذ شبكات المواسير المدفونة وتفريعات التغذية لأحواض الشرب وخزانات التجميع والصرف الهيدروليكي المتوازن.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 29.36, 30.56, 'Qibili Qarun, Fayoum Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '692cf0dd-88e4-516c-93fa-0bdf4bf57447', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '692cf0dd-88e4-516c-93fa-0bdf4bf57447', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'en', 'Water distribution pipelines and automatic animal drinking valves installed under Contract 48-2021.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'en', 'Wastewater collection gravity lines and concrete holding sumps constructed across all sheds.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'en', 'Booster pressure pumping systems installed with automated low-water safety cutoffs.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'en', 'Pressure and leakage testing performed with consulting engineer sign-off.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'ar', 'تمديد شبكات توزيع المياه ومحابس التغذية التلقائية لأحواض الماشية طبقاً لعقد 48-2021.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'ar', 'إنشاء خطوط انحدار الصرف وبيارات التجميع الخرسانية لخدمة جميع العنابر.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'ar', 'تركيب مجموعات طلمبات رفع الضغط المزودة بحمايات انقطاع المياه والتشغيل الآلي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('692cf0dd-88e4-516c-93fa-0bdf4bf57447', 'ar', 'إجراء اختبارات الضغط والتسريب الهيدروليكية واعتمادها من استشاري المشروع.')
ON CONFLICT DO NOTHING;



-- Project: toshka-expanded-water-networks (INF-P-2021-006)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'toshka-expanded-water-networks', 'public', 'published', 'Imported in Full Batch integration from INF-P-2021-006. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'en', 'Toshka Expanded Water & Wastewater Station Packages', 'Rapid expansion of irrigated cropland in Toshka called for immediate supplemental water pumping and effluent handling stations across newly assigned desert parcels.', 'Constructed reinforced concrete pump sumps, installed high-volume vertical turbine pumps, and laid HDPE connection mains.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'ar', 'محطات المياه والصرف المستجدة — توشكى', 'تطلبت التوسعات الزراعية المتسارعة بتوشكى تنفيذ حزم إضافية لمحطات رفع المياه والتعامل مع مياه الصرف الزراعي بالقطع المستجدة.', 'إنشاء بيارات الطلمبات من الخرسانة المسلحة وتوريد وتركيب طلمبات الرفع الرأسية وتمديد خطوط الربط من البولي إيثيلين.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 22.6, 31.6, 'Toshka Agricultural Sector, Aswan')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '8bfda6d3-dd22-5061-904c-bbf6a4b894e6', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '8bfda6d3-dd22-5061-904c-bbf6a4b894e6', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '8bfda6d3-dd22-5061-904c-bbf6a4b894e6', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'en', 'Supplemental pumping station civil works and reinforced concrete wet wells constructed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'en', 'High-capacity vertical turbine and submersible pump sets installed and aligned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'en', 'HDPE and ductile iron discharge manifolds connected to primary irrigation canals.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'en', 'Electrical control gear with soft-starters and lightning protection commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'ar', 'تنفيذ الأعمال المدنية والبيارات الخرسانية لمحطات الرفع المستجدة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'ar', 'تركيب وضبط مجموعات طلمبات الرفع الرأسية والغاطسة عالية التصرف.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'ar', 'ربط خطوط الطرد من مواسير HDPE والزهر المرن بالقنوات وشبكات الري الرئيسية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8bfda6d3-dd22-5061-904c-bbf6a4b894e6', 'ar', 'تشغيل لوحات التوزيع الكهربائي المزودة ببادئات الحركة الناعمة (Soft Starters) ومانعات الصواعق.')
ON CONFLICT DO NOTHING;



-- Project: gas-egypt-stations-electromechanical (INF-P-2021-007)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'gas-egypt-stations-electromechanical', 'public', 'published', 'Imported in Full Batch integration from INF-P-2021-007. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'en', 'Gas Egypt Natural Gas Stations Electrical & Infrastructure Works', 'National natural gas expansion initiatives required specialized grounding, explosion-proof electrical installations, and civil service infrastructure across designated Gas Egypt fueling stations.', 'Delivered specialized deep-earth grounding systems, certified explosion-proof conduit wiring, control interlocks, and civil utility bays.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'ar', 'أعمال محطات غاز مصر — التجهيزات الكهروميكانيكية والتأريض', 'تطلبت مبادرة التوسع في محطات الغاز الطبيعي تنفيذ منظومات تأريض متخصصة وتجهيزات كهربائية مقاومة للانفجار بمحطات غاز مصر.', 'تنفيذ شبكات التأريض العميق والتمديدات الكهربائية المعزولة والمحمية ولوحات التحكم وأعمال الغرف والمسارات المدنية.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 30.05, 31.35, 'Greater Cairo & Regional Gas Stations')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'efef6aeb-2553-5ce6-baa0-1e22b84485e5', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'en', 'Deep earth grounding grids engineered and tested to achieve resistance < 1 Ohm.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'en', 'Explosion-proof electrical conduits and ATEX-certified fittings installed in hazardous zones.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'en', 'Automated gas valve emergency shutdown (ESD) control wiring integrated.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'en', 'Statutory safety and compliance certificates approved by gas sector authorities.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'ar', 'تنفيذ شبكات التأريض الكهربائي واختبارها لتحقيق مقاومة أقل من 1 أوم.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'ar', 'تركيب التمديدات الكهربائية المعتمدة والمقاومة للانفجار (ATEX) في المناطق الخطرة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'ar', 'ربط دوائر التحكم الآلي في محابس الإغلاق الطارئ (ESD) لخطوط الغاز.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('efef6aeb-2553-5ce6-baa0-1e22b84485e5', 'ar', 'اعتماد شهادات السلامة والمطابقة الفنية من جهات قطاع الغاز والبترول.')
ON CONFLICT DO NOTHING;



-- Project: shubra-shahab-technical-works (INF-P-2022-002)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'shubra-shahab-technical-works', 'public', 'published', 'Imported in Full Batch integration from INF-P-2022-002. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'en', 'Shubra Shahab Plant Scope Adjustments & Technical Upgrades', 'Modifications in industrial processing volumes at the Shubra Shahab complex necessitated supplemental hydraulic works, valve chamber revisions, and verified technical variation delivery.', 'Executed auxiliary piping adjustments, reinforced chamber modifications, and documented all variation items with consultant approval.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'ar', 'التعديلات والتجهيزات الفنية التكميلية — شبرا شهاب', 'استدعت التعديلات التشغيلية بمجمع شبرا شهاب تنفيذ أعمال هيدروليكية تكميلية وتعديل غرف المحابس والمسارات الفنية.', 'تنفيذ أعمال تعديل الخطوط وغرف المحابس الخرسانية واعتماد الحصر والمستخلصات الفنية مع استشاري المشروع.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 30.265, 31.25, 'Shubra Shahab, Qalyubia Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '06ee25be-0594-57fb-ae55-db4878ef32d9', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'en', 'Hydraulic bypass piping and diversion chambers constructed without stopping plant operations.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'en', 'Supplemental ductile iron isolation valves and motorized actuators installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'en', 'Field inspection reports and technical variation quantities formally certified.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'en', 'Final technical handover documentation approved by supervising engineers.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'ar', 'تنفيذ خطوط التحويل الهيدروليكي والغرف الملحقة دون إيقاف تشغيل المحطة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'ar', 'تركيب محابس قفل إضافية من الزهر المرن ومحركات تشغيل كهربية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'ar', 'اعتماد محاضر الفحص الفني وكشوف الحصر التكميلية رسمياً مع الاستشاري.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('06ee25be-0594-57fb-ae55-db4878ef32d9', 'ar', 'إتمام محاضر التسليم النهائي المعتمدة من طاقم المهندسين المشرفين.')
ON CONFLICT DO NOTHING;



-- Project: toshka-reclamation-pumping-package (INF-P-2022-003)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'toshka-reclamation-pumping-package', 'public', 'published', 'Imported in Full Batch integration from INF-P-2022-003. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'en', 'Toshka Agricultural Reclamation Pumping Stations (Contract 39-2022)', 'National strategic wheat and crop cultivation in Toshka called for the turnkey construction of 2 high-capacity booster water pumping and drainage stations under Contract 39-2022.', 'Completed civil station structures, installed horizontal and vertical pump sets, built intake screening, and commissioned automated SCADA controls.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'ar', 'محطات مياه وصرف توشكى للاستصلاح الزراعي (عقد 39-2022)', 'تطلب مشروع زراعة المحاصيل الاستراتيجية والقمح بتوشكى إنشاء محطتي رفع مياه وصرف زراعي متكاملتين بموجب عقد رقم 39-2022.', 'إنجاز الأعمال الإنشائية للمحطات وتوريد وتركيب مجموعات الضخ الأفقية والرأسية والمصافي الميكانيكية وأنظمة التحكم سكادا.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 22.52, 31.45, 'Toshka Project Zone, Aswan')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0afa23fe-2a6c-54c1-8f21-74917d864806', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0afa23fe-2a6c-54c1-8f21-74917d864806', id FROM public.capabilities WHERE slug = 'irrigation'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0afa23fe-2a6c-54c1-8f21-74917d864806', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'en', 'Turnkey delivery of 2 regional pumping stations executed under Contract 39-2022.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'en', 'Heavy-duty split-case and vertical booster pump assemblies installed on reinforced footings.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'en', 'Automated trash rake screens and intake debris protection mechanisms commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'en', 'Witnessed 72-hour continuous performance test completed under maximum agricultural load.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'ar', 'تنفيذ محطتي رفع مياه زراعية متكاملتين طبقاً لعقد مقاولة 39-2022.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'ar', 'تركيب مجموعات طلمبات الضخ والتعزيز للخدمة الشاقة على قواعد خرسانية مسلحة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'ar', 'تشغيل المصافي الميكانيكية وشبكات حجز الشوائب لحماية الطلمبات من الانسداد.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0afa23fe-2a6c-54c1-8f21-74917d864806', 'ar', 'إجراء اختبارات التشغيل المستمر لمدة 72 ساعة متواصلة تحت أقصى حمل زراعي بنجاح.')
ON CONFLICT DO NOTHING;



-- Project: capital-island-infrastructure (INF-P-2023-001)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'capital-island-infrastructure', 'public', 'published', 'Imported in Full Batch integration from INF-P-2023-001. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'en', 'Capital Island Urban Utilities & Infrastructure Package', 'Developing the high-profile Capital Island commercial and administrative precinct required unified multi-utility infrastructure encompassing water distribution, wastewater collection, and electrical duct banks.', 'Constructed trunk utility networks, reinforced valve and manhole chambers, and integrated site connections on an accelerated handover program.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'ar', 'أعمال البنية التحتية والمرافق — جزيرة العاصمة', 'تطلب مشروع جزيرة العاصمة الإداري والتجاري تنفيذ شبكات مرافق متكاملة تشمل خطوط تغذية المياه والصرف الصحي والمسارات الكهربائية.', 'تنفيذ خطوط المرافق الرئيسية وبناء غرف المحابس والمطابق الخرسانية والربط على الشبكات العمومية بجدول زمني مضغوط.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 30.02, 31.7, 'New Administrative Capital, Cairo')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '083a4c8c-d8f9-5821-a52d-dd43fd9c8174', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '083a4c8c-d8f9-5821-a52d-dd43fd9c8174', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '083a4c8c-d8f9-5821-a52d-dd43fd9c8174', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'en', 'Potable water distribution trunk mains and secondary branches supplied and installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'en', 'Gravity sewer lines and storm drainage catchpits built to capital authority specifications.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'en', 'Underground electrical duct banks and concrete pull boxes delivered across all road sectors.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'en', 'Hydrostatic pressure and compaction tests certified by third-party inspection authorities.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'ar', 'توريد وتمديد خطوط التغذية الرئيسية والفرعية لشبكة مياه الشرب.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'ar', 'إنشاء خطوط انحدار الصرف الصحي وغرف تصريف الأمطار طبقاً لمواصفات جهاز العاصمة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'ar', 'تنفيذ مسارات الكابلات الكهربائية الأرضية وغرف السحب الخرسانية على امتداد الطرق.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('083a4c8c-d8f9-5821-a52d-dd43fd9c8174', 'ar', 'اعتماد اختبارات الضغط الهيدروليكي ودمك التربة من جهات الفحص والاستشارات المعتمدة.')
ON CONFLICT DO NOTHING;



-- Project: toshka-pumping-basket-screens (INF-P-2023-002)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'toshka-pumping-basket-screens', 'public', 'published', 'Imported in Full Batch integration from INF-P-2023-002. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'en', 'Toshka Pumping Pit Heavy-Duty Basket Screen Assemblies', 'Desert sand, organic debris, and floating vegetation caused recurrent clogging in deep pumping station wet wells across Toshka agricultural lift hubs.', 'Engineered, fabricated, and installed heavy-duty stainless steel basket screens with custom mechanical lifting guide rails and hoists.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'ar', 'المصافي السلية لبيارات محطات ضخ توشكى (Basket Screens)', 'تسببت الرمال والرواسب والنباتات العالقة في انسداد متكرر لبيارات محطات الرفع الزراعي العميقة بمشروع توشكى.', 'تصميم وتصنيع وتركيب مصافي سلية (Basket Screens) من الصلب المقاوم للصدأ مع مسارات التوجيه والونش الميكانيكي للرفع والتنظيف.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 22.5, 31.4, 'Toshka Pumping Hubs, Aswan')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '65126870-18a4-59f4-a96e-e4818bcf191c', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '65126870-18a4-59f4-a96e-e4818bcf191c', id FROM public.capabilities WHERE slug = 'irrigation'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'en', 'Heavy-gauge stainless steel 304/316 basket screen assemblies custom-fabricated and installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'en', 'Integrated dual-rail mechanical guide systems and motorized lifting hoists commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'en', 'Dramatically reduced pump impeller fouling and unscheduled maintenance downtime across stations.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'en', 'Corrosion-resistant epoxy coatings applied on all supporting steel framing and anchorages.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'ar', 'تصنيع وتوريد مصافي سلية من الاستانلس ستيل 304/316 للخدمة الشاقة مطابقة لأبعاد البيارات.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'ar', 'تركيب مسارات التوجيه الميكانيكية المزدوجة مع أوناش الرفع الكهربائية لتسهيل أعمال الصيانة والتفريغ.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'ar', 'تحقيق حماية كاملة لريش الطلمبات وخفض فترات التوقف والأعطال الطارئة في المحطات.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('65126870-18a4-59f4-a96e-e4818bcf191c', 'ar', 'دهان الهياكل الحاملة والمثبتات بمواد إيبوكسية عالية المقاومة للتآكل والصدأ.')
ON CONFLICT DO NOTHING;



-- Project: infrastructure-sand-procurement (INF-P-2024-001)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'infrastructure-sand-procurement', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-001. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'en', 'Strategic Graded Sand & Filter Media Supply Works', 'Large-scale pipeline bedding and water purification projects across regional infrastructure sites required high-purity graded sand and filter aggregates compliant with engineering standards.', 'Sourced, lab-tested, and supplied thousands of metric tons of graded silica sand and trench bedding material on tight delivery timelines.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'ar', 'توريدات رمال الفلترة وطبقات التأسيس الاستراتيجية', 'تطلبت مشروعات خطوط الأنابيب ومحطات التنقية توريد كميات ضخمة من رمال السيليكا المتدرجة وطبقات التأسيس المطابقة للاشتراطات الفنية.', 'توريد وفحص واختبار آلاف الأطنان من رمال السيليكا النقية ورمال التأسيس النظيفة وتسليمها لمواقع المشروعات.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 30.5, 31.5, 'Regional Infrastructure Sites, Egypt')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '8cfdd9bd-e265-5c88-b6be-daeff342c440', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '8cfdd9bd-e265-5c88-b6be-daeff342c440', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'en', 'Supplied certified silica filter sand meeting AWWA B100 standards for water treatment plants.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'en', 'Graded bedding sand delivered for high-diameter HDPE and ductile iron pipeline trenches.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'en', 'Sieve analysis and grain uniformity testing verified by university soil laboratories.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'en', 'Logistical dispatch fleet managed to maintain continuous zero-delay site supply.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'ar', 'توريد رمال سيليكا معتمدة مطابقة لمواصفات AWWA B100 لمحطات تنقية المياه.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'ar', 'توريد رمال التأسيس والفرش النظيفة لخطوط المواسير الكبرى من HDPE والزهر المرن.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'ar', 'إجراء تحاليل التدرج الحبيبي ومعامل الانتظام في المعامل الهندسية المتخصصة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('8cfdd9bd-e265-5c88-b6be-daeff342c440', 'ar', 'إدارة أسطول النقل اللوجستي لضمان استمرارية التوريد للمواقع دون أي تأخير.')
ON CONFLICT DO NOTHING;



-- Project: cargas-grounding-systems (INF-P-2024-002)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'cargas-grounding-systems', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-002. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'en', 'Cargas Natural Gas Stations Deep Earth Grounding & Safety Systems', 'CNG conversion and fast-fueling stations operated by Cargas required high-reliability earth grounding and surge protection networks to guarantee explosion safety and electrical equipment protection.', 'Engineered deep earth ground electrode systems, installed copper busbars, and certified lightning dissipation across multiple retail gas stations.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'ar', 'تأريض وحماية محطات كارجاس للغاز الطبيعي', 'تطلبت محطات تموين السيارات بالغاز الطبيعي التابعة لشركة كارجاس منظومات تأريض عالي الكفاءة وحماية ضد الصواعق لضمان أعلى درجات الأمان.', 'تصميم وتنفيذ آبار وشبكات التأريض العميق بالقضبان النحاسية وشبكات الربط المتساوي للجهد واعتماد المقاومة الكهربائية.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 30.1, 31.3, 'Cargas Station Network, Greater Cairo')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'b672fa47-ce2c-5035-acff-2e2b7aa1cc67', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'en', 'Deep earth grounding wells drilled with copper-clad electrode rods and earth enhancement compound.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'en', 'Equipotential bonding grids installed connecting fuel dispensers, compressors, and canopy steel.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'en', 'Earth resistance measured and certified below 2.0 Ohms across all station nodes.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'en', 'Transient voltage surge suppressors (TVSS) integrated to safeguard electronic telemetry.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'ar', 'تنفيذ آبار التأريض العميق بقضبان النحاس المعالجة ومواد تحسين التوصيل الأرضي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'ar', 'إنشاء شبكة الربط المتساوي للجهد لربط الموزعات وضواغط الغاز والهياكل المعدنية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'ar', 'قياس مقاومة التأريض واعتمادها رسمياً بقيم أقل من 2.0 أوم في جميع نقاط المحطة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b672fa47-ce2c-5035-acff-2e2b7aa1cc67', 'ar', 'تركيب أجهزة الحماية من التيارات والجهود العابرة (TVSS) لحماية أنظمة المراقبة الإلكترونية.')
ON CONFLICT DO NOTHING;



-- Project: date-palm-cold-storage-mep (INF-P-2024-004)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'date-palm-cold-storage-mep', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-004. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'en', 'Date Palm Agro-Industrial Cold Storage Infrastructure', 'A strategic date processing and cold storage facility required specialized process cooling water, fire suppression water storage, and central electrical distribution.', 'Supplied and installed industrial process water distribution loops, chilled water circulation, fire pump sets, and electrical control panels.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'ar', 'البنية التحتية والخدمات الكهروميكانيكية لمجمع ثلاجات التمور', 'تطلب مجمع تصنيع وتخزين التمور الاستراتيجي شبكات مياه تبريد صناعية ومنظومة إطفاء حريق ولوحات توزيع قوى متطورة.', 'تنفيذ دوائر مياه التبريد الصناعية وشبكات مكافحة الحريق وطلمبات التغذية ولوحات التحكم الكهربائي للمجمع.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 25.45, 30.55, 'New Valley Governorate, Egypt')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'en', 'Industrial cooling process loops engineered to sustain continuous cold storage duty.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'en', 'Dedicated fire protection water storage and UL/FM-style fire pump sets installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'en', 'Low-voltage electrical switchboards and emergency backup power interlocks commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'en', 'Pressure balancing and automated temperature regulation systems verified.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'ar', 'تصميم وتمديد دوائر مياه التبريد للعمليات للحفاظ على درجات الحرارة داخل الثلاجات.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'ar', 'إنشاء خزانات مياه مكافحة الحريق ومجموعات طلمبات الإطفاء المعتمدة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'ar', 'تركيب لوحات التوزيع الكهربائي الرئيسية وأنظمة التحويل التلقائي للطوارئ (ATS).')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a4aed25d-c3f2-5b5b-a7db-1ee5e0057d3d', 'ar', 'موازنة الضغوط الهيدروليكية وضبط حساسات التحكم الآلي في درجات الحرارة.')
ON CONFLICT DO NOTHING;



-- Project: manshiyat-nasser-pumping-station (INF-P-2024-006)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'manshiyat-nasser-pumping-station', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-006. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'en', 'New Manshiyat Nasser Sewage Pumping Station', 'The urban re-development sector of New Manshiyat Nasser required a high-capacity sewage lift station to lift wastewater across significant elevation heads into the municipal trunk collector.', 'Constructed deep civil pump wells, installed heavy-duty non-clog submersible pumps, valve chambers, and automated PLC control systems.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'ar', 'محطة رفع الصرف الصحي — منشأة ناصر الجديدة', 'تطلب قطاع التطوير العمراني بمنشأة ناصر الجديدة إنشاء محطة رفع صرف صحي رئيسية لنقل مياه الصرف بفارق مناسيب عالي إلى الخط المجمع العمومي.', 'إنشاء البيارة العميقة وغرفة المحابس الخرسانية وتوريد وتركيب طلمبات الصرف الغاطسة غير القابلة للانسداد ولوحات التحكم PLC.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 30.045, 31.285, 'New Manshiyat Nasser, Cairo Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0044e8b3-ad47-5d0e-8be0-0e373cf0c186', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0044e8b3-ad47-5d0e-8be0-0e373cf0c186', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'en', 'Deep circular wet well constructed with reinforced concrete and protective interior epoxy liner.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'en', 'Submersible non-clog wastewater pumps with dual standby redundancy installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'en', 'Ductile iron check valves, knife gate valves, and electromagnetic flowmeter commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'en', 'Automated ultrasonic level controllers and SCADA telemetry integrated.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'ar', 'إنشاء البيارة الدائرية العميقة من الخرسانة المسلحة وعزلها داخلياً بالإيبوكسي المقاوم للأحماض.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'ar', 'تركيب طلمبات الصرف الصحي الغاطسة المقاومة للانسداد مع وجود وحدات احتياطية كاملة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'ar', 'تجهيز غرف المحابس بمحابس عدم الرجوع ومحابس السكينة وعداد قياس التصرف الكهرومغناطيسي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0044e8b3-ad47-5d0e-8be0-0e373cf0c186', 'ar', 'تشغيل منظومة التحكم الآلي بالموجات فوق الصوتية والربط على شبكة سكادا المركزية.')
ON CONFLICT DO NOTHING;



-- Project: nuweiba-infrastructure-works (INF-P-2024-007)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'nuweiba-infrastructure-works', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-007. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'en', 'Nuweiba Coastal Infrastructure & Water Distribution Package', 'Coastal development and port logistics in Nuweiba, South Sinai, required reinforced water transmission piping and booster capacity designed for harsh marine saline soil conditions.', 'Delivered corrosion-resistant HDPE water supply pipelines, booster pressure stations, and sectional isolation valve chambers.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'ar', 'أعمال البنية التحتية وتوزيع المياه — نويبع', 'تطلب التطوير الساحلي واللوجستي بنويبع بجنوب سيناء خطوط نقل مياه معززة ومحطات تعزيز ضغط تتحمل الطبيعة الملحية الصعبة للتربة الساحلية.', 'تنفيذ خطوط نقل مياه الشرب من مواسير HDPE عالية الكثافة ومحطات تقوية الضغوط وغرف المحابس العازلة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 29.03, 34.66, 'Nuweiba Coastal Sector, South Sinai')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '497f0e47-fcf5-5672-be25-dd034a715235', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '497f0e47-fcf5-5672-be25-dd034a715235', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'en', 'High-density polyethylene (HDPE) water transmission mains butt-fusion welded and laid.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'en', 'Reinforced concrete valve chambers protected with hot-applied bituthene membrane waterproofing.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'en', 'Pressure booster pumps and hydropneumatic surge dampening tanks commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'en', 'Witnessed hydrostatic pressure testing certified at 1.5x nominal working pressure.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'ar', 'تمديد ولحام خطوط نقل المياه من مواسير البولي إيثيلين عالي الكثافة (HDPE) باللحام الحراري.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'ar', 'إنشاء غرف المحابس الخرسانية وعزلها بأغشية البيتومين الساخن المقاوم للأملاح.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'ar', 'تركيب طلمبات تقوية الضغوط وخزانات التخميد الهيدروليكي للحماية من المطرقة المائية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('497f0e47-fcf5-5672-be25-dd034a715235', 'ar', 'إجراء اختبارات الضغط الهيدروليكي المعتمدة عند 1.5 ضعف ضغط التشغيل الاسمي.')
ON CONFLICT DO NOTHING;



-- Project: future-of-egypt-potato-storage-softener (INF-P-2024-008)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'future-of-egypt-potato-storage-softener', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-008. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'en', 'Future of Egypt Potato Cold Storage Water Softener & Cooling Trains', 'The massive potato cold-storage complex at Future of Egypt Agricultural Project suffered from calcium and magnesium hardness in cooling tower feed water, threatening ammonia refrigeration efficiency.', 'Supplied, installed, and commissioned an automated multi-train ion-exchange water softener system producing up to 8 m³/hr softening capacity with brine regeneration.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'ar', 'محطة معالجة وتليين المياه لثلاجات البطاطس — جهاز مستقبل مصر', 'عانى مجمع ثلاجات البطاطس بمشروع مستقبل مصر الزراعي من عسر مياه التبريد وترسب الكالسيوم والمغنيسيوم على أبراج تبريد محطة الأمونيا.', 'توريد وتركيب وتشغيل وحدات إزالة عسر المياه (Water Softener) بالتبادل الأيوني بطاقة تصل إلى 8 م³/ساعة مع خزانات المحلول الملحي.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 30.15, 30.35, 'Future of Egypt Project, Dabaa Corridor')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0e525c2e-7743-5f14-8c56-fda49df6e3e2', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '0e525c2e-7743-5f14-8c56-fda49df6e3e2', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'en', 'Industrial ion-exchange water softening vessels (24"x72" fiberglass) installed with 250L cationic resin media.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'en', 'Automated multi-port control valves calibrated for scheduled backwash and brine regeneration cycles.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'en', 'Polyethylene brine preparation tanks and chemical conditioning skids commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'en', 'Zero-hardness effluent verified, preventing scale formation across cooling tower evaporators.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'ar', 'تركيب اسطوانات التبادل الأيوني من الفايبرجلاس (24×72 بوصة) المحملة بـ 250 لتر من حبيبات الريزن.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'ar', 'برمجة ومعايرة صمامات التحكم متعددة المراحل لضبط دورات الغسيل العكسي وإعادة الشحن بالملح.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'ar', 'تجهيز خزانات المحلول الملحي ومهمات الحقن الكيميائي لضمان الكفاءة المستمرة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('0e525c2e-7743-5f14-8c56-fda49df6e3e2', 'ar', 'التحقق معملياً من إزالة عسر المياه تماماً لحماية أبراج التبريد ومكثفات الأمونيا من التكلس.')
ON CONFLICT DO NOTHING;



-- Project: al-marreikh-stadium-civil-mep (INF-P-2024-009)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'al-marreikh-stadium-civil-mep', 'public', 'published', 'Imported in Full Batch integration from INF-P-2024-009. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'en', 'Al-Marreikh Sports Stadium Efficiency Upgrade & Civil-MEP Works', 'Al-Marreikh Stadium in Port Said required comprehensive renovation of spectator civil structures, turf drainage networks, and floodlighting electrical distribution.', 'Executed civil concrete repair, sub-pitch drainage installation, main distribution switchboards, and floodlight feeder upgrades.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'ar', 'رفع كفاءة وتطوير ملعب نادي المريخ البورسعيدي', 'تطلب ملعب نادي المريخ البورسعيدي تطوير البنية التحتية الرياضية وصيانة المدرجات الخرسانية وشبكات تصريف أرضية الملعب والإنارة.', 'تنفيذ أعمال الترميم الإنشائي وتمديد شبكات تصريف المياه لأرضية الملعب وتحديث لوحات التغذية الكهربائية لأبراج الإنارة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 31.26, 32.3, 'Port Said City, Port Said Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '17935913-ec9a-566b-82ff-ce6e71a1c0cf', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'en', 'Structural concrete repairs and anti-carbonation protective coatings applied across stands.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'en', 'Perforated sub-surface drainage network laid beneath stadium pitch for rapid storm runoff.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'en', 'Heavy-duty power distribution panels and cabling installed for high-intensity floodlighting.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'en', 'Facility handed over on schedule compliant with Egyptian Youth & Sports Ministry codes.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'ar', 'إجراء الترميمات الإنشائية للمدرجات وتطبيق دهانات الحماية الخرسانية المقاومة للكربنة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'ar', 'تمديد شبكات تصريف المياه المثقبة أسفل أرضية الملعب لتصريف مياه الأمطار بسرعة فائقة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'ar', 'توريد وتركيب لوحات التوزيع الرئيسية والكابلات المغذية لأبراج الإنارة الكاشفة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('17935913-ec9a-566b-82ff-ce6e71a1c0cf', 'ar', 'تسليم المشروع بجدول زمني منضبط ومطابق لكود وزارة الشباب والرياضة المصرية.')
ON CONFLICT DO NOTHING;



-- Project: sisi-city-water-supply-network (INF-P-2025-004)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'sisi-city-water-supply-network', 'public', 'published', 'Imported in Full Batch integration from INF-P-2025-004. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'en', 'Al-Sisi City Strategic Potable Water Supply & Distribution Network', 'Providing permanent potable water supply across the extensive development zones of Al-Sisi City in North Sinai demanded high-pressure transmission mains, storage reservoir interties, and neighborhood distribution loops under Contract 2025-Water.', 'Supplied, laid, and hydrostatically tested high-diameter ductile iron and HDPE water mains with air/gate valve chambers and booster connections.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'ar', 'شبكة التغذية بمياه الشرب وخطوط النقل — مدينة السيسي (عقد المياه)', 'تطلب إمداد مدينة السيسي بشمال سيناء بمياه الشرب تنفيذ خطوط نقل رئيسية وشبكات توزيع فرعية والربط مع الخزانات الاستراتيجية بموجب عقد المياه.', 'توريد وتركيب واختبار خطوط مياه الشرب من الزهر المرن وHDPE بأقطار متعددة وإنشاء غرف المحابس والربط مع محطات الضخ.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 31.25, 34.15, 'Al-Sisi City, North Sinai')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'ab0c289e-7195-54d0-bc61-7670118cf0cd', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'ab0c289e-7195-54d0-bc61-7670118cf0cd', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'en', 'Large-diameter potable water transmission mains laid across primary urban corridors under Contract 2025-Water.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'en', 'High-density polyethylene (HDPE) secondary distribution network installed serving residential sectors.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'en', 'Reinforced concrete valve chambers equipped with air valves, gate valves, and pressure reducing stations.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'en', 'Full-system chlorination, disinfection, and pressure testing certified by water authority inspectors.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'ar', 'تمديد خطوط النقل الرئيسية لمياه الشرب بأقطار كبرى في المحاور الحيوية بموجب عقد المياه 2025.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'ar', 'تنفيذ شبكات التوزيع الفرعية من مواسير HDPE عالية الكثافة لخدمة القطاعات السكنية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'ar', 'إنشاء غرف المحابس الخرسانية المسلحة وتجهيزها بمحابس الهواء ومحابس القفل ومنظومات تخفيض الضغط.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('ab0c289e-7195-54d0-bc61-7670118cf0cd', 'ar', 'غسيل وتعقيم واختبار كامل الخطوط والشبكات هيدروليكياً واعتمادها رسمياً من شركة مياه الشرب.')
ON CONFLICT DO NOTHING;



-- Project: north-sinai-dc-infrastructure (INF-P-2025-005)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'north-sinai-dc-infrastructure', 'public', 'published', 'Imported in Full Batch integration from INF-P-2025-005. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'en', 'North Sinai Strategic Regional DC Infrastructure Projects', 'Strategic defense and community reconstruction sectors across North Sinai required rapid-deployment utility infrastructure, power feeds, and water security networks under rigorous operational conditions.', 'Executed rapid-response civil earthworks, utility piping installations, power transmission connections, and certified handover.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'ar', 'مشاريع البنية التحتية الاستراتيجية — شمال سيناء (DC)', 'تطلبت القطاعات الاستراتيجية ومحاور التعمير بشمال سيناء تنفيذ أعمال بنية تحتية سريعة لشبكات المياه والطاقة والخدمات الميدانية.', 'تنفيذ أعمال الحفر والتمهيد ومد خطوط التغذية بالمياه وتوصيلات الطاقة الكهربائية وتسليم المشروعات بمسؤولية كاملة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 31.1, 33.8, 'North Sinai Regional Corridor')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a41451c0-d492-5b14-aa6f-c1f7e6b33885', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a41451c0-d492-5b14-aa6f-c1f7e6b33885', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'en', 'Rapid-deployment utility piping and water storage systems constructed across strategic regional hubs.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'en', 'Power feeder cables, distribution kiosks, and protective earthing networks delivered.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'en', 'Heavy civil foundations and reinforced equipment pads cast under accelerated site schedules.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'en', 'Continuous quality control and military engineering inspection compliance certified.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'ar', 'تنفيذ شبكات المرافق وخزانات التكديس الميدانية في المحاور الاستراتيجية بشمال سيناء.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'ar', 'تمديد كابلات التغذية الكهربائية وتركيب أكشاك التوزيع وشبكات التأريض الوقائي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'ar', 'صب القواعد الخرسانية المسلحة لحمل المعدات بجدول زمني مكثف ومضبوط.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a41451c0-d492-5b14-aa6f-c1f7e6b33885', 'ar', 'اعتماد الفحوصات الفنية ومحاضر الاستلام من إدارة المهندسين العسكريين.')
ON CONFLICT DO NOTHING;



-- Project: al-azhar-institute-minya (INF-P-2026-001)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'al-azhar-institute-minya', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-001. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'en', 'Al-Azhar Educational Institute & Community Complex — Minya', 'Constructing a comprehensive religious and educational institute in Minya Governorate for the Qabs Min Nour Initiative required multi-story reinforced concrete structures, educational MEP fit-out, and sanitary infrastructure.', 'Executed complete turnkey civil skeleton, classroom architectural fit-out, electrical distribution, fire alarms, and sanitary plumbing systems.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'ar', 'المعهد الأزهري بالمنيا — مبادرة قبس من نور', 'تطلب إنشاء مجمع المعهد الأزهري التعليمي بمحافظة المنيا ضمن مبادرة قبس من نور تنفيذ الهيكل الخرساني والتشطيبات وشبكات الكهرباء والسباكة.', 'تنفيذ أعمال الهيكل الخرساني المسلح والتشطيبات المعمارية للفصول وتمديد الشبكات الكهربائية وأنظمة الإنذار والسباكة المتكاملة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 28.1, 30.75, 'Minya Governorate, Upper Egypt')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'd60390a1-b9a7-5f3e-91e3-cabd67d59bef', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'en', 'Multi-story reinforced concrete structural frame and slab engineering executed to code.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'en', 'Educational facility electrical power distribution, LED lighting, and emergency fire alarm installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'en', 'Potable water supply piping, sanitary fixtures, and rooftop storage tanks commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'en', 'Project delivered on schedule and handed over to educational regulatory bodies.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'ar', 'تنفيذ الهيكل الخرساني المسلح متعدد الطوابق والأسقف طبقاً للكود المصري للمنشآت.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'ar', 'تركيب شبكات القوى الكهربائية والإنارة الموفرة (LED) وأنظمة الإنذار ضد الحريق.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'ar', 'تمديد شبكات مياه الشرب وتركيب الأطقم الصحية وخزانات المياه العلوية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('d60390a1-b9a7-5f3e-91e3-cabd67d59bef', 'ar', 'تسليم المعهد التعليمي بجدول زمني قياسي واعتماده من الجهات التعليمية المشرفة.')
ON CONFLICT DO NOTHING;



-- Project: abu-minqar-agricultural-farm-utilities (INF-P-2026-002)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'abu-minqar-agricultural-farm-utilities', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-002. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'en', 'Abu Minqar Agricultural Farm Irrigation & Deep Well Systems', 'Desert reclamation in the remote oasis of Abu Minqar (New Valley) required deep groundwater extraction, booster pumping hubs, and pressurized drip irrigation networks.', 'Equipped deep artesian wells, installed solar/diesel booster pump stations, and laid extensive buried irrigation distribution networks.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'ar', 'شبكات الري والآبار العميقة لمزرعة أبو منقار — الوادي الجديد', 'تطلب مشروع الاستصلاح الزراعي بواحة أبو منقار النائية بالوادي الجديد استخراج المياه الجوفية العميقة وتجهيز محطات الضخ وشبكات الري بالرش والتنقيط.', 'تجهيز الآبار الجوفية وطلمبات الرفع الغاطسة ومحطات تقوية الضغوط وتمديد شبكات الري الزراعي المدفونة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 26.5, 27.7, 'Abu Minqar Oasis, New Valley')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a8ebe241-dfc5-5ebe-b28c-4bc314fea758', id FROM public.capabilities WHERE slug = 'irrigation'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a8ebe241-dfc5-5ebe-b28c-4bc314fea758', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'a8ebe241-dfc5-5ebe-b28c-4bc314fea758', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'en', 'Deep artesian groundwater wellhead piping and heavy-duty submersible pumps installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'en', 'Pressurized irrigation mainline manifolds and automated sectoring solenoid valves commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'en', 'Solar hybrid motor drive panels integrated for continuous desert agricultural pumping.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'en', 'Flow discharge calibration and hydraulic distribution uniformity verified across crop fields.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'ar', 'تجهيز رؤوس الآبار الجوفية العميقة وتوريد وتركيب طلمبات الرفع الغاطسة للخدمة الشاقة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'ar', 'تمديد خطوط الري الرئيسية المضغوطة وتركيب محابس التحكم الكهربائية لتقسيم قطاعات الري.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'ar', 'تشغيل لوحات التحكم الهجينة بالطاقة الشمسية لضمان استمرارية الضخ في عمق الصحراء.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('a8ebe241-dfc5-5ebe-b28c-4bc314fea758', 'ar', 'معايرة التصرفات والضغوط الهيدروليكية وضمان انتظام توزيع المياه على المساحات المزروعة.')
ON CONFLICT DO NOTHING;



-- Project: hayat-karima-health-unit (INF-P-2026-004)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'hayat-karima-health-unit', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-004. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'en', 'Decent Life (Hayat Karima) Rural Health Unit Facility', 'The Presidential ''Decent Life'' (Hayat Karima) initiative demanded the rapid turnkey construction of a modern rural family health clinic with medical-grade MEP, sterilized water supply, and backup power.', 'Delivered complete reinforced concrete structure, specialized medical architectural fit-out, medical waste plumbing, and emergency UPS/generator power.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'ar', 'إنشاء الوحدة الصحية الريفية — المبادرة الرئاسية حياة كريمة', 'تطلبت المبادرة الرئاسية (حياة كريمة) إنشاء وحدة صحية قروية نموذجية مجهزة وفق أحدث الاشتراطات الصحية وشبكات المرافق الكهروميكانيكية المعقمة.', 'تنفيذ الهيكل الإنشائي والتشطيبات المعمارية المتخصصة وشبكات الصرف الصحي والتغذية بالمياه وتجهيزات القوى الكهربائية والطوارئ.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 28.5, 30.8, 'Rural Upper Egypt Center (Hayat Karima)')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '74552d04-28ff-5c91-896f-1b177dda314a', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '74552d04-28ff-5c91-896f-1b177dda314a', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'en', 'Reinforced concrete building shell and medical clinic architectural fit-out completed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'en', 'Anti-bacterial plumbing pipes, pure water filtration, and medical waste traps installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'en', 'Low-voltage electrical distribution with automatic transfer switch (ATS) to standby generator.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'en', 'Facility inspected, certified, and handed over under Ministry of Health supervision.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'ar', 'إنجاز الهيكل الخرساني المسلح والتشطيبات المعمارية للعيادات الطبية وفق كود وزارة الصحة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'ar', 'تركيب شبكات التغذية الصحية المضادة للبكتيريا ومحطات الفلترة ومصائد الصرف المعقمة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'ar', 'تجهيز لوحات التوزيع الكهربائي المزودة بنظام التحويل التلقائي للطوارئ (ATS).')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('74552d04-28ff-5c91-896f-1b177dda314a', 'ar', 'تسليم المنشأة الطبية بعد اعتماد كافة الاختبارات من جهاز الإشراف الهندسي لـ حياة كريمة.')
ON CONFLICT DO NOTHING;



-- Project: bianchi-resort-infrastructure-utilities (INF-P-2026-005)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'bianchi-resort-infrastructure-utilities', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-005. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'en', 'Bianchi Coastal Resort Integrated Infrastructure & Utility Networks', 'A luxury coastal resort development in Bianchi (North Coast) required high-specification buried infrastructure networks, potable water loops, and sewage collection designed for high seasonal peak occupancy.', 'Engineered and laid complete underground utility networks, lift sumps, irrigation manifolds, and certified hydrostatic testing.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'ar', 'البنية التحتية وشبكات المرافق لمنتجع بيانكي الساحلي', 'تطلب مشروع منتجع بيانكي الراقي بالساحل الشمالي تنفيذ شبكات بنية تحتية ومرافق مياه شرب وصرف صحي عالية الكفاءة لاستيعاب الإشغال الموسمي.', 'تنفيذ وتمديد شبكات المرافق الأرضية وبيارات الرفع وتفريعات مياه الري وإجراء اختبارات الضغط الهيدروليكي بنجاح.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 31.05, 28.5, 'Bianchi, North Coast, Matrouh')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'e3fa2596-50e1-5ab6-be36-367accbf2436', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'e3fa2596-50e1-5ab6-be36-367accbf2436', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'en', 'Potable water supply distribution ring mains laid using high-pressure UPVC/HDPE piping.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'en', 'Gravity sewer collection lines and submersible lifting sumps constructed across resort zones.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'en', 'Landscape irrigation distribution network and solenoid valve manifolds commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'en', 'Zero-leakage hydrostatic pressure certification delivered under consultant witnessing.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'ar', 'تمديد شبكات التغذية بمياه الشرب بنظام الحلقة المغلقة من مواسير UPVC وHDPE عالية الضغط.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'ar', 'إنشاء خطوط انحدار الصرف الصحي وبيارات الرفع الغاطسة في قطاعات المنتجع المختلفة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'ar', 'تركيب شبكة مياه ري المساحات الخضراء واللاندسكيب ومحابس التحكم الكهرومغناطيسية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e3fa2596-50e1-5ab6-be36-367accbf2436', 'ar', 'اعتماد شهادات اختبار الضغط الهيدروليكي بدون أي تسريب تحت إشراف طاقم الاستشاري.')
ON CONFLICT DO NOTHING;



-- Project: rural-egypt-wells-minya (INF-P-2026-006)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'rural-egypt-wells-minya', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-006. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'en', 'Egyptian Countryside Development Deep Wells Package — Minya', 'Agricultural land reclamation by the Egyptian Countryside Development Company (1.5 Million Feddan Project) in West Minya demanded deep artesian groundwater extraction and solar pumping stations.', 'Drilled, cased, and equipped high-depth groundwater wells, installed submersible pump sets, and commissioned solar photovoltaic power arrays.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'ar', 'مشروع آبار شركة تنمية الريف المصري — غرب المنيا', 'تطلب مشروع استصلاح الأراضي لشركة تنمية الريف المصري (مشروع 1.5 مليون فدان) بغرب المنيا حفر وتجهيز آبار جوفية عميقة ومحطات ضخ بالطاقة الشمسية.', 'حفر وتجهيز وتنزيل الآبار الجوفية العميقة وتركيب مجموعات الضخ الغاطسة وتشغيل محطات الطاقة الشمسية لتوليد الكهرباء.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 28.05, 30.45, 'West Minya (1.5M Feddan Project)')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '5cfe0f56-0f54-5dfc-a607-09e40cf4def4', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '5cfe0f56-0f54-5dfc-a607-09e40cf4def4', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'en', 'Deep artesian groundwater wells cased with heavy-duty seamless steel and slotted screens.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'en', 'High-efficiency multi-stage stainless steel submersible pump sets lowered and commissioned.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'en', 'Solar photovoltaic pumping inverters installed with automatic grid/generator hybrid control.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'en', 'Continuous 48-hour pump step-drawdown testing performed to certify aquifer yield.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'ar', 'حفر وتبطين الآبار الارتوازية العميقة بمواسير الصلب غير الملحومة والمصافي المتخصصة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'ar', 'توريد وتنزيل طلمبات الأعماق الغاطسة متعددة المراحل من الاستانلس ستيل عالي الكفاءة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'ar', 'تركيب مغيرات سرعة محركات الضخ بالطاقة الشمسية مع نظام التحكم الهجين التلقائي.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('5cfe0f56-0f54-5dfc-a607-09e40cf4def4', 'ar', 'إجراء اختبارات الضخ المستمر لمدة 48 ساعة لقياس التصرف الآمن والهبوط النوعي للبئر.')
ON CONFLICT DO NOTHING;



-- Project: palm-hills-infrastructure-utilities (INF-P-2026-008)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'palm-hills-infrastructure-utilities', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-008. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'en', 'Palm Hills Development Premium Residential Infrastructure Networks', 'High-end residential compounds developed by Palm Hills required strict specification underground utility mains, potable water distribution rings, and sewage collection infrastructure.', 'Constructed complete underground civil networks, valve chambers, pump sumps, and electrical conduits certified to premier real estate developer standards.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'ar', 'شبكات البنية التحتية والمرافق — مشروعات بالم هيلز', 'تطلبت المشروعات والتجمعات السكنية الراقية لشركة بالم هيلز تنفيذ شبكات مرافق أرضية وفق أعلى المواصفات لشبكات المياه والصرف والكهرباء.', 'تنفيذ وتمديد شبكات المرافق المدفونة وإنشاء غرف المحابس وبيارات الرفع ومسارات الكابلات الكهربائية المعتمدة.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 30.01, 31.02, 'Palm Hills Precincts, West Cairo')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '38acf4e4-80f7-59c6-b49a-65ebea88e7a3', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '38acf4e4-80f7-59c6-b49a-65ebea88e7a3', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '38acf4e4-80f7-59c6-b49a-65ebea88e7a3', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'en', 'Potable water supply trunk network laid using premium certified ductile iron and UPVC pipes.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'en', 'Gravity sewer lines constructed with heavy-duty inspection chambers and GRP covers.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'en', 'Stormwater attenuation reservoirs and automated sump discharge pumps installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'en', 'Stringent pressure testing and CCTV internal pipe inspection successfully completed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'ar', 'تمديد خطوط التغذية بمياه الشرب من أجود مواسير الزهر المرن وUPVC المعتمدة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'ar', 'إنشاء شبكات انحدار الصرف الصحي وغرف التفتيش المجهزة بأغطية GRP عالية التحمل.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'ar', 'تنفيذ غرف تهدئة وصرف مياه الأمطار وطلمبات السحب الغاطسة الأوتوماتيكية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('38acf4e4-80f7-59c6-b49a-65ebea88e7a3', 'ar', 'إجراء اختبارات الضغط الهيدروليكي وفحص الخطوط بالتصوير التلفزيوني الداخلي (CCTV) بنجاح.')
ON CONFLICT DO NOTHING;



-- Project: abu-zaabal-landfill-environmental-works (INF-P-2026-009)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'abu-zaabal-landfill-environmental-works', 'public', 'published', 'Imported in Full Batch integration from INF-P-2026-009. Verified against SharePoint intelligence.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  status = EXCLUDED.status,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'en', 'Abu Zaabal Environmental Landfill & Leachate Mitigation Works', 'The Abu Zaabal solid waste facility in Qalyubia Governorate required specialized leachate collection networks, containment geomembrane lining, and environmental drainage to protect surrounding groundwater.', 'Constructed geomembrane-lined leachate lagoons, installed perforated HDPE collection pipes, and commissioned chemical neutralization sumps.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'ar', 'أعمال الحماية البيئية وتجميع مياه الرشيح — مقلب أبو زعبل', 'تطلب المقلب الصحي للمخلفات بأبو زعبل بمحافظة القليوبية إنشاء منظومات عزل وتجميع مياه الرشيح (Leachate) لحماية المياه الجوفية والبيئة المحيطة.', 'تنفيذ أحواض التبخير المعزولة بطبقات الجيوممبرين وتمديد خطوط تجميع الرشيح المثقبة وبيارات المعالجة والتحييد.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 30.24, 31.38, 'Abu Zaabal, Qalyubia Governorate')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '139b6c12-844f-5004-bc31-6e34700c9ab3', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '139b6c12-844f-5004-bc31-6e34700c9ab3', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'en', 'High-density polyethylene (HDPE) impermeable geomembrane liners installed and welded across containment cells.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'en', 'Heavy-duty perforated leachate drainage collection piping laid within graded gravel filters.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'en', 'Corrosion-proof chemical neutralization sumps and specialized leachate transfer pumps installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'en', 'Groundwater monitoring boreholes constructed to ensure zero subsurface contamination.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'ar', 'تركيب ولحام بطانات الجيوممبرين العازلة (HDPE Geomembrane) غير المنفذة في خلايا الدفن.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'ar', 'تمديد شبكات مواسير تجميع مياه الرشيح المثقبة داخل طبقات الزلط والفلترة المتدرجة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'ar', 'إنشاء بيارات التجميع المقاومة للتآكل الكيميائي وتركيب طلمبات نقل الرشيح المتخصصة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('139b6c12-844f-5004-bc31-6e34700c9ab3', 'ar', 'تنفيذ آبار المراقبة الجوفية الدورية للتحقق من عدم وجود أي تسريب للطبقات الحاملة للمياه.')
ON CONFLICT DO NOTHING;



COMMIT;
