# Published catalogue outage recovery — 28 October 2026

The deployed catalogue returned eight curated seed projects instead of the previously captured 22 published projects. Production logs show `fetchPublicProjects failed TypeError: fetch failed`; the configured Supabase project reference has no resolving DNS record. The preceding image-only release changed 96 WebP files and deleted no project records or catalogue code. Live database status cannot be determined with the currently connected accounts; the available Lovable account contains a different project, and Supabase management access is not connected.

## Recovery

Use the last verified anonymous public catalogue during transport/service outages: 44 locale profiles covering exactly 22 published slugs. Profiles were captured on 15 October; the published slug set was rechecked on 18 October. Draft, admin, contact and private records are excluded. This is a public read-only outage snapshot, not a database restoration.

The live query remains authoritative when it succeeds. Successful empty results and valid missing/unpublished slugs remain empty/not-found. Permission failures do not trigger snapshot responses. Live recovery automatically removes the snapshot provenance indicator; snapshots are not merged into live results.

The public list, home and sector cards, case studies, and sitemap consume the same catalogue. Remove the old eight-item route fallbacks. Display a bilingual last-verified notice on the catalogue and snapshot case studies. Use existing image metadata; do not replace gallery mappings or alter the uploaded hero assets. Remove the stale static sitemap that masked the server route and indexed metadata-only drafts.

## Validation

Nine regression tests cover both locales, complete public membership, real project IDs, known and unknown details, healthy empty/unpublished results, live recovery, permission denial and six sector filters. Production build passed. The only TypeScript diagnostic is the same pre-existing admin header prop mismatch at `src/routes/admin.projects.$projectId.tsx:207`; comparison with the image-only production base confirms no new diagnostics.

Operational limitation: Supabase management access is still required to diagnose or resume the live database; no credentials or database settings were changed.

