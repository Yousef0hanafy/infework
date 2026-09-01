# SharePoint Extraction Limits

## Verified access

تمت استعادة جلسة My Browser، وتم فتح `01- Master` والسنوات والمشاريع ومجلدات QS داخل SharePoint بنجاح.

## Verified metadata extraction

يمكن قراءة أسماء المجلدات والملفات، المسارات، تواريخ التعديل، والمستخدم المعدّل. كما أمكن استخدام SharePoint REST للقراءة فقط لاستخراج `ServerRelativeUrl` و`UniqueId` و`ListItemId` لملف DOCX.

## Content extraction result

Word Online يفتح الملف داخل WOPI، لكن طبقة القراءة النصية لا تعرض محتوى المستند. محاولات CheckFileInfo والتنزيل المؤقت عبر WOPI/download.aspx أعادت 401/500 عند تنفيذها من بيئة المعالجة. لم يتم الاحتفاظ بأي ملف خام من SharePoint، ولم تُضمّن أي بيانات خام في الحزمة.

## Consequence for AI knowledge

أي قيمة أو كمية أو نص داخل DOCX/Excel/PDF/Scan لم يظهر في طبقة القراءة يبقى `unknown` أو `metadata_only`. لا يجوز تحويل اسم الملف أو وجود مجلد QS/BOQ إلى قيمة مالية أو كمية أو حالة تنفيذ. يلزم موصل Microsoft Graph/SharePoint API صالح أو مسار استخراج سحابي مصرح به لإكمال الطبقة التفصيلية.
