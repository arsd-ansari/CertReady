import type { Exam } from "./legacy-types";

export const waterTreatment1: Exam = {
  slug: "water-treatment-grade-1",
  title: "Water Treatment Operator",
  shortTitle: "Water Treatment",
  level: "Grade 1",
  body: "ABC / Water Professionals International standardized exam",
  description:
    "Entry-level certification for operators of drinking water treatment plants. Covers source water, coagulation and flocculation, sedimentation, filtration, disinfection, water quality rules, and the math behind dosing and detention time.",
  format: {
    questions: 100,
    minutes: 180,
    passingScore: "70%",
  },
  mockMinutes: 20,
  topics: [
    { id: "treatment", name: "Treatment processes", weight: 40 },
    { id: "quality", name: "Water quality and monitoring", weight: 20 },
    { id: "equipment", name: "Equipment and maintenance", weight: 10 },
    { id: "safety", name: "Safety and regulations", weight: 10 },
    { id: "math", name: "Operator math", weight: 20 },
  ],
  questions: [
    {
      id: "wt1-001",
      topicId: "treatment",
      prompt: "The purpose of adding a coagulant such as alum to raw water is to:",
      choices: [
        { id: "a", text: "Kill bacteria and viruses" },
        { id: "b", text: "Neutralize the charge on fine particles so they can clump together" },
        { id: "c", text: "Raise the dissolved oxygen level" },
        { id: "d", text: "Remove dissolved salts" },
      ],
      correctChoiceId: "b",
      explanation:
        "Suspended particles carry a negative charge and repel each other. A coagulant neutralizes that charge so particles can stick together during flocculation and settle out. Disinfection is a separate later step.",
    },
    {
      id: "wt1-002",
      topicId: "treatment",
      prompt: "Which process uses slow, gentle mixing to build larger settleable particles?",
      choices: [
        { id: "a", text: "Rapid mix" },
        { id: "b", text: "Flocculation" },
        { id: "c", text: "Filtration" },
        { id: "d", text: "Fluoridation" },
      ],
      correctChoiceId: "b",
      explanation:
        "Flocculation follows the rapid mix. Gentle paddles bring small coagulated particles into contact so they grow into floc heavy enough to settle. Mixing too hard would shear the floc apart.",
    },
    {
      id: "wt1-003",
      topicId: "treatment",
      prompt: "The correct order of conventional surface water treatment is:",
      choices: [
        { id: "a", text: "Filtration, coagulation, sedimentation, disinfection" },
        { id: "b", text: "Coagulation, flocculation, sedimentation, filtration, disinfection" },
        { id: "c", text: "Disinfection, sedimentation, coagulation, filtration" },
        { id: "d", text: "Sedimentation, coagulation, filtration, flocculation" },
      ],
      correctChoiceId: "b",
      explanation:
        "Particles are destabilized (coagulation), grown (flocculation), settled (sedimentation), polished (filtration), and only then is the clean water disinfected so the chlorine demand is low.",
    },
    {
      id: "wt1-004",
      topicId: "treatment",
      prompt: "A rapid sand filter is normally backwashed when:",
      choices: [
        { id: "a", text: "Head loss reaches its limit or effluent turbidity begins to rise" },
        { id: "b", text: "The raw water temperature drops" },
        { id: "c", text: "Every hour regardless of condition" },
        { id: "d", text: "The chlorine residual falls" },
      ],
      correctChoiceId: "a",
      explanation:
        "Filters are backwashed on terminal head loss, turbidity breakthrough, or a maximum run time, whichever comes first. Backwashing on a fixed schedule wastes water and disrupts the filter bed.",
    },
    {
      id: "wt1-005",
      topicId: "treatment",
      prompt:
        "When chlorine is added to water containing ammonia, the chlorine first forms:",
      choices: [
        { id: "a", text: "Free chlorine only" },
        { id: "b", text: "Chloramines (combined chlorine)" },
        { id: "c", text: "Chlorine dioxide" },
        { id: "d", text: "Ozone" },
      ],
      correctChoiceId: "b",
      explanation:
        "Chlorine reacts with ammonia to form combined chlorine (chloramines) before a free residual appears. This is the basis of the breakpoint chlorination curve, a favorite exam topic.",
    },
    {
      id: "wt1-006",
      topicId: "quality",
      prompt: "Turbidity in finished drinking water is a concern mainly because it:",
      choices: [
        { id: "a", text: "Makes the water taste salty" },
        { id: "b", text: "Can shield microorganisms from disinfection" },
        { id: "c", text: "Increases the water pressure" },
        { id: "d", text: "Lowers the water temperature" },
      ],
      correctChoiceId: "b",
      explanation:
        "Particles can protect pathogens from chlorine and interfere with disinfection. That is why the turbidity rule on filter effluent is so strict, and why turbidity is an indicator of filter performance.",
    },
    {
      id: "wt1-007",
      topicId: "quality",
      prompt: "The presence of total coliform bacteria in a distribution sample indicates:",
      choices: [
        { id: "a", text: "The water is safe to drink" },
        { id: "b", text: "Possible contamination and a need for repeat sampling" },
        { id: "c", text: "The water is too hard" },
        { id: "d", text: "The fluoride dose is too high" },
      ],
      correctChoiceId: "b",
      explanation:
        "Coliforms are indicator organisms. Their presence does not prove disease organisms are present, but it does mean a pathway for contamination may exist, triggering repeat samples and investigation.",
    },
    {
      id: "wt1-008",
      topicId: "quality",
      prompt: "A pH reading of 6.0 in finished water means the water is:",
      choices: [
        { id: "a", text: "Slightly acidic and may be corrosive" },
        { id: "b", text: "Strongly basic" },
        { id: "c", text: "Neutral" },
        { id: "d", text: "Saturated with calcium carbonate" },
      ],
      correctChoiceId: "a",
      explanation:
        "7.0 is neutral. Anything below is acidic; at 6.0 the water tends to dissolve metal from pipes, which matters for lead and copper control. Most systems keep finished water around 7.0 to 8.5.",
    },
    {
      id: "wt1-009",
      topicId: "equipment",
      prompt: "A chlorine gas leak at a cylinder is best located by:",
      choices: [
        { id: "a", text: "Smelling around each fitting" },
        { id: "b", text: "Holding an ammonia-soaked cloth near fittings and watching for white vapor" },
        { id: "c", text: "Spraying water on the cylinder" },
        { id: "d", text: "Tapping the cylinder with a hammer" },
      ],
      correctChoiceId: "b",
      explanation:
        "Ammonia vapor reacts with chlorine to form a visible white cloud of ammonium chloride. Never spray water on a leak; it makes the corrosion and leak worse.",
    },
    {
      id: "wt1-010",
      topicId: "safety",
      prompt: "A one-ton chlorine container should be stored and used:",
      choices: [
        { id: "a", text: "Lying on its side with the valves in a vertical line" },
        { id: "b", text: "Standing upright" },
        { id: "c", text: "Outdoors in direct sunlight" },
        { id: "d", text: "Near the plant office for easy access" },
      ],
      correctChoiceId: "a",
      explanation:
        "Ton containers lie horizontally with the two valves aligned one above the other: the top valve feeds gas, the bottom feeds liquid. 150-lb cylinders are the ones stored upright.",
    },
    {
      id: "wt1-011",
      topicId: "math",
      prompt:
        "A plant treats 3.0 MGD and feeds alum at 25 mg/L. How many pounds of alum are used per day? (8.34 lb/gal)",
      choices: [
        { id: "a", text: "62.6 lb/day" },
        { id: "b", text: "208.5 lb/day" },
        { id: "c", text: "625.5 lb/day" },
        { id: "d", text: "750 lb/day" },
      ],
      correctChoiceId: "c",
      explanation:
        "lb/day = MGD × mg/L × 8.34 = 3.0 × 25 × 8.34 = 625.5 lb/day. Dropping the 8.34 gives 75; dropping the flow gives 208.5 (answer B).",
    },
    {
      id: "wt1-012",
      topicId: "math",
      prompt:
        "A chlorine dose is 3.0 mg/L and the measured residual is 1.2 mg/L. What is the chlorine demand?",
      choices: [
        { id: "a", text: "1.2 mg/L" },
        { id: "b", text: "1.8 mg/L" },
        { id: "c", text: "3.0 mg/L" },
        { id: "d", text: "4.2 mg/L" },
      ],
      correctChoiceId: "b",
      explanation:
        "Dose = demand + residual, so demand = dose − residual = 3.0 − 1.2 = 1.8 mg/L. Answer D adds them, the classic error.",
    },
    {
      id: "wt1-013",
      topicId: "math",
      prompt:
        "A circular clearwell is 50 ft in diameter and holds water 10 ft deep. What is its volume in gallons? (Use 0.785 for π/4; 7.48 gal/ft³)",
      choices: [
        { id: "a", text: "19,625 gallons" },
        { id: "b", text: "73,500 gallons" },
        { id: "c", text: "146,795 gallons" },
        { id: "d", text: "587,180 gallons" },
      ],
      correctChoiceId: "c",
      explanation:
        "Volume = 0.785 × D² × depth = 0.785 × 50 × 50 × 10 = 19,625 ft³. Times 7.48 = 146,795 gallons. Answer A stops at cubic feet; answer D uses the diameter squared without 0.785.",
    },
    {
      id: "wt1-014",
      topicId: "math",
      prompt:
        "A filter is 20 ft by 30 ft and receives a flow of 1,500 gpm. What is the filtration rate in gpm per square foot?",
      choices: [
        { id: "a", text: "1.5 gpm/ft²" },
        { id: "b", text: "2.5 gpm/ft²" },
        { id: "c", text: "4.0 gpm/ft²" },
        { id: "d", text: "25 gpm/ft²" },
      ],
      correctChoiceId: "b",
      explanation:
        "Filtration rate = flow ÷ surface area = 1,500 gpm ÷ (20 × 30 ft²) = 1,500 ÷ 600 = 2.5 gpm/ft². Typical rapid sand filters run 2 to 4 gpm/ft².",
    },
  ],
};
