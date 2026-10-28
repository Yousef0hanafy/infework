# Phase 1 reliability release — 28 October 2026

Code changes target the deployed catalogue baseline `164cb70`. They preserve published membership, translations, stable URLs and existing image mappings.

## Implemented

- Safe script-context JSON-LD serialization across public pages, preserving normal engineering text.
- Consistent admin-header status/action props; TypeScript now passes.
- Shared enquiry schema with server/client limits, required contact fields and conditional inquiry selections. Visible, associated select errors are exercised through a rendered React form. Filled honeypots are discarded before processing.
- Enquiry success requires a successful storage response. Missing configuration returns failure, operational logs exclude full private enquiry payloads, and the error state offers existing email, phone and WhatsApp links. Input stays available after failure. No notification or response-time guarantee is invented.
- Public fetch deadlines include response-body delivery. SDK read retries are disabled; transport-only health backoff is brief and holds no response or identity data. Writes are not automatically retried. Actual SDK tests cover timeout, server failure, repeated requests during backoff and denied access.
- Successful live membership stays authoritative through auxiliary failures. Capability/location failures surface instead of masquerading as legitimate empty records. A signing-only failure permits local public covers and carries a media-unavailable indicator. The sector blanket catch is removed.
- Media signing uses a project-owned bounded adapter; generated Supabase integration code is unchanged.
- Service-worker caching is limited to public static asset paths; server functions, admin paths and authorization-bearing requests bypass it. Runtime cache eviction is separate from the precached offline shell. A version update retires old caches.
- Outage provenance also appears with the homepage map and sector content.
- Compatible Vite and transitive-package security patches applied; CI checks types, tests, lint and build on Node 24.

## Verification

The regression suite, TypeScript and lint pass; lint retains the existing fast-refresh warnings. The local production build passes with bounded worker/thread parallelism and a 2 GB Node heap. Generated route-tree line-ending changes are restored before commit. GitHub CI and the deployment preview verify the committed version before production promotion.

Claude reviewed the implementation read-only. Its important findings were reproduced and fixed: SDK transport-error rewriting, missing select-error feedback, signing-only failures, and eviction of the offline shell. Tests use the actual Supabase SDK, a rendered contact form, service-worker execution and real local PostgreSQL via PGlite. They do not substitute for a live Storage HTTP or end-to-end lead-delivery check.

## Prepared, not applied to the live database

See [the guarded SQL](../security/phase1-hardening.sql) and [rollout procedure](../security/phase1-rollout.md). Local PostgreSQL tests cover legacy broad policies, ordinary and anonymous accounts, authorized admin access, audit identity, publication-approved media and guarded rollout preconditions. Live project identity, admin account, schema/policy state and bucket visibility remain unverified. The script is outside automatic migrations and has not changed production permissions.

## Remaining work

- Restore/verify the live backend and execute the database rollout against a staging copy before production. Enquiry persistence and admin writes still depend on it.
- Configure durable service-level abuse controls, delivery notifications/outbox and monitoring with the actual service; the application does not claim a distributed rate limiter or an outage-independent queue.
- Zod remains flagged by dependency audit. The advisory concerns unbounded array validation; no `z.array` use was found in application source. A compatible major-version migration remains a tracked maintenance task; no forced dependency upgrade or advisory suppression was used. [Advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).
- The count-free catalogue redesign, broader UI polish, SEO refinements and media integration belong to the agreed following phases.
