-- Restrict anon column access on public.projects to exclude internal_notes
-- Ensures defense-in-depth even if projects table is queried directly instead of vw_public_projects
REVOKE SELECT ON public.projects FROM anon;
GRANT SELECT (id, slug, classification, status, created_at, updated_at) ON public.projects TO anon;
