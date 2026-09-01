# Source Index

## SharePoint root

| Source ID | Path | Content observed | Current state |
|---|---|---|---|
| SRC-ROOT | `01- Master` | 2020–2026، Before 2020، Pumping Room | root inventory complete |
| SRC-2020 | `01- Master/2020` | 7 project folders | root inventory complete |
| SRC-2021 | `01- Master/2021` | project folders including Amerya cold stores | partial inventory |
| SRC-2022 | `01- Master/2022` | projects and standalone files | partial inventory |
| SRC-2023 | `01- Master/2023` | projects and technical items | partial inventory |
| SRC-2024 | `01- Master/2024` | projects, procurement, standalone files | partial inventory |
| SRC-2025 | `01- Master/2025` | projects, spreadsheets, PDFs, archives | partial inventory |
| SRC-2026 | `01- Master/2026` | projects, DWG, QS, priced files | partial inventory |
| SRC-HIST | `01- Master/Before 2020` | historical projects and company references | root inventory observed |
| SRC-PUMP | `01- Master/Pumping Room` | BAK and DWG engineering references | root inventory observed |

## Extraction state vocabulary

`root_inventory` means the root listing was read. `structure_read` means a project or folder was opened and its children were read. `content_extracted` means the file itself was opened and its text/table content was extracted. `ocr_required` means the source is scanned or image-based. `cad_required` means the source is DWG or another CAD format. `review_required` means a human must validate the result.

## Source handling rule

كل رابط أو مسار في هذه القاعدة يعاد إلى SharePoint كما ظهر في المصدر. لا تُنسخ البيانات الخام إلى هذه الحزمة، ولا يُفترض أن يكون تاريخ التعديل هو تاريخ المشروع.
