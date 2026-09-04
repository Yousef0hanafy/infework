import { APIProvider, AdvancedMarker, ColorScheme, Map, Pin } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";

export type ProjectLocationMapProps = {
  lat: number;
  lng: number;
  label?: string | null;
  zoom?: number;
  locale?: string;
};

export default function ProjectLocationMap({
  lat,
  lng,
  label,
  zoom = 9,
  locale = "en",
}: ProjectLocationMapProps) {
  const apiKey = (import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string | undefined) || "";

  if (!apiKey) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#0b1628] p-4 text-center text-xs text-[#8fa3c0]">
        <MapPin className="mb-2 h-6 w-6 text-[#00c8d5]" />
        <span className="font-semibold text-white">{label || "Project Location"}</span>
        <span className="mt-1 font-mono text-[10px] text-[#8fa3c0]">
          {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b1628]">
      <APIProvider apiKey={apiKey} language={locale === "ar" ? "ar" : "en"}>
        <Map
          center={{ lat, lng }}
          defaultZoom={zoom}
          zoom={zoom}
          mapId="DEMO_MAP_ID"
          colorScheme={ColorScheme.DARK}
          internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
          style={{ width: "100%", height: "100%" }}
          disableDefaultUI={true}
          zoomControl={true}
          gestureHandling="cooperative"
        >
          <AdvancedMarker
            position={{ lat, lng }}
            title={label ?? "Project Location"}
          >
            <Pin
              background="#00c8d5"
              glyphColor="#0b1628"
              borderColor="#050b14"
              scale={1.1}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {label ? (
        <div className="pointer-events-none absolute bottom-2 left-2 z-10 flex items-center gap-1.5 rounded border border-[#00c8d5]/30 bg-[#0b1628]/90 px-2 py-1 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-[#00c8d5] shadow-[0_0_6px_#00c8d5]" />
          <span className="text-[11px] font-medium tracking-wide text-white">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
