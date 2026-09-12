import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Eye,
  EyeOff,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  GripVertical,
  Image as ImageIcon,
  Link2,
  MapPin,
  Maximize2,
  Plus,
  RefreshCw,
  Save,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AdminButton,
  AdminCard,
  AdminPageHeader,
  StatusPill,
} from "@/components/infeworks/AdminUI";
import {
  FormNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/infeworks/AdminFields";
import { logAudit } from "@/lib/audit";
import { getProjectMeta } from "@/lib/project-meta";

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
  {
    key: "media",
    label: "Media & Downloads",
    icon: ImageIcon,
    hint: "Photos, schema and alt text",
  },
  { key: "preview", label: "Preview", icon: Eye, hint: "Desktop and mobile public cards" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

type Project = {
  id: string;
  slug: string;
  classification: string;
  status: string;
  featured: boolean;
  internal_notes: string | null;
  client_en: string | null;
  client_ar: string | null;
  consultant_en: string | null;
  consultant_ar: string | null;
  scope_en: string | null;
  scope_ar: string | null;
  capacity_en: string | null;
  capacity_ar: string | null;
  year: string | null;
  region_en: string | null;
  region_ar: string | null;
};

type Profile = {
  id: string;
  project_id: string;
  locale: string;
  title: string;
  challenge: string | null;
  outcome: string | null;
};

type Claim = {
  id: string;
  project_id: string;
  locale: string;
  content: string;
};

type Evidence = {
  id: string;
  claim_id: string;
  internal_link: string | null;
  internal_description: string | null;
};

type LocationRow = {
  id: string;
  project_id: string;
  lat: number;
  lng: number;
  display_name: string | null;
};

type MediaAsset = {
  id: string;
  project_id: string;
  storage_path: string;
  alt_en: string | null;
  alt_ar: string | null;
  is_public: boolean;
  media_type: "photo" | "schema";
  mime_type: string | null;
  sort_order: number;
  created_at: string;
};

const BUCKET = "project-media";

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
      let res = await supabase
        .from("projects")
        .select(
          "id,slug,classification,status,featured,internal_notes,client_en,client_ar,consultant_en,consultant_ar,scope_en,scope_ar,capacity_en,capacity_ar,year,region_en,region_ar",
        )
        .eq("id", projectId)
        .maybeSingle();

      if (res.error && res.error.code === "42703") {
        res = await supabase
          .from("projects")
          .select("id,slug,classification,status,featured,internal_notes")
          .eq("id", projectId)
          .maybeSingle();
      }

      if (res.error) throw res.error;
      const d = (res.data ?? null) as any;
      if (!d) return null;

      return {
        ...d,
        client_en: d.client_en ?? null,
        client_ar: d.client_ar ?? null,
        consultant_en: d.consultant_en ?? null,
        consultant_ar: d.consultant_ar ?? null,
        scope_en: d.scope_en ?? null,
        scope_ar: d.scope_ar ?? null,
        capacity_en: d.capacity_en ?? null,
        capacity_ar: d.capacity_ar ?? null,
        year: d.year ?? null,
        region_en: d.region_en ?? null,
        region_ar: d.region_ar ?? null,
      } as Project;
    },
  });

  const { data: siblings } = useQuery({
    queryKey: ["admin", "project-order"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,slug")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as { id: string; slug: string }[];
    },
  });

  const { data: completeness } = useQuery({
    queryKey: ["admin", "project-completeness", projectId],
    queryFn: async () => {
      const [profiles, claims, location, media] = await Promise.all([
        supabase
          .from("public_project_profiles")
          .select("locale,title,challenge,outcome")
          .eq("project_id", projectId),
        supabase
          .from("claims")
          .select("id", { count: "exact", head: true })
          .eq("project_id", projectId),
        supabase
          .from("locations")
          .select("id", { count: "exact", head: true })
          .eq("project_id", projectId),
        supabase
          .from("media_assets")
          .select("id", { count: "exact", head: true })
          .eq("project_id", projectId),
      ]);
      const rows = (profiles.data ?? []) as {
        locale: string;
        title: string | null;
        challenge: string | null;
        outcome: string | null;
      }[];
      const has = (locale: string) => {
        const r = rows.find((x) => x.locale === locale);
        return Boolean(r?.title && r.title.trim());
      };
      const story = rows.some((r) => r.challenge && r.outcome);
      return {
        titleEn: has("en"),
        titleAr: has("ar"),
        story,
        claims: (claims.count ?? 0) > 0,
        location: (location.count ?? 0) > 0,
        media: (media.count ?? 0) > 0,
      };
    },
  });

  const checklist = [
    { label: "English title", done: Boolean(completeness?.titleEn), required: true },
    { label: "Arabic title", done: Boolean(completeness?.titleAr), required: true },
    { label: "Challenge & outcome written", done: Boolean(completeness?.story), required: true },
    { label: "At least one verified claim", done: Boolean(completeness?.claims), required: true },
    { label: "Safe map location", done: Boolean(completeness?.location), required: false },
    { label: "Cover or technical media", done: Boolean(completeness?.media), required: false },
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
        detail: `status=${status}`,
      });
      return status;
    },
    onSuccess: (status) => {
      void qc.invalidateQueries({ queryKey: ["admin", "project", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      toast.success(
        status === "published" ? "Project published live." : "Project reverted to draft.",
      );
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update project publication status.");
    },
  });

  const order = siblings ?? [];
  const index = order.findIndex((p) => p.id === projectId);
  const prev = index > 0 ? order[index - 1] : undefined;
  const next = index >= 0 && index < order.length - 1 ? order[index + 1] : undefined;
  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const current = STEPS[stepIndex] ?? STEPS[0]!;

  return (
    <div className="mx-auto w-full max-w-[1200px] pb-32">
      <Link
        to="/admin/projects"
        className="label-mono inline-flex items-center gap-2"
        style={{ color: "var(--iw-text-secondary)" }}
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        All projects
      </Link>

      <div className="mt-6">
        <AdminPageHeader
          eyebrow={`Step ${stepIndex + 1} of ${STEPS.length} — ${current.label}`}
          title={project?.slug ?? (isLoading ? "Loading…" : "Not found")}
          description="Follow the steps in order. Required fields must be complete before publishing."
          action={
            project ? (
              <div className="flex items-center gap-3">
                <StatusPill tone={project.status === "published" ? "success" : "warning"}>
                  {project.status}
                </StatusPill>
                {project.featured ? <StatusPill tone="neutral">featured</StatusPill> : null}
              </div>
            ) : null
          }
        />
      </div>

      {!project && !isLoading ? (
        <p className="mt-10 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
          This project record does not exist.
        </p>
      ) : null}

      {project ? (
        <>
          <ol
            className="mt-8 grid gap-px border grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"
            style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-border)" }}
          >
            {STEPS.map((s, i) => {
              const active = s.key === step;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setStep(s.key)}
                    className="flex w-full flex-col gap-1 p-4 text-start transition-colors"
                    style={{
                      backgroundColor: active ? "var(--iw-accent)" : "var(--iw-surface)",
                      color: active ? "#ffffff" : "var(--iw-text-secondary)",
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
            {step === "basics" ? (
              <MetaTab project={project} onGoToMedia={() => setStep("media")} />
            ) : null}
            {step === "story" ? (
              <>
                <ProfileEditor projectId={project.id} locale="en" />
                <ProfileEditor projectId={project.id} locale="ar" />
              </>
            ) : null}
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
            {step === "media" ? <MediaTab projectId={project.id} projectSlug={project.slug} /> : null}
            {step === "preview" ? <PreviewStep project={project} /> : null}
          </div>

          <div
            className="fixed inset-x-0 bottom-0 z-40 border-t"
            style={{ backgroundColor: "var(--iw-surface)", borderColor: "var(--iw-border)" }}
          >
            <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-4">
              <a
                href={`/en/work/${project.slug}`}
                target="_blank"
                rel="noreferrer"
                className="label-mono inline-flex items-center gap-2 border px-4 py-2 text-xs hover:text-white transition-colors"
                style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                Preview public live page
              </a>

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
                    disabled={
                      setStatus.isPending || !publishReady
                    }
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

/* ------------------------------- Tab 7: preview ----------------------------- */

function PreviewStep({ project }: { project: Project }) {
  const meta = getProjectMeta(project.slug);

  const { data: profiles } = useQuery({
    queryKey: ["admin", "preview-profiles", project.id],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("public_project_profiles")
        .select("locale,title,challenge,outcome")
        .eq("project_id", project.id);
      if (error) throw error;
      return (rows ?? []) as {
        locale: string;
        title: string;
        challenge: string | null;
        outcome: string | null;
      }[];
    },
  });

  const { data: mediaAssets } = useQuery({
    queryKey: ["admin", "preview-media", project.id],
    queryFn: async () => {
      let res = await supabase
        .from("media_assets")
        .select("id,storage_path,media_type,mime_type,is_public,sort_order")
        .eq("project_id", project.id)
        .order("sort_order", { ascending: true });

      if (res.error && res.error.code === "42703") {
        const fallback = await supabase
          .from("media_assets")
          .select("id,storage_path,is_public")
          .eq("project_id", project.id);
        return ((fallback.data ?? []) as any[]).map((m, idx) => ({
          ...m,
          media_type: m.storage_path?.includes("/schema/") ? "schema" : "photo",
          mime_type: m.storage_path?.endsWith(".pdf") ? "application/pdf" : "image/webp",
          sort_order: idx + 1,
        })) as MediaAsset[];
      }

      if (res.error) throw res.error;
      return (res.data ?? []) as MediaAsset[];
    },
  });

  const coverAsset = mediaAssets?.find((m) => m.media_type === "photo" && m.is_public);
  const schemaAsset = mediaAssets?.find((m) => m.media_type === "schema");

  const { data: coverUrl } = useQuery({
    queryKey: ["admin", "preview-cover-url", coverAsset?.id],
    enabled: Boolean(coverAsset),
    queryFn: async () => {
      if (!coverAsset) return null;
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(coverAsset.storage_path, 600);
      if (error) throw error;
      return data.signedUrl;
    },
  });

  const en = profiles?.find((r) => r.locale === "en");
  const ar = profiles?.find((r) => r.locale === "ar");
  const resolvedCover = coverUrl || meta?.cover || null;

  return (
    <div className="space-y-8">
      <AdminCard>
        <h2 className="display-md text-xl">Overview & Resolved Assets</h2>
        <p className="body-reading mt-2 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
          How public data, facts, cover, and diagram resolve for this project.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="border p-4" style={{ borderColor: "var(--iw-border)" }}>
            <p className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
              Cover Image Source
            </p>
            <div className="mt-3 aspect-video w-full overflow-hidden bg-black/20">
              {resolvedCover ? (
                <img
                  src={resolvedCover}
                  alt={en?.title || project.slug}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: "var(--iw-text-secondary)" }}>
                  No cover available
                </div>
              )}
            </div>
            <p className="mt-2 text-xs font-mono truncate" style={{ color: "var(--iw-text-secondary)" }}>
              {coverAsset ? "DB Media Asset (sort_order=1)" : meta?.cover ? "Static Fallback (project-meta.ts)" : "None"}
            </p>
          </div>

          <div className="border p-4" style={{ borderColor: "var(--iw-border)" }}>
            <p className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
              Project Schema / Diagram
            </p>
            <div className="mt-3 space-y-2">
              <StatusPill tone={schemaAsset?.is_public ? "success" : schemaAsset ? "warning" : "muted"}>
                {schemaAsset ? (schemaAsset.is_public ? "Published Schema" : "Internal Schema") : "Generic Sector Schematic"}
              </StatusPill>
              <p className="text-xs" style={{ color: "var(--iw-text-secondary)" }}>
                {schemaAsset
                  ? schemaAsset.is_public
                    ? `Public ${schemaAsset.mime_type || "asset"} replaces generic SVG diagram.`
                    : "Internal asset only. Generic sector schematic shown as fallback."
                  : "No per-project schema. Sector capability schematic shown as fallback."}
              </p>
            </div>
          </div>

          <div className="border p-4" style={{ borderColor: "var(--iw-border)" }}>
            <p className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
              Key Technical Facts
            </p>
            <div className="mt-3 space-y-1.5 text-xs">
              <p><strong>Client:</strong> {project.client_en || meta?.client?.en || "—"}</p>
              <p><strong>Capacity:</strong> {project.capacity_en || meta?.capacity?.en || "—"}</p>
              <p><strong>Year:</strong> {project.year || meta?.year || "—"}</p>
              <p><strong>Region:</strong> {project.region_en || meta?.region?.en || "—"}</p>
            </div>
          </div>
        </div>
      </AdminCard>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <AdminCard>
          <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
            Desktop card — English
          </p>
          <h2 className="display-md mt-4 text-3xl">{en?.title || "Untitled project"}</h2>
          <p className="mt-4 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            {en?.challenge || "No challenge text yet."}
          </p>
          <p className="mt-3 text-sm">{en?.outcome || "No outcome text yet."}</p>
        </AdminCard>

        <AdminCard>
          <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
            Mobile card — Arabic
          </p>
          <div dir="rtl" style={{ fontFamily: "var(--font-arabic)" }}>
            <h2 className="display-md mt-4 text-2xl">{ar?.title || "بدون عنوان"}</h2>
            <p className="mt-4 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
              {ar?.challenge || "لا يوجد نص للتحدي بعد."}
            </p>
            <p className="mt-3 text-sm">{ar?.outcome || "لا يوجد نص للنتيجة بعد."}</p>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

/* ------------------------------- Tab 1: meta ------------------------------ */

function MetaTab({
  project,
  onGoToMedia,
}: {
  project: Project;
  onGoToMedia: () => void;
}) {
  const router = useRouter();
  const qc = useQueryClient();
  const [slug, setSlug] = useState(project.slug);
  const [classification, setClassification] = useState(project.classification);
  const [notes, setNotes] = useState(project.internal_notes ?? "");
  const [featured, setFeatured] = useState(project.featured);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Cover image from static catalog or uploaded
  const meta = useMemo(() => getProjectMeta(project.slug), [project.slug]);
  const coverUrl = meta?.cover;
  const totalCatalogPhotos = (meta?.gallery?.length ?? 0) + (meta?.cover ? 1 : 0);

  // Danger Zone delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmSlug, setConfirmSlug] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: allCaps } = useQuery({
    queryKey: ["admin", "capabilities"],
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("capabilities")
        .select("id, slug, en_name, ar_name")
        .order("en_name");
      if (err) throw err;
      return data ?? [];
    },
  });

  const { data: assignedCaps } = useQuery({
    queryKey: ["admin", "project_capabilities", project.id],
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("project_capabilities")
        .select("capability_id")
        .eq("project_id", project.id);
      if (err) throw err;
      return (data ?? []).map((r) => r.capability_id);
    },
  });

  const [selectedCapIds, setSelectedCapIds] = useState<string[]>([]);
  useEffect(() => {
    if (assignedCaps) {
      setSelectedCapIds(assignedCaps);
    }
  }, [assignedCaps]);

  const toggleCap = (capId: string) => {
    setSelectedCapIds((prev) =>
      prev.includes(capId) ? prev.filter((id) => id !== capId) : [...prev, capId],
    );
  };

  const save = useMutation({
    mutationFn: async () => {
      const trimmedSlug = slug.trim();
      if (!trimmedSlug) {
        throw new Error("Slug cannot be empty.");
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmedSlug)) {
        throw new Error(
          "Slug must consist of lowercase letters, numbers, and hyphens only (e.g. sadat-city-ro).",
        );
      }

      const { error: err } = await supabase
        .from("projects")
        .update({
          slug: trimmedSlug,
          classification,
          featured,
          internal_notes: notes.trim() || null,
        })
        .eq("id", project.id);
      if (err) throw err;

      const current = assignedCaps ?? [];
      const toAdd = selectedCapIds.filter((id) => !current.includes(id));
      const toRemove = current.filter((id) => !selectedCapIds.includes(id));

      if (toRemove.length > 0) {
        const { error: delErr } = await supabase
          .from("project_capabilities")
          .delete()
          .eq("project_id", project.id)
          .in("capability_id", toRemove);
        if (delErr) throw delErr;
      }

      if (toAdd.length > 0) {
        const { error: insErr } = await supabase
          .from("project_capabilities")
          .insert(toAdd.map((cId) => ({ project_id: project.id, capability_id: cId })));
        if (insErr) throw insErr;
      }

      await logAudit({
        action: "update_project",
        targetTable: "projects",
        targetId: project.id,
        detail: `slug=${trimmedSlug} classification=${classification} featured=${featured}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success("Identity & sector capabilities saved.");
      void qc.invalidateQueries({ queryKey: ["admin", "project", project.id] });
      void qc.invalidateQueries({ queryKey: ["admin", "project_capabilities", project.id] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Could not save project.";
      setError(msg);
      toast.error(msg);
    },
  });

  const deleteProject = useMutation({
    mutationFn: async () => {
      if (confirmSlug.trim().toLowerCase() !== project.slug.toLowerCase()) {
        throw new Error("Project slug does not match.");
      }

      // 1. Fetch all media assets for storage removal
      let mediaPaths: string[] = [];
      try {
        const { data: mediaRows } = await supabase
          .from("media_assets")
          .select("storage_path")
          .eq("project_id", project.id);
        if (mediaRows && mediaRows.length > 0) {
          mediaPaths = mediaRows.map((m) => m.storage_path).filter(Boolean);
        }
      } catch (err) {
        console.warn("Could not query media assets for storage cleanup:", err);
      }

      if (mediaPaths.length > 0) {
        const { error: sErr } = await supabase.storage.from(BUCKET).remove(mediaPaths);
        if (sErr) console.warn("Storage cleanup warning:", sErr);
      }

      // 2. Cascading deletes from child tables
      try {
        const { data: claims } = await supabase
          .from("claims")
          .select("id")
          .eq("project_id", project.id);
        const claimIds = (claims ?? []).map((c) => c.id);
        if (claimIds.length > 0) {
          await supabase.from("evidence").delete().in("claim_id", claimIds);
        }
      } catch (err) {
        console.warn("Evidence cleanup warning:", err);
      }

      await supabase.from("claims").delete().eq("project_id", project.id);
      await supabase.from("media_assets").delete().eq("project_id", project.id);
      await supabase.from("project_capabilities").delete().eq("project_id", project.id);
      await supabase.from("public_project_profiles").delete().eq("project_id", project.id);
      await supabase.from("locations").delete().eq("project_id", project.id);

      // 3. Delete parent project row
      const { error: pErr } = await supabase.from("projects").delete().eq("id", project.id);
      if (pErr) throw pErr;

      // 4. Log audit record
      await logAudit({
        action: "delete_project",
        targetTable: "projects",
        targetId: project.id,
        detail: `Permanently deleted project ${project.slug} and ${mediaPaths.length} storage files.`,
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "projects-list"] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      void qc.invalidateQueries({ queryKey: ["admin", "summary"] });
      toast.success(`Project "${project.slug}" permanently deleted.`);
      router.navigate({ to: "/admin/projects" });
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Failed to delete project.";
      setDeleteError(msg);
      toast.error(msg);
    },
  });

  return (
    <>
      {/* Cover & Media Snapshot Card */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded border border-neutral-800 bg-neutral-900 shadow">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={project.slug}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-600">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="display-md text-base text-white">Project Cover & Photos</h3>
                <StatusPill tone="success">Active on site</StatusPill>
              </div>
              <p className="body-reading text-xs text-neutral-400 mt-1">
                {totalCatalogPhotos > 0
                  ? `${totalCatalogPhotos} active photos catalogued for ${project.slug}`
                  : "No photos uploaded or catalogued yet"}
              </p>
              <p className="font-mono text-[11px] text-neutral-500 mt-0.5 truncate">
                {coverUrl ? coverUrl : "Default fallback"}
              </p>
            </div>
          </div>
          <AdminButton onClick={onGoToMedia}>
            <ImageIcon className="h-3.5 w-3.5" />
            Manage Media & Photos ({totalCatalogPhotos}) →
          </AdminButton>
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="display-md text-xl">Project Identity & URL</h2>
        <div className="mt-6">
          <TextField id="m-slug" label="Slug (Public URL Identifier)" value={slug} onChange={setSlug} />
          <p className="mt-1.5 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            URL identifier. Use lowercase letters, numbers, and hyphens (e.g. <code>sadat-city-ro</code>). Public live page: <code className="text-white">/work/{slug}</code>
          </p>
        </div>

        <div className="mt-6 rounded border p-4" style={{ borderColor: "var(--iw-border)" }}>
          <div className="flex items-center gap-3">
            <input
              id="m-featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="m-featured" className="text-sm font-medium">
              Featured Flagship Project
            </label>
          </div>
          <p className="mt-1 text-xs" style={{ color: "var(--iw-text-secondary)", paddingLeft: "1.75rem" }}>
            Featured projects appear at the top of the portfolio grid on both the Homepage and the Work index.
          </p>
        </div>

        <div className="mt-8">
          <label className="label-mono block" style={{ color: "var(--iw-text-secondary)" }}>
            Assigned Sectors / Capabilities
          </label>
          <p className="mt-1 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            Select which sectors this project belongs to. Used for public site filtering and schematic fallbacks.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(allCaps ?? []).map((cap) => {
              const checked = selectedCapIds.includes(cap.id);
              return (
                <label
                  key={cap.id}
                  className="flex cursor-pointer items-start gap-3 rounded border p-3 transition-colors"
                  style={{
                    borderColor: checked ? "var(--iw-accent)" : "var(--iw-border)",
                    backgroundColor: checked ? "rgba(14, 116, 144, 0.05)" : "transparent",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCap(cap.id)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <div className="text-xs">
                    <p className="font-medium">{cap.en_name}</p>
                    <p className="mt-0.5" dir="rtl" style={{ color: "var(--iw-text-secondary)" }}>
                      {cap.ar_name}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <TextAreaField
            id="m-notes"
            label="Internal notes"
            value={notes}
            onChange={setNotes}
            rows={4}
          />
        </div>

        {error ? (
          <div className="mt-6">
            <FormNotice tone="error">{error}</FormNotice>
          </div>
        ) : null}
        {saved && !error ? (
          <div className="mt-6">
            <FormNotice tone="success">Record and capabilities saved.</FormNotice>
          </div>
        ) : null}

        <div className="mt-8 flex justify-end">
          <AdminButton variant="solid" disabled={save.isPending} onClick={() => save.mutate()}>
            <Save className="h-3.5 w-3.5" strokeWidth={2} />
            {save.isPending ? "Saving…" : "Save record"}
          </AdminButton>
        </div>
      </AdminCard>

      {/* Danger Zone */}
      <div
        className="mt-10 border border-red-900/50 bg-red-950/10 p-6 md:p-8"
        style={{ borderColor: "rgba(220, 38, 38, 0.25)" }}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" strokeWidth={1.75} />
              <h3 className="display-md text-lg font-semibold text-red-300">Danger Zone</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--iw-text-secondary)] max-w-2xl">
              Permanently delete this project. This removes all uploaded photos and custom schematics from storage, translation profiles, claims, evidence, location coordinates, and unlinks capabilities. This action is irreversible.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmSlug("");
              setDeleteError(null);
              setDeleteOpen(true);
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 border border-red-800/80 bg-red-950/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-300 transition-colors hover:bg-red-900/60 hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete Project
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg border border-red-900/60 p-8 shadow-2xl"
            style={{ backgroundColor: "var(--iw-surface)" }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="display-md text-xl text-red-300">Delete Project Permanently</h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="text-[var(--iw-text-secondary)] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-xs text-[var(--iw-text-secondary)] leading-relaxed">
              This action <strong>CANNOT</strong> be undone. It will permanently purge all assets and database rows associated with this project:
            </p>
            <ul className="mt-2.5 list-disc space-y-1 pl-5 text-xs text-[var(--iw-text-secondary)]">
              <li>Project photos & custom engineering schematics from storage</li>
              <li>Bilingual profiles, challenges, and outcomes</li>
              <li>Engineering claims, technical facts & evidence</li>
              <li>Public map coordinates and sector capabilities</li>
            </ul>

            <div className="mt-6 border border-red-900/40 bg-red-950/20 p-4">
              <label htmlFor="confirm-slug-input" className="block text-xs text-[var(--iw-text-secondary)]">
                To confirm, type the project slug: <strong className="font-mono text-red-300">{project.slug}</strong>
              </label>
              <input
                id="confirm-slug-input"
                type="text"
                value={confirmSlug}
                onChange={(e) => setConfirmSlug(e.target.value)}
                placeholder={project.slug}
                className="mt-2 w-full border border-red-900/50 bg-black/50 px-3.5 py-2 font-mono text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            {deleteError ? (
              <div className="mt-4">
                <FormNotice tone="error">{deleteError}</FormNotice>
              </div>
            ) : null}

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="border border-[var(--iw-border)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--iw-text-secondary)] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={confirmSlug.trim().toLowerCase() !== project.slug.toLowerCase() || deleteProject.isPending}
                onClick={() => deleteProject.mutate()}
                className="inline-flex items-center gap-2 border border-red-600 bg-red-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-opacity disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {deleteProject.isPending ? "Deleting…" : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/* ------------------------------- Tab 3: facts ------------------------------ */

function FactsTab({ project }: { project: Project }) {
  const qc = useQueryClient();
  const [clientEn, setClientEn] = useState(project.client_en ?? "");
  const [clientAr, setClientAr] = useState(project.client_ar ?? "");
  const [consultantEn, setConsultantEn] = useState(project.consultant_en ?? "");
  const [consultantAr, setConsultantAr] = useState(project.consultant_ar ?? "");
  const [scopeEn, setScopeEn] = useState(project.scope_en ?? "");
  const [scopeAr, setScopeAr] = useState(project.scope_ar ?? "");
  const [capacityEn, setCapacityEn] = useState(project.capacity_en ?? "");
  const [capacityAr, setCapacityAr] = useState(project.capacity_ar ?? "");
  const [year, setYear] = useState(project.year ?? "");
  const [regionEn, setRegionEn] = useState(project.region_en ?? "");
  const [regionAr, setRegionAr] = useState(project.region_ar ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const meta = getProjectMeta(project.slug);

  const save = useMutation({
    mutationFn: async () => {
      const { error: err } = await supabase
        .from("projects")
        .update({
          client_en: clientEn.trim() || null,
          client_ar: clientAr.trim() || null,
          consultant_en: consultantEn.trim() || null,
          consultant_ar: consultantAr.trim() || null,
          scope_en: scopeEn.trim() || null,
          scope_ar: scopeAr.trim() || null,
          capacity_en: capacityEn.trim() || null,
          capacity_ar: capacityAr.trim() || null,
          year: year.trim() || null,
          region_en: regionEn.trim() || null,
          region_ar: regionAr.trim() || null,
        })
        .eq("id", project.id);
      if (err) {
        if (err.code === "42703") {
          throw new Error(
            "Technical fact columns are not yet deployed to the remote database. Please run migration '20260912220000_projects_admin_overhaul_foundation.sql' in your Supabase SQL editor.",
          );
        }
        throw err;
      }
      await logAudit({
        action: "update_project_facts",
        targetTable: "projects",
        targetId: project.id,
        detail: `year=${year.trim()} client=${clientEn.trim()}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success("Technical facts saved successfully.");
      void qc.invalidateQueries({ queryKey: ["admin", "project", project.id] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Could not save facts.";
      setError(msg);
      toast.error(msg);
    },
  });

  const prefillFromMeta = () => {
    if (!meta) return;
    if (meta.client?.en) setClientEn(meta.client.en);
    if (meta.client?.ar) setClientAr(meta.client.ar);
    if (meta.consultant?.en) setConsultantEn(meta.consultant.en);
    if (meta.consultant?.ar) setConsultantAr(meta.consultant.ar);
    if (meta.scope?.en) setScopeEn(meta.scope.en);
    if (meta.scope?.ar) setScopeAr(meta.scope.ar);
    if (meta.capacity?.en) setCapacityEn(meta.capacity.en);
    if (meta.capacity?.ar) setCapacityAr(meta.capacity.ar);
    if (meta.year) setYear(meta.year);
    if (meta.region?.en) setRegionEn(meta.region.en);
    if (meta.region?.ar) setRegionAr(meta.region.ar);
    toast.info("Pre-filled form with static catalog facts.");
  };

  return (
    <AdminCard>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="display-md text-xl">Technical & Contract Facts</h2>
          <p className="body-reading mt-1 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            These bilingual facts are presented in the sidebar of the public project page.
          </p>
        </div>
        {meta ? (
          <div className="flex items-center gap-2">
            <span
              className="rounded border px-2.5 py-1 text-xs"
              style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
            >
              Catalog fallback active
            </span>
            <AdminButton variant="outline" onClick={prefillFromMeta}>
              Pre-fill from catalog
            </AdminButton>
          </div>
        ) : null}
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-client-en"
            label="Client (EN)"
            value={clientEn}
            onChange={setClientEn}
            placeholder={meta?.client?.en ?? "e.g. National Service Projects Organisation"}
          />
          <TextField
            id="f-client-ar"
            label="Client (AR)"
            value={clientAr}
            onChange={setClientAr}
            dir="rtl"
            placeholder={meta?.client?.ar ?? "مثال: جهاز مشروعات الخدمة الوطنية"}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-consultant-en"
            label="Consultant (EN)"
            value={consultantEn}
            onChange={setConsultantEn}
            placeholder={meta?.consultant?.en ?? "e.g. ECG"}
          />
          <TextField
            id="f-consultant-ar"
            label="Consultant (AR)"
            value={consultantAr}
            onChange={setConsultantAr}
            dir="rtl"
            placeholder={meta?.consultant?.ar ?? "مثال: جماعة المهندسين الاستشاريين"}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-scope-en"
            label="Scope (EN)"
            value={scopeEn}
            onChange={setScopeEn}
            placeholder={meta?.scope?.en ?? "e.g. Turnkey EPC, RO desalination unit"}
          />
          <TextField
            id="f-scope-ar"
            label="Scope (AR)"
            value={scopeAr}
            onChange={setScopeAr}
            dir="rtl"
            placeholder={meta?.scope?.ar ?? "مثال: تسليم مفتاح، محطة تحلية"}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-capacity-en"
            label="Capacity / Benchmark (EN)"
            value={capacityEn}
            onChange={setCapacityEn}
            placeholder={meta?.capacity?.en ?? "e.g. 5,000 m³/day"}
          />
          <TextField
            id="f-capacity-ar"
            label="Capacity / Benchmark (AR)"
            value={capacityAr}
            onChange={setCapacityAr}
            dir="rtl"
            placeholder={meta?.capacity?.ar ?? "مثال: 5,000 م³/يوم"}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <TextField
            id="f-year"
            label="Year"
            value={year}
            onChange={setYear}
            placeholder={meta?.year ?? "e.g. 2023"}
          />
          <TextField
            id="f-region-en"
            label="Region (EN)"
            value={regionEn}
            onChange={setRegionEn}
            placeholder={meta?.region?.en ?? "e.g. Menofia Governorate"}
          />
          <TextField
            id="f-region-ar"
            label="Region (AR)"
            value={regionAr}
            onChange={setRegionAr}
            dir="rtl"
            placeholder={meta?.region?.ar ?? "مثال: محافظة المنوفية"}
          />
        </div>
      </div>

      <p className="mt-6 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
        * Fallback: If any field is left empty, the public website automatically falls back to static data from project-meta.ts (if present).
      </p>

      {error ? (
        <div className="mt-6">
          <FormNotice tone="error">{error}</FormNotice>
        </div>
      ) : null}
      {saved && !error ? (
        <div className="mt-6">
          <FormNotice tone="success">Facts saved successfully.</FormNotice>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <AdminButton variant="solid" disabled={save.isPending} onClick={() => save.mutate()}>
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {save.isPending ? "Saving…" : "Save facts"}
        </AdminButton>
      </div>
    </AdminCard>
  );
}

/* ------------------------------ Tab 2: story ------------------------------ */

function ProfileEditor({ projectId, locale }: { projectId: string; locale: "en" | "ar" }) {
  const qc = useQueryClient();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const key = ["admin", "profile", projectId, locale] as const;

  const { data: profile } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("public_project_profiles")
        .select("id,project_id,locale,title,challenge,outcome")
        .eq("project_id", projectId)
        .eq("locale", locale)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as Profile | null;
    },
  });

  const [title, setTitle] = useState("");
  const [challenge, setChallenge] = useState("");
  const [outcome, setOutcome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTitle(profile?.title ?? "");
    setChallenge(profile?.challenge ?? "");
    setOutcome(profile?.outcome ?? "");
  }, [profile]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        project_id: projectId,
        locale,
        title: title.trim(),
        challenge: challenge.trim() || null,
        outcome: outcome.trim() || null,
      };
      if (profile) {
        const { error: err } = await supabase
          .from("public_project_profiles")
          .update(payload)
          .eq("id", profile.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("public_project_profiles").insert(payload);
        if (err) throw err;
      }
      await logAudit({
        action: profile ? "update_profile" : "create_profile",
        targetTable: "public_project_profiles",
        targetId: profile?.id ?? null,
        detail: `${locale} · ${title.trim()}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success(`Profile (${locale.toUpperCase()}) saved successfully.`);
      void qc.invalidateQueries({ queryKey: key });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Could not save profile.";
      setError(msg);
      toast.error(msg);
    },
  });

  return (
    <AdminCard>
      <div className="flex items-center justify-between gap-4">
        <h2 className="display-md text-xl">
          Public profile — {locale === "en" ? "English" : "العربية"}
        </h2>
        <StatusPill tone={profile ? "neutral" : "muted"}>
          {profile ? "exists" : "not created"}
        </StatusPill>
      </div>
      <div className="mt-6 space-y-6">
        <TextField
          id={`pf-title-${locale}`}
          label="Title"
          value={title}
          onChange={setTitle}
          dir={dir}
        />
        <TextAreaField
          id={`pf-challenge-${locale}`}
          label="The challenge"
          value={challenge}
          onChange={setChallenge}
          rows={4}
          dir={dir}
        />
        <TextAreaField
          id={`pf-outcome-${locale}`}
          label="Outcome"
          value={outcome}
          onChange={setOutcome}
          rows={4}
          dir={dir}
        />
        {error ? <FormNotice tone="error">{error}</FormNotice> : null}
        {saved && !error ? <FormNotice tone="success">Profile saved.</FormNotice> : null}
      </div>
      <div className="mt-8 flex justify-end">
        <AdminButton
          variant="solid"
          disabled={save.isPending || !title.trim()}
          onClick={() => save.mutate()}
        >
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {save.isPending ? "Saving…" : "Save profile"}
        </AdminButton>
      </div>
    </AdminCard>
  );
}

/* ----------------------------- Tab 4: claims ----------------------------- */

function ClaimsTab({ projectId }: { projectId: string }) {
  const qc = useQueryClient();
  const [locale, setLocale] = useState("en");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const claimsKey = ["admin", "claims", projectId] as const;

  const { data: claims } = useQuery({
    queryKey: claimsKey,
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("claims")
        .select("id,project_id,locale,content")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });
      if (err) throw err;
      return (data ?? []) as Claim[];
    },
  });

  const claimIds = useMemo(() => (claims ?? []).map((c) => c.id), [claims]);

  const { data: evidence } = useQuery({
    queryKey: ["admin", "evidence", projectId, claimIds.join(",")],
    enabled: claimIds.length > 0,
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("evidence")
        .select("id,claim_id,internal_link,internal_description")
        .in("claim_id", claimIds)
        .order("created_at", { ascending: true });
      if (err) throw err;
      return (data ?? []) as Evidence[];
    },
  });

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: claimsKey });
    void qc.invalidateQueries({ queryKey: ["admin", "evidence", projectId] });
    void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
  };

  const addClaim = useMutation({
    mutationFn: async () => {
      const { error: err } = await supabase
        .from("claims")
        .insert({ project_id: projectId, locale, content: content.trim() });
      if (err) throw err;
      await logAudit({
        action: "create_claim",
        targetTable: "claims",
        targetId: projectId,
        detail: `${locale} · ${content.trim().slice(0, 80)}`,
      });
    },
    onSuccess: () => {
      setContent("");
      setError(null);
      toast.success("Verified claim added.");
      refresh();
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Could not add claim.";
      setError(msg);
      toast.error(msg);
    },
  });

  const deleteClaim = useMutation({
    mutationFn: async (claim: Claim) => {
      await supabase.from("evidence").delete().eq("claim_id", claim.id);
      const { error: err } = await supabase.from("claims").delete().eq("id", claim.id);
      if (err) throw err;
      await logAudit({
        action: "delete_claim",
        targetTable: "claims",
        targetId: claim.id,
        detail: claim.content.slice(0, 80),
      });
    },
    onSuccess: () => {
      toast.success("Claim and backing evidence removed.");
      refresh();
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Could not delete claim.";
      setError(msg);
      toast.error(msg);
    },
  });

  return (
    <>
      <AdminCard>
        <h2 className="display-md text-xl">Add a claim</h2>
        <p className="body-reading mt-3 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
          Every public statement must be recorded as a claim, then backed by at least one piece of
          internal evidence.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-[200px_1fr]">
          <SelectField
            id="cl-locale"
            label="Locale"
            value={locale}
            onChange={setLocale}
            options={[
              { value: "en", label: "en" },
              { value: "ar", label: "ar" },
            ]}
          />
          <TextAreaField
            id="cl-content"
            label="Claim content"
            value={content}
            onChange={setContent}
            rows={3}
            dir={locale === "ar" ? "rtl" : "ltr"}
          />
        </div>
        {error ? (
          <div className="mt-6">
            <FormNotice tone="error">{error}</FormNotice>
          </div>
        ) : null}
        <div className="mt-8 flex justify-end">
          <AdminButton
            variant="solid"
            disabled={addClaim.isPending || content.trim().length < 3}
            onClick={() => addClaim.mutate()}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            {addClaim.isPending ? "Adding…" : "Add claim"}
          </AdminButton>
        </div>
      </AdminCard>

      {(claims?.length ?? 0) === 0 ? (
        <AdminCard>
          <p className="text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            No claims recorded for this project yet.
          </p>
        </AdminCard>
      ) : (
        claims!.map((claim) => (
          <AdminCard key={claim.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <StatusPill tone="muted">{claim.locale}</StatusPill>
                <p
                  className="body-reading mt-3 text-base"
                  dir={claim.locale === "ar" ? "rtl" : "ltr"}
                >
                  {claim.content}
                </p>
              </div>
              <AdminButton
                disabled={deleteClaim.isPending}
                onClick={() => deleteClaim.mutate(claim)}
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                Delete claim
              </AdminButton>
            </div>

            <EvidenceList
              claim={claim}
              items={(evidence ?? []).filter((e) => e.claim_id === claim.id)}
              onChanged={refresh}
            />
          </AdminCard>
        ))
      )}
    </>
  );
}

function EvidenceList({
  claim,
  items,
  onChanged,
}: {
  claim: Claim;
  items: Evidence[];
  onChanged: () => void;
}) {
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);

  const add = useMutation({
    mutationFn: async () => {
      const { error: err } = await supabase.from("evidence").insert({
        claim_id: claim.id,
        internal_link: link.trim() || null,
        internal_description: desc.trim() || null,
      });
      if (err) throw err;
      await logAudit({
        action: "create_evidence",
        targetTable: "evidence",
        targetId: claim.id,
        detail: desc.trim().slice(0, 80) || link.trim(),
      });
    },
    onSuccess: () => {
      setLink("");
      setDesc("");
      setError(null);
      toast.success("Evidence attached successfully.");
      onChanged();
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Could not add evidence.";
      setError(msg);
      toast.error(msg);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error: err } = await supabase.from("evidence").delete().eq("id", id);
      if (err) throw err;
      await logAudit({
        action: "delete_evidence",
        targetTable: "evidence",
        targetId: id,
        detail: "removed",
      });
    },
    onSuccess: () => {
      toast.success("Evidence document unlinked.");
      onChanged();
    },
    onError: (e: unknown) => {
      toast.error(e instanceof Error ? e.message : "Could not remove evidence.");
    },
  });

  return (
    <div className="mt-6 border-t pt-6" style={{ borderColor: "var(--iw-border)" }}>
      <p className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
        Evidence ({items.length})
      </p>

      {items.length === 0 ? (
        <p className="mt-2 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
          No evidence attached. Add a link or description to satisfy the audit checklist.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((ev) => (
            <li
              key={ev.id}
              className="flex items-center justify-between gap-4 border p-3 text-xs"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
            >
              <div className="space-y-1">
                {ev.internal_link ? (
                  <a
                    href={ev.internal_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-sky-400 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {ev.internal_link}
                  </a>
                ) : null}
                {ev.internal_description ? <p>{ev.internal_description}</p> : null}
              </div>
              <button
                type="button"
                aria-label="Remove evidence"
                className="opacity-70 hover:opacity-100"
                onClick={() => remove.mutate(ev.id)}
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input
          type="url"
          placeholder="https://… (internal link)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border bg-transparent px-3 py-2 text-xs"
          style={{ borderColor: "var(--iw-border)" }}
        />
        <input
          type="text"
          placeholder="Document description / handover ref"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border bg-transparent px-3 py-2 text-xs"
          style={{ borderColor: "var(--iw-border)" }}
        />
        <AdminButton
          disabled={add.isPending || (!link.trim() && !desc.trim())}
          onClick={() => add.mutate()}
        >
          Attach
        </AdminButton>
      </div>
      {error ? (
        <div className="mt-2">
          <FormNotice tone="error">{error}</FormNotice>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Tab 5: map -------------------------------- */

const EGYPT_COORDINATE_PRESETS = [
  { label: "-- Select an Egyptian Governorate / Industrial Hub --", lat: "", lng: "", name: "" },
  { label: "Sadat City (Industrial Hub / Menofia)", lat: "30.3800", lng: "30.5100", name: "Sadat City, Menofia, Egypt" },
  { label: "New Administrative Capital (NAC)", lat: "30.0167", lng: "31.7500", name: "New Administrative Capital, Cairo, Egypt" },
  { label: "Cairo Governorate (Centroid)", lat: "30.0444", lng: "31.2357", name: "Cairo, Egypt" },
  { label: "6th of October City / Giza", lat: "29.9381", lng: "30.9142", name: "6th of October City, Giza, Egypt" },
  { label: "10th of Ramadan / Sharqia", lat: "30.2986", lng: "31.7423", name: "10th of Ramadan, Sharqia, Egypt" },
  { label: "Alexandria / Borg El Arab Industrial Zone", lat: "30.9167", lng: "29.6667", name: "Borg El Arab, Alexandria, Egypt" },
  { label: "Ain Sokhna / Suez / Red Sea", lat: "29.6000", lng: "32.3167", name: "Ain Sokhna, Suez, Egypt" },
  { label: "Port Said / East Port Said", lat: "31.2653", lng: "32.3019", name: "Port Said, Egypt" },
  { label: "Toshka / Aswan / Upper Egypt", lat: "22.6900", lng: "31.7100", name: "Toshka, Aswan, Egypt" },
  { label: "Beni Suef Industrial Zone", lat: "29.0661", lng: "31.0994", name: "Beni Suef, Egypt" },
  { label: "Kafr El Sheikh / Delta Pumping", lat: "31.1107", lng: "30.9388", name: "Kafr El Sheikh, Egypt" },
  { label: "Damietta Port / Free Zone", lat: "31.4175", lng: "31.8144", name: "Damietta, Egypt" },
];

function LocationTab({ projectId }: { projectId: string }) {
  const qc = useQueryClient();
  const key = ["admin", "location", projectId] as const;

  const { data: location } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("id,project_id,lat,lng,display_name")
        .eq("project_id", projectId)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as LocationRow | null;
    },
  });

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLat(location ? String(location.lat) : "");
    setLng(location ? String(location.lng) : "");
    setDisplayName(location?.display_name ?? "");
  }, [location]);

  const handlePresetSelect = (presetLabel: string) => {
    const found = EGYPT_COORDINATE_PRESETS.find((p) => p.label === presetLabel);
    if (!found || !found.lat) return;
    setLat(found.lat);
    setLng(found.lng);
    setDisplayName(found.name);
  };

  const save = useMutation({
    mutationFn: async () => {
      const latNum = Number.parseFloat(lat);
      const lngNum = Number.parseFloat(lng);
      if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
        throw new Error("Latitude and longitude must be valid decimal numbers.");
      }
      const payload = {
        project_id: projectId,
        lat: latNum,
        lng: lngNum,
        display_name: displayName.trim() || null,
      };
      if (location) {
        const { error: err } = await supabase
          .from("locations")
          .update(payload)
          .eq("id", location.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("locations").insert(payload);
        if (err) throw err;
      }
      await logAudit({
        action: location ? "update_location" : "create_location",
        targetTable: "locations",
        targetId: location?.id ?? null,
        detail: `${latNum}, ${lngNum}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success("Location coordinates saved successfully.");
      void qc.invalidateQueries({ queryKey: key });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Could not save location.";
      setError(msg);
      toast.error(msg);
    },
  });

  return (
    <AdminCard>
      <div className="flex items-center justify-between gap-4">
        <h2 className="display-md text-xl">Map location</h2>
        <StatusPill tone={location ? "neutral" : "muted"}>
          {location ? "set" : "not set"}
        </StatusPill>
      </div>
      <p className="body-reading mt-3 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
        Coordinates place the project on the public Egypt impact map. Use governorate-level
        precision only.
      </p>

      {/* Preset Selector */}
      <div
        className="mt-6 border p-4"
        style={{ borderColor: "var(--iw-border)", backgroundColor: "rgba(14, 116, 144, 0.04)" }}
      >
        <label
          htmlFor="egypt-presets"
          className="label-mono block text-xs"
          style={{ color: "var(--iw-text-secondary)" }}
        >
          Egypt Governorate & Industrial Hub Presets
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            id="egypt-presets"
            onChange={(e) => handlePresetSelect(e.target.value)}
            defaultValue=""
            className="w-full border bg-transparent px-3 py-2 text-xs outline-none focus:border-[var(--iw-accent)]"
            style={{
              borderColor: "var(--iw-border)",
              color: "var(--iw-text-primary)",
              backgroundColor: "var(--iw-surface)",
            }}
          >
            {EGYPT_COORDINATE_PRESETS.map((p) => (
              <option key={p.label} value={p.label} style={{ backgroundColor: "#111827", color: "#f9fafb" }}>
                {p.label}
              </option>
            ))}
          </select>
          <span className="shrink-0 text-[11px] text-[var(--iw-text-secondary)]">
            Auto-fills coordinates & name
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <TextField
          id="loc-lat"
          label="Latitude"
          value={lat}
          onChange={setLat}
          placeholder="30.3644"
        />
        <TextField
          id="loc-lng"
          label="Longitude"
          value={lng}
          onChange={setLng}
          placeholder="30.5087"
        />
        <TextField
          id="loc-name"
          label="Display name"
          value={displayName}
          onChange={setDisplayName}
          placeholder="Sadat City, Monufia"
        />
      </div>

      {error ? (
        <div className="mt-6">
          <FormNotice tone="error">{error}</FormNotice>
        </div>
      ) : null}
      {saved && !error ? (
        <div className="mt-6">
          <FormNotice tone="success">Location saved.</FormNotice>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <AdminButton variant="solid" disabled={save.isPending} onClick={() => save.mutate()}>
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {save.isPending ? "Saving…" : "Save location"}
        </AdminButton>
      </div>
    </AdminCard>
  );
}

/* ------------------------------ Tab 6: media ----------------------------- */

function MediaTab({ projectId, projectSlug }: { projectId: string; projectSlug: string }) {
  const qc = useQueryClient();
  const key = ["admin", "media", projectId] as const;

  // Static repository photos from PROJECT_META
  const meta = useMemo(() => getProjectMeta(projectSlug), [projectSlug]);
  const staticPhotos = useMemo(() => {
    if (!meta) return [];
    const list: Array<{ url: string; name: string; isCover: boolean }> = [];
    if (meta.cover) {
      list.push({ url: meta.cover, name: "cover.webp", isCover: true });
    }
    if (meta.gallery && meta.gallery.length > 0) {
      meta.gallery.forEach((g) => {
        if (g !== meta.cover) {
          const fname = g.split("/").pop() ?? "gallery.webp";
          list.push({ url: g, name: fname, isCover: false });
        }
      });
    }
    return list;
  }, [meta]);

  // Photo upload states
  const photoFileRef = useRef<HTMLInputElement>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoAltEn, setPhotoAltEn] = useState("");
  const [photoAltAr, setPhotoAltAr] = useState("");
  const [photoIsPublic, setPhotoIsPublic] = useState("true");
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  // Drag-and-drop & Lightbox states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    items: Array<{
      id: string;
      url: string;
      name: string;
      order?: number;
      isCover?: boolean;
      isPublic?: boolean;
      altEn?: string | null;
      altAr?: string | null;
      tag?: string;
      storagePath?: string;
    }>;
    index: number;
  } | null>(null);

  // Schema upload states
  const schemaFileRef = useRef<HTMLInputElement>(null);
  const [schemaAltEn, setSchemaAltEn] = useState("");
  const [schemaAltAr, setSchemaAltAr] = useState("");
  const [schemaIsPublic, setSchemaIsPublic] = useState("true");
  const [schemaError, setSchemaError] = useState<string | null>(null);
  const [schemaUploading, setSchemaUploading] = useState(false);

  // Query all media assets for project
  const { data: assets } = useQuery({
    queryKey: key,
    queryFn: async () => {
      let res = await supabase
        .from("media_assets")
        .select("id,project_id,storage_path,alt_en,alt_ar,is_public,media_type,mime_type,sort_order,created_at")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true });

      if (res.error && res.error.code === "42703") {
        const fallback = await supabase
          .from("media_assets")
          .select("id,project_id,storage_path,alt_en,alt_ar,is_public,created_at")
          .eq("project_id", projectId);
        return ((fallback.data ?? []) as any[]).map((m, idx) => ({
          ...m,
          media_type: m.storage_path?.includes("/schema/") ? "schema" : "photo",
          mime_type: m.storage_path?.endsWith(".pdf") ? "application/pdf" : "image/webp",
          sort_order: idx + 1,
        })) as MediaAsset[];
      }

      if (res.error) throw res.error;
      return (res.data ?? []) as MediaAsset[];
    },
  });

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: key });
    void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
  };

  const photos = useMemo(() => (assets ?? []).filter((a) => a.media_type === "photo"), [assets]);
  const schema = useMemo(() => (assets ?? []).find((a) => a.media_type === "schema") ?? null, [assets]);

  // Handle preview generation on file selection
  const handlePhotoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoPreviewUrl(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoError("File must be an image (JPEG, PNG, WebP, etc.).");
      setPhotoPreviewUrl(null);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setPhotoError("Image exceeds 8MB limit. Please compress before uploading.");
      setPhotoPreviewUrl(null);
      return;
    }
    setPhotoError(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreviewUrl(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Upload a photo with graceful DB column fallback
  async function uploadPhoto() {
    const file = photoFileRef.current?.files?.[0];
    if (!file) {
      setPhotoError("Choose an image file first.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoError("File must be an image (JPEG, PNG, WebP, etc.).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setPhotoError("Image exceeds 8MB limit. Please compress before uploading.");
      return;
    }

    setPhotoUploading(true);
    setPhotoError(null);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "webp";
      const path = `${projectId}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      const nextOrder = photos.length > 0 ? Math.max(...photos.map((p) => p.sort_order)) + 1 : 1;

      let insErr: any = null;
      try {
        const res = await supabase.from("media_assets").insert({
          project_id: projectId,
          storage_path: path,
          alt_en: photoAltEn.trim() || null,
          alt_ar: photoAltAr.trim() || null,
          is_public: photoIsPublic === "true",
          media_type: "photo",
          mime_type: file.type,
          sort_order: nextOrder,
        });
        insErr = res.error;
      } catch (err: any) {
        insErr = err;
      }

      if (insErr && insErr.code === "42703") {
        const { error: fbErr } = await supabase.from("media_assets").insert({
          project_id: projectId,
          storage_path: path,
          alt_en: photoAltEn.trim() || null,
          alt_ar: photoAltAr.trim() || null,
          is_public: photoIsPublic === "true",
        });
        if (fbErr) {
          await supabase.storage.from(BUCKET).remove([path]);
          throw fbErr;
        }
      } else if (insErr) {
        await supabase.storage.from(BUCKET).remove([path]);
        throw insErr;
      }

      await logAudit({
        action: "upload_media_photo",
        targetTable: "media_assets",
        targetId: projectId,
        detail: `path=${path}`,
      });

      if (photoFileRef.current) photoFileRef.current.value = "";
      setPhotoPreviewUrl(null);
      setPhotoAltEn("");
      setPhotoAltAr("");
      toast.success("Photo uploaded successfully.");
      refresh();
    } catch (e: unknown) {
      let msg = e instanceof Error ? e.message : "Upload failed.";
      if (
        msg.toLowerCase().includes("bucket not found") ||
        (e as any)?.statusCode === 404 ||
        (e as any)?.statusCode === "404"
      ) {
        msg =
          "Storage bucket 'project-media' has not been created yet in Supabase. Please create the public bucket 'project-media' in Supabase Dashboard (or run the provided migration SQL).";
      }
      setPhotoError(msg);
      toast.error(msg);
    } finally {
      setPhotoUploading(false);
    }
  }

  // Upload / Replace schema with graceful fallback
  async function uploadSchema(replaceTarget?: MediaAsset) {
    const file = schemaFileRef.current?.files?.[0];
    if (!file) {
      setSchemaError("Choose a diagram file (Image or PDF) first.");
      return;
    }
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ];
    if (!allowed.includes(file.type)) {
      setSchemaError("Schema must be an image (PNG, JPG, SVG, WebP) or a PDF document.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setSchemaError("Schema file exceeds 20MB limit.");
      return;
    }

    setSchemaUploading(true);
    setSchemaError(null);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `${projectId}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      if (replaceTarget) {
        let updErr: any = null;
        try {
          const res = await supabase
            .from("media_assets")
            .update({
              storage_path: path,
              mime_type: file.type,
              alt_en: schemaAltEn.trim() || replaceTarget.alt_en,
              alt_ar: schemaAltAr.trim() || replaceTarget.alt_ar,
            })
            .eq("id", replaceTarget.id);
          updErr = res.error;
        } catch (err: any) {
          updErr = err;
        }

        if (updErr && updErr.code === "42703") {
          const { error: fbErr } = await supabase
            .from("media_assets")
            .update({
              storage_path: path,
              alt_en: schemaAltEn.trim() || replaceTarget.alt_en,
              alt_ar: schemaAltAr.trim() || replaceTarget.alt_ar,
            })
            .eq("id", replaceTarget.id);
          if (fbErr) throw fbErr;
        } else if (updErr) {
          throw updErr;
        }

        await supabase.storage.from(BUCKET).remove([replaceTarget.storage_path]);
      } else {
        let insErr: any = null;
        try {
          const res = await supabase.from("media_assets").insert({
            project_id: projectId,
            storage_path: path,
            alt_en: schemaAltEn.trim() || null,
            alt_ar: schemaAltAr.trim() || null,
            is_public: schemaIsPublic === "true",
            media_type: "schema",
            mime_type: file.type,
            sort_order: 0,
          });
          insErr = res.error;
        } catch (err: any) {
          insErr = err;
        }

        if (insErr && insErr.code === "42703") {
          const { error: fbErr } = await supabase.from("media_assets").insert({
            project_id: projectId,
            storage_path: path,
            alt_en: schemaAltEn.trim() || null,
            alt_ar: schemaAltAr.trim() || null,
            is_public: schemaIsPublic === "true",
          });
          if (fbErr) {
            await supabase.storage.from(BUCKET).remove([path]);
            throw fbErr;
          }
        } else if (insErr) {
          await supabase.storage.from(BUCKET).remove([path]);
          throw insErr;
        }
      }

      await logAudit({
        action: replaceTarget ? "replace_schema" : "upload_schema",
        targetTable: "media_assets",
        targetId: projectId,
        detail: `path=${path} mime=${file.type}`,
      });

      if (schemaFileRef.current) schemaFileRef.current.value = "";
      setSchemaAltEn("");
      setSchemaAltAr("");
      toast.success(replaceTarget ? "Project schema replaced." : "Project schema uploaded successfully.");
      refresh();
    } catch (e: unknown) {
      let msg = e instanceof Error ? e.message : "Schema upload failed.";
      if (
        msg.toLowerCase().includes("bucket not found") ||
        (e as any)?.statusCode === 404 ||
        (e as any)?.statusCode === "404"
      ) {
        msg =
          "Storage bucket 'project-media' has not been created yet in Supabase. Please create the public bucket 'project-media' in Supabase Dashboard (or run the provided migration SQL).";
      }
      setSchemaError(msg);
      toast.error(msg);
    } finally {
      setSchemaUploading(false);
    }
  }

  // One-click Set as Cover
  const setCoverPhoto = async (targetAsset: MediaAsset) => {
    try {
      const remaining = photos.filter((p) => p.id !== targetAsset.id);
      const res = await supabase
        .from("media_assets")
        .update({ sort_order: 1, is_public: true })
        .eq("id", targetAsset.id);

      if (res.error && res.error.code === "42703") {
        await supabase
          .from("media_assets")
          .update({ is_public: true })
          .eq("id", targetAsset.id);
      } else if (res.error) {
        throw res.error;
      } else {
        await Promise.all(
          remaining.map((p, idx) =>
            supabase
              .from("media_assets")
              .update({ sort_order: idx + 2 })
              .eq("id", p.id),
          ),
        );
      }

      await logAudit({
        action: "set_cover_photo",
        targetTable: "media_assets",
        targetId: targetAsset.id,
        detail: `Promoted ${targetAsset.storage_path} to cover hero`,
      });

      toast.success("Cover hero photo updated.");
      refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to set cover photo.");
    }
  };

  // Reorder photos (move item up or down via button)
  const reorderPhoto = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const currentPhoto = photos[index]!;
    const adjacentPhoto = photos[targetIndex]!;

    const tempOrder = currentPhoto.sort_order;
    const newOrder = adjacentPhoto.sort_order;

    try {
      const res = await Promise.all([
        supabase.from("media_assets").update({ sort_order: newOrder }).eq("id", currentPhoto.id),
        supabase.from("media_assets").update({ sort_order: tempOrder }).eq("id", adjacentPhoto.id),
      ]);
      const err = res.find((r) => r.error)?.error;
      if (err) {
        if (err.code === "42703") {
          toast.error("Photo reordering requires the 'sort_order' column. Please run the SQL migration in Supabase.");
          return;
        }
        throw err;
      }

      toast.success("Photo order updated.");
      refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reorder photos.");
    }
  };

  // Drag-and-drop reorder handler
  const handleDropReorder = async (sourceIdx: number, targetIdx: number) => {
    if (sourceIdx === targetIdx) return;
    const updated = [...photos];
    const [moved] = updated.splice(sourceIdx, 1);
    if (!moved) return;
    updated.splice(targetIdx, 0, moved);

    try {
      const updates = updated.map((p, idx) =>
        supabase
          .from("media_assets")
          .update({ sort_order: idx + 1 })
          .eq("id", p.id),
      );
      await Promise.all(updates);

      await logAudit({
        action: "reorder_media_photos",
        targetTable: "media_assets",
        targetId: projectId,
        detail: `Reordered photo from #${sourceIdx + 1} to #${targetIdx + 1}`,
      });

      toast.success("Photo order updated.");
      refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to reorder photos.");
    } finally {
      setDraggedIndex(null);
      setDragOverIndex(null);
    }
  };

  // Safe delete photo
  const deletePhoto = async (asset: MediaAsset) => {
    const { error: sErr } = await supabase.storage.from(BUCKET).remove([asset.storage_path]);
    if (sErr) {
      toast.error(`Storage removal error: ${sErr.message}`);
      return;
    }

    const { error: dbErr } = await supabase.from("media_assets").delete().eq("id", asset.id);
    if (dbErr) {
      toast.error(`Database delete error: ${dbErr.message}`);
      return;
    }

    const remaining = photos.filter((p) => p.id !== asset.id);
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i]!.sort_order !== i + 1) {
        await supabase
          .from("media_assets")
          .update({ sort_order: i + 1 })
          .eq("id", remaining[i]!.id);
      }
    }

    await logAudit({
      action: "delete_media_photo",
      targetTable: "media_assets",
      targetId: asset.id,
      detail: asset.storage_path,
    });

    toast.success("Photo deleted successfully.");
    refresh();
  };

  // Delete schema
  const deleteSchema = async (asset: MediaAsset) => {
    const { error: sErr } = await supabase.storage.from(BUCKET).remove([asset.storage_path]);
    if (sErr) {
      toast.error(`Storage error: ${sErr.message}`);
      return;
    }

    const { error: dbErr } = await supabase.from("media_assets").delete().eq("id", asset.id);
    if (dbErr) {
      toast.error(`Database error: ${dbErr.message}`);
      return;
    }

    await logAudit({
      action: "delete_schema",
      targetTable: "media_assets",
      targetId: asset.id,
      detail: asset.storage_path,
    });

    toast.success("Project schema deleted. Generic sector schematic restored.");
    refresh();
  };

  // Open custom uploaded photo in lightbox
  const openCustomLightbox = (index: number, currentUrl: string) => {
    const items = photos.map((p, idx) => ({
      id: p.id,
      url: idx === index ? currentUrl : "",
      name: p.storage_path.split("/").pop() ?? "photo",
      order: p.sort_order,
      isCover: idx === 0,
      isPublic: p.is_public,
      altEn: p.alt_en,
      altAr: p.alt_ar,
      storagePath: p.storage_path,
    }));
    setLightboxState({ items, index });
  };

  // Open static catalog photo in lightbox
  const openStaticLightbox = (index: number) => {
    const items = staticPhotos.map((s, idx) => ({
      id: s.url,
      url: s.url,
      name: s.name,
      order: idx + 1,
      isCover: s.isCover,
      isPublic: true,
      tag: "Static Catalog",
    }));
    setLightboxState({ items, index });
  };

  return (
    <div className="space-y-12">
      {/* ---------------- SECTION A: PROJECT PHOTOS ---------------- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="display-md text-2xl">Project Photos</h2>
            <p className="body-reading mt-1 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
              The first photo (Sort Order #1) is automatically designated as the <strong>Cover Hero</strong> on the portfolio grid and project detail page. Drag cards to reorder or click any thumbnail to preview full size.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {photos.length > 0 && <StatusPill tone="success">{photos.length} custom</StatusPill>}
            <StatusPill tone="neutral">
              {staticPhotos.length > 0 ? `${staticPhotos.length} catalog photos` : "0 photos"}
            </StatusPill>
          </div>
        </div>

        {/* Upload photo card */}
        <AdminCard>
          <h3 className="display-md text-lg">Upload photo</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-[1fr_200px]">
            <div>
              <label
                htmlFor="photo-file"
                className="label-mono block"
                style={{ color: "var(--iw-text-secondary)" }}
              >
                Image file (JPEG, PNG, WebP, max 8MB)
              </label>
              <input
                id="photo-file"
                ref={photoFileRef}
                type="file"
                accept="image/*,image/webp,image/jpeg,image/png,image/gif"
                onChange={handlePhotoFileSelect}
                className="mt-2 w-full border bg-transparent px-4 py-3 text-sm"
                style={{ borderColor: "var(--iw-border)" }}
              />
            </div>
            <SelectField
              id="photo-public"
              label="Visibility"
              value={photoIsPublic}
              onChange={setPhotoIsPublic}
              options={[
                { value: "true", label: "public" },
                { value: "false", label: "internal only" },
              ]}
            />
          </div>

          {/* Inline Upload Preview */}
          {photoPreviewUrl ? (
            <div
              className="mt-4 flex items-center justify-between rounded border p-3"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "rgba(0,0,0,0.25)" }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded border border-neutral-800 bg-neutral-900">
                  <img src={photoPreviewUrl} alt="Upload preview" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    Ready to upload: {photoFileRef.current?.files?.[0]?.name}
                  </p>
                  <p className="font-mono text-[11px] text-neutral-400 mt-0.5">
                    {photoFileRef.current?.files?.[0]?.size
                      ? `${(photoFileRef.current.files[0].size / 1024).toFixed(0)} KB`
                      : "Image file"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (photoFileRef.current) photoFileRef.current.value = "";
                  setPhotoPreviewUrl(null);
                }}
                className="rounded p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Remove preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <TextField
              id="photo-alt-en"
              label="Caption / Alt text (EN)"
              value={photoAltEn}
              onChange={setPhotoAltEn}
              placeholder="e.g. Reverse osmosis membranes inside high-pressure vessels"
            />
            <TextField
              id="photo-alt-ar"
              label="Caption / Alt text (AR)"
              value={photoAltAr}
              onChange={setPhotoAltAr}
              dir="rtl"
              placeholder="مثال: أغشية التناضح العكسي داخل أوعية الضغط العالي"
            />
          </div>

          {photoError ? (
            <div className="mt-4">
              <FormNotice tone="error">{photoError}</FormNotice>
            </div>
          ) : null}

          <div className="mt-6 flex justify-end">
            <AdminButton variant="solid" disabled={photoUploading} onClick={uploadPhoto}>
              <Upload className="h-3.5 w-3.5" strokeWidth={2} />
              {photoUploading ? "Uploading photo…" : "Upload photo"}
            </AdminButton>
          </div>
        </AdminCard>

        {/* Custom Uploaded Photos Grid */}
        {photos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="display-md text-base text-neutral-300">
                Custom Uploaded Photos ({photos.length})
              </h3>
              <span className="text-xs font-mono text-neutral-500">Overrides static catalog</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggedIndex(i);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    if (dragOverIndex !== i) {
                      setDragOverIndex(i);
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverIndex === i) {
                      setDragOverIndex(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedIndex !== null && draggedIndex !== i) {
                      void handleDropReorder(draggedIndex, i);
                    }
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  onDragEnd={() => {
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  className={`transition-all duration-150 ${
                    draggedIndex === i ? "opacity-35 scale-[0.98]" : ""
                  } ${
                    dragOverIndex === i && draggedIndex !== i
                      ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-neutral-950"
                      : ""
                  }`}
                >
                  <PhotoCard
                    asset={photo}
                    index={i}
                    isCover={i === 0}
                    isFirst={i === 0}
                    isLast={i === photos.length - 1}
                    onOpenLightbox={(resolvedUrl) => openCustomLightbox(i, resolvedUrl)}
                    onMoveUp={() => reorderPhoto(i, "up")}
                    onMoveDown={() => reorderPhoto(i, "down")}
                    onSetCover={() => setCoverPhoto(photo)}
                    onDelete={() => deletePhoto(photo)}
                    onChanged={refresh}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Static Published Catalog Photos */}
        {staticPhotos.length > 0 && (
          <div className="space-y-4 pt-4">
            <div
              className="rounded border p-4 text-xs"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "rgba(14, 116, 144, 0.04)" }}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sky-400">
                  {photos.length === 0 ? "Active Published Photos (Static Catalog):" : "Baseline Catalog Photos (Codebase Repository):"}
                </p>
                <StatusPill tone="success">{staticPhotos.length} published</StatusPill>
              </div>
              <p className="mt-1" style={{ color: "var(--iw-text-secondary)" }}>
                {photos.length === 0 ? (
                  <>
                    These <strong>{staticPhotos.length} high-resolution photos</strong> are currently live on the public website from the repository catalog (<code className="text-neutral-300">/public/images/projects/{projectSlug}/</code>). Click any image to preview full size.
                  </>
                ) : (
                  <>
                    These baseline catalog photos are bundled with the project repository. Your custom uploaded photos above take precedence on the public website.
                  </>
                )}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {staticPhotos.map((item, idx) => (
                <StaticPhotoCard
                  key={item.url}
                  item={item}
                  index={idx}
                  onOpenLightbox={() => openStaticLightbox(idx)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Fallback when both are empty */}
        {photos.length === 0 && staticPhotos.length === 0 && (
          <AdminCard>
            <p className="text-sm" style={{ color: "var(--iw-text-secondary)" }}>
              No photos uploaded or found in catalog yet. Use the upload panel above to add project photos.
            </p>
          </AdminCard>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxState !== null && (
        <LightboxModal
          items={lightboxState.items}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
          onPrev={() =>
            setLightboxState((prev) =>
              prev
                ? {
                    ...prev,
                    index: (prev.index - 1 + prev.items.length) % prev.items.length,
                  }
                : null,
            )
          }
          onNext={() =>
            setLightboxState((prev) =>
              prev
                ? {
                    ...prev,
                    index: (prev.index + 1) % prev.items.length,
                  }
                : null,
            )
          }
        />
      )}

      {/* ---------------- SECTION B: PROJECT SCHEMA / DIAGRAM ---------------- */}
      <div className="space-y-6 border-t pt-10" style={{ borderColor: "var(--iw-border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="display-md text-2xl">Project Schema / Diagram</h2>
            <p className="body-reading mt-1 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
              Dedicated technical diagram (Image or PDF) representing the engineering process.
            </p>
          </div>
          <StatusPill tone={schema ? (schema.is_public ? "success" : "warning") : "muted"}>
            {schema ? (schema.is_public ? "Published Schema" : "Internal Schema") : "Fallback to Sector Schematic"}
          </StatusPill>
        </div>

        <div className="rounded border p-4 text-xs" style={{ borderColor: "var(--iw-border)", backgroundColor: "rgba(14, 116, 144, 0.04)" }}>
          <p className="font-semibold text-sky-400">Public Page Behavior:</p>
          <p className="mt-1" style={{ color: "var(--iw-text-secondary)" }}>
            When a project schema is <strong>published (public)</strong>, it replaces the generic sector schematic SVG on the public project page. When internal or absent, the generic sector schematic is displayed as a fallback.
          </p>
        </div>

        {!schema ? (
          <AdminCard>
            <h3 className="display-md text-lg">Upload project schema</h3>
            <p className="body-reading mt-1 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
              Supports high-resolution PNG, JPEG, SVG diagrams or complete PDF engineering schematics (max 20MB).
            </p>

            <div className="mt-4 grid gap-6 md:grid-cols-[1fr_200px]">
              <div>
                <label
                  htmlFor="schema-file"
                  className="label-mono block"
                  style={{ color: "var(--iw-text-secondary)" }}
                >
                  Diagram file (Image or PDF)
                </label>
                <input
                  id="schema-file"
                  ref={schemaFileRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="mt-2 w-full border bg-transparent px-4 py-3 text-sm"
                  style={{ borderColor: "var(--iw-border)" }}
                />
              </div>
              <SelectField
                id="schema-public"
                label="Visibility"
                value={schemaIsPublic}
                onChange={setSchemaIsPublic}
                options={[
                  { value: "true", label: "public (replaces generic)" },
                  { value: "false", label: "internal only (keeps generic)" },
                ]}
              />
            </div>

            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <TextField
                id="schema-alt-en"
                label="Diagram title / caption (EN)"
                value={schemaAltEn}
                onChange={setSchemaAltEn}
                placeholder="e.g. Reverse osmosis process flow & piping diagram"
              />
              <TextField
                id="schema-alt-ar"
                label="Diagram title / caption (AR)"
                value={schemaAltAr}
                onChange={setSchemaAltAr}
                dir="rtl"
                placeholder="مثال: مخطط تدفق عمليات محطة التناضح العكسي"
              />
            </div>

            {schemaError ? (
              <div className="mt-4">
                <FormNotice tone="error">{schemaError}</FormNotice>
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <AdminButton variant="solid" disabled={schemaUploading} onClick={() => uploadSchema()}>
                <Upload className="h-3.5 w-3.5" strokeWidth={2} />
                {schemaUploading ? "Uploading schema…" : "Upload schema"}
              </AdminButton>
            </div>
          </AdminCard>
        ) : (
          <SchemaCard
            schema={schema}
            onDelete={() => deleteSchema(schema)}
            onReplace={() => uploadSchema(schema)}
            onChanged={refresh}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- Lightbox Modal Component ---------------- */

function LightboxModal({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: Array<{
    id: string;
    url: string;
    name: string;
    order?: number;
    isCover?: boolean;
    isPublic?: boolean;
    altEn?: string | null;
    altAr?: string | null;
    tag?: string;
    storagePath?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = items[currentIndex];

  useEffect(() => {
    if (!current) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, onClose, onPrev, onNext]);

  const { data: signedUrl } = useQuery({
    queryKey: ["admin", "media-lightbox-item", current?.id],
    enabled: Boolean(current && !current.url && current.storagePath),
    queryFn: async () => {
      if (!current?.storagePath) return null;
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(current.storagePath, 3600);
      if (error) throw error;
      return data.signedUrl;
    },
  });

  if (!current) return null;
  const displayUrl = current.url || signedUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-h-[92vh] max-w-5xl w-full rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 bg-neutral-900/80">
          <div className="flex items-center gap-2.5">
            {current.order !== undefined && (
              <span className="rounded bg-sky-950/80 border border-sky-500/40 px-2 py-0.5 font-mono text-xs text-sky-300 font-semibold">
                #{current.order}
              </span>
            )}
            <span
              className="font-mono text-xs text-neutral-300 truncate max-w-[280px]"
              title={current.name}
            >
              {current.name}
            </span>
            {current.isCover && (
              <span className="rounded bg-sky-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white shadow">
                ★ Cover Hero
              </span>
            )}
            {current.tag && (
              <span className="rounded bg-neutral-800 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                {current.tag}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-neutral-400">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div className="relative flex min-h-[360px] max-h-[70vh] items-center justify-center bg-black/60 p-4 select-none">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt={current.altEn ?? current.altAr ?? current.name}
              className="max-h-[66vh] w-auto max-w-full object-contain rounded shadow-lg"
            />
          ) : (
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <RefreshCw className="h-4 w-4 animate-spin" /> Loading image…
            </div>
          )}

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/75 p-2.5 text-white hover:bg-black/95 hover:text-sky-300 transition-all shadow-xl border border-neutral-800"
                title="Previous photo (←)"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/75 p-2.5 text-white hover:bg-black/95 hover:text-sky-300 transition-all shadow-xl border border-neutral-800"
                title="Next photo (→)"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Footer info */}
        {current.altEn || current.altAr ? (
          <div className="border-t border-neutral-800 bg-neutral-900/60 px-4 py-3 text-xs text-neutral-300 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase text-neutral-500 block">Caption / Alt (EN)</span>
              <p className="mt-0.5 truncate text-neutral-200">{current.altEn || "—"}</p>
            </div>
            <div dir="rtl">
              <span className="font-mono text-[10px] uppercase text-neutral-500 block">Caption / Alt (AR)</span>
              <p className="mt-0.5 truncate text-neutral-200">{current.altAr || "—"}</p>
            </div>
          </div>
        ) : (
          <div className="border-t border-neutral-800 bg-neutral-900/40 px-4 py-2 text-[11px] text-neutral-500 font-mono">
            {current.url}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Static Photo Card Component ---------------- */

function StaticPhotoCard({
  item,
  index,
  onOpenLightbox,
}: {
  item: { url: string; name: string; isCover: boolean };
  index: number;
  onOpenLightbox: () => void;
}) {
  return (
    <div
      className="flex flex-col justify-between border rounded overflow-hidden transition-colors"
      style={{
        borderColor: item.isCover ? "var(--iw-accent)" : "var(--iw-border)",
        backgroundColor: "var(--iw-surface)",
      }}
    >
      <div>
        <div
          className="group relative aspect-[4/3] w-full overflow-hidden bg-black/20 cursor-pointer select-none"
          onClick={onOpenLightbox}
          title="Click to preview full-size image"
        >
          <img
            src={item.url}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg border border-neutral-700">
              <Maximize2 className="h-3.5 w-3.5 text-sky-400" /> Preview
            </span>
          </div>

          <div className="absolute top-2.5 start-2.5 flex flex-wrap items-center gap-1.5 z-10">
            {item.isCover ? (
              <span className="rounded bg-sky-600 px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-white shadow">
                ★ Default Cover
              </span>
            ) : null}
            <span className="rounded bg-neutral-900/90 border border-neutral-700 px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase text-neutral-300 shadow">
              Static Catalog
            </span>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--iw-text-secondary)" }}>
            <span className="text-neutral-400 font-semibold">Photo #{index + 1}</span>
            <span
              className="truncate max-w-[170px] rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-300 border border-neutral-800"
              title={item.name}
            >
              {item.name}
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            Active asset from <code className="text-[11px] font-mono text-neutral-300">/public/images/projects/</code>.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t p-3 text-xs" style={{ borderColor: "var(--iw-border)" }}>
        <button
          type="button"
          onClick={onOpenLightbox}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:underline"
        >
          <Maximize2 className="h-3 w-3" /> View full resolution
        </button>
        <span className="text-[10px] font-mono text-emerald-400">● Live on site</span>
      </div>
    </div>
  );
}

/* ---------------- Custom Photo Card Component ---------------- */

function PhotoCard({
  asset,
  index,
  isCover,
  isFirst,
  isLast,
  onOpenLightbox,
  onMoveUp,
  onMoveDown,
  onSetCover,
  onDelete,
  onChanged,
}: {
  asset: MediaAsset;
  index: number;
  isCover: boolean;
  isFirst: boolean;
  isLast: boolean;
  onOpenLightbox: (url: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onSetCover: () => void;
  onDelete: () => void;
  onChanged: () => void;
}) {
  const [altEn, setAltEn] = useState(asset.alt_en ?? "");
  const [altAr, setAltAr] = useState(asset.alt_ar ?? "");
  const [savingAlt, setSavingAlt] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const replaceFileRef = useRef<HTMLInputElement>(null);

  const { data: url } = useQuery({
    queryKey: ["admin", "media-url", asset.id],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(asset.storage_path, 600);
      if (error) throw error;
      return data.signedUrl;
    },
  });

  const togglePublic = async () => {
    const next = !asset.is_public;
    try {
      await supabase.from("media_assets").update({ is_public: next }).eq("id", asset.id);
      await logAudit({
        action: "toggle_media_public",
        targetTable: "media_assets",
        targetId: asset.id,
        detail: `is_public=${next}`,
      });
      toast.success(next ? "Photo marked as public." : "Photo marked as internal only.");
      onChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to toggle visibility.");
    }
  };

  const saveAlt = async () => {
    if (altEn === (asset.alt_en ?? "") && altAr === (asset.alt_ar ?? "")) return;
    setSavingAlt(true);
    try {
      await supabase
        .from("media_assets")
        .update({
          alt_en: altEn.trim() || null,
          alt_ar: altAr.trim() || null,
        })
        .eq("id", asset.id);
      toast.success("Caption saved.");
      onChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save caption.");
    } finally {
      setSavingAlt(false);
    }
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "webp";
      const newPath = `${asset.project_id}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage.from(BUCKET).upload(newPath, file);
      if (upErr) throw upErr;

      let updErr: any = null;
      try {
        const res = await supabase
          .from("media_assets")
          .update({ storage_path: newPath, mime_type: file.type })
          .eq("id", asset.id);
        updErr = res.error;
      } catch (err: any) {
        updErr = err;
      }

      if (updErr && updErr.code === "42703") {
        await supabase
          .from("media_assets")
          .update({ storage_path: newPath })
          .eq("id", asset.id);
      } else if (updErr) {
        throw updErr;
      }

      await supabase.storage.from(BUCKET).remove([asset.storage_path]);
      toast.success("Photo replaced successfully.");
      onChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Replace failed.");
    }
  };

  const fileName = asset.storage_path.split("/").pop() ?? "photo";

  return (
    <div
      className="flex flex-col justify-between border rounded overflow-hidden transition-colors"
      style={{
        borderColor: isCover ? "var(--iw-accent)" : "var(--iw-border)",
        backgroundColor: "var(--iw-surface)",
      }}
    >
      <div>
        {/* Clickable thumbnail area */}
        <div
          className="group relative aspect-[4/3] w-full overflow-hidden bg-black/20 cursor-pointer select-none"
          onClick={() => onOpenLightbox(url ?? "")}
          title="Click to preview full-size image"
        >
          {url ? (
            <img
              src={url}
              alt={asset.alt_en ?? asset.alt_ar ?? "Project photo"}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: "var(--iw-text-secondary)" }}>
              Loading thumbnail…
            </div>
          )}

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-lg border border-neutral-700">
              <Maximize2 className="h-3.5 w-3.5 text-sky-400" /> Preview
            </span>
          </div>

          {/* Top-left Badges */}
          <div
            className="absolute top-2.5 start-2.5 flex flex-wrap items-center gap-1.5 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {isCover ? (
              <span className="rounded bg-sky-600 px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-white shadow">
                ★ Cover Hero
              </span>
            ) : (
              <button
                type="button"
                onClick={onSetCover}
                className="inline-flex items-center gap-1 rounded border border-amber-400/50 bg-black/80 px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase text-amber-300 shadow transition-colors hover:bg-amber-950 hover:text-amber-200"
                title="Promote this photo to Cover Hero (Order #1)"
              >
                <Star className="h-3 w-3 fill-amber-300" />
                Make Cover
              </button>
            )}

            {/* Visibility Toggle Button */}
            <button
              type="button"
              onClick={togglePublic}
              className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase shadow transition-colors ${
                asset.is_public
                  ? "bg-emerald-950/85 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900"
                  : "bg-neutral-900/90 text-neutral-400 border border-neutral-700 hover:bg-neutral-800 hover:text-neutral-200"
              }`}
              title={
                asset.is_public
                  ? "Visibility: Public on site (click to make internal)"
                  : "Visibility: Internal only (click to make public)"
              }
            >
              {asset.is_public ? (
                <>
                  <Eye className="h-3 w-3 text-emerald-400" /> Public
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3 text-neutral-400" /> Internal
                </>
              )}
            </button>
          </div>

          {/* Top-right: Drag handle & fallback arrow controls */}
          <div
            className="absolute top-2.5 end-2.5 flex items-center gap-0.5 rounded bg-black/75 p-1 z-10 border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="cursor-grab active:cursor-grabbing p-1 text-neutral-300 hover:text-white"
              title="Drag card to reorder"
            >
              <GripVertical className="h-3.5 w-3.5" />
            </div>
            <button
              type="button"
              disabled={isFirst}
              onClick={onMoveUp}
              title="Move Up (Order Earlier)"
              className="rounded p-1 text-white hover:bg-white/20 disabled:opacity-30 transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={onMoveDown}
              title="Move Down (Order Later)"
              className="rounded p-1 text-white hover:bg-white/20 disabled:opacity-30 transition-colors"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Card info & caption fields */}
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: "var(--iw-text-secondary)" }}>
            <span className="font-semibold text-sky-400">Order #{asset.sort_order}</span>
            <span
              className="truncate max-w-[170px] rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-neutral-300 border border-neutral-800"
              title={fileName}
            >
              {fileName}
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase font-mono block" style={{ color: "var(--iw-text-secondary)" }}>
                  Caption / Alt Text (EN)
                </label>
                {savingAlt && <span className="text-[10px] font-mono text-sky-400">saving…</span>}
              </div>
              <input
                type="text"
                value={altEn}
                onChange={(e) => setAltEn(e.target.value)}
                onBlur={saveAlt}
                placeholder="English caption or description"
                className="mt-1 w-full border bg-transparent px-2.5 py-1.5 text-xs rounded"
                style={{ borderColor: "var(--iw-border)" }}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-mono block" style={{ color: "var(--iw-text-secondary)" }}>
                Caption / Alt Text (AR)
              </label>
              <input
                type="text"
                value={altAr}
                onChange={(e) => setAltAr(e.target.value)}
                onBlur={saveAlt}
                dir="rtl"
                placeholder="الوصف أو التسمية التوضيحية بالعربية"
                className="mt-1 w-full border bg-transparent px-2.5 py-1.5 text-xs rounded"
                style={{ borderColor: "var(--iw-border)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t p-3 text-xs" style={{ borderColor: "var(--iw-border)" }}>
        <input
          ref={replaceFileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleReplace}
        />
        <button
          type="button"
          onClick={() => replaceFileRef.current?.click()}
          className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-300 hover:text-white transition-colors"
        >
          <RefreshCw className="h-3 w-3 text-neutral-400" />
          Replace file
        </button>

        {/* Inline delete confirmation */}
        {isConfirmingDelete ? (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-red-400 uppercase">Delete?</span>
            <button
              type="button"
              onClick={() => {
                setIsConfirmingDelete(false);
                onDelete();
              }}
              className="rounded bg-red-600 px-2 py-0.5 text-[11px] font-medium text-white hover:bg-red-500 transition-colors"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(false)}
              className="rounded border border-neutral-700 px-2 py-0.5 text-[11px] text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsConfirmingDelete(true)}
            className="inline-flex items-center gap-1 p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-500/10 transition-colors"
            title="Delete Photo"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="text-[11px] font-mono">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Schema Card Component ---------------- */

function SchemaCard({
  schema,
  onDelete,
  onReplace,
  onChanged,
}: {
  schema: MediaAsset;
  onDelete: () => void;
  onReplace: () => void;
  onChanged: () => void;
}) {
  const isPdf = schema.mime_type === "application/pdf" || schema.storage_path.endsWith(".pdf");
  const replaceFileRef = useRef<HTMLInputElement>(null);
  const [altEn, setAltEn] = useState(schema.alt_en ?? "");
  const [altAr, setAltAr] = useState(schema.alt_ar ?? "");
  const [savingAlt, setSavingAlt] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const { data: url } = useQuery({
    queryKey: ["admin", "schema-url", schema.id],
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(schema.storage_path, 3600);
      if (error) throw error;
      return data.signedUrl;
    },
  });

  const togglePublic = async () => {
    const next = !schema.is_public;
    try {
      await supabase.from("media_assets").update({ is_public: next }).eq("id", schema.id);
      await logAudit({
        action: "toggle_schema_public",
        targetTable: "media_assets",
        targetId: schema.id,
        detail: `is_public=${next}`,
      });
      toast.success(next ? "Project schema marked as public." : "Project schema marked as internal only.");
      onChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to toggle schema visibility.");
    }
  };

  const saveAlt = async () => {
    if (altEn === (schema.alt_en ?? "") && altAr === (schema.alt_ar ?? "")) return;
    setSavingAlt(true);
    try {
      await supabase
        .from("media_assets")
        .update({
          alt_en: altEn.trim() || null,
          alt_ar: altAr.trim() || null,
        })
        .eq("id", schema.id);
      toast.success("Schema title / caption saved.");
      onChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to save schema caption.");
    } finally {
      setSavingAlt(false);
    }
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const newPath = `${schema.project_id}/${crypto.randomUUID()}.${ext}`;

      const { error: upErr } = await supabase.storage.from(BUCKET).upload(newPath, file);
      if (upErr) throw upErr;

      let updErr: any = null;
      try {
        const res = await supabase
          .from("media_assets")
          .update({ storage_path: newPath, mime_type: file.type })
          .eq("id", schema.id);
        updErr = res.error;
      } catch (err: any) {
        updErr = err;
      }

      if (updErr && updErr.code === "42703") {
        await supabase
          .from("media_assets")
          .update({ storage_path: newPath })
          .eq("id", schema.id);
      } else if (updErr) {
        throw updErr;
      }

      await supabase.storage.from(BUCKET).remove([schema.storage_path]);
      toast.success("Schema replaced successfully.");
      onChanged();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Replace failed.");
    }
  };

  return (
    <AdminCard>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="display-md text-lg">Active Project Schema</h3>
            <StatusPill tone={schema.is_public ? "success" : "muted"}>
              {schema.is_public ? "public" : "internal"}
            </StatusPill>
            <span className="font-mono text-xs uppercase" style={{ color: "var(--iw-text-secondary)" }}>
              {schema.mime_type || (isPdf ? "PDF" : "Image")}
            </span>
          </div>
          <p className="mt-1 font-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            File: {schema.storage_path.split("/").pop()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            ref={replaceFileRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleReplace}
          />
          <AdminButton onClick={togglePublic}>
            {schema.is_public ? "Make internal (fallback generic)" : "Make public (override generic)"}
          </AdminButton>
          <AdminButton onClick={() => replaceFileRef.current?.click()}>
            <RefreshCw className="h-3.5 w-3.5" />
            Replace file
          </AdminButton>

          {isConfirmingDelete ? (
            <div className="flex items-center gap-1.5 rounded border border-red-500/40 bg-red-950/30 px-2 py-1">
              <span className="text-xs text-red-300 font-mono">Revert to sector schematic?</span>
              <button
                type="button"
                onClick={() => {
                  setIsConfirmingDelete(false);
                  onDelete();
                }}
                className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-red-500 transition-colors"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                className="rounded border border-neutral-700 px-2 py-0.5 text-xs text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <AdminButton onClick={() => setIsConfirmingDelete(true)}>
              <Trash2 className="h-3.5 w-3.5 text-red-400" />
              Delete
            </AdminButton>
          )}
        </div>
      </div>

      <div className="mt-6 border p-4" style={{ borderColor: "var(--iw-border)" }}>
        {isPdf ? (
          <div className="space-y-3">
            {url ? (
              <iframe
                src={url}
                title="Project Schema PDF"
                className="h-96 w-full border bg-neutral-900"
                style={{ borderColor: "var(--iw-border)" }}
              />
            ) : (
              <div className="flex h-48 items-center justify-center text-xs">Loading PDF preview…</div>
            )}
            {url ? (
              <div className="flex justify-end">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono inline-flex items-center gap-1 text-xs text-sky-400 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open PDF in new tab
                </a>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex max-h-[500px] w-full items-center justify-center overflow-hidden bg-black/20 p-2">
            {url ? (
              <img
                src={url}
                alt={schema.alt_en ?? "Project Schema"}
                className="max-h-[480px] w-auto object-contain"
              />
            ) : (
              <div className="text-xs">Loading image preview…</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="label-mono block text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            Schema title / caption (EN)
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={altEn}
              onChange={(e) => setAltEn(e.target.value)}
              placeholder="English caption or schematic title"
              className="w-full border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "var(--iw-border)" }}
            />
            <AdminButton disabled={savingAlt} onClick={saveAlt}>
              {savingAlt ? "Saving…" : "Save"}
            </AdminButton>
          </div>
        </div>

        <div>
          <label className="label-mono block text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            Schema title / caption (AR)
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={altAr}
              onChange={(e) => setAltAr(e.target.value)}
              dir="rtl"
              placeholder="عنوان المخطط أو وصفه بالعربية"
              className="w-full border bg-transparent px-3 py-2 text-sm"
              style={{ borderColor: "var(--iw-border)" }}
            />
            <AdminButton disabled={savingAlt} onClick={saveAlt}>
              {savingAlt ? "حفظ…" : "حفظ"}
            </AdminButton>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}
