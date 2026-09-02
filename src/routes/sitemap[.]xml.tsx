import { createFileRoute } from "@tanstack/react-router";
import { SECTORS } from "@/lib/sectors";
import { PROJECT_META } from "@/lib/project-meta";

const BASE_URL = "https://infeworks.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const locales = ["en", "ar"];

        type PagePath = {
          path: string;
          priority: string;
          changefreq: "daily" | "weekly" | "monthly";
        };

        const pages: PagePath[] = [
          { path: "", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.8", changefreq: "monthly" },
          { path: "/what-we-do", priority: "0.9", changefreq: "weekly" },
          { path: "/work", priority: "0.9", changefreq: "weekly" },
          { path: "/contact", priority: "0.9", changefreq: "monthly" },
          { path: "/privacy", priority: "0.3", changefreq: "monthly" },
        ];

        // Sector pages
        for (const sector of SECTORS) {
          pages.push({
            path: `/what-we-do/${sector.slug}`,
            priority: "0.85",
            changefreq: "monthly",
          });
        }

        // Flagship projects
        for (const slug of Object.keys(PROJECT_META)) {
          pages.push({
            path: `/work/${slug}`,
            priority: "0.8",
            changefreq: "monthly",
          });
        }

        const urlEntries: string[] = [];
        for (const loc of locales) {
          for (const page of pages) {
            const currentUrl = `${BASE_URL}/${loc}${page.path}`;
            const enUrl = `${BASE_URL}/en${page.path}`;
            const arUrl = `${BASE_URL}/ar${page.path}`;

            urlEntries.push(
              `  <url>\n` +
              `    <loc>${currentUrl}</loc>\n` +
              `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n` +
              `    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}"/>\n` +
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>\n` +
              `    <changefreq>${page.changefreq}</changefreq>\n` +
              `    <priority>${page.priority}</priority>\n` +
              `  </url>`
            );
          }
        }

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urlEntries,
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
