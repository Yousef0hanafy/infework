import { useMemo, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ExternalLink, Image as ImageIcon, Pencil, Plus, Search, Star, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getFlagshipProjects } from "@/lib/flagship-projects";
import { getProjectMeta } from "@/lib/project-meta";
import { logAudit } from "@/lib/audit";
import { toast } from "sonner";
import {
  AdminButton,
  AdminPageHeader,
  AdminTableShell,
  StatusPill,
  Td,
  Th,
} from "@/components/infeworks/AdminUI";

const TITLE = "Projects — Infeworks Admin";
const DESC =
  "Internal management of Infeworks project records, engineering facts, schematics, and live publication state.";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const Route = createFileRoute("/admin/projects/")({
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
  component: AdminProjects,
});

type ProjectRow = {
  id: string;
  slug: string;
  status: string;
  featured: boolean;
  internal_notes: string | null;
  created_at: string;
};

type ProfileRow = {
  project_id: string;
  locale: string;
  title: string;
};

type CapabilityRow = {
  id: string;
  slug: string;
  en_name: string;
  ar_name: string;
};

function resolveProjectInfo(
  project: ProjectRow,
  profiles: ProfileRow[],
  flagshipsEn: Map<string, { title: string }>,
) {
  const enProfile = profiles.find((p) => p.project_id === project.id && p.locale === "en");
  const fallbackEn = flagshipsEn.get(project.slug);
  const hasEnTitle = Boolean(enProfile?.title || fallbackEn?.title);
  const resolvedTitleEn = enProfile?.title || fallbackEn?.title || project.slug;

  return {
    resolvedTitleEn,
    hasEnTitle,
  };
}

function AdminProjects() {
  const router = useRouter();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  // Form states for "Create Project"
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [selectedCapId, setSelectedCapId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const flagshipsEnMap = useMemo(() => {
    const list = getFlagshipProjects("en");
    return new Map(list.map((p) => [p.slug, { title: p.title }]));
  }, []);

  // Fetch capabilities for the creation modal
  const { data: capabilities = [] } = useQuery({
    queryKey: ["admin", "capabilities-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("capabilities")
        .select("id,slug,en_name,ar_name")
        .order("en_name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as CapabilityRow[];
    },
  });

  // Query projects and public profiles
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "projects-list"],
    queryFn: async () => {
      let projectsRes = await supabase
        .from("projects")
        .select("id,slug,status,featured,internal_notes,created_at")
        .order("created_at", { ascending: false });

      if (projectsRes.error && projectsRes.error.code === "42703") {
        projectsRes = (await supabase
          .from("projects")
          .select("id,slug,status,internal_notes,created_at")
          .order("created_at", { ascending: false })) as any;
      }

      if (projectsRes.error) {
        console.error("Failed to load projects:", projectsRes.error);
        throw projectsRes.error;
      }

      const profilesRes = await supabase
        .from("public_project_profiles")
        .select("project_id,locale,title");

      const rawProjects = (projectsRes.data ?? []) as any[];
      const rawProfiles = (profilesRes.data ?? []) as ProfileRow[];

      return {
        projects: rawProjects.map((p) => ({
          ...p,
          featured: Boolean(p.featured),
        })) as ProjectRow[],
        profiles: rawProfiles,
      };
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["admin", "projects-list"] });
    void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
    void qc.invalidateQueries({ queryKey: ["admin", "summary"] });
  };

  const resetForm = () => {
    setTitleEn("");
    setTitleAr("");
    setSlug("");
    setSlugManuallyEdited(false);
    setSelectedCapId("");
    setIsFeatured(false);
    setNotes("");
    setFormError(null);
    setOpen(false);
  };

  const isSlugTaken = useMemo(() => {
    const s = slug.trim().toLowerCase();
    if (!s) return false;
    return (data?.projects ?? []).some((p) => p.slug.toLowerCase() === s);
  }, [slug, data?.projects]);

  const handleTitleEnChange = (val: string) => {
    setTitleEn(val);
    if (!slugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  const handleSlugChange = (raw: string) => {
    setSlugManuallyEdited(true);
    const formatted = raw.toLowerCase().replace(/\s+/g, "-");
    setSlug(formatted);
    if (!formatted.trim()) {
      setFormError(null);
    } else if (!SLUG_REGEX.test(formatted)) {
      setFormError("Slug must contain lowercase letters, numbers, and hyphens only.");
    } else {
      setFormError(null);
    }
  };

  const createProject = useMutation({
    mutationFn: async () => {
      const trimmedTitleEn = titleEn.trim();
      const trimmedSlug = slug.trim().toLowerCase();

      if (!trimmedTitleEn) {
        throw new Error("Project Title (English) is required.");
      }
      if (!trimmedSlug) {
        throw new Error("Project slug is required.");
      }
      if (!SLUG_REGEX.test(trimmedSlug)) {
        throw new Error(
          "Invalid slug format. Use lowercase letters, numbers, and single hyphens (e.g. 'cairo-wwtp').",
        );
      }
      if (isSlugTaken) {
        throw new Error("Project slug is already taken. Please choose a different slug.");
      }

      // 1. Insert into projects
      const { data: newProj, error: projErr } = await supabase
        .from("projects")
        .insert({
          slug: trimmedSlug,
          classification: "public",
          status: "draft",
          featured: isFeatured,
          internal_notes: notes.trim() || null,
        })
        .select("id")
        .single();

      if (projErr) throw projErr;
      const newId = newProj.id;

      // 2. Insert bilingual profile records
      const profileInserts: {
        project_id: string;
        locale: string;
        title: string;
        challenge?: string | null;
        outcome?: string | null;
      }[] = [
        {
          project_id: newId,
          locale: "en",
          title: trimmedTitleEn,
        },
      ];

      if (titleAr.trim()) {
        profileInserts.push({
          project_id: newId,
          locale: "ar",
          title: titleAr.trim(),
        });
      }

      const { error: profErr } = await supabase
        .from("public_project_profiles")
        .insert(profileInserts);

      if (profErr) {
        console.error("Failed to insert profile record:", profErr);
      }

      // 3. Link initial capability if selected
      if (selectedCapId) {
        const { error: capErr } = await supabase
          .from("project_capabilities")
          .insert({
            project_id: newId,
            capability_id: selectedCapId,
          });
        if (capErr) {
          console.error("Failed to link project capability:", capErr);
        }
      }

      await logAudit({
        action: "create_project",
        targetTable: "projects",
        targetId: newId,
        detail: `Created project slug=${trimmedSlug}, title="${trimmedTitleEn}"`,
      });

      return { id: newId, slug: trimmedSlug };
    },
    onSuccess: ({ id, slug: createdSlug }) => {
      resetForm();
      invalidate();
      toast.success(`Project "${createdSlug}" created successfully.`);
      router.navigate({
        to: "/admin/projects/$projectId",
        params: { projectId: id },
      });
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Could not create project.";
      setFormError(msg);
      toast.error(msg);
    },
  });

  const toggleStatus = useMutation({
    mutationFn: async (project: ProjectRow) => {
      const next = project.status === "published" ? "draft" : "published";
      const { error } = await supabase
        .from("projects")
        .update({ status: next })
        .eq("id", project.id);
      if (error) throw error;

      await logAudit({
        action: next === "published" ? "publish_project" : "unpublish_project",
        targetTable: "projects",
        targetId: project.id,
        detail: `Status updated from ${project.status} to ${next} for ${project.slug}`,
      });

      return { project, next };
    },
    onSuccess: ({ project, next }) => {
      invalidate();
      toast.success(
        next === "published"
          ? `Project "${project.slug}" published live.`
          : `Project "${project.slug}" reverted to draft.`,
      );
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update project status.");
    },
  });

  const toggleFeatured = useMutation({
    mutationFn: async (project: ProjectRow) => {
      const next = !project.featured;
      const { error } = await supabase
        .from("projects")
        .update({ featured: next })
        .eq("id", project.id);
      if (error) throw error;

      await logAudit({
        action: next ? "feature_project" : "unfeature_project",
        targetTable: "projects",
        targetId: project.id,
        detail: `Featured state toggled to ${next} for ${project.slug}`,
      });

      return { project, next };
    },
    onSuccess: ({ project, next }) => {
      invalidate();
      toast.success(
        next
          ? `Marked "${project.slug}" as featured flagship.`
          : `Removed "${project.slug}" from featured.`,
      );
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to toggle featured state.");
    },
  });

  const projects = data?.projects ?? [];
  const profiles = data?.profiles ?? [];

  const computedProjects = useMemo(() => {
    return projects.map((p) => {
      const info = resolveProjectInfo(p, profiles, flagshipsEnMap);
      return {
        ...p,
        ...info,
      };
    });
  }, [projects, profiles, flagshipsEnMap]);

  const filteredProjects = useMemo(() => {
    return computedProjects.filter((p) => {
      if (featuredOnly && !p.featured) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSlug = p.slug.toLowerCase().includes(q);
        const matchesTitle = p.resolvedTitleEn.toLowerCase().includes(q);
        if (!matchesSlug && !matchesTitle) return false;
      }
      return true;
    });
  }, [computedProjects, searchQuery, statusFilter, featuredOnly]);

  return (
    <div className="mx-auto w-full max-w-[1300px]">
      <AdminPageHeader
        eyebrow="Control Center"
        title="Projects"
        description="Manage project records, bilingual profiles, engineering facts, schematics, and live publication state."
        action={
          <AdminButton variant="solid" onClick={() => setOpen(true)}>
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Create Project
          </AdminButton>
        }
      />

      {/* Quick Overview Stats Strip */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded border p-3.5" style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}>
          <p className="label-mono text-[11px]" style={{ color: "var(--iw-text-secondary)" }}>Total Projects</p>
          <p className="display-md text-xl font-bold mt-1 text-white">{computedProjects.length}</p>
        </div>
        <div className="rounded border p-3.5" style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}>
          <p className="label-mono text-[11px] text-emerald-400">Published Live</p>
          <p className="display-md text-xl font-bold mt-1 text-emerald-400">
            {computedProjects.filter((p) => p.status === "published").length}
          </p>
        </div>
        <div className="rounded border p-3.5" style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}>
          <p className="label-mono text-[11px] text-amber-400">Drafts</p>
          <p className="display-md text-xl font-bold mt-1 text-amber-400">
            {computedProjects.filter((p) => p.status === "draft").length}
          </p>
        </div>
        <div className="rounded border p-3.5" style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}>
          <p className="label-mono text-[11px] text-sky-400">Featured Flagships</p>
          <p className="display-md text-xl font-bold mt-1 text-sky-400">
            {computedProjects.filter((p) => p.featured).length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-4 border p-4"
        style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
      >
        <div className="flex flex-1 min-w-[260px] items-center gap-2 border px-3 py-2" style={{ borderColor: "var(--iw-border)" }}>
          <Search className="h-4 w-4 text-[var(--iw-text-secondary)] shrink-0" />
          <input
            type="text"
            placeholder="Search by title or slug…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--iw-text-secondary)]"
          />
          {searchQuery ? (
            <button type="button" onClick={() => setSearchQuery("")} className="text-xs text-[var(--iw-text-secondary)] hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border bg-transparent px-2.5 py-1.5 text-xs outline-none focus:border-[var(--iw-accent)]"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setFeaturedOnly(!featuredOnly)}
            className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors"
            style={{
              borderColor: featuredOnly ? "var(--iw-accent)" : "var(--iw-border)",
              backgroundColor: featuredOnly ? "rgba(217, 119, 6, 0.1)" : "transparent",
              color: featuredOnly ? "#f59e0b" : "var(--iw-text-primary)",
            }}
          >
            <Star className={`h-3.5 w-3.5 ${featuredOnly ? "fill-amber-400 text-amber-400" : ""}`} />
            Featured ({computedProjects.filter((p) => p.featured).length})
          </button>
        </div>
      </div>

      <AdminTableShell>
        <thead>
          <tr>
            <Th>Featured</Th>
            <Th>Cover</Th>
            <Th>Title & Slug</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-sm">
                Loading projects…
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-sm" style={{ color: "var(--iw-error)" }}>
                Failed to load project records: {(error as Error)?.message || "Database query failed"}
              </td>
            </tr>
          ) : filteredProjects.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-5 py-10 text-sm"
                style={{ color: "var(--iw-text-secondary)" }}
              >
                No project records matched your filters.
              </td>
            </tr>
          ) : (
            filteredProjects.map((project) => {
              const isPublished = project.status === "published";
              const meta = getProjectMeta(project.slug);
              const coverUrl = meta?.cover;
              const totalPhotos = (meta?.gallery?.length ?? 0) + (meta?.cover ? 1 : 0);

              return (
                <tr key={project.id}>
                  {/* Featured toggle */}
                  <Td className="w-12 text-center">
                    <button
                      type="button"
                      title={project.featured ? "Remove from featured" : "Mark as featured"}
                      disabled={toggleFeatured.isPending}
                      onClick={() => toggleFeatured.mutate(project)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          project.featured
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-500 hover:text-neutral-300"
                        }`}
                      />
                    </button>
                  </Td>

                  {/* Cover thumbnail */}
                  <Td className="w-24">
                    <Link
                      to="/admin/projects/$projectId"
                      params={{ projectId: project.id }}
                      search={{ step: "media" }}
                      className="group relative block aspect-[16/10] w-20 overflow-hidden rounded border border-neutral-800 bg-neutral-900 shadow transition-transform hover:scale-105"
                      title={`View ${totalPhotos} photos for ${project.slug}`}
                    >
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={project.slug}
                          className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-neutral-600">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <ImageIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                    </Link>
                  </Td>

                  {/* Title & Slug */}
                  <Td>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Link
                          to="/admin/projects/$projectId"
                          params={{ projectId: project.id }}
                          className="font-medium hover:underline hover:text-[var(--iw-accent)]"
                        >
                          {project.resolvedTitleEn}
                        </Link>
                        {isPublished ? (
                          <Link
                            to="/$locale/work/$slug"
                            params={{ locale: "en", slug: project.slug }}
                            target="_blank"
                            rel="noreferrer"
                            title="View public live page"
                            className="text-[var(--iw-text-secondary)] hover:text-white"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ) : null}
                      </div>
                      <p className="font-mono text-xs text-[var(--iw-text-secondary)]">
                        {project.slug}
                      </p>
                    </div>
                  </Td>

                  {/* Status */}
                  <Td>
                    <StatusPill tone={isPublished ? "success" : "warning"}>
                      {project.status}
                    </StatusPill>
                  </Td>

                  {/* Actions */}
                  <Td>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to="/admin/projects/$projectId"
                        params={{ projectId: project.id }}
                        className="inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)]"
                        style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-primary)" }}
                      >
                        <Pencil className="h-3 w-3" strokeWidth={1.5} />
                        Edit
                      </Link>

                      <Link
                        to="/admin/projects/$projectId"
                        params={{ projectId: project.id }}
                        search={{ step: "media" }}
                        className="inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors hover:border-[var(--iw-accent)] hover:text-[var(--iw-accent)]"
                        style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-secondary)" }}
                        title="Manage photos and diagrams"
                      >
                        <ImageIcon className="h-3 w-3" strokeWidth={1.5} />
                        Photos {totalPhotos > 0 ? `(${totalPhotos})` : ""}
                      </Link>

                      {isPublished ? (
                        <AdminButton
                          variant="outline"
                          disabled={toggleStatus.isPending}
                          onClick={() => toggleStatus.mutate(project)}
                        >
                          Unpublish
                        </AdminButton>
                      ) : (
                        <AdminButton
                          variant="solid"
                          disabled={toggleStatus.isPending || !project.hasEnTitle}
                          onClick={() => toggleStatus.mutate(project)}
                        >
                          Publish
                        </AdminButton>
                      )}
                    </div>
                  </Td>
                </tr>
              );
            })
          )}
        </tbody>
      </AdminTableShell>

      {/* Create Project Modal */}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6 overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createProject.mutate();
            }}
            role="dialog"
            aria-modal="true"
            className="w-full max-w-xl border p-8 my-8"
            style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="display-md text-2xl">Add New Project</h2>
                <p className="mt-1 text-xs text-[var(--iw-text-secondary)]">
                  Initialize a new engineering project record with bilingual details and sector capability.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                aria-label="Close"
                className="text-[var(--iw-text-secondary)] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {/* English Title */}
              <div>
                <label
                  htmlFor="p-title-en"
                  className="label-mono block text-xs"
                  style={{ color: "var(--iw-text-secondary)" }}
                >
                  Project Title (English) *
                </label>
                <input
                  id="p-title-en"
                  value={titleEn}
                  onChange={(e) => handleTitleEnChange(e.target.value)}
                  placeholder="e.g. Zenein WWTP Rehabilitation & Expansion"
                  required
                  className="mt-2 w-full border bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                />
              </div>

              {/* Arabic Title */}
              <div>
                <label
                  htmlFor="p-title-ar"
                  className="label-mono block text-xs"
                  style={{ color: "var(--iw-text-secondary)" }}
                >
                  Project Title (Arabic)
                </label>
                <input
                  id="p-title-ar"
                  dir="rtl"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="مثال: إعادة تأهيل وتطوير محطة معالجة مياه الصرف الصحي بزنين"
                  className="mt-2 w-full border bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                />
              </div>

              {/* Slug */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="p-slug"
                    className="label-mono block text-xs"
                    style={{ color: "var(--iw-text-secondary)" }}
                  >
                    Slug (Public URL Identifier) *
                  </label>
                  {slugManuallyEdited ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSlugManuallyEdited(false);
                        const auto = titleEn
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "");
                        setSlug(auto);
                      }}
                      className="text-[11px] text-[var(--iw-accent)] hover:underline"
                    >
                      Reset to auto
                    </button>
                  ) : null}
                </div>
                <input
                  id="p-slug"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="zenein-wwtp-rehabilitation"
                  required
                  className={`mt-2 w-full border bg-transparent px-4 py-2.5 text-sm font-mono outline-none ${
                    isSlugTaken ? "border-rose-500 text-rose-300" : "focus:border-[var(--iw-accent)]"
                  }`}
                  style={{ borderColor: isSlugTaken ? "#f43f5e" : "var(--iw-border)" }}
                />
                {isSlugTaken ? (
                  <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    This slug is already used by an existing project. Please choose a unique identifier.
                  </p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-[var(--iw-text-secondary)]">
                    Public page will be: <code className="font-mono text-white">/work/{slug || "slug"}</code>
                  </p>
                )}
              </div>

              {/* Primary Capability / Sector */}
              <div>
                <label
                  htmlFor="p-capability"
                  className="label-mono block text-xs"
                  style={{ color: "var(--iw-text-secondary)" }}
                >
                  Sector Capability
                </label>
                <select
                  id="p-capability"
                  value={selectedCapId}
                  onChange={(e) => setSelectedCapId(e.target.value)}
                  className="mt-2 w-full border bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  <option value="" className="bg-[#111] text-white">
                    -- Select primary engineering sector --
                  </option>
                  {capabilities.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#111] text-white">
                      {c.en_name} ({c.ar_name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 border p-3.5" style={{ borderColor: "var(--iw-border)" }}>
                <input
                  id="p-featured"
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 accent-[var(--iw-accent)] cursor-pointer"
                />
                <label htmlFor="p-featured" className="text-xs cursor-pointer select-none">
                  <span className="font-medium text-white block">Feature on Homepage Bento</span>
                  <span className="text-[var(--iw-text-secondary)]">
                    Display prominently among the top flagship benchmarks on the homepage.
                  </span>
                </label>
              </div>

              {/* Internal Notes */}
              <div>
                <label
                  htmlFor="p-notes"
                  className="label-mono block text-xs"
                  style={{ color: "var(--iw-text-secondary)" }}
                >
                  Internal Notes (Optional)
                </label>
                <textarea
                  id="p-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contract number, client reference, or internal tracking details…"
                  className="mt-2 w-full border bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                />
              </div>

              {formError ? (
                <div
                  role="alert"
                  className="flex items-start gap-2 border-s-2 ps-3 py-1 text-xs"
                  style={{ borderColor: "var(--iw-error)", color: "var(--iw-error)" }}
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t pt-4" style={{ borderColor: "var(--iw-border)" }}>
              <AdminButton onClick={resetForm}>Cancel</AdminButton>
              <AdminButton
                type="submit"
                variant="solid"
                disabled={
                  createProject.isPending ||
                  !titleEn.trim() ||
                  !slug.trim() ||
                  isSlugTaken ||
                  !SLUG_REGEX.test(slug.trim())
                }
              >
                {createProject.isPending ? "Creating…" : "Create & Open Editor"}
              </AdminButton>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
