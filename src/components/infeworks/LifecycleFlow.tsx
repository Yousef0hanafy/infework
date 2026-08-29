// Infeworks — interactive 5-stage engineering delivery lifecycle.
import { useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  Hammer,
  Ruler,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Stage = {
  id: string;
  icon: LucideIcon;
  name: { en: string; ar: string };
  summary: { en: string; ar: string };
  deliverables: { en: string; ar: string }[];
  qa: { en: string; ar: string };
};

const STAGES: Stage[] = [
  {
    id: "01",
    icon: Ruler,
    name: { en: "Understand & Survey", ar: "الفهم والرفع المساحي" },
    summary: {
      en: "We start on site, not in a spreadsheet: measured levels, water analysis, and the real constraints of the plot.",
      ar: "نبدأ من الموقع لا من جدول بيانات: مناسيب مقيسة وتحليل للمياه والقيود الفعلية للأرض.",
    },
    deliverables: [
      { en: "Topographic survey and site levels", ar: "الرفع المساحي ومناسيب الموقع" },
      { en: "Raw water / effluent laboratory analysis", ar: "التحليل المعملي للمياه الخام أو الصرف" },
      { en: "Load, capacity, and duty definition", ar: "تحديد الأحمال والطاقة ونقطة التشغيل" },
      { en: "Utility, access, and permit review", ar: "مراجعة المرافق والوصول والتصاريح" },
    ],
    qa: {
      en: "QA gate — no design begins until the water analysis and survey are signed by both parties.",
      ar: "بوابة ضمان الجودة — لا يبدأ التصميم قبل توقيع الطرفين على التحليل والرفع المساحي.",
    },
  },
  {
    id: "02",
    icon: ClipboardCheck,
    name: { en: "Process & Engineering Design", ar: "التصميم الهندسي والعمليات" },
    summary: {
      en: "Mass balance first, then hydraulics, then equipment — with the interlock philosophy written before a panel is built.",
      ar: "الموازنة الكتلية أولًا ثم الهيدروليكا ثم المعدات — مع كتابة فلسفة التعاشق قبل تصنيع أي لوحة.",
    },
    deliverables: [
      { en: "Process flow diagram and mass balance", ar: "مخطط سير العمليات والموازنة الكتلية" },
      { en: "Hydraulic calculations and pump selection", ar: "الحسابات الهيدروليكية واختيار المضخات" },
      { en: "Civil, mechanical, and electrical drawings", ar: "الرسومات المدنية والميكانيكية والكهربائية" },
      { en: "I/O list and interlock matrix", ar: "قائمة المداخل والمخارج ومصفوفة التعاشق" },
    ],
    qa: {
      en: "QA gate — internal design review against the client's discharge or product-water specification.",
      ar: "بوابة ضمان الجودة — مراجعة تصميمية داخلية مقابل مواصفة الصرف أو المياه المنتجة.",
    },
  },
  {
    id: "03",
    icon: Hammer,
    name: { en: "Supply & In-House Construction", ar: "التوريد والتنفيذ الذاتي" },
    summary: {
      en: "Fabrication, civil works, and electromechanical installation carried out by our own crews under one contract.",
      ar: "التصنيع والأعمال المدنية والتركيبات الكهروميكانيكية بأطقم العمل التابعة لنا تحت عقد واحد.",
    },
    deliverables: [
      { en: "Skid and manifold fabrication", ar: "تصنيع الوحدات المجمعة والمجمعات" },
      { en: "Tanks, chambers, and civil structures", ar: "الخزانات والغرف والمنشآت المدنية" },
      { en: "Piping, valve trains, and supports", ar: "المواسير ومجموعات المحابس والحوامل" },
      { en: "MCC / VFD panel assembly and wiring", ar: "تجميع لوحات MCC ومحولات الترددات والتوصيلات" },
    ],
    qa: {
      en: "QA gate — material certificates, weld and coating checks, and factory acceptance test on every panel.",
      ar: "بوابة ضمان الجودة — شهادات المواد وفحص اللحامات والدهانات واختبار قبول لكل لوحة.",
    },
  },
  {
    id: "04",
    icon: Wrench,
    name: { en: "Commissioning & Testing", ar: "الاختبار والتشغيل التجريبي" },
    summary: {
      en: "Nothing is declared complete on assurance. It is declared complete on a witnessed, signed test record.",
      ar: "لا يُعد أي بند مكتملًا بالتطمين، بل بسجل اختبار موثق وموقَّع.",
    },
    deliverables: [
      { en: "Hydrostatic pressure and leak testing", ar: "اختبارات الضغط الهيدروستاتيكي والتسريب" },
      { en: "Loop checks and functional interlock tests", ar: "فحص الحلقات واختبار التعاشق الوظيفي" },
      { en: "Performance run at contract capacity", ar: "تجربة أداء بالطاقة التعاقدية" },
      { en: "Product-water / effluent lab verification", ar: "التحقق المعملي للمياه المنتجة أو الصرف" },
    ],
    qa: {
      en: "QA gate — 72-hour continuous run and third-party lab result before provisional acceptance.",
      ar: "بوابة ضمان الجودة — تشغيل متصل 72 ساعة ونتيجة معمل خارجي قبل الاستلام المبدئي.",
    },
  },
  {
    id: "05",
    icon: CheckCircle2,
    name: { en: "Operation & Handover", ar: "التشغيل المستدام والتسليم" },
    summary: {
      en: "We stay on the asset: trained operators, planned maintenance, spares, and reported performance.",
      ar: "نبقى مع الأصل: مشغلون مدربون وصيانة مخططة وقطع غيار وتقارير أداء.",
    },
    deliverables: [
      { en: "As-built drawings and O&M manuals", ar: "الرسومات التنفيذية وأدلة التشغيل والصيانة" },
      { en: "Operator training and written SOPs", ar: "تدريب المشغلين وإجراءات تشغيل مكتوبة" },
      { en: "Preventive maintenance schedule", ar: "جدول الصيانة الوقائية" },
      { en: "Monthly performance and quality reports", ar: "تقارير شهرية للأداء والجودة" },
    ],
    qa: {
      en: "QA gate — output and quality guaranteed under the O&M agreement, with logged monthly evidence.",
      ar: "بوابة ضمان الجودة — ضمان الإنتاج والجودة بموجب عقد التشغيل مع أدلة شهرية مسجلة.",
    },
  },
];

export default function LifecycleFlow({ isAr }: { isAr: boolean }) {
  const [active, setActive] = useState(0);
  const stage = STAGES[active]!;
  const t = (v: { en: string; ar: string }) => (isAr ? v.ar : v.en);
  const Icon = stage.icon;

  return (
    <div className="mt-16">
      {/* Stage rail */}
      <div
        className="grid grid-cols-1 border-t border-s sm:grid-cols-2 lg:grid-cols-5"
        style={{ borderColor: "var(--iw-border)" }}
      >
        {STAGES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={isActive}
              className="group relative border-b border-e px-6 py-8 text-start transition-all duration-500 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--iw-border)",
                backgroundColor: isActive
                  ? "var(--iw-dark-bg)"
                  : "var(--iw-surface)",
                color: isActive ? "var(--iw-dark-text)" : "var(--iw-text-primary)",
              }}
            >
              <span
                className="label-mono"
                style={{
                  color: isActive
                    ? "var(--iw-dark-accent)"
                    : "var(--iw-text-secondary)",
                }}
              >
                {s.id}
              </span>
              <span className="display-md mt-4 block text-base leading-snug md:text-lg">
                {t(s.name)}
              </span>
              <span
                className="mt-6 block h-px w-full origin-left transition-transform duration-500"
                style={{
                  backgroundColor: isActive
                    ? "var(--iw-dark-accent)"
                    : "var(--iw-border)",
                  transform: isActive ? "scaleX(1)" : "scaleX(0.25)",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Expanded detail */}
      <div
        key={stage.id}
        className="iw-reveal grid grid-cols-1 border-b border-s border-e lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
        style={{
          borderColor: "var(--iw-border)",
          backgroundColor: "var(--iw-surface)",
        }}
      >
        <div
          className="border-b p-8 md:p-10 lg:border-b-0 lg:border-e"
          style={{ borderColor: "var(--iw-border)" }}
        >
          <Icon
            className="h-8 w-8"
            strokeWidth={1.25}
            style={{ color: "var(--iw-accent)" }}
          />
          <h3 className="display-md mt-8 text-2xl">{t(stage.name)}</h3>
          <p className="body-reading mt-4 text-[var(--iw-text-secondary)]">
            {t(stage.summary)}
          </p>
        </div>

        <div className="p-8 md:p-10">
          <p className="label-mono text-[var(--iw-text-secondary)]">
            {isAr ? "المخرجات الفنية" : "Technical deliverables"}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {stage.deliverables.map((d) => (
              <li key={d.en} className="flex items-start gap-3">
                <span
                  className="mt-2 h-px w-5 shrink-0"
                  style={{ backgroundColor: "var(--iw-accent)" }}
                />
                <span className="text-sm leading-relaxed">{t(d)}</span>
              </li>
            ))}
          </ul>
          <p
            className="mt-10 border-s-2 ps-4 text-sm leading-relaxed"
            style={{
              borderColor: "var(--iw-accent)",
              color: "var(--iw-text-secondary)",
            }}
          >
            {t(stage.qa)}
          </p>
        </div>
      </div>
    </div>
  );
}
