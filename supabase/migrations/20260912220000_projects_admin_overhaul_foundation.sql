-- Migration: Projects Admin Overhaul Foundation (M1 + M2)
-- Date: 2026-09-12
-- Scope: Add media_type, sort_order, mime_type to media_assets; add bilingual facts to projects.

-- 1. media_assets extensions
ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'photo'
    CHECK (media_type IN ('photo', 'schema'));

ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS mime_type TEXT;

-- 2. Backfill sort_order for existing media_assets
UPDATE public.media_assets ma
SET sort_order = sub.rn
FROM (
  SELECT id,
    ROW_NUMBER() OVER (
      PARTITION BY project_id
      ORDER BY created_at ASC
    ) AS rn
  FROM public.media_assets
  WHERE media_type = 'photo'
) sub
WHERE ma.id = sub.id;

-- 3. Indexes for media_assets
CREATE UNIQUE INDEX IF NOT EXISTS media_assets_one_schema_per_project
  ON public.media_assets (project_id)
  WHERE media_type = 'schema';

CREATE INDEX IF NOT EXISTS media_assets_project_type_order
  ON public.media_assets (project_id, media_type, sort_order ASC);

-- 4. projects fact columns
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS client_en     TEXT,
  ADD COLUMN IF NOT EXISTS client_ar     TEXT,
  ADD COLUMN IF NOT EXISTS consultant_en TEXT,
  ADD COLUMN IF NOT EXISTS consultant_ar TEXT,
  ADD COLUMN IF NOT EXISTS scope_en      TEXT,
  ADD COLUMN IF NOT EXISTS scope_ar      TEXT,
  ADD COLUMN IF NOT EXISTS capacity_en   TEXT,
  ADD COLUMN IF NOT EXISTS capacity_ar   TEXT,
  ADD COLUMN IF NOT EXISTS year          TEXT,
  ADD COLUMN IF NOT EXISTS region_en     TEXT,
  ADD COLUMN IF NOT EXISTS region_ar     TEXT;

-- 5. Column-level permissions
-- Since 20260909000000 restricted anon SELECT on projects to specific columns,
-- explicitly grant anon SELECT on the public facts and featured column.
GRANT SELECT (client_en, client_ar, consultant_en, consultant_ar, scope_en, scope_ar, capacity_en, capacity_ar, year, region_en, region_ar, featured) ON public.projects TO anon;
