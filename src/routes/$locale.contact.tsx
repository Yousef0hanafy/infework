import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { submitContact } from "@/lib/contact.functions";

const TITLE = "Contact Infeworks — Start a Water Infrastructure Project";
const DESC =
  "Talk to Infeworks about design, execution, O&M, or turnkey delivery of water and wastewater infrastructure in Egypt.";

export const Route = createFileRoute("/$locale/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const WHATSAPP = "https://wa.me/201006249420";

const AUDIENCE = [
  { value: "state", en: "State", ar: "جهة حكومية" },
  { value: "industrial", en: "Industrial", ar: "قطاع صناعي" },
  { value: "agricultural", en: "Agricultural", ar: "قطاع زراعي" },
  { value: "other", en: "Other", ar: "أخرى" },
] as const;

const NEED = [
  { value: "design", en: "Design", ar: "تصميم" },
  { value: "execution", en: "Execution", ar: "تنفيذ" },
  { value: "om", en: "Operation & Maintenance", ar: "تشغيل وصيانة" },
  { value: "turnkey", en: "Turnkey", ar: "تسليم مفتاح" },
  { value: "other", en: "Other", ar: "أخرى" },
] as const;

function buildSchema(isAr: boolean) {
  const t = (en: string, ar: string) => (isAr ? ar : en);
  return z.object({
    audience_type: z.enum(["state", "industrial", "agricultural", "other"], {
      errorMap: () => ({
        message: t("Select a client type.", "اختر نوع الجهة."),
      }),
    }),
    need_type: z.enum(["design", "execution", "om", "turnkey", "other"], {
      errorMap: () => ({
        message: t("Select the type of work.", "اختر نوع العمل."),
      }),
    }),
    location_text: z
      .string()
      .trim()
      .max(200, t("Keep this under 200 characters.", "الحد الأقصى 200 حرف.")),
    email: z
      .string()
      .trim()
      .email(t("Enter a valid email address.", "أدخل بريدًا إلكترونيًا صحيحًا."))
      .max(255),
    message: z
      .string()
      .trim()
      .min(
        10,
        t(
          "Please describe the requirement (at least 10 characters).",
          "يُرجى وصف المطلوب (10 أحرف على الأقل).",
        ),
      )
      .max(2000, t("Maximum 2000 characters.", "الحد الأقصى 2000 حرف.")),
    consent: z.literal(true, {
      errorMap: () => ({
        message: t(
          "Consent is required to submit.",
          "الموافقة مطلوبة لإرسال الرسالة.",
        ),
      }),
    }),
    honeypot: z.string().max(0),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

const fieldClass =
  "w-full border bg-[var(--iw-surface)] px-4 py-3 text-base outline-none focus:border-[var(--iw-accent)]";

function ContactPage() {
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(buildSchema(isAr)),
    defaultValues: {
      location_text: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const result = await send({ data: values });
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const errorText = (msg?: string) =>
    msg ? (
      <p className="label-mono mt-2" style={{ color: "var(--iw-error)" }}>
        {msg}
      </p>
    ) : null;

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-20 md:px-10 md:pt-40">
          <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
            {t("Contact", "تواصل")}
          </p>
          <h1 className="display-xl mt-8 max-w-4xl text-[clamp(2rem,5.5vw,4.5rem)]">
            {t("Tell us about your project.", "أخبرنا عن متطلبات مشروعك.")}
          </h1>
          <p
            className="body-reading mt-8 max-w-2xl text-lg"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {t(
              "Tell us the client type, the scope you need, and the site location. We reply with a technical point of contact — not a sales queue.",
              "أخبرنا بنوع الجهة، ونطاق العمل المطلوب، وموقع المشروع. سنرد بجهة اتصال فنية مسؤولة، لا رد تجاري عام.",
            )}
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-sm px-7 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--iw-accent)",
              color: "#ffffff",
            }}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t("Chat on WhatsApp", "تحدث على واتساب")}
          </a>
        </div>
      </section>

      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-16">
            <div>
              <h2 className="label-mono text-[var(--iw-text-secondary)]">
                {t("Direct communication", "التواصل المباشر")}
              </h2>
              <div className="mt-6 space-y-3">
                <p className="body-reading text-sm text-[var(--iw-text-secondary)]">
                  <span className="label-mono block text-xs opacity-75">{t("Email", "البريد الإلكتروني")}</span>
                  <a
                    href="mailto:info@infeworks.com"
                    className="transition-colors hover:text-[var(--iw-accent)]"
                  >
                    info@infeworks.com
                  </a>
                </p>
                <p className="body-reading text-sm text-[var(--iw-text-secondary)]">
                  <span className="label-mono block text-xs opacity-75">{t("Direct / WhatsApp", "الهاتف / واتساب")}</span>
                  <a
                    href="tel:+201006249420"
                    dir="ltr"
                    className="inline-block transition-colors hover:text-[var(--iw-accent)]"
                  >
                    +20 100 624 9420
                  </a>
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="max-w-2xl"
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="audience_type"
                    className="label-mono block text-[var(--iw-text-secondary)]"
                  >
                    {t("Client type", "نوع الجهة")}
                  </label>
                  <select
                    id="audience_type"
                    className={`${fieldClass} mt-3`}
                    style={{ borderColor: "var(--iw-border)" }}
                    defaultValue=""
                    {...register("audience_type")}
                  >
                    <option value="" disabled>
                      {t("Select…", "اختر…")}
                    </option>
                    {AUDIENCE.map((o) => (
                      <option key={o.value} value={o.value}>
                        {isAr ? o.ar : o.en}
                      </option>
                    ))}
                  </select>
                  {errorText(errors.audience_type?.message)}
                </div>

                <div>
                  <label
                    htmlFor="need_type"
                    className="label-mono block text-[var(--iw-text-secondary)]"
                  >
                    {t("Type of work", "نوع العمل")}
                  </label>
                  <select
                    id="need_type"
                    className={`${fieldClass} mt-3`}
                    style={{ borderColor: "var(--iw-border)" }}
                    defaultValue=""
                    {...register("need_type")}
                  >
                    <option value="" disabled>
                      {t("Select…", "اختر…")}
                    </option>
                    {NEED.map((o) => (
                      <option key={o.value} value={o.value}>
                        {isAr ? o.ar : o.en}
                      </option>
                    ))}
                  </select>
                  {errorText(errors.need_type?.message)}
                </div>

                <div>
                  <label
                    htmlFor="location_text"
                    className="label-mono block text-[var(--iw-text-secondary)]"
                  >
                    {t("Site location", "موقع المشروع")}
                  </label>
                  <input
                    id="location_text"
                    type="text"
                    className={`${fieldClass} mt-3`}
                    style={{ borderColor: "var(--iw-border)" }}
                    placeholder={t("Governorate / city", "المحافظة / المدينة")}
                    {...register("location_text")}
                  />
                  {errorText(errors.location_text?.message)}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="label-mono block text-[var(--iw-text-secondary)]"
                  >
                    {t("Email", "البريد الإلكتروني")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    dir="ltr"
                    className={`${fieldClass} mt-3`}
                    style={{ borderColor: "var(--iw-border)" }}
                    {...register("email")}
                  />
                  {errorText(errors.email?.message)}
                </div>
              </div>

              <div className="mt-8">
                <label
                  htmlFor="message"
                  className="label-mono block text-[var(--iw-text-secondary)]"
                >
                  {t("Requirement", "تفاصيل الطلب")}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className={`${fieldClass} mt-3 resize-y`}
                  style={{ borderColor: "var(--iw-border)" }}
                  placeholder={t(
                    "Capacity, process, timeline, and any consultant involved.",
                    "الطاقة المطلوبة، والمعالجة، والجدول الزمني، والاستشاري إن وُجد.",
                  )}
                  {...register("message")}
                />
                {errorText(errors.message?.message)}
              </div>

              {/* Honeypot — hidden from users and assistive tech */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="bot_field">Leave this field empty</label>
                <input
                  id="bot_field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("honeypot")}
                />
              </div>

              <div className="mt-8 flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  style={{ accentColor: "var(--iw-accent)" }}
                  {...register("consent")}
                />
                <div>
                  <label htmlFor="consent" className="body-reading text-sm">
                    {t(
                      "I agree that Infeworks may use the information above to respond to this enquiry.",
                      "أوافق على استخدام إنفيوركس للبيانات أعلاه للرد على هذا الطلب.",
                    )}{" "}
                    <Link
                      to="/$locale/privacy"
                      params={{ locale }}
                      className="underline"
                      style={{ color: "var(--iw-accent)" }}
                    >
                      {t("Privacy Notice", "إشعار الخصوصية")}
                    </Link>
                  </label>
                  {errorText(errors.consent?.message)}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-10 inline-flex items-center rounded-sm px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:bg-[var(--iw-accent-hover)] hover:-translate-y-0.5 disabled:opacity-60"
                style={{ backgroundColor: "var(--iw-accent)", color: "#ffffff" }}
              >
                {isSubmitting
                  ? t("Sending…", "جارٍ الإرسال…")
                  : t("Send enquiry", "إرسال الطلب")}
              </button>

              <div aria-live="polite">
                {status === "success" && (
                  <p
                    className="body-reading mt-8 border-s-2 ps-4"
                    style={{
                      borderColor: "var(--iw-success)",
                      color: "var(--iw-success)",
                    }}
                  >
                    {t(
                      "Received. A technical contact will reply to the email you provided.",
                      "تم الاستلام. سيتم الرد من جهة اتصال فنية على البريد الذي أدخلته.",
                    )}
                  </p>
                )}
                {status === "error" && (
                  <p
                    className="body-reading mt-8 border-s-2 ps-4"
                    style={{
                      borderColor: "var(--iw-error)",
                      color: "var(--iw-error)",
                    }}
                  >
                    {t(
                      "Something went wrong. Please try again, or reach us on WhatsApp.",
                      "حدث خطأ ما. يُرجى المحاولة مرة أخرى أو التواصل عبر واتساب.",
                    )}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
