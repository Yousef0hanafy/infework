import { createServerFn } from "@tanstack/react-start";
import type {
  PublicCapability,
  PublicProject,
  PublicProjectDetail,
  SiteSettings,
} from "./public-types";

export const getPublicProjects = createServerFn({ method: "GET" })
  .inputValidator((input: { locale: string }) => input)
  .handler(async ({ data }): Promise<PublicProject[]> => {
    const { fetchPublicProjects } = await import("./public-data.server");
    return fetchPublicProjects(data.locale);
  });

export const getPublicProjectBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string; locale: string }) => input)
  .handler(async ({ data }): Promise<PublicProjectDetail | null> => {
    const { fetchPublicProjectBySlug } = await import("./public-data.server");
    return fetchPublicProjectBySlug(data.slug, data.locale);
  });

export const getCapabilities = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicCapability[]> => {
    const { fetchCapabilities } = await import("./public-data.server");
    return fetchCapabilities();
  },
);

export const getSiteSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings> => {
    const { fetchSiteSettings } = await import("./public-data.server");
    return fetchSiteSettings();
  },
);
