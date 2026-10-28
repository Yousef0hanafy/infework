-- PREPARED ONLY: not an automatic migration. See phase1-rollout.md before execution.
-- Requires a verified owner administrator and an already private media bucket.
BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE raw_app_meta_data->>'role' = 'admin' AND NOT coalesce(is_anonymous, false)
  ) THEN
    RAISE EXCEPTION 'Establish and verify an administrator through trusted Auth management first';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id='project-media' AND public=false) THEN
    RAISE EXCEPTION 'Inventory media and verify private bucket delivery before applying these policies';
  END IF;
END $$;

-- Check current trusted Auth state on every permission decision, rather than trusting user_metadata.
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = (SELECT auth.uid())
      AND raw_app_meta_data->>'role' = 'admin'
      AND NOT coalesce(is_anonymous, false)
  );
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- Restrictive policies AND with existing permissive policies. Historical broad policies cannot
-- override these guards. Existing anon publication read policies and service-role bypass remain.
DO $$
DECLARE target text;
BEGIN
  FOREACH target IN ARRAY ARRAY[
    'projects','public_project_profiles','claims','evidence','locations','capabilities',
    'project_capabilities','leads','site_settings','media_assets','audit_events'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', target);
    EXECUTE format('DROP POLICY IF EXISTS phase1_admin_guard ON public.%I', target);
    EXECUTE format(
      'CREATE POLICY phase1_admin_guard ON public.%I AS RESTRICTIVE FOR ALL TO authenticated USING ((SELECT public.is_admin())) WITH CHECK ((SELECT public.is_admin()))', target);
  END LOOP;
END $$;

DROP POLICY IF EXISTS phase1_audit_identity ON public.audit_events;
CREATE POLICY phase1_audit_identity ON public.audit_events AS RESTRICTIVE
FOR INSERT TO authenticated WITH CHECK (actor_email = (SELECT auth.jwt()->>'email'));

DROP POLICY IF EXISTS phase1_media_admin ON storage.objects;
CREATE POLICY phase1_media_admin ON storage.objects AS RESTRICTIVE FOR ALL TO authenticated
USING (bucket_id <> 'project-media' OR (SELECT public.is_admin()))
WITH CHECK (bucket_id <> 'project-media' OR (SELECT public.is_admin()));

DROP POLICY IF EXISTS phase1_media_public_read ON storage.objects;
CREATE POLICY phase1_media_public_read ON storage.objects AS RESTRICTIVE FOR SELECT TO anon
USING (bucket_id <> 'project-media' OR EXISTS (
  SELECT 1 FROM public.media_assets m JOIN public.projects p ON p.id=m.project_id
  WHERE m.storage_path=storage.objects.name AND m.is_public AND p.status='published'
));

DROP POLICY IF EXISTS phase1_media_anon_insert ON storage.objects;
CREATE POLICY phase1_media_anon_insert ON storage.objects AS RESTRICTIVE FOR INSERT TO anon
WITH CHECK (bucket_id <> 'project-media');
DROP POLICY IF EXISTS phase1_media_anon_update ON storage.objects;
CREATE POLICY phase1_media_anon_update ON storage.objects AS RESTRICTIVE FOR UPDATE TO anon
USING (bucket_id <> 'project-media') WITH CHECK (bucket_id <> 'project-media');
DROP POLICY IF EXISTS phase1_media_anon_delete ON storage.objects;
CREATE POLICY phase1_media_anon_delete ON storage.objects AS RESTRICTIVE FOR DELETE TO anon
USING (bucket_id <> 'project-media');

-- New writes are constrained immediately. Existing records are preserved for separate validation.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.leads'::regclass AND conname='phase1_lead_size') THEN
    ALTER TABLE public.leads ADD CONSTRAINT phase1_lead_size CHECK (
      email IS NOT NULL AND char_length(btrim(email)) BETWEEN 3 AND 255
      AND message IS NOT NULL AND char_length(message) BETWEEN 10 AND 6000
    ) NOT VALID;
  END IF;
END $$;
COMMIT;
