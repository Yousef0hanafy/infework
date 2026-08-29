
insert into public.projects (id, slug, classification, status) values
  ('e5555555-5555-4555-8555-555555555555','ameriya-cold-storage','public','published'),
  ('f6666666-6666-4666-8666-666666666666','awlad-el-sheikh-pumping','public','published'),
  ('a7777777-7777-4777-8777-777777777777','north-coast-desalination','public','published'),
  ('b8888888-8888-4888-8888-888888888888','east-delta-wastewater','public','published')
on conflict (slug) do nothing;

insert into public.public_project_profiles (project_id, locale, title, challenge, outcome) values
  ('e5555555-5555-4555-8555-555555555555','en','Ameriya Industrial Cooling & Water Distribution','An industrial cold-storage complex in Ameriya needed reliable process and cooling water with distribution that would not interrupt storage duty.','Cooling and distribution loops delivered, tested and handed over with documented flow and pressure performance.'),
  ('e5555555-5555-4555-8555-555555555555','ar','التبريد الصناعي وتوزيع المياه — العامرية','احتاج مجمع تخزين مبرد صناعي بالعامرية إلى مياه عمليات وتبريد موثوقة مع شبكة توزيع لا تُعطل التشغيل.','تم تنفيذ دوائر التبريد والتوزيع واختبارها وتسليمها مع توثيق أداء التصرفات والضغوط.'),
  ('f6666666-6666-4666-8666-666666666666','en','Awlad El-Sheikh Potable Water Pumping Station','A village supply network in Sohag required a pumping station sized for peak demand with redundancy for continuous service.','Station built, electromechanically equipped and commissioned with standby capacity and remote monitoring.'),
  ('f6666666-6666-4666-8666-666666666666','ar','محطة ضخ مياه الشرب — أولاد الشيخ','احتاجت شبكة تغذية قروية بسوهاج إلى محطة ضخ بسعة تغطي الأحمال القصوى مع احتياطي لاستمرار الخدمة.','تم إنشاء المحطة وتجهيزها كهروميكانيكياً وتشغيلها تجريبياً بوجود وحدات احتياطية ومراقبة عن بُعد.'),
  ('a7777777-7777-4777-8777-777777777777','en','North Coast Commercial RO Water Treatment','A commercial development on the North Coast needed potable-grade water from a brackish source under seasonal peak loads.','Reverse osmosis train supplied and commissioned with lab-verified product water quality.'),
  ('a7777777-7777-4777-8777-777777777777','ar','معالجة مياه بالتناضح العكسي — الساحل الشمالي','احتاج مشروع تجاري بالساحل الشمالي إلى مياه بمواصفات الشرب من مصدر مالح مع أحمال موسمية قصوى.','تم توريد وتشغيل وحدة تناضح عكسي مع تحقق معملي من جودة المياه المنتجة.'),
  ('b8888888-8888-4888-8888-888888888888','en','East Delta Municipal Wastewater Treatment','Growing East Delta communities needed municipal wastewater treatment meeting discharge limits with limited footprint.','Treatment works delivered and operated with documented effluent compliance testing.'),
  ('b8888888-8888-4888-8888-888888888888','ar','معالجة الصرف الصحي — دلتا الشرق','احتاجت مجتمعات نامية بدلتا الشرق إلى معالجة صرف صحي مطابقة لحدود التصريف بمساحة محدودة.','تم تنفيذ وتشغيل أعمال المعالجة مع توثيق اختبارات مطابقة المياه المعالجة.')
on conflict do nothing;

insert into public.locations (project_id, lat, lng, display_name) values
  ('e5555555-5555-4555-8555-555555555555',31.00,29.80,'Ameriya, Alexandria Governorate'),
  ('f6666666-6666-4666-8666-666666666666',26.56,31.70,'Sohag Governorate'),
  ('a7777777-7777-4777-8777-777777777777',31.10,28.20,'Matrouh Governorate (North Coast)'),
  ('b8888888-8888-4888-8888-888888888888',30.71,31.72,'Sharqia Governorate (East Delta)')
on conflict do nothing;

insert into public.claims (project_id, locale, content) values
  ('e5555555-5555-4555-8555-555555555555','en','Process cooling and distribution network delivered in-house.'),
  ('e5555555-5555-4555-8555-555555555555','ar','تنفيذ ذاتي كامل لشبكة التبريد والتوزيع.'),
  ('f6666666-6666-4666-8666-666666666666','en','Pumping station commissioned with standby redundancy.'),
  ('f6666666-6666-4666-8666-666666666666','ar','تشغيل المحطة مع وحدات ضخ احتياطية.'),
  ('a7777777-7777-4777-8777-777777777777','en','Reverse osmosis product water verified by laboratory testing.'),
  ('a7777777-7777-4777-8777-777777777777','ar','التحقق من جودة المياه المنتجة عبر اختبارات معملية.'),
  ('b8888888-8888-4888-8888-888888888888','en','Treated effluent tested against municipal discharge limits.'),
  ('b8888888-8888-4888-8888-888888888888','ar','اختبار المياه المعالجة وفق حدود التصريف البلدية.')
on conflict do nothing;

insert into public.project_capabilities (project_id, capability_id)
select p.id, c.id from public.projects p join public.capabilities c on true
where (p.slug, c.slug) in (
  ('ameriya-cold-storage','water-treatment'),
  ('ameriya-cold-storage','pumping'),
  ('awlad-el-sheikh-pumping','pumping'),
  ('awlad-el-sheikh-pumping','electrical-control'),
  ('north-coast-desalination','water-treatment'),
  ('east-delta-wastewater','wastewater')
)
on conflict do nothing;

insert into public.site_settings (key, value) values
  ('brand_name','INFEWORKS'),
  ('brand_full_name_en','International for Engineering Works'),
  ('brand_full_name_ar','الشركة الدولية للأعمال الهندسية'),
  ('brand_primary_color','#B05E2A'),
  ('company_founded_year','2006'),
  ('company_address_en','313 Zahraa Nasr City, Cairo, Egypt'),
  ('company_address_ar','313 زهراء مدينة نصر، القاهرة، مصر'),
  ('company_phone','+20 100 624 9420'),
  ('home_hero_eyebrow_en','Infeworks — Water & Wastewater Infrastructure, Egypt'),
  ('home_hero_headline_en','One Partner. Full Scope. Delivered as Agreed.'),
  ('home_hero_cta_en','Start a Project'),
  ('home_metric_1','20+'),
  ('home_metric_2','50+'),
  ('home_metric_3','100%'),
  ('downloads_company_profile_url','/downloads/infeworks-company-profile.pdf'),
  ('downloads_company_profile_title','Infeworks Company Profile'),
  ('downloads_company_profile_version','2026.1'),
  ('whatsapp_enabled','true'),
  ('whatsapp_number','201006249420'),
  ('whatsapp_message_en','Hello Infeworks, I would like to discuss a water infrastructure project.'),
  ('whatsapp_message_ar','مرحباً إنفيوركس، أرغب في مناقشة مشروع بنية تحتية للمياه.'),
  ('footer_copyright','© Infeworks — International for Engineering Works'),
  ('seo_default_title','Infeworks — Water Infrastructure, Engineered & Delivered'),
  ('seo_default_description','Infeworks — the vertically integrated water and wastewater infrastructure contractor for Egypt''s state, industrial, and agricultural clients.'),
  ('seo_default_locale','en')
on conflict (key) do nothing;
