-- ==========================================================================
-- INFEWORKS - PILOT BATCH IMPORT SCRIPT (5 PROJECTS)
-- Safe, idempotent draft insert for the 5 curated pilot projects
-- ==========================================================================

BEGIN;

-- Project: sisi-city-wastewater (INF-P-2025-003)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'sisi-city-wastewater', 'public', 'draft', 'Extracted from 07_EXTRACTED/2025/3--مدينة-السيسى-عقد-الصرف. BOQ verified: UPVC SN8 Ø160-400mm gravity sewers and stormwater collection.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'en', 'Al-Sisi City Gravity Sewer & Storm Drainage Network', 'A major urban development in North Sinai required comprehensive underground utility infrastructure, demanding gravity wastewater collection and stormwater drainage networks built under strict depth and soil compaction tolerances.', 'Turnkey supply, trench excavation, pipe laying, manhole construction, and hydrostatic pressure testing delivered in-house with full engineering supervision sign-off.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'ar', 'شبكات الصرف الصحي وتصريف الأمطار — مدينة السيسي', 'تطلب مشروع التطوير العمراني بشمال سيناء تنفيذ بنية تحتية متكاملة لشبكات الصرف الصحي السطحي والانحداري مع تصريف مياه الأمطار وفق مواصفات هيدروليكية صارمة.', 'تنفيذ أعمال التوريد والحفر وتمديد خطوط الانحدار وبناء غرف التفتيش والمطابق واختبارات الضغط الهيدروليكي بأطقمنا الذاتية وتسليمها لاعتماد الاستشاري.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 31.25, 34.15, 'Al-Sisi City, North Sinai')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '841fb61a-c5fd-5e49-b54f-8cfef5f8e421', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'en', 'Gravity sewer mains supplied and installed using UPVC SN8 pipes (Ø160mm to Ø400mm) compliant with ES 1717.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'en', 'Stormwater drainage network and cast-in-place concrete catchment chambers constructed across principal sectors.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'en', 'Hydrostatic leak and pressure testing completed for all reaches with witness verification by supervision consultants.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'en', 'Heavy-duty GRP and ductile iron manhole covers installed with reinforced concrete foundation collars.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'ar', 'توريد وتركيب خطوط انحدار صرف صحي من مواسير UPVC SN8 بأقطار من 160 مم إلى 400 مم مطابقة للمواصفات القياسية المصرية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'ar', 'إنشاء شبكة تصريف مياه الأمطار وغرف التهدئة والمطابق الخرسانية المسلحة في مختلف القطاعات الحيوية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'ar', 'إجراء اختبارات الضغط المائي والتسريب لجميع الفرعات بنجاح تحت إشراف طاقم المهندسين المشرفين.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('841fb61a-c5fd-5e49-b54f-8cfef5f8e421', 'ar', 'تركيب أغطية مطابق من الزهر المرن وGRP عالي التحمل مع الأطواق والشنابر الخرسانية المعتمدة.')
ON CONFLICT DO NOTHING;



-- Project: rafah-bedouin-housing (INF-P-2025-002)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'rafah-bedouin-housing', 'public', 'draft', 'Extracted from 07_EXTRACTED/2025/2--البيوت-البدوية-رفح. Client: Sinai Reconstruction Authority / Diaa Consultant. Scope: Integrated residential utility infrastructure.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'en', 'Rafah Bedouin Residential Development Infrastructure', 'The sustainable housing initiative in Rafah required high-quality residential infrastructure including civil concrete works, potable water plumbing, sanitation loops, and electrical service distribution tailored for remote community resilience.', 'Executed building structural packages, comprehensive internal/external plumbing, water storage feeding systems, and electrical distribution panels with verified quality assurance.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'ar', 'البنية التحتية والإنشاءات للتجمعات البدوية — رفح', 'تطلبت مبادرة التجمعات السكنية والتنموية برفح تنفيذ أعمال إنشائية وكهروميكانيكية متكاملة لشبكات التغذية بمياه الشرب والصرف والتوزيع الكهربائي للمنازل البدوية.', 'تنفيذ الأعمال الإنشائية وتمديد شبكات السباكة الداخلية والتغذية بالمياه وتركيب الخزانات واللوحات الكهربائية وتسليمها مطابقة لتقارير الاستشاري.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 31.2825, 34.2435, 'New Rafah (El-Hossaynat), North Sinai')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '05476ccf-b081-5cc2-b1fa-d33f969325b1', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '05476ccf-b081-5cc2-b1fa-d33f969325b1', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'en', 'Structural concrete works, brickwork, and protective moisture insulation delivered across assigned residential clusters.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'en', 'Complete internal sanitary plumbing and exterior branch connection lines installed and tested for continuous service.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'en', 'Potable water supply manifolds and rooftop storage integration commissioned for each residential unit.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'en', 'Distribution power panels and low-voltage cable routing certified under consulting engineering supervision.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'ar', 'تنفيذ الهياكل الخرسانية وأعمال البناء والعزل المائي والرطوبي للوحدات السكنية المخصصة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'ar', 'تمديد واختبار شبكات الصرف الصحي والسباكة الداخلية والخارجية وضمان مطابقتها للمواصفات الفنية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'ar', 'تركيب منظومات التغذية بمياه الشرب والربط مع خزانات المياه العلوية والتوصيلات المنزلية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('05476ccf-b081-5cc2-b1fa-d33f969325b1', 'ar', 'تجهيز وتركيب لوحات التوزيع الكهربائي وتمديد الكابلات تحت إشراف المكتب الاستشاري المعتمد.')
ON CONFLICT DO NOTHING;



-- Project: salam-city-water-pipeline (INF-P-2026-003)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'salam-city-water-pipeline', 'public', 'draft', 'Extracted from 07_EXTRACTED/2026/03--مشروع-خط-تغذية-مدينة-السلام-من-رافع-الشلاء. Client: North Sinai Water Company. Interties with Al-Shalla booster station.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'en', 'New Salam City Strategic Water Transmission Line', 'Connecting the emerging urban centre of New Salam City to the regional water network required a dedicated high-pressure transmission line originating from the Al-Shalla booster pump station in Sheikh Zuweid across challenging terrain.', 'Engineered pipeline profile, delivered ductile and HDPE pipe installation, air/isolation valve chambers, and high-pressure interties commissioned on schedule.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'ar', 'خط نقل المياه الاستراتيجي لمدينة السلام من رافع الشلاق', 'احتاجت مدينة السلام الجديدة إلى خط ناقل رئيسي لمياه الشرب يربطها بمحطة رافع مياه الشلاق بالشيخ زويد لنقل المياه الصالحة للشرب وتغذية التوسعات العمرانية.', 'تنفيذ أعمال المسار الهيدروليكي وتوريد وتركيب خطوط النقل وغرف محابس القفل والهواء والربط مع محطة الضخ واعتماد الاختبارات الهيدروليكية.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 31.2185, 34.1205, 'Sheikh Zuweid & New Salam City, North Sinai')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'b01f378f-dc3e-51d6-ac65-9829fe9e9fac', id FROM public.capabilities WHERE slug = 'water-treatment'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'b01f378f-dc3e-51d6-ac65-9829fe9e9fac', id FROM public.capabilities WHERE slug = 'pumping'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'en', 'High-pressure transmission pipeline routed and installed connecting Al-Shalla booster hub to New Salam City.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'en', 'Reinforced concrete air release and sectioning gate valve chambers constructed along the main alignment.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'en', 'Electromechanical interconnections and pressure sustaining assemblies commissioned at the booster terminal.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'en', 'Full-section hydrostatic test executed up to 1.5x working pressure with official water company certification.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'ar', 'تمديد وتركيب خط نقل المياه عالي الضغط الرابط بين رافع الشلاق ومدينة السلام الجديدة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'ar', 'إنشاء غرف محابس الهواء ومحابس القفل العازلة من الخرسانة المسلحة على امتداد مسار الخط الناقل.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'ar', 'تنفيذ أعمال الربط الكهروميكانيكي وقطع الاتصال الخاصة بمنظومات الضغط بمحطة الرافع.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b01f378f-dc3e-51d6-ac65-9829fe9e9fac', 'ar', 'إجراء الاختبارات الهيدروليكية للخط بنجاح عند 1.5 ضعف ضغط التشغيل واعتماد المحاضر الرسمية.')
ON CONFLICT DO NOTHING;



-- Project: salam-city-cattle-farm-networks (INF-P-2026-007)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'salam-city-cattle-farm-networks', 'public', 'draft', 'Extracted from 07_EXTRACTED/2026/07--مشروع-شبكات-مزرعة-الابقار---مدينة-السلام. Client: NSPO. 29 verified photos in image manifest.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'en', 'Agricultural Dairy & Livestock Complex Infrastructure', 'An integrated cattle and dairy farm facility in Salam City required synchronized wet infrastructure and power networks to support intensive animal husbandry, automated milking stations, and effluent washdown.', 'Complete utility layout engineered, delivering potable water distribution loops, waste drainage collection, and localized power distribution panels.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'ar', 'شبكات البنية التحتية لمجمع الإنتاج الحيواني — مدينة السلام', 'احتاج مجمع الإنتاج الحيواني ومزارع الألبان بمدينة السلام إلى شبكات مرافق متكاملة تشمل التغذية بالمياه وصرف المخلفات والتغذية الكهربائية لخدمة الحظائر والمحالب الآلية.', 'تنفيذ وتمديد شبكات مياه الشرب والعمليات وخطوط صرف المخلفات الزراعية ولوحات التوزيع والتحكم الكهربائي وتسليمها بنجاح.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 30.178, 31.428, 'Salam City Complex, Egypt')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'b1692f62-488e-5f98-b9a5-aa6553da6948', id FROM public.capabilities WHERE slug = 'irrigation'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'b1692f62-488e-5f98-b9a5-aa6553da6948', id FROM public.capabilities WHERE slug = 'wastewater'
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'b1692f62-488e-5f98-b9a5-aa6553da6948', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'en', 'Potable and process water supply network laid with dedicated branch lines serving milking and livestock sheds.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'en', 'Industrial-grade effluent collection sewer network built with corrosion-resistant piping and sediment catchpits.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'en', 'Power distribution infrastructure and IP55 weather-rated motor control panels installed and tested.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'en', 'Pressure balancing and automated valve controls calibrated for uninterrupted 24/7 livestock water supply.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'ar', 'تنفيذ شبكات مياه الشرب والعمليات مع تفريعات التغذية الخاصة بعنابر الإيواء والمحالب الآلية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'ar', 'إنشاء شبكة تجميع صرف المخلفات بمواسير مقاومة للمواد الكيميائية وغرف تجميع الرواسب.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'ar', 'توريد وتركيب لوحات التوزيع والتشغيل الكهربائي المعزولة بدرجة حماية IP55 وكابلات التغذية.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('b1692f62-488e-5f98-b9a5-aa6553da6948', 'ar', 'موازنة الضغوط الهيدروليكية وضبط محابس التحكم لضمان إمداد مستمر بالمياه على مدار الساعة.')
ON CONFLICT DO NOTHING;



-- Project: qabs-min-nour-mosque (INF-P-2025-001)
INSERT INTO public.projects (id, slug, classification, status, internal_notes)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'qabs-min-nour-mosque', 'public', 'draft', 'Extracted from 07_EXTRACTED/2025/1--مسجد-قبس-من-نور. Contract No. 1/2025 with Qabs Min Nour Charity. R3 district NAC.')
ON CONFLICT (slug) DO UPDATE SET
  classification = EXCLUDED.classification,
  internal_notes = EXCLUDED.internal_notes;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'en', 'Qabs Min Nour Grand Mosque & Community Complex', 'Constructing a landmark Friday Grand Mosque in the New Administrative Capital''s R3 District called for turnkey general contracting encompassing deep foundations, high-span concrete domes, architectural stone facades, and integrated building MEP systems.', 'Completed civil reinforced concrete structural works, dome and minaret masonry, architectural finishing, electrical distribution, and central HVAC ductwork under strict capital regulatory oversight.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'ar', 'جامع ومجمع قبس من نور — العاصمة الإدارية الجديدة', 'تطلب إنشاء مسجد جامع متكامل بالحي السكني الثالث (R3) بالعاصمة الإدارية الجديدة تنفيذ أعمال المقاولات العامة الشاملة للهيكل الخرساني والقباب والواجهات الحجرية والأعمال الكهروميكانيكية.', 'إنجاز أعمال الهيكل الخرساني المسلح وبناء القباب والمئذنة والتشطيبات المعمارية واللوحات الكهربائية ومجاري التكييف المركزي بنجاح واعتمادها من جهات الإشراف.')
ON CONFLICT (project_id, locale) DO UPDATE SET
  title = EXCLUDED.title, challenge = EXCLUDED.challenge, outcome = EXCLUDED.outcome;

INSERT INTO public.locations (project_id, lat, lng, display_name)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 30.015, 31.685, 'R3 Residential District, New Administrative Capital')
ON CONFLICT DO NOTHING;

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT 'e0251a29-71eb-51b3-a2e8-f531e769022d', id FROM public.capabilities WHERE slug = 'electrical-control'
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'en', 'Turnkey general contracting executed under formal contract for the Friday Mosque and affiliated administrative building.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'en', 'Reinforced concrete structural shell, architectural arches, and main dome engineered and cast in-situ.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'en', 'Central electrical distribution network, architectural lighting, and sound system conduits installed.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'en', 'HVAC equipment and concealed air distribution ducting completed to maintain optimal ambient conditions.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'ar', 'تنفيذ أعمال المقاولات العامة المتكاملة بموجب عقد رسمي لإنشاء المسجد الجامع والمبنى الإداري والخدمي الملحق.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'ar', 'صب وإنجاز الهيكل الخرساني المسلح والأروقة المعمارية والقبة الرئيسية طبقاً للرسومات الهندسية المعتمدة.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'ar', 'تركيب شبكة التوزيع الكهربائي ولوحات القوى الرئيسية وتمديدات أنظمة الإضاءة المعمارية والصوتيات.')
ON CONFLICT DO NOTHING;

INSERT INTO public.claims (project_id, locale, content)
VALUES ('e0251a29-71eb-51b3-a2e8-f531e769022d', 'ar', 'تنفيذ مسارات ومجاري الهواء لمنظومة التكييف المركزي لضمان أعلى معايير الراحة البيئية داخل المسجد.')
ON CONFLICT DO NOTHING;



COMMIT;
