---
type: extracted_document
source_name: Cost estimation form Bianchi.xlsx
source_extension: .xlsx
source_path: 01- Master/2026/05- Bianchi/5- Infrastructure/2026-03-09 Infrastructure Tender Package/Cost Estimation/Cost estimation form Bianchi.xlsx
source_url: https://infeworks.sharepoint.com/sites/InfeworksFiles/_layouts/15/Doc.aspx?sourcedoc=%7B2C175B96-CC3C-48CF-9A7D-A3C6DE014C61%7D&file=Cost%20estimation%20form%20Bianchi.xlsx&action=default&mobileredirect=true
source_id: 01TC5FCYEWLMLSYPGMZ5EJU7NDY3PACTDB
size_bytes: 191203
last_modified: 2026-08-23T08:12:20Z
extraction_status: extracted
---

# Cost estimation form Bianchi.xlsx

> هذا المحتوى مستخرج آليًا من الملف الأصلي. يجب الرجوع إلى المصدر عند الاعتماد على رقم أو قيمة.


## Sheet: Top Sheet

|  |  | PROJECT NAME: | Bianci |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | TENDER STUDY REPORT |  |  |  |  | SUMMARY |  |  |
|  |  | INDIRECT OVERHEADES | 0 |  |  | DIV. NAME | DIRECT COST | AMOUNT |
| =D5*$H$26 | 1 | PERFORMANCE BOND COST | 0 |  |  | HVAC | =HVAC!Q20 | =HVAC!F20 |
| =D6*$H$26 | 2 | ADVANCED PAYMENT COST | 0.006 |  |  | FIREFIGHTING | =FF!Q23 | =FF!F23 |
| =D7*$H$26 | 3 | CONTRACTING SALES TAX | 0 |  |  | PLUMBING | =PLUMBING!Q38 | =PLUMBING!F38 |
| =D8*$H$26 | 4 | SOCIAL INSURANCE | 0.036 |  |  | CIVIL | =CIVIL!Q115 | =CIVIL!F115 |
| =D9*$H$26 | 5 | ADDITIONAL SALES TAX | 0.006 |  |  | ELECTRICAL | =ELEC.!Q299 | =ELEC.!F299 |
| =D10*$H$26 | 6 | STAMP DUTIES | 0.05 |  |  | INFRASTRUCTURE | =INFRA!Q68 | =INFRA!F68 |
| =D11*$H$26 | 7 | ADDITIONAL STAMP DUTIES | 0.01 |  |  | IRRIGATION | =IRRIGATION!Q9 | =IRRIGATION!F9 |
| =D12*$H$26 | 8 | RISK OF LUMPSUM | 0.01 |  |  | LANDSCAPE | =LANDSCAPE!Q93 | =LANDSCAPE!F93 |
| =D13*$H$26 | 9 | RISK OF DELAY | 0 |  |  | HARDSCAPE | =HARDSCAPE!Q68 | =HARDSCAPE!F68 |
| =D14*$H$26 | 10 | RISK FOR PRICES FLCTUATUION | 0.015 |  |  | ARCHITECTURE | =ARCHITECTURE!Q82 | =ARCHITECTURE!F82 |
| =D15*$H$26 | 11 | FINANCIAL COSTS | 0.02 |  |  |  |  |  |
| =D16*$H$26 | 12 | DESIGN FEES | 0 |  |  |  |  |  |
| =D17*$H$26 | 13 | HEAD OFFICE | 0.03 |  |  |  |  |  |
| =D18*$H$26 | 14 | NET PROFIT | 0.05 |  |  |  |  |  |
| =D19*$H$26 | 15 | NEGOTIATION FACTOR | 0 |  |  |  |  |  |
| =SUM(A5:A19) |  | Margin % | =SUM(D4:D19) |  |  |  |  |  |
|  |  | GP | =SUM(D13:D19) |  |  | Avarage Multiplier Calc. |  |  |
|  |  |  |  |  |  | Direct Cost | =HVAC!Q20+FF!Q23+PLUMBING!Q38+CIVIL!Q115+ELEC.!Q299+INFRA!Q68+IRRIGATION!Q9+LANDSCAPE!Q93+HARDSCAPE!Q68+ARCHITECTURE!Q82 | EGP |
|  |  |  |  |  |  | Indirect Cost | =Indirect!D20 | EGP |
|  |  |  |  |  |  | Total | =H24+H23 | EGP |
|  |  | Margin %= | (selling-cost)/selling |  |  | Project value | =H25/(1-$D$20) | EGP |
|  |  | Margin %*selling = | selling-Cost |  |  | Avarage Multiplier | =(H26/H23) |  |
|  |  | Cost = | Selling - Margin % * Selling  |  |  |  |  |  |
|  |  | Cost =  | 1-Margin % ( Selling ) |  |  |  |  |  |
|  |  | Cost / (1-Margin % ) = | Selling |  |  |  |  |  |
|  |  | =H25/(1-$D$20) | Selling |  |  |  |  |  |

## Sheet: Indirect

|  | PROJECT DURATION |  | 24 | MONTHS |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | ITEM | VALUE/MONTH | VALUE | % From Total | % from PV |  |  |  |  |  |  |  |
|  | 1-Technical Staff | =E34 | =C4*$D$2 | =D4/$D$20 | =(D4+D5)/'Top Sheet'!$H$26 |  |  |  |  |  |  |  |
|  | 2-Admin Staff | =E41 | =C5*$D$2 | =D5/$D$20 |  |  |  |  |  |  |  |  |
|  | 3-Eng Requirements | =E46 | =C6*$D$2 | =D6/$D$20 | =(D6/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 4-Temporary offices & facilities | =E52 | =C7*$D$2 | =D7/$D$20 | =(D7/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 5- Appartments rental | =E60 | =C8*$D$2 | =D8/$D$20 | =(D8/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 6-IT cost | =E67 | =C9*$D$2 | =D9/$D$20 | =(D9/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 7-Vehicles for Staff | =E75 | =C10*$D$2 | =D10/$D$20 | =(D10/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 8-Electricity for site | =E82 | =C11*$D$2 | =D11/$D$20 | =(D11/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 9-Safety requirements | =E89 | =C12*$D$2 | =D12/$D$20 | =(D12/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 10-Mob. And Demob. | =E95 | =C13*$D$2 | =D13/$D$20 | =(D13/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 11-General site equipments | =E104 | =C14*$D$2 | =D14/$D$20 | =(D14/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 12-Site Security (by Bedwins) | 0 | =C15*$D$2 | =D15/$D$20 | =(D15/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 13-  Overtime | =L28 | =C16*$D$2 | =D16/$D$20 | =(D16/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 14- Engineer Overtime | =L29 | =C17*$D$2 | =D17/$D$20 | =(D17/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 15- Food Allowance | =L33 | =C18*$D$2 | =D18/$D$20 | =(D18/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | 16- Transportation Fees | =L34 | =C19*$D$2 | =D19/$D$20 | =(D19/'Top Sheet'!$H$26) |  |  |  |  |  |  |  |
|  | TOTAL |  | =SUM(D4:D19) | =SUM(E4:E19) | =SUM(F4:F19) |  |  |  |  |  |  |  |
|  |  |  | =D20/D2 | EGP/month |  |  |  |  |  |  |  |  |
|  | 1- Technical Staff |  |  |  |  |  |  | Overtime & Engineer overtime |  |  |  |  |
|  | DESCRIPTION | NO. OF STAFF | SALARY  | TOTAL |  |  |  | DESCRIPTION | NO. OF STAFF | Amount | TOTAL |  |
|  | Project Manager | 1 | 70000 | =D28*C28 |  |  |  | Overtime | =SUM(C31:C33,C38:C40) | 2500 | =K28*J28 |  |
|  | Sr. Site Engineer | 3 | 50000 | =D29*C29 |  |  |  | Engineer overtime | =SUM(C28:C30) | 5000 | =K29*J29 |  |
|  | Jr. Site Engineer | 5 | 25000 | =D30*C30 |  |  |  |  |  |  |  |  |
|  | Site Supervisors | 5 | 20000 | =D31*C31 |  |  |  | Food allowance & Transportation fees |  |  |  |  |
|  | Labours | 15 | 10000 | =D32*C32 |  |  |  | DESCRIPTION | NO. OF STAFF | Amount | TOTAL |  |
|  | Surveyors+Surveying labor | 3 | 30000 | =D33*C33 |  |  |  | Food allowance | =SUM(C28:C33,C38:C40) | 350 | =K33*J33*26 |  |
|  | TOTAL |  |  | =SUM(E28:F33) |  |  |  | Transportation fees | =SUM(C28:C33,C38:C40) | 650 | =K34*J34 |  |
|  | 2- Admin Staff |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | NO. OF STAFF | SALARY  | TOTAL |  |  |  |  |  |  |  |  |
|  | Document control | 2 | 20000 | =D38*C38 |  |  |  |  |  |  |  |  |
|  | Accountant | 1 | 25000 | =D39*C39 |  |  |  |  |  |  |  |  |
|  | Storekeeper | 2 | 15000 | =D40*C40 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E38:F40) |  |  |  |  |  |  |  |  |
|  | 3- Eng. Requirments |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL |  |  |  |  |  |  |  |  |
|  | unseen general expenses | 1 | 20000 | =D45*C45 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E45:F45) |  |  |  |  |  |  |  |  |
|  | 4- Temp. offices & facilites |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL/MONTH |  |  |  |  |  |  |  |  |
|  | Site offices | 3 | 150000 | =(C50*D50)/$D$2 |  |  |  |  |  |  |  |  |
|  | Store | 2 | 100000 | =(C51*D51)/$D$2 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E50:F51) |  |  |  |  |  |  |  |  |
|  | 5- Appart. Rental |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL |  |  |  |  |  |  |  |  |
|  | Apartment rent for Engineers | 2 | 12000 | =D56*C56 |  |  |  |  |  |  |  |  |
|  | Apartment rent for Admin Staff | 1 | 10000 | =D57*C57 |  |  |  |  |  |  |  |  |
|  | Apartment rent for Labors | 5 | 10000 | =D58*C58 |  |  |  |  |  |  |  |  |
|  | Running cost | =C58+C57+C56 | 2500 | =D59*C59 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E56:F59) |  |  |  |  |  |  |  |  |
|  | 6- IT  |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL |  |  |  |  |  |  |  |  |
|  | Computers+PC | 2 | 40000 | =(C64*D64)/$D$2 |  |  |  |  |  |  |  |  |
|  | Stationery | 1 | 5000 | =D65*C65 |  |  |  |  |  |  |  |  |
|  | Printing | 1 | 15000 | =D66*C66 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E64:F66) |  |  |  |  |  |  |  |  |
|  | 7- Vehicles for staff |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL |  |  |  |  |  |  |  |  |
|  | Mini Bus 14 seat | 2 | 40000 | =D71*C71 |  |  |  |  |  |  |  |  |
|  | Mini Bus 28 seat | 0 | 0 | =D72*C72 |  |  |  |  |  |  |  |  |
|  | Double cabin | 2 | 45000 | =D73*C73 |  |  |  |  |  |  |  |  |
|  | OTHER | 3 | 35000 | =D74*C74 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E71:F74) |  |  |  |  |  |  |  |  |
|  | 8- Electricity for site |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL |  |  |  |  |  |  |  |  |
|  | Generator | 2 | 35000 | =(C79*D79)/$D$2 |  |  |  |  |  |  |  |  |
|  | Lighting cables | 1 | 50000 | =(C80*D80)/$D$2 |  |  |  |  |  |  |  |  |
|  | Consumbles | 1 | 2000 | =D81*C81 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E79:F81) |  |  |  |  |  |  |  |  |
|  | 9-Safety Req. |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL/MONTH |  |  |  |  |  |  |  |  |
|  | Plastic tapes&cones | 1 | 100000 | =(C86*D86)/$D$2 |  |  |  |  |  |  |  |  |
|  | Extra allow for saftey | 1 | 150000 | =(C87*D87)/$D$2 |  |  |  |  |  |  |  |  |
|  | Saftey helmets,boots,gloves For manpower | 37 | 2500 | =(C88*D88)/$D$2 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E86:F88) |  |  |  |  |  |  |  |  |
|  | 10-Mob.&Demob |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | QTY | U.PRICE | TOTAL/MONTH |  |  |  |  |  |  |  |  |
|  | Mobilization & facilities | 1 | 75000 | =(C93*D93)/$D$2 |  |  |  |  |  |  |  |  |
|  | Demobilization & site cleaning | 1 | 75000 | =(C94*D94)/$D$2 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E93:F94) |  |  |  |  |  |  |  |  |
|  | 11- General Site equipments |  |  |  |  |  |  |  |  |  |  |  |
|  | DESCRIPTION | NO. OF Equ. | U.PRICE | TOTAL |  |  |  |  |  |  |  |  |
|  | Loader | 2 | 70000 | =D99*C99 |  |  |  |  |  |  |  |  |
|  | Crane | 1 | 80000 | =D100*C100 |  |  |  |  |  |  |  |  |
|  | Water tank | 10 | 15000 | =(C101*D101)/$D$2 |  |  |  |  |  |  |  |  |
|  | welding machines | 0 | 0 | =D102*C102 |  |  |  |  |  |  |  |  |
|  | General Consumbles for equipment | 3 | 7500 | =D103*C103 |  |  |  |  |  |  |  |  |
|  | TOTAL |  |  | =SUM(E99:F103) |  |  |  |  |  |  |  |  |

## Sheet: HVAC

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | utility buildings duct works |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 1.1 | Factory-fabricated duct works, as specified, complete with hangers and supports, seismic- restraint, fittings, flexible connections, joints, anchors, guides, flexible duct, insulation, manual volume dampers, fire dampers, smoke dampers, flange connectors, duct silencers, duct liner, turning vanes, duct-mounted access doors, aluminum cladding (jacket), and all accessories; including all items mentioned in Drawings, equipment tables. Duct work, uninsulated. | KG | 1600 | =P4*'Top Sheet'!$H$27 | =E4*D4 | 68.5 | 0.14 | =(H4*G4)+G4 | 40 | =I4*0.25 | 10 |  |  | 10 | =SUM(I4:O4) | =P4*D4 |
| 2 | utility buildings Air terminals |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 2.1 | Exhaust Grill as specified, dampers; including all items mentioned in drawings, equipment tables and specifications. EG 60"x20" | No. | 4 | =P6*'Top Sheet'!$H$27 | =E6*D6 | 3000 | 0 | =(H6*G6)+G6 | 200 | 200 | 50 |  |  | 100 | =SUM(I6:O6) | =P6*D6 |
| 2.2 | Supply Grill as specified, dampers; including all items mentioned in drawings, equipment tables and specifications. SG 60"x20" | No. | 4 | =P7*'Top Sheet'!$H$27 | =E7*D7 | 5500 | 0.14 | =(H7*G7)+G7 | 200 | 200 | 50 |  |  | 100 | =SUM(I7:O7) | =P7*D7 |
| 3 | utility buildings axial fans |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 3.1 | Axial inline exhaust  fan as specified, controls, electrical works, including all items mentioned in Drawings and equipment tables. EF-01  (17000 CFM air flow rate, with external static pressure 1.0 IN.W). | No. | 1 | =P9*'Top Sheet'!$H$27 | =E9*D9 | 64000 | 0.14 | =(H9*G9)+G9 | 5000 | 5000 | 1000 |  |  | 2500 | =SUM(I9:O9) | =P9*D9 |
| 3.2 | Axial inline fresh air  fan as specified, controls, electrical works, including all items mentioned in Drawings and equipment tables. FAF-01  (17000 CFM air flow rate, with external static pressure 1.0 IN.W). | No. | 1 | =P10*'Top Sheet'!$H$27 | =E10*D10 | 64000 | 0.14 | =(H10*G10)+G10 | 5000 | 5000 | 1000 |  |  | 2500 | =SUM(I10:O10) | =P10*D10 |
| 3.3 | EF-01  (2000 CFM air flow rate, with external static pressure 0.3 IN.W). | No. | 3 | =P11*'Top Sheet'!$H$27 | =E11*D11 | 9250 | 0.14 | =(H11*G11)+G11 | 1500 | 1000 | 500 |  |  | 250 | =SUM(I11:O11) | =P11*D11 |
| 3.4 | EF-02  (75 CFM air flow rate, with external static pressure 0.2 IN.W). | No. | 1 | =P12*'Top Sheet'!$H$27 | =E12*D12 | 2300 | 0.14 | =(H12*G12)+G12 | 500 | 250 | 100 |  |  | 250 | =SUM(I12:O12) | =P12*D12 |
| 3.5 | EF-01  (1800 CFM air flow rate, with external static pressure 0.3 IN.W). | No. | 2 | =P13*'Top Sheet'!$H$27 | =E13*D13 | 7050 | 0.14 | =(H13*G13)+G13 | 1500 | 1000 | 500 |  |  | 250 | =SUM(I13:O13) | =P13*D13 |
| 3.6 | EF-01  (350 CFM air flow rate, with external static pressure 0.3 IN.W). | No. | 1 | =P14*'Top Sheet'!$H$27 | =E14*D14 | 4130 | 0.14 | =(H14*G14)+G14 | 750 | 250 | 100 |  |  | 250 | =SUM(I14:O14) | =P14*D14 |
| 4 | utility buildings units |  |  |  |  |  |  |  | التركيب | المستلزمات |  |  |  |  |  |  |
| 4.1 | SU-01 , cooling capacity:2TR | No. | 1 | =P16*'Top Sheet'!$H$27 | =E16*D16 | 49900 | 0 | =(H16*G16)+G16 | 500 | 2000 |  |  |  | 500 | =SUM(I16:O16) | =P16*D16 |
| 4.2 | SU-01 , cooling capacity:2.5 TR | No. | 3 | =P17*'Top Sheet'!$H$27 | =E17*D17 | 75000 | 0 | =(H17*G17)+G17 | 1000 | =3*1250 |  |  |  | 500 | =SUM(I17:O17) | =P17*D17 |
| 4.3 | SU-01 , cooling capacity:3.0 TR | No. | 3 | =P18*'Top Sheet'!$H$27 | =E18*D18 | 96900 | 0 | =(H18*G18)+G18 | 1000 | =3*1500 |  |  |  | 500 | =SUM(I18:O18) | =P18*D18 |
| 4.4 | Supply, install, connect, test and put into operation IT rooms control panel c/w all accessories (contactor, alarm, timers, heat sensors…etc.) to control (local, remote and automatic control) the 3 Split units alternatively each every 8 hours or and when temperature exceeds 22°C | No. | 2 | =P19*'Top Sheet'!$H$27 | =E19*D19 | 150000 | 0 | =(H19*G19)+G19 |  |  |  |  |  |  | =SUM(I19:O19) | =P19*D19 |
| TOTAL  |  |  |  |  | =SUM(F4:F19) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q19) |

## Sheet: FF

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | utility buildings fire pumps |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1.1 | Diesel-Drive, Centrifugal Fire Pumps Supplying, installing, connecting, testing and commissioning a Diesel-drive, split-case centrifugal fire pumps, electric motors, base frames, connections,GS pipes, fittings, valves ,check valves, strainers, pressure gauges, OS &Y gate valves, felxible connections, air vents, concenteric and eccentric diffusers,  control panel, dimantling pieces, all piping connections inside the pump room, flow meter, pressure relief valve,…etc. and all necessary accessories as per standard specifications NFPA FM approved, UL lisrted as herien specified and according to drawings and technical specifications Diesel driven fire pump set. 1000 gpm at 8.5 bar | No. | 1 | =P4*'Top Sheet'!$H$27 | =E4*D4 | =110000*51 | 0 | =(H4*G4)+G4 | 500000 |  |  |  |  |  | =SUM(I4:O4) | =P4*D4 |
| 1.2 | Pressure-Maintenance Pumps Supplying, installing, connecting, testing and commissioning an automatic packaged vertical multi-stage jockey pump, complete including the UL listed controller, electric motors, base frames, connections, GS pipes, fittings, valves ,check valves, strainers, pressure gauges, OS &Y  gate valves, felxible connections, air vents, concenteric and eccentric diffusers,  control panel, dimantling pieces, all piping connections inside the pump room, flow meter, pressure relief valve,…etc. and all necessary accessories as per standard specifications NFPA FM approved, UL lisrted as herien specified and according to drawings and technical specifications Electrically driven jockey pump set. 25 gpm at 9.2 bar | No. | 1 | =P5*'Top Sheet'!$H$27 | =E5*D5 |  | 0 | =(H5*G5)+G5 |  |  |  |  |  |  | =SUM(I5:O5) | =P5*D5 |
| 1.3 | Supplying, installing, connecting, testing and commissioning an automatic, factory assembled wired and tested electric driven split case fire pump system consisting of the pump, electric motors, base frames, connections,GS pipes, fittings, valves ,check valves, strainers, pressure gauges, OS &Y  gate valves, felxible connections, air vents, concenteric and eccentric diffusers, control panel, dimantling pieces, all piping connections inside the pump room, flow meter, pressure relief valve,…etc. and all necessary accessories as per standard specifications NFPA FM approved, UL lisrted as herien specified and according to drawings and technical specifications Electrically driven fire pump set. 1000 gpm at 8.5 bar | No. | 1 | =P6*'Top Sheet'!$H$27 | =E6*D6 |  | 0 | =(H6*G6)+G6 |  |  |  |  |  |  | =SUM(I6:O6) | =P6*D6 |
| 2 | Network ( FireFighting ) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | الرمل |  |  |  |  |
| 2.1 | For External Diam. 300 mm | LM | 100 | =P8*'Top Sheet'!$H$27 | =E8*D8 | 2582.48 | 0.14 | =(H8*G8)+G8 | 600 | =I8*0.5 | 70 | 26 |  | 35 | =SUM(I8:O8) | =P8*D8 |
| 2.2 | For External Diam. 200 mm | LM | 2115 | =P9*'Top Sheet'!$H$27 | =E9*D9 | 1049.13 | 0.14 | =(H9*G9)+G9 | 400 | =I9*0.5 | 50 | 22 |  | 25 | =SUM(I9:O9) | =P9*D9 |
| 3 | Network FireFighting (Single House Connection ) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | الرمل |  |  |  |  |
| 3.1 | Single House Connection of Diam. 110 mm | No. | 27 | =P11*'Top Sheet'!$H$27 | =E11*D11 | =5*218.91 | 0.14 | =(H11*G11)+G11 | 2000 | 1000 | 500 | 500 |  | 200 | =SUM(I11:O11) | =P11*D11 |
| 4 | Network Valves |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 | 200 mm dia | No. | 6 | =P13*'Top Sheet'!$H$27 | =E13*D13 | =57.67*1340 | 0.14 | =(H13*G13)+G13 | 1500 | 4000 | 500 |  |  | 200 | =SUM(I13:O13) | =P13*D13 |
| 5 | utility buildings fire extinguishers |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 5.1 | Supplying, installing, connecting and testing of below: FE-1  Wall mounted Stored pressure dry powder fire extinguishers 6kg . | No. | =2+3 | =P15*'Top Sheet'!$H$27 | =E15*D15 | 4900 | 0 | =(H15*G15)+G15 |  |  |  |  |  |  | =SUM(I15:O15) | =P15*D15 |
| 5.2 | FE-2  Wall mounted CO2 fire extinguishers 6 kg. | No. | =2+3 | =P16*'Top Sheet'!$H$27 | =E16*D16 | 6200 | 0 | =(H16*G16)+G16 |  |  |  |  |  |  | =SUM(I16:O16) | =P16*D16 |
| 5.3 | Carbon Dioxide Fire Extinguishing Systems Supply, Install, Test, Activate, Automatic CO2 Fire Suppression System set, set including: CO2 Cylinders filled with b/m quantity of CO2 c/w valve, discharge hose, manual leaver, solenoid valve. Fire Fighting Control Panel c/w with batteries Smoke Detector c/w base. Heat Detector c/w base. Audio/Visual Unit. Manual release button. Alarm Bell. Abort button. CO2 nozzle(s) Steel pipe network seamless -schedule 40 c/w all fittings, Accessories. Fire Alarm network steel enclosure for cylinders CO2 system for Distributer Room, total capacity 675 kg . | Set | 1 | =P17*'Top Sheet'!$H$27 | =E17*D17 | =27469*51 | 0 | =(H17*G17)+G17 |  |  |  |  |  |  | =SUM(I17:O17) | =P17*D17 |
| 5.4 | CO2 system for Battery Room, total capacity 90 kg | Set | 1 | =P18*'Top Sheet'!$H$27 | =E18*D18 | =5835*51 | 0 | =(H18*G18)+G18 |  |  |  |  |  |  | =SUM(I18:O18) | =P18*D18 |
| 5.5 | CO2 system for Transformer Room, total capacity 90 kg . | Set | 1 | =P19*'Top Sheet'!$H$27 | =E19*D19 | =5835*51 | 0 | =(H19*G19)+G19 |  |  |  |  |  |  | =SUM(I19:O19) | =P19*D19 |
| 5.6 | CO2 6kg | No. | 1 | =P20*'Top Sheet'!$H$27 | =E20*D20 | 9500 | 0 | =(H20*G20)+G20 |  |  |  |  |  |  | =SUM(I20:O20) | =P20*D20 |
| 5.7 | FM200 system for Control Room, total capacity 73 kg . | Set | 1 | =P21*'Top Sheet'!$H$27 | =E21*D21 | 780000 | 0 | =(H21*G21)+G21 | 75000 | 25000 | 2000 |  |  | 10000 | =SUM(I21:O21) | =P21*D21 |
| 5.8 | FM200 system for Service Provider Room, total capacity 30 kg . | Set | 1 | =P22*'Top Sheet'!$H$27 | =E22*D22 | 450000 | 0 | =(H22*G22)+G22 | 50000 | 15000 | 20000 |  |  | 5000 | =SUM(I22:O22) | =P22*D22 |
| TOTAL  |  |  |  |  | =SUM(F4:F22) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q22) |

## Sheet: PLUMBING

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | utility buildings Submersible Pumps |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 1.1 | duplex submersible  pump set (4 working +1 standby) each pump flow 157 L/S head=33 m | Set | 1 | =P4*'Top Sheet'!$H$27 | =E4*D4 | =235350*60 | 0.14 | =(H4*G4)+G4 | 150000 | 75000 | 20000 |  |  | 20000 | =SUM(I4:O4) | =P4*D4 |
| 1.2 | lift station Piping Ductile iron pipes and fittings, flanged jointing, above ground. Supply, Test, Delivery, Erection of Pump interconnecting pipes complete with joints, fitting, ... etc, as per tendered documents. | LS | 1 | =P5*'Top Sheet'!$H$27 | =E5*D5 | 800000 | 0 | =(H5*G5)+G5 | 75000 | 75000 | 10000 |  |  | 40000 | =SUM(I5:O5) | =P5*D5 |
| 1.3 | lift station General Duty Valves Gate valves, cast iron, Class (125), flanged. Check valves, cast iron, Class (125) flanged. Supply, Test, Delivery, Erection of Pump discharge and main headers gate , non return valves... etc, as per tendered documents. | LS | 1 | =P6*'Top Sheet'!$H$27 | =E6*D6 | 2000000 | 0 | =(H6*G6)+G6 | 100000 | 100000 | 10000 |  |  | 40000 | =SUM(I6:O6) | =P6*D6 |
| 1.4 | Supply, Install and Test cast iron trench grate and frame, include all required accessories for installation and operation. 300mm width. | m | 12.5 | =P7*'Top Sheet'!$H$27 | =E7*D7 | 3500 | 0 | =(H7*G7)+G7 | 750 | 1000 |  |  |  | 500 | =SUM(I7:O7) | =P7*D7 |
| 1.5 | Supply, installing, connecting basket screen constructed from steel rods, detailed as shown on drawings. | LS | 1 | =P8*'Top Sheet'!$H$27 | =E8*D8 | 150000 | 0 | =(H8*G8)+G8 |  |  |  |  |  |  | =SUM(I8:O8) | =P8*D8 |
| 1.6 | Supply, install, connect, test and commission carbon odor system include carbon filter ∅ 1500mm, extraction fan, 2355 m3/hr and ∅300 PVC odor pipe, include detailed as shown on drawings. | LS | 1 | =P9*'Top Sheet'!$H$27 | =E9*D9 | 700000 | 0 | =(H9*G9)+G9 |  |  |  |  |  |  | =SUM(I9:O9) | =P9*D9 |
| 2 | utility buildings Booster pumps |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | الخزان |  |  |  |  |
| 2.1 | Domestic-Water Packaged Booster Pumps Supply, install,  connect,  test and commission tested, certifed and guaranteed variable speed constant pressure water booster pumping set. item inculding control panel, interconnecting wiring, final connection to power and all items required for complete installation and operation. item include 1000 liter pressure vessel. Booster pump set 4 pumps (3 working + 1 standby) each pump flow 27 L/S & head=35 m. | Set | 1 | =P11*'Top Sheet'!$H$27 | =E11*D11 | =104664*60 | 0.14 | =(H11*G11)+G11 | 100000 | 75000 | 20000 | 500000 |  | 40000 | =SUM(I11:O11) | =P11*D11 |
| 2.2 | Supply, Test, Delivery, Erection of Pump suction, discharge and main headers lines complete with joints, fitting,... etc, as per tendered documents. | LS | 1 | =P12*'Top Sheet'!$H$27 | =E12*D12 | 520000 | 0 | =(H12*G12)+G12 | 50000 | 50000 | 7500 |  |  | 25000 | =SUM(I12:O12) | =P12*D12 |
| 2.3 | Domestic-Water General Duty Valves  Gate valves, cast iron, Class (125), flanged. Check valves, cast iron, Class (125) flanged. Butterfly valves, cast iron, full lug. Basketstrainer, cast iron, Class (125) flanged. Supply, Test, Delivery, Erection of Pump suction, discharge and main headers gate, non return, butterfly valves, basket strainers... etc, as per tendered documents.  | LS | 1 | =P13*'Top Sheet'!$H$27 | =E13*D13 | 1900000 | 0 | =(H13*G13)+G13 | 100000 | 100000 | 10000 |  |  | 40000 | =SUM(I13:O13) | =P13*D13 |
| 2.4 | Water tank level indicators, with level regulators, sensors, visual indicators panels and alarm. | NO | 2 | =P14*'Top Sheet'!$H$27 | =E14*D14 | 25000 | 0 | =(H14*G14)+G14 |  |  |  |  |  |  | =SUM(I14:O14) | =P14*D14 |
| 3 | utility buildings Tank works |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 3.1 | Supply, Install and Test cast iron trench grate and frame, include all required accessories for installation and operation. 300mm width. | m | 60 | =P16*'Top Sheet'!$H$27 | =E16*D16 | 3500 | 0 | =(H16*G16)+G16 | 750 | 1000 |  |  |  | 500 | =SUM(I16:O16) | =P16*D16 |
| 3.2 | Supply, install, connect, test and commission duplex submersible  pump set, consisting of one duty and one standby pump, including hoisting and fixing in position, interconnecting pipes, valves, connection to pipework, control panel, interconnecting wiring, final connection to power, complete including but not limited to pumps, motors, foot elbows, guide rails, lifting chains, level switches, spare parts, accessories and all ancillary work as specfied and as scheduled, detailed as shown on drawings. duplex submersible  pump set (1 working +1 standby) each pump flow 16L/S & head=10 m. | Set | 1 | =P17*'Top Sheet'!$H$27 | =E17*D17 | =8486*60 | 0.14 | =(H17*G17)+G17 | 100000 | 75000 | 5000 |  |  | 5000 | =SUM(I17:O17) | =P17*D17 |
| 3.3 | Supply, Install and Test uPVC pressurized pipes for submersible pumps discharge line, Pipes shall be manufactured in accordance with DIN 8062/8061, BS 3505/3506, BS EN 1452 standard, capable to withstand a working pressure of 10 kg/cm2 ( 10 bar ) , include all required accessories for installation and operation. Diameter 110 mm. | m | 10 | =P18*'Top Sheet'!$H$27 | =E18*D18 | 138.33 | 0.14 | =(H18*G18)+G18 | 200 | 124.7787 | 10 |  |  | 15 | =SUM(I18:O18) | =P18*D18 |
| 4 | utility buildings plumbing |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | رمل |  |  |  |  |
| 4.1 | Gate valves, bronze, Class 125, body and union bonnet of ASTM B 62 cast bronze; with threaded ends, solid disc, copper-silicon alloy stem, bronze packing gland, “Teflon” impregnated packing and malleable iron hand wheel. Size 25 mm. | No. | 1 | =P20*'Top Sheet'!$H$27 | =E20*D20 | =57.64*30 | 0.14 | =(H20*G20)+G20 | 200 | 100 | 50 |  |  | 50 | =SUM(I20:O20) | =P20*D20 |
| 4.2 | POLYPROPYLENE PIPES AND  FITTINGS PP-R pipes and fittings,PN ( 16 ) ;including fittings, accessories, Hangers and Supports. Size 25 mm. | m | 4 | =P21*'Top Sheet'!$H$27 | =E21*D21 | 50.6 | 0.14 | =(H21*G21)+G21 | 50 | 20 | 5 |  |  | 5 | =SUM(I21:O21) | =P21*D21 |
| 4.3 | Vertical Electrical water heaters (EWH); commercial, storage type, cement Line carbon steel tanks Type EWH 1; 30 L capacity . | No. | 1 | =P22*'Top Sheet'!$H$27 | =E22*D22 | 8000 | 0 | =(H22*G22)+G22 | 1000 | 1250 |  |  |  | 250 | =SUM(I22:O22) | =P22*D22 |
| 4.4 | Water closet type, Floor Mounted with exposed flush tank 6 L/flush, rimless with integral douche, Include chrome plated angle valves, flexibles pipes and all required accessories and supports. | No. | 1 | =P23*'Top Sheet'!$H$27 | =E23*D23 | 8000 | 0.14 | =(H23*G23)+G23 | 1000 | 1500 |  |  |  | 1500 | =SUM(I23:O23) | =P23*D23 |
| 4.5 | Lavatories,  Wall mounted type, vitreous-china fixture, chrome plated Mixer with Long Lever, Include chrome plated angle valves, flexibles pipes, and all required accessories and supports. | No. | 1 | =P24*'Top Sheet'!$H$27 | =E24*D24 | 4500 | 0.14 | =(H24*G24)+G24 | 1000 | 4000 |  |  |  | 1000 | =SUM(I24:O24) | =P24*D24 |
| 4.6 | uPVC PIPES AND  FITTINGS uPVC pipes and fittings ;including fittings, accessories, Hangers and Supports. Size 25 mm. | m | 6 | =P25*'Top Sheet'!$H$27 | =E25*D25 | 15 | 0.14 | =(H25*G25)+G25 | 50 | =0.3*I25 | 5 | 10 |  | 8 | =SUM(I25:O25) | =P25*D25 |
| 4.7 | Size 50 mm. | m | 1.5 | =P26*'Top Sheet'!$H$27 | =E26*D26 | 22 | 0.14 | =(H26*G26)+G26 | 100 | =0.3*I26 | 5 | 10 |  | 10 | =SUM(I26:O26) | =P26*D26 |
| 4.8 | Size 75 mm. | m | 2 | =P27*'Top Sheet'!$H$27 | =E27*D27 | 40 | 0.14 | =(H27*G27)+G27 | 150 | =0.3*I27 | 5 | 10 |  | 12 | =SUM(I27:O27) | =P27*D27 |
| 4.9 | Size 110 mm. | m | 12 | =P28*'Top Sheet'!$H$27 | =E28*D28 | 85 | 0.14 | =(H28*G28)+G28 | 200 | =0.3*I28 | 10 | 20 |  | 15 | =SUM(I28:O28) | =P28*D28 |
| 4.1 | floor drain type FD1 size 75mm | No. | 1 | =P29*'Top Sheet'!$H$27 | =E29*D29 | 500 | 0.14 | =(H29*G29)+G29 | 50 | 50 | 10 |  |  | 20 | =SUM(I29:O29) | =P29*D29 |
| 4.11 | Roof Drains Type (RD) cast Iron Body . Cast Iron dome, side outlet, complete with flashing ring, gravel stop, extension callers under-deck clamp and sump receiver, and special pieces | No | 2 | =P30*'Top Sheet'!$H$27 | =E30*D30 | 2000 | 0.14 | =(H30*G30)+G30 | 250 | 200 | 50 |  |  | 500 | =SUM(I30:O30) | =P30*D30 |
| 4.12 | Size 100  mm. Gully trap (GT), Heavy cover and frame with dimensions Type (GT). | No. | 1 | =P31*'Top Sheet'!$H$27 | =E31*D31 | 4000 | 0.14 | =(H31*G31)+G31 | 500 | 250 | 50 |  |  | 500 | =SUM(I31:O31) | =P31*D31 |
| 4.13 | uPVC PIPES AND  FITTINGS uPVC pipes and fittings ;including fittings, accessories, Hangers and Supports. Size 40 mm. | m | 16 | =P32*'Top Sheet'!$H$27 | =E32*D32 | 17 | 0.14 | =(H32*G32)+G32 | 60 | 5 | 5 | 10 |  | 8 | =SUM(I32:O32) | =P32*D32 |
| 4.14 | Size 75 mm. | m | 9 | =P33*'Top Sheet'!$H$27 | =E33*D33 | 40 | 0.14 | =(H33*G33)+G33 | 150 | 13.68 | 5 | 10 |  | 12 | =SUM(I33:O33) | =P33*D33 |
| 4.15 | Size 110 mm. | m | 4 | =P34*'Top Sheet'!$H$27 | =E34*D34 | 85 | 0.14 | =(H34*G34)+G34 | 200 | 29.07 | 10 | 20 |  | 15 | =SUM(I34:O34) | =P34*D34 |
| 4.16 | Roof Drains Type (RD) cast Iron Body . Cast Iron dome, side outlet, complete with flashing ring, gravel stop, extension callers under-deck clamp and sump receiver, and special pieces Size 100  mm. | No | 1 | =P35*'Top Sheet'!$H$27 | =E35*D35 | 2000 | 0.14 | =(H35*G35)+G35 | 250 | 200 | 50 |  |  | 500 | =SUM(I35:O35) | =P35*D35 |
| 4.17 | Type (GCO), Cast Iron Body,   straight threads and gasket seal or taper threads for installation in floors not having membrane waterproofing may be furnished without clamping ring. Size 80 mm. | No. | 1 | =P36*'Top Sheet'!$H$27 | =E36*D36 | 1500 | 0.14 | =(H36*G36)+G36 | 250 | 200 | 60 |  |  | 500 | =SUM(I36:O36) | =P36*D36 |
| 4.18000000000001 | Gully trap (GT), Heavy cover and frame with dimensions Type (GT). | No. | 1 | =P37*'Top Sheet'!$H$27 | =E37*D37 | 4000 | 0.14 | =(H37*G37)+G37 | 500 | 250 | 50 |  |  | 500 | =SUM(I37:O37) | =P37*D37 |
| TOTAL  |  |  |  |  | =SUM(F4:F37) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q37) |

## Sheet: CIVIL

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | Network EARTH MOVING |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1.1 | Cutting in all types of soil, except rock, from established rough grade levels to the bottom levels of subgrade course materials as per cross sectional road details, including disposal of all surplus material into dump area as directed by the Engineer. | m3 | 80800 | =P4*'Top Sheet'!$H$27 | =E4*D4 |  | 0 | =(H4*G4)+G4 | 110 |  |  |  |  |  | =SUM(I4:O4) | =P4*D4 |
| 1.2 | Filling with approved selected materials within the site or approved borrowed materials over established ground levels up to the required bottom levels of subgrade course materials as per cross sectional road details, including spreading, levelling, grading and compacting. | m3 | 155250 | =P5*'Top Sheet'!$H$27 | =E5*D5 |  | 0 | =(H5*G5)+G5 | 170 |  |  |  |  |  | =SUM(I5:O5) | =P5*D5 |
| 1.3 | Filling with approved borrowed materials for the subgrade layer of 300mm thickness as per cross sectional road details, including spreading, levelling, grading and compacting. | m3 | 26565 | =P6*'Top Sheet'!$H$27 | =E6*D6 |  | 0 | =(H6*G6)+G6 | 650 |  |  |  |  |  | =SUM(I6:O6) | =P6*D6 |
| 1.4 |  |  |  | =P7*'Top Sheet'!$H$27 | =E7*D7 |  | 0 | =(H7*G7)+G7 |  |  |  |  |  |  | =SUM(I7:O7) | =P7*D7 |
| 1.5 |  |  |  | =P8*'Top Sheet'!$H$27 | =E8*D8 |  | 0 | =(H8*G8)+G8 |  |  |  |  |  |  | =SUM(I8:O8) | =P8*D8 |
| 1.6 |  |  |  | =P9*'Top Sheet'!$H$27 | =E9*D9 |  | 0 | =(H9*G9)+G9 |  |  |  |  |  |  | =SUM(I9:O9) | =P9*D9 |
| 1.7 |  |  |  | =P10*'Top Sheet'!$H$27 | =E10*D10 |  | 0 | =(H10*G10)+G10 |  |  |  |  |  |  | =SUM(I10:O10) | =P10*D10 |
| 1.8 |  |  |  | =P11*'Top Sheet'!$H$27 | =E11*D11 |  | 0 | =(H11*G11)+G11 |  |  |  |  |  |  | =SUM(I11:O11) | =P11*D11 |
| 1.9 |  |  |  | =P12*'Top Sheet'!$H$27 | =E12*D12 |  | 0 | =(H12*G12)+G12 |  |  |  |  |  |  | =SUM(I12:O12) | =P12*D12 |
| 2 | Utility building earth working |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2.1 | Excavation for all types of soils to required grading levels according to the drawing and specification , Item includes cut, leveling, clearing and compaction , and move excavated materials to out the project to the public dump area | m3 | 1200 | =P14*'Top Sheet'!$H$27 | =E14*D14 |  | 0 | =(H14*G14)+G14 | 110 |  |  |  |  |  | =SUM(I14:O14) | =P14*D14 |
| 2.2 | Backfill with well graded satisfactory materials approved by The engineer on layers according to the geotechnical report and specifications and drawings, rate includes compaction soil tests for each layer. | m3 | 170 | =P15*'Top Sheet'!$H$27 | =E15*D15 |  | 0 | =(H15*G15)+G15 | 650 |  |  |  |  |  | =SUM(I15:O15) | =P15*D15 |
| 2.3 |  |  |  | =P16*'Top Sheet'!$H$27 | =E16*D16 |  | 0 | =(H16*G16)+G16 |  |  |  |  |  |  | =SUM(I16:O16) | =P16*D16 |
| 2.4 |  |  |  | =P17*'Top Sheet'!$H$27 | =E17*D17 |  | 0 | =(H17*G17)+G17 |  |  |  |  |  |  | =SUM(I17:O17) | =P17*D17 |
| 2.5 |  |  |  | =P18*'Top Sheet'!$H$27 | =E18*D18 |  | 0 | =(H18*G18)+G18 |  |  |  |  |  |  | =SUM(I18:O18) | =P18*D18 |
| 2.6 |  |  |  | =P19*'Top Sheet'!$H$27 | =E19*D19 |  | 0 | =(H19*G19)+G19 |  |  |  |  |  |  | =SUM(I19:O19) | =P19*D19 |
| 2.7 |  |  |  | =P20*'Top Sheet'!$H$27 | =E20*D20 |  | 0 | =(H20*G20)+G20 |  |  |  |  |  |  | =SUM(I20:O20) | =P20*D20 |
| 2.8 |  |  |  | =P21*'Top Sheet'!$H$27 | =E21*D21 |  | 0 | =(H21*G21)+G21 |  |  |  |  |  |  | =SUM(I21:O21) | =P21*D21 |
| 2.9 |  |  |  | =P22*'Top Sheet'!$H$27 | =E22*D22 |  | 0 | =(H22*G22)+G22 |  |  |  |  |  |  | =SUM(I22:O22) | =P22*D22 |
| 3 | Utility building Concrete |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | خرسانة جاهزة | نجارة و فرمجة | حديد التسليح | حدادة | هالك | مياه للمعالجة |  |  |
| 3.1 | Furnishing and batching plain concrete for the foundation as indicated on the drawings and as directed by the Engineer. The required characteristic strength is 200 Kg/cm2. The used Cement should comply to the geotechnical report. | m3 | 17 | =P25*'Top Sheet'!$H$27 | =E25*D25 |  | 0 | =(H25*G25)+G25 | 2300 | 500 |  |  | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83cf713020> |  | =SUM(I25:O25) | =P25*D25 |
| 3.2 | Furnishing and batching reinforced concrete for the construction  of the reinforced concrete Raft as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 97 | =P26*'Top Sheet'!$H$27 | =E26*D26 |  | 0 | =(H26*G26)+G26 | 2800 | 750 | 4000 | 950 | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83bda15430> | 245 | =SUM(I26:O26) | =P26*D26 |
| 3.3 | Furnishing and batching reinforced concrete for the Columns, and walls as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it.  The Required characteristic strength is 300 Kg/cm2. The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 140 | =P27*'Top Sheet'!$H$27 | =E27*D27 |  | 0 | =(H27*G27)+G27 | 2800 | 1100 | 4400 | 1000 | =SUM(J27:M27)*0.1 | 245 | =SUM(I27:O27) | =P27*D27 |
| 3.4 | Furnishing and batching reinforced concrete for the slabs and beams as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 40 | =P28*'Top Sheet'!$H$27 | =E28*D28 |  | 0 | =(H28*G28)+G28 | 2800 | 1050 | 4000 | 950 | =SUM(J28:M28)*0.1 | 245 | =SUM(I28:O28) | =P28*D28 |
| 3.5 |  |  |  | =P29*'Top Sheet'!$H$27 | =E29*D29 |  | 0 | =(H29*G29)+G29 |  |  |  |  |  |  | =SUM(I29:O29) | =P29*D29 |
| 3.6 |  |  |  | =P30*'Top Sheet'!$H$27 | =E30*D30 |  | 0 | =(H30*G30)+G30 |  |  |  |  |  |  | =SUM(I30:O30) | =P30*D30 |
| 3.7 |  |  |  | =P31*'Top Sheet'!$H$27 | =E31*D31 |  | 0 | =(H31*G31)+G31 |  |  |  |  |  |  | =SUM(I31:O31) | =P31*D31 |
| 3.8 |  |  |  | =P32*'Top Sheet'!$H$27 | =E32*D32 |  | 0 | =(H32*G32)+G32 |  |  |  |  |  |  | =SUM(I32:O32) | =P32*D32 |
| 3.9 |  |  |  | =P33*'Top Sheet'!$H$27 | =E33*D33 |  | 0 | =(H33*G33)+G33 |  |  |  |  |  |  | =SUM(I33:O33) | =P33*D33 |
| 4 | Utility buildings Insulation Works |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 | Supply and install 400 Micron polyethylene sheets under plain concrete according to drawings and specifications. | m2 | 171 | =P35*'Top Sheet'!$H$27 | =E35*D35 |  | 0 | =(H35*G35)+G35 | 150 |  |  |  |  |  | =SUM(I35:O35) | =P35*D35 |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 4.2 | Modified  water proofing membrane 4 mm thick reinforced with non- woven spun bonded polyester core weighing 180 g/m2 minimum to concrete surface below R.C. foundation and retaining wall according to drawings and specifications. | m2 | 400 | =P37*'Top Sheet'!$H$27 | =E37*D37 |  | 0 | =(H37*G37)+G37 | 95 | 100 | =J37*0.15 | 80 |  |  | =SUM(I37:O37) | =P37*D37 |
| 4.3 |  |  |  | =P38*'Top Sheet'!$H$27 | =E38*D38 |  | 0 | =(H38*G38)+G38 |  |  |  |  |  |  | =SUM(I38:O38) | =P38*D38 |
| 4.4 |  |  |  | =P39*'Top Sheet'!$H$27 | =E39*D39 |  | 0 | =(H39*G39)+G39 |  |  |  |  |  |  | =SUM(I39:O39) | =P39*D39 |
| 4.5 |  |  |  | =P40*'Top Sheet'!$H$27 | =E40*D40 |  | 0 | =(H40*G40)+G40 |  |  |  |  |  |  | =SUM(I40:O40) | =P40*D40 |
| 4.6 |  |  |  | =P41*'Top Sheet'!$H$27 | =E41*D41 |  | 0 | =(H41*G41)+G41 |  |  |  |  |  |  | =SUM(I41:O41) | =P41*D41 |
| 4.7 |  |  |  | =P42*'Top Sheet'!$H$27 | =E42*D42 |  | 0 | =(H42*G42)+G42 |  |  |  |  |  |  | =SUM(I42:O42) | =P42*D42 |
| 4.8 |  |  |  | =P43*'Top Sheet'!$H$27 | =E43*D43 |  | 0 | =(H43*G43)+G43 |  |  |  |  |  |  | =SUM(I43:O43) | =P43*D43 |
| 4.9 |  |  |  | =P44*'Top Sheet'!$H$27 | =E44*D44 |  | 0 | =(H44*G44)+G44 |  |  |  |  |  |  | =SUM(I44:O44) | =P44*D44 |
| 5 | Utility buildings tank works |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 5.1 | Excavation for all types of soils to required grading levels according to the drawing and specification , Item includes cut, leveling, clearing and compaction , and move excavated materials to out the project to the public dump area | m3 | 17500 | =P46*'Top Sheet'!$H$27 | =E46*D46 |  | 0 | =(H46*G46)+G46 | 110 |  |  |  |  |  | =SUM(I46:O46) | =P46*D46 |
| 5.2 | Backfill with well graded satisfactory materials approved by The engineer on layers according to the geotechnical report and specifications and drawings, rate includes compaction soil tests for each layer. | m3 | 1800 | =P47*'Top Sheet'!$H$27 | =E47*D47 |  | 0 | =(H47*G47)+G47 | 650 |  |  |  |  |  | =SUM(I47:O47) | =P47*D47 |
|  |  |  |  |  |  |  |  |  | خرسانة جاهزة | نجارة و فرمجة | حديد التسليح | حدادة | هالك | مياه للمعالجة |  |  |
| 5.3 | Furnishing and batching plain concrete for the foundation as indicated on the drawings and as directed by the Engineer. The required characteristic strength is 200 Kg/cm2. The used Cement should comply to the geotechnical report. | m3 | 180 | =P49*'Top Sheet'!$H$27 | =E49*D49 |  | 0 | =(H49*G49)+G49 | 2300 | 500 |  |  | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83d96880e0> |  | =SUM(I49:O49) | =P49*D49 |
| 5.4 | Furnishing and batching reinforced concrete for the construction  of the reinforced concrete Raft as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 350 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 1400 | =P50*'Top Sheet'!$H$27 | =E50*D50 |  | 0 | =(H50*G50)+G50 | 2800 | 750 | 4000 | 950 | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83d968bc50> | 245 | =SUM(I50:O50) | =P50*D50 |
| 5.5 | Furnishing and batching reinforced concrete for the Columns, and walls as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it.  The Required characteristic strength is 350 Kg/cm2. The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 980 | =P51*'Top Sheet'!$H$27 | =E51*D51 |  | 0 | =(H51*G51)+G51 | 2800 | 1100 | 4400 | 1000 | =SUM(J51:M51)*0.1 | 245 | =SUM(I51:O51) | =P51*D51 |
| 5.6 | Furnishing and batching reinforced concrete for the slabs and beams as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 700 | =P52*'Top Sheet'!$H$27 | =E52*D52 |  | 0 | =(H52*G52)+G52 | 2800 | 1050 | 4000 | 950 | =SUM(J52:M52)*0.1 | 245 | =SUM(I52:O52) | =P52*D52 |
| 5.7 |  |  |  | =P53*'Top Sheet'!$H$27 | =E53*D53 |  | 0 | =(H53*G53)+G53 |  |  |  |  |  |  | =SUM(I53:O53) | =P53*D53 |
| 5.8 |  |  |  | =P54*'Top Sheet'!$H$27 | =E54*D54 |  | 0 | =(H54*G54)+G54 |  |  |  |  |  |  | =SUM(I54:O54) | =P54*D54 |
| 5.9 |  |  |  | =P55*'Top Sheet'!$H$27 | =E55*D55 |  | 0 | =(H55*G55)+G55 |  |  |  |  |  |  | =SUM(I55:O55) | =P55*D55 |
| 6 | Utility buildings tank insulation works |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 6.1 | Supply and install 400 Micron polyethylene sheets under plain concrete according to drawings and specifications. | m2 | 1800 | =P57*'Top Sheet'!$H$27 | =E57*D57 |  | 0 | =(H57*G57)+G57 | 150 |  |  |  |  |  | =SUM(I57:O57) | =P57*D57 |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 6.2 | Modified  water proofing membrane 4 mm thick reinforced with non- woven spun bonded polyester core weighing 180 g/m2 minimum to concrete surface below R.C. foundation and retaining wall according to drawings and specifications. | m2 | 2900 | =P59*'Top Sheet'!$H$27 | =E59*D59 |  | 0 | =(H59*G59)+G59 | 95 | 100 | =J59*0.15 | 80 |  |  | =SUM(I59:O59) | =P59*D59 |
| 6.3 |  |  |  | =P60*'Top Sheet'!$H$27 | =E60*D60 |  | 0 | =(H60*G60)+G60 |  |  |  |  |  |  | =SUM(I60:O60) | =P60*D60 |
| 6.4 |  |  |  | =P61*'Top Sheet'!$H$27 | =E61*D61 |  | 0 | =(H61*G61)+G61 |  |  |  |  |  |  | =SUM(I61:O61) | =P61*D61 |
| 6.5 |  |  |  | =P62*'Top Sheet'!$H$27 | =E62*D62 |  | 0 | =(H62*G62)+G62 |  |  |  |  |  |  | =SUM(I62:O62) | =P62*D62 |
| 6.6 |  |  |  | =P63*'Top Sheet'!$H$27 | =E63*D63 |  | 0 | =(H63*G63)+G63 |  |  |  |  |  |  | =SUM(I63:O63) | =P63*D63 |
| 6.7 |  |  |  | =P64*'Top Sheet'!$H$27 | =E64*D64 |  | 0 | =(H64*G64)+G64 |  |  |  |  |  |  | =SUM(I64:O64) | =P64*D64 |
| 6.8 |  |  |  | =P65*'Top Sheet'!$H$27 | =E65*D65 |  | 0 | =(H65*G65)+G65 |  |  |  |  |  |  | =SUM(I65:O65) | =P65*D65 |
| 6.9 |  |  |  | =P66*'Top Sheet'!$H$27 | =E66*D66 |  | 0 | =(H66*G66)+G66 |  |  |  |  |  |  | =SUM(I66:O66) | =P66*D66 |
| 7 | Utility buildings MV Switch gear work |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | خرسانة جاهزة | نجارة و فرمجة | حديد التسليح | حدادة | هالك | مياه للمعالجة |  |  |
| 7.1 |  Plain Concrete for Foundations: Furnishing and batching plain concrete for the construction of the plain concrete blocks as indicated on the drawings and as directed by the Engineer. The required characteristic strength is 200 Kg/cm2. The used Cement should comply to the geotechnical report. | m3 | 16.5 | =P69*'Top Sheet'!$H$27 | =E69*D69 |  | 0 | =(H69*G69)+G69 | 2300 | 500 |  |  | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83bda17590> |  | =SUM(I69:O69) | =P69*D69 |
| 7.2 | Reinforced Concrete For Foundation: Furnishing and batching reinforced concrete for the construction of the reinforced concrete Raft, reinforced concrete blocks and footings as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 14.5 | =P70*'Top Sheet'!$H$27 | =E70*D70 |  | 0 | =(H70*G70)+G70 | 2800 | 750 | 4000 | 950 | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83bda14cb0> | 245 | =SUM(I70:O70) | =P70*D70 |
| 7.3 | Reinforced Concrete For Columns, Walls and retaining Walls : Furnishing and batching reinforced concrete for the construction of the reinforced concrete Columns, reinforced concrete blocks and walls as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it.  The Required characteristic strength is 300 Kg/cm2. The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 8 | =P71*'Top Sheet'!$H$27 | =E71*D71 |  | 0 | =(H71*G71)+G71 | 2800 | 1100 | 4400 | 1000 | =SUM(J71:M71)*0.1 | 245 | =SUM(I71:O71) | =P71*D71 |
| 7.4 | Reinforced Concrete For Slab on Grade: Furnishing and batching reinforced concrete for the construction of the reinforced concrete slab on grade as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it.  The Required characteristic strength is 250 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 26.5 | =P72*'Top Sheet'!$H$27 | =E72*D72 |  | 0 | =(H72*G72)+G72 | 2800 | 750 | 3200 | 950 | =SUM(J72:M72)*0.1 | 245 | =SUM(I72:O72) | =P72*D72 |
| 7.5 | Reinforced Concrete For Slabs: Furnishing and batching reinforced concrete for the construction of the reinforced concrete slabs and beams as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 44 | =P73*'Top Sheet'!$H$27 | =E73*D73 |  | 0 | =(H73*G73)+G73 | 2800 | 1050 | 4000 | 950 | =SUM(J73:M73)*0.1 | 246 | =SUM(I73:O73) | =P73*D73 |
| 7.6 |  |  |  | =P74*'Top Sheet'!$H$27 | =E74*D74 |  | 0 | =(H74*G74)+G74 |  |  |  |  |  |  | =SUM(I74:O74) | =P74*D74 |
| 7.7 |  |  |  | =P75*'Top Sheet'!$H$27 | =E75*D75 |  | 0 | =(H75*G75)+G75 |  |  |  |  |  |  | =SUM(I75:O75) | =P75*D75 |
| 7.8 |  |  |  | =P76*'Top Sheet'!$H$27 | =E76*D76 |  | 0 | =(H76*G76)+G76 |  |  |  |  |  |  | =SUM(I76:O76) | =P76*D76 |
| 7.9 |  |  |  | =P77*'Top Sheet'!$H$27 | =E77*D77 |  | 0 | =(H77*G77)+G77 |  |  |  |  |  |  | =SUM(I77:O77) | =P77*D77 |
| 8 | Utility buildings MV Gear insulation works |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 8.1 | Supply and install 400 Micron polyethylene sheets under plain concrete according to drawings and specifications. | m2 | 79 | =P80*'Top Sheet'!$H$27 | =E80*D80 |  | 0 | =(H80*G80)+G80 | 90 | 60 |  |  |  |  | =SUM(I80:O80) | =P80*D80 |
| 8.2 | Prepare and apply two coats cold applied bitumen emulsion on foundations, ground beams, columns necks and brick walls beneath slab on grade level as indicated on the drawings and as directed by the engineer | m2 | 135 | =P81*'Top Sheet'!$H$27 | =E81*D81 |  | 0 | =(H81*G81)+G81 | 50 | 80 |  |  |  |  | =SUM(I81:O81) | =P81*D81 |
| 8.3 | Supply and install 400 Micron polyethylene sheets below the reinforced slab on grade according to drawings and specifications. | m2 | 175 | =P82*'Top Sheet'!$H$27 | =E82*D82 |  | 0 | =(H82*G82)+G82 | 90 | 60 |  |  |  |  | =SUM(I82:O82) | =P82*D82 |
| 8.4 |  |  |  | =P83*'Top Sheet'!$H$27 | =E83*D83 |  | 0 | =(H83*G83)+G83 |  |  |  |  |  |  | =SUM(I83:O83) | =P83*D83 |
| 8.5 |  |  |  | =P84*'Top Sheet'!$H$27 | =E84*D84 |  | 0 | =(H84*G84)+G84 |  |  |  |  |  |  | =SUM(I84:O84) | =P84*D84 |
| 8.6 |  |  |  | =P85*'Top Sheet'!$H$27 | =E85*D85 |  | 0 | =(H85*G85)+G85 |  |  |  |  |  |  | =SUM(I85:O85) | =P85*D85 |
| 8.7 |  |  |  | =P86*'Top Sheet'!$H$27 | =E86*D86 |  | 0 | =(H86*G86)+G86 |  |  |  |  |  |  | =SUM(I86:O86) | =P86*D86 |
| 8.8 |  |  |  | =P87*'Top Sheet'!$H$27 | =E87*D87 |  | 0 | =(H87*G87)+G87 |  |  |  |  |  |  | =SUM(I87:O87) | =P87*D87 |
| 8.9 |  |  |  | =P88*'Top Sheet'!$H$27 | =E88*D88 |  | 0 | =(H88*G88)+G88 |  |  |  |  |  |  | =SUM(I88:O88) | =P88*D88 |
| 9 | ITEM NO. 9 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | مباني | مونة | بناء | هالك | عزل حراري | مياه للمعالجة |  |  |
| 9.1 | Walls; 120 thick | m2 | 47 | =P91*'Top Sheet'!$H$27 | =E91*D91 |  | 0 | =(H91*G91)+G91 | 100 | 20 | 40 | =SUM(H91:L91)*0.05 |  |  | =SUM(I91:O91) | =P91*D91 |
| 9.2 | Walls; 250 thick | m3 | 54 | =P92*'Top Sheet'!$H$27 | =E92*D92 |  | 0 | =(H92*G92)+G92 | 1500 | 450 | 1000 | =SUM(H92:L92)*0.05 |  |  | =SUM(I92:O92) | =P92*D92 |
| 9.3 | Ladders; galvanized steel; as per specifications and drawings; 5000 effective height; as per specifications and drawings | nr | 1 | =P93*'Top Sheet'!$H$27 | =E93*D93 |  | 0 | =(H93*G93)+G93 |  |  |  |  |  |  | =SUM(I93:O93) | =P93*D93 |
| 9.4 | Supply and install steel louvers with electrostatic powder coted , rate include all accessories as per specefication and drawings L01(0.80*0.80 ) m | nr | 2 | =P94*'Top Sheet'!$H$27 | =E94*D94 |  | 0 | =(H94*G94)+G94 |  |  |  |  |  |  | =SUM(I94:O94) | =P94*D94 |
| 9.5 | L02(4.00*0.80 ) m | nr | 1 | =P95*'Top Sheet'!$H$27 | =E95*D95 |  | 0 | =(H95*G95)+G95 |  |  |  |  |  |  | =SUM(I95:O95) | =P95*D95 |
| 9.6 | Water-proofing torchable bituminous membrane; to Roofs, terraces and planters; as per specifications and drawings | m2 | 210 | =P96*'Top Sheet'!$H$27 | =E96*D96 |  | 0 | =(H96*G96)+G96 | 90 | 60 |  |  |  |  | =SUM(I96:O96) | =P96*D96 |
| 9.7 | Cementitious waterproofing for wet area ( toilets ) ; as per specifications and drawings | m2 | 2.5 | =P97*'Top Sheet'!$H$27 | =E97*D97 |  | 0 | =(H97*G97)+G97 | 420 |  |  |  |  |  | =SUM(I97:O97) | =P97*D97 |
| 9.8 | Thermal insulation; polystyrene foam; Roofs; as per specifications and drawings | m2 | 200 | =P98*'Top Sheet'!$H$27 | =E98*D98 |  | 0 | =(H98*G98)+G98 | 90 | 60 |  |  |  |  | =SUM(I98:O98) | =P98*D98 |
| 9.9 | Lightweight sloped foam  concrete ; as per specifications and drawings; to; Roofs | m2 | 200 | =P99*'Top Sheet'!$H$27 | =E99*D99 |  | 0 | =(H99*G99)+G99 | 150 | 50 | 70 |  |  |  | =SUM(I99:O99) | =P99*D99 |
| 9.1 | Plain concrete protection to be applied above waterproofing membrane for roof insulation; as per specifications and drawings | m2 | 200 | =P100*'Top Sheet'!$H$27 | =E100*D100 |  | 0 | =(H100*G100)+G100 | 330 |  |  |  |  |  | =SUM(I100:O100) | =P100*D100 |
| 9.11 | supply and install hinged glazed windows , 6 mm thick. And aluminum frame ,  Rate include all accessories as per details , specification and drawings . W1  (0.8*1.80) m | nr | 13 | =P101*'Top Sheet'!$H$27 | =E101*D101 |  | 0 | =(H101*G101)+G101 | 6000 | 1500 |  |  | 500 |  | =SUM(I101:O101) | =P101*D101 |
| 9.12 | W2  (0.8*0.80) m | nr | 1 | =P102*'Top Sheet'!$H$27 | =E102*D102 |  | 0 | =(H102*G102)+G102 | 4000 | 1000 |  |  | 400 |  | =SUM(I102:O102) | =P102*D102 |
| 9.13 | Supply and install steel  double hinged leaves door with louvers , rate include all accessories as per specification and drawings D1 (2.00*3.30) m | nr | 2 | =P103*'Top Sheet'!$H$27 | =E103*D103 |  | 0 | =(H103*G103)+G103 | 30000 | 4000 |  |  | 1000 |  | =SUM(I103:O103) | =P103*D103 |
| 9.14 | Supply and install steel single hinged door , rate includes all accessories as per specifications and drawings D2 (1.00*3.00 ) m | nr | 1 | =P104*'Top Sheet'!$H$27 | =E104*D104 |  | 0 | =(H104*G104)+G104 | 12000 | 2500 |  |  | 750 |  | =SUM(I104:O104) | =P104*D104 |
| 9.15 | D3 (0.80*2.20 ) m | nr | 1 | =P105*'Top Sheet'!$H$27 | =E105*D105 |  | 0 | =(H105*G105)+G105 | 22000 |  |  |  |  |  | =SUM(I105:O105) | =P105*D105 |
|  |  |  |  |  |  |  |  |  | خرسانة جاهزة | نجارة و فرمجة | حديد التسليح | حدادة | هالك | مياه للمعالجة |  |  |
| 9.16 |  Plain Concrete for Foundations: Furnishing and batching plain concrete for the construction of the plain concrete blocks as indicated on the drawings and as directed by the Engineer. The required characteristic strength is 200 Kg/cm2. The used Cement should comply to the geotechnical report. | m3 | 7 | =P107*'Top Sheet'!$H$27 | =E107*D107 |  | 0 | =(H107*G107)+G107 | 2300 | 500 |  |  | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83cf712c90> |  | =SUM(I107:O107) | =P107*D107 |
| 9.17 | Reinforced Concrete For Foundation: Furnishing and batching reinforced concrete for the construction of the reinforced concrete Raft, reinforced concrete blocks and footings as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 6.5 | =P108*'Top Sheet'!$H$27 | =E108*D108 |  | 0 | =(H108*G108)+G108 | 2800 | 750 | 4000 | 950 | <openpyxl.worksheet.formula.ArrayFormula object at 0x7f83cf712960> | 245 | =SUM(I108:O108) | =P108*D108 |
| 9.18 | Reinforced Concrete For Columns, Walls and retaining Walls : Furnishing and batching reinforced concrete for the construction of the reinforced concrete Columns, reinforced concrete blocks and walls as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it.  The Required characteristic strength is 300 Kg/cm2. The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 3.5 | =P109*'Top Sheet'!$H$27 | =E109*D109 |  | 0 | =(H109*G109)+G109 | 2800 | 1100 | 4400 | 1000 | =SUM(J109:M109)*0.1 | 245 | =SUM(I109:O109) | =P109*D109 |
| 9.19 | Reinforced Concrete For Slab on Grade: Furnishing and batching reinforced concrete for the construction of the reinforced concrete slab on grade as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it.  The Required characteristic strength is 250 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 10 | =P110*'Top Sheet'!$H$27 | =E110*D110 |  | 0 | =(H110*G110)+G110 | 2800 | 750 | 3200 | 950 | =SUM(J110:M110)*0.1 | 245 | =SUM(I110:O110) | =P110*D110 |
| 9.2 | Reinforced Concrete For Slabs: Furnishing and batching reinforced concrete for the construction of the reinforced concrete slabs and beams as indicated on the drawings and as directed by the Engineer. The reinforcement is as per drawings and the price includes it. The Required characteristic strength is 300 Kg/cm2.The used cement should comply to the geotechnical report. The contractor has to submit a full concrete mix design to be approved by the engineer. | m3 | 18.5 | =P111*'Top Sheet'!$H$27 | =E111*D111 |  | 0 | =(H111*G111)+G111 | 2800 | 1050 | 4000 | 950 | =SUM(J111:M111)*0.1 | 246 | =SUM(I111:O111) | =P111*D111 |
| 9.21 | Supply and install 400 Micron polyethylene sheets under plain concrete according to drawings and specifications. | m2 | 33 | =P112*'Top Sheet'!$H$27 | =E112*D112 |  | 0 | =(H112*G112)+G112 | 90 | 60 |  |  |  |  | =SUM(I112:O112) | =P112*D112 |
| 9.22 | Prepare and apply two coats cold applied bitumen emulsion on foundations, ground beams, columns necks and brick walls beneath slab on grade level as indicated on the drawings and as directed by the engineer | m2 | 53 | =P113*'Top Sheet'!$H$27 | =E113*D113 |  | 0 | =(H113*G113)+G113 | 50 | 80 |  |  |  |  | =SUM(I113:O113) | =P113*D113 |
| 9.23 | Supply and install 400 Micron polyethylene sheets below the reinforced slab on grade according to drawings and specifications. | m2 | 66 | =P114*'Top Sheet'!$H$27 | =E114*D114 |  | 0 | =(H114*G114)+G114 | 90 | 60 |  |  |  |  | =SUM(I114:O114) | =P114*D114 |
| TOTAL  |  |  |  |  | =SUM(F4:F114) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q114) |

## Sheet: ARCHITECTURE

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | Utility building internal finishes |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات |  |  |  |  |
| 1.1 | Supply and application of cement–sand plaster (rendering) at a cement content of 350 kg of cement per cubic meter of sand, applied to internal/external surfaces as shown on drawings. The rate shall include spatter dash coat (hacking/rough coat), screeds and leveling guides (dots and screeds), all corners, beads, accessories, mechanical mixing, scaffolding, curing, and all necessary materials and workmanship required to complete the work in accordance with the approved drawings, technical specifications, Egyptian Code of Practice, good workmanship standards, and the Engineer’s/Employer’s instructions. | m2 | 290 | =P5*'Top Sheet'!$H$27 | =E5*D5 |  | 0 | =(H5*G5)+G5 | 125 | 120 | =J5*0.05 | 30 |  |  | =SUM(I5:O5) | =P5*D5 |
| 1.2 | supply and apply two coats of plastic emulsion paint (e.g. Jotun or equivalent approved brand). The rate shall include all necessary surface preparation, including application of approved filler/putty, one coat  of sealer (anti-absorbent / moisture barrier), and all materials, labor, tools, and accessories required to complete the work in accordance with the approved drawings, technical specifications, Egyptian Code  of Practice, good workmanship standards, and the Engineer’s/Employer’s instructions | m2 | 290 | =P6*'Top Sheet'!$H$27 | =E6*D6 |  | 0 | =(H6*G6)+G6 | 175 | 120 | =J6*0.05 |  |  |  | =SUM(I6:O6) | =P6*D6 |
| 1.3 | Supply and application of cement–sand plaster (rendering) at a cement content of 350 kg of cement per cubic meter of sand, applied to internal/external surfaces as shown on drawings. The rate shall include spatter dash coat (hacking/rough coat), screeds and leveling guides (dots and screeds), all corners, beads, accessories, mechanical mixing, scaffolding, curing, and all necessary materials and workmanship required to complete the work in accordance with the approved drawings, technical specifications, Egyptian Code of Practice, good workmanship standards, and the Engineer’s/Employer’s instructions. | m2 | 100 | =P7*'Top Sheet'!$H$27 | =E7*D7 |  | 0 | =(H7*G7)+G7 | 125 | 120 | =J7*0.05 | 30 |  |  | =SUM(I7:O7) | =P7*D7 |
| 1.4 | supply and apply two coats of plastic emulsion paint (e.g. Jotun or equivalent approved brand). The rate shall include all necessary surface preparation, including application of approved filler/putty, one coat  of sealer (anti-absorbent / moisture barrier), and all materials, labor, tools, and accessories required to complete the work in accordance with the approved drawings, technical specifications, Egyptian Code  of Practice, good workmanship standards, and the Engineer’s/Employer’s instructions | m2 | 100 | =P8*'Top Sheet'!$H$27 | =E8*D8 |  | 0 | =(H8*G8)+G8 | 175 | 120 | =J8*0.05 |  |  |  | =SUM(I8:O8) | =P8*D8 |
| 1.5 | supply and apply two coats of epoxy paint (e.g., Sika or equivalent approved brand) on concrete surfaces in accordance with the approved sample. The rate shall include all necessary surface preparation and all materials, labor, tools, and accessories required to complete the work in accordance with the approved drawings, technical specifications, Egyptian Code of Practice, good workmanship standards, and the Engineer’s/Employer’s instructions. | m2 | 132 | =P9*'Top Sheet'!$H$27 | =E9*D9 |  | 0 | =(H9*G9)+G9 | 180 | 120 | =J9*0.05 |  |  |  | =SUM(I9:O9) | =P9*D9 |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 1.6 | Supply and install bituminous protection boards for protection of waterproofing membranes to  retaining walls and underground structures, including all fixing works, accessories and all materials and labor required to complete the work in accordance with the approved drawings, technical  specifications, Egyptian Code of Practice, good workmanship standards, and the Engineer’s / Employer’s instructions | m2 | 300 | =P11*'Top Sheet'!$H$27 | =E11*D11 |  | 0 | =(H11*G11)+G11 | 95 | 100 | =J11*0.15 | 80 |  |  | =SUM(I11:O11) | =P11*D11 |
| 2 | Utility building metals |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2.1 | supply and install a galvanized steel vertical ladder with a height of 5.20 meters. The rate shall include all fixing/anchoring works, all accessories, and all materials and labor required to complete the work in accordance with the approved drawings, technical specifications, good workmanship standards, and the Engineer’s/Employer’s instructions. | NO | 1 | =P13*'Top Sheet'!$H$27 | =E13*D13 |  | 0 | =(H13*G13)+G13 | 45000 |  |  |  |  |  | =SUM(I13:O13) | =P13*D13 |
| 2.2 | supply and install a galvanized steel vertical ladder with a height of 3.0 meters. The rate shall include all fixing/anchoring works, all accessories, and all materials and labor required to complete the work in accordance with the approved drawings, technical specifications, good workmanship standards, and the Engineer’s/Employer’s instructions. | NO | 1 | =P14*'Top Sheet'!$H$27 | =E14*D14 |  | 0 | =(H14*G14)+G14 | 30000 |  |  |  |  |  | =SUM(I14:O14) | =P14*D14 |
| 2.3 | cover (210*210) CM | NO | 1 | =P15*'Top Sheet'!$H$27 | =E15*D15 |  | 0 | =(H15*G15)+G15 | 36000 |  |  |  |  |  | =SUM(I15:O15) | =P15*D15 |
| 2.4 | cover (110*110) CM | NO | 2 | =P16*'Top Sheet'!$H$27 | =E16*D16 |  | 0 | =(H16*G16)+G16 | 24500 |  |  |  |  |  | =SUM(I16:O16) | =P16*D16 |
| 2.5 | cover (510*210) CM | NO | 1 | =P17*'Top Sheet'!$H$27 | =E17*D17 |  | 0 | =(H17*G17)+G17 | 48500 |  |  |  |  |  | =SUM(I17:O17) | =P17*D17 |
| 2.6 | cover (735*150) CM | NO | 2 | =P18*'Top Sheet'!$H$27 | =E18*D18 |  | 0 | =(H18*G18)+G18 | 55750 |  |  |  |  |  | =SUM(I18:O18) | =P18*D18 |
| 3 | Utility building tank internal finishes |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | سيراميك | مونة | فرشة رمل | مبلط | هالك |  |  |  |
| 3.1 | Supply and installation of ceramic tiles (impermeable and treated to resist bacteria and algae, with dimensions not exceeding 30 cm on any side), or approved equivalent, in accordance with the approved sample, for the water tank.The price shall include cement mortar bedding, adhesive materials, grouting with Sika or approved equivalent, and all labor, materials, tools, and accessories necessary to complete the item in accordance with good workmanship practices, the Egyptian Code of Practice, and the instructions of the First Party.” | m2 | 2625 | =P21*'Top Sheet'!$H$27 | =E21*D21 |  | 0 | =(H21*G21)+G21 | 250 | 80 | 15 | 90 | =SUM(J21:L21)*0.15 |  | =SUM(I21:O21) | =P21*D21 |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات |  |  |  |  |
| 3.2 | Supply and execution of cement plastering works using cement mortar with a cement content of 350 kg per cubic meter of sand The price shall include surface splashing (rough coat), screeds and plumb dots, all corners and required accessories, mechanical mixing, and all labor, materials, tools, and works necessary to complete the item in accordance with the engineering drawings, technical specifications, good workmanship practices, and the instructions of the First Party.” | m2 | 1586 | =P23*'Top Sheet'!$H$27 | =E23*D23 |  | 0 | =(H23*G23)+G23 | 125 | 120 | =J23*0.05 | 30 |  |  | =SUM(I23:O23) | =P23*D23 |
| 3.3 | Supply and application of epoxy paint, impermeable and approved for potable water and fish use, in accordance with the product data sheet, for the water tank. The price shall include all necessary surface preparation works, application of a waterproof sealer coat, and all labor, materials, tools, and accessories required to complete the item in accordance with the engineering drawings, technical specifications, good workmanship practices, the Egyptian Code of Practice, and the instructions of the First Party | m2 | 1586 | =P24*'Top Sheet'!$H$27 | =E24*D24 |  | 0 | =(H24*G24)+G24 | 180 | 120 | =J24*0.05 |  |  |  | =SUM(I24:O24) | =P24*D24 |
|  |  |  |  |  |  |  |  |  | سيراميك | مونة | فرشة رمل | مبلط | هالك |  |  |  |
| 3.4 | Supply and installation of ceramic tiles (impermeable and treated to resist bacteria and algae, with dimensions not exceeding 30 cm on any side), or approved equivalent, in accordance with the approved sample, for the water tank The price shall include cement mortar bedding, adhesive materials, grouting with Sika or approved equivalent, and all labor, materials, tools, and accessories necessary to complete the item in accordance with good workmanship practices, the Egyptian Code of Practice, and the instructions of the First Party.” | m2 | 1561 | =P26*'Top Sheet'!$H$27 | =E26*D26 |  | 0 | =(H26*G26)+G26 | 250 | 80 | 15 | 90 | =SUM(J26:L26)*0.15 |  | =SUM(I26:O26) | =P26*D26 |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 3.5 | Supply and install bituminous protection boards for protection of waterproofing membranes to retaining walls and underground structures, including all fixing works, accessories and all materials and labor required to complete the work in accordance with the approved drawings, technical specifications, Egyptian Code of Practice, good workmanship standards, and the Engineer’s / | m2 | 1321 | =P28*'Top Sheet'!$H$27 | =E28*D28 |  | 0 | =(H28*G28)+G28 | 95 | 100 | =J28*0.15 | 80 |  |  | =SUM(I28:O28) | =P28*D28 |
| 4 | Utility building  tank metals |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 | supply and install a galvanized steel vertical ladder with a height of 5.75 meters. The rate shall include all fixing/anchoring works, all accessories, and all materials and labor required to complete the work in accordance with the approved drawings, technical specifications, good workmanship standards, and the Engineer’s/Employer’s instructions. | NO | 8 | =P30*'Top Sheet'!$H$27 | =E30*D30 |  | 0 | =(H30*G30)+G30 | 47500 |  |  |  |  |  | =SUM(I30:O30) | =P30*D30 |
| 4.2 | supply and install a galvanized steel vertical ladder with a height of 7.20 meters. The rate shall include all fixing/anchoring works, all accessories, and all materials and labor required to complete the work in accordance with the approved drawings, technical specifications, good workmanship standards, and the Engineer’s/Employer’s instructions. | NO | 3 | =P31*'Top Sheet'!$H$27 | =E31*D31 |  | 0 | =(H31*G31)+G31 | 56200 |  |  |  |  |  | =SUM(I31:O31) | =P31*D31 |
| 4.3 | cover (290*290) CM | NO | 1 | =P32*'Top Sheet'!$H$27 | =E32*D32 |  | 0 | =(H32*G32)+G32 | 34500 |  |  |  |  |  | =SUM(I32:O32) | =P32*D32 |
| 4.4 | cover (170*160) CM | NO | 1 | =P33*'Top Sheet'!$H$27 | =E33*D33 |  | 0 | =(H33*G33)+G33 | 27000 |  |  |  |  |  | =SUM(I33:O33) | =P33*D33 |
| 4.5 | cover (160*160) CM | NO | 3 | =P34*'Top Sheet'!$H$27 | =E34*D34 |  | 0 | =(H34*G34)+G34 | 27000 |  |  |  |  |  | =SUM(I34:O34) | =P34*D34 |
| 4.6 | cover (130*130) CM | NO | 4 | =P35*'Top Sheet'!$H$27 | =E35*D35 |  | 0 | =(H35*G35)+G35 | 24500 |  |  |  |  |  | =SUM(I35:O35) | =P35*D35 |
| 4.7 | cover (140*130) CM | NO | 2 | =P36*'Top Sheet'!$H$27 | =E36*D36 |  | 0 | =(H36*G36)+G36 | 25000 |  |  |  |  |  | =SUM(I36:O36) | =P36*D36 |
| 5 | Utility building tank roof finishes |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | البلاط | فرشة رمل | مصنعية تركيب |  |  |  |  |  |
| 5.1 | Supply and installation of interlock tiles for roof finish, including cement mortar or adhesive, grouting, cutting, and all accessories, complete as per approved samples and specifications.good workmanship standards, Egyptian Code of Practice, and the Engineer’s/Employer’s instruction | m2 | 1714 | =P39*'Top Sheet'!$H$27 | =E39*D39 |  | 0 | =(H39*G39)+G39 | 400 | 25 | 65 |  |  |  | =SUM(I39:O39) | =P39*D39 |
|  |  |  |  |  |  |  |  |  | مونة اللياسة | مصنعية فرد |  |  |  |  |  |  |
| 5.2 | Supply and execution of cement screed to roof surface, minimum thickness (… mm), including leveling, slope formation toward drainage points, and all materials and workmanship complete. | m2 | 1714 | =P41*'Top Sheet'!$H$27 | =E41*D41 |  | 0 | =(H41*G41)+G41 | 800 | 120 |  |  |  |  | =SUM(I41:O41) | =P41*D41 |
| 5.3 | Supply and apply cement screed for surface leveling, including slopes, as per specifications good workmanship standards, Egyptian Code of Practice, and the Engineer’s/Employer’s instruction | m2 | 1714 | =P42*'Top Sheet'!$H$27 | =E42*D42 |  | 0 | =(H42*G42)+G42 | 800 | 120 |  |  |  |  | =SUM(I42:O42) | =P42*D42 |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 5.4 | Supply and application of bituminous waterproofing membrane to roof surface, including surface preparation, primer, overlapping, protection, and all accessories, complete as per manufacturer instructions and specifications.good workmanship standards, Egyptian Code of Practice, and the Engineer’s/Employer’s instruction | m2 | 2065 | =P44*'Top Sheet'!$H$27 | =E44*D44 |  | 0 | =(H44*G44)+G44 | 95 | 100 | =J44*0.15 | 80 |  |  | =SUM(I44:O44) | =P44*D44 |
| 6 | ITEM NO. 6 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات |  |  |  |  |
| 6.1 | supply and apply Aclyric paint on cement plaster , as per specifications and drawings | m2 | 300 | =P47*'Top Sheet'!$H$27 | =E47*D47 |  | 0 | =(H47*G47)+G47 | 175 | 120 | =J47*0.05 |  |  |  | =SUM(I47:O47) | =P47*D47 |
|  |  |  |  |  |  |  |  |  | سيراميك | مونة | فرشة رمل | مبلط | هالك |  |  |  |
| 6.2 | supply and install ceramic tiles 30x30x0.8cm on 2cm thk cement plaster w/ adhesive , as per specifications and drawings | m2 | 22 | =P49*'Top Sheet'!$H$27 | =E49*D49 |  | 0 | =(H49*G49)+G49 | 250 | 80 | 15 | 90 | =SUM(J49:L49)*0.15 |  | =SUM(I49:O49) | =P49*D49 |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات |  |  |  |  |
| 6.3 | Supply, Install, epoxy paint on smooth finish concrete w\hardener, as per specifications and drawings | m2 | 150 | =P51*'Top Sheet'!$H$27 | =E51*D51 |  | 0 | =(H51*G51)+G51 | 180 | 120 | =J51*0.05 |  |  |  | =SUM(I51:O51) | =P51*D51 |
|  |  |  |  |  |  |  |  |  | سيراميك | مونة | فرشة رمل | مبلط | هالك |  |  |  |
| 6.4 | supply,install non slip ceramic tiles 30x30x0.8cm  on 2cm thk cement mortar & sand  , as per specifications and drawings | m2 | 2 | =P53*'Top Sheet'!$H$27 | =E53*D53 |  | 0 | =(H53*G53)+G53 | 350 | 80 | 15 | 90 | =SUM(J53:L53)*0.15 |  | =SUM(I53:O53) | =P53*D53 |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات |  |  |  |  |
| 6.5 | Supply and apply acrylic paint on 2cm thk cement plaster, as per specifications and drawings | m2 | 150 | =P55*'Top Sheet'!$H$27 | =E55*D55 |  | 0 | =(H55*G55)+G55 | 175 | 120 | =J55*0.05 |  |  |  | =SUM(I55:O55) | =P55*D55 |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات | سقالات |  |  |  |
| 6.6 | Supply and apply Dry mix render , with decorative smooth finish , white color to; External walls, soffits, fair-face concrete surfaces; as per specifications and drawings | m2 | 132 | =P57*'Top Sheet'!$H$27 | =E57*D57 |  | 0 | =(H57*G57)+G57 | 80 | 120 | =J57*0.05 | 30 | 20 |  | =SUM(I57:O57) | =P57*D57 |
| 6.7 | External 5cm thk. natural stone on 3cm cement mortar ; rate include accessories and all materials to complete fixation as per details ,  specifications and drawings; to | m2 | 62 | =P58*'Top Sheet'!$H$27 | =E58*D58 |  | 0 | =(H58*G58)+G58 |  |  |  |  |  |  | =SUM(I58:O58) | =P58*D58 |
| 7 | ITEM NO. 7 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | مباني | مونة | بناء | هالك | عزل حراري | مياه للمعالجة |  |  |
| 7.1 | Walls; 250 thick | m3 | 35 | =P61*'Top Sheet'!$H$27 | =E61*D61 |  | 0 | =(H61*G61)+G61 | 100 | 20 | 40 | =SUM(H61:L61)*0.05 |  |  | =SUM(I61:O61) | =P61*D61 |
| 7.2 | Walls;120 thick | m2 | 70 | =P62*'Top Sheet'!$H$27 | =E62*D62 |  | 0 | =(H62*G62)+G62 | 1500 | 450 | 1000 | =SUM(H62:L62)*0.05 |  |  | =SUM(I62:O62) | =P62*D62 |
| 7.3 | louvers: Supply and install steel louvers with electrostatic powder coted , rate include all accessories as per specefication and drawings L01  (0.80*2.00) m | nr | 3 | =P63*'Top Sheet'!$H$27 | =E63*D63 |  | 0 | =(H63*G63)+G63 | 15700 |  |  |  |  |  | =SUM(I63:O63) | =P63*D63 |
| 7.4 | L02  (0.60*0.80) m | nr | 1 | =P64*'Top Sheet'!$H$27 | =E64*D64 |  | 0 | =(H64*G64)+G64 | 12400 |  |  |  |  |  | =SUM(I64:O64) | =P64*D64 |
|  |  |  |  |  |  |  |  |  | لفائف البيتومين | مصنعية التركيب | تراكب ووزر | دهان برايمر |  |  |  |  |
| 7.5 | Water-proofing torchable bituminous membrane; to Roofs, terraces and planters; as per specifications and drawings | m2 | 85 | =P66*'Top Sheet'!$H$27 | =E66*D66 |  | 0 | =(H66*G66)+G66 | 95 | 100 | =J66*0.15 | 80 |  |  | =SUM(I66:O66) | =P66*D66 |
|  |  |  |  |  |  |  |  |  | البوليسترين | مصنعية التركيب | فرش بولي ايثيلين |  |  |  |  |  |
| 7.6 | Thermal insulation; polystyrene foam; Roofs; as per specifications and drawings | m2 | 66 | =P68*'Top Sheet'!$H$27 | =E68*D68 |  | 0 | =(H68*G68)+G68 | 650 | 100 | 150 |  |  |  | =SUM(I68:O68) | =P68*D68 |
| 7.7 | Lightweight sloped foam  concrete ; as per specifications and drawings; to; Roofs | m2 | 66 | =P69*'Top Sheet'!$H$27 | =E69*D69 |  | 0 | =(H69*G69)+G69 | 150 | 50 | 70 |  |  |  | =SUM(I69:O69) | =P69*D69 |
|  |  |  |  |  |  |  |  |  | خرسانة عادية | مصنعية فرد |  |  |  |  |  |  |
| 7.8 | Plain concrete protection to be applied above waterproofing membrane for roof insulation; as per specifications and drawings | m2 | 66 | =P71*'Top Sheet'!$H$27 | =E71*D71 |  | 0 | =(H71*G71)+G71 | 900 | 120 |  |  |  |  | =SUM(I71:O71) | =P71*D71 |
| 8 | ITEM NO. 8 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 8.1 | Supply and install steel hinged leaves door with louvers , rate include all accessories as per specification and drawings D1 (1.00*2.40) m | nr | 2 | =P73*'Top Sheet'!$H$27 | =E73*D73 |  | 0 | =(H73*G73)+G73 | 25400 |  |  |  |  |  | =SUM(I73:O73) | =P73*D73 |
| 8.2 | D1 (1.20*2.40) m | nr | 1 | =P74*'Top Sheet'!$H$27 | =E74*D74 |  | 0 | =(H74*G74)+G74 | 27000 |  |  |  |  |  | =SUM(I74:O74) | =P74*D74 |
| 8.3 | supply and apply Aclyric paint on cement plaster , as per specifications and drawings | m2 | 180 | =P75*'Top Sheet'!$H$27 | =E75*D75 |  | 0 | =(H75*G75)+G75 | 175 | 120 | =J75*0.05 |  |  |  | =SUM(I75:O75) | =P75*D75 |
| 8.4 | Supply, Install, epoxy paint on smooth finish concrete w\hardener, as per specifications and drawings | m2 | 56 | =P76*'Top Sheet'!$H$27 | =E76*D76 |  | 0 | =(H76*G76)+G76 | 180 | 120 | =J76*0.05 |  |  |  | =SUM(I76:O76) | =P76*D76 |
| 8.5 | Supply and apply acrylic paint on 2cm thk cement plaster, as per specifications and drawings | m2 | 56 | 461.602263832985 | =E77*D77 |  | 0 | =(H77*G77)+G77 | 175 | 120 | =J77*0.05 |  |  |  | =SUM(I77:O77) | =P77*D77 |
|  |  |  |  |  |  |  |  |  | مونة | ممحر | هالك | مستلزمات | سقالات |  |  |  |
| 8.6 | Supply and apply Dry mix render , with decorative smooth finish , white color to; External walls, soffits, fair-face concrete surfaces; as per specifications and drawings | m2 | 135 | =P79*'Top Sheet'!$H$27 | =E79*D79 |  | 0 | =(H79*G79)+G79 | 80 | 120 | =J79*0.05 | 30 | 20 |  | =SUM(I79:O79) | =P79*D79 |
|  |  |  |  |  |  |  |  |  | حجر | مونة التركيب | مصنعية | سقالات |  |  |  |  |
| 8.7 | External 5cm thk. natural stone on 3cm cement mortar ; rate include accessories and all materials to complete fixation as per details ,  specifications and drawings; to | m2 | 26 | =P81*'Top Sheet'!$H$27 | =E81*D81 |  | 0 | =(H81*G81)+G81 | 400 | 80 | 90 | 20 |  |  | =SUM(I81:O81) | =P81*D81 |
| TOTAL  |  |  |  |  | =SUM(F5:F81) |  |  |  |  |  |  |  |  |  |  | =SUM(Q5:Q81) |

## Sheet: ELEC.

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | utility buildings Sockets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1.1 | 20A single socket outlets by copper wires 3(1x3) mm2 in 20 mm pvc conduit. | No | 4 | =P4*'Top Sheet'!$H$27 | =E4*D4 |  | 0 | =(H4*G4)+G4 |  |  |  |  |  |  | =SUM(I4:O4) | =P4*D4 |
| 1.2 | '32A disconnects outlets by copper wires 3(1x6) mm2 in 25 mm pvc conduit. | No | 1 | =P5*'Top Sheet'!$H$27 | =E5*D5 |  | 0 | =(H5*G5)+G5 |  |  |  |  |  |  | =SUM(I5:O5) | =P5*D5 |
| 1.3 | 'disconnects outlets  three phase for CP | No | 1 | =P6*'Top Sheet'!$H$27 | =E6*D6 |  | 0 | =(H6*G6)+G6 |  |  |  |  |  |  | =SUM(I6:O6) | =P6*D6 |
| 2 | utility buildings Cables |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2.1 | (3x240+120)mm2 AL/XLPE/STA/PVC  TO FEED CP | m | 20 | =P8*'Top Sheet'!$H$27 | =E8*D8 |  | 0 | =(H8*G8)+G8 |  |  |  |  |  |  | =SUM(I8:O8) | =P8*D8 |
| 2.2 | (3x240+120)mm2 AL/XLPE/STA/PVC  TO FEED DP-TR.AND DP-FP | m | 35 | =P9*'Top Sheet'!$H$27 | =E9*D9 |  | 0 | =(H9*G9)+G9 |  |  |  |  |  |  | =SUM(I9:O9) | =P9*D9 |
| 2.3 | (3x35+16)mm2 AL/XLPE/STA/PVC  TO FEED      DP- SP1. | m | 5 | =P10*'Top Sheet'!$H$27 | =E10*D10 |  | 0 | =(H10*G10)+G10 |  |  |  |  |  |  | =SUM(I10:O10) | =P10*D10 |
| 2.4 | (3x185+95)mm2 AL/XLPE/STA/PVC  TO FEED   DP- CP1. | m | 5 | =P11*'Top Sheet'!$H$27 | =E11*D11 |  | 0 | =(H11*G11)+G11 |  |  |  |  |  |  | =SUM(I11:O11) | =P11*D11 |
| 2.5 | (3x70+35)mm2 AL/XLPE/STA/PVC  TO FEED DP- CP2. | m | 5 | =P12*'Top Sheet'!$H$27 | =E12*D12 |  | 0 | =(H12*G12)+G12 |  |  |  |  |  |  | =SUM(I12:O12) | =P12*D12 |
| 2.6 | (1*120)mm2 CU/PVC/PVC  . | m | 35 | =P13*'Top Sheet'!$H$27 | =E13*D13 |  | 0 | =(H13*G13)+G13 |  |  |  |  |  |  | =SUM(I13:O13) | =P13*D13 |
| 2.7 | (1*95)mm2 CU/PVC/PVC  . | m | 5 | =P14*'Top Sheet'!$H$27 | =E14*D14 |  | 0 | =(H14*G14)+G14 |  |  |  |  |  |  | =SUM(I14:O14) | =P14*D14 |
| 2.8 | (1*35)mm2 CU/PVC/PVC  . | m | 5 | =P15*'Top Sheet'!$H$27 | =E15*D15 |  | 0 | =(H15*G15)+G15 |  |  |  |  |  |  | =SUM(I15:O15) | =P15*D15 |
| 2.9 | (1*16)mm2 CU/PVC/PVC  . | m | 5 | =P16*'Top Sheet'!$H$27 | =E16*D16 |  | 0 | =(H16*G16)+G16 |  |  |  |  |  |  | =SUM(I16:O16) | =P16*D16 |
| 2.1 | (4X16) CU/XLPE/PVC TO FEED DB-1 | m | 15 | =P17*'Top Sheet'!$H$27 | =E17*D17 |  | 0 | =(H17*G17)+G17 |  |  |  |  |  |  | =SUM(I17:O17) | =P17*D17 |
| 2.11 | (3X50+1X25) CU/XLPE/PVC TO FEED MDB-SG | m | 25 | =P18*'Top Sheet'!$H$27 | =E18*D18 |  | 0 | =(H18*G18)+G18 |  |  |  |  |  |  | =SUM(I18:O18) | =P18*D18 |
| 2.12 | (4X25) CU/XLPE/PVC TO FEED DB-2 | m | 15 | =P19*'Top Sheet'!$H$27 | =E19*D19 |  | 0 | =(H19*G19)+G19 |  |  |  |  |  |  | =SUM(I19:O19) | =P19*D19 |
| 2.13 | (1x16) CU/PVC EEC | m | 15 | =P20*'Top Sheet'!$H$27 | =E20*D20 |  | 0 | =(H20*G20)+G20 |  |  |  |  |  |  | =SUM(I20:O20) | =P20*D20 |
| 2.14 | (1x25) CU/PVC EEC | m | 25 | =P21*'Top Sheet'!$H$27 | =E21*D21 |  | 0 | =(H21*G21)+G21 |  |  |  |  |  |  | =SUM(I21:O21) | =P21*D21 |
| 3 | utility buildings WIRING DEVICES AND DISCONNECTORS: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3.1 | Single double pole + earth 20A socket | No | 1 | =P23*'Top Sheet'!$H$27 | =E23*D23 |  | 0 | =(H23*G23)+G23 |  |  |  |  |  |  | =SUM(I23:O23) | =P23*D23 |
| 3.2 | Single double pole + earth 20A socket  WP | No | 3 | =P24*'Top Sheet'!$H$27 | =E24*D24 |  | 0 | =(H24*G24)+G24 |  |  |  |  |  |  | =SUM(I24:O24) | =P24*D24 |
| 3.3 | Disconnect switch 2P, 32A | No. | 1 | =P25*'Top Sheet'!$H$27 | =E25*D25 |  | 0 | =(H25*G25)+G25 |  |  |  |  |  |  | =SUM(I25:O25) | =P25*D25 |
| 3.4 | Disconnect switch three phase for CP | No. | 1 | =P26*'Top Sheet'!$H$27 | =E26*D26 |  | 0 | =(H26*G26)+G26 |  |  |  |  |  |  | =SUM(I26:O26) | =P26*D26 |
| 3.5 | One way switch one gang 10A, weather proof type. | No. | 1 | =P27*'Top Sheet'!$H$27 | =E27*D27 |  | 0 | =(H27*G27)+G27 |  |  |  |  |  |  | =SUM(I27:O27) | =P27*D27 |
| 3.6 | 32A disconnects outlets by copper wires 3(1x6) mm2 in 25 mm pvc conduit. | no | 2 | =P28*'Top Sheet'!$H$27 | =E28*D28 |  | 0 | =(H28*G28)+G28 |  |  |  |  |  |  | =SUM(I28:O28) | =P28*D28 |
| 3.7 | 32A disconnects outlets by copper wires 3(1x6) mm2 in 25 mm pvc conduit. | no | 2 | =P29*'Top Sheet'!$H$27 | =E29*D29 |  | 0 | =(H29*G29)+G29 |  |  |  |  |  |  | =SUM(I29:O29) | =P29*D29 |
| 3.8 | Disconnect switch 2P, 32A, (IP54) | no | 2 | =P30*'Top Sheet'!$H$27 | =E30*D30 |  | 0 | =(H30*G30)+G30 |  |  |  |  |  |  | =SUM(I30:O30) | =P30*D30 |
| 3.9 | Two way switch one gang 10A.(IP54) | no | 2 | =P31*'Top Sheet'!$H$27 | =E31*D31 |  | 0 | =(H31*G31)+G31 |  |  |  |  |  |  | =SUM(I31:O31) | =P31*D31 |
| 4 | utility buildings Lighting |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 | Lighting outlets by copper wire 3(1x3) sqmm in 20 mm pvc conduit. | No. | =8+6 | =P33*'Top Sheet'!$H$27 | =E33*D33 |  | 0 | =(H33*G33)+G33 |  |  |  |  |  |  | =SUM(I33:O33) | =P33*D33 |
| 4.2 | TYPE F1 | No. | =8+6 | =P34*'Top Sheet'!$H$27 | =E34*D34 |  | 0 | =(H34*G34)+G34 |  |  |  |  |  |  | =SUM(I34:O34) | =P34*D34 |
| 5 | utility buildings Switchboards |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 5.1 | Low Voltage Board (DB-1). | No. | 1 | =P36*'Top Sheet'!$H$27 | =E36*D36 |  | 0 | =(H36*G36)+G36 |  |  |  |  |  |  | =SUM(I36:O36) | =P36*D36 |
| 5.2 | 26 00 00 Electrical (Cont.) (16 425) LOW VOLTAGE SWITCHBOARDS Supply,install, the quantity Take off sheet and  Panel Schedules, testing, commissioning, start up  and putting into satisfactory operation for cables  and Supply all hooking up of all incoming and  outgoing feeders and all necessary accessories  and ancillary materials required for complete  installation for the following panels. DP-TR. | no | 1 | =P37*'Top Sheet'!$H$27 | =E37*D37 |  | 0 | =(H37*G37)+G37 |  |  |  |  |  |  | =SUM(I37:O37) | =P37*D37 |
| 5.3 | DP-FB. | no | 1 | =P38*'Top Sheet'!$H$27 | =E38*D38 |  | 0 | =(H38*G38)+G38 |  |  |  |  |  |  | =SUM(I38:O38) | =P38*D38 |
| 5.4 | MAGNETIC TRIP ONLY CIRCUIT BREAKER FOR FIRE PUMP 400A . | no | 1 | =P39*'Top Sheet'!$H$27 | =E39*D39 |  | 0 | =(H39*G39)+G39 |  |  |  |  |  |  | =SUM(I39:O39) | =P39*D39 |
| 5.5 | 22KV , metal-enclosed type, M.V.S.G with  motorized vacuum C.B. consist of : no. 4 incoming cells, no. 6 outgoing  cells, 1no. bus coupler & 1no.riser,2 spare cell complete with all measuring, protection  instruments, busbars,  fittings, accessories,  include 110 dcv battery and battery charger rack  to provide for the circuit breaker shunt trip coil to  ensure that energy will be available for tripping  during fault conditions and shall also be provided  for closing coil and spring motor, complete with  all fittings, components, accessories, and all  related ancillary works. (OPTIONAL ITEM) MVSG | No | 1 | =P40*'Top Sheet'!$H$27 | =E40*D40 |  | 0 | =(H40*G40)+G40 |  |  |  |  |  |  | =SUM(I40:O40) | =P40*D40 |
| 5.6 | Install, Transport from HPD store to  site, testing,  commissioning, start up and putting into  satisfactory operation and handing over with  electrical authority foR meduim voltage switch  gear ,testing and commissioning of the following  equipment including earthing , all accessories and  necessary works required for installation as  shown on drawings  and as described in  specifications. MVSG | No | 1 | =P41*'Top Sheet'!$H$27 | =E41*D41 |  | 0 | =(H41*G41)+G41 |  |  |  |  |  |  | =SUM(I41:O41) | =P41*D41 |
| 24 | Utility RING MAIN UNITS 22KV |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | RMU (2+1) | No | 1 | =P43*'Top Sheet'!$H$27 | =E43*D43 |  | 0 | =(H43*G43)+G43 |  |  |  |  |  |  | =SUM(I43:O43) | =P43*D43 |
| 24.2 | RMU (2+1) | No | 1 | =P44*'Top Sheet'!$H$27 | =E44*D44 |  | 0 | =(H44*G44)+G44 |  |  |  |  |  |  | =SUM(I44:O44) | =P44*D44 |
| 24 | Utility DISTRIBUTION TRANSFORMERS -optional item |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Oil Type 50 KVA | NO | 1 | =P46*'Top Sheet'!$H$27 | =E46*D46 |  | 0 | =(H46*G46)+G46 |  |  |  |  |  |  | =SUM(I46:O46) | =P46*D46 |
| 24 | Utility DISTRIBUTION TRANSFORMERS -optional item |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Oil Type 50 KVA | NO | 1 | =P48*'Top Sheet'!$H$27 | =E48*D48 |  | 0 | =(H48*G48)+G48 |  |  |  |  |  |  | =SUM(I48:O48) | =P48*D48 |
| 24 | Utility Socket Outlets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | 20A single socket outlets by copper wires 3(1x3) mm2 in 20 mm pvc conduit. | No | 12 | =P50*'Top Sheet'!$H$27 | =E50*D50 |  | 0 | =(H50*G50)+G50 |  |  |  |  |  |  | =SUM(I50:O50) | =P50*D50 |
| 24.2 | 20A disconnects outlets by copper wires 3(1x3) mm2 in 25 mm pvc conduit. | No | 1 | =P51*'Top Sheet'!$H$27 | =E51*D51 |  | 0 | =(H51*G51)+G51 |  |  |  |  |  |  | =SUM(I51:O51) | =P51*D51 |
| 24.3 | 16A outlets for ex.fan by copper wires 3(1x4) mm2 in 20 mm pvc conduit. | No | 7 | =P52*'Top Sheet'!$H$27 | =E52*D52 |  | 0 | =(H52*G52)+G52 |  |  |  |  |  |  | =SUM(I52:O52) | =P52*D52 |
| 24.4 | Ceiling fan outlets by copper wire 3(1x3) sqmm in 20 mm pvc conduit. | No. | 4 | =P53*'Top Sheet'!$H$27 | =E53*D53 |  | 0 | =(H53*G53)+G53 |  |  |  |  |  |  | =SUM(I53:O53) | =P53*D53 |
| 24.5 | 32A disconnects outlets by copper wires 3(1x6) mm2 in 25 mm pvc conduit. | No | 1 | =P54*'Top Sheet'!$H$27 | =E54*D54 |  | 0 | =(H54*G54)+G54 |  |  |  |  |  |  | =SUM(I54:O54) | =P54*D54 |
| 24.6 | 20A three phase industrial outlets by copper wires 5(1x6) mm2 in 32 mm pvc conduit. | No | 3 | =P55*'Top Sheet'!$H$27 | =E55*D55 |  | 0 | =(H55*G55)+G55 |  |  |  |  |  |  | =SUM(I55:O55) | =P55*D55 |
| 24 | Utility Wiring Devices and Disconnectors |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Single double pole + earth 16A socket ,same as SO01 | No | 12 | =P57*'Top Sheet'!$H$27 | =E57*D57 |  | 0 | =(H57*G57)+G57 |  |  |  |  |  |  | =SUM(I57:O57) | =P57*D57 |
| 24.2 | Three phase industrial  20A socket  ,same as SO02 | No | 3 | =P58*'Top Sheet'!$H$27 | =E58*D58 |  | 0 | =(H58*G58)+G58 |  |  |  |  |  |  | =SUM(I58:O58) | =P58*D58 |
| 24 | Utility Wiring Devices and Disconnectors |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Disconnect switch 2P, 32A, | No. | 1 | =P60*'Top Sheet'!$H$27 | =E60*D60 |  | 0 | =(H60*G60)+G60 |  |  |  |  |  |  | =SUM(I60:O60) | =P60*D60 |
| 24.2 | Disconnect switch 2P, 20A, IP 54 FOR EWH | No. | 1 | =P61*'Top Sheet'!$H$27 | =E61*D61 |  | 0 | =(H61*G61)+G61 |  |  |  |  |  |  | =SUM(I61:O61) | =P61*D61 |
| 24 | Utility Wiring Devices and Disconnectors |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | One way switch one gang 10A | No. | 10 | =P63*'Top Sheet'!$H$27 | =E63*D63 |  | 0 | =(H63*G63)+G63 |  |  |  |  |  |  | =SUM(I63:O63) | =P63*D63 |
| 24.2 | One way switch two gang 10A, weather proof type. | No. | 4 | =P64*'Top Sheet'!$H$27 | =E64*D64 |  | 0 | =(H64*G64)+G64 |  |  |  |  |  |  | =SUM(I64:O64) | =P64*D64 |
| 24.3 | Two way switch one gang 10A | No. | 2 | =P65*'Top Sheet'!$H$27 | =E65*D65 |  | 0 | =(H65*G65)+G65 |  |  |  |  |  |  | =SUM(I65:O65) | =P65*D65 |
| 24 | Utility LIGHTING INSTALLATION |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Lighting outlets by copper wire 3(1x3) sqmm in 20 mm pvc conduit. | No. | 32 | =P67*'Top Sheet'!$H$27 | =E67*D67 |  | 0 | =(H67*G67)+G67 |  |  |  |  |  |  | =SUM(I67:O67) | =P67*D67 |
| 24 | Utility LIGHTING  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | TYPE F1 | No. | 8 | =P69*'Top Sheet'!$H$27 | =E69*D69 |  | 0 | =(H69*G69)+G69 |  |  |  |  |  |  | =SUM(I69:O69) | =P69*D69 |
| 24.2 | TYPE F2 | No. | 3 | =P70*'Top Sheet'!$H$27 | =E70*D70 |  | 0 | =(H70*G70)+G70 |  |  |  |  |  |  | =SUM(I70:O70) | =P70*D70 |
| 24.3 | TYPE F3 | No. | 9 | =P71*'Top Sheet'!$H$27 | =E71*D71 |  | 0 | =(H71*G71)+G71 |  |  |  |  |  |  | =SUM(I71:O71) | =P71*D71 |
| 24.4 | TYPE F4 | No. | 9 | =P72*'Top Sheet'!$H$27 | =E72*D72 |  | 0 | =(H72*G72)+G72 |  |  |  |  |  |  | =SUM(I72:O72) | =P72*D72 |
| 24.5 | TYPE F5 | No. | 2 | =P73*'Top Sheet'!$H$27 | =E73*D73 |  | 0 | =(H73*G73)+G73 |  |  |  |  |  |  | =SUM(I73:O73) | =P73*D73 |
| 24.6 | TYPE F6 | No. | 5 | =P74*'Top Sheet'!$H$27 | =E74*D74 |  | 0 | =(H74*G74)+G74 |  |  |  |  |  |  | =SUM(I74:O74) | =P74*D74 |
| 24.7 | DI | No. | 2 | =P75*'Top Sheet'!$H$27 | =E75*D75 |  | 0 | =(H75*G75)+G75 |  |  |  |  |  |  | =SUM(I75:O75) | =P75*D75 |
| 24 | Utility GROUNDING AND BONDING |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Supply, install, test & connect earthing system complete with copper rods, plates, manhalls network connected to wells, all components and accessories, and all necessary to finish works according to drawings, specs and international standerds requirements of the Electrical Distribution Company ,MEDUIM voltage Earthing system its resistance not exceed 5 ohm. | L.S. | 1 | =P77*'Top Sheet'!$H$27 | =E77*D77 |  | 0 | =(H77*G77)+G77 |  |  |  |  |  |  | =SUM(I77:O77) | =P77*D77 |
| 24 | Utility Low Voltage Switch Boards |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Main Low Voltage Board (MDB-SG). | No | 1 | =P79*'Top Sheet'!$H$27 | =E79*D79 |  | 0 | =(H79*G79)+G79 |  |  |  |  |  |  | =SUM(I79:O79) | =P79*D79 |
| 24.2 | DB1-Panel | No | 1 | =P80*'Top Sheet'!$H$27 | =E80*D80 |  | 0 | =(H80*G80)+G80 |  |  |  |  |  |  | =SUM(I80:O80) | =P80*D80 |
| 24.3 | DB2 - Panel | No | 1 | =P81*'Top Sheet'!$H$27 | =E81*D81 |  | 0 | =(H81*G81)+G81 |  |  |  |  |  |  | =SUM(I81:O81) | =P81*D81 |
| 24 | Utility FEEDERS AND SUBFEEDERS CABLES |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | (3X185+95)+(1X95) CU.TO FEED |  |  | =P83*'Top Sheet'!$H$27 | =E83*D83 |  | 0 | =(H83*G83)+G83 |  |  |  |  |  |  | =SUM(I83:O83) | =P83*D83 |
| 24.2 | ATS-(GEN.) & ATS-EMDB-DC | Mt. | 50 | =P84*'Top Sheet'!$H$27 | =E84*D84 |  | 0 | =(H84*G84)+G84 |  |  |  |  |  |  | =SUM(I84:O84) | =P84*D84 |
| 24.3 | (4X6)+(1X6) CU.TO FEED |  |  | =P85*'Top Sheet'!$H$27 | =E85*D85 |  | 0 | =(H85*G85)+G85 |  |  |  |  |  |  | =SUM(I85:O85) | =P85*D85 |
| 24.4 | PP-UPS | Mt. | 15 | =P86*'Top Sheet'!$H$27 | =E86*D86 |  | 0 | =(H86*G86)+G86 |  |  |  |  |  |  | =SUM(I86:O86) | =P86*D86 |
| 24 | Utility Electric Outlets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Electric outlets for SU-01&SU-02 by copper wires 3(1x6) mm2 in 25MM  UPVC conduit | No. | 6 | =P88*'Top Sheet'!$H$27 | =E88*D88 |  | 0 | =(H88*G88)+G88 |  |  |  |  |  |  | =SUM(I88:O88) | =P88*D88 |
| 24.2 | 20A single socket outlets by copper wires 3(1x4) mm2 in 25MM  UPVC conduit | No. | 3 | =P89*'Top Sheet'!$H$27 | =E89*D89 |  | 0 | =(H89*G89)+G89 |  |  |  |  |  |  | =SUM(I89:O89) | =P89*D89 |
| 24.3 | 16A duplex socket outlets by copper wires 3(1x3) mm2 in 20MM UPVC conduit | No. | 8 | =P90*'Top Sheet'!$H$27 | =E90*D90 |  | 0 | =(H90*G90)+G90 |  |  |  |  |  |  | =SUM(I90:O90) | =P90*D90 |
| 24.4 | 20A duplex socket outlets by copper wires 3(1x4) mm2 in 25MM UPVC conduit | No. | 10 | =P91*'Top Sheet'!$H$27 | =E91*D91 |  | 0 | =(H91*G91)+G91 |  |  |  |  |  |  | =SUM(I91:O91) | =P91*D91 |
| 24.5 | Electric outlets by copper wires 3(1x4) mm2 in 25MM  UPVC conduit  for F.F &F.A & Access door | No. | 4 | =P92*'Top Sheet'!$H$27 | =E92*D92 |  | 0 | =(H92*G92)+G92 |  |  |  |  |  |  | =SUM(I92:O92) | =P92*D92 |
| 24 | Utility SOCKETS OUTLETS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Duplex double pole + earth 16A normal socket for screen | No. | 8 | =P94*'Top Sheet'!$H$27 | =E94*D94 |  | 0 | =(H94*G94)+G94 |  |  |  |  |  |  | =SUM(I94:O94) | =P94*D94 |
| 24.2 | Duplex double pole + earth 20A Power socket | No. | 10 | =P95*'Top Sheet'!$H$27 | =E95*D95 |  | 0 | =(H95*G95)+G95 |  |  |  |  |  |  | =SUM(I95:O95) | =P95*D95 |
| 24.3 | Single double pole + earth 20A socket but weather proof (IP54) | No. | 3 | =P96*'Top Sheet'!$H$27 | =E96*D96 |  | 0 | =(H96*G96)+G96 |  |  |  |  |  |  | =SUM(I96:O96) | =P96*D96 |
| 24 | Utility DISCONNECTING SWITCHES |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Disconnect switch 32 A, 220V with neon for SU-01&SU-02 | No. | 6 | =P98*'Top Sheet'!$H$27 | =E98*D98 |  | 0 | =(H98*G98)+G98 |  |  |  |  |  |  | =SUM(I98:O98) | =P98*D98 |
| 24 | Utility LIGHTING SWITCHES |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | One way switch one gang 10A. | No. | 4 | =P100*'Top Sheet'!$H$27 | =E100*D100 |  | 0 | =(H100*G100)+G100 |  |  |  |  |  |  | =SUM(I100:O100) | =P100*D100 |
| 24.2 | One way switch one gang 10A.(IP54) | No. | 2 | =P101*'Top Sheet'!$H$27 | =E101*D101 |  | 0 | =(H101*G101)+G101 |  |  |  |  |  |  | =SUM(I101:O101) | =P101*D101 |
| 24 | Utility LIGHTING OUTLETS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Supplying, installing, connecting and testing lighting outlets including conduits, conduit fittings, boxes, wiring, cabling, earthing, accessories and all necessary works and materials required for complete installation back to panel boards as specified and as indicated on the drawings. |  |  | =P103*'Top Sheet'!$H$27 | =E103*D103 |  | 0 | =(H103*G103)+G103 |  |  |  |  |  |  | =SUM(I103:O103) | =P103*D103 |
| 24.2 | F1 | No. | 6 | =P104*'Top Sheet'!$H$27 | =E104*D104 |  | 0 | =(H104*G104)+G104 |  |  |  |  |  |  | =SUM(I104:O104) | =P104*D104 |
| 24 | Utility LIGHTING,POWER AND A/C PANELS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | PP-UPS | No. | 1 | =P106*'Top Sheet'!$H$27 | =E106*D106 |  | 0 | =(H106*G106)+G106 |  |  |  |  |  |  | =SUM(I106:O106) | =P106*D106 |
| 24.2 | EMDB-DC | No. | 1 | =P107*'Top Sheet'!$H$27 | =E107*D107 |  | 0 | =(H107*G107)+G107 |  |  |  |  |  |  | =SUM(I107:O107) | =P107*D107 |
| 24 | Utility DIESEL GENERATOR SET |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | 100 KW standby genset. | No. | 1 | =P109*'Top Sheet'!$H$27 | =E109*D109 |  | 0 | =(H109*G109)+G109 |  |  |  |  |  |  | =SUM(I109:O109) | =P109*D109 |
| 24 | Utility AUTOMATIC TRANSFERE SWITCH ( ATS ) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | A.T.S -250A-change over | No. | 1 | =P111*'Top Sheet'!$H$27 | =E111*D111 |  | 0 | =(H111*G111)+G111 |  |  |  |  |  |  | =SUM(I111:O111) | =P111*D111 |
| 24 | Utility EARTHING SYSTEM  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Low voltage earting system( switchboards, diesel generator set ,equipments,...) with earthing resistane not exceed 1 ohm. | L.S | 1 | =P113*'Top Sheet'!$H$27 | =E113*D113 |  | 0 | =(H113*G113)+G113 |  |  |  |  |  |  | =SUM(I113:O113) | =P113*D113 |
| 24.2 | Special earthing system for all telecommunication equipments racks, frames and computer system with earthing resistane not exceed 0.5 ohm. | L.S | 1 | =P114*'Top Sheet'!$H$27 | =E114*D114 |  | 0 | =(H114*G114)+G114 |  |  |  |  |  |  | =SUM(I114:O114) | =P114*D114 |
| 24 | Utility UNINTERRUPTABLE POWER SUPPLY (UPS) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | 380/380V , 10KVA | No. | 1 | =P116*'Top Sheet'!$H$27 | =E116*D116 |  | 0 | =(H116*G116)+G116 |  |  |  |  |  |  | =SUM(I116:O116) | =P116*D116 |
| 24 | Utility MAIN FIRE ALARM CONTROL PANEL (ADDRESSABLE INTELLEGENT) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | F.A.C.P  (2) loops | No. | 1 | =P118*'Top Sheet'!$H$27 | =E118*D118 |  | 0 | =(H118*G118)+G118 |  |  |  |  |  |  | =SUM(I118:O118) | =P118*D118 |
| 24 | Utility ALARM STATION OUTLETS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Supplying, installing, connecting and testing alarm outles including hot dip galvanized steel conduits for exposed installation,upvc fire retardant conduit for embeded installation, conduit fittings, back boxes, shilding 105 degree cable (2x1.5)sqmm for loop and (2x2)sqmm for others, and all necessary ancillary works and material for complete installation starting from the outlet and back to the main fire alarm panel as specified and as indicated on the drawings | No. | 13 | =P120*'Top Sheet'!$H$27 | =E120*D120 |  | 0 | =(H120*G120)+G120 |  |  |  |  |  |  | =SUM(I120:O120) | =P120*D120 |
| 24 | Utility ALARM STATION (INTELLEGENT) DEVICES |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Fire alarm manual station - weather proof  ( IP54 ) | No. | 1 | =P122*'Top Sheet'!$H$27 | =E122*D122 |  | 0 | =(H122*G122)+G122 |  |  |  |  |  |  | =SUM(I122:O122) | =P122*D122 |
| 24.2 | Fire alarm saren with strobe light - weather proof  ( IP54 ) | No. | 1 | =P123*'Top Sheet'!$H$27 | =E123*D123 |  | 0 | =(H123*G123)+G123 |  |  |  |  |  |  | =SUM(I123:O123) | =P123*D123 |
| 24.3 | Monitor module to interface with fire fighting system | No. | 6 | =P124*'Top Sheet'!$H$27 | =E124*D124 |  | 0 | =(H124*G124)+G124 |  |  |  |  |  |  | =SUM(I124:O124) | =P124*D124 |
| 24.4 | Photo electric multi detector with sounder base | No. | 3 | =P125*'Top Sheet'!$H$27 | =E125*D125 |  | 0 | =(H125*G125)+G125 |  |  |  |  |  |  | =SUM(I125:O125) | =P125*D125 |
| 24.5 | Control module for Access door | No. | 2 | =P126*'Top Sheet'!$H$27 | =E126*D126 |  | 0 | =(H126*G126)+G126 |  |  |  |  |  |  | =SUM(I126:O126) | =P126*D126 |
| 24 | Utility DATA OUTLET |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Data outlet for TEL. | No. | 2 | =P128*'Top Sheet'!$H$27 | =E128*D128 |  | 0 | =(H128*G128)+G128 |  |  |  |  |  |  | =SUM(I128:O128) | =P128*D128 |
| 24.2 | Duplex Data outlet | No. | 6 | =P129*'Top Sheet'!$H$27 | =E129*D129 |  | 0 | =(H129*G129)+G129 |  |  |  |  |  |  | =SUM(I129:O129) | =P129*D129 |
| 24.3 | HDMI outlet | No. | 8 | =P130*'Top Sheet'!$H$27 | =E130*D130 |  | 0 | =(H130*G130)+G130 |  |  |  |  |  |  | =SUM(I130:O130) | =P130*D130 |
| 24 | Utility DATA SOCKET |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Duplex Data socket RJ (45) | No. | 6 | =P132*'Top Sheet'!$H$27 | =E132*D132 |  | 0 | =(H132*G132)+G132 |  |  |  |  |  |  | =SUM(I132:O132) | =P132*D132 |
| 24.2 | Data socket RJ (45) for TEL. | No. | 2 | =P133*'Top Sheet'!$H$27 | =E133*D133 |  | 0 | =(H133*G133)+G133 |  |  |  |  |  |  | =SUM(I133:O133) | =P133*D133 |
| 24 | Utility Data racks |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | DR-CCTV | No. | 1 | =P135*'Top Sheet'!$H$27 | =E135*D135 |  | 0 | =(H135*G135)+G135 |  |  |  |  |  |  | =SUM(I135:O135) | =P135*D135 |
| 24 | Utility Patch panels |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | F.O patch panel 48 port for CCTV | NO | 2 | =P137*'Top Sheet'!$H$27 | =E137*D137 |  | 0 | =(H137*G137)+G137 |  |  |  |  |  |  | =SUM(I137:O137) | =P137*D137 |
| 24.2 | UTP patch panel 24 port  for DATA | NO | 1 | =P138*'Top Sheet'!$H$27 | =E138*D138 |  | 0 | =(H138*G138)+G138 |  |  |  |  |  |  | =SUM(I138:O138) | =P138*D138 |
| 24 |  Utility Active Components  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Data switch 12port 10/100/1000+ 2port 1G. | No. | 1 | =P140*'Top Sheet'!$H$27 | =E140*D140 |  | 0 | =(H140*G140)+G140 |  |  |  |  |  |  | =SUM(I140:O140) | =P140*D140 |
| 24.2 | Core switch Dual Redundant Power Supplies, 24 port 10/100/1000 with F.O modules,min Routing/Switching capacity 993.6 Gbps | No. | 1 | =P141*'Top Sheet'!$H$27 | =E141*D141 |  | 0 | =(H141*G141)+G141 |  |  |  |  |  |  | =SUM(I141:O141) | =P141*D141 |
| 24.3 | Network-based video recorder supporting up to 64 network streams , Record up to 400fps at full D1 resolution , MPEG-4/JPEG dual codec, C/W management software and web viewer support , HDD STORAGE MIN. 2WEEKS AND CAM LICENSE | No. | 2 | =P142*'Top Sheet'!$H$27 | =E142*D142 |  | 0 | =(H142*G142)+G142 |  |  |  |  |  |  | =SUM(I142:O142) | =P142*D142 |
| 24.4 | CCTV workstation with dual VGA card,license software,HDD storage, DVD RW,keyboard fand all needed accessories for  complete system operation similar to dell t1600 or fapprove | No. | 4 | =P143*'Top Sheet'!$H$27 | =E143*D143 |  | 0 | =(H143*G143)+G143 |  |  |  |  |  |  | =SUM(I143:O143) | =P143*D143 |
| 24.5 | 42 INCH TFT LED MONITOR, HIGH BRIGHT 450CD/M2 | No. | 8 | =P144*'Top Sheet'!$H$27 | =E144*D144 |  | 0 | =(H144*G144)+G144 |  |  |  |  |  |  | =SUM(I144:O144) | =P144*D144 |
| 24 | Utility Access Door Control outlets: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Supplying, installing, connecting and testing access door  system Two door  network outlets (reader,P.B,contact,lock outlets) including cat6A ,RS485,special cables per manufacture recommendation, fire retardant UPVC conduits for embeded instalation , EMT conduit for exposed installation, conduit fittings, boxes and all necessary accessories and ancillary works and materials required for complete installations as specified and as indicated on the drawings item include interface network cables and enclusers with main panel. | No. | 1 | =P146*'Top Sheet'!$H$27 | =E146*D146 |  | 0 | =(H146*G146)+G146 |  |  |  |  |  |  | =SUM(I146:O146) | =P146*D146 |
| 24 | Utility Access Door Control System Devices: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | [2 DOORS] Door modular networked controller including relays I/O Board c/w  power supplies & batteriesc, software,interface modules,enclusures and all necessary accessories and ancillary materials and works required for complete installation as specified and as indicated on the drawings. | No. | 1 | =P148*'Top Sheet'!$H$27 | =E148*D148 |  | 0 | =(H148*G148)+G148 |  |  |  |  |  |  | =SUM(I148:O148) | =P148*D148 |
| 24.2 | Proximity card reader c/w numeric keypad . | No. | 2 | =P149*'Top Sheet'!$H$27 | =E149*D149 |  | 0 | =(H149*G149)+G149 |  |  |  |  |  |  | =SUM(I149:O149) | =P149*D149 |
| 24.3 | Biometric Fingerprint card reader with numeric keypad for time attendance. | No. | 2 | =P150*'Top Sheet'!$H$27 | =E150*D150 |  | 0 | =(H150*G150)+G150 |  |  |  |  |  |  | =SUM(I150:O150) | =P150*D150 |
| 24.4 | Push button for exit | No. | 2 | =P151*'Top Sheet'!$H$27 | =E151*D151 |  | 0 | =(H151*G151)+G151 |  |  |  |  |  |  | =SUM(I151:O151) | =P151*D151 |
| 24.5 | Door contact /sensor | No. | 2 | =P152*'Top Sheet'!$H$27 | =E152*D152 |  | 0 | =(H152*G152)+G152 |  |  |  |  |  |  | =SUM(I152:O152) | =P152*D152 |
| 24.6 | Door Electric strike | No. | 2 | =P153*'Top Sheet'!$H$27 | =E153*D153 |  | 0 | =(H153*G153)+G153 |  |  |  |  |  |  | =SUM(I153:O153) | =P153*D153 |
| 24.7 | EM Magnetic door lock | No. | 2 | =P154*'Top Sheet'!$H$27 | =E154*D154 |  | 0 | =(H154*G154)+G154 |  |  |  |  |  |  | =SUM(I154:O154) | =P154*D154 |
| 24.8 | Alarm saren with strobe light | No. | 2 | =P155*'Top Sheet'!$H$27 | =E155*D155 |  | 0 | =(H155*G155)+G155 |  |  |  |  |  |  | =SUM(I155:O155) | =P155*D155 |
| 24 | Utility SPLITTERS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Rack mounted PLC Optical Fiber splitter module 1:32 box cased. The box dimension should include fiber pigtails terminated to SC/APC connectors and 3m SC/APC-SC/APC patch cords. | No. | 85 | =P157*'Top Sheet'!$H$27 | =E157*D157 |  | 0 | =(H157*G157)+G157 |  |  |  |  |  |  | =SUM(I157:O157) | =P157*D157 |
| 24 | Utility ODF (OPTICAL DISTRIBUTION FRAME AT MAIN RACKS): |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | D.O.D.F - 288 | No. | 28 | =P159*'Top Sheet'!$H$27 | =E159*D159 |  | 0 | =(H159*G159)+G159 |  |  |  |  |  |  | =SUM(I159:O159) | =P159*D159 |
| 24.2 | D.O.D.F -144 | No. | 8 | =P160*'Top Sheet'!$H$27 | =E160*D160 |  | 0 | =(H160*G160)+G160 |  |  |  |  |  |  | =SUM(I160:O160) | =P160*D160 |
| 24.3 | D.O.D.F -96 | No. | 8 | =P161*'Top Sheet'!$H$27 | =E161*D161 |  | 0 | =(H161*G161)+G161 |  |  |  |  |  |  | =SUM(I161:O161) | =P161*D161 |
| 24.4 | D.O.D.F -72 | No. | 2 | =P162*'Top Sheet'!$H$27 | =E162*D162 |  | 0 | =(H162*G162)+G162 |  |  |  |  |  |  | =SUM(I162:O162) | =P162*D162 |
| 24.5 | M.O.D.F -96 | No. | 2 | =P163*'Top Sheet'!$H$27 | =E163*D163 |  | 0 | =(H163*G163)+G163 |  |  |  |  |  |  | =SUM(I163:O163) | =P163*D163 |
| 24 | Utility MAIN RACKS ( SERVICE PROVIDER ROOM) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | MAIN cabinet rack complete with fiber optic,  fiber optic distribution frams,splitters including power distribution panel,ventelation fans,  fiber optic patch cords, cables and all necessary accessories and ancillary works and materials required for complete installation as  specified and as indicated on the drawings . | No. | 4 | =P165*'Top Sheet'!$H$27 | =E165*D165 |  | 0 | =(H165*G165)+G165 |  |  |  |  |  |  | =SUM(I165:O165) | =P165*D165 |
| 6 | Network Supply DISTRIBUTION TRANSFORMERS KIOSK |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 6.1 | 1000 KVA | NO | 12 | =P167*'Top Sheet'!$H$27 | =E167*D167 |  | 0 | =(H167*G167)+G167 |  |  |  |  |  |  | =SUM(I167:O167) | =P167*D167 |
| 6.2 | 500 KVA | NO | 1 | =P168*'Top Sheet'!$H$27 | =E168*D168 |  | 0 | =(H168*G168)+G168 |  |  |  |  |  |  | =SUM(I168:O168) | =P168*D168 |
| 7 | Network Install DISTRIBUTION TRANSFORMERS KIOSK |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 7.1 | 1000 KVA | NO | 12 | =P170*'Top Sheet'!$H$27 | =E170*D170 |  | 0 | =(H170*G170)+G170 |  |  |  |  |  |  | =SUM(I170:O170) | =P170*D170 |
| 7.2 | 500 KVA | NO | 1 | =P171*'Top Sheet'!$H$27 | =E171*D171 |  | 0 | =(H171*G171)+G171 |  |  |  |  |  |  | =SUM(I171:O171) | =P171*D171 |
| 8 | Network Supply Pillar & Coffree |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 8.1 | LOW VOLTAGE PILLAR 200 KVA | NO | 58 | =P173*'Top Sheet'!$H$27 | =E173*D173 |  | 0 | =(H173*G173)+G173 |  |  |  |  |  |  | =SUM(I173:O173) | =P173*D173 |
| 8.2 | Coffree | NO | 245 | =P174*'Top Sheet'!$H$27 | =E174*D174 |  | 0 | =(H174*G174)+G174 |  |  |  |  |  |  | =SUM(I174:O174) | =P174*D174 |
| 9 | Network Install Pillar & Coffree |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 9.1 | LOW VOLTAGE PILLAR 200 KVA | NO | 58 | =P176*'Top Sheet'!$H$27 | =E176*D176 |  | 0 | =(H176*G176)+G176 |  |  |  |  |  |  | =SUM(I176:O176) | =P176*D176 |
| 9.2 | Coffree | NO | 245 | =P177*'Top Sheet'!$H$27 | =E177*D177 |  | 0 | =(H177*G177)+G177 |  |  |  |  |  |  | =SUM(I177:O177) | =P177*D177 |
| 10 | Network Distribution , Lighting and Power Panel Boards |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 10.1 | LDP-01 FOR LIGHTING | No | 1 | =P179*'Top Sheet'!$H$27 | =E179*D179 |  | 0 | =(H179*G179)+G179 |  |  |  |  |  |  | =SUM(I179:O179) | =P179*D179 |
| 10.2 | LDP-02 FOR LIGHTING | No | 1 | =P180*'Top Sheet'!$H$27 | =E180*D180 |  | 0 | =(H180*G180)+G180 |  |  |  |  |  |  | =SUM(I180:O180) | =P180*D180 |
| 10.3 | LDP-03 FOR LIGHTING | No | 1 | =P181*'Top Sheet'!$H$27 | =E181*D181 |  | 0 | =(H181*G181)+G181 |  |  |  |  |  |  | =SUM(I181:O181) | =P181*D181 |
| 10.4 | LDP-04 FOR LIGHTING | No | 1 | =P182*'Top Sheet'!$H$27 | =E182*D182 |  | 0 | =(H182*G182)+G182 |  |  |  |  |  |  | =SUM(I182:O182) | =P182*D182 |
| 10.5 | DP-01 FOR CABANAS | No | 1 | =P183*'Top Sheet'!$H$27 | =E183*D183 |  | 0 | =(H183*G183)+G183 |  |  |  |  |  |  | =SUM(I183:O183) | =P183*D183 |
| 10.6 | DP-02 FOR CABANAS | No | 1 | =P184*'Top Sheet'!$H$27 | =E184*D184 |  | 0 | =(H184*G184)+G184 |  |  |  |  |  |  | =SUM(I184:O184) | =P184*D184 |
| 10.7 | DP-03 FOR CABANAS | No | 1 | =P185*'Top Sheet'!$H$27 | =E185*D185 |  | 0 | =(H185*G185)+G185 |  |  |  |  |  |  | =SUM(I185:O185) | =P185*D185 |
| 10.8 | DP-04 FOR CABANAS | No | 1 | =P186*'Top Sheet'!$H$27 | =E186*D186 |  | 0 | =(H186*G186)+G186 |  |  |  |  |  |  | =SUM(I186:O186) | =P186*D186 |
| 10.9 | DP-05 FOR CABANAS | No | 1 | =P187*'Top Sheet'!$H$27 | =E187*D187 |  | 0 | =(H187*G187)+G187 |  |  |  |  |  |  | =SUM(I187:O187) | =P187*D187 |
| 11 | Network EARTHING SYSTEM FOR  PILLAR & Coffree |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 11.1 | Supply, install, connect, test and put into operation earthing pits for each Kiosk transformer substation including concrete earth pit, test links, earth rod, terminal connections, copper cables accessories and all related ancillary works. | NO | 13 | =P189*'Top Sheet'!$H$27 | =E189*D189 |  | 0 | =(H189*G189)+G189 |  |  |  |  |  |  | =SUM(I189:O189) | =P189*D189 |
| 11.2 | Supply, install, connect, test and put into operation earthing pits for each Pillar including concrete earth pit, test links, earth rod, terminal connections, copper cables accessories and all related ancillary works. | NO | 58 | =P190*'Top Sheet'!$H$27 | =E190*D190 |  | 0 | =(H190*G190)+G190 |  |  |  |  |  |  | =SUM(I190:O190) | =P190*D190 |
| 11.3 | Supply, install, connect, test and put into operation earthing pits for each coffree including concrete earth pit, test links, earth rod, terminal connections, copper cables accessories and all related ancillary works | NO | 245 | =P191*'Top Sheet'!$H$27 | =E191*D191 |  | 0 | =(H191*G191)+G191 |  |  |  |  |  |  | =SUM(I191:O191) | =P191*D191 |
| 11.4 | Supply, install, connect, test and put into operation earthing pits for outdoor lighting panel including concrete earth pit, test links, earth rod, terminal connections, copper cables accessories and all related ancillary works. | NO | 9 | =P192*'Top Sheet'!$H$27 | =E192*D192 |  | 0 | =(H192*G192)+G192 |  |  |  |  |  |  | =SUM(I192:O192) | =P192*D192 |
| 12 | Network Supply Medium Cables |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 12.1 | 3x240 mm2 18/33KV, AL/XLPE/STA/PVC. | m | 12015 | =P194*'Top Sheet'!$H$27 | =E194*D194 |  | 0 | =(H194*G194)+G194 |  |  |  |  |  |  | =SUM(I194:O194) | =P194*D194 |
| 13 | Network Install Medium Cables |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 13.1 | 3x240 mm2 18/33KV, AL/XLPE/STA/PVC | m | 12015 | =P196*'Top Sheet'!$H$27 | =E196*D196 |  | 0 | =(H196*G196)+G196 |  |  |  |  |  |  | =SUM(I196:O196) | =P196*D196 |
| 14 | Network POWER CABLES AND FEEDERS (Supply Only ) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 14.1 | (3C X240 +1CX120)mm2 AL/XLPE/STA/PVC | m | 19100 | =P198*'Top Sheet'!$H$27 | =E198*D198 |  | 0 | =(H198*G198)+G198 |  |  |  |  |  |  | =SUM(I198:O198) | =P198*D198 |
| 14.2 | (3C X185 +1CX95)mm2 AL/XLPE/STA/PVC | m | 11600 | =P199*'Top Sheet'!$H$27 | =E199*D199 |  | 0 | =(H199*G199)+G199 |  |  |  |  |  |  | =SUM(I199:O199) | =P199*D199 |
| 14.3 | (3C X70 +1CX35)mm2 AL/XLPE/STA/PVC | m | 1500 | =P200*'Top Sheet'!$H$27 | =E200*D200 |  | 0 | =(H200*G200)+G200 |  |  |  |  |  |  | =SUM(I200:O200) | =P200*D200 |
| 14.4 | (3C X35 +1CX16)mm2 AL/XLPE/STA/PVC | m | 500 | =P201*'Top Sheet'!$H$27 | =E201*D201 |  | 0 | =(H201*G201)+G201 |  |  |  |  |  |  | =SUM(I201:O201) | =P201*D201 |
| 14.5 | (4C X16 )mm2 AL/XLPE/STA/PVC FOR LIGHTING ,SWITCHES AND CABANAS | m | 18500 | =P202*'Top Sheet'!$H$27 | =E202*D202 |  | 0 | =(H202*G202)+G202 |  |  |  |  |  |  | =SUM(I202:O202) | =P202*D202 |
| 14.6 | (3C X70+35 )mm2 CU/PVC/PVC FROM COFREE TO VILLA BOUNDRY | m | 1715 | =P203*'Top Sheet'!$H$27 | =E203*D203 |  | 0 | =(H203*G203)+G203 |  |  |  |  |  |  | =SUM(I203:O203) | =P203*D203 |
| 14.7 | (1 X16 )mm2 CU/PVC for Earthing(LIGHTING AND SWITCHES) | m | 12500 | =P204*'Top Sheet'!$H$27 | =E204*D204 |  | 0 | =(H204*G204)+G204 |  |  |  |  |  |  | =SUM(I204:O204) | =P204*D204 |
| 15 | Network POWER CABLES AND FEEDERS (Install Only ) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 15.1 | (3C X240 +1CX120)mm2 AL/XLPE/STA/PVC | m | 19100 | =P206*'Top Sheet'!$H$27 | =E206*D206 |  | 0 | =(H206*G206)+G206 |  |  |  |  |  |  | =SUM(I206:O206) | =P206*D206 |
| 15.2 | (3C X185 +1CX95)mm2 AL/XLPE/STA/PVC | m | 11600 | =P207*'Top Sheet'!$H$27 | =E207*D207 |  | 0 | =(H207*G207)+G207 |  |  |  |  |  |  | =SUM(I207:O207) | =P207*D207 |
| 15.3 | (3C X70 +1CX35)mm2 AL/XLPE/STA/PVC | m | 1500 | =P208*'Top Sheet'!$H$27 | =E208*D208 |  | 0 | =(H208*G208)+G208 |  |  |  |  |  |  | =SUM(I208:O208) | =P208*D208 |
| 15.4 | (3C X35 +1CX16)mm2 AL/XLPE/STA/PVC | m | 500 | =P209*'Top Sheet'!$H$27 | =E209*D209 |  | 0 | =(H209*G209)+G209 |  |  |  |  |  |  | =SUM(I209:O209) | =P209*D209 |
| 15.5 | (4C X16 )mm2 AL/XLPE/STA/PVC FOR LIGHTING ,SWITCHES AND CABANAS | m | 18500 | =P210*'Top Sheet'!$H$27 | =E210*D210 |  | 0 | =(H210*G210)+G210 |  |  |  |  |  |  | =SUM(I210:O210) | =P210*D210 |
| 15.6 | (3C X70+35 )mm2 CU/PVC/PVC FROM COFREE TO VILLA BOUNDRY | m | 1715 | =P211*'Top Sheet'!$H$27 | =E211*D211 |  | 0 | =(H211*G211)+G211 |  |  |  |  |  |  | =SUM(I211:O211) | =P211*D211 |
| 15.7 | (1 X16 )mm2 CU/PVC for Earthing(LIGHTING AND SWITCHES) | m | 12500 | =P212*'Top Sheet'!$H$27 | =E212*D212 |  | 0 | =(H212*G212)+G212 |  |  |  |  |  |  | =SUM(I212:O212) | =P212*D212 |
| 14 | Network (Street Lighting Poles ) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 14.1 | Single Lighting Pole (6 mt) | No | 169 | =P214*'Top Sheet'!$H$27 | =E214*D214 |  | 0 | =(H214*G214)+G214 |  |  |  |  |  |  | =SUM(I214:O214) | =P214*D214 |
| 14.2 | Double Lighting Pole (6 mt) | No | 86 | =P215*'Top Sheet'!$H$27 | =E215*D215 |  | 0 | =(H215*G215)+G215 |  |  |  |  |  |  | =SUM(I215:O215) | =P215*D215 |
| 15 | Network STREET LIGHTING FIXTURES |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 15.1 | Lighting Fixtures (60W) | No | 341 | =P217*'Top Sheet'!$H$27 | =E217*D217 |  | 0 | =(H217*G217)+G217 |  |  |  |  |  |  | =SUM(I217:O217) | =P217*D217 |
| 14 |  Network Manhols,Road Crossing  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 14.1 | TYPE 01. | m | 25 | =P219*'Top Sheet'!$H$27 | =E219*D219 |  | 0 | =(H219*G219)+G219 |  |  |  |  |  |  | =SUM(I219:O219) | =P219*D219 |
| 14.2 | TYPE 02. | m | 20 | =P220*'Top Sheet'!$H$27 | =E220*D220 |  | 0 | =(H220*G220)+G220 |  |  |  |  |  |  | =SUM(I220:O220) | =P220*D220 |
| 14.3 | TYPE 03. | m | 255 | =P221*'Top Sheet'!$H$27 | =E221*D221 |  | 0 | =(H221*G221)+G221 |  |  |  |  |  |  | =SUM(I221:O221) | =P221*D221 |
| 14.4 | TYPE 04. | m | 45 | =P222*'Top Sheet'!$H$27 | =E222*D222 |  | 0 | =(H222*G222)+G222 |  |  |  |  |  |  | =SUM(I222:O222) | =P222*D222 |
| 14.5 | TYPE 05. | m | 20 | =P223*'Top Sheet'!$H$27 | =E223*D223 |  | 0 | =(H223*G223)+G223 |  |  |  |  |  |  | =SUM(I223:O223) | =P223*D223 |
| 14.6 | TYPE 06. | m | 205 | =P224*'Top Sheet'!$H$27 | =E224*D224 |  | 0 | =(H224*G224)+G224 |  |  |  |  |  |  | =SUM(I224:O224) | =P224*D224 |
| 14.7 | TYPE 07. | m | 25 | =P225*'Top Sheet'!$H$27 | =E225*D225 |  | 0 | =(H225*G225)+G225 |  |  |  |  |  |  | =SUM(I225:O225) | =P225*D225 |
| 14.8 | TYPE 08. | m | 70 | =P226*'Top Sheet'!$H$27 | =E226*D226 |  | 0 | =(H226*G226)+G226 |  |  |  |  |  |  | =SUM(I226:O226) | =P226*D226 |
| 14.9 | TYPE 09. | m | 40 | =P227*'Top Sheet'!$H$27 | =E227*D227 |  | 0 | =(H227*G227)+G227 |  |  |  |  |  |  | =SUM(I227:O227) | =P227*D227 |
| 14.1 | TYPE 10. | m | 200 | =P228*'Top Sheet'!$H$27 | =E228*D228 |  | 0 | =(H228*G228)+G228 |  |  |  |  |  |  | =SUM(I228:O228) | =P228*D228 |
| 14.11 | TYPE 11. | m | 500 | =P229*'Top Sheet'!$H$27 | =E229*D229 |  | 0 | =(H229*G229)+G229 |  |  |  |  |  |  | =SUM(I229:O229) | =P229*D229 |
| 15 | Network (Telecommunication) Air Blown Fiber Cables |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 15.1 | Outdoor ABF Single Mode Optical Fiber Cable -288 cores | Mt. | 5000 | =P231*'Top Sheet'!$H$27 | =E231*D231 |  | 0 | =(H231*G231)+G231 |  |  |  |  |  |  | =SUM(I231:O231) | =P231*D231 |
| 15.2 | Outdoor ABF Single Mode Optical Fiber Cable -144 cores | Mt. | 6100 | =P232*'Top Sheet'!$H$27 | =E232*D232 |  | 0 | =(H232*G232)+G232 |  |  |  |  |  |  | =SUM(I232:O232) | =P232*D232 |
| 15.3 | Outdoor ABF Single Mode Optical Fiber Cable -96 cores | Mt. | 5500 | =P233*'Top Sheet'!$H$27 | =E233*D233 |  | 0 | =(H233*G233)+G233 |  |  |  |  |  |  | =SUM(I233:O233) | =P233*D233 |
| 15.4 | Outdoor ABF Single Mode Optical Fiber Cable -72 cores | Mt. | 2000 | =P234*'Top Sheet'!$H$27 | =E234*D234 |  | 0 | =(H234*G234)+G234 |  |  |  |  |  |  | =SUM(I234:O234) | =P234*D234 |
| 15.5 | Outdoor ABF Single Mode Optical Fiber Cable -48 cores | Mt. | 2500 | =P235*'Top Sheet'!$H$27 | =E235*D235 |  | 0 | =(H235*G235)+G235 |  |  |  |  |  |  | =SUM(I235:O235) | =P235*D235 |
| 15.6 | Outdoor ABF Single Mode Optical Fiber Cable -24 cores | Mt. | 1000 | =P236*'Top Sheet'!$H$27 | =E236*D236 |  | 0 | =(H236*G236)+G236 |  |  |  |  |  |  | =SUM(I236:O236) | =P236*D236 |
| 15.7 | Outdoor ABF Single Mode Optical Fiber Cable -12cores | Mt. | 4000 | =P237*'Top Sheet'!$H$27 | =E237*D237 |  | 0 | =(H237*G237)+G237 |  |  |  |  |  |  | =SUM(I237:O237) | =P237*D237 |
| 15.8 | Outdoor ABF Single Mode Optical Fiber Cable -8 cores | Mt. | 2000 | =P238*'Top Sheet'!$H$27 | =E238*D238 |  | 0 | =(H238*G238)+G238 |  |  |  |  |  |  | =SUM(I238:O238) | =P238*D238 |
| 15.9 | Outdoor ABF Single Mode Optical Fiber Cable -4 cores | Mt. | 2000 | =P239*'Top Sheet'!$H$27 | =E239*D239 |  | 0 | =(H239*G239)+G239 |  |  |  |  |  |  | =SUM(I239:O239) | =P239*D239 |
| 15.1 | Outdoor ABF Single Mode Optical Fiber Cable -2 cores | Mt. | 2500 | =P240*'Top Sheet'!$H$27 | =E240*D240 |  | 0 | =(H240*G240)+G240 |  |  |  |  |  |  | =SUM(I240:O240) | =P240*D240 |
| 15.11 | Outdoor single-mode fiber optic cable 96core  from city network | Mt. | 500 | =P241*'Top Sheet'!$H$27 | =E241*D241 |  | 0 | =(H241*G241)+G241 |  |  |  |  |  |  | =SUM(I241:O241) | =P241*D241 |
| 16 | Network PRIMARY DUCTS FOR TELECOM NETWORK |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 16.1 | 24 Ways (20/16 mm) | Mt. | 2000 | =P243*'Top Sheet'!$H$27 | =E243*D243 |  | 0 | =(H243*G243)+G243 |  |  |  |  |  |  | =SUM(I243:O243) | =P243*D243 |
| 16.2 | 12 Ways (20/16 mm) | Mt. | 500 | =P244*'Top Sheet'!$H$27 | =E244*D244 |  | 0 | =(H244*G244)+G244 |  |  |  |  |  |  | =SUM(I244:O244) | =P244*D244 |
| 17 | Network SECONDARY DUCTS FOR TELECOM NETWORK |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 17.1 | 24 Ways (7/4 mm) | Mt. | 780 | =P246*'Top Sheet'!$H$27 | =E246*D246 |  | 0 | =(H246*G246)+G246 |  |  |  |  |  |  | =SUM(I246:O246) | =P246*D246 |
| 17.2 | 12 Ways (7/4 mm) | Mt. | 1500 | =P247*'Top Sheet'!$H$27 | =E247*D247 |  | 0 | =(H247*G247)+G247 |  |  |  |  |  |  | =SUM(I247:O247) | =P247*D247 |
| 17.3 | 4 Ways (7/4 mm) | Mt. | 500 | =P248*'Top Sheet'!$H$27 | =E248*D248 |  | 0 | =(H248*G248)+G248 |  |  |  |  |  |  | =SUM(I248:O248) | =P248*D248 |
| 17.4 | 2 Ways (7/4 mm) | Mt. | 100 | =P249*'Top Sheet'!$H$27 | =E249*D249 |  | 0 | =(H249*G249)+G249 |  |  |  |  |  |  | =SUM(I249:O249) | =P249*D249 |
| 18 | Network FIBER TERMINATION |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 18.1 | Cabines Outdoor Fiber Termination Module | No. | 175 | =P251*'Top Sheet'!$H$27 | =E251*D251 |  | 0 | =(H251*G251)+G251 |  |  |  |  |  |  | =SUM(I251:O251) | =P251*D251 |
| 18.2 | Building Outdoor Fiber Termination Module | No. | 24 | =P252*'Top Sheet'!$H$27 | =E252*D252 |  | 0 | =(H252*G252)+G252 |  |  |  |  |  |  | =SUM(I252:O252) | =P252*D252 |
| 18.3 | Resort Chalets Outdoor Fiber Termination Module | No. | 52 | =P253*'Top Sheet'!$H$27 | =E253*D253 |  | 0 | =(H253*G253)+G253 |  |  |  |  |  |  | =SUM(I253:O253) | =P253*D253 |
| 18.4 | Villas Outdoor Fiber Termination Module | No. | 35 | =P254*'Top Sheet'!$H$27 | =E254*D254 |  | 0 | =(H254*G254)+G254 |  |  |  |  |  |  | =SUM(I254:O254) | =P254*D254 |
| 18.5 | Town House Outdoor Fiber Termination Module | No. | 38 | =P255*'Top Sheet'!$H$27 | =E255*D255 |  | 0 | =(H255*G255)+G255 |  |  |  |  |  |  | =SUM(I255:O255) | =P255*D255 |
| 19 | Network Hand Holes |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 19.1 | Cabinet Hole 2500 X 1500 | No | 12 | =P257*'Top Sheet'!$H$27 | =E257*D257 |  | 0 | =(H257*G257)+G257 |  |  |  |  |  |  | =SUM(I257:O257) | =P257*D257 |
| 19.2 | Hand Hole 1000 X 1000 | No | 450 | =P258*'Top Sheet'!$H$27 | =E258*D258 |  | 0 | =(H258*G258)+G258 |  |  |  |  |  |  | =SUM(I258:O258) | =P258*D258 |
| 19.3 | Man Hole 1500 X 1500 | No | 19 | =P259*'Top Sheet'!$H$27 | =E259*D259 |  | 0 | =(H259*G259)+G259 |  |  |  |  |  |  | =SUM(I259:O259) | =P259*D259 |
| 20 | Network Outdoor Telecom Cabinets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 20.1 | ZC-01 | No. | 1 | =P261*'Top Sheet'!$H$27 | =E261*D261 |  | 0 | =(H261*G261)+G261 |  |  |  |  |  |  | =SUM(I261:O261) | =P261*D261 |
| 20.2 | ZC-02 | No. | 1 | =P262*'Top Sheet'!$H$27 | =E262*D262 |  | 0 | =(H262*G262)+G262 |  |  |  |  |  |  | =SUM(I262:O262) | =P262*D262 |
| 20.3 | ZC-03 | No. | 1 | =P263*'Top Sheet'!$H$27 | =E263*D263 |  | 0 | =(H263*G263)+G263 |  |  |  |  |  |  | =SUM(I263:O263) | =P263*D263 |
| 20.4 | ZC-04 | No. | 1 | =P264*'Top Sheet'!$H$27 | =E264*D264 |  | 0 | =(H264*G264)+G264 |  |  |  |  |  |  | =SUM(I264:O264) | =P264*D264 |
| 20.5 | ZC-05 | No. | 1 | =P265*'Top Sheet'!$H$27 | =E265*D265 |  | 0 | =(H265*G265)+G265 |  |  |  |  |  |  | =SUM(I265:O265) | =P265*D265 |
| 20.6 | ZC-06 | No. | 1 | =P266*'Top Sheet'!$H$27 | =E266*D266 |  | 0 | =(H266*G266)+G266 |  |  |  |  |  |  | =SUM(I266:O266) | =P266*D266 |
| 20.7 | ZC-07 | No. | 1 | =P267*'Top Sheet'!$H$27 | =E267*D267 |  | 0 | =(H267*G267)+G267 |  |  |  |  |  |  | =SUM(I267:O267) | =P267*D267 |
| 20.8 | ZC-08 | No. | 1 | =P268*'Top Sheet'!$H$27 | =E268*D268 |  | 0 | =(H268*G268)+G268 |  |  |  |  |  |  | =SUM(I268:O268) | =P268*D268 |
| 20.9 | ZC-09 | No. | 1 | =P269*'Top Sheet'!$H$27 | =E269*D269 |  | 0 | =(H269*G269)+G269 |  |  |  |  |  |  | =SUM(I269:O269) | =P269*D269 |
| 20.1 | ZC-10 | No. | 1 | =P270*'Top Sheet'!$H$27 | =E270*D270 |  | 0 | =(H270*G270)+G270 |  |  |  |  |  |  | =SUM(I270:O270) | =P270*D270 |
| 20.11 | ZC-11 | No. | 1 | =P271*'Top Sheet'!$H$27 | =E271*D271 |  | 0 | =(H271*G271)+G271 |  |  |  |  |  |  | =SUM(I271:O271) | =P271*D271 |
| 20.12 | ZC-12 | No. | 1 | =P272*'Top Sheet'!$H$27 | =E272*D272 |  | 0 | =(H272*G272)+G272 |  |  |  |  |  |  | =SUM(I272:O272) | =P272*D272 |
| 20 | Network ODF (OPTICAL DISTRIBUTION FRAME AT SUB CABINET): |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 20.1 | D.O.F.D - 288 C | No | 14 | =P274*'Top Sheet'!$H$27 | =E274*D274 |  | 0 | =(H274*G274)+G274 |  |  |  |  |  |  | =SUM(I274:O274) | =P274*D274 |
| 20.2 | D.O.F.D - 144 C | No | 4 | =P275*'Top Sheet'!$H$27 | =E275*D275 |  | 0 | =(H275*G275)+G275 |  |  |  |  |  |  | =SUM(I275:O275) | =P275*D275 |
| 20.3 | D.O.F.D - 96 C | No | 4 | =P276*'Top Sheet'!$H$27 | =E276*D276 |  | 0 | =(H276*G276)+G276 |  |  |  |  |  |  | =SUM(I276:O276) | =P276*D276 |
| 20.4 | D.O.F.D - 72 C | No | 1 | =P277*'Top Sheet'!$H$27 | =E277*D277 |  | 0 | =(H277*G277)+G277 |  |  |  |  |  |  | =SUM(I277:O277) | =P277*D277 |
| 21 | Network IP Camera Outlets |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 21.1 | Supplying, installing, connecting and testing of IP camera outlets including cat6A cables, in 20mm fire retardant UPVC conduit for embeded installation ,EMT conduits for exposed installation, conduit fittings, boxes and all necessary accessories and ancillary works and materials required for complete installations starting from the outlet to the respective data rack as specified and as indicated on the drawings. | NO | 99 | =P279*'Top Sheet'!$H$27 | =E279*D279 |  | 0 | =(H279*G279)+G279 |  |  |  |  |  |  | =SUM(I279:O279) | =P279*D279 |
| 22 | Network IP CAMERA |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 22.1 | Fixed outdoor IP66, color dome camera ,IP 5MP , WDR 120db,IR50m., P.O.E ,2.8 ~ 12mm motorized varifocal lens,Micro SDHC and SDXC card up to 256GB min. slot, video Analytics including Motion Detection and Camera Sabotage , H.265, H.264 , MJPEG video encoding,ONVIF Profile S, Profile G and Profile Q. C/W brakets,power supply and all needed accessories | NO | 99 | =P281*'Top Sheet'!$H$27 | =E281*D281 |  | 0 | =(H281*G281)+G281 |  |  |  |  |  |  | =SUM(I281:O281) | =P281*D281 |
| 23 | Network IP CAMERA ACTIVE COMPONENTS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 23.1 | IP cam Managed industrial switch 4port 10/100/1000+ 2port 1G, P.O.E pluse | No | 52 | =P283*'Top Sheet'!$H$27 | =E283*D283 |  | 0 | =(H283*G283)+G283 |  |  |  |  |  |  | =SUM(I283:O283) | =P283*D283 |
| 23.2 | IP cam Managed industrial switch 8port 10/100/1000+ 2port 1G, P.O.E pluse | NO | 19 | =P284*'Top Sheet'!$H$27 | =E284*D284 |  | 0 | =(H284*G284)+G284 |  |  |  |  |  |  | =SUM(I284:O284) | =P284*D284 |
| 24 | Network OUTDOOR CCTV CABINETS (LIGHTING POLE MOUNTED) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Supply, install, test and commission outdoor pole-mounted cabinet for CCTV system, fabricated from galvanized steel with powder-coated finish, weatherproof enclosure with minimum IP65 protection rating, suitable for mounting on lighting poles. The cabinet shall be complete with lockable door, pole mounting brackets, ventilation openings, cable entry glands, grounding terminal, and internal mounting plate or 19- inch rack rails (minimum 6U) for equipment installation. The cabinet shall be suitable to accommodate industrial Ethernet switch, fiber optic termination panel (ODF), power supply unit, surge protection device (SPD), circuit breaker, and cable management accessories. The cabinet shall be designed for outdoor environmental conditions and include all necessary accessories, fixing materials, and supports. The item shall include complete installation, termination, testing, labeling, and commissioning, all in accordance with project specifications and engineer approval. | No | 71 | =P286*'Top Sheet'!$H$27 | =E286*D286 |  | 0 | =(H286*G286)+G286 |  |  |  |  |  |  | =SUM(I286:O286) | =P286*D286 |
| 25 |  Network UPS SOCKETS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 25.1 | Supplying, installing, connecting and testing of UPS Sockets for industrial switches with 1kVA installed at CCTV cabinet, item includes and all necessary accessories and ancillary materials and works required for complete installation as specified and as indicated on the drawings. | NO | 71 | =P288*'Top Sheet'!$H$27 | =E288*D288 |  | 0 | =(H288*G288)+G288 |  |  |  |  |  |  | =SUM(I288:O288) | =P288*D288 |
| 24 | Network SECONDARY DUCTS FOR CCTV NETWORK |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | 12 Ways (7/4 mm) | Mt. | 15700 | =P290*'Top Sheet'!$H$27 | =E290*D290 |  | 0 | =(H290*G290)+G290 |  |  |  |  |  |  | =SUM(I290:O290) | =P290*D290 |
| 24 | Network Air Blown Fiber Cables |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Outdoor ABF Single Mode Optical Fiber Cable -8cores | Mt. | 90500 | =P292*'Top Sheet'!$H$27 | =E292*D292 |  | 0 | =(H292*G292)+G292 |  |  |  |  |  |  | =SUM(I292:O292) | =P292*D292 |
| 24.2 | CAT6A UTP outdoor Cable | Mt. | 2120 | =P293*'Top Sheet'!$H$27 | =E293*D293 |  | 0 | =(H293*G293)+G293 |  |  |  |  |  |  | =SUM(I293:O293) | =P293*D293 |
| 24.3 | Supplying, installing, connecting and testing of UTP PATCH CORD CAT6,1 meter length, with RJ45 connectors on both ends  including all necessary accessories and ancillary works and materials required for complete installations and operation | No. | 99 | =P294*'Top Sheet'!$H$27 | =E294*D294 |  | 0 | =(H294*G294)+G294 |  |  |  |  |  |  | =SUM(I294:O294) | =P294*D294 |
| 24 | Network Road Crossing |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Supplying, installing and testing Road crossing for direct buried thick wall HDPE ducts   to fit with Manhole/Hand hole opening dimension. The item includes warning tap, direct buried Couplers, TDC (Tube Distribution Closure), endcap,     etc and all necessary accessories, ancillary works and materials required for complete installation and operation | Mt. | 250 | =P296*'Top Sheet'!$H$27 | =E296*D296 |  | 0 | =(H296*G296)+G296 |  |  |  |  |  |  | =SUM(I296:O296) | =P296*D296 |
| 24 | Network TRENCH EXCAVATION AND DIGGING: |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 24.1 | Excavation, digging trench for all soil types ,back filling, and laying of sand layers as per design drawings into buildings entrances, the width of the trench should be suitable for the number & diameter of the ducts. The work includes concrete slab for protection in all road crossings, trench sides protection, withdraw underground and all necessary accessories, ancillary works and materials required for complete installation and operation | Mt. | 15000 | =P298*'Top Sheet'!$H$27 | =E298*D298 |  | 0 | =(H298*G298)+G298 |  |  |  |  |  |  | =SUM(I298:O298) | =P298*D298 |
| TOTAL  |  |  |  |  | =SUM(F4:F298) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q298) |

## Sheet: INFRA

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | Network Potable Water Network (HDPE 10 bar) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | رمل |  |  |  |  |
| 1.1 | For External Diam. 160 mm | LM | 5010 | =P4*'Top Sheet'!$H$27 | =E4*D4 | 455.97 | 0.14 | =(H4*G4)+G4 | 300 | =I4*0.5 | 10 | 20 |  | 20 | =SUM(I4:O4) | =P4*D4 |
| 1.2 | For External Diam. 200 mm | LM | 570 | =P5*'Top Sheet'!$H$27 | =E5*D5 | 711.19 | 0.14 | =(H5*G5)+G5 | 400 | =I5*0.5 | 12 | 22 |  | 25 | =SUM(I5:O5) | =P5*D5 |
| 1.3 | For External Diam. 250 mm | LM | 1570 | =P6*'Top Sheet'!$H$27 | =E6*D6 | 1109.66 | 0.14 | =(H6*G6)+G6 | 500 | =I6*0.5 | 15 | 24 |  | 30 | =SUM(I6:O6) | =P6*D6 |
| 1.4 | For External Diam. 315 mm | LM | 50 | =P7*'Top Sheet'!$H$27 | =E7*D7 | 1755.28 | 0.14 | =(H7*G7)+G7 | 600 | =I7*0.4 | 20 | 26 |  | 35 | =SUM(I7:O7) | =P7*D7 |
| 2 | Network Potable Water Network (PPR 10 bar) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2.1 | Single House Connection of Diam. 50 mm | No. | 15 | =P9*'Top Sheet'!$H$27 | =E9*D9 | =5*141.27 | 0.14 | =(H9*G9)+G9 | 500 | 250 | 100 |  |  | 150 | =SUM(I9:O9) | =P9*D9 |
| 2.2 | Single House Connection of Diam. 65 mm | No. | 61 | =P10*'Top Sheet'!$H$27 | =E10*D10 | =5*308.12 | 0.14 | =(H10*G10)+G10 | 500 | 250 | 100 |  |  | 150 | =SUM(I10:O10) | =P10*D10 |
| 2.3 | Single House Connection of Diam. 110 mm | No. | 82 | =P11*'Top Sheet'!$H$27 | =E11*D11 | =5*599.79 | 0.14 | =(H11*G11)+G11 | 1500 | 500 | 150 |  |  | 200 | =SUM(I11:O11) | =P11*D11 |
| 2.4 | Double House Connection of Diam. 110 mm | No. | 68 | =P12*'Top Sheet'!$H$27 | =E12*D12 | =2*5*599.79 | 0.14 | =(H12*G12)+G12 | 3000 | 1000 | 300 |  |  | 400 | =SUM(I12:O12) | =P12*D12 |
| 2.5 | Triple House Connection of Diam. 110 mm | No. | 11 | =P13*'Top Sheet'!$H$27 | =E13*D13 | =3*5*599.79 | 0.14 | =(H13*G13)+G13 | 4500 | 1500 | 450 |  |  | 600 | =SUM(I13:O13) | =P13*D13 |
| 3 | Network Potable Water Network (Valves) |  |  |  |  |  |  |  | التركيب | مستلزمات | الاختبار |  |  |  |  |  |
| 3.1 | 250mm dia. | No. | 5 | =P15*'Top Sheet'!$H$27 | =E15*D15 | =57.64*1995 | 0.14 | =(H15*G15)+G15 | 4500 | 2500 | 500 |  |  | 500 | =SUM(I15:O15) | =P15*D15 |
| 3.2 | 200 mm dia. | No. | 12 | =P16*'Top Sheet'!$H$27 | =E16*D16 | =57.64*1340 | 0.14 | =(H16*G16)+G16 | 3500 | 2500 | 500 |  |  | 500 | =SUM(I16:O16) | =P16*D16 |
| 3.3 | 160 mm dia. | No. | 20 | =P17*'Top Sheet'!$H$27 | =E17*D17 | =57.64*530 | 0.14 | =(H17*G17)+G17 | 2500 | 2500 | 500 |  |  | 500 | =SUM(I17:O17) | =P17*D17 |
| 4 | Network (Fire Hydrants) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 | Supply ,install and test Street Fire Hydrant 4 in. that located with water distribution network complete with all, valves, D.1. fittings and accessories, thrust block, connection(100mm) to main water pipe line, the item also include but not limited excavation in any type of soil excluding rock soil, disposal of surplus material to public damping area ,dewatering ,replacement, bedding, surrounding clear sand for pipes, insulation, backfilling, compaction, compaction test ,ductile iron frame & cover, flashing, cleaning, disinfection , and all what is needed to complete the work as required by the drawings ,technical specifications ,as per soil report recommendation and U.L / F.M approved list. | No. | 55 | =P19*'Top Sheet'!$H$27 | =E19*D19 | 110000 | 0.14 | =(H19*G19)+G19 | 2000 | 1750 | 500 |  |  | 750 | =SUM(I19:O19) | =P19*D19 |
| 5 | Network FLOW METER VALVE CHAMBER |  |  |  |  |  |  |  | الغرفة الخرسانية | القطع الخاصة | التركيب |  |  |  |  |  |
| 5.1 | Construction of Reinforced concrete flow meter valve chamber according to width, length and depth from ground level to bottom elevation of the chamber. Item also include excavation in all type of soils excluding rock soil. Item shall Include all required submittals and drawings, transporting, supplying and storing of DI pipes fittings, DI valves, galvanized steel extension spindle, PVC protection pipes, cast iron surface box and all necessary accessories  for a complete installation as per specifications ,soil report recommendation drawings & Instruction of supervision engineer. | No. | 1 | =P21*'Top Sheet'!$H$27 | =E21*D21 | 500000 | 0 | =(H21*G21)+G21 | 350000 | 800000 | 100000 |  |  | 20000 | =SUM(I21:O21) | =P21*D21 |
| 6 | Network Irrigation Network |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | رمل |  |  |  |  |
| 6.1 | For External Diam. 160 mm | LM | 3865 | =P23*'Top Sheet'!$H$27 | =E23*D23 | 455.97 | 0.14 | =(H23*G23)+G23 | 300 | =0.5*I23 | 10 | 20 |  | 20 | =SUM(I23:O23) | =P23*D23 |
| 6.2 | For External Diam. 110 mm | LM | 3095 | =P24*'Top Sheet'!$H$27 | =E24*D24 | 218.91 | 0.14 | =(H24*G24)+G24 | 200 | =I24*0.5 | 10 | 20 |  | 15 | =SUM(I24:O24) | =P24*D24 |
| 7 | Network (Buried Valves) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 7.1 | 160 mm dia. | No. | 13 | =P26*'Top Sheet'!$H$27 | =E26*D26 | =57.64*530 | 0.14 | =(H26*G26)+G26 | 2500 | 2500 | 500 |  |  | 500 | =SUM(I26:O26) | =P26*D26 |
| 7.2 | 110 mm dia. | No. | 20 | =P27*'Top Sheet'!$H$27 | =E27*D27 | =57.64*335 | 0.14 | =(H27*G27)+G27 | 1500 | 2000 | 500 |  |  | 300 | =SUM(I27:O27) | =P27*D27 |
| 8 | Network ( Air Valves Chamber ) |  |  |  |  |  |  |  | الغرفة الخرسانية | القطع الخاصة | التركيب | الاختبار |  |  |  |  |
| 8.1 | HDPE PIPE With Diameter 160mm . | No. | 1 | =P29*'Top Sheet'!$H$27 | =E29*D29 | 25000 | 0.14 | =(H29*G29)+G29 | 70000 | 38000 | 20000 | 1000 |  | 5000 | =SUM(I29:O29) | =P29*D29 |
| 9 | Network (DRAIN VALVE CHAMBER) |  |  |  |  |  |  |  | الغرفة الخرسانية | القطع الخاصة | التركيب | الاختبار |  |  |  |  |
| 9.1 | HDPE PIPE With Diameter 160mm . | No. | 1 | =P31*'Top Sheet'!$H$27 | =E31*D31 | 70000 | 0.14 | =(H31*G31)+G31 | 90000 | 51000 | 25000 | 1000 |  | 5000 | =SUM(I31:O31) | =P31*D31 |
| 10 | Network (Drainage line for Catch Basin ) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | رمل |  |  |  |  |
| 10.1 | 160 mm. external Diam. | LM | 5090 | =P33*'Top Sheet'!$H$27 | =E33*D33 | 184.07 | 0.14 | =(H33*G33)+G33 | 250 | 20 | 10 | 50 |  | 20 | =SUM(I33:O33) | =P33*D33 |
| 11 | Network ( Drainage Main Line ) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | رمل |  |  |  |  |
| 11.1 | 200 mm. external Diam. Depth up to 1.50m | LM | 620 | =P35*'Top Sheet'!$H$27 | =E35*D35 | 287.34 | 0.14 | =(H35*G35)+G35 | 275 | 25 | 10 | 60 |  | 30 | =SUM(I35:O35) | =P35*D35 |
| 11.2 | 200 mm. external Diam. Depth from 1.51m to 2.50m | LM | 890 | =P36*'Top Sheet'!$H$27 | =E36*D36 | 287.34 | 0.14 | =(H36*G36)+G36 | 325 | 25 | 10 | 70 |  | 30 | =SUM(I36:O36) | =P36*D36 |
| 11.3 | 250 mm. external Diam. Depth up to 1.50m | LM | 260 | =P37*'Top Sheet'!$H$27 | =E37*D37 | 444.66 | 0.14 | =(H37*G37)+G37 | 375 | 30 | 15 | 75 |  | 40 | =SUM(I37:O37) | =P37*D37 |
| 11.4 | 250 mm. external Diam. Depth from 1.51m to 2.50m | LM | 210 | =P38*'Top Sheet'!$H$27 | =E38*D38 | 444.66 | 0.14 | =(H38*G38)+G38 | 450 | 30 | 15 | 85 |  | 40 | =SUM(I38:O38) | =P38*D38 |
| 11.5 | 315 mm. external Diam. Depth up to 1.50m | LM | 160 | =P39*'Top Sheet'!$H$27 | =E39*D39 | 706.32 | 0.14 | =(H39*G39)+G39 | 500 | 35 | 20 | 90 |  | 50 | =SUM(I39:O39) | =P39*D39 |
| 11.6 | 315 mm. external Diam. Depth from 1.51m to 2.50m | LM | 530 | =P40*'Top Sheet'!$H$27 | =E40*D40 | 706.32 | 0.14 | =(H40*G40)+G40 | 550 | 35 | 20 | 100 |  | 50 | =SUM(I40:O40) | =P40*D40 |
| 11.7 | 400 mm. external Diam. Depth up to 1.50m | LM | 70 | =P41*'Top Sheet'!$H$27 | =E41*D41 | 1129.04 | 0.14 | =(H41*G41)+G41 | 550 | 50 | 25 | 105 |  | 100 | =SUM(I41:O41) | =P41*D41 |
| 11.8 | 400 mm. external Diam. Depth from 1.51m to 2.50m | LM | 1100 | =P42*'Top Sheet'!$H$27 | =E42*D42 | 1129.04 | 0.14 | =(H42*G42)+G42 | 600 | 50 | 25 | 115 |  | 100 | =SUM(I42:O42) | =P42*D42 |
| 11.9 | 500 mm. external Diam. Depth from 1.51m to 2.50m | LM | 130 | =P43*'Top Sheet'!$H$27 | =E43*D43 | 1789.3 | 0.14 | =(H43*G43)+G43 | 650 | 55 | 40 | 120 |  | 150 | =SUM(I43:O43) | =P43*D43 |
| 11.1 | 600 mm. external Diam. Depth from 1.51m to 2.50m | LM | 630 | =P44*'Top Sheet'!$H$27 | =E44*D44 | 3205.29 | 0.14 | =(H44*G44)+G44 | 950 | 65 | 60 | 130 |  | 200 | =SUM(I44:O44) | =P44*D44 |
| 11.11 | 700 mm. external Diam. Depth from 1.51m to 2.50m | LM | 900 | =P45*'Top Sheet'!$H$27 | =E45*D45 | 4058.8 | 0.14 | =(H45*G45)+G45 | 1300 | 65 | 80 | 135 |  | 300 | =SUM(I45:O45) | =P45*D45 |
| 11.12 | 700 mm. external Diam. Depth from 2.51m to 3.50m | LM | 800 | =P46*'Top Sheet'!$H$27 | =E46*D46 | 4058.8 | 0.14 | =(H46*G46)+G46 | 1400 | 65 | 80 | 140 |  | 300 | =SUM(I46:O46) | =P46*D46 |
| 11.13 | 700 mm. external Diam. Depth from 3.51m to 4.50m | LM | 50 | =P47*'Top Sheet'!$H$27 | =E47*D47 | 4058.8 | 0.14 | =(H47*G47)+G47 | 1500 | 65 | 80 | 145 |  | 300 | =SUM(I47:O47) | =P47*D47 |
| 11.14 | 900 mm. external Diam. Depth from 2.51m to 3.50m | LM | 10 | =P48*'Top Sheet'!$H$27 | =E48*D48 | 6000 | 0.14 | =(H48*G48)+G48 | 2500 | 80 | 100 | 160 |  | 500 | =SUM(I48:O48) | =P48*D48 |
| 12 | Network (Sewage Manholes) |  |  |  |  | خرسانات + (حديد ان وجد ) |  |  | مصنعيات | غطاء | درج | عزل | هدار |  |  |  |
| 12.1 | Manhole Type 1 from depth 1.21 to 1.50 m | No. | 43 | =P50*'Top Sheet'!$H$27 | =E50*D50 | =4*3600+5000 | 0 | =(H50*G50)+G50 | =7200*1.1 | 11000 | =4*300 | 1500 | 500 | 300 | =SUM(I50:O50) | =P50*D50 |
| 12.2 | Manhole Type 2 from depth 1.51 to 2.50 m | No. | 72 | =P51*'Top Sheet'!$H$27 | =E51*D51 | =4.364*3600 | 0 | =(H51*G51)+G51 | =8600*1.1 | 11000 | =8*300 | 1800 | 500 | 300 | =SUM(I51:O51) | =P51*D51 |
| 12.3 | Manhole Type 3 from depth 2.51 to 3.50 m | No. | 2 | =P52*'Top Sheet'!$H$27 | =E52*D52 | =7.31*3600 | 0 | =(H52*G52)+G52 | =11000*1.1 | 11000 | =10*300 | 2100 | 500 | 300 | =SUM(I52:O52) | =P52*D52 |
| 12.4 | Manhole Type 5 from dia 500-600 , depth up to 3 m | No. | 14 | =P53*'Top Sheet'!$H$27 | =E53*D53 | =9*3600 | 0 | =(H53*G53)+G53 | =20000*1.1 | 13600 | =10*300 | 2400 | 500 | 300 | =SUM(I53:O53) | =P53*D53 |
| 12.5 | Manhole Type 8 from dia 700-800 , depth up to 3 m | No. | 50 | =P54*'Top Sheet'!$H$27 | =E54*D54 | =8*3600 | 0 | =(H54*G54)+G54 | =35000*1.1 | 13600 | =10*300 | 2700 | 500 | 300 | =SUM(I54:O54) | =P54*D54 |
| 12.6 | Manhole Type 9 from dia >=900 , depth up to 3 m | No. | 1 | =P55*'Top Sheet'!$H$27 | =E55*D55 | 35000 | 0 | =(H55*G55)+G55 | 45000 | 13600 | =10*300 | 3000 | 500 | 300 | =SUM(I55:O55) | =P55*D55 |
| 13 | Network (CATCH BASIN) |  |  |  |  |  |  |  | مصنعيات | غطاء | العزل |  |  |  |  |  |
| 13.1 | Single Catch Basin | No. | 43 | =P57*'Top Sheet'!$H$27 | =E57*D57 | 16000 | 0 | =(H57*G57)+G57 | 5500 | 5500 | 2000 |  |  | 100 | =SUM(I57:O57) | =P57*D57 |
| 13.2 | Double Catch Basin | No. | 32 | =P58*'Top Sheet'!$H$27 | =E58*D58 | 20000 | 0 | =(H58*G58)+G58 | 7000 | 11000 | 3500 |  |  | 200 | =SUM(I58:O58) | =P58*D58 |
| 14 | Network (Force Main ) |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار | رمل |  |  |  |  |
| 14.1 | Below ground  HDPE (SDR 17) Spigot and socket, classified according to material and diameter indicated on drawings with average depth 1200 mm. Rates shall include supply of pipes, jointing materials, pipe fittings, pipe accessories, pipe polyethylene sleeve, special fittings, rate shall also include excavation of pipe trenches (excavation in rock if required), dewatering, shoring grading and leveling of excavation bottom, furnishing, placing and compacting bedding material transferring the excavation material outside the project area, lowering pipes into trench, construct crossing protection, construct thrust blocks, install road crossing sleeve, laying out, aligning, jointing pipes, install polyethylene sleeve protection for the pipe, testing installed work, flushing, cleaning, disinfection, supply and install end plug with plain concrete block, Rate shall include backfilling to existing ground with selective fine compressive material, backfilling shall be in layers each layer shall be compacted manual or by pneumatic tampers as shown on drawings, supply and install warning tapes, and all required material and fittings for complete installation, and drawings for pipe 630 mm diameter. | M | 1500 | =P60*'Top Sheet'!$H$27 | =E60*D60 | 7000 | 0.14 | =(H60*G60)+G60 | 1250 | =I60*0.2 | 100 | 150 |  | 200 | =SUM(I60:O60) | =P60*D60 |
| 15 | Network Air Valve chamber |  |  |  |  |  |  |  | الغرفة الخرسانية | القطع الخاصة | التركيب | الاختبار |  |  |  |  |
| 15.1 | Construction of Reinforced concrete washout valve chamber according to width, length and depth from ground level to bottom elevation of the chamber. Item also include excavation in all type of soils including rock soil. Item shall Include all required submittals and drawings, transporting, supplying and storing of DI pipes fittings, DI valves, galvanized steel extension spindle, PVC protection pipes, cast iron surface box and all necessary accessories  for a complete installation as per specifications , drawings & Instruction of supervision engineer. | NO. | 1 | =P62*'Top Sheet'!$H$27 | =E62*D62 | 50000 | 0.14 | =(H62*G62)+G62 | 100000 | 150000 | 30000 | 1000 |  | 5000 | =SUM(I62:O62) | =P62*D62 |
| 16 | Network Wash Valve Chamber |  |  |  |  |  |  |  | الغرفة الخرسانية | القطع الخاصة | التركيب | الاختبار |  |  |  |  |
| 16.1 | Construction of Reinforced concrete washout valve chamber according to width, length and depth from ground level to bottom elevation of the chamber. Item also include excavation in all type of soils including rock soil. Item shall Include all required submittals and drawings, transporting, supplying and storing of DI pipes fittings, DI valves, galvanized steel extension spindle, PVC protection pipes, cast iron surface box and all necessary accessories  for a complete installation as per specifications , drawings & Instruction of supervision engineer. | NO. | 1 | =P64*'Top Sheet'!$H$27 | =E64*D64 | 220000 | 0.14 | =(H64*G64)+G64 | 140000 | 180000 | 35000 | 1000 |  | 5000 | =SUM(I64:O64) | =P64*D64 |
| 17 | Network Inspection Chamber |  |  |  |  |  |  |  | الغطاء | مصنعية | عزل |  |  |  |  |  |
| 17.1 | Inspection Chamber (0.60*0.60) m | No. | 354 | =P66*'Top Sheet'!$H$27 | =E66*D66 | 12000 | 0 | =(H66*G66)+G66 | 5500 | 2000 | 1500 |  |  | 100 | =SUM(I66:O66) | =P66*D66 |
| 17.2 | Inspection Chamber (0.60*0.90) m | No. | 28 | =P67*'Top Sheet'!$H$27 | =E67*D67 | 14500 | 0 | =(H67*G67)+G67 | 6500 | 2500 | 1700 |  |  | 100 | =SUM(I67:O67) | =P67*D67 |
| TOTAL  |  |  |  |  | =SUM(F4:F67) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q67) |

## Sheet: IRRIGATION

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | utility buildings irrigation pumps |  |  |  |  |  |  |  | التركيب | المستلزمات | الاختبار |  |  |  |  |  |
| 1.1 | Irrigation-Water Packaged Pumps set Supply, install,  connect,  test and commission tested, certifed and guaranteed variable speed Irrigation pumping set. item inculding control panel, interconnecting wiring, final connection to power and all items required for complete installation and operation. Irrigation pump set consist of 3 pumps (2 working + 1 standby) each pump flow 18.5 L/S & head=35 m. | Set | 1 | =P4*'Top Sheet'!$H$27 | =E4*D4 | =46154*60 | 0.14 | =(H4*G4)+G4 | 75000 | 75000 | 10000 |  |  | 10000 | =SUM(I4:O4) | =P4*D4 |
| 1.2 | Supply, Test, Delivery, Erection of Pump suction, discharge and main headers lines complete with joints,fitting,... etc, as per tendered documents. | LS | 1 | =P5*'Top Sheet'!$H$27 | =E5*D5 | 150000 | 0 | =(H5*G5)+G5 | 10000 | 10000 |  |  |  | 10000 | =SUM(I5:O5) | =P5*D5 |
| 1.3 | Gate valves, cast iron, Class (125), flanged. Check valves, cast iron, Class (125) flanged. Butterfly valves, cast iron, full lug. Basketstrainer, cast iron, Class (125) flanged. Supply, Test, Delivery, Erection of Pump suction, discharge and main headers gate , non return , butterfly valves ,basket strainers... etc, as per tendered documents. | LS | 1 | =P6*'Top Sheet'!$H$27 | =E6*D6 | 350000 | 0 | =(H6*G6)+G6 | 25000 | 25000 |  |  |  | 15000 | =SUM(I6:O6) | =P6*D6 |
| 1.4 | Water tank level indicators. | No. | 2 | =P7*'Top Sheet'!$H$27 | =E7*D7 | 25000 | 0 | =(H7*G7)+G7 |  |  |  |  |  |  | =SUM(I7:O7) | =P7*D7 |
| 1.5 | Non-corrosive mesh filter, stainless steel mesh Mesh filter capacity 37 L/S  (2 duty+1 standby) | Set | 1 | =P8*'Top Sheet'!$H$27 | =E8*D8 | 750000 | 0 | =(H8*G8)+G8 |  |  |  |  |  |  | =SUM(I8:O8) | =P8*D8 |
| TOTAL  |  |  |  |  | =SUM(F4:F8) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q8) |

## Sheet: LANDSCAPE

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | ITEM NO. 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1.1 |  |  |  | =P4*'Top Sheet'!$H$27 | =E4*D4 |  | 0 | =(H4*G4)+G4 |  |  |  |  |  |  | =SUM(I4:O4) | =P4*D4 |
| 1.2 |  |  |  | =P5*'Top Sheet'!$H$27 | =E5*D5 |  | 0 | =(H5*G5)+G5 |  |  |  |  |  |  | =SUM(I5:O5) | =P5*D5 |
| 1.3 |  |  |  | =P6*'Top Sheet'!$H$27 | =E6*D6 |  | 0 | =(H6*G6)+G6 |  |  |  |  |  |  | =SUM(I6:O6) | =P6*D6 |
| 1.4 |  |  |  | =P7*'Top Sheet'!$H$27 | =E7*D7 |  | 0 | =(H7*G7)+G7 |  |  |  |  |  |  | =SUM(I7:O7) | =P7*D7 |
| 1.5 |  |  |  | =P8*'Top Sheet'!$H$27 | =E8*D8 |  | 0 | =(H8*G8)+G8 |  |  |  |  |  |  | =SUM(I8:O8) | =P8*D8 |
| 1.6 |  |  |  | =P9*'Top Sheet'!$H$27 | =E9*D9 |  | 0 | =(H9*G9)+G9 |  |  |  |  |  |  | =SUM(I9:O9) | =P9*D9 |
| 1.7 |  |  |  | =P10*'Top Sheet'!$H$27 | =E10*D10 |  | 0 | =(H10*G10)+G10 |  |  |  |  |  |  | =SUM(I10:O10) | =P10*D10 |
| 1.8 |  |  |  | =P11*'Top Sheet'!$H$27 | =E11*D11 |  | 0 | =(H11*G11)+G11 |  |  |  |  |  |  | =SUM(I11:O11) | =P11*D11 |
| 1.9 |  |  |  | =P12*'Top Sheet'!$H$27 | =E12*D12 |  | 0 | =(H12*G12)+G12 |  |  |  |  |  |  | =SUM(I12:O12) | =P12*D12 |
| 2 | ITEM NO. 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2.1 |  |  |  | =P14*'Top Sheet'!$H$27 | =E14*D14 |  | 0 | =(H14*G14)+G14 |  |  |  |  |  |  | =SUM(I14:O14) | =P14*D14 |
| 2.2 |  |  |  | =P15*'Top Sheet'!$H$27 | =E15*D15 |  | 0 | =(H15*G15)+G15 |  |  |  |  |  |  | =SUM(I15:O15) | =P15*D15 |
| 2.3 |  |  |  | =P16*'Top Sheet'!$H$27 | =E16*D16 |  | 0 | =(H16*G16)+G16 |  |  |  |  |  |  | =SUM(I16:O16) | =P16*D16 |
| 2.4 |  |  |  | =P17*'Top Sheet'!$H$27 | =E17*D17 |  | 0 | =(H17*G17)+G17 |  |  |  |  |  |  | =SUM(I17:O17) | =P17*D17 |
| 2.5 |  |  |  | =P18*'Top Sheet'!$H$27 | =E18*D18 |  | 0 | =(H18*G18)+G18 |  |  |  |  |  |  | =SUM(I18:O18) | =P18*D18 |
| 2.6 |  |  |  | =P19*'Top Sheet'!$H$27 | =E19*D19 |  | 0 | =(H19*G19)+G19 |  |  |  |  |  |  | =SUM(I19:O19) | =P19*D19 |
| 2.7 |  |  |  | =P20*'Top Sheet'!$H$27 | =E20*D20 |  | 0 | =(H20*G20)+G20 |  |  |  |  |  |  | =SUM(I20:O20) | =P20*D20 |
| 2.8 |  |  |  | =P21*'Top Sheet'!$H$27 | =E21*D21 |  | 0 | =(H21*G21)+G21 |  |  |  |  |  |  | =SUM(I21:O21) | =P21*D21 |
| 2.9 |  |  |  | =P22*'Top Sheet'!$H$27 | =E22*D22 |  | 0 | =(H22*G22)+G22 |  |  |  |  |  |  | =SUM(I22:O22) | =P22*D22 |
| 3 | ITEM NO. 3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3.1 |  |  |  | =P24*'Top Sheet'!$H$27 | =E24*D24 |  | 0 | =(H24*G24)+G24 |  |  |  |  |  |  | =SUM(I24:O24) | =P24*D24 |
| 3.2 |  |  |  | =P25*'Top Sheet'!$H$27 | =E25*D25 |  | 0 | =(H25*G25)+G25 |  |  |  |  |  |  | =SUM(I25:O25) | =P25*D25 |
| 3.3 |  |  |  | =P26*'Top Sheet'!$H$27 | =E26*D26 |  | 0 | =(H26*G26)+G26 |  |  |  |  |  |  | =SUM(I26:O26) | =P26*D26 |
| 3.4 |  |  |  | =P27*'Top Sheet'!$H$27 | =E27*D27 |  | 0 | =(H27*G27)+G27 |  |  |  |  |  |  | =SUM(I27:O27) | =P27*D27 |
| 3.5 |  |  |  | =P28*'Top Sheet'!$H$27 | =E28*D28 |  | 0 | =(H28*G28)+G28 |  |  |  |  |  |  | =SUM(I28:O28) | =P28*D28 |
| 3.6 |  |  |  | =P29*'Top Sheet'!$H$27 | =E29*D29 |  | 0 | =(H29*G29)+G29 |  |  |  |  |  |  | =SUM(I29:O29) | =P29*D29 |
| 3.7 |  |  |  | =P30*'Top Sheet'!$H$27 | =E30*D30 |  | 0 | =(H30*G30)+G30 |  |  |  |  |  |  | =SUM(I30:O30) | =P30*D30 |
| 3.8 |  |  |  | =P31*'Top Sheet'!$H$27 | =E31*D31 |  | 0 | =(H31*G31)+G31 |  |  |  |  |  |  | =SUM(I31:O31) | =P31*D31 |
| 3.9 |  |  |  | =P32*'Top Sheet'!$H$27 | =E32*D32 |  | 0 | =(H32*G32)+G32 |  |  |  |  |  |  | =SUM(I32:O32) | =P32*D32 |
| 4 | ITEM NO. 4 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 |  |  |  | =P34*'Top Sheet'!$H$27 | =E34*D34 |  | 0 | =(H34*G34)+G34 |  |  |  |  |  |  | =SUM(I34:O34) | =P34*D34 |
| 4.2 |  |  |  | =P35*'Top Sheet'!$H$27 | =E35*D35 |  | 0 | =(H35*G35)+G35 |  |  |  |  |  |  | =SUM(I35:O35) | =P35*D35 |
| 4.3 |  |  |  | =P36*'Top Sheet'!$H$27 | =E36*D36 |  | 0 | =(H36*G36)+G36 |  |  |  |  |  |  | =SUM(I36:O36) | =P36*D36 |
| 4.4 |  |  |  | =P37*'Top Sheet'!$H$27 | =E37*D37 |  | 0 | =(H37*G37)+G37 |  |  |  |  |  |  | =SUM(I37:O37) | =P37*D37 |
| 4.5 |  |  |  | =P38*'Top Sheet'!$H$27 | =E38*D38 |  | 0 | =(H38*G38)+G38 |  |  |  |  |  |  | =SUM(I38:O38) | =P38*D38 |
| 4.6 |  |  |  | =P39*'Top Sheet'!$H$27 | =E39*D39 |  | 0 | =(H39*G39)+G39 |  |  |  |  |  |  | =SUM(I39:O39) | =P39*D39 |
| 4.7 |  |  |  | =P40*'Top Sheet'!$H$27 | =E40*D40 |  | 0 | =(H40*G40)+G40 |  |  |  |  |  |  | =SUM(I40:O40) | =P40*D40 |
| 4.8 |  |  |  | =P41*'Top Sheet'!$H$27 | =E41*D41 |  | 0 | =(H41*G41)+G41 |  |  |  |  |  |  | =SUM(I41:O41) | =P41*D41 |
| 4.9 |  |  |  | =P42*'Top Sheet'!$H$27 | =E42*D42 |  | 0 | =(H42*G42)+G42 |  |  |  |  |  |  | =SUM(I42:O42) | =P42*D42 |
| 5 | ITEM NO. 5 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 5.1 |  |  |  | =P44*'Top Sheet'!$H$27 | =E44*D44 |  | 0 | =(H44*G44)+G44 |  |  |  |  |  |  | =SUM(I44:O44) | =P44*D44 |
| 5.2 |  |  |  | =P45*'Top Sheet'!$H$27 | =E45*D45 |  | 0 | =(H45*G45)+G45 |  |  |  |  |  |  | =SUM(I45:O45) | =P45*D45 |
| 5.3 |  |  |  | =P46*'Top Sheet'!$H$27 | =E46*D46 |  | 0 | =(H46*G46)+G46 |  |  |  |  |  |  | =SUM(I46:O46) | =P46*D46 |
| 5.4 |  |  |  | =P47*'Top Sheet'!$H$27 | =E47*D47 |  | 0 | =(H47*G47)+G47 |  |  |  |  |  |  | =SUM(I47:O47) | =P47*D47 |
| 5.5 |  |  |  | =P48*'Top Sheet'!$H$27 | =E48*D48 |  | 0 | =(H48*G48)+G48 |  |  |  |  |  |  | =SUM(I48:O48) | =P48*D48 |
| 5.6 |  |  |  | =P49*'Top Sheet'!$H$27 | =E49*D49 |  | 0 | =(H49*G49)+G49 |  |  |  |  |  |  | =SUM(I49:O49) | =P49*D49 |
| 5.7 |  |  |  | =P50*'Top Sheet'!$H$27 | =E50*D50 |  | 0 | =(H50*G50)+G50 |  |  |  |  |  |  | =SUM(I50:O50) | =P50*D50 |
| 5.8 |  |  |  | =P51*'Top Sheet'!$H$27 | =E51*D51 |  | 0 | =(H51*G51)+G51 |  |  |  |  |  |  | =SUM(I51:O51) | =P51*D51 |
| 5.9 |  |  |  | =P52*'Top Sheet'!$H$27 | =E52*D52 |  | 0 | =(H52*G52)+G52 |  |  |  |  |  |  | =SUM(I52:O52) | =P52*D52 |
| 6 | ITEM NO. 6 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 6.1 |  |  |  | =P54*'Top Sheet'!$H$27 | =E54*D54 |  | 0 | =(H54*G54)+G54 |  |  |  |  |  |  | =SUM(I54:O54) | =P54*D54 |
| 6.2 |  |  |  | =P55*'Top Sheet'!$H$27 | =E55*D55 |  | 0 | =(H55*G55)+G55 |  |  |  |  |  |  | =SUM(I55:O55) | =P55*D55 |
| 6.3 |  |  |  | =P56*'Top Sheet'!$H$27 | =E56*D56 |  | 0 | =(H56*G56)+G56 |  |  |  |  |  |  | =SUM(I56:O56) | =P56*D56 |
| 6.4 |  |  |  | =P57*'Top Sheet'!$H$27 | =E57*D57 |  | 0 | =(H57*G57)+G57 |  |  |  |  |  |  | =SUM(I57:O57) | =P57*D57 |
| 6.5 |  |  |  | =P58*'Top Sheet'!$H$27 | =E58*D58 |  | 0 | =(H58*G58)+G58 |  |  |  |  |  |  | =SUM(I58:O58) | =P58*D58 |
| 6.6 |  |  |  | =P59*'Top Sheet'!$H$27 | =E59*D59 |  | 0 | =(H59*G59)+G59 |  |  |  |  |  |  | =SUM(I59:O59) | =P59*D59 |
| 6.7 |  |  |  | =P60*'Top Sheet'!$H$27 | =E60*D60 |  | 0 | =(H60*G60)+G60 |  |  |  |  |  |  | =SUM(I60:O60) | =P60*D60 |
| 6.8 |  |  |  | =P61*'Top Sheet'!$H$27 | =E61*D61 |  | 0 | =(H61*G61)+G61 |  |  |  |  |  |  | =SUM(I61:O61) | =P61*D61 |
| 6.9 |  |  |  | =P62*'Top Sheet'!$H$27 | =E62*D62 |  | 0 | =(H62*G62)+G62 |  |  |  |  |  |  | =SUM(I62:O62) | =P62*D62 |
| 7 | ITEM NO. 7 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 7.1 |  |  |  | =P64*'Top Sheet'!$H$27 | =E64*D64 |  | 0 | =(H64*G64)+G64 |  |  |  |  |  |  | =SUM(I64:O64) | =P64*D64 |
| 7.2 |  |  |  | =P65*'Top Sheet'!$H$27 | =E65*D65 |  | 0 | =(H65*G65)+G65 |  |  |  |  |  |  | =SUM(I65:O65) | =P65*D65 |
| 7.3 |  |  |  | =P66*'Top Sheet'!$H$27 | =E66*D66 |  | 0 | =(H66*G66)+G66 |  |  |  |  |  |  | =SUM(I66:O66) | =P66*D66 |
| 7.4 |  |  |  | =P67*'Top Sheet'!$H$27 | =E67*D67 |  | 0 | =(H67*G67)+G67 |  |  |  |  |  |  | =SUM(I67:O67) | =P67*D67 |
| 7.5 |  |  |  | =P68*'Top Sheet'!$H$27 | =E68*D68 |  | 0 | =(H68*G68)+G68 |  |  |  |  |  |  | =SUM(I68:O68) | =P68*D68 |
| 7.6 |  |  |  | =P69*'Top Sheet'!$H$27 | =E69*D69 |  | 0 | =(H69*G69)+G69 |  |  |  |  |  |  | =SUM(I69:O69) | =P69*D69 |
| 7.7 |  |  |  | =P70*'Top Sheet'!$H$27 | =E70*D70 |  | 0 | =(H70*G70)+G70 |  |  |  |  |  |  | =SUM(I70:O70) | =P70*D70 |
| 7.8 |  |  |  | =P71*'Top Sheet'!$H$27 | =E71*D71 |  | 0 | =(H71*G71)+G71 |  |  |  |  |  |  | =SUM(I71:O71) | =P71*D71 |
| 7.9 |  |  |  | =P72*'Top Sheet'!$H$27 | =E72*D72 |  | 0 | =(H72*G72)+G72 |  |  |  |  |  |  | =SUM(I72:O72) | =P72*D72 |
| 8 | ITEM NO. 8 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 8.1 |  |  |  | =P74*'Top Sheet'!$H$27 | =E74*D74 |  | 0 | =(H74*G74)+G74 |  |  |  |  |  |  | =SUM(I74:O74) | =P74*D74 |
| 8.2 |  |  |  | =P75*'Top Sheet'!$H$27 | =E75*D75 |  | 0 | =(H75*G75)+G75 |  |  |  |  |  |  | =SUM(I75:O75) | =P75*D75 |
| 8.3 |  |  |  | =P76*'Top Sheet'!$H$27 | =E76*D76 |  | 0 | =(H76*G76)+G76 |  |  |  |  |  |  | =SUM(I76:O76) | =P76*D76 |
| 8.4 |  |  |  | =P77*'Top Sheet'!$H$27 | =E77*D77 |  | 0 | =(H77*G77)+G77 |  |  |  |  |  |  | =SUM(I77:O77) | =P77*D77 |
| 8.5 |  |  |  | =P78*'Top Sheet'!$H$27 | =E78*D78 |  | 0 | =(H78*G78)+G78 |  |  |  |  |  |  | =SUM(I78:O78) | =P78*D78 |
| 8.6 |  |  |  | =P79*'Top Sheet'!$H$27 | =E79*D79 |  | 0 | =(H79*G79)+G79 |  |  |  |  |  |  | =SUM(I79:O79) | =P79*D79 |
| 8.7 |  |  |  | =P80*'Top Sheet'!$H$27 | =E80*D80 |  | 0 | =(H80*G80)+G80 |  |  |  |  |  |  | =SUM(I80:O80) | =P80*D80 |
| 8.8 |  |  |  | =P81*'Top Sheet'!$H$27 | =E81*D81 |  | 0 | =(H81*G81)+G81 |  |  |  |  |  |  | =SUM(I81:O81) | =P81*D81 |
| 8.9 |  |  |  | =P82*'Top Sheet'!$H$27 | =E82*D82 |  | 0 | =(H82*G82)+G82 |  |  |  |  |  |  | =SUM(I82:O82) | =P82*D82 |
| 9 | ITEM NO. 9 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 9.1 |  |  |  | =P84*'Top Sheet'!$H$27 | =E84*D84 |  | 0 | =(H84*G84)+G84 |  |  |  |  |  |  | =SUM(I84:O84) | =P84*D84 |
| 9.2 |  |  |  | =P85*'Top Sheet'!$H$27 | =E85*D85 |  | 0 | =(H85*G85)+G85 |  |  |  |  |  |  | =SUM(I85:O85) | =P85*D85 |
| 9.3 |  |  |  | =P86*'Top Sheet'!$H$27 | =E86*D86 |  | 0 | =(H86*G86)+G86 |  |  |  |  |  |  | =SUM(I86:O86) | =P86*D86 |
| 9.4 |  |  |  | =P87*'Top Sheet'!$H$27 | =E87*D87 |  | 0 | =(H87*G87)+G87 |  |  |  |  |  |  | =SUM(I87:O87) | =P87*D87 |
| 9.5 |  |  |  | =P88*'Top Sheet'!$H$27 | =E88*D88 |  | 0 | =(H88*G88)+G88 |  |  |  |  |  |  | =SUM(I88:O88) | =P88*D88 |
| 9.6 |  |  |  | =P89*'Top Sheet'!$H$27 | =E89*D89 |  | 0 | =(H89*G89)+G89 |  |  |  |  |  |  | =SUM(I89:O89) | =P89*D89 |
| 9.7 |  |  |  | =P90*'Top Sheet'!$H$27 | =E90*D90 |  | 0 | =(H90*G90)+G90 |  |  |  |  |  |  | =SUM(I90:O90) | =P90*D90 |
| 9.8 |  |  |  | =P91*'Top Sheet'!$H$27 | =E91*D91 |  | 0 | =(H91*G91)+G91 |  |  |  |  |  |  | =SUM(I91:O91) | =P91*D91 |
| 9.9 |  |  |  | =P92*'Top Sheet'!$H$27 | =E92*D92 |  | 0 | =(H92*G92)+G92 |  |  |  |  |  |  | =SUM(I92:O92) | =P92*D92 |
| TOTAL  |  |  |  |  | =SUM(F4:F92) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q92) |

## Sheet: HARDSCAPE

| COST BREAKDOWN |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Item | Item Description | Unit | QTY | Rate | Amount | Supply Price | VAT % | Supply price + VAT | Installation |  |  |  |  | MT. Transp. | Unit Price | Total Unit Price |
| 1 | Section No. 02741 AGGREGATE BASE COURSE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | The work includes supply and installation of  base course leveling and compaction by roller, and all related civil works deemed necessary to complete the works as per drawings and specifications. |  |  | =P4*'Top Sheet'!$H$27 | =E4*D4 |  | 0 | =(H4*G4)+G4 |  |  |  |  |  |  | =SUM(I4:O4) | =P4*D4 |
| 1.1 | 200mm thick aggregate base course with min. 80% CBR . | m² | 88550 | =P5*'Top Sheet'!$H$27 | =E5*D5 | 160 | 0 | 180 | =I5*0.15 | 10 | 10 | 50 |  |  | =SUM(I5:O5) | =P5*D5 |
|  |  |  |  | =P6*'Top Sheet'!$H$27 | =E6*D6 |  | 0 | =(H6*G6)+G6 |  |  |  |  |  |  | =SUM(I6:O6) | =P6*D6 |
| 2 | Section No. 321400 CONCRETE INTERLOCKING PAVING |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | The work includes supply and installation of interlock pavers,clean sand  , and all related civil works deemed necessary to complete the works as per drawings and specifications. |  |  | =P8*'Top Sheet'!$H$27 | =E8*D8 |  | 0 | =(H8*G8)+G8 |  |  |  |  |  |  | =SUM(I8:O8) | =P8*D8 |
| 2.1 | 30mm thick sand bed. | m² | 88550 | =P9*'Top Sheet'!$H$27 | =E9*D9 | 0 | 0 | =(H9*G9)+G9 | 12 | 2 | 3 |  |  |  | =SUM(I9:O9) | =P9*D9 |
| 2.2 | 80mm thick interlock. | m² | 88550 | =P10*'Top Sheet'!$H$27 | =E10*D10 | 265 | 0 | =(H10*G10)+G10 | 265 | =J10*0.15 | =J10*0.1 | 70 |  |  | =SUM(I10:O10) | =P10*D10 |
| 3 | Section No. 02771 STONE PAVING |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | Curbstone |  |  | =P12*'Top Sheet'!$H$27 | =E12*D12 |  | 0 | =(H12*G12)+G12 |  |  |  |  |  |  | =SUM(I12:O12) | =P12*D12 |
|  | The work includes supply and installation of precast concrete curb stone with compressive strenght Fc' ≥ 250 kg/m², cement mortar setting, grouting with approved materials, preparation of surfaces to recieve materials by leveling and compaction, and all related activity required for complete work as per drawings and specifications. |  |  | =P13*'Top Sheet'!$H$27 | =E13*D13 |  | 0 | =(H13*G13)+G13 |  |  |  |  |  |  | =SUM(I13:O13) | =P13*D13 |
| 3.1 | Upstand Curbstone including foundation and backfilling. | Lm | 18000 | =P14*'Top Sheet'!$H$27 | =E14*D14 | 220 | 0 | =(H14*G14)+G14 | =I14*0.15 | 60 | =I14*0.1 | 325 |  |  | =SUM(I14:O14) | =P14*D14 |
| 3.2 | Flush Curbstone including foundation and backfilling. | Lm | 0 | =P15*'Top Sheet'!$H$27 | =E15*D15 | 220 | 0 | =(H15*G15)+G15 | =I15*0.15 | 60 | =I15*0.1 | 325 |  |  | =SUM(I15:O15) | =P15*D15 |
| 4 | Section No. 02763 ROAD PAVEMENT MARKINGS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4.1 | Traffic marking shall consists of white and/or yellow thermoplastic paint and studs as per drawings and  specifications. |  |  | =P17*'Top Sheet'!$H$27 | =E17*D17 |  | 0 | =(H17*G17)+G17 |  |  |  |  |  |  | =SUM(I17:O17) | =P17*D17 |
| 4.2 | Stop line, white reflective thermoplastic paint (601). | Lm | 125 | =P18*'Top Sheet'!$H$27 | =E18*D18 | 250 | 0.14 | =(H18*G18)+G18 | =I18*0.5 |  |  |  |  |  | =SUM(I18:O18) | =P18*D18 |
| 4.3 | Yield line, white reflective thermoplastic paint, used before pedestrian crossing (602). | Lm | 60 | =P19*'Top Sheet'!$H$27 | =E19*D19 | 150 | 0.14 | =(H19*G19)+G19 | =I19*0.5 |  |  |  |  |  | =SUM(I19:O19) | =P19*D19 |
| 4.4 | Pedestrian crossing, white reflective thermoplastic paint (603). | Lm | 220 | =P20*'Top Sheet'!$H$27 | =E20*D20 | 250 | 0.14 | =(H20*G20)+G20 | =I20*0.5 |  |  |  |  |  | =SUM(I20:O20) | =P20*D20 |
| 4.5 | Yield line, white reflective thermoplastic paint, used for roundabouts (604). | Lm | 235 | =P21*'Top Sheet'!$H$27 | =E21*D21 | 150 | 0.14 | =(H21*G21)+G21 | =I21*0.5 |  |  |  |  |  | =SUM(I21:O21) | =P21*D21 |
| 4.6 | Center line marking (white reflective thermoplastic paint , used to divide the curve and intersection of road into opposing traffic lanes where passing isn't permitted (611). | Lm | 640 | =P22*'Top Sheet'!$H$27 | =E22*D22 | 75 | 0.14 | =(H22*G22)+G22 | =I22*0.5 |  |  |  |  |  | =SUM(I22:O22) | =P22*D22 |
| 4.7 | Center line marking (white reflective thermoplastic paint , used to divide the curve and intersection of road into traffic lanes where passing isn't permitted (612). | Lm | 255 | =P23*'Top Sheet'!$H$27 | =E23*D23 | 100 | 0.14 | =(H23*G23)+G23 | =I23*0.5 |  |  |  |  |  | =SUM(I23:O23) | =P23*D23 |
| 4.8 | Edge line,  thermoplastic paint, used to delineate right or left edge of traffic lanes (613). | Lm | 80 | =P24*'Top Sheet'!$H$27 | =E24*D24 | 75 | 0.14 | =(H24*G24)+G24 | =I24*0.5 |  |  |  |  |  | =SUM(I24:O24) | =P24*D24 |
| 4.9 | Center line marking (white reflective thermoplastic paint) used for  parking (621). | Lm | 8670 | =P25*'Top Sheet'!$H$27 | =E25*D25 | 40 | 0.14 | =(H25*G25)+G25 | 10 |  |  |  |  |  | =SUM(I25:O25) | =P25*D25 |
| 4.1 | Center line marking (white reflective thermoplastic paint , used to divide the road into opposing traffic lanes where passing is permitted (652). | Lm | 2210 | =P26*'Top Sheet'!$H$27 | =E26*D26 | 37.5 | 0.14 | =(H26*G26)+G26 | =I26*0.5 |  |  |  |  |  | =SUM(I26:O26) | =P26*D26 |
| 4.2 | White reflective thermoplastic paint, used to divide the road into traffic lanes in the same directions (654). | Lm | 4130 | =P27*'Top Sheet'!$H$27 | =E27*D27 | 18.75 | 0.14 | =(H27*G27)+G27 | =I27*0.5 |  |  |  |  |  | =SUM(I27:O27) | =P27*D27 |
| 4.3 | Lane line, white reflective thermoplastic paint  used to divide the road into traffic lanes within round about (680) . | Lm | 410 | =P28*'Top Sheet'!$H$27 | =E28*D28 | 37.5 | 0.14 | =(H28*G28)+G28 | =I28*0.5 |  |  |  |  |  | =SUM(I28:O28) | =P28*D28 |
| 4.4 | Giveway Triangle Marking (605). | No. | 30 | =P29*'Top Sheet'!$H$27 | =E29*D29 | 500 | 0.14 | =(H29*G29)+G29 | =I29*0.5 |  |  |  |  |  | =SUM(I29:O29) | =P29*D29 |
| 4.5 | Straight arrow white reflective thermoplastic paint (614). | No. | 22 | =P30*'Top Sheet'!$H$27 | =E30*D30 | 500 | 0.14 | =(H30*G30)+G30 | =I30*0.5 |  |  |  |  |  | =SUM(I30:O30) | =P30*D30 |
| 4.6 | Right turn arrow or Left turn arrow white reflective thermoplastic paint (615&616). | No. | 15 | =P31*'Top Sheet'!$H$27 | =E31*D31 | 500 | 0.14 | =(H31*G31)+G31 | =I31*0.5 |  |  |  |  |  | =SUM(I31:O31) | =P31*D31 |
| 4.7 | Combination arrow, Right-turn and straight arrow or left turn and straight arrow white reflective thermoplastic paint (617&618). | No. | 36 | =P32*'Top Sheet'!$H$27 | =E32*D32 | 750 | 0.14 | =(H32*G32)+G32 | =I32*0.5 |  |  |  |  |  | =SUM(I32:O32) | =P32*D32 |
| 4.8 | Combination arrow Left and Right,Warning left-turn or right-turn arrow (619) | No | 20 | =P33*'Top Sheet'!$H$27 | =E33*D33 | 750 | 0.14 | =(H33*G33)+G33 | =I33*0.5 |  |  |  |  |  | =SUM(I33:O33) | =P33*D33 |
| 4.9 | Speed Bump | No. | 4 | =P34*'Top Sheet'!$H$27 | =E34*D34 | 2000 | 0.14 | =(H34*G34)+G34 |  | 500 | 500 |  |  |  | =SUM(I34:O34) | =P34*D34 |
| 5 | Section No. 101453 TRAFFIC SIGNS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 5.1 | The work includes supply and install a complete unit reflective signs assemblies. The |  |  | =P36*'Top Sheet'!$H$27 | =E36*D36 |  | 0 | =(H36*G36)+G36 |  |  |  |  |  |  | =SUM(I36:O36) | =P36*D36 |
| 5.2 | Stop Sign | No. | 21 | =P37*'Top Sheet'!$H$27 | =E37*D37 | 6975 | 0.14 | =(H37*G37)+G37 | 2200 | 500 |  |  |  |  | =SUM(I37:O37) | =P37*D37 |
| 5.3 | Giveway Sign | No. | 19 | =P38*'Top Sheet'!$H$27 | =E38*D38 | 6800 | 0.14 | =(H38*G38)+G38 | 2000 | 500 |  |  |  |  | =SUM(I38:O38) | =P38*D38 |
| 5.4 | Roundabout | No. | 19 | =P39*'Top Sheet'!$H$27 | =E39*D39 | 6800 | 0.14 | =(H39*G39)+G39 | 2000 | 500 |  |  |  |  | =SUM(I39:O39) | =P39*D39 |
| 5.5 | Parking | No. | 14 | =P40*'Top Sheet'!$H$27 | =E40*D40 | 7250 | 0.14 | =(H40*G40)+G40 | 2500 | 500 |  |  |  |  | =SUM(I40:O40) | =P40*D40 |
| 5.6 | Keep Right | No. | 25 | =P41*'Top Sheet'!$H$27 | =E41*D41 | 6800 | 0.14 | =(H41*G41)+G41 | 2000 | 500 |  |  |  |  | =SUM(I41:O41) | =P41*D41 |
| 5.7 | Give way to Pedestrian | No. | 9 | =P42*'Top Sheet'!$H$27 | =E42*D42 | 7250 | 0.14 | =(H42*G42)+G42 | 2500 | 500 |  |  |  |  | =SUM(I42:O42) | =P42*D42 |
| 5.8 | Pedestrian crossing | No. | 15 | =P43*'Top Sheet'!$H$27 | =E43*D43 | 7250 | 0.14 | =(H43*G43)+G43 | 2500 | 500 |  |  |  |  | =SUM(I43:O43) | =P43*D43 |
| 5.3 | Speed Limit 30 km/h | No. | 8 | =P44*'Top Sheet'!$H$27 | =E44*D44 | 6800 | 0.14 | =(H44*G44)+G44 | 2000 | 500 |  |  |  |  | =SUM(I44:O44) | =P44*D44 |
| 5.4 | Multiple Chevron Right | No. | 22 | =P45*'Top Sheet'!$H$27 | =E45*D45 | 10250 | 0.14 | =(H45*G45)+G45 | 3000 | 500 |  |  |  |  | =SUM(I45:O45) | =P45*D45 |
| 5.5 | Multiple Chevron Left | No. | 3 | =P46*'Top Sheet'!$H$27 | =E46*D46 | 10250 | 0.14 | =(H46*G46)+G46 | 3000 | 500 |  |  |  |  | =SUM(I46:O46) | =P46*D46 |
| 5.6 | Speed Hump Ahead | No. | 4 | =P47*'Top Sheet'!$H$27 | =E47*D47 | 7250 | 0.14 | =(H47*G47)+G47 | 2500 | 500 |  |  |  |  | =SUM(I47:O47) | =P47*D47 |
| 5.9 |  |  |  | =P48*'Top Sheet'!$H$27 | =E48*D48 |  | 0 | =(H48*G48)+G48 |  |  |  |  |  |  | =SUM(I48:O48) | =P48*D48 |
| 6 | ITEM NO. 6 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 6.1 |  |  |  | =P50*'Top Sheet'!$H$27 | =E50*D50 |  | 0 | =(H50*G50)+G50 |  |  |  |  |  |  | =SUM(I50:O50) | =P50*D50 |
| 6.2 |  |  |  | =P51*'Top Sheet'!$H$27 | =E51*D51 |  | 0 | =(H51*G51)+G51 |  |  |  |  |  |  | =SUM(I51:O51) | =P51*D51 |
| 6.3 |  |  |  | =P52*'Top Sheet'!$H$27 | =E52*D52 |  | 0 | =(H52*G52)+G52 |  |  |  |  |  |  | =SUM(I52:O52) | =P52*D52 |
| 6.4 |  |  |  | =P53*'Top Sheet'!$H$27 | =E53*D53 |  | 0 | =(H53*G53)+G53 |  |  |  |  |  |  | =SUM(I53:O53) | =P53*D53 |
| 6.5 |  |  |  | =P54*'Top Sheet'!$H$27 | =E54*D54 |  | 0 | =(H54*G54)+G54 |  |  |  |  |  |  | =SUM(I54:O54) | =P54*D54 |
| 6.6 |  |  |  | =P55*'Top Sheet'!$H$27 | =E55*D55 |  | 0 | =(H55*G55)+G55 |  |  |  |  |  |  | =SUM(I55:O55) | =P55*D55 |
| 6.7 |  |  |  | =P56*'Top Sheet'!$H$27 | =E56*D56 |  | 0 | =(H56*G56)+G56 |  |  |  |  |  |  | =SUM(I56:O56) | =P56*D56 |
| 6.8 |  |  |  | =P57*'Top Sheet'!$H$27 | =E57*D57 |  | 0 | =(H57*G57)+G57 |  |  |  |  |  |  | =SUM(I57:O57) | =P57*D57 |
| 6.9 |  |  |  | =P58*'Top Sheet'!$H$27 | =E58*D58 |  | 0 | =(H58*G58)+G58 |  |  |  |  |  |  | =SUM(I58:O58) | =P58*D58 |
| 9.1 |  |  |  | =P59*'Top Sheet'!$H$27 | =E59*D59 |  | 0 | =(H59*G59)+G59 |  |  |  |  |  |  | =SUM(I59:O59) | =P59*D59 |
| 9.2 |  |  |  | =P60*'Top Sheet'!$H$27 | =E60*D60 |  | 0 | =(H60*G60)+G60 |  |  |  |  |  |  | =SUM(I60:O60) | =P60*D60 |
| 9.3 |  |  |  | =P61*'Top Sheet'!$H$27 | =E61*D61 |  | 0 | =(H61*G61)+G61 |  |  |  |  |  |  | =SUM(I61:O61) | =P61*D61 |
| 9.4 |  |  |  | =P62*'Top Sheet'!$H$27 | =E62*D62 |  | 0 | =(H62*G62)+G62 |  |  |  |  |  |  | =SUM(I62:O62) | =P62*D62 |
| 9.5 |  |  |  | =P63*'Top Sheet'!$H$27 | =E63*D63 |  | 0 | =(H63*G63)+G63 |  |  |  |  |  |  | =SUM(I63:O63) | =P63*D63 |
| 9.6 |  |  |  | =P64*'Top Sheet'!$H$27 | =E64*D64 |  | 0 | =(H64*G64)+G64 |  |  |  |  |  |  | =SUM(I64:O64) | =P64*D64 |
| 9.7 |  |  |  | =P65*'Top Sheet'!$H$27 | =E65*D65 |  | 0 | =(H65*G65)+G65 |  |  |  |  |  |  | =SUM(I65:O65) | =P65*D65 |
| 9.8 |  |  |  | =P66*'Top Sheet'!$H$27 | =E66*D66 |  | 0 | =(H66*G66)+G66 |  |  |  |  |  |  | =SUM(I66:O66) | =P66*D66 |
| 9.9 |  |  |  | =P67*'Top Sheet'!$H$27 | =E67*D67 |  | 0 | =(H67*G67)+G67 |  |  |  |  |  |  | =SUM(I67:O67) | =P67*D67 |
| TOTAL  |  |  |  |  | =SUM(F4:F67) |  |  |  |  |  |  |  |  |  |  | =SUM(Q4:Q67) |
