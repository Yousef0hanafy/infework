import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  Image,
  Inbox,
  Languages,
  Plus,
  Send,
  Settings as SettingsIcon,
  TriangleAlert,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, AdminPageHeader } from "@/components/infeworks/AdminUI";

const TITLE = "Owner Cockpit — Infeworks Admin";
const DESC = "Internal administration overview for Infeworks project records, content and leads.";

export const Route = createFileRoute("/admin/")({
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
  component: AdminHome,
});

async function count(
  table: "projects" | "leads" | "capabilities",
  filter?: { column: string; value: string },
) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) query = query.eq(filter.column, filter.value);
  const { count: c, error } = await query;
  if (error) throw error;
  return c ?? 0;
}

const QUICK_ACTIONS = [
  { label: "Add Project", hint: "Create a new project record", icon: Plus, to: "/admin/projects" as const },
  { label: "Edit Homepage", hint: "Hero, metrics and CTA copy", icon: FileText, to: "/admin/settings" as const },
  { label: "Manage Media", hint: "Covers, diagrams and alt text", icon: Image, to: "/admin/projects" as const },
  { label: "Site Settings", hint: "Brand, company and SEO", icon: SettingsIcon, to: "/admin/settings" as const },
  { label: "Manage Downloads", hint: "Company profile PDF", icon: Download, to: "/admin/settings" as const },
];

function AdminHome() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "cockpit"],
    queryFn: async () => {
      const [projects, published, drafts, newLeads, capabilities] = await Promise.all([
        count("projects"),
        count("projects", { column: "status", value: "published" }),
        count("projects", { column: "status", value: "draft" }),
        count("leads", { column: "status", value: "new" }),
        count("capabilities"),
      ]);

      const { data: profiles, error } = await supabase
        .from("public_project_profiles")
        .select("project_id, locale");
      if (error) throw error;

      const byProject = new Map<string, Set<string>>();
      for (const row of profiles ?? []) {
        const set = byProject.get(row.project_id) ?? new Set<string>();
        set.add(row.locale);
        byProject.set(row.project_id, set);
      }
      const complete = [...byProject.values()].filter(
        (s) => s.has("en") && s.has("ar"),
      ).length;
      const bilingual = projects === 0 ? 100 : Math.round((complete / projects) * 100);

      return { projects, published, drafts, newLeads, capabilities, bilingual };
    },
  });

  const summary = [
    {
      label: "Published Projects",
      value: data?.published,
      icon: Send,
      to: "/admin/projects" as const,
      note: `${data?.projects ?? 0} total records`,
    },
    {
      label: "Drafts Needing Attention",
      value: data?.drafts,
      icon: TriangleAlert,
      to: "/admin/projects" as const,
      note: "Complete and publish",
    },
    {
      label: "Bilingual Completeness",
      value: data ? `${data.bilingual}%` : undefined,
      icon: Languages,
      to: "/admin/projects" as const,
      note: "EN + AR profiles present",
    },
    {
      label: "Leads Inbox",
      value: data?.newLeads,
      icon: Inbox,
      to: "/admin/leads" as const,
      note: "New, unreviewed enquiries",
    },
    {
      label: "Capabilities",
      value: data?.capabilities,
      icon: FolderKanban,
      to: "/admin/capabilities" as const,
      note: "Disciplines published on site",
    },
    {
      label: "Download Asset Health",
      value: "OK",
      icon: CheckCircle2,
      to: "/admin/settings" as const,
      note: "Company profile PDF available",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AdminPageHeader
        eyebrow="Owner Cockpit"
        title="Welcome back"
        description="Everything you need to keep the public site accurate: projects, content, media, downloads and leads."
      />

      <section className="mt-10">
        <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
          Quick Actions
        </p>
        <div
          className="mt-4 grid gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ backgroundColor: "var(--iw-border)" }}
        >
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} to={action.to} className="block">
              <AdminCard className="h-full border-0 transition-colors hover:bg-[var(--iw-surface-alt)]">
                <action.icon
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  style={{ color: "var(--iw-accent)" }}
                />
                <p className="display-md mt-5 text-lg">{action.label}</p>
                <p className="mt-1 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
                  {action.hint}
                </p>
              </AdminCard>
            </Link>
          ))}
          <a href="/en" target="_blank" rel="noreferrer" className="block">
            <AdminCard className="h-full border-0 transition-colors hover:bg-[var(--iw-surface-alt)]">
              <ExternalLink
                className="h-5 w-5"
                strokeWidth={1.5}
                style={{ color: "var(--iw-accent)" }}
              />
              <p className="display-md mt-5 text-lg">View Live Website</p>
              <p className="mt-1 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
                Opens the public site in a new tab
              </p>
            </AdminCard>
          </a>
        </div>
      </section>

      <section className="mt-12">
        <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
          Operational Summary
        </p>
        <div
          className="mt-4 grid gap-px sm:grid-cols-2 lg:grid-cols-3"
          style={{ backgroundColor: "var(--iw-border)" }}
        >
          {summary.map((card) => (
            <Link key={card.label} to={card.to} className="block">
              <AdminCard className="h-full border-0 transition-colors hover:bg-[var(--iw-surface-alt)]">
                <card.icon
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  style={{ color: "var(--iw-accent)" }}
                />
                <p className="label-mono mt-6" style={{ color: "var(--iw-text-secondary)" }}>
                  {card.label}
                </p>
                <p className="display-md mt-2 text-4xl">
                  {isLoading ? "—" : (card.value ?? 0)}
                </p>
                <p className="mt-2 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
                  {card.note}
                </p>
              </AdminCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
