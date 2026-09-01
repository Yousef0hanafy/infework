---
type: extracted_document
source_name: IA Earthing Calculations BS 7430 FOR PWR CLUB HOUSE.XLSX
source_extension: .xlsx
source_path: 01- Master/2026/مشروعات للدراسه -10/احمد الحضري/01- بالم هيلز م احمد الحضري/New folder/PX Club Buildings/Clubhouse/MEP/CLUB HOUSE - IFT/02-ELEC/07-CALCULATION/IA Earthing Calculations BS 7430 FOR PWR CLUB HOUSE.XLSX
source_url: https://infeworks.sharepoint.com/sites/InfeworksFiles/_layouts/15/Doc.aspx?sourcedoc=%7B111811D9-9D60-4F13-B3AC-1BD64DF9CAD5%7D&file=IA%20Earthing%20Calculations%20BS%207430%20FOR%20PWR%20CLUB%20HOUSE.XLSX&action=default&mobileredirect=true
source_id: 01TC5FCYGZCEMBCYE5CNH3HLA32ZG7TSWV
size_bytes: 94899
last_modified: 2025-09-23T12:08:58Z
extraction_status: extracted
---

# IA Earthing Calculations BS 7430 FOR PWR CLUB HOUSE.XLSX

> هذا المحتوى مستخرج آليًا من الملف الأصلي. يجب الرجوع إلى المصدر عند الاعتماد على رقم أو قيمة.


## Sheet: Earthing Conductor size

|  | 1- CALCULATION OF MAIN EARTHING CONDUCTOR |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | 1.1 According to BS 7430  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  | = | =J12*SQRT(J13)/J16 | 10 % corrosion tolerance |  |  |  | =F8*1.1 | (mm2) |
|  | where :- |  |  |  |  |  |  |  |  |  |  |
|  | A | cross section area of the main earthing conductor (mm2) |  |  |  |  |  |  |  |  |  |
|  | I | fault current (ampere) |  |  |  |  |  |  | 25000 |  |  |
|  | t | duration of fault current (seconds) |  |  |  |  |  |  | 0.5 |  |  |
|  | K | material coefficient of the main earth conductor (A.sqrt(sec.)/mm2) |  |  |  |  |  |  |  |  |  |
|  | K     = | α * SQRT { LOGe ( ( T2+β ) / (T1+β) ) } |  |  |  |  |  |  | =226*SQRT(LN((J19+254)/(J20+234.5))) |  |  |
|  |  |  |  |  |  |  | (for copper) |  |  |  |  |
|  | where :- |  |  |  |  |  |  |  |  |  |  |
|  | T2 | maximum permitted final temperature of the conductor ( c ) |  |  |  |  |  |  | 250 |  |  |
|  | T1 | ambient temperature of the conductor ( c ) |  |  |  |  |  |  | 30 |  |  |
|  | SELECTED CROSS SECTION AREA FOR THE MAIN COPPER CONDUCTOR (mm2) |  |  |  |  |  |  |  | = | 120 | (mm2) |
|  | NOTE: |  | Metal |  | α | β |  |  |  |  |  |
|  |  |  | Copper |  | 226 | 234.5 |  |  |  |  |  |

## Sheet: Earth Resistance Tri

| EARTH RESISTANCE CALCULATIONS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | PROJECT:  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 1 - CALCULATION OF  SINGLE EARTHING  ROD RESISTANCE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | According to BS 7430:2011 + A1:2015 Equation 9.5.3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  | =($J$13/(2*PI()*J14))*(LN(8*J14/$J$15)-1) | ohm |  |  |  |  |  |  |
|  | where :- |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | ρ Rho | Specific Resistivity of the Soil (ohm. m) |  |  |  |  |  |  | 100 |  |  |  |  |  |  |  |  |
|  | L | length of the earth rod (m) |  |  |  |  |  |  | 3 |  |  |  |  |  |  |  |  |
|  | D | diameter of the earth rod (m) |  |  |  |  |  |  | 0.016 |  |  |  |  |  |  |  |  |
|  | 2- RESISTANCE OF THREE RODS OF EQUILATERAL TRIANGLE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | According to BS 7430:2011+A1:2015 Equation 9.5.8.1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | The Resistance of a backfilled electrod Rb in Ohms calculated from:  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | Re = | =+(1/3*(J24/(2*PI()*J25)*(LN(8*J25/J26)-1+(2*J25/J27)))) | ohm |  |  |  |  |  |  |
|  |  ρ | Resistivity of the soil (ohm. m) |  |  |  |  |  |  | =J13 |  |  |  |  |  |  |  |  |
|  | L | Length of the Rod in metres (m) |  |  |  |  |  |  | =J14 |  |  |  |  |  |  |  |  |
|  | d | diameter of the earth rod (m) |  |  |  |  |  |  | =J15 |  |  |  |  |  |  |  |  |
|  | S | Length of One side of the Equilateral triangle |  |  |  |  |  |  | =J14 |  |  |  |  |  |  |  |  |
|  | n | No of Earth Rods |  |  |  |  |  |  | 3 |  |  |  |  |  |  |  |  |
|  | 3 - RESISTANCE OF EARTH ELECTROL IN LOW RESISTIVITY MATERIAL.  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | According to BS 7430:2011+A1:2015 Equation 9.5.7 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | The Resistance of a backfilled electrod Rb in Ohms calculated from:  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  | Rb | =1/(2*PI()*(J41*J43))*((J38-J39)*(LN(8*J41/J42)-1)+J39*(LN(8*J41/J40)-1)) | ohm |  |  |  |  |  |  |
|  |  ρ | Resistivity of the soil (ohm. m) |  |  |  |  |  |  | =J13 |  |  |  |  |  |  |  |  |
|  |  ρc | Resistivity of the conductive material used for backfill |  |  |  |  |  |  | 100 |  |  |  |   |  |  |  |  |
|  | d | diameter of the earth rod (m) |  |  |  |  |  |  | 0.016 |  |  |  |  |  |  |  |  |
|  | L | Length of the Rod in metres (m) |  |  |  |  |  |  | 3 |  |  |  |  |  |  |  |  |
|  | D | Diameter of Infill in metres (m) |  |  |  |  |  |  | 0.016 |  |  |  |  |  |  |  |  |
|  | n | No of Earth Rods |  |  |  |  |  |  | 3 |  |  |  |  |  |  |  |  |
|  | 3- CALCULATION OF EARTH RESISTANCE FOR STRIP OR ROUND CONDUCTOR  |  |  |  |  |  |  |  |  |  |  |  | Conductor Size in mm2 |  |  |  |  |
|  | According to BS 7430:2011 +A1:2015 Equation 9.5.5 |  |  |  |  |  |  |  |  |  |  |  | 25 | 0.00642 |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  | 35 | 0.0076500000000000005 |  |  |  |
|  | Rta = |  |  |  |  |  |  |  |  | =(J51/(2*3.14*J52))*LN(J52*J52/(1.36*J53*J54)) | ohm |  | 50 | 0.0089 |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  | 70 | 0.0107 |  |  |  |
|  | where :- |  |  |  |  |  |  |  |  |  |  |  | 95 | 0.0126 |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  | 120 | 0.01421 |  |  |  |
|  |  ρ Rho | specific resistivity of the soil (ohm. m) |  |  |  |  |  |  | =J13 |  |  |  | 150 | 0.01575 |  |  |  |
|  | L | the total length of conductor (m) |  |  |  |  |  |  | 9 |  |  |  | 185 | 0.01764 |  |  |  |
|  | h | the depth of burial in metres  (m) |  |  |  |  |  |  | 0.8 |  |  |  | 240 | 0.02025 |  |  |  |
|  | d | Diameter of the round conductor or cross sectional area of the strip (m) |  |  |  |  | 120 |  | =LOOKUP(H54,N45:N56,O45:O56) |  |  |  | 300 | 0.02268 |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |  | 400 | 0.02565 |  |  |  |
|  | k | has the value of 1.36 for strip or 1.83 for round conductor. |  |  |  |  |  |  |  |  |  |  | 253 | 0.025 | 25 x 3 mm Tape |  |  |
|  | 4- THE COMBINED EARTH RESISTANCE OF THE RODS & CONDUCTOR (LOOP) AS FOLLOWS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  | 1/R = 1/Re + 1/Rb + 1/Rta |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | RT  = | Combined system earth resistance (ohm) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  | 1/RT | = | =1/K21 | + | =1/K35 | + | =1/K47 |  |  |  |  |  |  |  |  |  |
|  |  | RT | = | =1/(E66+G66+I66) |  | ohm |  |  |  |  |  |  |  |  |  |  |  |
|  | Since the desired value of less than 0.5 ohm is not achieved by using  Equilateral Trinagle electrode of 6m with Low Res Infill and a Ring conductor of 95mm2 - 24 Mtr long. Hence it is recommanded to connect all Low Current Triangulars |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | 5- THE COMBINED EARTH RESISTANCE OF THE RODS & CONDUCTOR (LOOP) AS FOLLOWS |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  | Rt1 | Triangular Earthing Resistance |  |  |  |  |  | Rt1 = | =E68 |  |  |  |  |  |  |  |
|  |  | Rt2 | Triangular Earthing Resistance |  |  |  |  |  | Rt2 = | =E68 |  |  |  |  |  |  |  |
|  |  | Rt3 | Triangular Earthing Resistance |  |  |  |  |  | Rt3 = | =E68 |  |  |  |  |  |  |  |
|  |  | Rt4 | Triangular Earthing Resistance |  |  |  |  |  | Rt4 = | =E68 |  |  |  |  |  |  |  |
|  |  | Rt5 | Triangular Earthing Resistance |  |  |  |  |  | Rt5 = | =E68 |  |  |  |  |  |  |  |
|  |  | 1/R = 1/Rt1 + 1/Rt2+1/Rt2+1/Rt4+1/Rt5 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | R  = | Combined system earth resistance (ohm) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  | 1/RT | = | =1/K77 | + | =1/K78 | =1/K79 | =1/K80 |  | =1/K81 |  |  |  |  |  |  |  |
|  |  | RT | = | =1/(E87+G87+H87+I87+K87+L87+L87+L87+L87+L87) |  | ohm |  |  |  |  |  |  |  |  |  |  |  |
