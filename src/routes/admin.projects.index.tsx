import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  AdminButton,
  AdminPageHeader,
  AdminTableShell,
  StatusPill,
  Td,
  Th,
} from "@/components/infeworks/AdminUI";

const TITLE = "Projects — Infeworks Admin";
const DESC = "Internal management of Infeworks project records, classification, and publication status.";

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

type Project = {
  id: string;
  slug: string;
  classification: string;
  status: string;
  internal_notes: string | null;
  created_at: string;
};

const CLASSIFICATIONS = ["public", "internal", "study"];

function AdminProjects() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [classification, setClassification] = useState("internal");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,slug,classification,status,internal_notes,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
    void qc.invalidateQueries({ queryKey: ["admin", "summary"] });
  };

  const createProject = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("projects").insert({
        slug: slug.trim(),
        classification,
        internal_notes: notes.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setOpen(false);
      setSlug("");
      setNotes("");
      setClassification("internal");
      setFormError(null);
      invalidate();
    },
    onError: (e: unknown) => setFormError(e instanceof Error ? e.message : "Could not create project."),
  });

  const toggleStatus = useMutation({
    mutationFn: async (project: Project) => {
      const next = project.status === "published" ? "draft" : "published";
      const { error } = await supabase.from("projects").update({ status: next }).eq("id", project.id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AdminPageHeader
        eyebrow="Records"
        title="Projects"
        description="Every project record, its classification, and publication state. Study records cannot be published."
        action={
          <AdminButton variant="solid" onClick={() => setOpen(true)}>
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Create Project
          </AdminButton>
        }
      />

      <AdminTableShell>
        <thead>
          <tr>
            <Th>Slug</Th>
            <Th>Classification</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-sm">Loading…</td>
            </tr>
          ) : (projects?.length ?? 0) === 0 ? (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
                No project records yet.
              </td>
            </tr>
          ) : (
            projects!.map((project) => (
              <tr key={project.id}>
                <Td className="font-medium">{project.slug}</Td>
                <Td className="capitalize">{project.classification}</Td>
                <Td>
                  <StatusPill tone={project.status === "published" ? "success" : "warning"}>
                    {project.status}
                  </StatusPill>
                </Td>
                <Td>
                  <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/admin/projects/$projectId"
                    params={{ projectId: project.id }}
                    className="inline-flex items-center gap-2 border px-4 py-2 text-xs font-semibold tracking-wide uppercase"
                    style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-primary)" }}
                  >
                    <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Edit
                  </Link>
                  {project.classification === "study" ? (
                    <span className="text-xs" style={{ color: "var(--iw-text-secondary)" }}>
                      Publication blocked (study)
                    </span>
                  ) : (
                    <AdminButton
                      variant={project.status === "published" ? "outline" : "solid"}
                      disabled={toggleStatus.isPending}
                      onClick={() => toggleStatus.mutate(project)}
                    >
                      {project.status === "published" ? "Unpublish" : "Publish"}
                    </AdminButton>
                  )}
                  </div>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTableShell>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!slug.trim()) {
                setFormError("Slug is required.");
                return;
              }
              createProject.mutate();
            }}
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg border p-8"
            style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
          >
            <div className="flex items-start justify-between">
              <h2 className="display-md text-2xl">Create Project</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label htmlFor="p-slug" className="label-mono block" style={{ color: "var(--iw-text-secondary)" }}>
                  Slug
                </label>
                <input
                  id="p-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="mt-2 w-full border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                />
              </div>

              <div>
                <label htmlFor="p-class" className="label-mono block" style={{ color: "var(--iw-text-secondary)" }}>
                  Classification
                </label>
                <select
                  id="p-class"
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                  className="mt-2 w-full border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  {CLASSIFICATIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="p-notes" className="label-mono block" style={{ color: "var(--iw-text-secondary)" }}>
                  Internal notes
                </label>
                <textarea
                  id="p-notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 w-full border bg-transparent px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]"
                  style={{ borderColor: "var(--iw-border)" }}
                />
              </div>

              {formError ? (
                <p role="alert" className="border-s-2 ps-3 text-sm" style={{ borderColor: "var(--iw-error)", color: "var(--iw-error)" }}>
                  {formError}
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <AdminButton onClick={() => setOpen(false)}>Cancel</AdminButton>
              <AdminButton type="submit" variant="solid" disabled={createProject.isPending}>
                {createProject.isPending ? "Creating…" : "Create"}
              </AdminButton>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
