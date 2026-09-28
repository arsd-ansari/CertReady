import type { Exam } from "./legacy-types";

export const wastewaterTreatment1: Exam = {
  slug: "wastewater-treatment-grade-1",
  title: "Wastewater Treatment Operator",
  shortTitle: "Wastewater Treatment",
  level: "Grade 1",
  body: "ABC / Water Professionals International standardized exam",
  description:
    "Entry-level certification for operators of wastewater treatment plants. Covers preliminary and primary treatment, activated sludge basics, disinfection, lab sampling, safety, and the math behind flow, detention time, and chemical dosing.",
  format: {
    questions: 100,
    minutes: 180,
    passingScore: "70%",
  },
  mockMinutes: 20,
  topics: [
    { id: "treatment", name: "Treatment processes", weight: 40 },
    { id: "lab", name: "Laboratory and sampling", weight: 15 },
    { id: "equipment", name: "Equipment and maintenance", weight: 15 },
    { id: "safety", name: "Safety and regulations", weight: 10 },
    { id: "math", name: "Operator math", weight: 20 },
  ],
  questions: [
    {
      id: "ww1-001",
      topicId: "treatment",
      prompt:
        "What is the primary purpose of a bar screen at the headworks of a wastewater treatment plant?",
      choices: [
        { id: "a", text: "Remove dissolved organic material" },
        { id: "b", text: "Remove large debris that could damage downstream pumps and equipment" },
        { id: "c", text: "Settle out grit and sand" },
        { id: "d", text: "Add oxygen to the incoming flow" },
      ],
      correctChoiceId: "b",
      explanation:
        "Bar screens are the first line of defense. They catch rags, sticks, and other large solids so pumps and downstream units are protected. Grit settles in the grit chamber, and dissolved organics are removed later in biological treatment.",
    },
    {
      id: "ww1-002",
      topicId: "treatment",
      prompt: "In a primary clarifier, the material that floats to the surface is called:",
      choices: [
        { id: "a", text: "Grit" },
        { id: "b", text: "Sludge" },
        { id: "c", text: "Scum" },
        { id: "d", text: "Mixed liquor" },
      ],
      correctChoiceId: "c",
      explanation:
        "Scum is the floating layer of grease, oil, and light solids removed by surface skimmers. Sludge is the settled solids on the clarifier floor. Mixed liquor is the aeration-basin contents in an activated sludge process.",
    },
    {
      id: "ww1-003",
      topicId: "treatment",
      prompt:
        "In the activated sludge process, why is a portion of the settled sludge returned to the aeration basin?",
      choices: [
        { id: "a", text: "To lower the dissolved oxygen concentration" },
        { id: "b", text: "To maintain a working population of microorganisms" },
        { id: "c", text: "To increase the flow through the clarifier" },
        { id: "d", text: "To add alkalinity to the process" },
      ],
      correctChoiceId: "b",
      explanation:
        "Return activated sludge (RAS) keeps enough active biomass in the aeration basin to treat incoming BOD. Without it the organisms would wash out of the system with the effluent.",
    },
    {
      id: "ww1-004",
      topicId: "treatment",
      prompt:
        "A well-operating activated sludge plant typically maintains a dissolved oxygen concentration in the aeration basin of about:",
      choices: [
        { id: "a", text: "0 to 0.5 mg/L" },
        { id: "b", text: "1 to 3 mg/L" },
        { id: "c", text: "8 to 10 mg/L" },
        { id: "d", text: "15 to 20 mg/L" },
      ],
      correctChoiceId: "b",
      explanation:
        "Around 1 to 3 mg/L keeps aerobic bacteria active without wasting blower energy. Below about 0.5 mg/L filamentous organisms can take over and cause poor settling.",
    },
    {
      id: "ww1-005",
      topicId: "treatment",
      prompt:
        "Chlorine is added to the final effluent of a wastewater treatment plant mainly to:",
      choices: [
        { id: "a", text: "Remove suspended solids" },
        { id: "b", text: "Reduce BOD" },
        { id: "c", text: "Kill pathogenic organisms before discharge" },
        { id: "d", text: "Raise the pH" },
      ],
      correctChoiceId: "c",
      explanation:
        "Disinfection protects the receiving water and public health by destroying disease-causing organisms. Solids and BOD are removed earlier by settling and biological treatment.",
    },
    {
      id: "ww1-006",
      topicId: "lab",
      prompt:
        "Which type of sample gives the best picture of the average quality of plant influent over a 24-hour period?",
      choices: [
        { id: "a", text: "A single grab sample taken at 8 a.m." },
        { id: "b", text: "A flow-proportional composite sample" },
        { id: "c", text: "A grab sample taken during peak flow" },
        { id: "d", text: "A sample of the return activated sludge" },
      ],
      correctChoiceId: "b",
      explanation:
        "A composite sample combines portions collected across the day, weighted by flow, so it averages out the swings in strength and volume. A grab sample only shows one moment in time.",
    },
    {
      id: "ww1-007",
      topicId: "lab",
      prompt: "The BOD5 test measures:",
      choices: [
        { id: "a", text: "The weight of solids that settle in 30 minutes" },
        { id: "b", text: "The oxygen consumed by microorganisms over five days at 20 °C" },
        { id: "c", text: "The chlorine residual after five minutes of contact" },
        { id: "d", text: "The amount of dissolved oxygen in the receiving stream" },
      ],
      correctChoiceId: "b",
      explanation:
        "Five-day biochemical oxygen demand incubates the sample at 20 °C and measures how much oxygen the biology uses. It is the standard measure of organic strength in wastewater.",
    },
    {
      id: "ww1-008",
      topicId: "equipment",
      prompt:
        "A centrifugal pump is running but delivering very little flow, and the pressure gauge reads low. The most likely cause is:",
      choices: [
        { id: "a", text: "The discharge valve is fully open" },
        { id: "b", text: "The pump has lost prime or the impeller is clogged" },
        { id: "c", text: "The motor is running too fast" },
        { id: "d", text: "The wet well level is too high" },
      ],
      correctChoiceId: "b",
      explanation:
        "Low flow and low pressure together point to air in the casing or a blocked impeller. A partially closed discharge valve would give low flow with high pressure instead.",
    },
    {
      id: "ww1-009",
      topicId: "safety",
      prompt:
        "Before entering a manhole or wet well classified as a permit-required confined space, an operator must first:",
      choices: [
        { id: "a", text: "Enter quickly to minimize exposure time" },
        { id: "b", text: "Test the atmosphere for oxygen, flammable gas, and toxic gas" },
        { id: "c", text: "Light a match to check for methane" },
        { id: "d", text: "Remove the safety harness so it does not snag" },
      ],
      correctChoiceId: "b",
      explanation:
        "Atmospheric testing comes first, in that order: oxygen, then flammable, then toxic gases such as hydrogen sulfide. Entry also requires ventilation, an attendant, and a retrieval harness.",
    },
    {
      id: "ww1-010",
      topicId: "safety",
      prompt: "Hydrogen sulfide gas in a collection system is dangerous because it:",
      choices: [
        { id: "a", text: "Is heavier than air, toxic, and deadens the sense of smell at high concentrations" },
        { id: "b", text: "Is lighter than air and escapes quickly" },
        { id: "c", text: "Only causes a bad odor" },
        { id: "d", text: "Cannot be detected by any gas meter" },
      ],
      correctChoiceId: "a",
      explanation:
        "H2S collects in low spaces and at high levels it paralyzes the sense of smell, so the rotten-egg odor disappearing is a warning, not relief. It is detected with a standard four-gas meter.",
    },
    {
      id: "ww1-011",
      topicId: "math",
      prompt:
        "A rectangular tank is 40 ft long, 20 ft wide, and 12 ft deep. What is its volume in gallons? (1 cubic foot = 7.48 gallons)",
      choices: [
        { id: "a", text: "9,600 gallons" },
        { id: "b", text: "35,904 gallons" },
        { id: "c", text: "71,808 gallons" },
        { id: "d", text: "718,080 gallons" },
      ],
      correctChoiceId: "c",
      explanation:
        "Volume = 40 × 20 × 12 = 9,600 cubic feet. Multiply by 7.48 gal/ft³: 9,600 × 7.48 = 71,808 gallons. Answer A is the volume in cubic feet, the most common slip.",
    },
    {
      id: "ww1-012",
      topicId: "math",
      prompt:
        "A clarifier holds 150,000 gallons and receives a flow of 1.2 million gallons per day. What is the detention time in hours?",
      choices: [
        { id: "a", text: "1.5 hours" },
        { id: "b", text: "3.0 hours" },
        { id: "c", text: "5.0 hours" },
        { id: "d", text: "8.0 hours" },
      ],
      correctChoiceId: "b",
      explanation:
        "Detention time = volume ÷ flow. 150,000 gal ÷ 1,200,000 gal/day = 0.125 day. Multiply by 24 hours/day: 0.125 × 24 = 3.0 hours.",
    },
    {
      id: "ww1-013",
      topicId: "math",
      prompt:
        "How many pounds of chlorine per day are needed to dose a flow of 2.0 MGD at 5 mg/L? (Use 8.34 lb/gal)",
      choices: [
        { id: "a", text: "41.7 lb/day" },
        { id: "b", text: "83.4 lb/day" },
        { id: "c", text: "100 lb/day" },
        { id: "d", text: "166.8 lb/day" },
      ],
      correctChoiceId: "b",
      explanation:
        "Pounds formula: lb/day = flow (MGD) × dose (mg/L) × 8.34. 2.0 × 5 × 8.34 = 83.4 lb/day. Forgetting to multiply by the flow gives answer A.",
    },
    {
      id: "ww1-014",
      topicId: "math",
      prompt:
        "Influent BOD is 200 mg/L and effluent BOD is 20 mg/L. What is the BOD removal efficiency?",
      choices: [
        { id: "a", text: "10%" },
        { id: "b", text: "80%" },
        { id: "c", text: "90%" },
        { id: "d", text: "180%" },
      ],
      correctChoiceId: "c",
      explanation:
        "Efficiency = (in − out) ÷ in × 100 = (200 − 20) ÷ 200 × 100 = 90%. Answer A is the fraction remaining, the mirror-image mistake.",
    },
  ],
};
