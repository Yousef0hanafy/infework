// Infeworks — capability sectors: bilingual technical content


export type SectorSlug =
  | "water-treatment"
  | "wastewater"
  | "pumping"
  | "irrigation"
  | "electrical-control";

export type Bi = { en: string; ar: string };

export type ProcessStage = {
  key: string;
  name: Bi;
  detail: Bi;
  steps: Bi[];
};

export type EquipmentRow = {
  category: Bi;
  items: Bi;
};

export type Sector = {
  slug: SectorSlug;
  en: string;
  ar: string;
  defEn: string;
  defAr: string;
  icon: "droplets" | "recycle" | "gauge" | "sprout" | "zap";
  metric: Bi;
  intro: Bi;
  process: ProcessStage[];
  equipment: EquipmentRow[];
};

export const SECTORS: Sector[] = [
  {
    slug: "water-treatment",
    en: "Water & Treatment",
    ar: "المياه والمعالجة",
    defEn:
      "Potable, process, and desalinated water plants from raw intake to metered distribution — 100 to 1,500 m³/day.",
    defAr:
      "محطات مياه الشرب ومياه العمليات والتحلية من المأخذ الخام حتى التوزيع المقنن — من 100 إلى 1,500 م³/يوم.",
    icon: "droplets",
    metric: { en: "Up to 1,500 m³/day", ar: "حتى 1,500 م³/يوم" },
    intro: {
      en: "We design and build treatment trains sized to the actual raw-water analysis, not to a catalogue. Brackish and seawater reverse osmosis, conventional clarification, multimedia and cartridge filtration, disinfection, and food-grade process water loops are all delivered in-house — including the civil tanks, the skids, the panels, and the commissioning record.",
      ar: "نصمم وننفذ خطوط المعالجة وفق التحليل الفعلي للمياه الخام لا وفق كتالوج جاهز. تشمل أعمالنا التحلية بالتناضح العكسي للمياه المالحة ومياه البحر، والترويب التقليدي، والترشيح المتعدد والخرطوشي، والتطهير، ودوائر مياه العمليات المطابقة للاشتراطات الغذائية — بما في ذلك الخزانات المدنية والوحدات المجمعة واللوحات وسجل التشغيل التجريبي.",
    },
    process: [
      {
        key: "intake",
        name: { en: "Intake & Raw Water", ar: "المأخذ والمياه الخام" },
        detail: {
          en: "Source characterisation, intake structure, screening, and raw-water transfer sized to peak duty.",
          ar: "توصيف المصدر، وإنشاء المأخذ، والتصفية، ونقل المياه الخام بحسب أقصى حمل تشغيلي.",
        },
        steps: [
          { en: "Raw water sampling & full lab analysis", ar: "أخذ العينات والتحليل المعملي الكامل" },
          { en: "Intake civil works and coarse screening", ar: "الأعمال المدنية للمأخذ والتصفية الخشنة" },
          { en: "Raw water transfer pumps and surge control", ar: "مضخات نقل المياه الخام والتحكم في الصدمات" },
        ],
      },
      {
        key: "pretreatment",
        name: { en: "Pretreatment", ar: "المعالجة الأولية" },
        detail: {
          en: "Coagulation, sedimentation, and filtration protecting downstream membranes from fouling.",
          ar: "الترويب والترسيب والترشيح لحماية الأغشية من الانسداد.",
        },
        steps: [
          { en: "Dosing skids: coagulant, antiscalant, pH", ar: "وحدات الجرعات: مروب ومانع ترسيب وضبط pH" },
          { en: "Multimedia and activated carbon filters", ar: "مرشحات الوسائط المتعددة والكربون المنشط" },
          { en: "5 µm cartridge guard filtration", ar: "ترشيح خرطوشي حماية 5 ميكرون" },
        ],
      },
      {
        key: "ro",
        name: { en: "Membrane / Treatment Train", ar: "خط الأغشية والمعالجة" },
        detail: {
          en: "RO arrays designed to recovery and flux limits with energy recovery where the duty justifies it.",
          ar: "منظومات التناضح العكسي مصممة وفق حدود الاسترداد والتدفق مع استرجاع للطاقة حين يبرره الحمل.",
        },
        steps: [
          { en: "High-pressure pumps and pressure vessels", ar: "مضخات الضغط العالي وأوعية الضغط" },
          { en: "Membrane array staging and recovery balance", ar: "ترتيب مراحل الأغشية وموازنة الاسترداد" },
          { en: "CIP loop and permeate quality trending", ar: "دائرة التنظيف الكيميائي ومتابعة جودة الناتج" },
        ],
      },
      {
        key: "post",
        name: { en: "Post-treatment & Storage", ar: "المعالجة النهائية والتخزين" },
        detail: {
          en: "Remineralisation, disinfection, and storage that holds quality to the point of use.",
          ar: "إعادة التمعدن والتطهير والتخزين بما يحفظ الجودة حتى نقطة الاستخدام.",
        },
        steps: [
          { en: "Calcite / dosing remineralisation", ar: "إعادة التمعدن بالكالسيت أو الجرعات" },
          { en: "Chlorination or UV disinfection", ar: "التطهير بالكلور أو الأشعة فوق البنفسجية" },
          { en: "Food-grade lined storage tanks", ar: "خزانات مبطنة مطابقة للاشتراطات الغذائية" },
        ],
      },
      {
        key: "om",
        name: { en: "Operation & Maintenance", ar: "التشغيل والصيانة" },
        detail: {
          en: "Long-term operation with logged performance, consumables planning, and guaranteed output.",
          ar: "تشغيل طويل الأجل بسجلات أداء وخطط مستهلكات وضمان للناتج.",
        },
        steps: [
          { en: "Operator training and written SOPs", ar: "تدريب المشغلين وإجراءات تشغيل مكتوبة" },
          { en: "Scheduled membrane cleaning cycles", ar: "دورات تنظيف الأغشية المجدولة" },
          { en: "Monthly quality and output reporting", ar: "تقارير شهرية للجودة والإنتاج" },
        ],
      },
    ],
    equipment: [
      {
        category: { en: "Intake", ar: "المأخذ" },
        items: {
          en: "Wells, intake chambers, coarse & fine screens, raw water transfer pumps, flow metering",
          ar: "الآبار وغرف المأخذ والمصافي الخشنة والدقيقة ومضخات نقل المياه الخام وعدادات التدفق",
        },
      },
      {
        category: { en: "Treatment Train", ar: "خط المعالجة" },
        items: {
          en: "Clarifiers, multimedia & carbon filters, RO racks, dosing systems, CIP unit",
          ar: "المروبات ومرشحات الوسائط والكربون ومنظومات التناضح العكسي وأنظمة الجرعات ووحدة التنظيف",
        },
      },
      {
        category: { en: "Pumping Skids", ar: "وحدات الضخ" },
        items: {
          en: "High-pressure pumps, booster sets, VFD-driven distribution pumps, hydro-pneumatic vessels",
          ar: "مضخات الضغط العالي ومجموعات التعزيز ومضخات التوزيع بمحولات الترددات وأوعية الضغط",
        },
      },
      {
        category: { en: "SCADA & Controls", ar: "التحكم والسكادا" },
        items: {
          en: "PLC panels, MCC, instrumentation (pH, EC, turbidity, flow), HMI trending and alarms",
          ar: "لوحات PLC ولوحات MCC وأجهزة القياس (pH، الموصلية، العكارة، التدفق) وشاشات المتابعة والإنذارات",
        },
      },
      {
        category: { en: "O&M", ar: "التشغيل والصيانة" },
        items: {
          en: "Operator staffing, consumables supply, preventive maintenance, performance reporting",
          ar: "توفير المشغلين وتوريد المستهلكات والصيانة الوقائية وتقارير الأداء",
        },
      },
    ],
  },
  {
    slug: "wastewater",
    en: "Wastewater",
    ar: "الصرف الصحي",
    defEn:
      "Municipal and industrial effluent collection, biological and physico-chemical treatment, and compliant reuse.",
    defAr:
      "تجميع الصرف البلدي والصناعي ومعالجته حيويًا وفيزيوكيميائيًا وإعادة استخدامه بما يطابق الاشتراطات.",
    icon: "recycle",
    metric: { en: "Industrial & municipal loads", ar: "أحمال صناعية وبلدية" },
    intro: {
      en: "Industrial effluent rarely matches a standard design. We start from the actual load — COD, BOD, fats, oils and grease, shock loads, and discharge limits — then build the train that meets the permit: screening and grease removal, equalisation, extended aeration or MBBR, clarification, sludge handling, and disinfected reuse for irrigation or process cooling.",
      ar: "الصرف الصناعي نادرًا ما يطابق تصميمًا نمطيًا. نبدأ من الحمل الفعلي — الأكسجين الكيميائي والحيوي المستهلك والزيوت والشحوم والأحمال المفاجئة وحدود الصرف — ثم ننفذ الخط المطابق للتصريح: التصفية وإزالة الشحوم والموازنة والتهوية الممتدة أو MBBR والترسيب ومعالجة الحمأة وإعادة الاستخدام المطهر للري أو التبريد.",
    },
    process: [
      {
        key: "collection",
        name: { en: "Collection & Screening", ar: "التجميع والتصفية" },
        detail: {
          en: "Gravity and pressurised collection with mechanical screening and grit removal.",
          ar: "تجميع بالانحدار والضغط مع تصفية ميكانيكية وإزالة الرمال.",
        },
        steps: [
          { en: "Network and lift station design", ar: "تصميم الشبكة ومحطات الرفع" },
          { en: "Bar screens and grit chambers", ar: "المصافي القضيبية وغرف الرمال" },
          { en: "Grease traps for food-industry loads", ar: "مصائد الشحوم لأحمال الصناعات الغذائية" },
        ],
      },
      {
        key: "primary",
        name: { en: "Equalisation & Primary", ar: "الموازنة والمعالجة الأولية" },
        detail: {
          en: "Buffering shock loads so the biological stage sees a stable feed.",
          ar: "تهدئة الأحمال المفاجئة لتصل المرحلة الحيوية بتغذية مستقرة.",
        },
        steps: [
          { en: "Equalisation basin with mixing", ar: "حوض موازنة مع خلط" },
          { en: "DAF or primary sedimentation", ar: "التعويم بالهواء المذاب أو الترسيب الأولي" },
          { en: "pH and nutrient correction dosing", ar: "جرعات ضبط الحموضة والمغذيات" },
        ],
      },
      {
        key: "biological",
        name: { en: "Biological Treatment", ar: "المعالجة الحيوية" },
        detail: {
          en: "Extended aeration, MBBR, or SBR selected on load, footprint, and operator capacity.",
          ar: "التهوية الممتدة أو MBBR أو SBR بحسب الحمل والمساحة وقدرة التشغيل.",
        },
        steps: [
          { en: "Aeration blowers and diffuser grids", ar: "نافخات التهوية وشبكات الناشرات" },
          { en: "Biomass control and sludge age management", ar: "التحكم في الكتلة الحيوية وعمر الحمأة" },
          { en: "Secondary clarification and return sludge", ar: "الترسيب الثانوي وإرجاع الحمأة" },
        ],
      },
      {
        key: "tertiary",
        name: { en: "Tertiary & Reuse", ar: "المعالجة الثلاثية وإعادة الاستخدام" },
        detail: {
          en: "Polishing to reuse standards for irrigation, washdown, or cooling makeup.",
          ar: "تنقية نهائية لمستوى إعادة الاستخدام في الري أو الغسيل أو تعويض التبريد.",
        },
        steps: [
          { en: "Sand and disc filtration", ar: "الترشيح الرملي والقرصي" },
          { en: "Chlorination or UV disinfection", ar: "التطهير بالكلور أو الأشعة فوق البنفسجية" },
          { en: "Reuse storage and distribution", ar: "تخزين وتوزيع مياه إعادة الاستخدام" },
        ],
      },
      {
        key: "sludge",
        name: { en: "Sludge & Compliance", ar: "الحمأة والامتثال" },
        detail: {
          en: "Sludge dewatering, disposal routing, and the sampling record the authority asks for.",
          ar: "تجفيف الحمأة وتحديد مسار التخلص وسجل العينات المطلوب من الجهة الرقابية.",
        },
        steps: [
          { en: "Thickening and drying beds or filter press", ar: "التكثيف وأحواض التجفيف أو المكبس" },
          { en: "Effluent sampling and logbooks", ar: "أخذ عينات الصرف وسجلات التشغيل" },
          { en: "Discharge permit documentation", ar: "مستندات تصريح الصرف" },
        ],
      },
    ],
    equipment: [
      {
        category: { en: "Intake", ar: "المأخذ" },
        items: {
          en: "Lift stations, submersible pumps, bar screens, grit and grease removal",
          ar: "محطات الرفع والمضخات الغاطسة والمصافي وإزالة الرمال والشحوم",
        },
      },
      {
        category: { en: "Treatment Train", ar: "خط المعالجة" },
        items: {
          en: "Equalisation basins, DAF, aeration tanks, MBBR media, clarifiers, chlorine contact",
          ar: "أحواض الموازنة والتعويم وأحواض التهوية ووسائط MBBR والمروبات وحوض التلامس",
        },
      },
      {
        category: { en: "Pumping Skids", ar: "وحدات الضخ" },
        items: {
          en: "Return/waste sludge pumps, blowers, dosing pumps, reuse transfer sets",
          ar: "مضخات الحمأة الراجعة والزائدة والنافخات ومضخات الجرعات ومجموعات نقل مياه الاستخدام",
        },
      },
      {
        category: { en: "SCADA & Controls", ar: "التحكم والسكادا" },
        items: {
          en: "DO / pH / level instrumentation, blower VFD control, alarm and trend logging",
          ar: "قياس الأكسجين المذاب والحموضة والمناسيب، والتحكم في النافخات، وتسجيل الإنذارات",
        },
      },
      {
        category: { en: "O&M", ar: "التشغيل والصيانة" },
        items: {
          en: "Biology tuning, chemical supply, sludge disposal logistics, compliance reporting",
          ar: "ضبط الأحياء وتوريد الكيماويات ولوجستيات التخلص من الحمأة وتقارير الامتثال",
        },
      },
    ],
  },
  {
    slug: "pumping",
    en: "Pumping",
    ar: "الضخ",
    defEn:
      "Pump stations, boosters, and hydraulic systems sized to the real duty point — not to the nameplate.",
    defAr:
      "محطات الضخ ومعززات الضغط والأنظمة الهيدروليكية مصممة على نقطة التشغيل الفعلية لا على البيانات النظرية.",
    icon: "gauge",
    metric: { en: "22 stations delivered", ar: "22 محطة منفذة" },
    intro: {
      en: "A pump station lives or dies on its hydraulics. We model the system curve, size for the operating envelope rather than the peak on paper, and engineer against surge, cavitation, and dry-run. Civil chambers, manifolds, valve trains, VFD panels, and remote monitoring are delivered as one package, with witnessed performance testing before handover.",
      ar: "نجاح محطة الضخ يتحدد بهيدروليكيتها. نمذجنا لمنحنى النظام ونحدد المقاسات وفق نطاق التشغيل الفعلي لا القيمة القصوى الورقية، ونحصّن التصميم ضد الصدمات والتكهف والتشغيل الجاف. تُسلَّم الغرف المدنية والمجمعات ومجموعات المحابس ولوحات محولات الترددات والمراقبة عن بعد كحزمة واحدة، مع اختبارات أداء موثقة قبل التسليم.",
    },
    process: [
      {
        key: "hydraulics",
        name: { en: "Hydraulic Study", ar: "الدراسة الهيدروليكية" },
        detail: {
          en: "System curve, head loss, and duty point definition across the full operating range.",
          ar: "منحنى النظام وفواقد الضغط وتحديد نقطة التشغيل على كامل نطاق العمل.",
        },
        steps: [
          { en: "Topographic survey and static head", ar: "الرفع المساحي والضغط الاستاتيكي" },
          { en: "Friction and fitting loss calculation", ar: "حساب فواقد الاحتكاك والمركبات" },
          { en: "Surge and water-hammer analysis", ar: "تحليل الصدمات والمطرقة المائية" },
        ],
      },
      {
        key: "selection",
        name: { en: "Equipment Selection", ar: "اختيار المعدات" },
        detail: {
          en: "Pump, motor, and drive selection with efficiency and NPSH margin held explicitly.",
          ar: "اختيار المضخة والمحرك والقيادة مع هوامش صريحة للكفاءة والضغط الشفطي المتاح.",
        },
        steps: [
          { en: "Pump curve matching and staging", ar: "مطابقة منحنى المضخة وترتيب المراحل" },
          { en: "NPSH margin and cavitation check", ar: "هامش الشفط وفحص التكهف" },
          { en: "Motor, VFD, and standby duty split", ar: "المحرك ومحول الترددات وتوزيع الاحتياطي" },
        ],
      },
      {
        key: "build",
        name: { en: "Station Construction", ar: "إنشاء المحطة" },
        detail: {
          en: "Civil chamber, mechanical manifold, and valve train fabricated and installed in-house.",
          ar: "الغرفة المدنية والمجمع الميكانيكي ومجموعة المحابس بالتصنيع والتركيب الذاتي.",
        },
        steps: [
          { en: "Wet well / dry chamber civil works", ar: "الأعمال المدنية للبئر الرطب والغرفة الجافة" },
          { en: "Manifold fabrication and alignment", ar: "تصنيع المجمعات وضبط الاستقامة" },
          { en: "Valves, NRVs, and pressure protection", ar: "المحابس ومنع الرجوع وحماية الضغط" },
        ],
      },
      {
        key: "testing",
        name: { en: "Testing & Commissioning", ar: "الاختبار والتشغيل التجريبي" },
        detail: {
          en: "Pressure testing, witnessed performance runs, and vibration baselines.",
          ar: "اختبارات الضغط وتجارب الأداء الموثقة وقياسات الاهتزاز المرجعية.",
        },
        steps: [
          { en: "Hydrostatic pressure test of lines", ar: "اختبار الضغط الهيدروستاتيكي للخطوط" },
          { en: "Flow / head verification against curve", ar: "التحقق من التدفق والضغط مقابل المنحنى" },
          { en: "Vibration and temperature baseline", ar: "قياس مرجعي للاهتزاز والحرارة" },
        ],
      },
      {
        key: "om",
        name: { en: "Operation & Monitoring", ar: "التشغيل والمراقبة" },
        detail: {
          en: "Remote monitoring, spare strategy, and preventive maintenance intervals.",
          ar: "مراقبة عن بعد واستراتيجية قطع غيار وفترات صيانة وقائية.",
        },
        steps: [
          { en: "Telemetry and alarm escalation", ar: "القياس عن بعد وتصعيد الإنذارات" },
          { en: "Critical spares held on site", ar: "قطع الغيار الحرجة متاحة بالموقع" },
          { en: "Bearing and seal replacement plan", ar: "خطة استبدال الكراسي والحلقات المانعة" },
        ],
      },
    ],
    equipment: [
      {
        category: { en: "Intake", ar: "المأخذ" },
        items: {
          en: "Wet wells, suction manifolds, foot valves, strainers, level instrumentation",
          ar: "الآبار الرطبة ومجمعات السحب ومحابس القدم والمصافي وأجهزة قياس المنسوب",
        },
      },
      {
        category: { en: "Treatment Train", ar: "خط المعالجة" },
        items: {
          en: "Inline filtration, air release, sediment separation upstream of pumps",
          ar: "الترشيح الخطي وتصريف الهواء وفصل الرواسب قبل المضخات",
        },
      },
      {
        category: { en: "Pumping Skids", ar: "وحدات الضخ" },
        items: {
          en: "Horizontal / vertical multistage pumps, submersibles, boosters, surge vessels",
          ar: "مضخات أفقية ورأسية متعددة المراحل وغاطسة ومعززة وأوعية الصدمات",
        },
      },
      {
        category: { en: "SCADA & Controls", ar: "التحكم والسكادا" },
        items: {
          en: "VFD panels, soft starters, dry-run protection, pressure transmitters, telemetry",
          ar: "لوحات محولات الترددات وبادئات ناعمة وحماية التشغيل الجاف وناقلات الضغط والقياس عن بعد",
        },
      },
      {
        category: { en: "O&M", ar: "التشغيل والصيانة" },
        items: {
          en: "Vibration monitoring, alignment checks, seal and bearing programme, standby rotation",
          ar: "مراقبة الاهتزاز وفحص الاستقامة وبرنامج الحلقات والكراسي وتبديل الاحتياطي",
        },
      },
    ],
  },
  {
    slug: "irrigation",
    en: "Irrigation",
    ar: "الري",
    defEn:
      "Agricultural irrigation networks, filtration, and field distribution for reclamation-scale farmland.",
    defAr:
      "شبكات الري الزراعي والترشيح والتوزيع الحقلي لمشروعات الاستصلاح واسعة النطاق.",
    icon: "sprout",
    metric: { en: "Desert reclamation duty", ar: "أعمال استصلاح صحراوي" },
    intro: {
      en: "Reclamation projects fail on uniformity, not on flow. We design head-control stations, filtration matched to the water source, and mainline hydraulics that hold emitter pressure across the block. Fertigation, automation, and flushing regimes are built in so the network stays clean through a full season.",
      ar: "مشروعات الاستصلاح تفشل بسبب انتظام التوزيع لا بسبب التدفق. نصمم محطات التحكم الرئيسية والترشيح المطابق لمصدر المياه والهيدروليكا الرئيسية التي تحفظ ضغط النقاطات على كامل القطاع. ويُدمج التسميد والتشغيل الآلي وبرامج الغسيل ليبقى النظام نظيفًا طوال الموسم.",
    },
    process: [
      {
        key: "survey",
        name: { en: "Survey & Water Source", ar: "الرفع المساحي ومصدر المياه" },
        detail: {
          en: "Topography, soil, crop water demand, and source quality define the network.",
          ar: "الطبوغرافيا والتربة والاحتياج المائي للمحصول وجودة المصدر هي محددات الشبكة.",
        },
        steps: [
          { en: "Topographic and soil survey", ar: "الرفع المساحي وفحص التربة" },
          { en: "Crop water requirement calculation", ar: "حساب الاحتياج المائي للمحصول" },
          { en: "Source yield and quality testing", ar: "اختبار غزارة المصدر وجودته" },
        ],
      },
      {
        key: "headstation",
        name: { en: "Head Control Station", ar: "محطة التحكم الرئيسية" },
        detail: {
          en: "Pumping, filtration, and fertigation assembled as one controlled node.",
          ar: "الضخ والترشيح والتسميد في وحدة تحكم واحدة.",
        },
        steps: [
          { en: "Sand separators and media filters", ar: "فواصل الرمال ومرشحات الوسائط" },
          { en: "Automatic backflush controller", ar: "متحكم الغسيل العكسي الآلي" },
          { en: "Fertigation dosing and mixing", ar: "جرعات التسميد والخلط" },
        ],
      },
      {
        key: "network",
        name: { en: "Mainline & Submains", ar: "الخطوط الرئيسية والفرعية" },
        detail: {
          en: "Pipe sizing and zoning that keep pressure variation inside emitter tolerance.",
          ar: "تحديد أقطار المواسير وتقسيم القطاعات بما يحفظ تغير الضغط داخل حدود النقاطات.",
        },
        steps: [
          { en: "HDPE / PVC mainline installation", ar: "تركيب الخطوط الرئيسية HDPE و PVC" },
          { en: "Zone valves and pressure regulation", ar: "محابس القطاعات وتنظيم الضغط" },
          { en: "Air valves and flushing points", ar: "محابس الهواء ونقاط الغسيل" },
        ],
      },
      {
        key: "field",
        name: { en: "Field Distribution", ar: "التوزيع الحقلي" },
        detail: {
          en: "Drip or pivot layout verified by measured uniformity in the field.",
          ar: "تخطيط التنقيط أو المحاور مع التحقق من انتظام التوزيع بالقياس الحقلي.",
        },
        steps: [
          { en: "Dripline / sprinkler layout", ar: "تخطيط خطوط التنقيط والرشاشات" },
          { en: "Emitter uniformity field test", ar: "اختبار انتظام النقاطات بالحقل" },
          { en: "Block scheduling and automation", ar: "برمجة القطاعات والتشغيل الآلي" },
        ],
      },
      {
        key: "om",
        name: { en: "Season Support", ar: "الدعم الموسمي" },
        detail: {
          en: "Flushing, chemical cleaning, and pressure audits through the growing season.",
          ar: "الغسيل والتنظيف الكيميائي ومراجعات الضغط خلال الموسم الزراعي.",
        },
        steps: [
          { en: "Scheduled line flushing", ar: "غسيل الخطوط المجدول" },
          { en: "Acid / chlorine shock treatment", ar: "المعالجة الصدمية بالحمض أو الكلور" },
          { en: "Pressure and uniformity re-audit", ar: "إعادة مراجعة الضغط والانتظام" },
        ],
      },
    ],
    equipment: [
      {
        category: { en: "Intake", ar: "المأخذ" },
        items: {
          en: "Wells, canal intakes, suction screens, sand separators",
          ar: "الآبار ومآخذ الترع ومصافي السحب وفواصل الرمال",
        },
      },
      {
        category: { en: "Treatment Train", ar: "خط المعالجة" },
        items: {
          en: "Media filters, disc/screen filters, automatic backflush, fertigation units",
          ar: "مرشحات الوسائط والمرشحات القرصية والغسيل العكسي الآلي ووحدات التسميد",
        },
      },
      {
        category: { en: "Pumping Skids", ar: "وحدات الضخ" },
        items: {
          en: "Booster sets, VFD-controlled irrigation pumps, pressure-sustaining valves",
          ar: "مجموعات التعزيز ومضخات الري بمحولات الترددات ومحابس تثبيت الضغط",
        },
      },
      {
        category: { en: "SCADA & Controls", ar: "التحكم والسكادا" },
        items: {
          en: "Irrigation controllers, solenoid zone valves, flow and pressure sensors",
          ar: "متحكمات الري ومحابس القطاعات الكهرومغناطيسية وحساسات التدفق والضغط",
        },
      },
      {
        category: { en: "O&M", ar: "التشغيل والصيانة" },
        items: {
          en: "Seasonal flushing, filter servicing, emitter replacement, agronomy coordination",
          ar: "الغسيل الموسمي وصيانة المرشحات واستبدال النقاطات والتنسيق الزراعي",
        },
      },
    ],
  },
  {
    slug: "electrical-control",
    en: "Electrical & Control",
    ar: "الكهرباء والتحكم",
    defEn:
      "Power distribution, MCC and VFD panels, PLC logic, and SCADA supervision built for plant reality.",
    defAr:
      "توزيع الكهرباء ولوحات MCC ومحولات الترددات وبرمجة PLC وإشراف SCADA مصممة لواقع المحطة.",
    icon: "zap",
    metric: { en: "PLC & SCADA in-house", ar: "برمجة PLC وSCADA داخليًا" },
    intro: {
      en: "Electrical and control work is where turnkey promises usually break. We build our own panels, write our own PLC logic, and commission against a written interlock matrix — so the plant protects itself when a pump fails, a level trips, or a phase drops. Every plant hands over with as-built drawings, an I/O list, and a trend-capable HMI.",
      ar: "أعمال الكهرباء والتحكم هي المرحلة التي تنكسر فيها وعود التسليم المتكامل عادة. نصنع لوحاتنا ونبرمج PLC بأنفسنا ونشغل وفق مصفوفة تعاشق مكتوبة — لتحمي المحطة نفسها عند تعطل مضخة أو تجاوز منسوب أو فقد طور. ويُسلَّم كل مشروع برسومات تنفيذية فعلية وقائمة مداخل ومخارج وشاشة تحكم قادرة على تسجيل الاتجاهات.",
    },
    process: [
      {
        key: "power",
        name: { en: "Power & Distribution", ar: "القدرة والتوزيع" },
        detail: {
          en: "Load schedule, cable sizing, protection coordination, and earthing design.",
          ar: "جدول الأحمال ومقاسات الكابلات وتنسيق الحماية وتصميم التأريض.",
        },
        steps: [
          { en: "Load schedule and diversity study", ar: "جدول الأحمال ودراسة التنوع" },
          { en: "LV distribution and protection settings", ar: "توزيع الجهد المنخفض وضبط الحماية" },
          { en: "Earthing and lightning protection", ar: "التأريض والحماية من الصواعق" },
        ],
      },
      {
        key: "panels",
        name: { en: "Panel Fabrication", ar: "تصنيع اللوحات" },
        detail: {
          en: "MCC and VFD panels assembled, wire-numbered, and factory-tested in our workshop.",
          ar: "تجميع لوحات MCC ومحولات الترددات وترقيم الأسلاك واختبارها بالورشة.",
        },
        steps: [
          { en: "MCC and starter panel assembly", ar: "تجميع لوحات MCC والبادئات" },
          { en: "VFD integration and harmonics check", ar: "دمج محولات الترددات وفحص التوافقيات" },
          { en: "Factory acceptance testing", ar: "اختبار القبول بالمصنع" },
        ],
      },
      {
        key: "automation",
        name: { en: "PLC & Interlocks", ar: "البرمجة والتعاشق" },
        detail: {
          en: "Control logic written against an explicit interlock and alarm matrix.",
          ar: "منطق التحكم مكتوب وفق مصفوفة تعاشق وإنذارات صريحة.",
        },
        steps: [
          { en: "I/O list and interlock matrix", ar: "قائمة المداخل والمخارج ومصفوفة التعاشق" },
          { en: "PLC programming and simulation", ar: "برمجة PLC والمحاكاة" },
          { en: "Dry-run, level, and phase protection", ar: "حماية التشغيل الجاف والمنسوب والأطوار" },
        ],
      },
      {
        key: "scada",
        name: { en: "SCADA & Instrumentation", ar: "السكادا وأجهزة القياس" },
        detail: {
          en: "Field instruments, HMI screens, and historical trending operators actually use.",
          ar: "أجهزة القياس الحقلية وشاشات التحكم وسجلات الاتجاه التي يستخدمها المشغل فعليًا.",
        },
        steps: [
          { en: "Flow, pressure, level, quality sensors", ar: "حساسات التدفق والضغط والمنسوب والجودة" },
          { en: "HMI screen design and alarm priorities", ar: "تصميم الشاشات وأولويات الإنذارات" },
          { en: "Remote access and telemetry", ar: "الوصول عن بعد والقياس عن بعد" },
        ],
      },
      {
        key: "handover",
        name: { en: "Documentation & Handover", ar: "التوثيق والتسليم" },
        detail: {
          en: "As-built drawings, test sheets, and operator training closing the contract.",
          ar: "رسومات تنفيذية فعلية وكشوف اختبار وتدريب المشغلين لإغلاق العقد.",
        },
        steps: [
          { en: "As-built single-line diagrams", ar: "مخططات الخط الواحد التنفيذية" },
          { en: "Loop and functional test records", ar: "سجلات اختبار الحلقات والوظائف" },
          { en: "Operator control-room training", ar: "تدريب المشغلين بغرفة التحكم" },
        ],
      },
    ],
    equipment: [
      {
        category: { en: "Intake", ar: "المأخذ" },
        items: {
          en: "Incoming feeder, transformer interface, changeover and generator sync",
          ar: "التغذية الرئيسية وواجهة المحول ومفاتيح التحويل ومزامنة المولد",
        },
      },
      {
        category: { en: "Treatment Train", ar: "خط المعالجة" },
        items: {
          en: "Dosing control loops, analyser integration, automatic filter backwash sequencing",
          ar: "حلقات التحكم في الجرعات ودمج المحللات وتتابع الغسيل العكسي الآلي",
        },
      },
      {
        category: { en: "Pumping Skids", ar: "وحادت الضخ" },
        items: {
          en: "VFD control, duty/standby rotation logic, pressure-based cascade control",
          ar: "التحكم بمحولات الترددات ومنطق تبديل التشغيل والاحتياطي والتحكم التتابعي بالضغط",
        },
      },
      {
        category: { en: "SCADA & Controls", ar: "التحكم والسكادا" },
        items: {
          en: "PLC racks, HMI, historian trending, alarm annunciation, remote telemetry",
          ar: "وحدات PLC وشاشات التحكم وتسجيل الاتجاهات وإعلان الإنذارات والقياس عن بعد",
        },
      },
      {
        category: { en: "O&M", ar: "التشغيل والصيانة" },
        items: {
          en: "Thermographic panel inspection, firmware/backup custody, spare card stock",
          ar: "الفحص الحراري للوحات وحفظ النسخ الاحتياطية للبرامج ومخزون كروت الاحتياطي",
        },
      },
    ],
  },
];

export const SCOPE_STEPS = [
  { en: "Design", ar: "التصميم" },
  { en: "Supply", ar: "التوريد" },
  { en: "Install", ar: "التنفيذ" },
  { en: "Test", ar: "الاختبار والتشغيل" },
  { en: "O&M", ar: "التشغيل والصيانة" },
];

export function getSector(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
