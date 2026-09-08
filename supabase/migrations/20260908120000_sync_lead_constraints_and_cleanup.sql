-- Sync lead constraints to allow new audience types and need types introduced in contact lead capture form
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_audience_type_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_audience_type_check CHECK (
  audience_type IN (
    'state',
    'industrial',
    'agricultural',
    'developer',
    'contractor',
    'commercial',
    'supplier',
    'general',
    'technical',
    'other'
  )
);

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_need_type_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_need_type_check CHECK (
  need_type IN (
    'design',
    'execution',
    'om',
    'turnkey',
    'water-treatment',
    'wastewater',
    'pumping',
    'networks',
    'mep',
    'pumps',
    'pipes',
    'valves',
    'membranes',
    'electrical',
    'automation',
    'chemicals',
    'civil-subcontract',
    'supplier',
    'general',
    'technical',
    'other'
  )
);

-- Demote unverified seed project 'east-delta-wastewater' to draft so it does not appear in public views or project indexes
UPDATE public.projects
SET status = 'draft'
WHERE slug = 'east-delta-wastewater';
