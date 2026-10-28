import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Link2,
  MapPin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AdminButton,
  AdminCard,
  AdminPageHeader,
  StatusPill,
} from "@/components/infeworks/AdminUI";
import { logAudit } from "@/lib/audit";
import { BasicInfoTab } from "@/components/admin/project-editor/BasicInfoTab";
import { StoryTab } from "@/components/admin/project-editor/StoryTab";
import { FactsTab } from "@/components/admin/project-editor/FactsTab";
import { ClaimsTab } from "@/components/admin/project-editor/ClaimsTab";
import { LocationTab } from "@/components/admin/project-editor/LocationTab";
import { PreviewTab } from "@/components/admin/project-editor/PreviewTab";
import { type Project } from "@/components/admin/project-editor/types";

const TITLE = "Project Editor — Infeworks Admin";
const DESC =
  "Internal editor for a single Infeworks project record: profiles, facts, claims, evidence, location and media.";

export const Route = createFileRoute("/admin/projects/$projectId")({
  validateSearch: (search: Record<string, unknown>): { step?: string } => {
    const s = typeof search["step"] === "string" ? search["step"] : undefined;
    return s ? { step: s } : {};
  },
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
  component: ProjectEditor,
});

const STEPS = [
  { key: "basics", label: "Basics", icon: FileText, hint: "Identity, sector and status" },
  { key: "story", label: "Story", icon: FileText, hint: "Challenge, scope and outcome (EN/AR)" },
  { key: "facts", label: "Facts", icon: FileSpreadsheet, hint: "Client, capacity, year and scope" },
  {
    key: "evidence",
    label: "Evidence & Publish",
    icon: Link2,
    hint: "Verified claims and checklist",
  },
  { key: "map", label: "Map", icon: MapPin, hint: "Safe governorate centroid" },
  { key: "preview", label: "Preview", icon: Eye, hint: "Desktop and mobile public cards" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function ProjectEditor() {
  const { projectId } = Route.useParams();
  const search = Route.useSearch();
  const qc = useQueryClient();
  const initialStep: StepKey =
    search.step && STEPS.some((s) => s.key === search.step) ? (search.step as StepKey) : "basics";
  const [step, setStep] = useState<StepKey>(initialStep);

  useEffect(() => {
    if (search.step && STEPS.some((s) => s.key === search.step)) {
      setStep(search.step as StepKey);
    }
  }, [search.step]);

  const { data: project, isLoading } = useQuery({
    queryKey: ["admin", "project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "id,slug,classification,status,featured,internal_notes,client_en,client_ar,consultant_en,consultant_ar,scope_en,scope_ar,capacity_en,capacity_ar,year,region_en,region_ar",
        )
        .eq("id", projectId)
        .maybeSingle();

      if (error) throw error;
      return (data ?? null) as Project | null;
    },
  });

  // Query all project slugs for prev/next navigation
  const { data: allProjects } = useQuery({
    queryKey: ["admin", "projects", "order"],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("id,slug")
        .order("created_at", { ascending: false });
      return (data ?? []) as { id: string; slug: string }[];
    },
  });

  const currentIndex = allProjects?.findIndex((p) => p.id === projectId) ?? -1;
  const prev = currentIndex > 0 && allProjects ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && allProjects && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const { data: profiles } = useQuery({
    queryKey: ["admin", "profiles", projectId],
    staleTime: 60 * 1000,
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("public_project_profiles")
        .select("locale,title,challenge,outcome")
        .eq("project_id", projectId);
      if (error) throw error;
      return (rows ?? []) as {
        locale: string;
        title: string | null;
        challenge: string | null;
        outcome: string | null;
      }[];
    },
  });

  const { data: counts } = useQuery({
    queryKey: ["admin", "counts", projectId],
    staleTime: 30 * 1000,
    queryFn: async () => {
      const [claims, location] = await Promise.all([
        supabase
          .from("claims")
          .select("id", { count: "exact", head: true })
          .eq("project_id", projectId),
        supabase
          .from("locations")
          .select("id", { count: "exact", head: true })
          .eq("project_id", projectId),
      ]);
      return {
        claimsCount: claims.count ?? 0,
        locationCount: location.count ?? 0,
      };
    },
  });

  const has = (locale: string) => {
    const r = profiles?.find((x) => x.locale === locale);
    return Boolean(r?.title && r.title.trim());
  };
  const story = Boolean(profiles?.some((r) => r.challenge && r.outcome));

  const checklist = [
    { label: "English title", done: has("en"), required: true },
    { label: "Arabic title", done: has("ar"), required: true },
    { label: "Challenge & outcome written", done: story, required: true },
    { label: "At least one verified claim", done: (counts?.claimsCount ?? 0) > 0, required: true },
    { label: "Safe map location", done: (counts?.locationCount ?? 0) > 0, required: false },
  ];
  const completion = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);
  const publishReady = checklist.filter((c) => c.required).every((c) => c.done);

  const setStatus = useMutation({
    mutationFn: async (status: "draft" | "published") => {
      const { error } = await supabase.from("projects").update({ status }).eq("id", projectId);
      if (error) throw error;
      await logAudit({
        action: status === "published" ? "publish_project" : "unpublish_project",
        targetTable: "projects",
        targetId: projectId,
      });
    },
    onSuccess: (_, status) => {
      toast.success(
        status === "published" ? "Project published to live site." : "Project set to draft.",
      );
      void qc.invalidateQueries({ queryKey: ["admin", "project", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      void qc.invalidateQueries({ queryKey: ["admin", "cockpit"] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      toast.error(e instanceof Error ? e.message : "Failed to change status.");
    },
  });

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="space-y-10 pb-28">
      <AdminPageHeader
        title={project?.slug ?? "Loading project…"}
        description={`Record ID: ${projectId}`}
        status={
          project ? (
            <StatusPill tone={project.status === "published" ? "success" : "warning"}>
              {project.status}
            </StatusPill>
          ) : undefined
        }
        action={
          <div className="flex items-center gap-3">
            <span
              className="label-mono text-xs"
              style={{ color: "var(--iw-text-secondary)" }}
            >{`${completion}% complete`}</span>
          </div>
        }
      />

      {isLoading ? (
        <AdminCard>
          <p className="text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            Loading project data…
          </p>
        </AdminCard>
      ) : null}

      {project ? (
        <>
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((s, i) => {
              const active = s.key === step;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setStep(s.key)}
                    className="flex w-full flex-col gap-1 border p-3 text-start transition-colors"
                    style={{
                      borderColor: active ? "var(--iw-accent)" : "var(--iw-border)",
                      backgroundColor: active ? "rgba(14, 116, 144, 0.08)" : "transparent",
                    }}
                  >
                    <span className="label-mono">{`0${i + 1}`}</span>
                    <span className="text-sm font-semibold">{s.label}</span>
                    <span className="text-xs opacity-80">{s.hint}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 space-y-10">
            {step === "basics" ? <BasicInfoTab project={project} /> : null}
            {step === "story" ? <StoryTab projectId={project.id} /> : null}
            {step === "facts" ? <FactsTab project={project} /> : null}
            {step === "evidence" ? (
              <>
                <AdminCard>
                  <h2 className="display-md text-xl">Publication checklist</h2>
                  <ul className="mt-6 space-y-3">
                    {checklist.map((item) => (
                      <li key={item.label} className="flex items-center gap-3 text-sm">
                        {item.done ? (
                          <CheckCircle2
                            className="h-4 w-4"
                            strokeWidth={1.5}
                            style={{ color: "var(--iw-success)" }}
                          />
                        ) : (
                          <Circle
                            className="h-4 w-4"
                            strokeWidth={1.5}
                            style={{ color: "var(--iw-text-secondary)" }}
                          />
                        )}
                        <span>{item.label}</span>
                        <span
                          className="label-mono ms-auto"
                          style={{ color: "var(--iw-text-secondary)" }}
                        >
                          {item.required ? "required" : "optional"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AdminCard>
                <ClaimsTab projectId={project.id} />
              </>
            ) : null}
            {step === "map" ? <LocationTab projectId={project.id} /> : null}
            {step === "preview" ? <PreviewTab project={project} /> : null}
          </div>

          <div
            className="fixed inset-x-0 bottom-0 z-40 border-t"
            style={{ backgroundColor: "var(--iw-surface)", borderColor: "var(--iw-border)" }}
          >
            <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-4">
              {project.status === "published" ? (
                <a
                  href={`/en/work/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono inline-flex items-center gap-2 border px-4 py-2 text-xs hover:text-white transition-colors"
                  style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
                >
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                  View public live page
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep("preview")}
                  className="label-mono inline-flex items-center gap-2 border px-4 py-2 text-xs hover:text-white transition-colors"
                  style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
                >
                  <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Preview cards (Draft)
                </button>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {prev ? (
                  <Link
                    to="/admin/projects/$projectId"
                    params={{ projectId: prev.id }}
                    className="label-mono inline-flex items-center gap-2 border px-3 py-2"
                    style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Previous
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    to="/admin/projects/$projectId"
                    params={{ projectId: next.id }}
                    className="label-mono inline-flex items-center gap-2 border px-3 py-2"
                    style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
                  >
                    Next
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                ) : null}

                {stepIndex < STEPS.length - 1 ? (
                  <AdminButton onClick={() => setStep(STEPS[stepIndex + 1]!.key)}>
                    Next step
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </AdminButton>
                ) : null}

                {project.status === "published" ? (
                  <AdminButton
                    disabled={setStatus.isPending}
                    onClick={() => setStatus.mutate("draft")}
                  >
                    Unpublish
                  </AdminButton>
                ) : (
                  <AdminButton
                    variant="solid"
                    disabled={setStatus.isPending || !publishReady}
                    onClick={() => setStatus.mutate("published")}
                  >
                    Publish
                  </AdminButton>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
