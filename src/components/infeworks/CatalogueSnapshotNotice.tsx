export default function CatalogueSnapshotNotice({
  date,
  locale,
  mediaUnavailable = false,
}: {
  date?: string | undefined;
  locale: string;
  mediaUnavailable?: boolean | undefined;
}) {
  if (!date && !mediaUnavailable) return null;
  const formatted = date
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
        dateStyle: "long",
        timeZone: "Africa/Cairo",
      }).format(new Date(date + "T12:00:00Z"))
    : "";
  return (
    <p className="mt-4 mb-6 text-sm leading-relaxed" role="status">
      {date
        ? locale === "ar"
          ? `نعرض آخر قائمة مشاريع منشورة موثّقة بتاريخ ${formatted}. التحديثات الجديدة غير متاحة مؤقتًا.`
          : `Showing the last verified published catalogue from ${formatted}. New updates are temporarily unavailable.`
        : ""}
      {mediaUnavailable
        ? locale === "ar"
          ? " بعض صور المشروعات غير متاحة مؤقتًا."
          : " Some project images are temporarily unavailable."
        : ""}
    </p>
  );
}
