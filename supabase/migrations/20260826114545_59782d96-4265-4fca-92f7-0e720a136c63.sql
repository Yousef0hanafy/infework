CREATE POLICY "claims_anon_read_published" ON public.claims
FOR SELECT TO anon
USING (EXISTS (
  SELECT 1 FROM public.projects p
  WHERE p.id = claims.project_id
    AND p.status = 'published'
    AND p.classification <> 'study'
));

CREATE POLICY "locations_anon_read_published" ON public.locations
FOR SELECT TO anon
USING (EXISTS (
  SELECT 1 FROM public.projects p
  WHERE p.id = locations.project_id
    AND p.status = 'published'
    AND p.classification <> 'study'
));

CREATE POLICY "pc_anon_read_published" ON public.project_capabilities
FOR SELECT TO anon
USING (EXISTS (
  SELECT 1 FROM public.projects p
  WHERE p.id = project_capabilities.project_id
    AND p.status = 'published'
    AND p.classification <> 'study'
));