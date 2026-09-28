import type { Exam } from "./legacy-types";

export const wastewaterCollection1: Exam = {
  slug: "wastewater-collection-grade-1",
  title: "Wastewater Collection System Operator",
  shortTitle: "Collections",
  level: "Grade 1",
  body: "ABC / Water Professionals International standardized exam",
  description:
    "Entry-level certification for operators who maintain sewers, manholes, and lift stations. Covers pipe materials, inspection and cleaning, lift station operation, infiltration and inflow, confined space safety, and the math behind pipe volume and slope.",
  format: {
    questions: 100,
    minutes: 180,
    passingScore: "70%",
  },
  mockMinutes: 20,
  topics: [
    { id: "system", name: "Collection system components", weight: 30 },
    { id: "maintenance", name: "Inspection, cleaning, and repair", weight: 25 },
    { id: "lift", name: "Lift stations and pumps", weight: 15 },
    { id: "safety", name: "Safety and regulations", weight: 15 },
    { id: "math", name: "Operator math", weight: 15 },
  ],
  questions: [
    {
      id: "wc1-001",
      topicId: "system",
      prompt: "A gravity sewer relies on which of the following to move wastewater?",
      choices: [
        { id: "a", text: "Pumps at every manhole" },
        { id: "b", text: "The slope of the pipe" },
        { id: "c", text: "Compressed air" },
        { id: "d", text: "Vacuum pressure" },
      ],
      correctChoiceId: "b",
      explanation:
        "Gravity sewers are laid on a downhill grade so flow moves on its own. Force mains, by contrast, are pressurized by a lift station pump.",
    },
    {
      id: "wc1-002",
      topicId: "system",
      prompt: "The pipe that carries wastewater under pressure from a lift station is called a:",
      choices: [
        { id: "a", text: "Lateral" },
        { id: "b", text: "Interceptor" },
        { id: "c", text: "Force main" },
        { id: "d", text: "Trunk sewer" },
      ],
      correctChoiceId: "c",
      explanation:
        "A force main is the pressurized discharge line from a pump station. Laterals connect buildings, trunk sewers collect from mains, and interceptors carry flow to the treatment plant.",
    },
    {
      id: "wc1-003",
      topicId: "system",
      prompt: "Manholes are normally placed at:",
      choices: [
        { id: "a", text: "Changes in pipe direction, slope, size, and at regular intervals" },
        { id: "b", text: "Only at the treatment plant" },
        { id: "c", text: "Every 50 feet regardless of layout" },
        { id: "d", text: "Only where pipes cross a street" },
      ],
      correctChoiceId: "a",
      explanation:
        "Manholes give access for inspection and cleaning. They go wherever the line changes direction, grade, or size, and every 300 to 500 feet on straight runs so cleaning equipment can reach the whole pipe.",
    },
    {
      id: "wc1-004",
      topicId: "system",
      prompt: "Infiltration is best described as:",
      choices: [
        { id: "a", text: "Stormwater entering through roof drains and catch basins" },
        { id: "b", text: "Groundwater entering the sewer through cracks and defective joints" },
        { id: "c", text: "Industrial discharge to the sewer" },
        { id: "d", text: "Wastewater leaking out of the sewer" },
      ],
      correctChoiceId: "b",
      explanation:
        "Infiltration is groundwater seeping in through defects; inflow is surface water entering through direct connections like downspouts and manhole covers. Together they are called I/I.",
    },
    {
      id: "wc1-005",
      topicId: "maintenance",
      prompt: "A hydraulic jet cleaner (jetter) removes debris from a sewer by:",
      choices: [
        { id: "a", text: "Cutting roots with a rotating blade" },
        { id: "b", text: "Directing high-pressure water backward to pull the nozzle upstream and flush debris" },
        { id: "c", text: "Applying a chemical root killer" },
        { id: "d", text: "Vacuuming the pipe dry" },
      ],
      correctChoiceId: "b",
      explanation:
        "The jet nozzle sprays backward so it propels itself up the line, then debris is flushed back to the downstream manhole as the hose is retrieved. A combination truck adds a vacuum to lift the debris out.",
    },
    {
      id: "wc1-006",
      topicId: "maintenance",
      prompt: "Closed-circuit television (CCTV) inspection of a sewer is used to:",
      choices: [
        { id: "a", text: "Measure the flow rate" },
        { id: "b", text: "Locate cracks, root intrusion, offset joints, and other defects" },
        { id: "c", text: "Disinfect the pipe" },
        { id: "d", text: "Replace the pipe lining" },
      ],
      correctChoiceId: "b",
      explanation:
        "CCTV shows the inside of the pipe so defects can be located and rated before repair or lining is planned. It is the main condition-assessment tool for collection systems.",
    },
    {
      id: "wc1-007",
      topicId: "maintenance",
      prompt: "The most common cause of sanitary sewer stoppages in residential areas is:",
      choices: [
        { id: "a", text: "Sand" },
        { id: "b", text: "Roots and grease" },
        { id: "c", text: "Excess chlorine" },
        { id: "d", text: "High water temperature" },
      ],
      correctChoiceId: "b",
      explanation:
        "Tree roots enter through joints and grease builds up on pipe walls; together they cause most blockages and overflows. Preventive cleaning schedules target known trouble spots.",
    },
    {
      id: "wc1-008",
      topicId: "lift",
      prompt: "In a wet well, the float that starts the lead pump should be set:",
      choices: [
        { id: "a", text: "Below the pump-off level" },
        { id: "b", text: "Above the pump-off level and below the high-level alarm" },
        { id: "c", text: "At the same level as the high-level alarm" },
        { id: "d", text: "Above the influent pipe invert" },
      ],
      correctChoiceId: "b",
      explanation:
        "Pumps cycle between an off level and an on level. The lead pump starts before the lag pump, and both start before the alarm. Setting the on level above the influent invert would cause surcharging in the sewer.",
    },
    {
      id: "wc1-009",
      topicId: "lift",
      prompt: "A check valve on a lift station discharge line is installed to:",
      choices: [
        { id: "a", text: "Throttle the flow" },
        { id: "b", text: "Prevent flow from running back into the wet well when the pump stops" },
        { id: "c", text: "Release trapped air" },
        { id: "d", text: "Measure the discharge pressure" },
      ],
      correctChoiceId: "b",
      explanation:
        "Without a check valve the force main would drain back and the pump would short-cycle. Air is released by an air relief valve, and throttling is done with a gate or plug valve.",
    },
    {
      id: "wc1-010",
      topicId: "safety",
      prompt: "The correct order for testing the atmosphere before a confined space entry is:",
      choices: [
        { id: "a", text: "Toxic gases, oxygen, flammables" },
        { id: "b", text: "Oxygen, flammable gases, toxic gases" },
        { id: "c", text: "Flammables, toxic gases, oxygen" },
        { id: "d", text: "Any order is acceptable" },
      ],
      correctChoiceId: "b",
      explanation:
        "Oxygen is tested first because most flammable-gas sensors need enough oxygen to read correctly. Then flammables, then toxics such as hydrogen sulfide and carbon monoxide.",
    },
    {
      id: "wc1-011",
      topicId: "safety",
      prompt: "When working in a street, the first line of defense for a crew is:",
      choices: [
        { id: "a", text: "A properly set up traffic control zone with signs, cones, and a buffer" },
        { id: "b", text: "Working quickly to reduce time on the road" },
        { id: "c", text: "Bright clothing only" },
        { id: "d", text: "Parking the truck around the corner" },
      ],
      correctChoiceId: "a",
      explanation:
        "Traffic control that warns drivers and physically separates them from the work area protects the crew. High-visibility clothing is required too, but it is not a substitute for a controlled zone.",
    },
    {
      id: "wc1-012",
      topicId: "math",
      prompt:
        "A sewer drops 2.0 feet over a length of 400 feet. What is the slope as a percentage?",
      choices: [
        { id: "a", text: "0.05%" },
        { id: "b", text: "0.5%" },
        { id: "c", text: "2.0%" },
        { id: "d", text: "5.0%" },
      ],
      correctChoiceId: "b",
      explanation:
        "Slope = drop ÷ run × 100 = 2.0 ÷ 400 × 100 = 0.5%. Many exam questions also express this as 0.005 ft/ft.",
    },
    {
      id: "wc1-013",
      topicId: "math",
      prompt:
        "How many gallons does a 12-inch diameter pipe hold per 100 feet of length? (Use 0.785; 7.48 gal/ft³)",
      choices: [
        { id: "a", text: "58.7 gallons" },
        { id: "b", text: "587 gallons" },
        { id: "c", text: "748 gallons" },
        { id: "d", text: "5,872 gallons" },
      ],
      correctChoiceId: "b",
      explanation:
        "Convert 12 inches to 1 foot. Volume = 0.785 × 1² × 100 = 78.5 ft³. Times 7.48 = 587 gallons. Leaving the diameter in inches is the trap in answer D.",
    },
    {
      id: "wc1-014",
      topicId: "math",
      prompt:
        "A wet well is 10 ft by 10 ft. With the influent valve closed, the level drops 2 ft in 4 minutes while one pump runs. What is the pump rate in gpm? (7.48 gal/ft³)",
      choices: [
        { id: "a", text: "50 gpm" },
        { id: "b", text: "200 gpm" },
        { id: "c", text: "374 gpm" },
        { id: "d", text: "1,496 gpm" },
      ],
      correctChoiceId: "c",
      explanation:
        "Volume pumped = 10 × 10 × 2 = 200 ft³ = 200 × 7.48 = 1,496 gallons. Divide by 4 minutes: 374 gpm. Answer D forgets to divide by time; answer A forgets the 7.48.",
    },
  ],
};
