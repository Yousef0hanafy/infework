-- shared updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- 1. projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  classification TEXT NOT NULL DEFAULT 'internal' CHECK (classification IN ('study','internal','public')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_authenticated_all" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- publish gate: studies can never be published
CREATE OR REPLACE FUNCTION public.enforce_publish_gate()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status = 'published' AND NEW.classification = 'study' THEN
    RAISE EXCEPTION 'A project classified as study cannot be published';
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER projects_publish_gate BEFORE INSERT OR UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.enforce_publish_gate();

-- 2. public_project_profiles
CREATE TABLE public.public_project_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en','ar')),
  title TEXT NOT NULL,
  challenge TEXT,
  outcome TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, locale)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.public_project_profiles TO authenticated;
GRANT ALL ON public.public_project_profiles TO service_role;
ALTER TABLE public.public_project_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ppp_authenticated_all" ON public.public_project_profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER ppp_updated_at BEFORE UPDATE ON public.public_project_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. claims
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  locale TEXT NOT NULL CHECK (locale IN ('en','ar')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.claims TO authenticated;
GRANT ALL ON public.claims TO service_role;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "claims_authenticated_all" ON public.claims FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER claims_updated_at BEFORE UPDATE ON public.claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. evidence
CREATE TABLE public.evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  internal_link TEXT,
  internal_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.evidence TO authenticated;
GRANT ALL ON public.evidence TO service_role;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
CREATE POLICY "evidence_authenticated_all" ON public.evidence FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER evidence_updated_at BEFORE UPDATE ON public.evidence FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. locations
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.locations TO authenticated;
GRANT ALL ON public.locations TO service_role;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "locations_authenticated_all" ON public.locations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER locations_updated_at BEFORE UPDATE ON public.locations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. capabilities (public list)
CREATE TABLE public.capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  en_name TEXT NOT NULL,
  ar_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.capabilities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.capabilities TO authenticated;
GRANT ALL ON public.capabilities TO service_role;
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "capabilities_public_read" ON public.capabilities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "capabilities_authenticated_write" ON public.capabilities FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER capabilities_updated_at BEFORE UPDATE ON public.capabilities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. project_capabilities
CREATE TABLE public.project_capabilities (
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  capability_id UUID NOT NULL REFERENCES public.capabilities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, capability_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_capabilities TO authenticated;
GRANT ALL ON public.project_capabilities TO service_role;
ALTER TABLE public.project_capabilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pc_authenticated_all" ON public.project_capabilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. leads (anon insert only)
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audience_type TEXT NOT NULL CHECK (audience_type IN ('state','industrial','agricultural','other')),
  need_type TEXT NOT NULL CHECK (need_type IN ('design','execution','om','turnkey','other')),
  location_text TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','seen')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_anon_insert_new" ON public.leads FOR INSERT TO anon WITH CHECK (status = 'new');
CREATE POLICY "leads_authenticated_all" ON public.leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. site_settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings_public_read" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "site_settings_authenticated_write" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public view: published projects only, no internal_notes
CREATE VIEW public.vw_public_projects
WITH (security_invoker = false) AS
SELECT
  p.id AS project_id,
  p.slug,
  p.classification,
  pp.locale,
  pp.title,
  pp.challenge,
  pp.outcome,
  p.created_at,
  p.updated_at
FROM public.projects p
JOIN public.public_project_profiles pp ON pp.project_id = p.id
WHERE p.status = 'published' AND p.classification <> 'study';

GRANT SELECT ON public.vw_public_projects TO anon, authenticated;

-- Seed data
INSERT INTO public.capabilities (slug, en_name, ar_name) VALUES
  ('water-treatment', 'Water & Treatment', 'المياه والمعالجة'),
  ('wastewater', 'Wastewater', 'الصرف الصحي'),
  ('pumping', 'Pumping', 'الضخ'),
  ('irrigation', 'Irrigation', 'الري'),
  ('electrical-control', 'Electrical & Control', 'الكهرباء والتحكم');

INSERT INTO public.projects (id, slug, classification, status, internal_notes) VALUES
  ('11111111-1111-4111-8111-111111111111', 'placeholder-project-one', 'public', 'draft', 'Internal placeholder record — pending client verification.'),
  ('22222222-2222-4222-8222-222222222222', 'placeholder-project-two', 'internal', 'draft', 'Internal placeholder record — not for publication.');

INSERT INTO public.public_project_profiles (project_id, locale, title, challenge, outcome) VALUES
  ('11111111-1111-4111-8111-111111111111', 'en', 'Placeholder Project One', 'Challenge draft pending review.', 'Outcome draft pending review.'),
  ('11111111-1111-4111-8111-111111111111', 'ar', 'مشروع تجريبي أول', 'وصف التحدي قيد المراجعة.', 'النتيجة قيد المراجعة.'),
  ('22222222-2222-4222-8222-222222222222', 'en', 'Placeholder Project Two', 'Challenge draft pending review.', 'Outcome draft pending review.'),
  ('22222222-2222-4222-8222-222222222222', 'ar', 'مشروع تجريبي ثانٍ', 'وصف التحدي قيد المراجعة.', 'النتيجة قيد المراجعة.');

INSERT INTO public.locations (project_id, lat, lng, display_name) VALUES
  ('11111111-1111-4111-8111-111111111111', 30.3765, 30.5150, 'Sadat City, Egypt'),
  ('22222222-2222-4222-8222-222222222222', 30.0444, 31.2357, 'Cairo, Egypt');

INSERT INTO public.project_capabilities (project_id, capability_id)
SELECT '11111111-1111-4111-8111-111111111111', id FROM public.capabilities WHERE slug = 'water-treatment';

INSERT INTO public.claims (project_id, locale, content) VALUES
  ('11111111-1111-4111-8111-111111111111', 'en', 'Capacity claim placeholder — 1,500 m3/day.');

INSERT INTO public.site_settings (key, value) VALUES
  ('contact_email', 'info@infeworks.com'),
  ('contact_whatsapp', '201006249420'),
  ('site_status', 'mvp');