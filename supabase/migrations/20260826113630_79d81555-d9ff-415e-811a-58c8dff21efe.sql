CREATE TABLE public.media_assets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  alt_en text,
  alt_ar text,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT SELECT ON public.media_assets TO anon;
GRANT ALL ON public.media_assets TO service_role;

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY media_assets_authenticated_all ON public.media_assets
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY media_assets_anon_read_public ON public.media_assets
  FOR SELECT TO anon USING (
    is_public AND EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = media_assets.project_id
        AND p.status = 'published'
        AND p.classification <> 'study'
    )
  );

CREATE TRIGGER media_assets_updated_at BEFORE UPDATE ON public.media_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX media_assets_project_id_idx ON public.media_assets(project_id);

CREATE TABLE public.audit_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action text NOT NULL,
  target_table text NOT NULL,
  target_id uuid,
  actor_email text,
  detail text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.audit_events TO authenticated;
GRANT ALL ON public.audit_events TO service_role;

ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY audit_events_authenticated_read ON public.audit_events
  FOR SELECT TO authenticated USING (true);

CREATE POLICY audit_events_authenticated_insert ON public.audit_events
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE INDEX audit_events_created_at_idx ON public.audit_events(created_at DESC);