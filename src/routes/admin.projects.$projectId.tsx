import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link2,
  MapPin,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

const TITLE = "Project Editor — Infeworks Admin";
const DESC =
  "Internal editor for a single Infeworks project record: profiles, claims, evidence, location and media.";

export const Route = createFileRoute("/admin/projects/$projectId")({
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

const CLASSIFICATIONS = [
  { value: "public", label: "public" },
  { value: "internal", label: "internal" },
  { value: "study", label: "study" },
];

const STEPS = [
  { key: "basics", label: "Basics", icon: FileText, hint: "Identity, sector and status" },
  { key: "story", label: "Story", icon: FileText, hint: "Challenge, scope and outcome (EN/AR)" },
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
    hint: "Cover, diagrams and alt text",
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
  created_at: string;
};

const BUCKET = "project-media";

function ProjectEditor() {
  const { projectId } = Route.useParams();
  const qc = useQueryClient();
  const [step, setStep] = useState<StepKey>("basics");

  const { data: project, isLoading } = useQuery({
    queryKey: ["admin", "project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,slug,classification,status,featured,internal_notes")
        .eq("id", projectId)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as Project | null;
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
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "project", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
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
                <StatusPill tone="muted">{project.classification}</StatusPill>
                {project.featured ? <StatusPill tone="muted">featured</StatusPill> : null}
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
            className="mt-8 grid gap-px border md:grid-cols-6"
            style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-border)" }}
          >
            {STEPS.map((s, i) => {
              const active = s.key === step;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setStep(s.key)}
                    className="flex h-full w-full flex-col items-start gap-1 px-4 py-4 text-start"
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
            {step === "basics" ? <MetaTab project={project} /> : null}
            {step === "story" ? (
              <>
                <ProfileEditor projectId={project.id} locale="en" />
                <ProfileEditor projectId={project.id} locale="ar" />
              </>
            ) : null}
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
            {step === "media" ? <MediaTab projectId={project.id} /> : null}
            {step === "preview" ? <PreviewStep project={project} /> : null}
          </div>

          <div
            className="fixed inset-x-0 bottom-0 z-40 border-t"
            style={{ backgroundColor: "var(--iw-surface)", borderColor: "var(--iw-border)" }}
          >
            <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-3 px-6 py-4">
              <div className="min-w-[160px]">
                <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                  Completion {completion}%
                </p>
                <div className="mt-2 h-1 w-40" style={{ backgroundColor: "var(--iw-border)" }}>
                  <div
                    className="h-1"
                    style={{ width: `${completion}%`, backgroundColor: "var(--iw-accent)" }}
                  />
                </div>
              </div>

              <a
                href={`/en/work/${project.slug}`}
                target="_blank"
                rel="noreferrer"
                className="label-mono inline-flex items-center gap-2 border px-4 py-2"
                style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                Preview public page
              </a>

              <div className="ms-auto flex flex-wrap items-center gap-3">
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
                      setStatus.isPending || !publishReady || project.classification === "study"
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

function PreviewStep({ project }: { project: Project }) {
  const { data } = useQuery({
    queryKey: ["admin", "preview", project.id],
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

  const en = data?.find((r) => r.locale === "en");
  const ar = data?.find((r) => r.locale === "ar");

  return (
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
  );
}

/* ------------------------------- Tab 1: meta ------------------------------ */

function MetaTab({ project }: { project: Project }) {
  const qc = useQueryClient();
  const [slug, setSlug] = useState(project.slug);
  const [classification, setClassification] = useState(project.classification);
  const [notes, setNotes] = useState(project.internal_notes ?? "");
  const [featured, setFeatured] = useState(project.featured);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const save = useMutation({
    mutationFn: async () => {
      const { error: err } = await supabase
        .from("projects")
        .update({
          slug: slug.trim(),
          classification,
          featured,
          internal_notes: notes.trim() || null,
        })
        .eq("id", project.id);
      if (err) throw err;
      await logAudit({
        action: "update_project",
        targetTable: "projects",
        targetId: project.id,
        detail: `slug=${slug.trim()} classification=${classification}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      void qc.invalidateQueries({ queryKey: ["admin", "project", project.id] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      setError(e instanceof Error ? e.message : "Could not save project.");
    },
  });

  return (
    <>
      <AdminCard>
        <h2 className="display-md text-xl">Record</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <TextField id="m-slug" label="Slug" value={slug} onChange={setSlug} />
          <SelectField
            id="m-class"
            label="Classification"
            value={classification}
            onChange={setClassification}
            options={CLASSIFICATIONS}
          />
        </div>
        <div className="mt-6 flex items-center gap-3">
          <input
            id="m-featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="m-featured" className="text-sm">
            Feature this project on the homepage{" "}
            <span className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
              optional
            </span>
          </label>
        </div>
        <div className="mt-6">
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
            <FormNotice tone="success">Record saved.</FormNotice>
          </div>
        ) : null}
        <div className="mt-8 flex justify-end">
          <AdminButton variant="solid" disabled={save.isPending} onClick={() => save.mutate()}>
            <Save className="h-3.5 w-3.5" strokeWidth={2} />
            {save.isPending ? "Saving…" : "Save record"}
          </AdminButton>
        </div>
      </AdminCard>
    </>
  );
}

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
      void qc.invalidateQueries({ queryKey: key });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      setError(e instanceof Error ? e.message : "Could not save profile.");
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

/* ----------------------------- Tab 2: claims ----------------------------- */

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
      refresh();
    },
    onError: (e: unknown) => setError(e instanceof Error ? e.message : "Could not add claim."),
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
    onSuccess: refresh,
    onError: (e: unknown) => setError(e instanceof Error ? e.message : "Could not delete claim."),
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
                Delete
              </AdminButton>
            </div>

            <EvidenceList
              claimId={claim.id}
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
  claimId,
  items,
  onChanged,
}: {
  claimId: string;
  items: Evidence[];
  onChanged: () => void;
}) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addEvidence = useMutation({
    mutationFn: async () => {
      const { error: err } = await supabase.from("evidence").insert({
        claim_id: claimId,
        internal_link: link.trim() || null,
        internal_description: description.trim() || null,
      });
      if (err) throw err;
      await logAudit({
        action: "create_evidence",
        targetTable: "evidence",
        targetId: claimId,
        detail: description.trim().slice(0, 80) || link.trim().slice(0, 80),
      });
    },
    onSuccess: () => {
      setLink("");
      setDescription("");
      setError(null);
      onChanged();
    },
    onError: (e: unknown) => setError(e instanceof Error ? e.message : "Could not add evidence."),
  });

  const deleteEvidence = useMutation({
    mutationFn: async (id: string) => {
      const { error: err } = await supabase.from("evidence").delete().eq("id", id);
      if (err) throw err;
      await logAudit({ action: "delete_evidence", targetTable: "evidence", targetId: id });
    },
    onSuccess: onChanged,
  });

  return (
    <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--iw-border)" }}>
      <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
        Evidence ({items.length})
      </p>

      <ul className="mt-4 space-y-3">
        {items.length === 0 ? (
          <li className="text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            No evidence attached — this claim cannot be published.
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-start justify-between gap-4 border p-4"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium break-words">
                  {item.internal_description ?? "Untitled evidence"}
                </p>
                {item.internal_link ? (
                  <p
                    className="mt-1 font-mono text-xs break-all"
                    style={{ color: "var(--iw-text-secondary)" }}
                  >
                    {item.internal_link}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Delete evidence"
                onClick={() => deleteEvidence.mutate(item.id)}
                style={{ color: "var(--iw-text-secondary)" }}
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextField
          id={`ev-desc-${claimId}`}
          label="Internal description"
          value={description}
          onChange={setDescription}
          placeholder="Handover certificate, page 2"
        />
        <TextField
          id={`ev-link-${claimId}`}
          label="Internal link"
          value={link}
          onChange={setLink}
          placeholder="drive://… or file reference"
        />
      </div>
      {error ? (
        <div className="mt-4">
          <FormNotice tone="error">{error}</FormNotice>
        </div>
      ) : null}
      <div className="mt-6 flex justify-end">
        <AdminButton
          disabled={addEvidence.isPending || (!description.trim() && !link.trim())}
          onClick={() => addEvidence.mutate()}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          {addEvidence.isPending ? "Adding…" : "Add evidence"}
        </AdminButton>
      </div>
    </div>
  );
}

/* ---------------------------- Tab 3: location ---------------------------- */

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
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLat(location ? String(location.lat) : "");
    setLng(location ? String(location.lng) : "");
    setDisplayName(location?.display_name ?? "");
  }, [location]);

  const save = useMutation({
    mutationFn: async () => {
      const latNum = Number(lat);
      const lngNum = Number(lng);
      if (!Number.isFinite(latNum) || latNum < -90 || latNum > 90) {
        throw new Error("Latitude must be a number between -90 and 90.");
      }
      if (!Number.isFinite(lngNum) || lngNum < -180 || lngNum > 180) {
        throw new Error("Longitude must be a number between -180 and 180.");
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
      void qc.invalidateQueries({ queryKey: key });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      setError(e instanceof Error ? e.message : "Could not save location.");
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

/* ------------------------------ Tab 4: media ----------------------------- */

function MediaTab({ projectId }: { projectId: string }) {
  const qc = useQueryClient();
  const key = ["admin", "media", projectId] as const;
  const fileRef = useRef<HTMLInputElement>(null);
  const [altEn, setAltEn] = useState("");
  const [altAr, setAltAr] = useState("");
  const [isPublic, setIsPublic] = useState("false");
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: assets } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("media_assets")
        .select("id,project_id,storage_path,alt_en,alt_ar,is_public,created_at")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });
      if (err) throw err;
      return (data ?? []) as MediaAsset[];
    },
  });

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: key });
    void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
  };

  async function upload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choose an image file first.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `${projectId}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("media_assets").insert({
        project_id: projectId,
        storage_path: path,
        alt_en: altEn.trim() || null,
        alt_ar: altAr.trim() || null,
        is_public: isPublic === "true",
      });
      if (insErr) throw insErr;

      await logAudit({
        action: "upload_media",
        targetTable: "media_assets",
        targetId: projectId,
        detail: path,
      });

      if (fileRef.current) fileRef.current.value = "";
      setAltEn("");
      setAltAr("");
      setIsPublic("false");
      refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const togglePublic = useMutation({
    mutationFn: async (asset: MediaAsset) => {
      const { error: err } = await supabase
        .from("media_assets")
        .update({ is_public: !asset.is_public })
        .eq("id", asset.id);
      if (err) throw err;
      await logAudit({
        action: "update_media",
        targetTable: "media_assets",
        targetId: asset.id,
        detail: `is_public=${!asset.is_public}`,
      });
    },
    onSuccess: refresh,
  });

  const remove = useMutation({
    mutationFn: async (asset: MediaAsset) => {
      await supabase.storage.from(BUCKET).remove([asset.storage_path]);
      const { error: err } = await supabase.from("media_assets").delete().eq("id", asset.id);
      if (err) throw err;
      await logAudit({
        action: "delete_media",
        targetTable: "media_assets",
        targetId: asset.id,
        detail: asset.storage_path,
      });
    },
    onSuccess: refresh,
  });

  return (
    <>
      <AdminCard>
        <h2 className="display-md text-xl">Upload project media</h2>
        <p className="body-reading mt-3 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
          Files are stored privately. Only assets explicitly marked public are eligible for the
          public site.
        </p>

        <div className="mt-6">
          <label
            htmlFor="media-file"
            className="label-mono block"
            style={{ color: "var(--iw-text-secondary)" }}
          >
            Image file
          </label>
          <input
            id="media-file"
            ref={fileRef}
            type="file"
            accept="image/*"
            className="mt-2 w-full border bg-transparent px-4 py-3 text-sm"
            style={{ borderColor: "var(--iw-border)" }}
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <TextField id="media-alt-en" label="Alt text (EN)" value={altEn} onChange={setAltEn} />
          <TextField
            id="media-alt-ar"
            label="Alt text (AR)"
            value={altAr}
            onChange={setAltAr}
            dir="rtl"
          />
          <SelectField
            id="media-public"
            label="Visibility"
            value={isPublic}
            onChange={setIsPublic}
            options={[
              { value: "false", label: "internal only" },
              { value: "true", label: "public" },
            ]}
          />
        </div>

        {error ? (
          <div className="mt-6">
            <FormNotice tone="error">{error}</FormNotice>
          </div>
        ) : null}

        <div className="mt-8 flex justify-end">
          <AdminButton variant="solid" disabled={uploading} onClick={upload}>
            <Upload className="h-3.5 w-3.5" strokeWidth={2} />
            {uploading ? "Uploading…" : "Upload"}
          </AdminButton>
        </div>
      </AdminCard>

      {(assets?.length ?? 0) === 0 ? (
        <AdminCard>
          <p className="text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            No media uploaded for this project yet.
          </p>
        </AdminCard>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {assets!.map((asset) => (
            <MediaCard
              key={asset.id}
              asset={asset}
              onToggle={() => togglePublic.mutate(asset)}
              onRemove={() => remove.mutate(asset)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function MediaCard({
  asset,
  onToggle,
  onRemove,
}: {
  asset: MediaAsset;
  onToggle: () => void;
  onRemove: () => void;
}) {
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

  return (
    <div
      className="border"
      style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
    >
      <div
        className="aspect-[4/3] w-full overflow-hidden"
        style={{ backgroundColor: "var(--iw-bg)" }}
      >
        {url ? (
          <img
            src={url}
            alt={asset.alt_en ?? asset.alt_ar ?? "Project media"}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="space-y-3 p-5">
        <StatusPill tone={asset.is_public ? "success" : "muted"}>
          {asset.is_public ? "public" : "internal"}
        </StatusPill>
        <p
          className="font-mono text-[11px] break-all"
          style={{ color: "var(--iw-text-secondary)" }}
        >
          {asset.storage_path}
        </p>
        <p className="text-sm">{asset.alt_en ?? "—"}</p>
        <p className="text-sm" dir="rtl">
          {asset.alt_ar ?? "—"}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <AdminButton onClick={onToggle}>
            {asset.is_public ? "Make internal" : "Make public"}
          </AdminButton>
          <AdminButton onClick={onRemove}>
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            Delete
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
