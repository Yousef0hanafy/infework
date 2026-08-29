import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminButton, AdminCard, AdminPageHeader } from "@/components/infeworks/AdminUI";

const TITLE = "Site Settings — Infeworks Admin";
const DESC = "Internal editor for Infeworks brand, company, homepage, download and SEO configuration.";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminSettings,
});

type Setting = { id: string; key: string; value: string | null };
type Field = { key: string; label: string; hint?: string; multiline?: boolean; dir?: "rtl" };

type Group = { id: string; label: string; description: string; fields: Field[] };

const GROUPS: Group[] = [
  {
    id: "brand",
    label: "Brand",
    description: "Corporate identity used across the header, footer and documents.",
    fields: [
      { key: "brand_name", label: "Wordmark" },
      { key: "brand_full_name_en", label: "Full legal name (EN)" },
      { key: "brand_full_name_ar", label: "Authoritative name (AR)", dir: "rtl" },
      { key: "brand_logo_url", label: "Logo asset URL", hint: "Optional — leave empty to use the wordmark." },
      { key: "brand_primary_color", label: "Primary colour", hint: "Hex value, e.g. #B05E2A" },
    ],
  },
  {
    id: "company",
    label: "Company",
    description: "Registered details and primary points of contact.",
    fields: [
      { key: "company_founded_year", label: "Founded year" },
      { key: "company_address_en", label: "Address (EN)" },
      { key: "company_address_ar", label: "Address (AR)", dir: "rtl" },
      { key: "contact_email", label: "Contact email" },
      { key: "contact_whatsapp", label: "WhatsApp number" },
      { key: "company_phone", label: "Telephone" },
    ],
  },
  {
    id: "homepage",
    label: "Homepage",
    description: "Hero copy and the three evidence metrics shown under the hero.",
    fields: [
      { key: "home_hero_eyebrow_en", label: "Hero eyebrow (EN)" },
      { key: "home_hero_headline_en", label: "Hero headline (EN)" },
      { key: "home_hero_cta_en", label: "Primary CTA label (EN)" },
      { key: "home_metric_1", label: "Metric 1 value", hint: "Years of engineering delivery" },
      { key: "home_metric_2", label: "Metric 2 value", hint: "Infrastructure projects delivered" },
      { key: "home_metric_3", label: "Metric 3 value", hint: "Integrated in-house delivery" },
    ],
  },
  {
    id: "capabilities",
    label: "Capabilities",
    description: "Public labels and display order for the five engineering disciplines.",
    fields: [
      { key: "capability_label_water_treatment", label: "Water & Treatment label" },
      { key: "capability_label_wastewater", label: "Wastewater label" },
      { key: "capability_label_pumping", label: "Pumping label" },
      { key: "capability_label_irrigation", label: "Irrigation label" },
      { key: "capability_label_electrical_control", label: "Electrical & Control label" },
      { key: "capability_order", label: "Display order", hint: "Comma-separated slugs" },
    ],
  },
  {
    id: "downloads",
    label: "Downloads",
    description: "Public document assets offered on the site.",
    fields: [
      { key: "downloads_company_profile_title", label: "Company profile title" },
      { key: "downloads_company_profile_url", label: "Company profile URL" },
      { key: "downloads_company_profile_version", label: "Version" },
    ],
  },
  {
    id: "contact",
    label: "Contact & WhatsApp",
    description: "Floating WhatsApp action and enquiry routing.",
    fields: [
      { key: "whatsapp_enabled", label: "Floating WhatsApp enabled", hint: "true or false" },
      { key: "whatsapp_number", label: "WhatsApp number (digits only)" },
      { key: "whatsapp_message_en", label: "Prefilled message (EN)", multiline: true },
      { key: "whatsapp_message_ar", label: "Prefilled message (AR)", multiline: true, dir: "rtl" },
      { key: "contact_office_address", label: "Office address shown on contact page" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    description: "Footer address block, navigation and copyright.",
    fields: [
      { key: "company_address_en", label: "Footer address (EN)" },
      { key: "company_address_ar", label: "Footer address (AR)", dir: "rtl" },
      { key: "footer_nav_links", label: "Footer navigation", hint: "Comma-separated route paths" },
      { key: "footer_copyright", label: "Copyright text" },
    ],
  },
  {
    id: "seo",
    label: "SEO & Localization",
    description: "Default metadata and locale behaviour.",
    fields: [
      { key: "seo_default_title", label: "Default meta title" },
      { key: "seo_default_description", label: "Default meta description", multiline: true },
      { key: "seo_og_image", label: "Default OG image URL" },
      { key: "seo_default_locale", label: "Default locale", hint: "en or ar" },
    ],
  },
];

function AdminSettings() {
  const qc = useQueryClient();
  const [active, setActive] = useState(GROUPS[0]!.id);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("id,key,value").order("key");
      if (error) throw error;
      return (data ?? []) as Setting[];
    },
  });

  const byKey = useMemo(
    () => new Map((settings ?? []).map((s) => [s.key, s] as const)),
    [settings],
  );

  useEffect(() => {
    if (!settings) return;
    setDraft(Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""])));
  }, [settings]);

  const save = useMutation({
    mutationFn: async (key: string) => {
      const existing = byKey.get(key);
      const value = draft[key] ?? "";
      if (existing) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_settings").insert({ key, value });
        if (error) throw error;
      }
    },
    onSuccess: (_data, key) => {
      setSaved(key);
      void qc.invalidateQueries({ queryKey: ["admin", "settings"] });
    },
  });

  const group = GROUPS.find((g) => g.id === active) ?? GROUPS[0]!;

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <AdminPageHeader
        eyebrow="Configuration"
        title="Site Settings Center"
        description="Grouped, human-readable configuration read by the public site."
      />

      <div
        className="mt-10 flex flex-wrap gap-px border"
        style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-border)" }}
        role="tablist"
        aria-label="Settings groups"
      >
        {GROUPS.map((g) => {
          const isActive = g.id === group.id;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(g.id)}
              className="px-4 py-3 text-xs font-semibold tracking-wide uppercase"
              style={{
                backgroundColor: isActive ? "var(--iw-accent)" : "var(--iw-surface)",
                color: isActive ? "#ffffff" : "var(--iw-text-secondary)",
              }}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
        {group.description}
      </p>

      <div className="mt-6 space-y-px" style={{ backgroundColor: "var(--iw-border)" }}>
        {isLoading ? (
          <AdminCard>Loading…</AdminCard>
        ) : (
          group.fields.map((field) => (
            <AdminCard key={`${group.id}-${field.key}`}>
              <label
                htmlFor={`s-${group.id}-${field.key}`}
                className="label-mono block"
                style={{ color: "var(--iw-text-secondary)" }}
              >
                {field.label}
              </label>
              <p className="mt-1 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
                {field.key}
                {field.hint ? ` — ${field.hint}` : ""}
                {byKey.has(field.key) ? "" : " — not set yet"}
              </p>
              <div className="mt-3 flex flex-wrap items-start gap-4">
                {field.multiline ? (
                  <textarea
                    id={`s-${group.id}-${field.key}`}
                    rows={3}
                    dir={field.dir}
                    value={draft[field.key] ?? ""}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                    }
                    className="min-w-0 flex-1 border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
                    style={{ borderColor: "var(--iw-border)" }}
                  />
                ) : (
                  <input
                    id={`s-${group.id}-${field.key}`}
                    dir={field.dir}
                    value={draft[field.key] ?? ""}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                    }
                    className="min-w-0 flex-1 border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
                    style={{ borderColor: "var(--iw-border)" }}
                  />
                )}
                <AdminButton
                  variant="solid"
                  disabled={save.isPending}
                  onClick={() => save.mutate(field.key)}
                >
                  <Save className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Save
                </AdminButton>
              </div>
              {saved === field.key ? (
                <p className="mt-3 text-xs" style={{ color: "var(--iw-success)" }}>
                  Saved.
                </p>
              ) : null}
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
