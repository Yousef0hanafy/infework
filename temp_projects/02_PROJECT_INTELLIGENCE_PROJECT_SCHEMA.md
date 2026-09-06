# Project Intelligence Record Schema

## Purpose

هذا المخطط هو العقد الموحد لكل مشروع داخل المرحلة الثانية. لا يُعتبر الحقل مكتملًا إلا إذا احتوى على قيمة، ومصدر، ومستوى دليل، وتاريخ آخر تحقق.

## Required sections

| Section | Fields | Evidence requirement |
|---|---|---|
| Identity | project_id, canonical_name, original_names, year, aliases | الاسم والمسار؛ الدمج يحتاج دليلًا إضافيًا |
| Lifecycle | status, status_date, status_reason | مستند تنفيذ/تسليم/تقدم؛ اسم المجلد وحده غير كافٍ |
| Customer and parties | client, owner, consultant, contractor, partners | عقد أو خطاب أو مستند رسمي |
| Geography | country, governorate, city, site, coordinates | عنوان أو مستند مشروع |
| Contract | contract_number, contract_type, award_date, start_date, planned_finish, actual_finish | عقد/أمر إسناد/مراسلة رسمية |
| Scope | problem, objectives, work_packages, exclusions, interfaces | نطاق عمل أو مواصفات أو محضر |
| Technical | systems, equipment, capacity, standards, tests | مواصفة أو جدول أو تقرير فني |
| Quantities | item, description, unit, quantity, rate, amount, sheet/page | BOQ/QS أو جدول مصدر مباشر |
| Commercial | currency, contract_value, variations, costs, margin, payment_status | مستند مالي معتمد؛ لا تخمين |
| Delivery | milestones, progress, delays, risks, issues, NCRs, approvals | تقارير تقدم ومحاضر ومراسلات |
| Handover | commissioning, acceptance, O&M, warranty, closeout | محضر استلام/تشغيل/ضمان |
| People and suppliers | team, roles, suppliers, subcontractors | مستندات المشروع أو دليل داخلي |
| Reuse | capabilities, reference_value, similar_projects, lessons | استنتاج معلّم أو دليل ختامي |
| Evidence | source_file, source_path, page/sheet, quote, evidence_level | مطلوب لكل claim مهم |

## Status vocabulary

- `executed`: دليل تسليم أو إغلاق أو تشغيل نهائي.
- `ongoing`: دليل تنفيذ أو تقدم حديث.
- `historical`: مشروع سابق موثق دون حالة حالية مؤكدة.
- `study`: دراسة أو تصميم أو بحث غير مثبت التنفيذ.
- `pipeline`: عرض أو تسعير أو فرصة قبل التعاقد.
- `operational_reference`: مرجع تشغيلي أو CAD وليس مشروعًا مستقلًا.
- `unknown`: لا تكفي الأدلة.

## Evidence levels

`extracted` للمحتوى المقروء من الملف نفسه، `observed_metadata` للاسم والمسار والـmetadata، `derived` للاستنتاج، و`unknown` لغياب الدليل. يجب ألا تُستخدم القيم `derived` أو `observed_metadata` وحدها لإثبات قيمة عقد أو تنفيذ أو نتيجة أداء.
