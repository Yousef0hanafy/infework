import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building, Eye, Mail, Phone, X } from "lucide-react";
import { toast } from "sonner";
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

type ParsedLeadMessage = {
  meta: Record<string, string>;
  cleanMessage: string;
};

function parseLeadMessage(rawMessage: string): ParsedLeadMessage {
  const meta: Record<string, string> = {};
  if (!rawMessage) return { meta, cleanMessage: "" };

  const parts = rawMessage.split("\n\n");
  const headerLine = parts[0] ?? "";
  if (parts.length > 1 && headerLine.includes("[") && headerLine.includes("]")) {
    const regex = /\[([A-Za-z\s/]+):\s*([^\]]+)\]/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(headerLine)) !== null) {
      if (match[1] && match[2]) {
        meta[match[1].trim().toLowerCase()] = match[2].trim();
      }
    }
    return {
      meta,
      cleanMessage: parts.slice(1).join("\n\n"),
    };
  }

  return { meta, cleanMessage: rawMessage };
}

function AdminLeads() {
  const qc = useQueryClient();
  const [active, setActive] = useState<Lead | null>(null);

  const {
    data: leads,
    isLoading,
    error,
  } = useQuery({
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
      toast.success("Enquiry marked as reviewed.");
      void qc.invalidateQueries({ queryKey: ["admin", "leads"] });
      void qc.invalidateQueries({ queryKey: ["admin", "summary"] });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update lead status.");
    },
  });

  const parsedActive = active ? parseLeadMessage(active.message) : null;

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
              <td
                colSpan={6}
                className="px-5 py-10 text-sm"
                style={{ color: "var(--iw-text-secondary)" }}
              >
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
                  <StatusPill tone={lead.status === "new" ? "neutral" : "muted"}>
                    {lead.status}
                  </StatusPill>
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

      {active && parsedActive ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto border p-8 shadow-2xl"
            style={{ borderColor: "var(--iw-border)", backgroundColor: "var(--iw-surface)" }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <p className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                    Lead Details
                  </p>
                  {parsedActive.meta["type"] ? (
                    <span
                      className="label-mono px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded"
                      style={{
                        backgroundColor: "var(--iw-surface-alt)",
                        color: "var(--iw-accent)",
                      }}
                    >
                      {parsedActive.meta["type"]}
                    </span>
                  ) : null}
                </div>
                <h2 className="display-md mt-2 text-2xl font-bold">
                  {parsedActive.meta["name"] || active.email}
                </h2>
                {parsedActive.meta["org"] ? (
                  <p
                    className="mt-1 flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: "var(--iw-text-secondary)" }}
                  >
                    <Building className="h-3.5 w-3.5" />
                    {parsedActive.meta["org"]}
                  </p>
                ) : null}
              </div>
              <button type="button" onClick={() => setActive(null)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick action buttons */}
            <div
              className="mt-6 flex flex-wrap gap-2 border-y py-4"
              style={{ borderColor: "var(--iw-border)" }}
            >
              <a
                href={`mailto:${active.email}`}
                className="inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-[var(--iw-surface-alt)]"
                style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-primary)" }}
              >
                <Mail className="h-3.5 w-3.5 text-[var(--iw-accent)]" />
                {active.email}
              </a>
              {parsedActive.meta["phone"] ? (
                <a
                  href={`tel:${parsedActive.meta["phone"]}`}
                  className="inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-[var(--iw-surface-alt)]"
                  style={{ borderColor: "var(--iw-border)", color: "var(--iw-text-primary)" }}
                >
                  <Phone className="h-3.5 w-3.5 text-[var(--iw-accent)]" />
                  {parsedActive.meta["phone"]}
                </a>
              ) : null}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                  Audience / Client
                </dt>
                <dd className="mt-1 font-medium capitalize">
                  {parsedActive.meta["audience"] || active.audience_type}
                </dd>
              </div>
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                  Need / Scope
                </dt>
                <dd className="mt-1 font-medium capitalize">
                  {parsedActive.meta["scope"] || active.need_type}
                </dd>
              </div>
              {parsedActive.meta["capacity"] ? (
                <div>
                  <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                    Capacity
                  </dt>
                  <dd className="mt-1 font-medium">{parsedActive.meta["capacity"]}</dd>
                </div>
              ) : null}
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                  Location
                </dt>
                <dd className="mt-1">{active.location_text || "—"}</dd>
              </div>
              <div>
                <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                  Received
                </dt>
                <dd className="mt-1">{new Date(active.created_at).toLocaleString("en-GB")}</dd>
              </div>
              {parsedActive.meta["link"] ? (
                <div>
                  <dt className="label-mono" style={{ color: "var(--iw-text-secondary)" }}>
                    Website / Link
                  </dt>
                  <dd className="mt-1 truncate">
                    <a
                      href={parsedActive.meta["link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--iw-accent)] underline hover:text-[var(--iw-accent-hover)]"
                    >
                      {parsedActive.meta["link"]}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-6">
              <p className="label-mono mb-2" style={{ color: "var(--iw-text-secondary)" }}>
                Message
              </p>
              <p
                className="body-reading whitespace-pre-wrap border-s-2 ps-4 text-sm py-2"
                style={{
                  borderColor: "var(--iw-accent)",
                  backgroundColor: "var(--iw-surface-alt)",
                }}
              >
                {parsedActive.cleanMessage || "No message provided."}
              </p>
            </div>

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
