// Infeworks — shared public data shapes (client-safe)

export type PublicProject = {
  project_id: string;
  slug: string;
  locale: string;
  title: string;
  challenge: string | null;
  outcome: string | null;
  created_at: string | null;
  capability_slugs: string[];
  location: PublicLocation | null;
  cover_url: string | null;
  featured?: boolean;
  catalogue_snapshot_date?: string;
};

export type PublicLocation = {
  lat: number;
  lng: number;
  display_name: string | null;
};

export type PublicClaim = {
  id: string;
  content: string;
  locale: string;
};

export type PublicProjectFacts = {
  client: string;
  consultant: string;
  scope: string;
  capacity: string;
  year: string;
  region: string;
};

export type PublicMedia = {
  id: string;
  url: string;
  alt: string | null;
  media_type: "photo" | "schema";
  mime_type: string | null;
};

export type SchematicStep = {
  id: string;
  label_en: string;
  label_ar: string;
  desc_en?: string;
  desc_ar?: string;
};

export type PublicProjectDetail = {
  project: PublicProject;
  location: PublicLocation | null;
  claims: PublicClaim[];
  media: PublicMedia[];
  facts: PublicProjectFacts | null;
  schema: PublicMedia | null;
  schematic_steps?: SchematicStep[] | undefined;
};

export type PublicCapability = {
  id: string;
  slug: string;
  en_name: string;
  ar_name: string;
};

export type SiteSettings = Record<string, string>;
