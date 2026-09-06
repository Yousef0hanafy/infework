# Project Intelligence Index

هذه هي نقطة الدخول للمرحلة الثانية. تشمل كل المسارات العليا في Master من Before 2020 حتى 2026 وPumping Room. تم فصل الدراسة والـpipeline عن المشاريع والمراجع التاريخية حتى لا تختلط في إجابات AI.

| Classification | Meaning | Count |
|---|---|---:|
| `candidate_actual_or_ongoing` | مشروع مرشح للتنفيذ أو جارٍ ويحتاج تثبيتًا من أدلة التنفيذ | 42 |
| `historical_or_operational_reference` | مرجع تاريخي أو تشغيلي خارج التقسيم الزمني | 8 |
| `study` | مسار موسوم للدراسة | 6 |

## Navigation

- `02_ALL_PROJECTS/` — بطاقة Markdown مستقلة لكل مسار مصنف.
- `07_EXTRACTED/` — نصوص وجداول DOCX/XLSX/XLS المستخرجة.
- `07_EXTRACTED_PDF/` — نصوص PDF المستخرجة.
- `02_PROJECT_INTELLIGENCE_PROJECT_SCHEMA.md` — مخطط الحقول الموحد.
- `99_REVIEW_QUEUE/` — الملفات التي تحتاج OCR أو استخراجًا متخصصًا.

## Evidence rule

وجود سجل في هذا الفهرس يثبت وجود المسار في Master فقط. تثبيت أن المشروع نُفذ أو ما زال جاريًا يحتاج وثيقة تسليم أو تقدم أو محضرًا أو مستندًا تعاقديًا مباشرًا. لا تُستخدم أسماء المجلدات لإثبات العميل أو القيمة أو الكمية أو الأداء.

## Current extraction coverage

تم استخراج محتوى 2,485 ملف Office و299 ملف PDF في دفعات سحابية، وتوجد الروابط إلى هذه الملفات داخل سجلات المشاريع عندما يتطابق `source_path`. ملفات CAD والصور والمسوح وبعض الملفات الكبيرة تبقى في review queue.
