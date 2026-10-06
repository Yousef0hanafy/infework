import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Link2, Plus, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminButton, AdminCard } from "@/components/infeworks/AdminUI";
import {
  FormNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/infeworks/AdminFields";
import { logAudit } from "@/lib/audit";
import { type Claim, type Evidence } from "./types";

export function ClaimsTab({ projectId }: { projectId: string }) {
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

  const addClaim = useMutation({
    mutationFn: async () => {
      const trimmed = content.trim();
      if (!trimmed) throw new Error("Claim content cannot be empty.");

      const { data, error: err } = await supabase
        .from("claims")
        .insert({ project_id: projectId, locale, content: trimmed })
        .select("id")
        .single();
      if (err) throw err;

      await logAudit({
        action: "create_claim",
        targetTable: "claims",
        targetId: data.id,
        detail: `locale=${locale}`,
      });
    },
    onSuccess: () => {
      setContent("");
      setError(null);
      toast.success("Claim added.");
      void qc.invalidateQueries({ queryKey: claimsKey });
      void qc.invalidateQueries({ queryKey: ["admin", "counts", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "project", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Failed to add claim.";
      setError(msg);
      toast.error(msg);
    },
  });

  const removeClaim = useMutation({
    mutationFn: async (claimId: string) => {
      const { error: err } = await supabase.from("claims").delete().eq("id", claimId);
      if (err) throw err;

      await logAudit({
        action: "delete_claim",
        targetTable: "claims",
        targetId: claimId,
      });
    },
    onSuccess: () => {
      toast.success("Claim deleted.");
      void qc.invalidateQueries({ queryKey: claimsKey });
      void qc.invalidateQueries({ queryKey: ["admin", "counts", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "project", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      toast.error(e instanceof Error ? e.message : "Failed to delete claim.");
    },
  });

  return (
    <div className="space-y-10">
      <AdminCard>
        <h2 className="display-md text-xl">Verified Claims & Highlights</h2>
        <p className="body-reading mt-2 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
          Technical assertions verified by handover certificates, KPIs, or audit evidence.
        </p>

        <div className="mt-8 space-y-4">
          <SelectField
            id="c-locale"
            label="Claim language"
            value={locale}
            onChange={setLocale}
            options={[
              { value: "en", label: "English" },
              { value: "ar", label: "Arabic" },
            ]}
          />
          <TextAreaField
            id="c-content"
            label="Verified claim text"
            value={content}
            onChange={setContent}
            rows={3}
            dir={locale === "ar" ? "rtl" : "ltr"}
            placeholder={
              locale === "en"
                ? "e.g. 100% biological oxygen demand reduction achieved within 60 days of commissioning."
                : "مثال: تم خفض متطلبات الأكسجين البيولوجي بنسبة 100% خلال 60 يوماً من بدء التشغيل."
            }
          />
          {error ? <FormNotice tone="error">{error}</FormNotice> : null}
          <div className="flex justify-end">
            <AdminButton
              variant="solid"
              disabled={addClaim.isPending || !content.trim()}
              onClick={() => addClaim.mutate()}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              Add verified claim
            </AdminButton>
          </div>
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="display-md text-xl">Active Claims & Audit Proof</h2>
        {claims && claims.length > 0 ? (
          <div className="mt-6 space-y-6">
            {claims.map((claim) => {
              const claimEvidence = (evidence ?? []).filter((e) => e.claim_id === claim.id);
              return (
                <div
                  key={claim.id}
                  className="border p-5"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span
                        className="label-mono text-xs uppercase"
                        style={{ color: "var(--iw-accent)" }}
                      >
                        {claim.locale}
                      </span>
                      <p
                        className="text-sm font-medium"
                        dir={claim.locale === "ar" ? "rtl" : "ltr"}
                      >
                        {claim.content}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={removeClaim.isPending}
                      onClick={() => removeClaim.mutate(claim.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete claim"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Evidence list for this claim */}
                  <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--iw-border)" }}>
                    <EvidenceList projectId={projectId} claimId={claim.id} items={claimEvidence} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            No verified claims registered yet. Add at least one to complete the publication
            checklist.
          </p>
        )}
      </AdminCard>
    </div>
  );
}

function EvidenceList({
  projectId,
  claimId,
  items,
}: {
  projectId: string;
  claimId: string;
  items: Evidence[];
}) {
  const qc = useQueryClient();
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);

  const add = useMutation({
    mutationFn: async () => {
      const l = link.trim() || null;
      const d = desc.trim() || null;
      if (!l && !d) throw new Error("Provide either a reference link or description.");

      const { data, error: err } = await supabase
        .from("evidence")
        .insert({ claim_id: claimId, internal_link: l, internal_description: d })
        .select("id")
        .single();
      if (err) throw err;

      await logAudit({
        action: "create_evidence",
        targetTable: "evidence",
        targetId: data.id,
      });
    },
    onSuccess: () => {
      setLink("");
      setDesc("");
      setError(null);
      toast.success("Audit evidence attached.");
      void qc.invalidateQueries({ queryKey: ["admin", "evidence", projectId] });
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Failed to add evidence.";
      setError(msg);
      toast.error(msg);
    },
  });

  const remove = useMutation({
    mutationFn: async (evidenceId: string) => {
      const { error: err } = await supabase.from("evidence").delete().eq("id", evidenceId);
      if (err) throw err;

      await logAudit({
        action: "delete_evidence",
        targetTable: "evidence",
        targetId: evidenceId,
      });
    },
    onSuccess: () => {
      toast.success("Evidence detached.");
      void qc.invalidateQueries({ queryKey: ["admin", "evidence", projectId] });
    },
    onError: (e: unknown) => {
      toast.error(e instanceof Error ? e.message : "Failed to delete evidence.");
    },
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Link2 className="h-3.5 w-3.5" style={{ color: "var(--iw-text-secondary)" }} />
        <span className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
          Attached verification proof ({items.length})
        </span>
      </div>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((ev) => (
            <li
              key={ev.id}
              className="flex items-center justify-between gap-3 rounded border p-2 text-xs"
              style={{ borderColor: "var(--iw-border)", backgroundColor: "rgba(0,0,0,0.15)" }}
            >
              <div className="flex items-center gap-2 truncate">
                {ev.internal_link ? (
                  <a
                    href={ev.internal_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[var(--iw-accent)] hover:underline truncate"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{ev.internal_link}</span>
                  </a>
                ) : null}
                {ev.internal_description ? (
                  <span className="text-[var(--iw-text-secondary)] truncate">
                    {ev.internal_description}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => remove.mutate(ev.id)}
                className="text-neutral-500 hover:text-red-400 p-1"
                title="Detach proof"
              >
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add new proof */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://... document / certificate URL"
          className="w-full border bg-transparent px-3 py-1.5 text-xs outline-none focus:border-[var(--iw-accent)]"
          style={{ borderColor: "var(--iw-border)" }}
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Brief audit note / certificate number"
          className="w-full border bg-transparent px-3 py-1.5 text-xs outline-none focus:border-[var(--iw-accent)]"
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
