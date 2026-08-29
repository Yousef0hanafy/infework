import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPageHeader, AdminTableShell, Td, Th } from "@/components/infeworks/AdminUI";

const TITLE = "Capabilities — Infeworks Admin";
const DESC = "Internal list of Infeworks engineering capabilities used to classify project records.";

export const Route = createFileRoute("/admin/capabilities")({
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
  component: AdminCapabilities,
});

type Capability = { id: string; slug: string; en_name: string; ar_name: string };

function AdminCapabilities() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "capabilities"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("capabilities")
        .select("id,slug,en_name,ar_name")
        .order("en_name");
      if (error) throw error;
      return (rows ?? []) as Capability[];
    },
  });

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AdminPageHeader
        eyebrow="Taxonomy"
        title="Capabilities"
        description="Bilingual capability records used across the public site."
      />

      <AdminTableShell>
        <thead>
          <tr>
            <Th>Slug</Th>
            <Th>English name</Th>
            <Th>Arabic name</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="px-5 py-10 text-sm">Loading…</td>
            </tr>
          ) : (data?.length ?? 0) === 0 ? (
            <tr>
              <td colSpan={3} className="px-5 py-10 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
                No capabilities yet.
              </td>
            </tr>
          ) : (
            data!.map((cap) => (
              <tr key={cap.id}>
                <Td className="font-medium">{cap.slug}</Td>
                <Td>{cap.en_name}</Td>
                <Td>
                  <span style={{ fontFamily: "var(--font-arabic)" }}>{cap.ar_name}</span>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTableShell>
    </div>
  );
}
