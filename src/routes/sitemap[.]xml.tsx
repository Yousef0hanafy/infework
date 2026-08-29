import { createFileRoute } from "@tanstack/react-router";
import { SECTORS } from "@/lib/sectors";
import { PROJECT_META } from "@/lib/project-meta";

const BASE_URL = "https://infeworks.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const locales = ["en", "ar"];

        type SitemapEntry = {
          loc: string;
          priority: string;
          changefreq: "daily" | "weekly" | "monthly";
        };

        const entries: SitemapEntry[] = [];

        // Root locales
        for (const loc of locales) {
          entries.push({
            loc: `${BASE_URL}/${loc}`,
            priority: "1.0",
            changefreq: "weekly",
          });
          entries.push({
            loc: `${BASE_URL}/${loc}/about`,
            priority: "0.8",
            changefreq: "monthly",
          });
          entries.push({
            loc: `${BASE_URL}/${loc}/what-we-do`,
            priority: "0.9",
            changefreq: "weekly",
          });
          entries.push({
            loc: `${BASE_URL}/${loc}/work`,
            priority: "0.9",
            changefreq: "weekly",
          });
          entries.push({
            loc: `${BASE_URL}/${loc}/contact`,
            priority: "0.9",
            changefreq: "monthly",
          });
          entries.push({
            loc: `${BASE_URL}/${loc}/privacy`,
            priority: "0.3",
            changefreq: "monthly",
          });

          // Sector pages
          for (const sector of SECTORS) {
            entries.push({
              loc: `${BASE_URL}/${loc}/what-we-do/${sector.slug}`,
              priority: "0.85",
              changefreq: "monthly",
            });
          }

          // Flagship projects
          for (const slug of Object.keys(PROJECT_META)) {
            entries.push({
              loc: `${BASE_URL}/${loc}/work/${slug}`,
              priority: "0.8",
              changefreq: "monthly",
            });
          }
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map(
            (e) =>
              `  <url>\n    <loc>${e.loc}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
