import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard } from "@/components/infeworks/AdminUI";
import { getProjectMeta } from "@/lib/project-meta";
import { type Project } from "./types";

export function PreviewTab({ project }: { project: Project }) {
  const meta = getProjectMeta(project.slug);

  const { data: profiles } = useQuery({
    queryKey: ["admin", "profiles", project.id],
    staleTime: 60 * 1000,
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

  const en = profiles?.find((r) => r.locale === "en");
  const ar = profiles?.find((r) => r.locale === "ar");
  const resolvedCover = meta?.cover || null;

  return (
    <div className="space-y-8">
      <AdminCard>
        <h2 className="display-md text-xl">Overview & Resolved Assets</h2>
        <p className="body-reading mt-2 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
          How public data, facts, and cover image resolve for this project.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
                <div
                  className="flex h-full w-full items-center justify-center text-xs"
                  style={{ color: "var(--iw-text-secondary)" }}
                >
                  No cover available
                </div>
              )}
            </div>
            <p
              className="mt-2 text-xs font-mono truncate"
              style={{ color: "var(--iw-text-secondary)" }}
            >
              {meta?.cover ? "Static Catalog (project-meta.ts)" : "None"}
            </p>
          </div>

          <div className="border p-4" style={{ borderColor: "var(--iw-border)" }}>
            <p className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
              Key Technical Facts
            </p>
            <div className="mt-3 space-y-1.5 text-xs">
              <p>
                <strong>Client:</strong> {project.client_en || meta?.client?.en || "—"}
              </p>
              <p>
                <strong>Capacity:</strong> {project.capacity_en || meta?.capacity?.en || "—"}
              </p>
              <p>
                <strong>Year:</strong> {project.year || meta?.year || "—"}
              </p>
              <p>
                <strong>Region:</strong> {project.region_en || meta?.region?.en || "—"}
              </p>
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
