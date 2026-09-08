import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Handshake,
  Headset,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { submitContact } from "@/lib/contact.functions";

const TITLE_EN = "Contact & Technical Enquiries — Infeworks";
const TITLE_AR = "التواصل والاستفسار الفني — إنفيوركس";
const DESC_EN =
  "Connect with Infeworks engineering team for water treatment, wastewater, pumping stations, networks, and turnkey EPC projects across Egypt.";
const DESC_AR =
  "تواصل مباشرة مع الفريق الهندسي لشركة إنفيوركس لمشروعات معالجة المياه، محطات الرفع، شبكات البنية التحتية، والمقاولات المتكاملة في مصر.";

const contactSearchSchema = z.object({
  type: z.enum(["technical", "general", "supplier"]).optional().catch(undefined),
});

export const Route = createFileRoute("/$locale/contact")({
  validateSearch: (search: Record<string, unknown>) => contactSearchSchema.parse(search),
  head: ({ params }) => {
    const isAr = params.locale === "ar";
    const title = isAr ? TITLE_AR : TITLE_EN;
    const desc = isAr ? DESC_AR : DESC_EN;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://infeworks.com/logo.png" },
        { property: "og:image:alt", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: "https://infeworks.com/logo.png" },
      ],
    };
  },
  component: ContactPage,
});

const WHATSAPP_URL = "https://wa.me/201006249420";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=313+Zahraa+Nasr+City,+Cairo,+Egypt";

type InquiryType = "technical" | "general" | "supplier";

// --- Options dictionaries ---

const CLIENT_TYPES = [
  { value: "state", en: "Government / State Authority", ar: "جهة حكومية / جهاز سيادي" },
  { value: "industrial", en: "Industrial & Manufacturing", ar: "قطاع صناعي ومصانع" },
  { value: "agricultural", en: "Agricultural Reclamation", ar: "استصلاح زراعي ومزارع كبرى" },
  { value: "developer", en: "Real Estate & Commercial Developer", ar: "تطوير عقاري وتجمعات سكنية" },
  { value: "contractor", en: "Main EPC / Joint Venture", ar: "مقاول رئيسي / تحالف هندسي" },
  { value: "other", en: "Other Sector", ar: "قطاع آخر" },
] as const;

const SCOPE_TYPES = [
  { value: "turnkey", en: "Full Turnkey EPC Delivery", ar: "تسليم مفتاح متكامل (EPC)" },
  {
    value: "water-treatment",
    en: "Water Treatment & RO Desalination",
    ar: "معالجة مياه الشرب والتحلية",
  },
  {
    value: "wastewater",
    en: "Wastewater & Industrial Effluent",
    ar: "محطات معالجة الصرف الصحي والصناعي",
  },
  { value: "pumping", en: "Pumping Stations & Deep Wells", ar: "محطات الرفع والآبار العميقة" },
  {
    value: "networks",
    en: "Trunk Utility Infrastructure Networks",
    ar: "شبكات المرافق وخطوط الطرد والنقل",
  },
  {
    value: "mep",
    en: "Electromechanical & SCADA Automation",
    ar: "أعمال كهروميكانيكية وتحكم سكادا",
  },
  { value: "om", en: "Operation & Maintenance (O&M)", ar: "عقود التشغيل والصيانة المتخصصة" },
  {
    value: "design",
    en: "Hydraulic & Process Engineering Design",
    ar: "التصميم الهندسي والهيدروليكي",
  },
] as const;

const SUPPLIER_CATEGORIES = [
  { value: "pumps", en: "Pumps & Submersible Sets", ar: "مجموعات الضخ والطلمبات الغاطسة" },
  {
    value: "pipes",
    en: "Piping (Ductile Iron / HDPE / UPVC / GRP)",
    ar: "مواسير (زهر مرن / HDPE / UPVC / GRP)",
  },
  { value: "valves", en: "Valves, Flow Meters & Actuators", ar: "محابس وعدادات وأجهزة قياس تدفق" },
  {
    value: "membranes",
    en: "Membranes, Filters & RO Components",
    ar: "أغشية تناضح عكسي وفلاتر ومعدات تحلية",
  },
  {
    value: "electrical",
    en: "Electrical Panels, MCC & VFDs",
    ar: "لوحات كهربائية وMCC ومغيرات سرعة",
  },
  {
    value: "automation",
    en: "SCADA, PLC & Instrumentation",
    ar: "أنظمة سكادا وأجهزة القياس والتحكم",
  },
  {
    value: "chemicals",
    en: "Water Treatment Chemicals & Dosing",
    ar: "كيماويات المعالجة ومضخات الحقن",
  },
  {
    value: "civil-subcontract",
    en: "Specialized Civil Works Subcontractor",
    ar: "مقاول باطن أعمال مدنية متخصصة",
  },
  { value: "other", en: "Other Equipment / Materials", ar: "توريدات ومعدات أخرى" },
] as const;

// --- Zod Form Schema ---

function createContactFormSchema(isAr: boolean) {
  const t = (en: string, ar: string) => (isAr ? ar : en);
  return z.object({
    inquiry_type: z.enum(["technical", "general", "supplier"]),
    name: z.string().trim().min(2, t("Please enter your name.", "يُرجى كتابة الاسم.")).max(120),
    email: z
      .string()
      .trim()
      .email(t("Enter a valid email address.", "أدخل بريداً إلكترونياً صحيحاً."))
      .max(255),
    phone: z
      .string()
      .trim()
      .min(6, t("Enter a contact phone number.", "أدخل رقم الهاتف للتواصل."))
      .max(50),
    organization: z.string().trim().max(150),
    audience_type: z.string(),
    need_type: z.string(),
    location_text: z.string().trim().max(150),
    capacity: z.string().trim().max(150),
    supplier_category: z.string(),
    website: z.string().trim().max(300),
    message: z
      .string()
      .trim()
      .min(
        10,
        t(
          "Please provide details (minimum 10 characters).",
          "يُرجى كتابة تفاصيل الطلب (10 أحرف على الأقل).",
        ),
      )
      .max(3000, t("Maximum 3000 characters.", "الحد الأقصى 3000 حرف.")),
    consent: z.literal(true, {
      errorMap: () => ({
        message: t("You must agree to continue.", "الموافقة مطلوبة لإرسال الطلب."),
      }),
    }),
    honeypot: z.string().max(0),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

const inputBaseClass =
  "w-full rounded-sm border bg-[var(--iw-surface)] px-4 py-3 text-sm transition-all duration-200 outline-none placeholder:text-[var(--iw-text-secondary)]/50 focus:border-[var(--iw-accent)] focus:ring-1 focus:ring-[var(--iw-accent)]";

function ContactPage() {
  const { locale } = Route.useParams();
  const search = Route.useSearch();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const initialType: InquiryType =
    search.type === "general" || search.type === "supplier" ? search.type : "technical";

  const [activeType, setActiveType] = useState<InquiryType>(initialType);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(createContactFormSchema(isAr)),
    defaultValues: {
      inquiry_type: initialType,
      name: "",
      email: "",
      phone: "",
      organization: "",
      audience_type: "",
      need_type: "",
      location_text: "",
      capacity: "",
      supplier_category: "",
      website: "",
      message: "",
      honeypot: "",
    },
  });

  const handleTabChange = (newType: InquiryType) => {
    setActiveType(newType);
    setValue("inquiry_type", newType);
    setStatus("idle");
  };

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const res = await submitContact({ data: values });
      if (res && res.success) {
        setStatus("success");
        reset({
          inquiry_type: activeType,
          name: "",
          email: "",
          phone: "",
          organization: "",
          audience_type: "",
          need_type: "",
          location_text: "",
          capacity: "",
          supplier_category: "",
          website: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const renderError = (msg?: string) =>
    msg ? <p className="mt-1.5 text-xs font-medium text-[var(--iw-error)]">{msg}</p> : null;

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      {/* 1. Header Hero Section */}
      <section className="iw-section-dark relative overflow-hidden border-b border-[var(--iw-dark-border)]">
        {/* Subtle grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--iw-dark-accent) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--iw-dark-accent)]/30 bg-[var(--iw-dark-accent)]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--iw-dark-accent)]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {t("Direct Engineering Response", "استجابة هندسية مباشرة")}
            </span>
            <span className="text-xs text-[var(--iw-dark-text-muted)]">
              • {t("Fast-Track Review within 24h", "مراجعة ودراسة فنية خلال 24 ساعة")}
            </span>
          </div>

          <h1 className="display-xl mt-6 max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.15] text-[var(--iw-dark-text)]">
            {t(
              "Start your infrastructure project with confidence.",
              "ابنِ مشروعك مع شريك بنية تحتية متكامل.",
            )}
          </h1>

          <p className="body-reading mt-6 max-w-3xl text-base text-[var(--iw-dark-text-muted)] md:text-lg">
            {t(
              "Connect directly with our engineering team for technical studies, EPC turnkey contracting, pump station fit-outs, or supplier registration across Egypt.",
              "تواصل مباشرة مع مهندسينا لدراسة المشروعات، المقاولات المتكاملة (EPC)، محطات الرفع والمعالجة، أو تسجيل الموردين ومقاولي الباطن.",
            )}
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="iw-section-light relative">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
            {/* LEFT COLUMN: Executive Contact Information & Office Card */}
            <div className="space-y-8">
              {/* Direct Quick Desk Card */}
              <div
                className="rounded-sm border bg-[var(--iw-surface)] p-6 md:p-8 shadow-sm"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 items-center justify-center rounded-sm text-white"
                    style={{ backgroundColor: "var(--iw-accent)" }}
                  >
                    <Headset className="size-5" />
                  </div>
                  <div>
                    <h2 className="display-sm text-lg font-bold text-[var(--iw-text-primary)]">
                      {t("Direct Contact Channels", "قنوات التواصل المباشر")}
                    </h2>
                    <p className="text-xs text-[var(--iw-text-secondary)]">
                      {t("Official Engineering & Tender Desk", "مكتب المناقصات والتواصل الفني")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--iw-accent)]/10 text-[var(--iw-accent)]">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold tracking-wider text-[var(--iw-text-secondary)] uppercase">
                        {t("Direct Line", "الهاتف المباشر")}
                      </span>
                      <a
                        href="tel:+201006249420"
                        dir="ltr"
                        className="mt-0.5 inline-block text-base font-semibold text-[var(--iw-text-primary)] transition-colors hover:text-[var(--iw-accent)]"
                      >
                        +20 100 624 9420
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--iw-accent)]/10 text-[var(--iw-accent)]">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold tracking-wider text-[var(--iw-text-secondary)] uppercase">
                        {t("Official Inquiries", "البريد الإلكتروني")}
                      </span>
                      <a
                        href="mailto:info@infeworks.com"
                        className="mt-0.5 block text-base font-medium text-[var(--iw-text-primary)] transition-colors hover:text-[var(--iw-accent)]"
                      >
                        info@infeworks.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Instant Desk */}
                  <div className="pt-2">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-3 rounded-sm px-5 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "var(--iw-accent)",
                        color: "#ffffff",
                      }}
                    >
                      <MessageCircle className="size-4 transition-transform group-hover:scale-110" />
                      {t("Live WhatsApp Engineering Desk", "محادثة واتساب فورية مع الإدارة")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Head Office & Map Card */}
              <div
                className="rounded-sm border bg-[var(--iw-surface)] p-6 md:p-8 shadow-sm"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-sm bg-slate-900 text-[var(--iw-dark-accent)]">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="display-sm text-lg font-bold text-[var(--iw-text-primary)]">
                      {t("Cairo Headquarters", "المقر الرئيسي — القاهرة")}
                    </h3>
                    <p className="text-xs text-[var(--iw-text-secondary)]">
                      {t(
                        "Central Operations & Engineering Office",
                        "إدارة العمليات والمشروعات المركزية",
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-sm text-[var(--iw-text-secondary)]">
                  <p className="leading-relaxed font-medium text-[var(--iw-text-primary)]">
                    {t(
                      "313 Zahraa Nasr City, Cairo Governorate, Arab Republic of Egypt.",
                      "313 زهراء مدينة نصر، محافظة القاهرة، جمهورية مصر العربية.",
                    )}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[var(--iw-text-secondary)]">
                    <Clock className="size-4 shrink-0 text-[var(--iw-accent)]" />
                    <span>
                      {t(
                        "Sunday – Thursday: 09:00 AM – 05:00 PM (GMT+2)",
                        "الأحد – الخميس: 09:00 صباحاً – 05:00 مساءً",
                      )}
                    </span>
                  </div>

                  <div className="pt-2">
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--iw-accent)] hover:underline"
                    >
                      <ExternalLink className="size-3.5" />
                      {t("Open Location in Google Maps", "عرض الموقع على خرائط جوجل")}
                    </a>
                  </div>
                </div>
              </div>

              {/* SLA & Reliability Guarantees */}
              <div
                className="rounded-sm border bg-[color-mix(in_oklab,var(--iw-surface)_50%,transparent)] p-6"
                style={{ borderColor: "var(--iw-border)" }}
              >
                <h4 className="label-mono text-xs text-[var(--iw-text-secondary)] uppercase">
                  {t("Service Commitments", "التزامات الجودة والسرية")}
                </h4>
                <div className="mt-4 space-y-3.5 text-xs text-[var(--iw-text-secondary)]">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="size-4 shrink-0 text-[var(--iw-accent)] mt-0.5" />
                    <span>
                      {t(
                        "Full NDA protection for tender documents and process flow diagrams.",
                        "حفظ كامل لسرية مستندات المناقصات ومخططات المشروعات.",
                      )}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Layers className="size-4 shrink-0 text-[var(--iw-accent)] mt-0.5" />
                    <span>
                      {t(
                        "Direct engagement with technical directors, not sales representatives.",
                        "تواصل هندسي مع مهندس مشروع مسؤول وليس موظفي مبيعات.",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Segmented Form Hub */}
            <div
              className="rounded-sm border bg-[var(--iw-surface)] p-6 md:p-10 shadow-sm"
              style={{ borderColor: "var(--iw-border)" }}
            >
              {/* Type Switcher Tabs */}
              <div>
                <span className="label-mono block text-xs text-[var(--iw-text-secondary)] uppercase">
                  {t("Select Inquiry Category", "حدد نوع الطلب للتوجيه السريع")}
                </span>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => handleTabChange("technical")}
                    className={`flex items-center justify-center gap-2.5 rounded-sm border p-3.5 text-xs font-semibold transition-all duration-200 ${
                      activeType === "technical"
                        ? "border-[var(--iw-accent)] bg-[var(--iw-accent)] text-white shadow-sm"
                        : "border-[var(--iw-border)] bg-[var(--iw-surface)] text-[var(--iw-text-secondary)] hover:border-[var(--iw-accent)]/50 hover:text-[var(--iw-text-primary)]"
                    }`}
                  >
                    <Wrench className="size-4 shrink-0" />
                    <span>{t("Technical / Projects", "استفسار فني ومشاريع")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange("general")}
                    className={`flex items-center justify-center gap-2.5 rounded-sm border p-3.5 text-xs font-semibold transition-all duration-200 ${
                      activeType === "general"
                        ? "border-[var(--iw-accent)] bg-[var(--iw-accent)] text-white shadow-sm"
                        : "border-[var(--iw-border)] bg-[var(--iw-surface)] text-[var(--iw-text-secondary)] hover:border-[var(--iw-accent)]/50 hover:text-[var(--iw-text-primary)]"
                    }`}
                  >
                    <Handshake className="size-4 shrink-0" />
                    <span>{t("General & Inquiries", "استفسار عام وشراكات")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange("supplier")}
                    className={`flex items-center justify-center gap-2.5 rounded-sm border p-3.5 text-xs font-semibold transition-all duration-200 ${
                      activeType === "supplier"
                        ? "border-[var(--iw-accent)] bg-[var(--iw-accent)] text-white shadow-sm"
                        : "border-[var(--iw-border)] bg-[var(--iw-surface)] text-[var(--iw-text-secondary)] hover:border-[var(--iw-accent)]/50 hover:text-[var(--iw-text-primary)]"
                    }`}
                  >
                    <Truck className="size-4 shrink-0" />
                    <span>{t("Suppliers & Vendors", "تسجيل الموردين والمقاولين")}</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8">
                {/* 1. TECHNICAL / PROJECT SCOPE FIELDS */}
                {activeType === "technical" && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="audience_type"
                          className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                        >
                          {t("Client / Entity Type", "نوع الجهة المالكة")} *
                        </label>
                        <select
                          id="audience_type"
                          className={`${inputBaseClass} mt-2`}
                          style={{ borderColor: "var(--iw-border)" }}
                          defaultValue=""
                          {...register("audience_type")}
                        >
                          <option value="" disabled>
                            {t("Select client type…", "اختر نوع الجهة…")}
                          </option>
                          {CLIENT_TYPES.map((o) => (
                            <option key={o.value} value={o.value}>
                              {isAr ? o.ar : o.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="need_type"
                          className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                        >
                          {t("Scope of Works Required", "نطاق الأعمال المطلوب")} *
                        </label>
                        <select
                          id="need_type"
                          className={`${inputBaseClass} mt-2`}
                          style={{ borderColor: "var(--iw-border)" }}
                          defaultValue=""
                          {...register("need_type")}
                        >
                          <option value="" disabled>
                            {t("Select scope…", "اختر مجال العمل…")}
                          </option>
                          {SCOPE_TYPES.map((o) => (
                            <option key={o.value} value={o.value}>
                              {isAr ? o.ar : o.en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="location_text"
                          className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                        >
                          {t(
                            "Project Location (Governorate / City)",
                            "موقع المشروع (المحافظة / المدينة)",
                          )}
                        </label>
                        <input
                          id="location_text"
                          type="text"
                          placeholder={t(
                            "e.g. New Cairo, Menoufia, Aswan",
                            "مثال: السادات، توشكى، العريش، 6 أكتوبر",
                          )}
                          className={`${inputBaseClass} mt-2`}
                          style={{ borderColor: "var(--iw-border)" }}
                          {...register("location_text")}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="capacity"
                          className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                        >
                          {t(
                            "Estimated Capacity / Flow (Optional)",
                            "الطاقة أو التدفق التقديري (اختياري)",
                          )}
                        </label>
                        <input
                          id="capacity"
                          type="text"
                          placeholder={t(
                            "e.g. 5,000 m³/day, 120 l/s, DN 800mm",
                            "مثال: 5,000 م³/يوم، أو قطر 600 مم",
                          )}
                          className={`${inputBaseClass} mt-2`}
                          style={{ borderColor: "var(--iw-border)" }}
                          {...register("capacity")}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SUPPLIER / VENDOR FIELDS */}
                {activeType === "supplier" && (
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="supplier_category"
                          className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                        >
                          {t("Supply Category / Material", "تصنيف التوريد / التخصص")} *
                        </label>
                        <select
                          id="supplier_category"
                          className={`${inputBaseClass} mt-2`}
                          style={{ borderColor: "var(--iw-border)" }}
                          defaultValue=""
                          {...register("supplier_category")}
                        >
                          <option value="" disabled>
                            {t("Select supply category…", "اختر تصنيف التوريدات…")}
                          </option>
                          {SUPPLIER_CATEGORIES.map((o) => (
                            <option key={o.value} value={o.value}>
                              {isAr ? o.ar : o.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="website"
                          className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                        >
                          {t(
                            "Website / Catalog Link (Optional)",
                            "موقع الشركة أو رابط الكتالوج (اختياري)",
                          )}
                        </label>
                        <input
                          id="website"
                          type="url"
                          dir="ltr"
                          placeholder="https://..."
                          className={`${inputBaseClass} mt-2`}
                          style={{ borderColor: "var(--iw-border)" }}
                          {...register("website")}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. COMMON CONTACT PERSON & CONTACT INFO (All Tabs) */}
                <div className="mt-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                      >
                        {t("Contact Person / Engineer Name", "اسم المسؤول أو المهندس")} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder={t("Full Name", "الاسم بالكامل")}
                        className={`${inputBaseClass} mt-2`}
                        style={{ borderColor: "var(--iw-border)" }}
                        {...register("name")}
                      />
                      {renderError(errors.name?.message)}
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                      >
                        {activeType === "supplier"
                          ? t("Company / Factory Name", "اسم الشركة أو المصنع")
                          : t("Organization / Authority", "اسم الجهة أو الشركة")}
                      </label>
                      <input
                        id="organization"
                        type="text"
                        placeholder={t("Entity Name", "الاسم الرسمي")}
                        className={`${inputBaseClass} mt-2`}
                        style={{ borderColor: "var(--iw-border)" }}
                        {...register("organization")}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                      >
                        {t("Official Email Address", "البريد الإلكتروني الرسمي")} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        dir="ltr"
                        placeholder="name@company.com"
                        className={`${inputBaseClass} mt-2`}
                        style={{ borderColor: "var(--iw-border)" }}
                        {...register("email")}
                      />
                      {renderError(errors.email?.message)}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                      >
                        {t("Phone Number / WhatsApp", "رقم الهاتف / واتساب")} *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        dir="ltr"
                        placeholder="+20 1..."
                        className={`${inputBaseClass} mt-2`}
                        style={{ borderColor: "var(--iw-border)" }}
                        {...register("phone")}
                      />
                      {renderError(errors.phone?.message)}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="label-mono block text-xs text-[var(--iw-text-secondary)]"
                    >
                      {activeType === "technical"
                        ? t(
                            "Project Specifications & Scope Summary",
                            "ملخص مواصفات المشروع ونطاق العمل",
                          )
                        : activeType === "supplier"
                          ? t(
                              "Available Materials, Certifications & Pre-qualifications",
                              "المواصفات والاعتمادات السابقة وسابقة التوريد",
                            )
                          : t("Inquiry Details & Message", "تفاصيل الرسالة أو الاستفسار")}{" "}
                      *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`${inputBaseClass} mt-2 resize-y`}
                      style={{ borderColor: "var(--iw-border)" }}
                      placeholder={
                        activeType === "technical"
                          ? t(
                              "Describe capacity requirements, timeline, project consultant if any, tender status...",
                              "اكتب تفاصيل المشروع، الطاقة، المخططات المتاحة، الاستشاري المشرف، والجدول الزمني المستهدف...",
                            )
                          : activeType === "supplier"
                            ? t(
                                "List materials, manufacturing origins, factory ISO certifications, previous project approvals...",
                                "اذكر أنواع المنتجات، بلاد المنشأ، شهادات الجودة، وسوابق التوريد لمشروعات مماثلة...",
                              )
                            : t(
                                "How can Infeworks team assist your organization?",
                                "كيف يمكن لفريق إنفيوركس مساعدتك؟",
                              )
                      }
                      {...register("message")}
                    />
                    {renderError(errors.message?.message)}
                  </div>
                </div>

                {/* Honeypot field for bot protection */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
                >
                  <label htmlFor="bot_field">Leave this field blank</label>
                  <input
                    id="bot_field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("honeypot")}
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="mt-6 flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    className="mt-1 size-4 rounded-sm"
                    style={{ accentColor: "var(--iw-accent)" }}
                    {...register("consent")}
                  />
                  <div>
                    <label
                      htmlFor="consent"
                      className="body-reading text-xs text-[var(--iw-text-secondary)] leading-relaxed"
                    >
                      {t(
                        "I confirm the accuracy of information provided and agree to communication in accordance with the",
                        "أؤكد صحة البيانات وأوافق على التواصل بخصوص هذا الطلب وفق",
                      )}{" "}
                      <Link
                        to="/$locale/privacy"
                        params={{ locale }}
                        className="underline font-semibold"
                        style={{ color: "var(--iw-accent)" }}
                      >
                        {t("Privacy Policy", "سياسة الخصوصية")}
                      </Link>
                      .
                    </label>
                    {renderError(errors.consent?.message)}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 rounded-sm px-8 py-4 text-xs font-semibold tracking-wider uppercase text-white transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5 disabled:opacity-60"
                    style={{ backgroundColor: "var(--iw-accent)" }}
                  >
                    <Send className="size-4" />
                    {isSubmitting
                      ? t("Submitting Enquiry…", "جارٍ إرسال الطلب…")
                      : activeType === "technical"
                        ? t("Submit Technical Request", "إرسال الطلب الفني")
                        : activeType === "supplier"
                          ? t("Submit Supplier Profile", "تسجيل بيانات المورد")
                          : t("Send Message", "إرسال الرسالة")}
                  </button>

                  <span className="text-xs text-[var(--iw-text-secondary)]">
                    {t(
                      "Directly routed to the engineering operations desk.",
                      "يصل الطلب مباشرة لإدارة المشروعات والعمليات الهندسية.",
                    )}
                  </span>
                </div>

                {/* Feedback Alerts */}
                <div aria-live="polite" className="mt-6">
                  {status === "success" && (
                    <div
                      className="flex items-start gap-3 rounded-sm border p-4"
                      style={{
                        borderColor: "var(--iw-success)",
                        backgroundColor: "color-mix(in oklab, var(--iw-success) 8%, transparent)",
                      }}
                    >
                      <CheckCircle2 className="size-5 shrink-0 text-[var(--iw-success)] mt-0.5" />
                      <div className="text-xs text-[var(--iw-text-primary)]">
                        <p className="font-bold">
                          {t("Enquiry Successfully Received", "تم استلام طلبك بنجاح")}
                        </p>
                        <p className="mt-1 text-[var(--iw-text-secondary)] leading-relaxed">
                          {t(
                            "Thank you. A designated engineer will review your requirements and respond to your email/phone within 1 business day.",
                            "شكراً لتواصلك. سيقوم مهندس متخصص بمراجعة تفاصيل الطلب والتواصل معك عبر البريد أو الهاتف خلال يوم عمل واحد.",
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      className="flex items-start gap-3 rounded-sm border p-4"
                      style={{
                        borderColor: "var(--iw-error)",
                        backgroundColor: "color-mix(in oklab, var(--iw-error) 8%, transparent)",
                      }}
                    >
                      <div className="text-xs text-[var(--iw-error)]">
                        <p className="font-bold">
                          {t("Submission Error", "تعذر إرسال الطلب مؤقتاً")}
                        </p>
                        <p className="mt-1 text-[var(--iw-text-secondary)] leading-relaxed">
                          {t(
                            "An unexpected issue occurred. Please try again or reach our engineering desk directly via WhatsApp.",
                            "حدث خطأ غير متوقع. يُرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر واتساب.",
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

