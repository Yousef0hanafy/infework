-- Make the public view respect the querying user's RLS
ALTER VIEW public.vw_public_projects SET (security_invoker = true);

-- Column-scoped anon access: internal_notes is NOT granted
GRANT SELECT (id, slug, classification, status, created_at, updated_at) ON public.projects TO anon;
GRANT SELECT (id, project_id, locale, title, challenge, outcome, created_at, updated_at) ON public.public_project_profiles TO anon;

-- Anon may only see published, non-study rows
CREATE POLICY "projects_anon_read_published" ON public.projects
FOR SELECT TO anon
USING (status = 'published' AND classification <> 'study');

CREATE POLICY "ppp_anon_read_published" ON public.public_project_profiles
FOR SELECT TO anon
USING (EXISTS (
  SELECT 1 FROM public.projects p
  WHERE p.id = public_project_profiles.project_id
    AND p.status = 'published'
    AND p.classification <> 'study'
));