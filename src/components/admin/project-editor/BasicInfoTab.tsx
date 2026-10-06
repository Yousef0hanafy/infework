import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Image as ImageIcon, Save, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminButton, AdminCard, StatusPill } from "@/components/infeworks/AdminUI";
import {
  FormNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/infeworks/AdminFields";
import { logAudit } from "@/lib/audit";
import { getProjectMeta } from "@/lib/project-meta";
import { type Project, BUCKET } from "./types";

export function BasicInfoTab({ project }: { project: Project }) {
  const router = useRouter();
  const qc = useQueryClient();
  const [slug, setSlug] = useState(project.slug);
  const [classification, setClassification] = useState(project.classification);
  const [notes, setNotes] = useState(project.internal_notes ?? "");
  const [featured, setFeatured] = useState(project.featured);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Cover image from static catalog
  const meta = useMemo(() => getProjectMeta(project.slug), [project.slug]);
  const coverUrl = meta?.cover;
  const totalCatalogPhotos = (meta?.gallery?.length ?? 0) + (meta?.cover ? 1 : 0);

  // Danger Zone delete state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmSlug, setConfirmSlug] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: allCaps } = useQuery({
    queryKey: ["admin", "capabilities"],
    staleTime: 5 * 60 * 1000,
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
      void qc.invalidateQueries({ queryKey: ["admin", "cockpit"] });
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
          mediaPaths = mediaRows
            .map((m: { storage_path: string }) => m.storage_path)
            .filter(Boolean);
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
        detail: `slug=${project.slug}`,
      });
    },
    onSuccess: () => {
      setDeleteOpen(false);
      toast.success(`Project "${project.slug}" permanently deleted.`);
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      void qc.invalidateQueries({ queryKey: ["admin", "cockpit"] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
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
                <StatusPill tone="success">Catalogued</StatusPill>
              </div>
              <p className="body-reading text-xs text-neutral-400 mt-1">
                {totalCatalogPhotos > 0
                  ? `${totalCatalogPhotos} active static photos catalogued for ${project.slug}`
                  : "No static photos catalogued"}
              </p>
              <p className="font-mono text-[11px] text-neutral-500 mt-0.5 truncate">
                {coverUrl ? coverUrl : "Default fallback"}
              </p>
            </div>
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="display-md text-xl">Project Identity & URL</h2>
        <div className="mt-6">
          <TextField
            id="m-slug"
            label="Slug (Public URL Identifier)"
            value={slug}
            onChange={setSlug}
          />
          <p className="mt-1.5 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            URL identifier. Use lowercase letters, numbers, and hyphens (e.g.{" "}
            <code>sadat-city-ro</code>). Public live page:{" "}
            <code className="text-white">/work/{slug}</code>
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
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--iw-text-secondary)", paddingLeft: "1.75rem" }}
          >
            Featured projects appear at the top of the portfolio grid on both the Homepage and the
            Work index.
          </p>
        </div>

        <div className="mt-8">
          <label className="label-mono block" style={{ color: "var(--iw-text-secondary)" }}>
            Assigned Sectors / Capabilities
          </label>
          <p className="mt-1 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            Select which sectors this project belongs to. Used for public site filtering and
            schematic fallbacks.
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
              Permanently delete this project. This removes all uploaded photos and custom
              schematics from storage, translation profiles, claims, evidence, location coordinates,
              and unlinks capabilities. This action is irreversible.
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
              This action <strong>CANNOT</strong> be undone. It will permanently purge all assets
              and database rows associated with this project:
            </p>
            <ul className="mt-2.5 list-disc space-y-1 pl-5 text-xs text-[var(--iw-text-secondary)]">
              <li>Project photos & custom engineering schematics from storage</li>
              <li>Bilingual profiles, challenges, and outcomes</li>
              <li>Engineering claims, technical facts & evidence</li>
              <li>Public map coordinates and sector capabilities</li>
            </ul>

            <div className="mt-6 border border-red-900/40 bg-red-950/20 p-4">
              <label
                htmlFor="confirm-slug-input"
                className="block text-xs text-[var(--iw-text-secondary)]"
              >
                To confirm, type the project slug:{" "}
                <strong className="font-mono text-red-300">{project.slug}</strong>
              </label>
              <input
                id="confirm-slug-input"
                type="text"
                value={confirmSlug}
                onChange={(e) => setConfirmSlug(e.target.value)}
                placeholder={project.slug}
                className="mt-2 w-full border border-red-900/60 bg-black/60 px-3 py-2 font-mono text-sm text-white outline-none focus:border-red-500"
              />
            </div>

            {deleteError ? <p className="mt-3 text-xs text-red-400">{deleteError}</p> : null}

            <div className="mt-6 flex justify-end gap-3">
              <AdminButton onClick={() => setDeleteOpen(false)}>Cancel</AdminButton>
              <button
                type="button"
                disabled={
                  confirmSlug.trim().toLowerCase() !== project.slug.toLowerCase() ||
                  deleteProject.isPending
                }
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
