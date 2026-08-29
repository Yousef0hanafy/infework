import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  AdminButton,
  AdminPageHeader,
  AdminTableShell,
  StatusPill,
  Td,
  Th,
} from "@/components/infeworks/AdminUI";

const TITLE = "Leads Inbox — Infeworks Admin";
const DESC = "Internal inbox of contact enquiries submitted through the Infeworks website.";

export const Route = createFileRoute("/admin/leads")({
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
  component: AdminLeads,
});

type Lead = {
  id: string;
  audience_type: string;
  need_type: string;
  email: string;
  message: string;
  location_text: string | null;
  status: string;
  created_at: string;
};

function AdminLeads() {
  const qc = useQueryClient();
  const [active, setActive] = useState<Lead | null>(null);

  const { data: leads, isLoading, error } = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("leads")
        .select("id,audience_type,need_type,email,message,location_text,status,created_at")
        .order("created_at", { ascending: false });
      if (err) throw err;
      return (data ?? []) as Lead[];
    },
  });

  const markSeen = useMutation({
    mutationFn: async (id: string) => {
      const { error: err } = await supabase.from("leads").update({ status: "seen" }).eq("id", id);
      if (err) throw err;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin", "leads"] });
      void qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
  });

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <AdminPageHeader
        eyebrow="Inbox"
        title="Leads"
        description="Enquiries submitted through the public contact form."
      />

      {error ? (
        <p className="mt-8 text-sm" style={{ color: "var(--iw-error)" }}>
          Could not load leads.
        </p>
      ) : null}

      <AdminTableShell>
        <thead>
          <tr>
            <Th>Audience</Th>
            <Th>Need</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <Td className="text-sm">Loading…</Td>
              <Td>{null}</Td>
              <Td>{null}</Td>
              <Td>{null}</Td>
              <Td>{null}</Td>
              <Td>{null}</Td>
            </tr>
          ) : (leads?.length ?? 0) === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
                No leads yet.
              </td>
            </tr>
          ) : (
            leads!.map((lead) => (
              <tr key={lead.id}>
                <Td className="capitalize">{lead.audience_type}</Td>
                <Td className="capitalize">{lead.need_type}</Td>
                <Td>{lead.email}</Td>
                <Td>
                  <StatusPill tone={lead.status === "new" ? "neutral" : "muted"}>{lead.status}</StatusPill>
                </Td>
                <Td>{new Date(lead.created_at).toLocaleDateString("en-GB")}</Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <AdminButton onClick={() => setActive(lead)}>
                      <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                      View
                    </AdminButton>
                    {lead.status === "new" ? (
                      <AdminButton
                        variant="solid"
                        disabled={markSeen.isPending}
                        onClick={() => markSeen.mutate(lead.id)}
                      >
                        Mark as Seen
                      </AdminButton>
                    ) : null}
                  </div>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTableShell>

      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-xl border p-8"
            style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                  Lead message
                </p>
                <h2 className="display-md mt-2 text-2xl">{active.email}</h2>
              </div>
              <button type="button" onClick={() => setActive(null)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>Audience</dt>
                <dd className="mt-1 capitalize">{active.audience_type}</dd>
              </div>
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>Need</dt>
                <dd className="mt-1 capitalize">{active.need_type}</dd>
              </div>
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>Location</dt>
                <dd className="mt-1">{active.location_text || "—"}</dd>
              </div>
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>Received</dt>
                <dd className="mt-1">{new Date(active.created_at).toLocaleString("en-GB")}</dd>
              </div>
            </dl>

            <p
              className="body-reading mt-6 whitespace-pre-wrap border-s-2 ps-4 text-sm"
              style={{ borderColor: "var(--iw-accent)" }}
            >
              {active.message}
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <AdminButton onClick={() => setActive(null)}>Close</AdminButton>
              {active.status === "new" ? (
                <AdminButton
                  variant="solid"
                  onClick={() => {
                    markSeen.mutate(active.id);
                    setActive(null);
                  }}
                >
                  Mark as Seen
                </AdminButton>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
