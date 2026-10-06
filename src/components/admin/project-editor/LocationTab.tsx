import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminButton, AdminCard, StatusPill } from "@/components/infeworks/AdminUI";
import { FormNotice, TextField } from "@/components/infeworks/AdminFields";
import { logAudit } from "@/lib/audit";
import { type LocationRow, EGYPT_COORDINATE_PRESETS } from "./types";

export function LocationTab({ projectId }: { projectId: string }) {
  const qc = useQueryClient();
  const key = ["admin", "location", projectId] as const;

  const { data: location } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("id,project_id,lat,lng,display_name")
        .eq("project_id", projectId)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as LocationRow | null;
    },
  });

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLat(location ? String(location.lat) : "");
    setLng(location ? String(location.lng) : "");
    setDisplayName(location?.display_name ?? "");
  }, [location]);

  const handlePresetSelect = (presetLabel: string) => {
    const found = EGYPT_COORDINATE_PRESETS.find((p) => p.label === presetLabel);
    if (!found || !found.lat) return;
    setLat(found.lat);
    setLng(found.lng);
    setDisplayName(found.name);
  };

  const save = useMutation({
    mutationFn: async () => {
      const numLat = parseFloat(lat);
      const numLng = parseFloat(lng);
      if (Number.isNaN(numLat) || Number.isNaN(numLng)) {
        throw new Error("Latitude and Longitude must be valid numbers.");
      }
      if (numLat < 21 || numLat > 32 || numLng < 24 || numLng > 37) {
        throw new Error("Coordinates must fall roughly within Egypt (21-32°N, 24-37°E).");
      }

      if (location?.id) {
        const { error: err } = await supabase
          .from("locations")
          .update({
            lat: numLat,
            lng: numLng,
            display_name: displayName.trim() || null,
          })
          .eq("id", location.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("locations").insert({
          project_id: projectId,
          lat: numLat,
          lng: numLng,
          display_name: displayName.trim() || null,
        });
        if (err) throw err;
      }

      await logAudit({
        action: "update_location",
        targetTable: "locations",
        targetId: location?.id ?? projectId,
        detail: `lat=${numLat} lng=${numLng}`,
      });
    },
    onSuccess: () => {
      setError(null);
      setSaved(true);
      toast.success("Location coordinates saved successfully.");
      void qc.invalidateQueries({ queryKey: key });
      void qc.invalidateQueries({ queryKey: ["admin", "counts", projectId] });
      void qc.invalidateQueries({ queryKey: ["admin", "audit"] });
    },
    onError: (e: unknown) => {
      setSaved(false);
      const msg = e instanceof Error ? e.message : "Could not save location.";
      setError(msg);
      toast.error(msg);
    },
  });

  return (
    <AdminCard>
      <div className="flex items-center justify-between gap-4">
        <h2 className="display-md text-xl">Map location</h2>
        <StatusPill tone={location ? "neutral" : "muted"}>
          {location ? "set" : "not set"}
        </StatusPill>
      </div>
      <p className="body-reading mt-3 text-sm" style={{ color: "var(--iw-text-secondary)" }}>
        Coordinates place the project on the public Egypt impact map. Use governorate-level
        precision only.
      </p>

      {/* Preset Selector */}
      <div
        className="mt-6 border p-4"
        style={{ borderColor: "var(--iw-border)", backgroundColor: "rgba(14, 116, 144, 0.04)" }}
      >
        <label
          htmlFor="egypt-presets"
          className="label-mono block text-xs"
          style={{ color: "var(--iw-text-secondary)" }}
        >
          Egypt Governorate & Industrial Hub Presets
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            id="egypt-presets"
            onChange={(e) => handlePresetSelect(e.target.value)}
            defaultValue=""
            className="w-full border bg-transparent px-3 py-2 text-xs outline-none focus:border-[var(--iw-accent)]"
            style={{
              borderColor: "var(--iw-border)",
              color: "var(--iw-text-primary)",
              backgroundColor: "var(--iw-surface)",
            }}
          >
            {EGYPT_COORDINATE_PRESETS.map((p) => (
              <option
                key={p.label}
                value={p.label}
                style={{ backgroundColor: "#111827", color: "#f9fafb" }}
              >
                {p.label}
              </option>
            ))}
          </select>
          <span className="shrink-0 text-[11px] text-[var(--iw-text-secondary)]">
            Auto-fills coordinates & name
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <TextField
          id="loc-lat"
          label="Latitude"
          value={lat}
          onChange={setLat}
          placeholder="30.3644"
        />
        <TextField
          id="loc-lng"
          label="Longitude"
          value={lng}
          onChange={setLng}
          placeholder="30.5087"
        />
        <TextField
          id="loc-name"
          label="Display name"
          value={displayName}
          onChange={setDisplayName}
          placeholder="Sadat City, Monufia"
        />
      </div>

      {error ? (
        <div className="mt-6">
          <FormNotice tone="error">{error}</FormNotice>
        </div>
      ) : null}
      {saved && !error ? (
        <div className="mt-6">
          <FormNotice tone="success">Location saved.</FormNotice>
        </div>
      ) : null}

      <div className="mt-8 flex justify-end">
        <AdminButton variant="solid" disabled={save.isPending} onClick={() => save.mutate()}>
          <Save className="h-3.5 w-3.5" strokeWidth={2} />
          {save.isPending ? "Saving…" : "Save location"}
        </AdminButton>
      </div>
    </AdminCard>
  );
}
