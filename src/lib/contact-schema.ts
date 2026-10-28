import { z } from "zod";

export function createContactFormSchema(isAr: boolean) {
  const t = (en: string, ar: string) => (isAr ? ar : en);
  return z
    .object({
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
      organization: z.string().trim().max(150).default(""),
      audience_type: z.string().trim().max(50).default(""),
      need_type: z.string().trim().max(50).default(""),
      location_text: z.string().trim().max(150).default(""),
      capacity: z.string().trim().max(150).default(""),
      supplier_category: z.string().trim().max(200).default(""),
      website: z.string().trim().max(300).default(""),
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
      honeypot: z.string().max(500).default(""),
    })
    .superRefine((data, ctx) => {
      for (const field of data.inquiry_type === "technical"
        ? (["audience_type", "need_type"] as const)
        : data.inquiry_type === "supplier"
          ? (["supplier_category"] as const)
          : []) {
        if (!data[field].trim())
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: t("Please select an option.", "يُرجى اختيار أحد الخيارات."),
          });
      }
    });
}
