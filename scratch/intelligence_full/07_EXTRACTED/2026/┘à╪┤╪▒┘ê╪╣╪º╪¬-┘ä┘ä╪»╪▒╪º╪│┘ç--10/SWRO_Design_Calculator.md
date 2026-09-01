---
type: extracted_document
source_name: SWRO_Design_Calculator.xlsx
source_extension: .xlsx
source_path: 01- Master/2026/مشروعات للدراسه -10/02- منتجع ابو غزاله الساحل الشمالي/Calculations/SWRO_Design_Calculator.xlsx
source_url: https://infeworks.sharepoint.com/sites/InfeworksFiles/_layouts/15/Doc.aspx?sourcedoc=%7B86C9AA0F-DF42-4831-B814-75336533EE85%7D&file=SWRO_Design_Calculator.xlsx&action=default&mobileredirect=true
source_id: 01TC5FCYAPVLEYMQW7GFELQFDVGNSTH3UF
size_bytes: 24091
last_modified: 2026-02-17T10:51:54Z
extraction_status: extracted
---

# SWRO_Design_Calculator.xlsx

> هذا المحتوى مستخرج آليًا من الملف الأصلي. يجب الرجوع إلى المصدر عند الاعتماد على رقم أو قيمة.


## Sheet: SWRO Design

| General Data |  |  |  |
| --- | --- | --- | --- |
| Parameter | Input | Unit |  |
| Plant Capacity | 1000 | m3/day |  |
| Operating Hours | 24 | hr/day |  |
| Feed TDS | 42000 | ppm |  |
| Recovery | 38 | % |  |
| System Type | Single Pass SWRO |  |  |
| Membrane Size | 8 | inch |  |
| Membrane area | 37.1 | m2 |  |
| Flux (Product(L/h)/membrane(m2) | 17.1 | LMH |  |
| Flow Calculations |  |  |  |
| Parameter | Formula / Note | Value | Unit |
| Product Flow | Plant Capacity / Operating Hours | =B3/B4 | m3/h |
| Feed Flow | Product Flow / (Recovery/100) | =C14/(B6/100) | m3/h |
| Reject Flow | Feed Flow - Product Flow | =C15-C14 | m3/h |
| Flow per Membrane  | Product Flow / Number of Membranes | =B10*B9/1000 | m3/h |
| Number of Membranes | (plant capacity/h)/flow per membrane | =C14/C17 |  |
| Actual Number of Membranes | Rounded multiblier of 6 | =MROUND(C18,6) |  |
| Number of Vessels | Number of membranes / 6 | =C19/6 |  |
| High Pressure Pump + ERD |  |  |  |
| Parameter | Formula / Note | Value | Unit |
| Pump Flow | Total feed flow  | =C15 | m3/h |
| osmotic pressure | TDS/1300 | =B5/1300 | bar |
| Driving pressure | Sea Water | =IF(B26="Sea Water", 25,10) | bar |
| Membrane pressure | Membrane requierd pressure | =C26+C25+3 | bar |
| Pump Efficiency | efficiency | 0.85 |  |
| HPP Power | feed flow* pressure/effic*36 | =(C24*C27)/(C28*36) | KW |
| Turbocharger efficiency | efficiency | 0.85 |  |
| Turbocharger pressure | Rejected preussre*turbo efficiency | =(C27*0.5)*C30 | bar |
| Pump Operating Pressure | HPP pressure | =C27-C31 | bar |
| Power recoverd | feed flow*turbo pressure/effic*36 | =(C24*C31)/(C28*36) | kW |
| Power with ERD | HPP power-power recoverd | =C29-C33 | kW |
| Filtration Design (Sand Filters) |  |  |  |
| Parameter | Formula / Note | Formula / Calculated | Unit |
| Number of Filters | requierd filter num | 2 |  |
| Filter Diameter | Pressure filter | 2.5 | m  |
| Flow per Filter |  | =C15/C38 | m3/h |
| Filter Area |  | =(C39/2)^2*3.14 | m2 |
| Filtration Rate | flow per filter/filter area (8-14) | =C40/C41 | m3/m2/h |
| Backwash Rate | flow per filter*0.5 | =C40*0.53 | m3/m2/h |
| Backwash flow | backwash flow*area | =C43*C41 | m3/h |
| Backwash pressure |  | 36 | m |
| Backwash tank | back wash time 7 min | =C44*0.035 | m3 |
| Cartridge Filters |  |  |  |
| Parameter | Formula / Note | Formula / Calculated | Unit |
| Flow per Cartridge | total flow | =C15 | m3/h |
| Flow per Cartridge (L/min) | flow per catridge*16.67 | =C50*16.67 | L/min |
| Filtration Rate |  | 5 | m3/h |
| Length |  | 40 | inch |
| Number of Cartridges | feed flow / filtration rate | =C50/C52 | bar |
| Number of housing | 12 | =ROUNDUP(C54/B55,0) |  |
| Filtration Rate Check | total flow/num of cartridge | =C50/(C55*B55) | m3/h |
| Filter Rating |  | 5 |  μm |
