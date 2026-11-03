import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { COMPANY_FILM, COMPANY_SOCIAL_PROFILES } from "@/lib/company-media";

export default function CompanyFilm({ locale }: { locale: string }) {
  const [playing, setPlaying] = useState(false);
  const isAr = locale === "ar";
  const playLabel = isAr ? "شاهد الفيلم التعريفي" : "Watch the company film";

  return (
    <section
      id="company-film"
      aria-labelledby="company-film-title"
      className="iw-section-dark scroll-mt-24 border-b border-[var(--iw-dark-border)]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-10 md:py-20">
        <h2 id="company-film-title" className="display-lg text-3xl font-bold md:text-4xl">
          {isAr ? "تعرّف على إنفيوركس" : "Inside Infeworks"}
        </h2>
        <p className="body-reading mt-4 max-w-3xl text-base leading-relaxed text-[var(--iw-dark-text-muted)]">
          {isAr
            ? "شاهد قصة إنفيوركس ونهجها المتكامل في تنفيذ مشروعات الهندسة والإنشاءات والبنية التحتية في مصر."
            : "Discover the story behind Infeworks and our integrated approach to engineering, construction, and infrastructure in Egypt."}
        </p>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-sm bg-black">
          {playing ? (
            <iframe
              ref={(element) => element?.focus()}
              src={COMPANY_FILM.embedUrl}
              title={COMPANY_FILM.title}
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={0}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`${playLabel} · ${COMPANY_FILM.durationLabel}`}
              className="group absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[var(--iw-dark-accent)]"
            >
              <img
                src={COMPANY_FILM.poster}
                srcSet={COMPANY_FILM.posterSrcSet}
                sizes="(min-width: 1200px) 1120px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
                alt=""
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
              <span
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--iw-dark-bg)]/90 text-white transition-colors group-hover:bg-[var(--iw-accent)] md:h-20 md:w-20">
                  <Play className="h-7 w-7 fill-current md:h-8 md:w-8" />
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm">
          <a
            href={COMPANY_FILM.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-[var(--iw-dark-text)] underline decoration-[var(--iw-dark-accent)] underline-offset-4 hover:text-[var(--iw-dark-accent)] focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {isAr ? "شاهد على YouTube" : "Watch on YouTube"}
            <span dir="ltr">· {COMPANY_FILM.durationLabel}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={COMPANY_SOCIAL_PROFILES.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-[var(--iw-dark-text-muted)] underline underline-offset-4 hover:text-[var(--iw-dark-accent)] focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {isAr ? "قناة إنفيوركس على YouTube" : "Infeworks on YouTube"}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
