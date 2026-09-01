---
type: extracted_document
source_name: Calculation Sheet80.docx
source_extension: .docx
source_path: 01- Master/2021/06- محطات المياه و الصرف ب توشكي (مستجدة) مقاولة النوبي و الشرق/09-calculation sheet/STR/Calculation sheet/80m3(water feed unit)/Calculation Sheet80.docx
source_url: https://infeworks.sharepoint.com/sites/InfeworksFiles/_layouts/15/Doc.aspx?sourcedoc=%7BBCFEC943-DD34-47D3-B414-AD21BBC12D58%7D&file=Calculation%20Sheet80.docx&action=default&mobileredirect=true
source_id: 01TC5FCYCDZH7LYNG52ND3IFFNEG54CLKY
size_bytes: 1074227
last_modified: 2021-10-03T10:21:27Z
extraction_status: extracted
---

# Calculation Sheet80.docx

> هذا المحتوى مستخرج آليًا من الملف الأصلي. يجب الرجوع إلى المصدر عند الاعتماد على رقم أو قيمة.

مشروع إنشاء محطات تنقيه مياه الشرب ومحطات معالجه الصرف الصحي (توشكا – أسوان)
Calculation Sheet
المكتب المصري للأستشارات الهندسية
(BECT)
The Frame Section:
Loads
Weight per unit volume (steel) = 7.85 t/m3
Live Load = 54 kg/m2 (Egyptian Code of load)
Cover = 10 kg/m2 (Assumed)
Angle = 0 °
Spacing between beams = 3.25m
Own weight of main frame = Calculated by SAP-2000
Cover = 10 kg/m2 * 3.25m = 32.5 kg/m' = 0.0325 ton/m’
Live Load = 54 kg/m2 * 3.25m = 175.5 kg/m' = 0.18 ton/m’
Wind Load
q: ضغط الرياح الأساسي  = 0.5 x 10-3 ρV2 Ct Cs
q = 0.5 x 10-3 x 1.25 x 362 x 1 x1 = 0.81 kn/m2 = 81 kg/m2
Calculation of wind forces:
(FOR ROOF)
K: Exposure Factor of wind = 1
B: Spacing between frames = 3.25m
q: base wind pressure = 81 kg/m2
P = Cf * K * q
Cf  = - 0.8
F = - 0.8 * 1 * 81 = - 64.8kg/m2
Fore for frame = - 64.8 * 3.25m = - 210.6 kg/m' = 0.21t/m
(P) force for truss members
= p * a = 0.21 * 0.9375 = - 0.2 t
As (a) = spacing between truss vertical members
(FOR COLUMNS)
K: Exposure Factor of wind = 1
B: Spacing between frames = 3.25m
q: base wind pressure = 81 kg/m2
P = Cf * K * q
For compression:
Cf  =  0.8
F =  0.8 * 1 * 81 = - 64.8kg/m2 = 0.065t/m
Distributed load for columns =  64.8 * 3.25m = 0.21 t/m'
For suction:
Cf  =  -0.5
F =  -0.5 * 1 * 81 = - 40.5kg/m2 = 0.0405t/m
Distributed load for columns = - 40.5 * 3.25m = 0.13 t/m'
Structural analysis (SAP2000):
Frame Sections.
Loads on Frame
Dead Load = Own weight + Cover
Live Load
Wind Load
( Dead load )
(Live load)
(Wind Load)
Wind right
Wind left
Straining Action:
(Envelope Case):
Reactions
Moment
Shear
Normal Force
Maximum Straining Actions:
Column design Sheet (Box Sec.)
Box Sec. Design
***************
Design of Top Chord(box section.)
Design Of Bottom Chord(box section.)
Design Of Vertical Members (single angle Sec.)
Design Of Diagonal Members (single angle.)
Design of Purlins:
(use UPN 65)
Properties of section:
Own weight = 7.09 kg/m
Sx = 17.7 cm3
Sy = 5.07m
DEAD LOAD:
WDL = own wight of beam + Wcover
= 0.005 + 0.01*0.94 = 0.015 t/m
LIVE LOAD:
WLL = 0.054 * 0.94 = 0.05 t/m
WIND LOAD : (neglected)
As wind load (suction) will reduce the applied load on purlins
Load Combination:
U = 1.2 WDL + 1.6 WLL
= 1.2 x 0.015 + 1.6 x 0.05
= 0.1t/m
Straining actions:
M =  = 0.13mt
Q =  = 0.2t
Check local buckling
Section is Non-compact
Check lateral torsion buckling
NO L.T.B ( because of corregated sheet)
Check stesses
Fb =  =  = 1.24 t/cm2      ≤ 0.58fy = 2.088    safe
Q  =   =  = 0.07 t                ≤ 0.35fy = 1.26      safe
Check deflection
Δ=  x  =  x  = 0.6 ≤  =  = 1.03   safe
Design of side girts:
(use UPN 65)
Properties of section:
Own weight = 7.09 kg/m
Sx = 17.7 cm3
Sy = 5.07 cm3
DEAD LOAD:(x-direction)
WDL = own wight of beam = 0.005 t/m
WIND LOAD: (y-direction)
Ww = 0.8 x 1 * 81 * 2.5 = 0.162 t/m
Load Combination:
Ux = 1.4 D
= 1.4 x 0.005 = 0.007 t/m
Uy = 1.3 W
= 1.3 x 0.162 = 0.21 t/m
Straining actions:
X - Direction
Mx =  = 0. 3mt
Qx  =  = 0.01t
Y - Direction
My =  = 0. 01mt
Qy  =  = 0.4t
Check local buckling
Section is Non-compact
Check stesses
Check normal:
+  ≤ 1
+  = 0.618     ≤ 1     safe
check shear:
=  = 6 >        (zone 1)
øVn = 0.85( 0.6Fy Aw)
= 0.85 (0.6 x 3.6 x 3.3 x 0.55 )
= 3.33 < Q = 0.4t        safe
Design of Hinged base:
Reactions of column
T = 3.05 t
Q = 0.85t
Design of base plate.
D = B = H + 5cm = 12 + 5 = 17cm
Fbearing =  ≤  70kg/cm2
Fb    = = 10.6 kg/cm2    safe
M1 =
M2 =
M1  =  = 298.125= 0.003 mt
M2  =  = 1192.5 = 0.01 mt
Tp =  ≥ 2cm
=  = 1.66cm ≥ 2cm
Tp = 2cm
2- Design of weld.               Smin=0.5cm ≤ S ≤ Smax( Tmin of plate or column=1cm)
S = 1cm
Aweld = 12 x 4 x 1 = 48cm2
Fw     =   ≤  0.2 Fu
=   = 0.07     ≤ 1.04    safe
Qw    =   ≤ 0.2 Fu
=   = 0.018    ≤ 1.04    safe
Feq    = ≤  1.1 x 0.2Fu
Feq    = = 0.08    ≤ 1.144      safe
Design of anchor bolts
Qb =
0.25 Fub =
D= 0.7cm
Take Ø 10
Fbond =
5 kg/cm2 =
L = 40cm
Design of Welded Connections:
For diagonal members.
Force = 6.7t
≤  0.2Fu
Aw = 60 x 6 x 2 = 720mm2 = 7.2 cm4
= 0.93 t/cm2 ≤ 1.04                 safe
For bottom chord.
Force = 12.5t
≤  0.2Fu
Aw = 60 x 6 x 2 x 2 = 1440mm2 = 14.4 cm4
= 0.9 t/cm2 ≤ 1.04                 safe

## Table 1

| Straining Action | Column | Top chord | Bottom chord | Vertical member | Diagonal member |
| --- | --- | --- | --- | --- | --- |
| Moment (t.m) | 2.60 | - | - | - | - |
| Shear (ton) | 1.20 | - | - | - | - |
| Normal (ton) | 3.6 | 11 | -12.5 | -1 | -6.7 |
