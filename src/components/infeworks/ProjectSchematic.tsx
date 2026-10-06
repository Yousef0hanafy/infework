import { ArrowRight, Workflow, CheckCircle2 } from "lucide-react";
import type { SchematicStep } from "@/lib/public-types";

export default function ProjectSchematic({
  steps,
  isAr,
  className = "",
}: {
  steps: SchematicStep[];
  isAr: boolean;
  className?: string;
}) {
  if (!steps || steps.length === 0) return null;

  return (
    <div
      className={`rounded-lg border overflow-hidden ${className}`}
      style={{
        borderColor: "rgba(0, 200, 213, 0.25)",
        backgroundColor: "#07111e",
        fontFamily: isAr ? "var(--font-arabic)" : undefined,
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Schematic Top Bar */}
      <div
        className="flex items-center justify-between border-b px-5 py-3.5"
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <Workflow className="h-4 w-4 text-[var(--iw-accent)]" />
          <span className="label-mono text-xs font-semibold uppercase tracking-wider text-white">
            {isAr ? "تسلسل العمليات والمخطط الهندسي" : "Process Flow & Technical Schematic"}
          </span>
        </div>
        <span
          className="label-mono rounded px-2.5 py-0.5 text-[11px] font-bold"
          style={{
            backgroundColor: "rgba(0, 200, 213, 0.12)",
            color: "var(--iw-accent)",
          }}
        >
          {isAr ? `${steps.length} مراحل تنفيذية` : `${steps.length} Process Phases`}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-5 md:p-7">
        {/* DESKTOP & TABLET VIEW: Responsive Engineering Grid (Full Visibility, No Cutoff) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const nextStep = !isLast ? steps[index + 1] : null;

            return (
              <div
                key={step.id}
                className="group relative flex flex-col justify-between rounded border p-4.5 transition-all duration-300 hover:border-[var(--iw-accent)]"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.025)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  minHeight: "140px",
                }}
              >
                {/* Step Card Top: Badge & Arrow */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className="label-mono inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase"
                      style={{ color: "var(--iw-accent)" }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--iw-accent)] shadow-[0_0_6px_#00c8d5]" />
                      {isAr
                        ? `مرحلة ${String(index + 1).padStart(2, "0")}`
                        : `Phase ${String(index + 1).padStart(2, "0")}`}
                    </span>
                    {!isLast && (
                      <ArrowRight
                        className={`h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-[var(--iw-accent)] ${
                          isAr ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {isLast && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/70" />}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                    {isAr ? step.label_ar : step.label_en}
                  </h3>

                  {/* Step Description */}
                  {(step.desc_ar || step.desc_en) && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {isAr ? step.desc_ar : step.desc_en}
                    </p>
                  )}
                </div>

                {/* Subtle bottom transition cue */}
                {!isLast && nextStep && (
                  <div
                    className="mt-3.5 border-t pt-2 text-[10px] text-white/40 label-mono flex items-center justify-between"
                    style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <span>{isAr ? "يتدفق إلى:" : "Discharges to:"}</span>
                    <span className="font-semibold text-white/70 truncate max-w-[130px]">
                      {isAr ? nextStep.label_ar : nextStep.label_en}
                    </span>
                  </div>
                )}
                {isLast && (
                  <div
                    className="mt-3.5 border-t pt-2 text-[10px] text-emerald-400/80 label-mono flex items-center justify-between"
                    style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <span>{isAr ? "المخرج النهائي" : "Terminal Stage"}</span>
                    <span className="font-bold">{isAr ? "تسليم معتمد" : "Verified Output"}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE VIEW: Vertical Engineering Process Timeline (Smooth, Natural Touch Scroll) */}
        <div className="block md:hidden">
          <div className="relative ps-6 sm:ps-8 space-y-6 my-2">
            {/* Continuous Vertical Guide Line */}
            <div
              className="absolute top-3 bottom-3 start-2 w-0.5"
              style={{
                backgroundColor: "rgba(0, 200, 213, 0.35)",
              }}
            />

            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="relative">
                  {/* Glowing Node Marker on the Line */}
                  <div
                    className="absolute -start-[19px] sm:-start-[27px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: isLast ? "#34d399" : "var(--iw-accent)",
                      backgroundColor: "#07111e",
                    }}
                  >
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: isLast ? "#34d399" : "var(--iw-accent)",
                        boxShadow: isLast ? "0 0 6px #34d399" : "0 0 6px #00c8d5",
                      }}
                    />
                  </div>

                  {/* Step Card */}
                  <div
                    className="rounded border p-4 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="label-mono text-[10px] font-bold tracking-widest uppercase"
                        style={{ color: "var(--iw-accent)" }}
                      >
                        {isAr
                          ? `المرحلة ${String(index + 1).padStart(2, "0")}`
                          : `Step ${String(index + 1).padStart(2, "0")}`}
                      </span>
                      {isLast ? (
                        <span className="label-mono text-[10px] text-emerald-400 font-semibold">
                          {isAr ? "مخرج نهائي" : "Final"}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {isAr ? step.label_ar : step.label_en}
                    </h3>

                    {(step.desc_ar || step.desc_en) && (
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                        {isAr ? step.desc_ar : step.desc_en}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Schematic Footer */}
      <div
        className="flex items-center justify-between border-t px-5 py-3 text-xs"
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.015)",
          color: "var(--iw-dark-text-muted)",
        }}
      >
        <span className="label-mono text-[11px]">
          {isAr
            ? "المخطط الفعلي للمشروع — تسلسل العمليات المعتمد"
            : "Engineered Process Sequence — Single-Contract Delivery"}
        </span>
        <span className="label-mono text-[11px] font-medium" style={{ color: "var(--iw-accent)" }}>
          {isAr ? "معتمد هندسياً" : "Verified Schematic"}
        </span>
      </div>
    </div>
  );
}
