---
type: extracted_document
source_name: Method Statement For SWRO.docx
source_extension: .docx
source_path: 01- Master/2026/مشروعات للدراسه -10/02- منتجع ابو غزاله الساحل الشمالي/Technical Offers/final RO/Method Statement For SWRO.docx
source_url: https://infeworks.sharepoint.com/sites/InfeworksFiles/_layouts/15/Doc.aspx?sourcedoc=%7BBE2301A0-AE20-4193-A750-1147B566281F%7D&file=Method%20Statement%20For%20SWRO.docx&action=default&mobileredirect=true
source_id: 01TC5FCYFAAER34IFOSNA2OUARI62WMKA7
size_bytes: 33589
last_modified: 2026-02-17T11:15:03Z
extraction_status: extracted
---

# Method Statement For SWRO.docx

> هذا المحتوى مستخرج آليًا من الملف الأصلي. يجب الرجوع إلى المصدر عند الاعتماد على رقم أو قيمة.

Method Statement For 1000 /D SWRO Plant
Process Design and Engineering
Before any physical work begins, the engineering phase ensures the system meets the required flow rate and water quality standards.
Process Design: Calculation of mass balance, membrane projections (using software like ROSA or WAVE), and hydraulic calculations.
Engineering Drawings: Preparation of P&ID (Piping and Instrumentation Diagram), General Arrangement (GA) drawings, and electrical wiring diagrams.
Material Selection: Selection of materials compatible with water salinity (e.g., SS316L for high pressure, UPVC for low pressure).
Delivery of Equipment to Site
This section outlines the logistics and safety of moving heavy equipment.
Inspection: All equipment (Vessels, Skids, Pumps) will be inspected upon arrival for any transit damage.
Handling: Use of appropriate lifting equipment (cranes/forklifts) for the RO Support Skid and Multimedia filters.
Storage: Sensitive components like RO Membranes and PLC Panels will be stored in a climate-controlled, dust-free environment until the moment of installation.
Installation, Commissioning and Startup
The systematic approach to putting the plant together:
Mechanical Installation: Mounting pumps, connecting the ERD (Energy Recovery Device), and installing pressure vessels on the skid.
Piping & Instrumentation: Connection of all internal and external piping, followed by the installation of sensors.
Commissioning (Dry Run): Testing the PLC logic, motor rotation, and valve automation without water.
Startup (Wet Run): Gradual pressurization of the system, monitoring permeate quality and adjusting dosing rates.
Detailed Component Installation
Filter Feed Pump, Dosing Pumps and Tanks
Installation: Pumps are mounted on concrete plinths or the main skid using anti-vibration pads.
Connection: Dosing pumps are connected to the Injection Dosing Tanks via chemical-resistant tubing.
Calibration: Dosing pumps will be calibrated to stroke frequency based on the raw water flow meter signal.
Multimedia Filter (MMF)
Media Loading: The vessel is filled with graded layers (gravel, silica sand, and anthracite) manually through the top manhole.
Internal Distribution: Inspection of lateral systems before loading to ensure uniform flow.
Backwash Setup: Integration of the automatic multi-port valve or butterfly valve nest for periodic cleaning.
Cartridge Filter (CF)
Final Protection: Installed as the last stage before the High-Pressure Pump to catch particles up to 5 microns.
Maintenance: Equipped with differential pressure gauges to indicate when the internal elements need replacement.
High Pressure Pump (HPP)
Based on the specifications (100 m³/hr @ 45 bar), this is the critical driver of the RO process.
Installation: The pump will be mounted on a heavy-duty reinforced concrete base or a rigid steel skid using anti-vibration mounts to minimize noise and mechanical stress.
Precise alignment between the motor and pump shaft is mandatory to prevent seal failure.
Piping Connection: Suction lines will be installed to ensure no air pockets (using eccentric reducers if necessary).
Discharge piping will be High-Pressure Stainless Steel (316L) to withstand the 45 bar operating pressure.
Protection: Installation of a high-pressure switch and a low-pressure switch to protect the pump and membranes from dry running or over-pressurization.
R.O. Pressure Vessels & Membranes
11 Vessels (8-inch, Side Port, FRP) and 66 Sea Water Membranes.
Pressure Vessel Installation (FRP, 1200 psi):
Mounting: Vessels will be secured to the RO Support Skid using rubber-lined straps (saddles). They must be aligned perfectly horizontal to ensure easy membrane loading.
Side Port Connection: Careful assembly of the side ports using high-pressure flexible couplings (Victaulic type) to allow for slight thermal expansion/contraction.
Membrane Loading (66 Elements - Spiral Wound):
Preparation: Clean the inside of the FRP vessels. Check the brine seal orientation on each membrane.
Loading: Membranes will be loaded in the direction of the feed flow. Use only glycerin or approved water-soluble lubricants for the O-rings; never use petroleum-based grease.
Shim Adjustment: If there is any movement in the membrane stack, shims will be used to ensure a tight fit between the membrane adapters and the vessel end caps to prevent internal bypassing.
Energy Recovery Device (ERD)
Integration: Given the 45 bar head and 100 m³/hr flow, the ERD (Turbocharger) will be installed in parallel with the HPP.
Function: It will capture the hydraulic energy from the high-pressure brine stream and transfer it to the incoming feed water, significantly reducing the electrical load.
Variable Frequency Device (VFD)
Control: The VFD will be integrated into the Control Panel (PLC) to manage the High Pressure Pump’s startup (Soft Start) and adjust the flow/pressure based on temperature and salinity changes.
Cooling: Ensure the VFD is installed in a ventilated section of the panel to prevent overheating during peak summer temperatures (up to 45°C).
Reverse Osmosis Support Skid
Fabrication: A heavy-duty carbon steel frame, sandblasted and coated with epoxy paint (corrosion resistant) to withstand the saline environment.
Leveling: The skid must be leveled using a precision spirit level before anchoring to the floor to ensure balanced hydraulic distribution across the 11 vessels.
Flushing/Cleaning System (CIP)
PE Flushing Tank: A Polyethylene tank used for both daily fresh water flushing and periodic Chemical-In-Place (CIP).
Flushing Pump: A dedicated centrifugal pump designed to circulate cleaning chemicals at low pressure but high flow rate through the membranes to remove scaling or organic fouling.
Control Panel with PLC System & VFD Integration
The control system is the "brain" of the 1000 m³/day plant, ensuring automated, safe, and efficient operation.
Panel Construction:
The Main Control Panel (MCP) shall be housed in an IP54/IP55 rated enclosure to protect electronic components from humidity and saline air.
It will feature a human-machine interface (HMI Touchscreen) for real-time monitoring of flow, pressure, and conductivity.
PLC Logic & Programming:
The PLC will manage the Automated Start-up/Shut-down sequences, including pre-flush and post-flush cycles using the Flushing Tank.
Interlock Protection: The system will automatically trip the High-Pressure Pump (HPP) if sensors detect low suction pressure, high discharge pressure (>84 bar), or high permeate conductivity.
VFD Operation:
The Variable Frequency Drive (VFD) will be programmed to provide a Soft Start for the HPP, eliminating water hammer and reducing mechanical stress on the 11 FRP Vessels.
It will modulate pump speed (50 Hz max) to maintain a constant permeate flow regardless of feed water temperature or salinity fluctuations.
Testing, Commissioning, and Startup
This final phase verifies that the installation meets the design parameters (1000 m³/day at 98-99% salt rejection).
Pre-Commissioning (Dry Checks)
Hydrostatic Testing: All high-pressure SS316L piping will be pressure tested to ensure zero leakage at operating pressures.
Signal Loop Test: Verifying that all instruments (Flow meters, Pressure Transmitters) are communicating correctly with the PLC.
Rotation Check: Briefly bumping motors to confirm the correct rotation of the Filter Feed Pump and High-Pressure Pump.
Wet Commissioning & Membrane Loading
System Rinsing: The system is flushed with low-pressure water to remove debris before membranes are loaded.
Membrane Installation: Loading the 66 Sea Water TFC elements into the 11 Vessels using glycerin as a lubricant, ensuring seals are correctly oriented.
Air Venting: Slowly filling the system with water to bleed out all trapped air from the vessels and the Energy Recovery Device (ERD).
Performance Startup
Gradual Pressurization: Using the VFD to slowly increase pressure up to the required 45 bar.
Data Logging: Recording initial performance data: Feed Pressure, Brine Pressure, Permeate Flow, and TDS.
Stabilization: Running the plant for a continuous 24-hour period to confirm that the Salt Rejection (98-99%) and Production (1000 m³/day) are stable.
Cleaning-In-Place (CIP) & Flushing System
Flushing Sequence: Confirming the Polyethylene Flushing Tank and Flushing Pump correctly execute a fresh water flush every time the plant stops to prevent membrane scaling.
CIP Validation: Testing the chemical circulation loop to ensure the system is ready for future membrane cleanings.
