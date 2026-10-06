export type Project = {
  id: string;
  slug: string;
  classification: string;
  status: string;
  featured: boolean;
  internal_notes: string | null;
  client_en: string | null;
  client_ar: string | null;
  consultant_en: string | null;
  consultant_ar: string | null;
  scope_en: string | null;
  scope_ar: string | null;
  capacity_en: string | null;
  capacity_ar: string | null;
  year: string | null;
  region_en: string | null;
  region_ar: string | null;
};

export type Profile = {
  id: string;
  project_id: string;
  locale: string;
  title: string;
  challenge: string | null;
  outcome: string | null;
};

export type Claim = {
  id: string;
  project_id: string;
  locale: string;
  content: string;
};

export type Evidence = {
  id: string;
  claim_id: string;
  internal_link: string | null;
  internal_description: string | null;
};

export type LocationRow = {
  id: string;
  project_id: string;
  lat: number;
  lng: number;
  display_name: string | null;
};

export const BUCKET = "project-media";

export const EGYPT_COORDINATE_PRESETS = [
  { label: "-- Select an Egyptian Governorate / Industrial Hub --", lat: "", lng: "", name: "" },
  {
    label: "Sadat City (Industrial Hub / Menofia)",
    lat: "30.3800",
    lng: "30.5100",
    name: "Sadat City, Menofia, Egypt",
  },
  {
    label: "New Administrative Capital (NAC)",
    lat: "30.0167",
    lng: "31.7500",
    name: "New Administrative Capital, Cairo, Egypt",
  },
  { label: "Cairo Governorate (Centroid)", lat: "30.0444", lng: "31.2357", name: "Cairo, Egypt" },
  {
    label: "6th of October City / Giza",
    lat: "29.9381",
    lng: "30.9142",
    name: "6th of October City, Giza, Egypt",
  },
  {
    label: "10th of Ramadan / Sharqia",
    lat: "30.2986",
    lng: "31.7423",
    name: "10th of Ramadan, Sharqia, Egypt",
  },
  {
    label: "Alexandria / Borg El Arab Industrial Zone",
    lat: "30.9167",
    lng: "29.6667",
    name: "Borg El Arab, Alexandria, Egypt",
  },
  {
    label: "Ain Sokhna / Suez / Red Sea",
    lat: "29.6000",
    lng: "32.3167",
    name: "Ain Sokhna, Suez, Egypt",
  },
  { label: "Port Said / East Port Said", lat: "31.2653", lng: "32.3019", name: "Port Said, Egypt" },
  {
    label: "Toshka / Aswan / Upper Egypt",
    lat: "22.6900",
    lng: "31.7100",
    name: "Toshka, Aswan, Egypt",
  },
  { label: "Beni Suef Industrial Zone", lat: "29.0661", lng: "31.0994", name: "Beni Suef, Egypt" },
  {
    label: "Kafr El Sheikh / Delta Pumping",
    lat: "31.1107",
    lng: "30.9388",
    name: "Kafr El Sheikh, Egypt",
  },
  { label: "Damietta Port / Free Zone", lat: "31.4175", lng: "31.8144", name: "Damietta, Egypt" },
];
