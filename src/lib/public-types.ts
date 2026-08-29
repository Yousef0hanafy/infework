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

export type PublicMedia = {
  id: string;
  url: string;
  alt: string | null;
};

export type PublicProjectDetail = {
  project: PublicProject;
  location: PublicLocation | null;
  claims: PublicClaim[];
  media: PublicMedia[];
};

export type PublicCapability = {
  id: string;
  slug: string;
  en_name: string;
  ar_name: string;
};

export type SiteSettings = Record<string, string>;
