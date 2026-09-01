---
type: extracted_document
source_name: Calculation Sheet20.docx
source_extension: .docx
source_path: 01- Master/2021/06- محطات المياه و الصرف ب توشكي (مستجدة) مقاولة النوبي و الشرق/04-Shop Drawings/20 m3/Fram/Data Sheet/Calculation Sheet20.docx
source_url: https://infeworks.sharepoint.com/sites/InfeworksFiles/_layouts/15/Doc.aspx?sourcedoc=%7BFCAAA46F-7E3B-4D6A-954F-64B54ABD35B3%7D&file=Calculation%20Sheet20.docx&action=default&mobileredirect=true
source_id: 01TC5FCYDPUSVPYO36NJGZKT3EWVFL2NNT
size_bytes: 1132717
last_modified: 2022-02-27T09:58:02Z
extraction_status: extracted
---

# Calculation Sheet20.docx

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
Spacing between beams = 2.7m
Own weight of main frame = Calculated by SAP-2000
Cover = 10 kg/m2 * 2.7m = 27 kg/m' = 0.027 ton/m’
Live Load = 54 kg/m2 * 2.7m = 145.8 kg/m' = 0.15 ton/m’
Wind Load
q: ضغط الرياح الأساسي  = 0.5 x 10-3 ρV2 Ct Cs
q = 0.5 x 10-3 x 1.25 x 362 x 1 x1 = 0.81 kn/m2 = 81 kg/m2
Calculation of wind forces:
(FOR ROOF)
K: Exposure Factor of wind = 1
B: Spacing between frames = 2.70m
q: base wind pressure = 81 kg/m2
P = Cf * K * q
Cf  = - 0.8
F = - 0.8 * 1 * 81 = - 64.8kg/m2
Fore for frame = - 64.8 * 2.70m = - 174.96 kg/m' = 0.2t/m
(P) force for truss members
= p * a = 0.2 * 0.95 = - 0.2 t
As (a) = spacing between truss vertical members
(FOR COLUMNS)
K: Exposure Factor of wind = 1
B: Spacing between frames = 2.70m
q: base wind pressure = 81 kg/m2
P = Cf * K * q
For compression:
Cf  =  0.8
F =  0.8 * 1 * 81 = - 64.8kg/m2 = 0.065t/m
Distributed load for columns =  64.8 * 2.70m = 0.2 t/m'
For suction:
Cf  =  -0.5
F =  -0.5 * 1 * 81 = - 40.5kg/m2 = 0.0405t/m
Distributed load for columns = - 40.5 * 2.70m = 0.11 t/m'
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
Design Of Bottom Chord(box section.)
Design of Top Chord(box section.)
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
= 0.007 + 0.01*0.95 = 0.02 t/m
LIVE LOAD:
WLL = 0.054 * 0.95 = 0.05 t/m
WIND LOAD : (neglected)
As wind load (suction) will reduce the applied load on purlins
Load Combination:
U = 1.2 WDL + 1.6 WLL
= 1.2 x 0.02 + 1.6 x 0.05
= 0.1t/m
Straining actions:
M =  = 0.1mt
Q =  = 0.14t
Check local buckling
Section is Non-compact
Check lateral torsion buckling
NO L.T.B ( because of corregated sheet)
Check stesses
Fb =  =  = 0.952 t/cm2      ≤ 0.58fy = 2.088    safe
Q  =   =  = 0.05 t                ≤ 0.35fy = 1.26      safe
Check deflection
Δ=  x  =  x  = 0.3  ≤  =  = 0.9   safe
Design of side girts:
(use UPN 65)
Properties of section:
Own weight = 7.09 kg/m
Sx = 17.7 cm3
Sy = 5.07 cm3
DEAD LOAD:(x-direction)
WDL = own wight of beam = 0.007 t/m
WIND LOAD: (y-direction)
Ww = 0.8 x 1 * 81 * 2.5 = 0.162 t/m
Load Combination:
Ux = 1.4 D
= 1.4 x 0.005 = 0.01 t/m
Uy = 1.3 W
= 1.3 x 0.162 = 0.21 t/m
Straining actions:
X - Direction
Mx =  = 0. 20mt
Qx  =  = 0.014t
Y - Direction
My =  = 0. 01mt
Qy  =  = 0.3t
Check local buckling
Section is Non-compact
Check stesses
Check normal:
+  ≤ 1
+  = 0.434     ≤ 1     safe
check shear:
=  = 6 >        (zone 1)
øVn = 0.85( 0.6Fy Aw)
= 0.85 (0.6 x 3.6 x 3.3 x 0.55 )
= 3.33 < Q = 0.3t        safe
Design of Hinged base:
Reactions of column
T = 5.80 t
Q = 0.40 t
Design of base plate.
D = B = H + 5cm = 12 + 5 = 17cm
Fbearing =    ≤  70kg/cm2
Fb    = = 20.1 kg/cm2    safe
M1 =
M2 =
M1  =  = 726.1 kg.cm = 0.008 mt
M2  =  = 2904.45 = 0.03 mt
Tp =  ≥ 2cm
=  = 2.60 cm ≥ 2cm
Tp = 2.6cm
2- Design of weld.               Smin=0.5cm ≤ S ≤ Smax( Tmin of plate or column=1cm)
S = 1cm
Aweld = 12 x 4 x 1 = 48cm2
Fw     =   ≤  0.2 Fu
=   = 0.12     ≤ 1.04    safe
Qw    =   ≤ 0.2 Fu
=   = 0.008    ≤ 1.04    safe
Feq    = ≤  1.1 x 0.2Fu
Feq    = = 0.20    ≤ 1.144      safe
Design of anchor bolts
Qb =
0.25 Fub =
D= 0.7cm
Take Ø 10
Fbond =
5 kg/cm2 =
L = 60ø or 1 m
L = 60*1 = 60cm
Design of Welded Connections:
For diagonal members.
Force = 8.60 t
≤  0.2Fu
Aw = 60 x 6 x 2 = 720mm2 = 7.2 cm4
= 1.2 t/cm2 < 1.04                 unsafe
Take s = 8mm
For bottom chord.
Force = 16.4 t
≤  0.2Fu
Aw = 120 x 6 x 4 = 2880mm2 = 28.4 cm4
= 0.6 t/cm2 ≤ 1.04                 safe

## Table 1

| Straining Action | Column | Top chord | Bottom chord | Vertical member | Diagonal member |
| --- | --- | --- | --- | --- | --- |
| Moment (t.m) | 3.10 | - | - | - | - |
| Shear (ton) | 6.80 | - | - | - | - |
| Normal (ton) | 4.00 | 15 | -16.4 | -1 | -8.6 |
