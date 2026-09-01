import { createFileRoute } from "@tanstack/react-router";

const TITLE = "Privacy Notice — Infeworks";
const DESC =
  "How Infeworks collects, uses, and retains information submitted through this website.";

export const Route = createFileRoute("/$locale/privacy")({
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
  component: PrivacyPage,
});

const SECTIONS: { en: [string, string]; ar: [string, string] }[] = [
  {
    en: [
      "Information We Collect",
      "When you submit the contact form, we collect your client type, the type of work required, the project site location, your email address, your project requirements message, and the timestamp. We do not request national identifiers, payment details, or sensitive banking credentials through this website.",
    ],
    ar: [
      "البيانات التي نجمعها",
      "عند إرسال نموذج التواصل، نجمع نوع الجهة، ونوع العمل المطلوب، وموقع المشروع، وبريدك الإلكتروني، وتفاصيل المتطلبات الفنية، ووقت الإرسال. لا نطلب أرقام هوية أو بيانات سداد أو مستندات مصرفية سرية من خلال هذا الموقع.",
    ],
  },
  {
    en: [
      "How We Use Your Information",
      "Submissions are used solely to review technical project enquiries, respond with designated engineering personnel, and prepare tailored technical or commercial proposals where relevant. We do not sell information and we do not use your contact details for third-party advertising.",
    ],
    ar: [
      "كيفية استخدام البيانات",
      "تُستخدم الرسائل والطلبات فقط لدراسة الاستفسارات الفنية والتواصل المباشر مع مهندسينا المختصين وإعداد العروض الفنية والمالية المناسبة. لا نقوم ببيع البيانات أو استخدامها في أغراض دعائية خارجية.",
    ],
  },
  {
    en: [
      "Data Retention & Security",
      "Enquiry records are securely retained for the duration necessary to conclude technical and contract-related correspondence, and are then archived or deleted in accordance with internal compliance protocols.",
    ],
    ar: [
      "مدة الاحتفاظ وأمان البيانات",
      "يُحتفظ بسجلات المراسلات بأمان للمدة اللازمة لإتمام المشاورات الفنية والتعاقدية، ثم تُؤرشف أو تُحذف وفقًا لبروتوكولات الامتثال الداخلي للشركة.",
    ],
  },
  {
    en: [
      "Engineering Inquiries & Contact",
      "For any inquiry or update request regarding your submitted information, write directly to info@infeworks.com citing your company name and submission reference.",
    ],
    ar: [
      "التواصل والاستفسارات",
      "لأي استفسار أو طلب تحديث متعلق بالبيانات المقدمة، يُرجى التواصل مباشرة عبر info@infeworks.com مع ذكر اسم شركتكم وموضوع المراسلة.",
    ],
  },
];

function PrivacyPage() {
  const { locale } = Route.useParams();
  const isAr = locale === "ar";
  const t = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div style={isAr ? { fontFamily: "var(--font-arabic)" } : undefined}>
      <section className="iw-section-dark">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-16 md:px-10 md:pt-40">
          <p className="label-mono" style={{ color: "var(--iw-dark-accent)" }}>
            {t("Legal & Compliance", "الامتثال القانوني")}
          </p>
          <h1 className="display-xl mt-8 max-w-4xl text-[clamp(2rem,5vw,4rem)]">
            {t("Privacy Notice", "إشعار الخصوصية")}
          </h1>
          <p
            className="body-reading mt-6 max-w-2xl text-base"
            style={{ color: "var(--iw-dark-text-muted)" }}
          >
            {t(
              "Infeworks (International for Engineering Works) values client confidentiality and data integrity across all digital and contractual communications.",
              "تلتزم إنفيوركس (الشركة الدولية للأعمال الهندسية) بسرية بيانات العملاء وسلامة المعلومات في كافة التعاملات الرقمية والتعاقدية.",
            )}
          </p>
        </div>
      </section>

      <section className="iw-section-light">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="border-t" style={{ borderColor: "var(--iw-border)" }}>
            {SECTIONS.map((s) => {
              const [heading, body] = isAr ? s.ar : s.en;
              return (
                <div
                  key={s.en[0]}
                  className="grid gap-6 border-b py-10 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-12"
                  style={{ borderColor: "var(--iw-border)" }}
                >
                  <h2 className="display-md text-xl md:text-2xl">{heading}</h2>
                  <p className="body-reading max-w-3xl leading-relaxed text-[var(--iw-text-secondary)]">
                    {body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
