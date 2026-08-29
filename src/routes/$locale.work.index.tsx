import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { getFlagshipProjects } from "@/lib/flagship-projects";
import { getProjectMeta } from "@/lib/project-meta";
import { getCapabilities, getPublicProjects } from "@/lib/public.functions";


const TITLE = "Selected Work — Infeworks";
const DESC =
  "Case studies of water treatment, wastewater, pumping, and irrigation projects delivered by Infeworks in Egypt.";

export const Route = createFileRoute("/$locale/work/")({
  loader: async ({ params }) => {
    const [projects, capabilities] = await Promise.all([
      getPublicProjects({ data: { locale: params.locale } }),
      getCapabilities(),
    ]);
    return { projects, capabilities };
  },
  head: ({ loaderData }) => {
    const count = loaderData?.projects.length ?? 0;
    const description = count > 0 ? `${count} documented projects. ${DESC}` : DESC;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: description },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: WorkIndex,
});

function WorkIndex() {
  const { projects: published, capabilities } = Route.useLoaderData();
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);
  const [active, setActive] = useState("all");
  const projects = published.length > 0 ? published : getFlagshipProjects(locale);

  const filters = useMemo(
    () => [
      { key: "all", label: t("All", "الكل") },
      ...capabilities.map((c) => ({
        key: c.slug,
        label: isAr ? c.ar_name : c.en_name,
      })),
    ],
    [capabilities, isAr],
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.capability_slugs.includes(active)),
    [projects, active],
  );



  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-40">
          <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
            {t("Portfolio", "أعمالنا")}
          </p>
          <h1 className="display-xl mt-8 max-w-4xl text-[clamp(2.25rem,6vw,5rem)]">
            {t("Selected Work", "أعمال مختارة")}
          </h1>
          <p
            className="body-reading mt-8 max-w-2xl text-lg"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {t(
              "Documented projects across water treatment, wastewater, pumping, and irrigation.",
              "مشروعات موثقة في معالجة المياه والصرف الصحي والضخ والري.",
            )}
          </p>
        </div>
      </section>

      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
          {/* Filter bar */}
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b pb-6 sm:flex-wrap sm:overflow-visible"
            style={{ borderColor: "var(--iw-border)" }}
          >
            {filters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  className="label-mono shrink-0 rounded-full border px-4 py-2 text-xs transition-all duration-300 sm:px-5 sm:py-2.5"
                  style={{
                    backgroundColor: isActive
                      ? "var(--iw-text-primary)"
                      : "transparent",
                    borderColor: isActive
                      ? "var(--iw-text-primary)"
                      : "var(--iw-border)",
                    color: isActive ? "#ffffff" : "var(--iw-text-secondary)",
                  }}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {visible.length > 0 ? (
            <div
              className="mt-16 grid grid-cols-1 border-t border-s md:grid-cols-2 lg:grid-cols-3"
              style={{ borderColor: "var(--iw-border)" }}
            >
              {visible.map((p) => {
                const meta = getProjectMeta(p.slug);
                return (
                  <Link
                    key={p.project_id}
                    to="/$locale/work/$slug"
                    params={{ locale, slug: p.slug }}
                    className="group flex flex-col justify-between border-b border-e transition-transform duration-500 hover:-translate-y-1 hover:bg-[var(--iw-surface)]"
                    style={{ borderColor: "var(--iw-border)" }}
                  >
                    {meta ? (
                      <div
                        className="relative aspect-[16/10] w-full overflow-hidden"
                        style={{ backgroundColor: "var(--iw-surface-alt)" }}
                      >
                        <img
                          src={meta.cover}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale-[30%] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                        />
                        <span
                          className="label-mono absolute top-0 px-4 py-2.5 text-xs"
                          style={{
                            backgroundColor: "var(--iw-dark-bg)",
                            color: "var(--iw-dark-accent)",
                          }}
                        >
                          {isAr ? meta.capacity.ar : meta.capacity.en}
                        </span>
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
                      <div>
                        <h2 className="display-md text-2xl md:text-3xl">{p.title}</h2>
                        {meta ? (
                          <p
                            className="label-mono mt-3 text-xs"
                            style={{ color: "var(--iw-accent)" }}
                          >
                            {isAr ? meta.client.ar : meta.client.en}
                          </p>
                        ) : null}
                        {p.challenge ? (
                          <p className="body-reading mt-4 line-clamp-4 text-sm text-[var(--iw-text-secondary)]">
                            {p.challenge}
                          </p>
                        ) : null}
                      </div>
                      <span
                        className="label-mono mt-10 inline-flex items-center gap-3 text-xs font-semibold"
                        style={{ color: "var(--iw-accent)" }}
                      >
                        {t("Read case study", "اقرأ دراسة الحالة")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div
              className="mt-16 border p-12 text-center"
              style={{
                borderColor: "var(--iw-border)",
                backgroundColor: "var(--iw-surface)",
              }}
            >
              <p className="body-reading text-[var(--iw-text-secondary)]">
                {t(
                  "No projects found under this category.",
                  "لم يتم العثور على مشروعات في هذا القسم.",
                )}
              </p>
            </div>
          )}


        </div>
      </section>
    </div>
  );
}
