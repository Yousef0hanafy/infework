// A quiet provenance line for the catalogue. Pass `date` only where the whole catalogue is
// listed; individual pages show the media note alone.
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
    <p className="mt-4 mb-6 text-xs leading-relaxed opacity-70">
      {date
        ? locale === "ar"
          ? `قائمة المشروعات المنشورة بتاريخ ${formatted}.`
          : `Published catalogue as of ${formatted}.`
        : ""}
      {mediaUnavailable
        ? locale === "ar"
          ? " بعض صور المشروعات غير متاحة مؤقتًا."
          : " Some project images are temporarily unavailable."
        : ""}
    </p>
  );
}
