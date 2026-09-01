# Extraction Queue

هذه القائمة تحدد ما ينقص للوصول إلى Knowledge Base كاملة المحتوى. وجود العنصر هنا يعني أن اسمه أو بنيته رُصدت، لكن المحتوى الداخلي لم يُحوّل بعد إلى Markdown موثق.

| Priority | Source class | Required work | Output expected |
|---|---|---|---|
| P0 | Excel BOQ / QS / estimates | قراءة الأوراق ورؤوس الأعمدة والصفوف مع الوحدات والأسعار والعملات | Markdown tables with sheet and range provenance |
| P0 | Minya Institute QS files | `حصر أعمال السور.xlsx`، `حصر الكميات.xlsx`، `حصر غرفة الحارس.xlsx`، `مقايسة للتسعير.xlsx` | Itemized quantity/pricing tables with workbook and sheet provenance |
| P0 | PDF BOQ / claims / payment certificates | استخراج النص والجداول ورقم الصفحة | Markdown sections with page citations |
| P0 | Letters / RFI / IR | استخراج التاريخ والأطراف والموضوع والقرار والحالة | decision records and correspondence timeline |
| P0 | Scanned folders | OCR ثم مراجعة عينة بشرية | OCR text with confidence and page references |
| P1 | DOCX project narratives | استخراج العناوين والجداول والحقائق | project narrative and fact table |
| P1 | DWG drawings | معاينة أو تحويل إلى metadata ورسوم مختصرة | drawing register, discipline, revision, sheet metadata |
| P1 | Minya Institute documents | `المقايسة مسعرة.doc`، `تنسيق ابراهيم تعديل مقايسة إحلال وتجديد معدلة 2026 .doc`، `مقايسة اعمال مكافحة الحريق.docx` | scope, revisions, priced/unpriced status, and source citations |
| P1 | Photos | فهرسة الصور والتاريخ والموقع والوصف المرئي | visual evidence register |
| P1 | ZIP archives | فهرسة محتويات الأرشيف دون تشغيل غير موثوق | archive manifest |
| P2 | Entity resolution | مطابقة المشاريع المتكررة حسب العقد والموقع والوثائق | relationship graph with confidence |
| P2 | Company references | قراءة سابقة الأعمال والموردين ونماذج الشركة | company knowledge layer |

## Completion gate

لا يُعلن عن مشروع بأنه `fully documented` إلا إذا كان له ملف Markdown يحتوي على هوية المشروع، وملخصًا مستخرجًا، وخريطة وثائق، وجدول حقائق، ومرجع صفحة/ورقة لكل قيمة فنية أو مالية مهمة.
