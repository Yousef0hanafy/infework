import { useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

const NUMBER = "201006249420";

const MESSAGE = {
  en: "Hello Infeworks, I would like to discuss a water infrastructure project.",
  ar: "مرحباً إنفيوركس، أرغب في مناقشة مشروع بنية تحتية للمياه.",
};

const LABEL = {
  en: "Chat with Engineering Team",
  ar: "تواصل مع الفريق الهندسي",
};

export default function FloatingWhatsApp() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
  const locale = isAr ? "ar" : "en";
  const href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(MESSAGE[locale])}`;

  return (
    <div
      className="fixed end-4 z-[60] print:hidden"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={LABEL[locale]}
        title={LABEL[locale]}
        className="group iw-glass-dark iw-whatsapp-glow flex items-center gap-3 px-4 py-4 outline-none transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--iw-dark-accent)] focus-visible:ring-offset-2 md:px-5"
        style={{
          color: "var(--iw-dark-text)",
          borderInlineStart: "3px solid var(--iw-dark-accent)",
        }}
      >
        <span className="relative flex shrink-0 items-center">
          <span
            className="absolute inset-0 -m-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--iw-dark-accent) 40%, transparent), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <MessageCircle
            className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
        <span
          className="hidden max-w-0 overflow-hidden text-sm whitespace-nowrap transition-all duration-500 group-hover:max-w-xs group-focus-visible:max-w-xs md:block"
          style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}
        >
          {LABEL[locale]}
        </span>
      </a>
    </div>
  );
}
