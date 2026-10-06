import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminButton, AdminCard } from "@/components/infeworks/AdminUI";
import { FormNotice, TextField } from "@/components/infeworks/AdminFields";
import { logAudit } from "@/lib/audit";
import { getProjectMeta } from "@/lib/project-meta";
import { type Project } from "./types";

export function FactsTab({ project }: { project: Project }) {
  const qc = useQueryClient();
  const [clientEn, setClientEn] = useState(project.client_en ?? "");
  const [clientAr, setClientAr] = useState(project.client_ar ?? "");
  const [consultantEn, setConsultantEn] = useState(project.consultant_en ?? "");
  const [consultantAr, setConsultantAr] = useState(project.consultant_ar ?? "");
  const [scopeEn, setScopeEn] = useState(project.scope_en ?? "");
  const [scopeAr, setScopeAr] = useState(project.scope_ar ?? "");
  const [capacityEn, setCapacityEn] = useState(project.capacity_en ?? "");
  const [capacityAr, setCapacityAr] = useState(project.capacity_ar ?? "");
  const [year, setYear] = useState(project.year ?? "");
  const [regionEn, setRegionEn] = useState(project.region_en ?? "");
  const [regionAr, setRegionAr] = useState(project.region_ar ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const meta = getProjectMeta(project.slug);

  const save = useMutation({
    mutationFn: async () => {
      const { error: err } = await supabase
        .from("projects")
        .update({
          client_en: clientEn.trim() || null,
          client_ar: clientAr.trim() || null,
          consultant_en: consultantEn.trim() || null,
          consultant_ar: consultantAr.trim() || null,
          scope_en: scopeEn.trim() || null,
          scope_ar: scopeAr.trim() || null,
          capacity_en: capacityEn.trim() || null,
          capacity_ar: capacityAr.trim() || null,
          year: year.trim() || null,
          region_en: regionEn.trim() || null,
          region_ar: regionAr.trim() || null,
        })
        .eq("id", project.id);
      if (err) throw err;

      await logAudit({
        action: "update_facts",
        targetTable: "projects",
        targetId: project.id,
        detail: `year=${year} capacity=${capacityEn}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success("Project facts saved.");
      void qc.invalidateQueries({ queryKey: ["admin", "project", project.id] });
      void qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Failed to save facts.";
      setError(msg);
      toast.error(msg);
    },
  });

  return (
    <AdminCard>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="display-md text-xl">Technical & Contract Facts</h2>
          <p className="body-reading mt-1 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
            Bilingual client, consultant, capacity, and region details displayed in the technical
            overview on the live project page.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Client */}
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-client-en"
            label="Client (EN)"
            value={clientEn}
            onChange={setClientEn}
            placeholder={meta?.client?.en ?? "e.g. Construction Authority for Potable Water (CAPW)"}
          />
          <TextField
            id="f-client-ar"
            label="Client (AR)"
            value={clientAr}
            onChange={setClientAr}
            dir="rtl"
            placeholder={meta?.client?.ar ?? "مثال: الجهاز التنفيذي لمياه الشرب والصرف الصحي"}
          />
        </div>

        {/* Consultant */}
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-consultant-en"
            label="Consultant (EN)"
            value={consultantEn}
            onChange={setConsultantEn}
            placeholder={meta?.consultant?.en ?? "e.g. ECG Engineering Consultants Group"}
          />
          <TextField
            id="f-consultant-ar"
            label="Consultant (AR)"
            value={consultantAr}
            onChange={setConsultantAr}
            dir="rtl"
            placeholder={meta?.consultant?.ar ?? "مثال: جماعة المهندسين الاستشاريين"}
          />
        </div>

        {/* Scope of Work */}
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-scope-en"
            label="Scope of Work (EN)"
            value={scopeEn}
            onChange={setScopeEn}
            placeholder={meta?.scope?.en ?? "e.g. Turnkey Electromechanical Contracting"}
          />
          <TextField
            id="f-scope-ar"
            label="Scope of Work (AR)"
            value={scopeAr}
            onChange={setScopeAr}
            dir="rtl"
            placeholder={meta?.scope?.ar ?? "مثال: مقاولات كهروميكانيكية متكاملة"}
          />
        </div>

        {/* Capacity & Year */}
        <div className="grid gap-6 md:grid-cols-3">
          <TextField
            id="f-capacity-en"
            label="Capacity (EN)"
            value={capacityEn}
            onChange={setCapacityEn}
            placeholder={meta?.capacity?.en ?? "e.g. 65,000 m³/day"}
          />
          <TextField
            id="f-capacity-ar"
            label="Capacity (AR)"
            value={capacityAr}
            onChange={setCapacityAr}
            dir="rtl"
            placeholder={meta?.capacity?.ar ?? "مثال: 65,000 م³/يوم"}
          />
          <TextField
            id="f-year"
            label="Execution Year"
            value={year}
            onChange={setYear}
            placeholder={meta?.year ?? "e.g. 2021"}
          />
        </div>

        {/* Region / Governorate */}
        <div className="grid gap-6 md:grid-cols-2">
          <TextField
            id="f-region-en"
            label="Region (EN)"
            value={regionEn}
            onChange={setRegionEn}
            placeholder={meta?.region?.en ?? "e.g. Menofia Governorate"}
          />
          <TextField
            id="f-region-ar"
            label="Region (AR)"
            value={regionAr}
            onChange={setRegionAr}
            dir="rtl"
            placeholder={meta?.region?.ar ?? "مثال: محافظة المنوفية"}
          />
        </div>
      </div>

      <p className="mt-6 text-xs" style={{ color: "var(--iw-text-secondary)" }}>
        * Fallback: If any field is left empty, the public website automatically falls back to
        static data from project-meta.ts (if present).
      </p>

      {error ? (
        <div className="mt-6">
          <FormNotice tone="error">{error}</FormNotice>
        </div>
      ) : null}
      {saved && !error ? (
        <div className="mt-6">
          <FormNotice tone="success">Facts saved successfully.</FormNotice>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <AdminButton variant="solid" disabled={save.isPending} onClick={() => save.mutate()}>
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {save.isPending ? "Saving…" : "Save facts"}
        </AdminButton>
      </div>
    </AdminCard>
  );
}
