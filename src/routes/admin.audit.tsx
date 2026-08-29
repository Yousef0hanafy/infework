import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  AdminPageHeader,
  AdminTableShell,
  StatusPill,
  Td,
  Th,
} from "@/components/infeworks/AdminUI";

const TITLE = "Audit Log — Infeworks Admin";
const DESC = "Read-only record of internal administrative actions taken on Infeworks project data.";

export const Route = createFileRoute("/admin/audit")({
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
  component: AdminAudit,
});

type AuditEvent = {
  id: string;
  action: string;
  target_table: string;
  target_id: string | null;
  actor_email: string | null;
  detail: string | null;
  created_at: string;
};

function AdminAudit() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "audit"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("audit_events")
        .select("id,action,target_table,target_id,actor_email,detail,created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (rows ?? []) as AuditEvent[];
    },
  });

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AdminPageHeader
        eyebrow="Traceability"
        title="Audit Log"
        description="The 200 most recent administrative actions. This record is append-only and cannot be edited."
      />

      <AdminTableShell>
        <thead>
          <tr>
            <Th>Timestamp</Th>
            <Th>Action</Th>
            <Th>Table</Th>
            <Th>Actor</Th>
            <Th>Detail</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-sm">
                Loading…
              </td>
            </tr>
          ) : (data?.length ?? 0) === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
                No administrative actions recorded yet.
              </td>
            </tr>
          ) : (
            data!.map((event) => (
              <tr key={event.id}>
                <Td className="whitespace-nowrap font-mono text-xs">
                  {new Date(event.created_at).toISOString().slice(0, 19).replace("T", " ")}
                </Td>
                <Td>
                  <StatusPill tone={event.action.startsWith("delete") ? "warning" : "neutral"}>
                    {event.action}
                  </StatusPill>
                </Td>
                <Td className="font-mono text-xs">{event.target_table}</Td>
                <Td className="text-xs">
                  <span style={{ color: "var(--iw-text-secondary)" }}>{event.actor_email ?? "—"}</span>
                </Td>
                <Td className="max-w-[320px] text-xs">
                  <span style={{ color: "var(--iw-text-secondary)" }}>{event.detail ?? "—"}</span>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTableShell>
    </div>
  );
}
