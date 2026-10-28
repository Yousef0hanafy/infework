export default function CatalogueSnapshotNotice({
  date,
  locale,
}: {
  date?: string | undefined;
  locale: string;
}) {
  if (!date) return null;
  const formatted = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "long",
    timeZone: "Africa/Cairo",
  }).format(new Date(date + "T12:00:00Z"));
  return (
    <p className="mt-4 mb-6 text-sm leading-relaxed" role="status">
      {locale === "ar"
        ? `نعرض آخر قائمة مشاريع منشورة موثّقة بتاريخ ${formatted}. التحديثات الجديدة غير متاحة مؤقتًا.`
        : `Showing the last verified published catalogue from ${formatted}. New updates are temporarily unavailable.`}
    </p>
  );
}
