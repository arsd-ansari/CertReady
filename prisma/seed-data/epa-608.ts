/**
 * EPA Section 608 Technician Certification — CertReady practice content.
 *
 * All questions are original practice material written to cover the topics EPA-approved
 * certifying organizations test. They are NOT actual exam questions.
 */

import { moreEpa608Questions } from "./epa-608-more";

export type SeedOption = { label: string; text: string; correct?: boolean };
export type SeedQuestion = {
  category: string; // ExamCategory slug
  prompt: string;
  options: SeedOption[];
  explanation: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  isFree?: boolean;
  tags?: string[];
  source?: string; // SourceReference key
  sourceNote?: string;
};

export type SeedCategory = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  weight: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type SeedSource = { key: string; title: string; publisher: string; url?: string; note?: string };

export type SeedExam = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  overview: string;
  whoShouldTake: string;
  requirements: string;
  studyGuide: string;
  faq: { question: string; answer: string }[];
  officialResources: { label: string; url: string; description?: string }[];
  certifyingBody: string;
  categorySlug: string; // CertificationCategory slug
  scope: "FEDERAL" | "STATE" | "NATIONAL_PRIVATE";
  states: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  isFeatured: boolean;
  realQuestionCount?: number;
  realTimeMinutes?: number;
  passingScoreText?: string;
  mockQuestionCount: number;
  mockTimeMinutes: number;
  freeQuestionLimit: number;
  seoTitle: string;
  seoDescription: string;
  categories: SeedCategory[];
  sources: SeedSource[];
  questions: SeedQuestion[];
};

const sources: SeedSource[] = [
  {
    key: "epa-608-overview",
    title: "Section 608 Technician Certification",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/section608/section-608-technician-certification-0",
  },
  {
    key: "40-cfr-82-f",
    title: "40 CFR Part 82, Subpart F — Recycling and Emissions Reduction",
    publisher: "U.S. Government Publishing Office (eCFR)",
    url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F",
  },
  {
    key: "epa-leak-repair",
    title: "Stationary Refrigeration Leak Repair Requirements",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/section608/stationary-refrigeration-leak-repair-requirements",
  },
  {
    key: "epa-evacuation",
    title: "Refrigerant Evacuation Requirements (Section 608)",
    publisher: "U.S. Environmental Protection Agency",
    url: "https://www.epa.gov/section608/section-608-technician-certification-requirements",
  },
];

const categories: SeedCategory[] = [
  {
    slug: "core",
    name: "Core",
    description: "Ozone depletion, the Clean Air Act, the Three Rs, safety, shipping and the venting rule. Required for every certification type.",
    longDescription: `The Core section is taken by everyone who sits any EPA 608 type. It is 25 questions; you need **18 correct (72%)**.

Topics that show up every sitting:

- Stratospheric ozone, chlorine, ODP vs GWP, CFCs / HCFCs / HFCs / HFOs
- Montreal Protocol and Clean Air Act Section 608
- Recover, recycle, reclaim (AHRI 700 before a change of ownership)
- Venting prohibition (July 1, 1992 for CFC/HCFC; November 15, 1995 for HFCs) and de minimis releases
- Sales restriction, fines, and losing your card
- Gray/yellow recovery cylinders, 80% fill, DOT labels, never refill disposables
- Nitrogen only for leak-test pressure — never oxygen or compressed air
- POE oil, moisture, evacuation/dehydration, P/T charts and non-condensables

Drill Core until you can recite the dates and the 80% cylinder rule without notes, then add a type.`,
    weight: 25,
    seoTitle: "EPA 608 Core Practice Test — Free Questions & Explanations",
    seoDescription:
      "Practice the EPA 608 Core section: ozone depletion, Clean Air Act rules, recovery cylinders, shipping, safety and the venting prohibition. Original questions with explanations.",
  },
  {
    slug: "type-1",
    name: "Type I — Small Appliances",
    description: "Systems factory-charged with 5 lb or less of refrigerant: recovery levels, piercing valves and passive recovery.",
    longDescription: `Type I is **small appliances only**: factory-manufactured, factory-charged, hermetically sealed, **5 lb or less**. Household refrigerators, window units, dehumidifiers, water coolers and vending machines.

Not Type I: any field-charged split or rooftop, even under 5 lb. That is [Type II](/exams/epa-608/type-2).

Numbers to lock in:

- Working compressor → recover **90%** or **4 in. Hg**
- Dead compressor → recover **80%** or **4 in. Hg**
- Passive recovery → **15 lb or less**
- Certified recovery equipment after **November 15, 1993**

Read [Type 1 vs Type 2](/exams/epa-608/guides/type-1-vs-type-2) if you are choosing sections.`,
    weight: 25,
    seoTitle: "EPA 608 Type I Practice Test — Small Appliance Questions",
    seoDescription:
      "Free EPA 608 Type I practice questions on small appliance recovery: 80% / 90% recovery, 4 in. Hg vacuum, piercing valves and passive recovery devices.",
  },
  {
    slug: "type-2",
    name: "Type II — High-Pressure Appliances",
    description: "Split systems, rooftop units and supermarket racks: leak-rate thresholds, evacuation levels and recovery technique.",
    longDescription: `Type II is residential and commercial HVAC/R that is **not** a small appliance and **not** a low-pressure chiller: splits, packaged rooftops, walk-ins, racks, and very-high-pressure industrial refrigerants (R-13, R-23, R-503).

The leak-repair program (40 CFR 82.157) applies at **50 lb or more**:

| End use | Annual leak-rate threshold |
| --- | --- |
| Comfort cooling | **10%** |
| Commercial refrigeration | **20%** |
| Industrial process refrigeration | **30%** |

Also memorize the post-1993 evacuation table (0 / 10 / 15 in. Hg by refrigerant and charge) and recover liquid before vapor. Compare types in the [Type 1 vs Type 2 guide](/exams/epa-608/guides/type-1-vs-type-2).`,
    weight: 25,
    seoTitle: "EPA 608 Type II Practice Test — High-Pressure System Questions",
    seoDescription:
      "Practice EPA 608 Type II: leak repair thresholds, evacuation levels for high-pressure appliances, nitrogen testing, recovery procedures and refrigerant blends.",
  },
  {
    slug: "type-3",
    name: "Type III — Low-Pressure Appliances",
    description: "Centrifugal chillers using R-11 and R-123: vacuum operation, purge units, rupture discs and the 25 mm Hg evacuation level.",
    longDescription: `Type III is **low-pressure appliances** — almost always centrifugal chillers using R-11, R-113 or R-123. The low side runs in a vacuum, so leaks draw **air in**. A purge unit that never shuts up is a leak.

Numbers that decide the section:

- Leak test: stay at or below **10 psig**
- Rupture disc: **15 psig**
- Major repair evacuation (equipment after November 15, 1993): **25 mm Hg absolute**
- Charge **vapor first** until you are above freezing, then liquid — frozen evaporator tubes are the classic fail

Type III does not cover split systems. See [Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2).`,
    weight: 25,
    seoTitle: "EPA 608 Type III Practice Test — Low-Pressure Chiller Questions",
    seoDescription:
      "Free EPA 608 Type III practice questions on low-pressure chillers: vacuum operation, purge units, rupture discs, evacuation to 25 mm Hg and safe charging.",
  },
];

const C = "core";
const T1 = "type-1";
const T2 = "type-2";
const T3 = "type-3";

const q = (
  category: string,
  prompt: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
  extra: Partial<Omit<SeedQuestion, "category" | "prompt" | "options" | "explanation">> = {},
): SeedQuestion => ({
  category,
  prompt,
  options: options.map((text, i) => ({ label: "ABCD"[i], text, correct: i === correctIndex })),
  explanation,
  difficulty: "MEDIUM",
  isFree: true,
  ...extra,
});

const questions: SeedQuestion[] = [
  // ------------------------------------------------------------------ CORE
  q(
    C,
    "Stratospheric ozone is important because it:",
    [
      "Traps heat near the Earth's surface",
      "Absorbs harmful ultraviolet radiation from the sun",
      "Reacts with refrigerants to make them safe",
      "Is a byproduct of refrigeration",
    ],
    1,
    "The ozone layer in the stratosphere filters most of the sun's UV-B radiation. Less ozone means more UV reaching the ground, which increases skin cancer, cataracts and crop damage. Heat trapping is a greenhouse (climate) effect, a separate issue.",
    { difficulty: "EASY", tags: ["ozone"], source: "epa-608-overview" },
  ),
  q(
    C,
    "Which element in CFC and HCFC refrigerants is responsible for destroying stratospheric ozone?",
    ["Fluorine", "Hydrogen", "Chlorine", "Carbon"],
    2,
    "When a CFC molecule reaches the stratosphere, UV light breaks off a chlorine atom. That chlorine atom destroys ozone molecules and is regenerated, so one atom can destroy thousands of ozone molecules. Fluorine does not participate in ozone destruction.",
    { difficulty: "EASY", tags: ["ozone"] },
  ),
  q(
    C,
    "Rank these refrigerants from highest to lowest ozone depletion potential (ODP).",
    ["R-134a, R-22, R-12", "R-12, R-22, R-134a", "R-22, R-134a, R-12", "R-12, R-134a, R-22"],
    1,
    "CFCs such as R-12 have the highest ODP. HCFCs such as R-22 contain hydrogen, which makes them break down lower in the atmosphere, so fewer molecules reach the stratosphere. HFCs such as R-134a contain no chlorine and have an ODP of zero.",
    { tags: ["ozone", "refrigerants"] },
  ),
  q(
    C,
    "The Montreal Protocol is:",
    [
      "A U.S. law that created technician certification",
      "An international treaty to phase out ozone-depleting substances",
      "A DOT standard for refrigerant cylinders",
      "An ASHRAE safety standard for machinery rooms",
    ],
    1,
    "The Montreal Protocol (1987) is the international agreement under which countries phased out production of CFCs, HCFCs and other ozone-depleting substances. The United States implements it domestically through the Clean Air Act.",
    { difficulty: "EASY", tags: ["regulations"] },
  ),
  q(
    C,
    "Under Clean Air Act Section 608, the intentional venting of CFC and HCFC refrigerant during service, maintenance, repair or disposal has been prohibited since:",
    ["November 15, 1995", "July 1, 1992", "January 1, 2010", "November 14, 1994"],
    1,
    "The venting prohibition for CFCs and HCFCs took effect July 1, 1992. The prohibition was extended to HFC substitutes such as R-134a on November 15, 1995. November 14, 1994 is the date by which technicians had to be certified.",
    { tags: ["regulations", "dates"], source: "40-cfr-82-f" },
  ),
  q(
    C,
    "Which of the following releases is NOT considered a violation of the venting prohibition?",
    [
      "Releasing the charge of an old refrigerator into the alley before disposal",
      "Purging a hose into the atmosphere to save time",
      "De minimis releases that occur while making a good-faith attempt to recover refrigerant",
      "Venting a small appliance because it holds less than five pounds",
    ],
    2,
    "EPA allows de minimis (very small) releases that happen while a technician is making a good-faith effort to recover, recycle or safely dispose of refrigerant — for example the small amount released when disconnecting a hose. Intentional venting of any amount from any size appliance is a violation.",
    { tags: ["regulations"], source: "40-cfr-82-f" },
  ),
  q(
    C,
    "Refrigerant that has been recovered from a system and then cleaned with oil separation and one or more passes through filter-driers has been:",
    ["Reclaimed", "Recycled", "Rejuvenated", "Reprocessed"],
    1,
    "Recycling means cleaning refrigerant for reuse by oil separation and filtration, typically on-site, and it may only go back into equipment owned by the same person. Reclaiming means reprocessing refrigerant to the AHRI 700 purity standard and verifying it with chemical analysis, which is required before refrigerant can be sold to a new owner.",
    { tags: ["three-rs"] },
  ),
  q(
    C,
    "Before recovered refrigerant can be sold to a different owner it must be:",
    [
      "Recycled with a filter-drier",
      "Reclaimed to AHRI Standard 700 purity by an EPA-certified reclaimer",
      "Labeled with the original equipment serial number",
      "Stored for at least 30 days",
    ],
    1,
    "Only refrigerant that has been reclaimed to AHRI 700 purity and chemically verified can change ownership. Recycled refrigerant may be reused only in equipment belonging to the same owner.",
    { tags: ["three-rs"], source: "40-cfr-82-f" },
  ),
  q(
    C,
    "Refrigerant recovery cylinders are identified by which color scheme?",
    [
      "Solid white",
      "Gray body with a yellow top",
      "Green body with a white top",
      "Solid orange",
    ],
    1,
    "DOT-approved refrigerant recovery cylinders are painted gray with a yellow top (shoulder). Disposable (single-trip) cylinders that new refrigerant ships in must never be refilled or used for recovery.",
    { difficulty: "EASY", tags: ["cylinders", "shipping"] },
  ),
  q(
    C,
    "A recovery cylinder should never be filled beyond what percentage of its capacity by weight?",
    ["50%", "60%", "80%", "95%"],
    2,
    "Recovery cylinders must be filled to no more than 80% of their rated capacity by weight so that liquid refrigerant has room to expand as temperature rises. Overfilling can cause hydrostatic pressure and rupture. Use a scale, and never guess by cylinder pressure.",
    { tags: ["cylinders", "safety"] },
  ),
  q(
    C,
    "Which gas is the only one acceptable for pressurizing a system to test for leaks?",
    ["Oxygen", "Compressed air", "Dry nitrogen", "Acetylene"],
    2,
    "Dry nitrogen is inert and moisture-free. Oxygen or compressed air can react explosively with refrigerant oil under pressure and add moisture to the system. Always regulate nitrogen and use a pressure relief valve on the regulator.",
    { difficulty: "EASY", tags: ["safety", "leak-testing"] },
  ),
  q(
    C,
    "A technician who needs to speed up recovery from a cylinder should:",
    [
      "Heat the cylinder with a torch",
      "Warm the cylinder in a tub of warm water or with a heating blanket, never with an open flame",
      "Add a small amount of oxygen to raise pressure",
      "Lay the cylinder on its side and shake it",
    ],
    1,
    "Never apply an open flame to a refrigerant cylinder — the pressure rise can cause rupture, and burning refrigerant produces toxic gases. Gentle heat from warm water or a heating blanket is acceptable.",
    { tags: ["safety", "cylinders"] },
  ),
  q(
    C,
    "Moisture inside a refrigeration system is a problem because it:",
    [
      "Increases the refrigerant's ODP",
      "Combines with refrigerant and oil to form acids and can freeze at the metering device",
      "Reduces the oil's viscosity permanently",
      "Causes the compressor to run too cold",
    ],
    1,
    "Water reacts with refrigerant and oil to form acids that attack motor windings and metal, and it can freeze at the expansion device and block flow. That is why systems are evacuated (dehydrated) to a deep vacuum before charging.",
    { tags: ["evacuation", "contaminants"] },
  ),
  q(
    C,
    "Which oil is normally used with HFC refrigerants such as R-134a and R-410A?",
    ["Mineral oil", "Alkylbenzene", "Polyol ester (POE)", "Vegetable oil"],
    2,
    "HFC refrigerants do not mix well with mineral oil, so POE (polyol ester) oil is used. POE is hygroscopic — it absorbs moisture quickly — so keep containers sealed and minimize the time a system is open.",
    { tags: ["oil", "refrigerants"] },
  ),
  q(
    C,
    "A ternary (three-component) refrigerant blend such as R-404A must be charged into a system as:",
    ["Vapor only", "Liquid, so the blend does not fractionate", "Either vapor or liquid, it makes no difference", "Vapor after the compressor has started"],
    1,
    "Zeotropic blends have components with different boiling points. If charged as vapor from the cylinder, the more volatile components leave first and the composition changes (fractionation). Charging as liquid — metered carefully into the suction side — preserves the blend ratio.",
    { tags: ["blends", "charging"] },
  ),
  q(
    C,
    "Under Section 608, refrigerant sales are restricted so that regulated refrigerants may be sold only to:",
    [
      "Anyone over 18 years of age",
      "EPA-certified technicians or businesses that employ them",
      "Licensed electricians",
      "Wholesale distributors with a DOT permit",
    ],
    1,
    "The sales restriction limits the sale of ozone-depleting refrigerants (and, since 2018, most HFC refrigerants) to Section 608 certified technicians. Small cans of MVAC refrigerant with self-sealing valves are an exception governed by separate rules.",
    { tags: ["regulations"], source: "epa-608-overview" },
  ),
  q(
    C,
    "When a refrigerant cylinder is shipped, the DOT requires it to be:",
    [
      "Filled to 100% to avoid movement",
      "Labeled with the refrigerant name and marked with the proper DOT classification and hazard label",
      "Painted the same color as the refrigerant's original disposable cylinder",
      "Shipped only by air",
    ],
    1,
    "Department of Transportation rules require recovery cylinders to be DOT-approved, within their hydrostatic test date, filled no more than 80%, and labeled with the refrigerant contents and the appropriate hazard class (Class 2.2, non-flammable gas, for most refrigerants).",
    { tags: ["shipping"], isFree: false },
  ),
  q(
    C,
    "Using a Pressure–Temperature (P/T) chart, a technician can determine the refrigerant's saturation temperature from its pressure. This is useful for:",
    [
      "Calculating the ODP of a blend",
      "Checking for non-condensables and measuring superheat and subcooling",
      "Setting the recovery cylinder fill level",
      "Deciding which DOT label to apply",
    ],
    1,
    "At saturation, each pressure corresponds to one temperature. If a cylinder or idle system reads higher pressure than the P/T chart predicts for its temperature, non-condensables such as air are present. The same chart is used to compute superheat and subcooling during service.",
    { difficulty: "HARD", tags: ["pt-chart"], isFree: false },
  ),
  q(
    C,
    "Refrigerant exposure in a confined machinery room can cause:",
    [
      "Skin bleaching only",
      "Oxygen deprivation, dizziness and heart irregularities",
      "Increased alertness",
      "No health effects because refrigerants are non-toxic",
    ],
    1,
    "Most refrigerants are heavier than air and displace oxygen in low or enclosed spaces. Inhalation can cause dizziness, loss of coordination and cardiac arrhythmia. ASHRAE 15 requires oxygen-deprivation sensors and ventilation in equipment rooms.",
    { tags: ["safety"], isFree: false },
  ),
  q(
    C,
    "Which certification allows a technician to work on small appliances, high-pressure appliances AND low-pressure appliances?",
    ["Type I", "Type II", "Type III", "Universal"],
    3,
    "Universal certification is awarded when a technician passes Core plus all three type sections (I, II and III). Each type alone covers only its own equipment class.",
    { difficulty: "EASY", tags: ["certification"], source: "epa-608-overview" },
  ),

  // ---------------------------------------------------------------- TYPE I
  q(
    T1,
    "A small appliance, for EPA purposes, is any appliance that is fully manufactured, charged and hermetically sealed in a factory with:",
    ["Less than 50 pounds of refrigerant", "Five pounds or less of refrigerant", "Less than 10 pounds of refrigerant", "Any amount of refrigerant, if it plugs into a wall outlet"],
    1,
    "The definition is precise: factory-charged, hermetically sealed, and five pounds or less of refrigerant. Examples include refrigerators, freezers, room air conditioners, dehumidifiers, water coolers and vending machines.",
    { difficulty: "EASY", tags: ["definitions"], source: "40-cfr-82-f" },
  ),
  q(
    T1,
    "When recovering refrigerant from a small appliance whose compressor is operating, the technician must recover at least:",
    ["50% of the charge", "80% of the charge", "90% of the charge", "100% of the charge"],
    2,
    "With a working compressor you must recover 90% of the refrigerant, or evacuate to 4 in. Hg vacuum. If the compressor is not operating, the requirement drops to 80% (or 4 in. Hg). The compressor helps push refrigerant out, so more is expected when it runs.",
    { tags: ["recovery-levels"], source: "epa-evacuation" },
  ),
  q(
    T1,
    "A small appliance's compressor is burned out and will not run. Using a self-contained recovery device, the technician must recover at least:",
    ["60%", "80%", "90%", "95%"],
    1,
    "For a non-operating compressor the recovery requirement is 80% of the charge, or evacuation to 4 in. Hg vacuum. Because the compressor cannot help move refrigerant, EPA allows the lower percentage.",
    { tags: ["recovery-levels"], source: "epa-evacuation" },
  ),
  q(
    T1,
    "Instead of meeting a recovery percentage, a technician may recover from a small appliance until the system reaches a vacuum of:",
    ["4 inches of mercury (in. Hg)", "10 inches of mercury", "15 inches of mercury", "29 inches of mercury"],
    0,
    "The alternative to the 80%/90% percentage rule for small appliances is evacuating to 4 in. Hg vacuum. It is the same value whether or not the compressor operates.",
    { tags: ["recovery-levels"] },
  ),
  q(
    T1,
    "A system-dependent (passive) recovery process:",
    [
      "Uses its own built-in compressor and may be used on any size appliance",
      "Relies on the appliance's compressor or system pressure and may be used only on appliances with 15 lb or less",
      "Is prohibited under Section 608",
      "Must be certified to recover 99% of the charge",
    ],
    1,
    "Passive (system-dependent) recovery captures refrigerant using the appliance's own compressor or internal pressure into a non-pressurized container. It is allowed only for appliances containing 15 pounds or less of refrigerant — which includes all small appliances.",
    { tags: ["recovery-equipment"], source: "40-cfr-82-f" },
  ),
  q(
    T1,
    "Recovery equipment manufactured after November 15, 1993 for use on small appliances must be:",
    [
      "Painted gray and yellow",
      "Certified by an EPA-approved testing organization to meet recovery efficiency standards",
      "Capable of pulling 500 microns",
      "Registered with the local fire marshal",
    ],
    1,
    "Recovery and recycling equipment made after November 15, 1993 must be certified by an EPA-approved laboratory (such as AHRI or UL) as meeting the required recovery efficiencies. Equipment that pre-dates this must still meet the 80%/4 in. Hg standard.",
    { tags: ["dates", "recovery-equipment"] },
  ),
  q(
    T1,
    "Solderless piercing-type access valves installed on small appliances:",
    [
      "May be left on the appliance permanently",
      "Should be used only for temporary access and removed after recovery because they tend to leak",
      "Are prohibited on any appliance containing refrigerant",
      "Must be installed on the discharge line only",
    ],
    1,
    "Piercing valves are handy for gaining access to a sealed system, but their gasket seals deteriorate and leak over time. Use them for the service call, then remove them or braze in a permanent access fitting.",
    { tags: ["access-valves"] },
  ),
  q(
    T1,
    "When using a passive recovery device on a small appliance with a working compressor, the technician should run the compressor and recover from the:",
    ["Low side only", "High side only", "Both the high and low sides, to ensure the greatest amount is removed", "Oil sump"],
    2,
    "Accessing both sides speeds recovery and captures more refrigerant, especially if part of the system is restricted. If the compressor does not run, the technician should also heat and strike the compressor gently to release refrigerant trapped in the oil.",
    { tags: ["recovery-technique"], isFree: false },
  ),
  q(
    T1,
    "A small appliance being disposed of has already had its refrigerant recovered by a certified technician. Before it is picked up by the scrap dealer, what documentation is needed?",
    [
      "None; there is no documentation requirement",
      "A signed statement from the technician or owner confirming the refrigerant has been recovered",
      "A DOT bill of lading",
      "A copy of the technician's Type III card",
    ],
    1,
    "The final person in the disposal chain (e.g., the scrap yard) must recover refrigerant or obtain a signed statement verifying it was already recovered, including the name and address of the person who recovered it and the date. The scrap dealer must keep these records.",
    { tags: ["disposal"], isFree: false },
  ),
  q(
    T1,
    "Which refrigerant is most commonly found in household refrigerators manufactured in the United States after the mid-1990s?",
    ["R-12", "R-134a", "R-22", "R-11"],
    1,
    "R-134a (an HFC) replaced R-12 in domestic refrigerators in the 1990s. R-22 was common in room air conditioners; R-11 is a low-pressure chiller refrigerant and would never be found in a small appliance. Newer refrigerators increasingly use R-600a (isobutane).",
    { difficulty: "EASY", tags: ["refrigerants"] },
  ),
  q(
    T1,
    "A technician recovering R-600a (isobutane) from a modern refrigerator must be aware that it is:",
    ["Highly ozone-depleting", "Flammable (A3), so recovery equipment must be rated for flammable refrigerants and the area well ventilated", "Corrosive to copper", "Only permitted in commercial equipment"],
    1,
    "Hydrocarbon refrigerants such as R-600a are ASHRAE class A3 (higher flammability). Standard recovery machines can ignite it; use spark-proof equipment rated for hydrocarbons and never work near open flames or sparks.",
    { difficulty: "HARD", tags: ["safety", "refrigerants"], isFree: false },
  ),
  q(
    T1,
    "The MVAC-like appliance exception means that a technician working on which of the following does NOT need Type I certification?",
    ["A window air conditioner", "A water cooler", "A vending machine", "The air conditioning system in an agricultural tractor"],
    3,
    "Motor vehicle air conditioners (MVACs) and MVAC-like systems in off-road vehicles and farm equipment are covered under Section 609, not Section 608. Window units, water coolers and vending machines are Section 608 small appliances.",
    { tags: ["definitions"] },
  ),

  // --------------------------------------------------------------- TYPE II
  q(
    T2,
    "For a commercial refrigeration appliance containing 50 pounds or more of refrigerant, the leak rate that triggers mandatory repair is:",
    ["10% per year", "20% per year", "30% per year", "35% per year"],
    2,
    "Current EPA leak-repair thresholds for appliances with 50 lb or more are: 30% for commercial refrigeration, 20% for industrial process refrigeration, and 10% for comfort cooling and all other appliances. Leaks above the threshold must be repaired within 30 days.",
    { tags: ["leak-repair"], source: "epa-leak-repair" },
  ),
  q(
    T2,
    "A 75-pound comfort-cooling rooftop unit is found to be leaking at 15% per year. The owner must:",
    [
      "Do nothing; comfort cooling is exempt",
      "Repair the leak within 30 days and perform a verification test, because 15% exceeds the 10% threshold for comfort cooling",
      "Retire the unit immediately",
      "Repair only if the leak rate reaches 30%",
    ],
    1,
    "Comfort-cooling appliances with 50 lb or more must be repaired when the annualized leak rate exceeds 10%. Repairs are due within 30 days, followed by an initial verification test and a follow-up verification test within 10 days of returning to normal operation.",
    { difficulty: "HARD", tags: ["leak-repair"], source: "epa-leak-repair", isFree: false },
  ),
  q(
    T2,
    "Before opening a high-pressure appliance containing more than 200 pounds of HCFC-22 for a major repair, it must be evacuated to at least (using recovery equipment made after November 15, 1993):",
    ["0 in. Hg", "4 in. Hg", "10 in. Hg", "15 in. Hg"],
    2,
    "Evacuation levels for high-pressure appliances: 0 in. Hg (atmospheric) for HCFC-22 appliances under 200 lb, and 10 in. Hg for HCFC-22 appliances containing 200 lb or more. Other high-pressure refrigerants require 0 in. Hg under 200 lb and 15 in. Hg at 200 lb or more.",
    { tags: ["evacuation"], source: "epa-evacuation" },
  ),
  q(
    T2,
    "Very-high-pressure appliances using refrigerants such as R-503 or R-13 must be evacuated to:",
    ["0 in. Hg (atmospheric pressure)", "10 in. Hg", "25 in. Hg", "29 in. Hg"],
    0,
    "Very-high-pressure appliances only need to be evacuated to 0 in. Hg, regardless of charge size. Pulling a deeper vacuum is unnecessary because these refrigerants are difficult to condense.",
    { tags: ["evacuation"] },
  ),
  q(
    T2,
    "A high-pressure appliance has a leak so severe that pulling the required vacuum would draw in air and contaminate the recovered refrigerant. The technician may:",
    [
      "Vent the remainder to avoid contamination",
      "Evacuate only to 0 in. Hg (atmospheric) before opening",
      "Skip recovery entirely",
      "Charge nitrogen into the system first, then vent",
    ],
    1,
    "When a leak would make achieving the required vacuum impossible without pulling in air, EPA allows the technician to evacuate to atmospheric pressure (0 in. Hg) before opening the appliance, provided the leak was verified.",
    { difficulty: "HARD", tags: ["evacuation"], isFree: false },
  ),
  q(
    T2,
    "To recover refrigerant from a high-pressure system as quickly as possible, the technician should begin by removing:",
    ["Vapor from the suction line", "Liquid from the liquid line, then vapor", "Oil from the compressor sump", "Vapor from the discharge line only"],
    1,
    "Removing liquid first moves the bulk of the charge quickly. Vapor recovery afterward captures the remainder. Recovering only vapor is far slower because the recovery machine must condense it.",
    { tags: ["recovery-technique"] },
  ),
  q(
    T2,
    "A recovery cylinder contains R-22 at 75°F, but the pressure gauge reads well above the pressure shown on a P/T chart for 75°F. The most likely cause is:",
    ["The cylinder is overfilled", "The presence of non-condensables such as air", "The refrigerant has fractionated", "The gauge is reading vacuum"],
    1,
    "At a stable temperature, pure refrigerant should sit at its saturation pressure. Excess pressure means non-condensable gases (air or nitrogen) are mixed in. Non-condensables raise head pressure and reduce efficiency in a system, and they must be purged or the refrigerant reclaimed.",
    { tags: ["pt-chart", "contaminants"] },
  ),
  q(
    T2,
    "A pressure test on a high-pressure system should be performed using:",
    ["Oxygen to detect leaks quickly", "A mixture of dry nitrogen and a trace amount of refrigerant, or nitrogen alone", "Compressed shop air", "R-22 vapor alone to full operating pressure"],
    1,
    "Dry nitrogen — optionally with a small trace charge of the system's refrigerant so an electronic detector can find leaks — is the accepted method. Never use oxygen or compressed air. Do not exceed the low-side test pressure on the equipment nameplate.",
    { tags: ["leak-testing", "safety"] },
  ),
  q(
    T2,
    "After a hermetic compressor burnout, the technician should:",
    [
      "Reuse the refrigerant without treatment",
      "Recover the refrigerant, replace the filter-drier, and install a suction-line filter-drier to remove acid",
      "Flush the system with R-11",
      "Add extra oil to neutralize the acid",
    ],
    1,
    "A burnout leaves acid and sludge in the system. Recover the contaminated refrigerant for reclaim, replace the liquid-line filter-drier, add a suction-line filter-drier (checking pressure drop), and consider an acid test of the oil after running.",
    { tags: ["service"], isFree: false },
  ),
  q(
    T2,
    "Pressure relief valves on high-pressure equipment should never be installed:",
    ["In parallel", "In series", "On the receiver", "Vented outdoors"],
    1,
    "Relief valves installed in series can defeat each other — if the first one fails or is blocked, the second cannot relieve pressure. They may be installed in parallel with a three-way valve so one can be serviced while the other protects the system.",
    { tags: ["safety"] },
  ),
  q(
    T2,
    "On a system using a thermostatic expansion valve, the correct amount of charge is best verified by measuring:",
    ["Superheat at the evaporator outlet", "Subcooling at the condenser outlet", "Compressor amperage only", "Cylinder weight before and after"],
    1,
    "With a TXV the valve holds superheat steady, so charge level is checked with subcooling of the liquid leaving the condenser. Fixed-orifice systems are charged by superheat. Weighing in the charge is the most accurate method when the factory charge is known.",
    { difficulty: "HARD", tags: ["charging"], isFree: false },
  ),
  q(
    T2,
    "When adding a zeotropic blend such as R-407C to a system, the blend should be:",
    ["Charged as vapor to protect the compressor", "Charged as liquid, throttled into the suction line while the compressor runs", "Charged directly into the discharge line", "Mixed with R-22 to reduce cost"],
    1,
    "Zeotropic blends fractionate if drawn as vapor. Charge as liquid from the cylinder and meter it slowly into the suction side (or use a charging device that flashes liquid to vapor) so slugs of liquid don't reach the compressor.",
    { tags: ["blends", "charging"] },
  ),
  q(
    T2,
    "When R-410A replaces R-22, the technician must remember that R-410A:",
    ["Operates at about 50–70% higher pressure and requires equipment rated for it", "Uses mineral oil", "Has a higher ODP", "Can be topped off into an existing R-22 system"],
    0,
    "R-410A operates at significantly higher pressures than R-22, so gauges, hoses, recovery machines and components must be rated for it. It uses POE oil, has zero ODP, and must never be mixed with R-22.",
    { tags: ["refrigerants"] },
  ),
  q(
    T2,
    "Leak inspection records for an appliance with 50 lb or more of refrigerant must be kept by the owner/operator for:",
    ["1 year", "3 years", "10 years", "The life of the equipment"],
    1,
    "Owners must keep records of refrigerant additions, leak inspections, repairs and verification tests for at least three years. Technicians must also keep invoices and records of refrigerant added for three years.",
    { tags: ["recordkeeping", "leak-repair"], source: "epa-leak-repair", isFree: false },
  ),

  // -------------------------------------------------------------- TYPE III
  q(
    T3,
    "Low-pressure appliances such as R-11 and R-123 centrifugal chillers normally operate:",
    ["Above 300 psig", "In a vacuum (below atmospheric pressure) on the low side", "At exactly atmospheric pressure", "At the same pressures as R-410A"],
    1,
    "R-11 boils at about 75°F and R-123 at about 82°F at atmospheric pressure, so the evaporator runs in a vacuum during operation. Because of this, air leaks INTO the machine rather than refrigerant leaking out.",
    { difficulty: "EASY", tags: ["operation"] },
  ),
  q(
    T3,
    "Because low-pressure chillers operate in a vacuum, they are equipped with a device to remove air and other non-condensables that leak in. This device is the:",
    ["Rupture disc", "Purge unit", "Oil separator", "Suction accumulator"],
    1,
    "The purge unit collects non-condensables from the top of the condenser and vents them. Excessive purge run time is a sign of an air leak into the machine. Modern high-efficiency purges minimize refrigerant lost with the purged air.",
    { tags: ["purge"] },
  ),
  q(
    T3,
    "The rupture disc on a low-pressure chiller is typically set to relieve at:",
    ["5 psig", "15 psig", "150 psig", "400 psig"],
    1,
    "Low-pressure vessels are built for low pressure, so the rupture disc relieves at 15 psig. This is why pressurizing for leak testing must never exceed 10 psig — the disc could rupture and dump the charge.",
    { tags: ["safety", "leak-testing"] },
  ),
  q(
    T3,
    "To leak-test a low-pressure chiller, the pressure is raised by circulating warm water through the tubes or adding controlled nitrogen, but the pressure must not exceed:",
    ["10 psig", "15 psig", "25 psig", "50 psig"],
    0,
    "Never exceed 10 psig when pressurizing a low-pressure chiller for leak testing, to protect the 15 psig rupture disc. Warm water (not over about 100°F) raises pressure gradually; heating the refrigerant too aggressively can pop the disc.",
    { tags: ["leak-testing"] },
  ),
  q(
    T3,
    "A low-pressure appliance manufactured after November 15, 1993 must be evacuated before opening to:",
    ["25 in. Hg vacuum", "25 mm Hg absolute", "10 in. Hg vacuum", "0 in. Hg"],
    1,
    "For low-pressure appliances the requirement is 25 mm Hg absolute (roughly 29 in. Hg vacuum) when using recovery equipment made after November 15, 1993. Older recovery equipment must reach 25 in. Hg vacuum.",
    { tags: ["evacuation"], source: "epa-evacuation" },
  ),
  q(
    T3,
    "When charging a low-pressure chiller that has been fully evacuated, refrigerant should be introduced first as:",
    ["Liquid, to speed the process", "Vapor, until the system pressure rises above the point where water in the tubes could freeze", "Oil, to lubricate the compressor", "Nitrogen"],
    1,
    "Charging liquid into a deep vacuum causes it to boil violently and can chill the tubes below 32°F, freezing the water inside and cracking tubes. Add vapor first until the saturation temperature is above freezing (about 36°F for R-123), then finish with liquid.",
    { difficulty: "HARD", tags: ["charging"] },
  ),
  q(
    T3,
    "During recovery from a low-pressure chiller, which is removed first?",
    ["Vapor, then liquid", "Liquid, then vapor", "Oil, then vapor, then liquid", "Only vapor is recovered from low-pressure systems"],
    1,
    "Liquid recovery is faster and removes most of the charge; the remaining vapor is then recovered by the machine's compressor. Water is often circulated through the tubes during recovery to prevent freezing and to supply heat that helps boil off the remaining refrigerant.",
    { tags: ["recovery-technique"] },
  ),
  q(
    T3,
    "Recovering vapor from a low-pressure appliance using a recovery machine with a compressor may be slow because:",
    ["The refrigerant has high ODP", "Low-pressure refrigerant has a very large vapor volume per pound, so it takes many cycles to condense it", "The purge unit fights the recovery machine", "The refrigerant will not condense at any temperature"],
    1,
    "R-11 and R-123 vapor occupy a huge volume per pound at low pressure, so it takes time for the recovery compressor to pull and condense it. Warming the chiller with water flow shortens the job.",
    { difficulty: "HARD", tags: ["recovery-technique"], isFree: false },
  ),
  q(
    T3,
    "Oil removed from a low-pressure chiller during service contains dissolved refrigerant. The technician should:",
    ["Pour it down the drain", "Heat the oil to no more than 130°F and/or apply vacuum to recover the dissolved refrigerant before disposing of the oil", "Return it to the compressor immediately", "Mix it with mineral oil and reuse it"],
    1,
    "Refrigerant is soluble in oil; venting it by dumping oil is a violation. Warm the oil slightly (no more than 130°F) or pull vacuum on it to release the refrigerant into the recovery machine, then dispose of the used oil per regulations.",
    { tags: ["oil", "recovery-technique"] },
  ),
  q(
    T3,
    "ASHRAE Standard 15 requires that rooms containing large chillers have:",
    ["A carbon monoxide detector only", "An oxygen-deprivation sensor (refrigerant monitor) and self-contained breathing apparatus available", "Windows that open", "A rupture disc vented into the room"],
    1,
    "Because leaked refrigerant displaces oxygen, ASHRAE 15 requires refrigerant monitors that alarm before dangerous levels, mechanical ventilation, and SCBA availability. Relief devices must vent outdoors, never into the room.",
    { tags: ["safety"] },
  ),
  q(
    T3,
    "If a low-pressure chiller's purge unit runs excessively, the likely cause is:",
    ["Too much refrigerant charge", "Air leaking into the machine because the low side is in a vacuum", "The rupture disc is set too high", "The oil is too warm"],
    1,
    "A purge unit only has work to do when non-condensables are present. Excessive purging means air is entering — the machine has a leak on the low-pressure side that is drawing air in, and it should be found and repaired.",
    { tags: ["purge", "leak-repair"] },
  ),
  q(
    T3,
    "Which refrigerant replaced R-11 in many low-pressure centrifugal chillers?",
    ["R-22", "R-134a", "R-123", "R-410A"],
    2,
    "R-123 (an HCFC with low ODP) was the drop-in style replacement for R-11 in low-pressure centrifugal chillers, though it requires elastomer and possibly motor changes. R-134a is used in newer medium-pressure centrifugal chillers, not low-pressure machines.",
    { tags: ["refrigerants"] },
  ),
  q(
    T3,
    "For a low-pressure appliance being disposed of, the technician must evacuate to:",
    ["0 in. Hg", "10 in. Hg", "The same level required before opening for a major repair (25 mm Hg absolute)", "No evacuation is required before disposal"],
    2,
    "Disposal evacuation for low-pressure appliances is the same as the requirement for opening the appliance for a major repair: 25 mm Hg absolute with equipment manufactured after November 15, 1993, or 25 in. Hg vacuum with older equipment.",
    { tags: ["evacuation", "disposal"], isFree: false },
  ),
];

export const epa608: SeedExam = {
  slug: "epa-608",
  title: "EPA 608 Technician Certification",
  shortTitle: "EPA 608",
  summary:
    "Federal certification required to buy refrigerant and service stationary air-conditioning and refrigeration equipment. Covers Core, Type I, Type II and Type III.",
  certifyingBody: "U.S. Environmental Protection Agency (administered by EPA-approved certifying organizations)",
  categorySlug: "hvac-refrigeration",
  scope: "FEDERAL",
  states: [],
  difficulty: "MEDIUM",
  isFeatured: true,
  realQuestionCount: 100,
  realTimeMinutes: undefined,
  passingScoreText: "18 of 25 correct (72%) on each section",
  mockQuestionCount: 25,
  mockTimeMinutes: 30,
  freeQuestionLimit: 10,
  seoTitle: "EPA 608 Practice Test — Free Core, Type I, II & III Questions",
  seoDescription:
    "Free EPA 608 practice test with 100+ original questions. Core, Type I, Type II and Type III, timed mocks, 72% passing-score guide, and Type 1 vs Type 2 explained.",
  overview: `## What the EPA 608 exam is

Section 608 of the Clean Air Act requires anyone who maintains, services, repairs or disposes of equipment that could release refrigerant into the atmosphere to be certified. Certification is issued by EPA-approved organizations, never by EPA directly, and it does not expire.

The exam has four sections:

| Section | Covers | Questions |
| --- | --- | --- |
| Core | Regulations, ozone science, safety, recovery, shipping | 25 |
| Type I | Small appliances (≤ 5 lb, factory sealed) | 25 |
| Type II | High-pressure appliances (split systems, rooftops, racks) | 25 |
| Type III | Low-pressure appliances (centrifugal chillers) | 25 |

Passing Core plus one type earns that type's certification. Passing Core plus all three types earns **Universal** certification, which most HVAC/R employers ask for.

Not sure which type you need? Read [Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2) and [who needs EPA 608 certification](/exams/epa-608/guides/who-needs-certification). The passing bar is **18 of 25 (72%) on each section**.

## How CertReady helps

Every question in this bank is original practice material written to mirror the topics, numbers and traps on the real exam — recovery percentages, evacuation levels, leak-rate thresholds, dates and safety rules. Each answer comes with an explanation and, where relevant, a pointer to the EPA rule it comes from. Start with the [free EPA 608 practice test](/exams/epa-608/practice-test) or a timed [mock exam](/mock/epa-608).`,
  whoShouldTake: `- HVAC/R technicians and apprentices who will handle refrigerant on stationary equipment
- Facilities and maintenance staff who service rooftop units, walk-in coolers or chillers
- Appliance repair technicians working on refrigerators, freezers, window units and vending machines
- Anyone who needs to purchase regulated refrigerant — sales are restricted to certified technicians
- Trade-school students preparing to enter the field

If you only work on car and truck A/C systems, you need Section **609** certification instead, which is a separate program. A 608 card does not cover MVAC, and a 609 card does not cover a rooftop.

There is no federal age, diploma or apprenticeship requirement. State HVAC licenses are separate from 608. Full detail: [who needs EPA 608 certification](/exams/epa-608/guides/who-needs-certification).`,
  requirements: `## Eligibility

There are no age, education or experience requirements. Anyone can sit for the exam.

## Format

- Closed-book, multiple choice. Each section has 25 questions; you must answer **18 correctly (72%)** on each section you attempt.
- Core is required for every type. You can take Type I, II and III in one sitting (Universal) or add types later.
- Type I may be offered as an open-book, non-proctored exam by some organizations. Type II, Type III and Universal must be **proctored**, either in person or through online proctoring.
- Exams are administered by EPA-approved certifying organizations such as ESCO Institute, RSES, Mainstream Engineering and HVAC Excellence. Fees vary by provider, typically in the range of $20–$150.

## Certification

- Certification is issued as a wallet card by the certifying organization.
- **It never expires** and is valid in every U.S. state and territory.
- If you fail one type section you keep credit for the sections you passed and retake only the failed one.
- Passing is **18 of 25 correct (72%) per section**, not an overall average. Details: [EPA 608 passing score](/exams/epa-608/guides/passing-score).

Always confirm current fees, seating time and online-proctor rules with the organization that will print your card. EPA publishes the [list of approved programs](https://www.epa.gov/section608/section-608-technician-certification-programs).`,
  studyGuide: `## Numbers you must memorize

| Topic | Value |
| --- | --- |
| Small appliance definition | Factory-sealed, **5 lb or less** |
| Small appliance recovery — compressor works | **90%** or 4 in. Hg |
| Small appliance recovery — compressor dead | **80%** or 4 in. Hg |
| Passive (system-dependent) recovery | Appliances with **15 lb or less** |
| Recovery cylinder fill limit | **80%** by weight |
| High-pressure evacuation, HCFC-22 < 200 lb | 0 in. Hg |
| High-pressure evacuation, HCFC-22 ≥ 200 lb | 10 in. Hg |
| Other high-pressure < 200 lb / ≥ 200 lb | 0 / 15 in. Hg |
| Very-high-pressure (R-503, R-13) | 0 in. Hg |
| Low-pressure evacuation (post-11/15/93 equipment) | **25 mm Hg absolute** |
| Low-pressure rupture disc | 15 psig |
| Low-pressure leak test pressure limit | 10 psig |
| Leak-rate thresholds (≥ 50 lb) | Comfort cooling **10%** · Commercial refrigeration **20%** · Industrial process **30%** |
| Leak repair deadline | 30 days (or mothball / retire) |
| Records retention | 3 years |

Do not mix Type I percentages (80/90) with Type II vacuums (0/10/15 in. Hg) or Type III's **25 mm Hg absolute**. That mix-up is how people fail one section at 17/25.

## Dates

- **July 1, 1992** — venting of CFC/HCFC prohibited
- **November 15, 1993** — recovery equipment after this date must be certified; determines evacuation levels
- **November 14, 1994** — technicians must be certified
- **November 15, 1995** — venting prohibition extended to HFCs

## Pick the right type before you memorize

- Factory-sealed, 5 lb or less → [Type I](/exams/epa-608/type-1)
- Field-charged high-pressure (splits, rooftops, racks) → [Type II](/exams/epa-608/type-2)
- Low-pressure chillers → [Type III](/exams/epa-608/type-3)
- All three plus Core → Universal

Full comparison: [EPA 608 Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2). Passing is **18 of 25 (72%) per section** — see the [passing score guide](/exams/epa-608/guides/passing-score). Who must sit: [who needs EPA 608](/exams/epa-608/guides/who-needs-certification).

## Study plan (two weeks)

1. **Days 1–3 — Core.** Recite the dates, 80% cylinder fill, recover/recycle/reclaim, and the venting rule. Practice until 85%+.
2. **Days 4–6 — Type I.** Small-appliance definition, 80/90% or 4 in. Hg, piercing valves, passive recovery.
3. **Days 7–9 — Type II.** Flash-card the leak-rate table (10 / 20 / 30) and the evacuation table. Recover liquid first.
4. **Days 10–12 — Type III.** Vacuum operation, 10 psig leak test, 15 psig disc, 25 mm Hg absolute, vapor-first charging.
5. **Days 13–14 — Mock exams.** Timed mocks, review every miss, re-drill the weak category from your dashboard.`,
  faq: [
    {
      question: "How many questions are on the EPA 608 exam?",
      answer:
        "Each section has 25 multiple-choice questions. Universal certification means passing Core plus Type I, II and III — 100 questions in total. You need 18 of 25 correct on each section.",
    },
    {
      question: "Does EPA 608 certification expire?",
      answer: "No. Once you pass, certification is valid for life and is recognized in every state. If you lose your card, your certifying organization can issue a replacement.",
    },
    {
      question: "Can I take the EPA 608 test online?",
      answer:
        "Type I can be taken online without a proctor through some organizations. Type II, Type III and Universal must be proctored — many providers offer live online proctoring so you can still test from home.",
    },
    {
      question: "Is the EPA 608 exam open book?",
      answer: "No, except for some Type I-only exams. Core, Type II, Type III and Universal are closed-book.",
    },
    {
      question: "What is the difference between EPA 608 and EPA 609?",
      answer:
        "Section 608 covers stationary refrigeration and air conditioning. Section 609 covers motor vehicle air conditioning (MVAC). They are separate certifications with separate exams.",
    },
    {
      question: "Are CertReady's questions the real exam questions?",
      answer:
        "No. All questions on CertReady are original practice material written to cover the same topics and numbers as the official exam. CertReady is not affiliated with the EPA or any certifying organization.",
    },
    {
      question: "What is the EPA 608 passing score?",
      answer:
        "18 of 25 questions (72%) on each section you attempt. Universal requires that score on Core and on Type I, II and III separately — not as an average.",
    },
    {
      question: "What is the difference between Type I, Type II and Type III?",
      answer:
        "Type I is factory-sealed small appliances with 5 lb or less. Type II is high-pressure equipment such as split systems and racks. Type III is low-pressure chillers. Universal is Core plus all three. See the Type 1 vs Type 2 guide on CertReady.",
    },
    {
      question: "Do I need EPA 608 to buy refrigerant?",
      answer:
        "Yes for most regulated refrigerants. Sales are restricted to Section 608 certified technicians. Motor-vehicle small cans follow Section 609 rules instead.",
    },
    {
      question: "How much does the EPA 608 test cost?",
      answer:
        "EPA does not set a national fee. Approved organizations typically charge on the order of $20–$150 depending on how many sections you sit and whether you test in person or with online proctoring.",
    },
    {
      question: "Should I take Universal or just Type II?",
      answer:
        "If you only service field-charged HVAC, Core plus Type II is the legal minimum. Most employers still want Universal so you can also open small appliances and chillers. You can add types later without retaking sections you already passed.",
    },
  ],
  officialResources: [
    {
      label: "EPA — Section 608 Technician Certification",
      url: "https://www.epa.gov/section608/section-608-technician-certification-0",
      description: "Official program overview, certification types and rules.",
    },
    {
      label: "EPA — Approved Technician Certification Programs",
      url: "https://www.epa.gov/section608/section-608-technician-certification-programs",
      description: "List of organizations authorized to administer the exam.",
    },
    {
      label: "40 CFR Part 82 Subpart F (eCFR)",
      url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F",
      description: "The regulation itself: recycling, evacuation, leak repair and recordkeeping.",
    },
    {
      label: "EPA — Stationary Refrigeration Leak Repair Requirements",
      url: "https://www.epa.gov/section608/stationary-refrigeration-leak-repair-requirements",
      description: "Leak-rate thresholds, deadlines and verification testing.",
    },
  ],
  categories,
  sources,
  questions: [...questions, ...moreEpa608Questions],
};
