# SEO phase 1: verification and analytics handoff

This release changes invalid-locale paths from homepage redirects to HTTP404, unifies the organization identity and corrects case-study structured data. Existing company facts, titles, public URLs, images and backend permissions/schema are preserved. The About schema no longer asserts an unverified headcount.

## Custom measurement contract

| Event | Trigger | Parameters | Interpretation |
| --- | --- | --- | --- |
| generate_lead | Technical contact submission returns success, with empty honeypot | inquiry_type=technical, locale=en/ar, page_type=contact | Saved technical enquiry, not human qualification or a contract |
| enquiry_saved | General or supplier submission returns success, with empty honeypot | inquiry_type=general/supplier, locale=en/ar, page_type=contact | Separate non-technical receipt |
| contact_intent | An uncancelled public WhatsApp, tel or mailto link activation | method=whatsapp/phone/email, locale=en/ar | Click intent, not a completed conversation |
| document_download_intent | An uncancelled public PDF link activation | document_type=pdf, locale=en/ar | Click intent, not confirmed download completion |

Only fixed categories are passed by these custom events. No submitted name, phone, email, message, organization, link text, destination, query string or arbitrary pathname is passed. Existing GA4 automatic events remain configured by the account. Custom intent event names deliberately differ from click and file_download; do not sum them as independent leads. No custom SPA page_view event is added without verifying Enhanced Measurement.

The custom helper calls the existing gtag function. Missing, blocked or throwing analytics never changes enquiry success or link navigation. A success is counted once per handled response, not globally deduplicated across repeat submissions or devices. The backend receipt does not contain an idempotency key. Spam-trap success responses are excluded. Supplier and general enquiries are not generate_lead.

The contact form has data-clarity-mask=true. This is the site's explicit masking instruction; verify new recordings and the actual Clarity project settings rather than assuming historical recordings are changed.

## Checks completed in code

- Locale guard exercises real notFound signals for invalid language/file paths and retains EN/AR.
- Schema tests separate WebPage from its Project subject, use valid Project.location, preserve English-first names and image selection, share organization identity, and omit unsupported client/provider/consultant-writing relationships.
- Actual About head is exercised in both locales.
- Real React contact-form tests use mocked server receipts to cover technical success/failure, honeypot, general and supplier submissions. No real enquiry is inserted by these tests.
- Helper tests reject unknown categories and demonstrate fixed payloads and graceful analytics failures.

## Production checks

Check missing paths and missing PDF/llms.txt return404, real PDF and sitemap URLs still return200, root/legacy redirects are preserved, schema graph appears in server HTML and hydrated links enqueue the custom events. Keep canonical/hreflang, bilingual-title and catalogue-navigation regression checks.

## Account-dependent follow-up (not configured by this release)

1. With GA4 property access, use DebugView to verify reception, consent behavior, automatic SPA page views and outbound/download settings. Register enquiry_type, locale, page_type, method or document_type as event-scoped custom dimensions only as needed.
2. Treat generate_lead as the technical receipt conversion; verify existing key-event configuration before marking or changing anything. Intent events remain microconversions. Human qualification and sales outcomes require separate review.
3. Verify Clarity masking in new recordings; never publish or inspect real private submissions as public test artifacts.
4. Establish the Egypt-filtered Search Console and Bing baseline, including available AI visibility reports. No ranking or indexing result is claimed from HTTP or schema checks alone.
5. Confirm office/mobile contact roles and official social-profile ownership before enriching contactPoint/sameAs. No new contact facts are invented here.
6. Review the separate approved SEO/GEO plan for service-page and case-evidence phases. This release does not implement those pages or alter database permissions/schema.
