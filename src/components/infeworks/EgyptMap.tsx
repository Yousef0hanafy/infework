import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import { Fragment, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export type MapMarker = {
  id?: string;
  lat: number;
  lng: number;
  /** Governorate / city level only — never a precise site address. */
  label?: string | null;
  sublabel?: string | null;
  active?: boolean;
};

const DARK_TILES =
  "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png";
const DARK_LABELS =
  "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png";

function ViewSync({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [map, center[0], center[1], zoom]);
  return null;
}

export default function EgyptMap({
  markers = [],
  center = [26.8206, 30.8025],
  zoom = 5,
  onSelect,
}: {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  onSelect?: (id: string) => void;
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "var(--iw-dark-bg)",
      }}
      attributionControl={false}
    >
      <ViewSync center={center} zoom={zoom} />
      <TileLayer url={DARK_TILES} />
      <TileLayer url={DARK_LABELS} opacity={0.55} />

      {markers.map((m, i) => {
        const key = m.id ?? `${m.lat}-${m.lng}-${i}`;
        const colour = m.active === false ? "#8fa3c0" : "#00c8d5";
        return (
          <Fragment key={key}>
            {/* glow halo */}
            <CircleMarker
              center={[m.lat, m.lng]}
              radius={16}
              interactive={false}
              pathOptions={{
                stroke: false,
                fillColor: colour,
                fillOpacity: 0.14,
              }}
            />
            <CircleMarker
              center={[m.lat, m.lng]}
              radius={7}
              pathOptions={{
                color: colour,
                weight: 2,
                fillColor: "#0b1628",
                fillOpacity: 1,
              }}
              eventHandlers={{
                click: () => {
                  if (m.id && onSelect) onSelect(m.id);
                },
              }}
            >
              {m.label ? (
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <span style={{ fontWeight: 600 }}>{m.label}</span>
                  {m.sublabel ? (
                    <>
                      <br />
                      <span style={{ opacity: 0.75 }}>{m.sublabel}</span>
                    </>
                  ) : null}
                </Tooltip>
              ) : null}
            </CircleMarker>
          </Fragment>
        );
      })}
    </MapContainer>
  );
}
