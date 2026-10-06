import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminButton, AdminCard, StatusPill } from "@/components/infeworks/AdminUI";
import { FormNotice, TextAreaField, TextField } from "@/components/infeworks/AdminFields";
import { logAudit } from "@/lib/audit";
import { type Profile } from "./types";

function ProfileEditor({ projectId, locale }: { projectId: string; locale: "en" | "ar" }) {
  const qc = useQueryClient();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const key = ["admin", "profile", projectId, locale] as const;

  const { data: profile } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("public_project_profiles")
        .select("id,project_id,locale,title,challenge,outcome")
        .eq("project_id", projectId)
        .eq("locale", locale)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as Profile | null;
    },
  });

  const [title, setTitle] = useState("");
  const [challenge, setChallenge] = useState("");
  const [outcome, setOutcome] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setTitle(profile.title ?? "");
      setChallenge(profile.challenge ?? "");
      setOutcome(profile.outcome ?? "");
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: async () => {
      const t = title.trim();
      if (!t) throw new Error("Title is required.");
      const c = challenge.trim() || null;
      const o = outcome.trim() || null;

      if (profile?.id) {
        const { error: err } = await supabase
          .from("public_project_profiles")
          .update({ title: t, challenge: c, outcome: o })
          .eq("id", profile.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("public_project_profiles").insert({
          project_id: projectId,
          locale,
          title: t,
          challenge: c,
          outcome: o,
        });
        if (err) throw err;
      }

      await logAudit({
        action: "update_profile",
        targetTable: "public_project_profiles",
        targetId: profile?.id ?? projectId,
        detail: `locale=${locale}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success(`${locale.toUpperCase()} narrative profile saved.`);
      void qc.invalidateQueries({ queryKey: key });
      void qc.invalidateQueries({ queryKey: ["admin", "profiles", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "project", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Failed to save profile.";
      setError(msg);
      toast.error(msg);
    },
  });

  return (
    <AdminCard>
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="label-mono text-xs" style={{ color: "var(--iw-text-secondary)" }}>
            {locale === "en" ? "English (LTR)" : "العربية (RTL)"}
          </span>
          <h2 className="display-md mt-1 text-xl">
            {locale === "en" ? "Narrative Profile" : "الملف السردي"}
          </h2>
        </div>
        <StatusPill tone={profile ? "neutral" : "muted"}>
          {profile ? "saved" : "missing"}
        </StatusPill>
      </div>

      <div className="mt-6 space-y-6">
        <TextField
          id={`pf-title-${locale}`}
          label="Title"
          value={title}
          onChange={setTitle}
          dir={dir}
        />
        <TextAreaField
          id={`pf-challenge-${locale}`}
          label="The challenge"
          value={challenge}
          onChange={setChallenge}
          rows={4}
          dir={dir}
        />
        <TextAreaField
          id={`pf-outcome-${locale}`}
          label="Outcome"
          value={outcome}
          onChange={setOutcome}
          rows={4}
          dir={dir}
        />
        {error ? <FormNotice tone="error">{error}</FormNotice> : null}
        {saved && !error ? <FormNotice tone="success">Profile saved.</FormNotice> : null}
      </div>
      <div className="mt-8 flex justify-end">
        <AdminButton
          variant="solid"
          disabled={save.isPending || !title.trim()}
          onClick={() => save.mutate()}
        >
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {save.isPending ? "Saving…" : "Save profile"}
        </AdminButton>
      </div>
    </AdminCard>
  );
}

export function StoryTab({ projectId }: { projectId: string }) {
  return (
    <div className="space-y-10">
      <ProfileEditor projectId={projectId} locale="en" />
      <ProfileEditor projectId={projectId} locale="ar" />
    </div>
  );
}
