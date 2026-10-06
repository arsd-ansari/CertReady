/**
 * Commercial Driver's License (CDL) knowledge-test practice — CertReady.
 *
 * Original practice material covering General Knowledge, Air Brakes, Combination
 * Vehicles, and the main endorsements (Hazmat, Tanker, Passenger). NOT actual
 * DMV / FMCSA exam items. Knowledge tests are based on the federal CDL manual
 * and administered by each state's licensing agency.
 */

import type { SeedCategory, SeedExam, SeedQuestion, SeedSource } from "./epa-608";
import { moreCdlQuestions } from "./cdl-more";

const sources: SeedSource[] = [
  {
    key: "fmcsa-cdl",
    title: "Commercial Driver's License (CDL)",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
  },
  {
    key: "fmcsa-hos",
    title: "Hours of Service of Drivers",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations",
  },
  {
    key: "fmcsa-cargo",
    title: "Cargo Securement Rules",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/regulations/cargo-securement/cargo-securement-rules",
  },
  {
    key: "phmsa-hazmat",
    title: "Hazardous Materials Regulations (49 CFR)",
    publisher: "Pipeline and Hazardous Materials Safety Administration",
    url: "https://www.phmsa.dot.gov/hazmat",
  },
];

const categories: SeedCategory[] = [
  {
    slug: "general-knowledge",
    name: "General Knowledge",
    description:
      "Required for every CDL class: vehicle control, space, cargo, hours of service, inspections, emergencies and the Class A / B / C split.",
    longDescription: `Every CDL applicant sits **General Knowledge** — typically **50 questions**, **80%** to pass (40 correct in most states).

This is the bank for Class A, Class B and Class C. It is not a substitute for Air Brakes or Combination Vehicles if your vehicle needs those tests.

Topics that show up on almost every sitting:

- Class A vs Class B vs Class C (GVWR / GCWR and what you may tow)
- Space management, following distance, mountain and night driving
- Pre-trip and en-route inspections, cargo checks (first 50 miles, then 3 hours / 150 miles)
- Hours of service (11-hour / 14-hour / 30-minute break / 60–70 hour)
- Railroad crossings, emergency triangles, fires and skids
- Alcohol (0.04), handheld phones, disqualification

Start here, then add [Air Brakes](/exams/cdl/air-brakes) and [Combination Vehicles](/exams/cdl/combination-vehicles) if you are going for Class A. Compare classes in [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b).`,
    weight: 40,
    seoTitle: "CDL General Knowledge Practice Test — Free Questions",
    seoDescription:
      "Free CDL General Knowledge practice questions: space, cargo, hours of service, inspections, Class A vs B vs C, and emergencies. Original items with explanations.",
  },
  {
    slug: "air-brakes",
    name: "Air Brakes",
    description:
      "Required if you will drive a vehicle with air brakes. Dual air systems, lag, slack adjusters, spring brakes, ABS and leak tests.",
    longDescription: `If the truck you will drive has **air brakes**, you must pass the Air Brakes knowledge test — typically **25 questions**, **80%**. Skip it and your CDL is restricted: no air-brake vehicles.

Numbers and parts to lock in:

- Dual air systems (primary and secondary)
- Low-air warning at or above **60 psi**
- Spring (parking / emergency) brakes apply as air is lost
- Extra **brake lag** versus hydraulic brakes
- Slack-adjuster travel, tank drains, ABS (do not pump)
- Applied leakage: **2 psi / minute** single vehicle, **3 psi / minute** combination

This section is independent of class. A Class B dump truck with air brakes still needs it. Practice: [Air Brakes](/exams/cdl/air-brakes).`,
    weight: 20,
    seoTitle: "CDL Air Brakes Practice Test — Free Questions",
    seoDescription:
      "Free CDL Air Brakes practice: dual systems, 60 psi warning, spring brakes, slack adjusters, ABS and leakage tests. Original questions with explanations.",
  },
  {
    slug: "combination-vehicles",
    name: "Combination Vehicles",
    description:
      "Required for Class A: coupling, off-tracking, jackknife, trailer swing and air-line / fifth-wheel checks.",
    longDescription: `**Combination Vehicles** is the Class A knowledge test — typically **20 questions**, **80%**. You sit it if you will pull a trailer of **10,001 lb or more** behind a 26,001+ lb power unit.

What this section is for:

- Off-tracking and wide turns
- Jackknife vs trailer swing vs rearward amplification
- Fifth wheel, kingpin, locking jaws, glad hands
- Service line vs emergency (supply) line
- Why you never park with the trailer hand valve

Class B drivers do **not** take this test. See [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b). Doubles/triples is a separate **T** endorsement on top of this.`,
    weight: 15,
    seoTitle: "CDL Combination Vehicles Practice Test — Class A",
    seoDescription:
      "Free CDL Combination Vehicles (Class A) practice: coupling, off-tracking, jackknife, fifth wheel and air lines. Original questions with explanations.",
  },
  {
    slug: "hazardous-materials",
    name: "Hazardous Materials (H)",
    description:
      "H endorsement: shipping papers, placards, hazard classes, loading and what to do in a leak or fire.",
    longDescription: `The **H** endorsement is a separate knowledge test — typically **30 questions**, **80%** — plus a TSA security threat assessment before the endorsement is printed.

You need it to haul **placarded** hazardous materials. Tank + hazmat together is often sold as **X** (tanker + H).

Expect:

- Nine DOT hazard classes
- Shipping papers within reach (pouch or driver's door)
- Placards on all four sides
- No flares with flammables / explosives — use triangles
- Route restrictions and never driving a leaking load

This is not a substitute for employer HAZMAT training. Practice: [Hazardous Materials](/exams/cdl/hazardous-materials).`,
    weight: 12,
    seoTitle: "CDL Hazmat Endorsement Practice Test — H",
    seoDescription:
      "Free CDL hazardous materials (H) endorsement practice: placards, shipping papers, hazard classes and emergency rules. Original questions with explanations.",
  },
  {
    slug: "tanker",
    name: "Tanker (N)",
    description:
      "N endorsement: liquid surge, baffles vs smoothbore, outage and high center of gravity.",
    longDescription: `The **N** (tank vehicle) endorsement is typically **20 questions**, **80%**. You need it for tanks that carry liquid or gas in bulk — not every tank-shaped body, but the ones the state lists as tank vehicles.

The test is about **how liquid moves**:

- Forward / back / side surge
- Baffles cut front-to-back surge; they do little for side-to-side
- Smoothbore (unbaffled) tanks are the worst for surge
- Outage (expansion space) and a high center of gravity
- Smooth steering, early braking, no sudden lane changes

Hauling placarded product in a tank usually needs **H and N** (often **X**). Practice: [Tanker](/exams/cdl/tanker).`,
    weight: 8,
    seoTitle: "CDL Tanker Endorsement Practice Test — N",
    seoDescription:
      "Free CDL tanker (N) endorsement practice: liquid surge, baffles, outage and high center of gravity. Original questions with explanations.",
  },
  {
    slug: "passenger",
    name: "Passenger (P)",
    description:
      "P endorsement: buses designed for 16 or more including the driver — railroad stops, evacuation and passenger safety.",
    longDescription: `The **P** endorsement is typically **20 questions**, **80%**, plus a passenger-vehicle skills test. You need it for a vehicle **designed to transport 16 or more persons including the driver**.

School bus work also needs the **S** endorsement (not in this bank yet) — **S** requires **P**.

Focus:

- Railroad and drawbridge stops (15–50 feet from the nearest rail)
- Evacuation, emergency exits, standee line
- Secure baggage, no unnecessary talk while moving
- Never refuel with riders aboard unless the situation forces it

Practice: [Passenger](/exams/cdl/passenger).`,
    weight: 5,
    seoTitle: "CDL Passenger Endorsement Practice Test — P",
    seoDescription:
      "Free CDL passenger (P) endorsement practice: railroad crossings, evacuation, standees and bus safety. Original questions with explanations.",
  },
];

const G = "general-knowledge";

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
  q(
    G,
    "A Class A CDL is required when the combination's gross combination weight rating (GCWR) is 26,001 lb or more AND the towed unit is rated at:",
    ["Any weight", "10,001 lb or more", "26,001 lb or more", "15 passengers or more"],
    1,
    "Class A is combination vehicles: GCWR of 26,001 lb or more, with a towed unit of 10,001 lb GVWR or more. A heavy tractor pulling a light trailer under 10,001 lb is not Class A. Passenger count is a Class C trigger, not Class A.",
    { difficulty: "EASY", tags: ["classes"], source: "fmcsa-cdl" },
  ),
  q(
    G,
    "A single vehicle with a GVWR of 26,001 lb or more, which may tow a unit under 10,001 lb, requires which CDL class?",
    ["Class A", "Class B", "Class C", "No CDL — a regular license is enough"],
    1,
    "Class B covers a single vehicle at 26,001 lb GVWR or more. You may tow a trailer under 10,001 lb GVWR. If the trailer is 10,001 lb or more, the combination becomes Class A.",
    { difficulty: "EASY", tags: ["classes"] },
  ),
  q(
    G,
    "Which of these is a Class C CDL situation (vehicle is not Class A or B)?",
    [
      "Any pickup that tows a boat",
      "A vehicle designed to transport 16 or more persons including the driver, or one that requires hazmat placards",
      "Any vehicle over 10,000 lb",
      "Farm plates under 26,000 lb",
    ],
    1,
    "Class C is for vehicles that are not Class A or B but are designed for 16 or more including the driver, or that haul placarded hazardous materials. Weight alone under the A/B thresholds is not enough.",
    { tags: ["classes"] },
  ),
  q(
    G,
    "Under 40 mph, a common CDL following-distance rule is one second of gap for every:",
    ["10 feet of vehicle length", "10 mph of speed", "Axle on the truck", "Trailer you pull"],
    0,
    "A standard manual rule is at least one second for each 10 feet of vehicle length at speeds under 40 mph. Above 40 mph, add another second. Heavy vehicles need more space than a car's two-second rule.",
    { tags: ["space"] },
  ),
  q(
    G,
    "After starting a trip, cargo and load-securement devices must be rechecked within the first:",
    ["10 miles", "50 miles", "200 miles", "Only at the destination"],
    1,
    "Inspect cargo before you roll, again within the first 50 miles, then every 3 hours or 150 miles (whichever comes first) and after every break. Loads shift; the first 50 miles is when that shows up.",
    { tags: ["cargo"], source: "fmcsa-cargo" },
  ),
  q(
    G,
    "After the first 50-mile cargo check, you must recheck the load at least every:",
    ["Hour or 50 miles", "3 hours or 150 miles, whichever comes first", "500 miles", "Only if you hit a bump"],
    1,
    "En-route cargo checks are every 3 hours or 150 miles, whichever comes first, and after every rest stop. Skipping them is how unsecured freight leaves the trailer.",
    { tags: ["cargo"], source: "fmcsa-cargo" },
  ),
  q(
    G,
    "When a CDL driver must stop at a railroad crossing, the stop should be made:",
    [
      "With the bumper on the nearest rail",
      "Between 15 and 50 feet from the nearest rail",
      "100 feet from the crossing",
      "Only if a train is visible",
    ],
    1,
    "Required stops (placarded hazmat, passengers, and some other vehicles) are 15 to 50 feet from the nearest rail. Stopping on the tracks or creeping onto them is how crossings kill drivers.",
    { tags: ["railroad"] },
  ),
  q(
    G,
    "For CDL holders operating a commercial motor vehicle, the blood-alcohol concentration (BAC) limit is:",
    ["0.08%", "0.04%", "0.10%", "0.00% only for passenger endorsements"],
    1,
    "A CDL holder is prohibited from operating a CMV at 0.04% BAC or higher. 0.08% is the typical non-CDL limit and is not the CMV standard. Any detectable alcohol can still put you out of service for 24 hours.",
    { difficulty: "EASY", tags: ["alcohol"], source: "fmcsa-cdl" },
  ),
  q(
    G,
    "After 10 consecutive hours off duty, a property-carrying interstate driver may drive a maximum of how many hours?",
    ["8 hours", "11 hours", "14 hours", "16 hours"],
    1,
    "The 11-hour driving rule: after 10 consecutive hours off duty you may drive up to 11 hours. That driving must also fit inside the 14-hour on-duty window. 14 hours is not extra drive time.",
    { tags: ["hours-of-service"], source: "fmcsa-hos" },
  ),
  q(
    G,
    "The 14-hour rule means a property-carrying driver may not drive beyond the 14th consecutive hour after coming on duty, even if:",
    [
      "They still have unused 11-hour driving time",
      "The dispatcher says the load is late",
      "They took several short breaks",
      "All of the above",
    ],
    3,
    "The 14-hour window is a hard stop. Unused 11-hour drive time, extra coffee breaks and a late load do not extend it. Only 10 consecutive hours off duty (or a qualifying sleeper split) restarts it.",
    { tags: ["hours-of-service"], source: "fmcsa-hos" },
  ),
  q(
    G,
    "A property-carrying driver must take a 30-minute break after how much cumulative driving?",
    ["4 hours", "6 hours", "8 hours", "11 hours"],
    2,
    "You may not drive if 8 hours or more have passed since the end of your last off-duty or sleeper-berth period of at least 30 minutes. The break is about driving time, not a suggestion to stretch when you feel like it.",
    { tags: ["hours-of-service"], source: "fmcsa-hos" },
  ),
  q(
    G,
    "Before a long downgrade, you should:",
    [
      "Shift to a high gear so the engine revs less",
      "Select a safe low gear before you start down and use engine braking",
      "Coast in neutral to save fuel",
      "Ride the service brake lightly the whole way",
    ],
    1,
    "Pick the low gear before the hill, not halfway down. Coasting in neutral or riding the service brakes overheats them (brake fade). Engine braking in a low gear is what keeps the truck under control.",
    { tags: ["mountain"] },
  ),
  q(
    G,
    "If you start to hydroplane, the first thing to do is:",
    [
      "Steer hard toward the shoulder",
      "Brake firmly and hold",
      "Ease off the accelerator and avoid sudden steering or braking",
      "Downshift immediately to first gear",
    ],
    2,
    "Hydroplaning means the tires are riding on water, not pavement. Sudden brake or steer inputs make a skid worse. Ease off the throttle and keep the wheel straight until the tires grip again.",
    { tags: ["weather"] },
  ),
  q(
    G,
    "A runaway-truck ramp is for:",
    [
      "Parking to check maps",
      "A truck that has lost braking on a downgrade",
      "Weigh-station overflow",
      "Only vehicles with a tanker endorsement",
    ],
    1,
    "Escape ramps (gravel arrester beds or similar) are built to stop a truck that cannot brake on a downgrade. They are not rest areas. Using one is better than a curve at the bottom.",
    { difficulty: "EASY", tags: ["mountain"] },
  ),
  q(
    G,
    "If you stop on the shoulder of a two-way undivided road at night, emergency triangles should be placed approximately:",
    [
      "All three behind the truck within 10 feet",
      "10 feet and 100 feet toward approaching traffic, plus 100 feet in the opposite direction of traffic",
      "500 feet in each direction only",
      "On the roof of the cab",
    ],
    1,
    "Standard placement on a two-way road: one device about 10 feet from the rear toward traffic, one about 100 feet toward traffic, and one about 100 feet in front of the vehicle toward oncoming traffic. Divided highways use a different 10 / 100 / 200-foot pattern to the rear.",
    { tags: ["emergency"] },
  ),
  q(
    G,
    "If someone is tailgating you in a CMV, the safest response is usually to:",
    [
      "Brake-check them so they back off",
      "Increase the space in front of you so you can stop smoothly",
      "Move into the left lane and slow to 20 mph",
      "Flash your brake lights continuously",
    ],
    1,
    "You cannot control the driver behind you. Extra space ahead lets you avoid hard braking that would turn a tailgater into a rear-end crash. Brake-checking is how fights and wrecks start.",
    { difficulty: "EASY", tags: ["space"] },
  ),
  q(
    G,
    "Using an engine retarder (Jake brake) on a wet or icy road can:",
    [
      "Always shorten stopping distance safely",
      "Cause the drive wheels to lose traction and skid",
      "Lock only the trailer brakes",
      "Warm the tires so they grip better",
    ],
    1,
    "Retarders slow the drive wheels. On a slick surface that extra drag can break traction and start a tractor jackknife. Many manuals say to turn the retarder off when the road is wet, snowy or icy.",
    { tags: ["brakes", "weather"] },
  ),
  q(
    G,
    "A CDL driver operating a CMV may use a handheld mobile phone:",
    [
      "Anytime, if they have a speakerphone",
      "Only at red lights",
      "Not for a call that requires holding the phone — hands-free that is mounted and one-touch is the legal path",
      "Only for dispatch",
    ],
    2,
    "Federal rules ban holding a phone to make a call in a CMV. A mounted, speaker, one-button setup can be legal; reaching for a sliding phone is not. Texting while driving a CMV is separately banned.",
    { tags: ["distraction"] },
  ),
  q(
    G,
    "To drive a commercial motor vehicle in interstate commerce, a driver must generally be at least:",
    ["16", "18", "21", "25"],
    2,
    "Interstate CMV operation requires age 21. Many states allow an intrastate CDL at 18, which does not authorize crossing state lines. Age 25 is an insurance preference, not the federal CDL floor.",
    { difficulty: "EASY", tags: ["eligibility"] },
  ),
  q(
    G,
    "Gross vehicle weight rating (GVWR) is:",
    [
      "Whatever the truck weighs on the scale today",
      "The maximum weight specified by the manufacturer for that vehicle (or combination, for GCWR)",
      "The weight of the freight only",
      "Always 80,000 lb",
    ],
    1,
    "GVWR (and GCWR for combinations) is the manufacturer's rating on the data plate — not today's scale weight. CDL class is based on those ratings, even if you are running empty.",
    { tags: ["classes"] },
  ),
  q(
    G,
    "On a curve you should:",
    [
      "Brake hard in the middle of the curve",
      "Slow to a safe speed before the curve, then accelerate slightly through it if traction allows",
      "Shift to neutral so the drive wheels roll freely",
      "Always use high beams",
    ],
    1,
    "Brake before the curve. Braking in the curve adds a sideways force that can roll a high CG vehicle. A light throttle through the curve can help stabilize, but speed is set before you turn.",
    { tags: ["space"] },
  ),
  q(
    G,
    "Convex (spot) mirrors:",
    [
      "Show a wider field but make things look smaller and farther away",
      "Are a legal substitute for looking over your shoulder",
      "Eliminate the right-side blind spot",
      "Are only required on buses",
    ],
    0,
    "Convex mirrors give a wide view at the cost of distance judgment — objects are closer than they appear. You still have blind spots; a lane-change still needs the turn signal, mirrors, and a check of the next lane.",
    { tags: ["mirrors"] },
  ),
  q(
    G,
    "A fire in the cargo area of a trailer is usually best handled by:",
    [
      "Driving faster to blow it out",
      "Opening the doors wide so you can aim an extinguisher at the middle of the load",
      "Getting off the road, keeping people away, and using an extinguisher only if you can do so without making the fire worse — call the fire department",
      "Pouring drinking water on it from the cab",
    ],
    2,
    "Opening a trailer can dump oxygen onto a smoldering load. The priority is a safe stop, keeping bystanders back, and professional firefighters. A 5-B:C extinguisher is for small engine or electrical fires, not a cargo inferno.",
    { tags: ["emergency"] },
  ),
  q(
    G,
    "If the vehicle starts to skid, you should:",
    [
      "Steer in the direction you want the vehicle to go and avoid over-braking",
      "Turn the wheel the opposite way and floor the accelerator",
      "Apply the parking brake immediately",
      "Shift to reverse",
    ],
    0,
    "Steer toward the path you want (into the skid as the rear slides), ease off the brake if you are locked up, and countersteer as the vehicle comes back. Parking brake or reverse makes a jackknife worse.",
    { tags: ["skid"] },
  ),
  q(
    G,
    "On a vehicle with ABS, the correct panic-stop technique is:",
    [
      "Pump the pedal so the ABS light blinks",
      "Brake firmly and steer — do not pump the pedal",
      "Use only the trailer hand valve",
      "Turn ABS off with the key",
    ],
    1,
    "ABS already pulses the brakes. Pumping delays the system. Push hard, hold, and steer around the hazard. The ABS lamp at startup should go off; if it stays on, you still have brakes but not ABS.",
    { tags: ["abs", "brakes"] },
  ),
  q(
    G,
    "Cargo must be blocked and braced so that it cannot:",
    [
      "Be seen from the cab",
      "Shift forward, backward or sideways in a hard stop or turn",
      "Touch the trailer walls at all",
      "Be unloaded without a forklift",
    ],
    1,
    "Securement is about stopping movement in every direction during braking and cornering. A load that looks neat but can slide is not secured. Walls are not a cargo-securement system by themselves.",
    { difficulty: "EASY", tags: ["cargo"], source: "fmcsa-cargo" },
  ),
  q(
    G,
    "An empty tractor-trailer often:",
    [
      "Stops in a shorter distance than a loaded one and rides more smoothly",
      "Has less traction, can bounce, and may need more distance to stop than drivers expect",
      "Is exempt from CDL rules",
      "Cannot hydroplane",
    ],
    1,
    "Empty or lightly loaded combinations can bounce the drive axles off the pavement, lock brakes more easily, and still take a long distance to stop. Do not assume empty means easy.",
    { tags: ["space"] },
  ),
  q(
    G,
    "The 60-hour / 7-day or 70-hour / 8-day limit is:",
    [
      "How long a trailer may sit at a shipper",
      "The weekly on-duty cap for interstate property-carrying drivers",
      "The maximum sleeper-berth time",
      "Only for passenger buses",
    ],
    1,
    "On-duty hours (driving plus other work) are capped at 60 hours in 7 consecutive days or 70 hours in 8 consecutive days, depending on the carrier's schedule. A 34-hour restart can reset that clock when the carrier uses it.",
    { tags: ["hours-of-service"], source: "fmcsa-hos" },
  ),
  q(
    G,
    "A pre-trip inspection is required:",
    [
      "Only on the first day you get the CDL",
      "Before driving, to catch defects that would put the vehicle out of service",
      "Only if the truck is older than 10 years",
      "Only for tankers",
    ],
    1,
    "You are responsible for the vehicle every time you drive it. Walk-around, lights, tires, brakes, coupling, leaks and cargo are not a one-time test-day ritual. Out-of-service items mean you do not leave.",
    { difficulty: "EASY", tags: ["inspection"] },
  ),
  q(
    G,
    "CDL disqualification for one year (first offense, typically) can result from:",
    [
      "A parking ticket in a personal car",
      "DUI / DWI, leaving the scene of a crash, or a felony involving a CMV",
      "A single speeding ticket 6 mph over",
      "Forgetting a logbook at home",
    ],
    1,
    "Major offenses — alcohol, refusing a test, leaving the scene, using a CMV in a felony — trigger a one-year CDL disqualification (longer if hazmat was involved). Ordinary parking tickets do not.",
    { tags: ["disqualification"] },
  ),
  q(
    G,
    "Implied consent for a CDL holder means:",
    [
      "Dispatchers may open your ELD anytime",
      "By driving, you have agreed to alcohol and drug testing; refusal is treated like a failure",
      "You must let shippers ride in the cab",
      "You consent to extra axles on the trailer",
    ],
    1,
    "Refusing a lawful alcohol or drug test is not a workaround. It is treated as a positive and can disqualify the CDL the same way a DUI does.",
    { tags: ["alcohol"] },
  ),
  q(
    G,
    "At night, high beams are for open road. You should dim to low beams when you are within about:",
    ["50 feet of another vehicle", "500 feet of an oncoming vehicle or when following closely", "1 mile of a town", "Never — CMVs stay on high beams"],
    1,
    "Dim for oncoming traffic (about 500 feet in many manuals) and when you are following so you do not light up the other driver's mirrors. High beams still help when the road is empty.",
    { tags: ["night"] },
  ),
  q(
    G,
    "The safest place for a fire extinguisher and spare fuses on a CMV is:",
    [
      "Charged, mounted and easy to reach — not buried under chains",
      "In the trailer with the freight",
      "At the terminal; trucks do not carry them",
      "Only required on buses",
    ],
    0,
    "Equipment that is required has to be usable. An empty extinguisher or one you cannot grab in a cab fire is the same as not having it. Trucks and buses both have required emergency equipment lists.",
    { difficulty: "EASY", tags: ["inspection"] },
  ),
  q(
    G,
    "When you must leave the paved roadway to avoid a crash, you should generally:",
    [
      "Brake as hard as possible and jerk the wheel back onto the pavement",
      "Keep the wheel straight, ease off the throttle, and return to the road at a shallow angle when it is safe",
      "Hit the ditch at 90 degrees",
      "Shift to reverse",
    ],
    1,
    "A sharp pull back onto the pavement can roll the truck or throw you into the next lane. Hold a straight line on the shoulder, slow gradually, then ease back with a shallow angle.",
    { tags: ["emergency"] },
  ),
  q(
    G,
    "Texting while driving a CMV is:",
    [
      "Allowed under 30 mph",
      "Allowed with a passenger holding the phone",
      "Prohibited",
      "Allowed on private property only, including public ramps",
    ],
    2,
    "Federal rules prohibit texting while operating a CMV. There is no 30-mph exception. Pull off the road and stop if you must read or send a message.",
    { difficulty: "EASY", tags: ["distraction"] },
  ),
];

export const cdl: SeedExam = {
  slug: "cdl",
  title: "Commercial Driver's License (CDL) Knowledge Tests",
  shortTitle: "CDL",
  summary:
    "Federal knowledge tests for Class A, Class B and Class C: General Knowledge, Air Brakes, Combination Vehicles, plus Hazmat, Tanker and Passenger endorsements.",
  certifyingBody: "State driver-licensing agencies (federal CDL standards under FMCSA)",
  categorySlug: "commercial-driving",
  scope: "FEDERAL",
  states: [],
  difficulty: "MEDIUM",
  isFeatured: true,
  realQuestionCount: 50,
  realTimeMinutes: undefined,
  passingScoreText: "80% on each knowledge test (typically 40 of 50 on General Knowledge)",
  mockQuestionCount: 50,
  mockTimeMinutes: 50,
  freeQuestionLimit: 10,
  seoTitle: "CDL Practice Test — Free General Knowledge, Air Brakes & Endorsements",
  seoDescription:
    "Free CDL practice test with original questions: General Knowledge, Air Brakes, Combination Vehicles, Hazmat, Tanker and Passenger. 80% passing-score guide plus CA, TX, FL and GA pages.",
  overview: `## What the CDL knowledge tests are

A Commercial Driver's License is issued by **your state**, to **federal** standards. The written tests come from the same core manual in every state: General Knowledge for every class, then extra tests for air brakes, combination vehicles and endorsements.

| Test | Who sits it | Typical size | Pass |
| --- | --- | --- | --- |
| General Knowledge | Every CDL | 50 questions | 80% |
| Air Brakes | Any air-brake vehicle | 25 | 80% |
| Combination Vehicles | Class A | 20 | 80% |
| Hazmat (H) | Placarded hazardous materials | 30 | 80% |
| Tanker (N) | Tank vehicles | 20 | 80% |
| Passenger (P) | 16+ including the driver | 20 | 80% |

You also need a **Commercial Learner's Permit (CLP)** before the skills test. Read [CDL permit](/exams/cdl/guides/cdl-permit) and [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b). Passing is **80% on each test**, not an average — [passing score](/exams/cdl/guides/passing-score).

State pages (same federal bank, local booking): [California](/exams/cdl/guides/california), [Texas](/exams/cdl/guides/texas), [Florida](/exams/cdl/guides/florida), [Georgia](/exams/cdl/guides/georgia).

## How CertReady helps

Questions are original practice material on the same topics the knowledge tests use — space and cargo, hours of service, air-brake parts, coupling, placards, surge and passenger stops. Each item has an explanation. Start with the [free CDL practice test](/exams/cdl/practice-test) or a timed [mock exam](/mock/cdl).

CertReady is not a trucking school, not a state DMV, and not FMCSA. Passing a mock here does not issue a CDL.`,
  whoShouldTake: `- Anyone sitting CDL **General Knowledge** for Class A, B or C
- Class A applicants who also need **Air Brakes** and **Combination Vehicles**
- Drivers adding **H** (hazmat), **N** (tanker) or **P** (passenger)
- CLP holders waiting out the permit period before the skills test
- Drivers transferring a CDL or refreshing after time off the road

You still take the **skills test** (pre-trip, basic control, road) at the state after the knowledge tests. This bank is the written part only.

Interstate driving generally requires age **21** and a valid DOT medical examiner's certificate. Intrastate Class B at 18 is a state rule, not a federal interstate CDL. School bus (**S**) and doubles/triples (**T**) are not in this bank yet.`,
  requirements: `## Eligibility (typical)

- Valid auto license, proof of identity and residency as your state requires
- **CDL medical certificate** (DOT physical) on file with the state for most classes
- Pass the knowledge test(s) for the class and endorsements you want
- Hold a **CLP** for the waiting period (often **14 days**) before the skills test
- **21** for interstate commerce; many states allow **18** for intrastate only
- **H** endorsement also requires a TSA security threat assessment

Always confirm current rules with your state. Federal standards are the floor; California, Texas, Florida and Georgia each book the exam at their own DMV / DPS / DHSMV / DDS.

## Format

- Closed-book, multiple choice, one test at a time
- **80%** on each test. Fail Air Brakes and you can still receive a CDL **with an air-brake restriction**
- Fail General Knowledge and you do not get the permit
- Fees, languages, and whether you can retest the same day are **state** decisions

## After you pass the written tests

The state prints a **CLP**. You practice with a qualified CDL holder in the passenger seat, then schedule the skills test in a representative vehicle. Details: [CDL permit](/exams/cdl/guides/cdl-permit).

Official starting point: [FMCSA CDL](https://www.fmcsa.dot.gov/registration/commercial-drivers-license).`,
  studyGuide: `## Numbers you must memorize

| Topic | Value |
| --- | --- |
| General Knowledge pass | **80%** (typically 40 of 50) |
| Air Brakes / Combination / endorsements pass | **80%** on each test |
| Class A | GCWR ≥ 26,001 lb and towed unit ≥ 10,001 lb |
| Class B | Single vehicle ≥ 26,001 lb GVWR |
| Class C | 16+ including driver, or placarded hazmat, and not A/B |
| CMV BAC | **0.04%** |
| Interstate minimum age | **21** |
| Following distance (under 40 mph) | **1 second per 10 feet** of length |
| First cargo recheck | **50 miles**, then every **3 hours or 150 miles** |
| Railroad stop | **15–50 feet** from the nearest rail |
| Driving time after 10 hours off | **11 hours** inside a **14-hour** window |
| Break | **30 minutes** after **8 hours** driving |
| Low-air warning | At or before **60 psi** |
| Applied leakage | **2 psi/min** single, **3 psi/min** combination |
| Triangle spacing (two-way) | About **10 ft / 100 ft / 100 ft** |

## Which tests to book

- Every CDL: [General Knowledge](/exams/cdl/general-knowledge)
- Air-brake truck (almost all Class A, many B): [Air Brakes](/exams/cdl/air-brakes)
- Class A trailer: [Combination Vehicles](/exams/cdl/combination-vehicles)
- Placarded freight: [Hazmat](/exams/cdl/hazardous-materials)
- Liquid/gas tank: [Tanker](/exams/cdl/tanker)
- Bus 16+: [Passenger](/exams/cdl/passenger)

Class comparison: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b). Scoring: [80% passing score](/exams/cdl/guides/passing-score). Permit wait: [CDL permit](/exams/cdl/guides/cdl-permit).

## Study plan (two weeks)

1. **Days 1–4 — General Knowledge.** Classes, space, cargo, HOS, railroad, alcohol. Drill until 85%+.
2. **Days 5–7 — Air Brakes.** Dual system, 60 psi, spring brakes, lag, slack adjusters, leakage.
3. **Days 8–10 — Combination** (Class A) and any endorsement you need.
4. **Days 11–14 — Timed mocks.** 50 questions / 50 minutes. Review every miss on the dashboard.

State booking: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).`,
  faq: [
    {
      question: "How many questions are on the CDL General Knowledge test?",
      answer:
        "Most states use 50 multiple-choice questions and require 80% (40 correct). Air Brakes is typically 25, Combination Vehicles 20, and endorsements 20–30. Confirm the count with your state, because a few use slightly different banks.",
    },
    {
      question: "What is the CDL passing score?",
      answer:
        "80% on each knowledge test, scored separately. A high General Knowledge score does not save a failed Air Brakes test. Failed Air Brakes usually means an air-brake restriction on the license.",
    },
    {
      question: "What is the difference between Class A and Class B?",
      answer:
        "Class A is a combination with GCWR of 26,001 lb or more and a trailer of 10,001 lb or more. Class B is a single vehicle of 26,001 lb or more (you may tow under 10,001 lb). Class A requires the Combination Vehicles test.",
    },
    {
      question: "Do I need a CDL permit before the road test?",
      answer:
        "Yes. After you pass the knowledge tests the state issues a Commercial Learner's Permit. You must hold it for a waiting period (often 14 days) and practice with a qualified CDL driver before the skills test.",
    },
    {
      question: "Are CDL tests the same in every state?",
      answer:
        "Knowledge tests follow the federal CDL manual, so the topics are the same. You still book at your state agency, pay that state's fee, and may see extra state questions. Skills tests use a representative vehicle in that state.",
    },
    {
      question: "Does CertReady issue a CDL?",
      answer:
        "No. CertReady is independent practice. Only your state driver-licensing agency can issue a CLP or CDL. We are not affiliated with FMCSA or any DMV.",
    },
    {
      question: "Are these the real DMV questions?",
      answer:
        "No. All questions are original practice material written to cover the same topics as the federal knowledge tests. They are not copied from any official exam.",
    },
    {
      question: "What endorsements does CertReady cover?",
      answer:
        "Hazmat (H), Tanker (N) and Passenger (P), plus Air Brakes and Combination Vehicles. Doubles/triples (T) and School Bus (S) are not in the bank yet. H also requires a TSA background check.",
    },
    {
      question: "How old do I have to be for a CDL?",
      answer:
        "21 to drive a CMV across state lines. Many states issue an intrastate CDL at 18, which does not authorize interstate commerce.",
    },
  ],
  officialResources: [
    {
      label: "FMCSA — Commercial Driver's License",
      url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
      description: "Federal CDL standards, classes and disqualifications.",
    },
    {
      label: "FMCSA — Hours of Service",
      url: "https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations",
      description: "11-hour, 14-hour, 30-minute break and 60/70-hour rules.",
    },
    {
      label: "California DMV — CDL",
      url: "https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-licenses-cdl/",
    },
    {
      label: "Texas DPS — CDL",
      url: "https://www.dps.texas.gov/section/driver-license/commercial-driver-license",
    },
    {
      label: "Florida DHSMV — CMV drivers",
      url: "https://www.flhsmv.gov/driver-licenses-id-cards/commercial-motor-vehicle-drivers/",
    },
    {
      label: "Georgia DDS — CDL",
      url: "https://dds.georgia.gov/cdl",
    },
  ],
  categories,
  sources,
  questions: [...questions, ...moreCdlQuestions],
};
