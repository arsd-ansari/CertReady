/** Long-form SEO guides keyed by exam slug. Content is original study material, not official exam text. */

import { CDL_GUIDES } from "./cdl-guides";
import type { ExamGuide, ExamGuideFaq } from "./exam-guide-types";

export type { ExamGuide, ExamGuideFaq };

export const EXAM_GUIDES: Record<string, ExamGuide[]> = {
  cdl: CDL_GUIDES,
  "epa-608": [
    {
      slug: "type-1-vs-type-2",
      title: "EPA 608 Type 1 vs Type 2 vs Type 3",
      seoTitle: "EPA 608 Type 1 vs Type 2 vs Type 3 — Which Certification Do You Need?",
      seoDescription:
        "Clear comparison of EPA 608 Type I (small appliances), Type II (high-pressure) and Type III (low-pressure chillers), plus Universal. See which exam to take and practice each section.",
      intro:
        "The four EPA 608 sections are not four versions of the same test. Type I, Type II and Type III cover different equipment. Pick the wrong type and you are not legal to open the system.",
      markdown: `## The short answer

| Certification | Equipment you may service | Typical job |
| --- | --- | --- |
| **Core + Type I** | Factory-sealed appliances with **5 lb or less** of refrigerant | Domestic refrigerators, window A/C, dehumidifiers, vending machines |
| **Core + Type II** | High- and very-high-pressure appliances that are **not** small appliances or car A/C | Split systems, rooftops, walk-ins, supermarket racks |
| **Core + Type III** | Low-pressure appliances | Centrifugal chillers (R-11, R-123 and similar) |
| **Universal** | All of the above | Core + Type I + Type II + Type III |

Core is required for every type. Passing Core plus one type earns that type. Passing Core plus all three earns **Universal**, which most HVAC/R shops want.

Motor vehicle air conditioning is **Section 609**, not 608. A Type II card does not let you empty a car's A/C system.

## Type I — small appliances

A small appliance is **fully manufactured, charged and hermetically sealed in a factory** with **five pounds or less** of refrigerant.

Field-charged equipment is never Type I, even if the charge is under 5 lb. An 8 lb R-410A split system is Type II.

Numbers Type I hammers:

- Working compressor: recover **90%** or pull **4 in. Hg**
- Dead compressor: recover **80%** or pull **4 in. Hg**
- Passive (system-dependent) recovery: appliances with **15 lb or less** only
- Recovery gear manufactured after **November 15, 1993** must be certified

If you mostly swap refrigerators, window units and vending machines, Type I plus Core is enough. If you also braze on splits, you need Type II.

Practice the [EPA 608 Type 1 practice test](/exams/epa-608/type-1).

## Type II — high-pressure appliances

Type II is the residential and light-commercial HVAC/R section: condensing units, packaged rooftops, refrigeration racks, and very-high-pressure industrial gases such as R-13 / R-23 / R-503.

It is **not** defined by “the pressure feels high.” R-410A is Type II. A window unit with R-410A that left the factory sealed with 2 lb is still Type I.

Numbers Type II hammers:

- Leak-repair program starts at **50 lb** of charge
- Leak-rate thresholds: comfort cooling **10%**, commercial refrigeration **20%**, industrial process **30%**
- Repair clock is typically **30 days** (or mothball / retire)
- Evacuation table (post-11/15/93 equipment): R-22 under 200 lb → 0 in. Hg; R-22 200 lb or more → 10 in. Hg; other high-pressure 200 lb or more → **15 in. Hg**; very-high-pressure → 0 in. Hg
- Recover **liquid first** when you can; never pressurize with oxygen or compressed air

If you install or service split systems, you want Type II. Most techs who take Type II also take Type I and Type III in the same sitting and walk out Universal.

Practice the [EPA 608 Type 2 practice test](/exams/epa-608/type-2).

## Type III — low-pressure appliances

Type III is almost entirely **centrifugal chillers** that operate in a vacuum on the low side (R-11, R-113, R-123 and similar). Air leaks **in**. Purge units exist because of that.

Numbers Type III hammers:

- Leak test: do not exceed about **10 psig**
- Rupture disc: typically **15 psig**
- Major-repair evacuation (post-11/15/93 equipment): **25 mm Hg absolute**
- Charge **vapor first** so water in the tubes does not freeze, then liquid
- Excessive purge run-time means the machine is leaking

A Type II tech is not certified to open a low-pressure chiller. A Type III tech is not certified to recover a split system.

Practice the [EPA 608 Type 3 practice test](/exams/epa-608/type-3).

## Which combination should you book?

- **Appliance repair only** → Core + Type I
- **Residential / light commercial HVAC** → Core + Type I + Type II (add Type III if your shop has chillers)
- **Chiller plant / facilities** → Core + Type III (add Type II if you also own rooftops)
- **Default for employment** → [Universal](/exams/epa-608/guides/universal) (Core + I + II + III)

You can add a type later. Credit for sections you already passed is kept; you retake only the section you need.

## How CertReady maps to the real exam

Each official section is 25 questions, **18 correct (72%)** to pass. CertReady’s mock exam is a 25-question timed mix so you practice that pacing. Drill one type until you are consistently above 80% on that category, then sit a [full mock](/mock/epa-608).

See the [passing score guide](/exams/epa-608/guides/passing-score), [Universal certification](/exams/epa-608/guides/universal), [EPA Section 608](/exams/epa-608/guides/who-needs-certification) and [taking the exam online](/exams/epa-608/guides/certification-online).`,
      faq: [
        {
          question: "Is Type 1 easier than Type 2?",
          answer:
            "Type I is shorter on leak-rate tables, but it still tests exact recovery percentages and the small-appliance definition. Type II is heavier on evacuation levels and the 50 lb leak-repair rule. Technicians fail both by mixing the numbers across types.",
        },
        {
          question: "Do I need Type I if I already have Type II?",
          answer:
            "Yes, if you will open factory-sealed small appliances. Type II does not cover Type I equipment. Universal is the way to stop worrying about the boundary.",
        },
        {
          question: "Can I take Type II without Core?",
          answer:
            "No. Core is required for every 608 type. Most providers sit you for Core and the types you selected in one appointment.",
        },
      ],
    },
    {
      slug: "passing-score",
      title: "EPA 608 Passing Score (72%)",
      seoTitle: "EPA 608 Passing Score — 72% (18 of 25) on Each Section",
      seoDescription:
        "The EPA 608 passing score is 18 of 25 questions (72%) on each section you attempt. How scoring works for Core, Type I, II, III and Universal, plus how to study to that bar.",
      intro:
        "You do not pass EPA 608 with an overall average. Each section is graded on its own. 17 out of 25 on Core is a fail even if Type II is perfect.",
      markdown: `## The number

**18 correct out of 25 questions = 72%**, on **each** section you sit:

| Section | Questions | Correct to pass | Fail |
| --- | --- | --- | --- |
| Core | 25 | 18 | 17 or fewer |
| Type I | 25 | 18 | 17 or fewer |
| Type II | 25 | 18 | 17 or fewer |
| Type III | 25 | 18 | 17 or fewer |

Universal is not a fifth exam. It is Core + I + II + III, each at 18/25. That is 100 questions and **four** independent bars.

## What happens if you fail one section

You keep the sections you passed. You retake only the failed section (and pay that provider’s retake fee). There is no waiting period in the federal rule; providers set their own scheduling.

If you fail Core, you cannot be awarded any type from that sitting, because every type requires Core.

## Closed book vs Type I

Core, Type II, Type III and Universal are **closed-book** and **proctored** (in person or live online proctoring, depending on the organization).

Some providers still offer a **Type I-only** exam that is open-book and not proctored. If you plan to walk out Universal, assume closed-book for everything and study that way.

## Time and format

EPA does not publish a single nationwide time limit the way some state boards do. Each EPA-approved certifying organization (ESCO, RSES, Mainstream, HVAC Excellence and others) sets seating time. Plan on roughly a minute per question; CertReady’s mock is **25 questions in 30 minutes** so the clock feels familiar.

Questions are multiple choice. The traps are the numbers: 80 vs 90, 10 vs 15 in. Hg, 10% vs 20% vs 30% leak rates, 10 psig vs 15 psig, 25 mm Hg absolute vs 25 in. Hg vacuum.

## How hard is the EPA 608 test?

It is a short closed-book quiz, not a multi-hour trade exam. Each section is 25 questions and you need 18 right. People who fail are usually not "bad at HVAC." They mixed a Type 1 recovery percentage with a Type 2 vacuum, or they treated Universal as one average score.

If you can fill the [numbers table](/exams/epa-608/study-guide) from memory and hold **80%+** on the [practice test](/exams/epa-608/practice-test), the live sitting is manageable. If you are still guessing 80 versus 90, or 10 versus 15 in. Hg, it will feel hard — those are the questions.

Core, Type II, Type III and Universal are **closed book**. Some organizations still offer a Type I-only exam that is open book. Booking [Universal](/exams/epa-608/guides/universal) means closed book for the whole sitting. Taking it [online with a live proctor](/exams/epa-608/guides/certification-online) does not open the book.

## How high you should score in practice

Passing is 72%. That is not a study target.

- Below **75%** on a CertReady category → you do not know that section yet
- **80–85%** → book the exam soon, keep drilling misses
- **90%+** on mixed mocks → you have margin for a bad night of sleep

Use category scores, not one overall percentage. A 90% mock that hid a 60% Type III is how people fail Universal by one section.

## Study to the 72% line

1. Memorize the [numbers table](/exams/epa-608/study-guide) until you can fill it from a blank page.
2. Practice [Core](/exams/epa-608/core), then each type, until that category is above 80%.
3. Sit timed [mock exams](/mock/epa-608). Review every miss — the explanation is the lesson.
4. Re-drill only the weak category. Do not grind Core if Type II leak rates are the problem.

All CertReady items are original practice questions, not the live exam. The live exam is administered by an EPA-approved organization, not by EPA and not by CertReady.

Read [Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2) if you are still deciding how many sections to book, or the [Universal](/exams/epa-608/guides/universal) and [online exam](/exams/epa-608/guides/certification-online) guides.`,
      faq: [
        {
          question: "Is the EPA 608 passing score 70% or 72%?",
          answer:
            "72%. You need 18 of 25 correct on each section. 70% would be 17.5 questions; the cutoff is 18 whole questions.",
        },
        {
          question: "Does Universal require 72% overall?",
          answer:
            "No. Universal requires 72% on Core and on each of Type I, II and III. Averaging across sections does not help.",
        },
        {
          question: "Can I fail Type III and still get Type I and Type II?",
          answer:
            "Yes, if you passed Core plus those types in the same or earlier sittings. You receive the types you passed and retake Type III later.",
        },
        {
          question: "How easy is it to get EPA 608?",
          answer:
            "Each section is 25 questions and you need 18 correct (72%). Core, Type II, Type III and Universal are closed book. Technicians who memorize the recovery, leak-rate and evacuation numbers, and who practice above 80% on each section, usually pass. Mixing Type 1 percentages with Type 2 vacuums is how people fail one section at 17.",
        },
        {
          question: "Is the EPA 608 test open book?",
          answer:
            "Core, Type II, Type III and Universal are closed book and proctored, in person or with a live online proctor. Some organizations still offer a Type I-only exam that is open book. If you are sitting Universal, study as if you cannot bring notes.",
        },
      ],
    },
    {
      slug: "who-needs-certification",
      title: "EPA Section 608 Certification",
      seoTitle: "EPA Section 608 Certification — Who Needs It, Cost, and the Card",
      seoDescription:
        "EPA Section 608 certification is required to service stationary equipment that could release refrigerant and to buy most refrigerants. Who needs it, what it costs, how you get the card, and how it differs from Section 609 and from ESCO’s exam.",
      intro:
        "EPA Section 608 certification is the card you need before you open a refrigerant circuit, recover a charge, or buy cylinders of regulated refrigerant. There is no federal age or apprenticeship prerequisite — only the exam.",
      markdown: `## What EPA Section 608 requires

Section 608 of the Clean Air Act requires certification for anyone who **maintains, services, repairs or disposes of** appliances that could release ozone-depleting refrigerant (and, under later rules, many substitute refrigerants) into the atmosphere.

In shop language that means:

- You attach gauges or recovery equipment to a charged system
- You cut, braze or replace components that hold refrigerant
- You recover refrigerant before disposal
- You purchase regulated refrigerant (sales are restricted to certified technicians)

You do **not** need 608 to carry a condensing unit still in the crate, to clean a coil with the circuit sealed, or to replace a thermostat.

## Who typically sits the exam

- HVAC/R apprentices and helpers about to work on live systems
- Residential and commercial air-conditioning technicians
- Refrigeration techs (walk-ins, racks, ice machines)
- Appliance repair techs (refrigerators, window units, vending)
- Facilities and plant maintenance staff who service rooftops or chillers
- Demolition / scrap operations that drain appliances before disposal
- Anyone whose wholesaler will not sell them R-410A, R-22 or similar without a card

Employers often require **Universal** even if your first six months are only residential splits. It is one test day instead of three later.

## Who should get Section 609 instead

**Motor vehicle air conditioning (MVAC)** — cars, trucks, buses — is Section **609**. It is a different statute, a different exam, and a different card.

- Shop that only does cars → 609
- Shop that only does buildings → 608
- Shop that does both (dealership with a building plant, or a tech who moonlights) → both cards

A 608 Universal card does not authorize MVAC refrigerant service. A 609 card does not authorize a rooftop recovery.

## What 608 does *not* require

- U.S. citizenship
- A high-school diploma
- A state HVAC license (states may require a license **and** 608; they are separate)
- Recertification — **the card does not expire**
- EPA itself to administer the test — EPA **approves** organizations (ESCO, RSES, Mainstream, HVAC Excellence and others) that give the exam and print the wallet card

Fees are set by the provider, commonly on the order of a few tens of dollars up to around $150 depending on Universal vs a single type and in-person vs online proctoring.

## Which type you need

Match the equipment you will open:

- Refrigerators, window A/C, dehumidifiers → **Type I**
- Splits, rooftops, walk-ins, racks → **Type II**
- Low-pressure centrifugal chillers → **Type III**
- All of the above, or you want to be hireable → **Universal**

Details: [Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2). Most shops want [Universal](/exams/epa-608/guides/universal). Many techs sit the whole thing [online with a live proctor](/exams/epa-608/guides/certification-online).

## After you pass

- Keep the wallet card (or digital equivalent) with you when you buy refrigerant or work on systems
- Certification is valid in every U.S. state and territory
- If you lose the card, the **certifying organization** (not EPA, not CertReady) issues a replacement
- Knowingly venting refrigerant can still cost you the card and civil penalties

## How to get EPA 608 certification

1. Match the type to the equipment, or book [Universal](/exams/epa-608/guides/universal) if the shop wants all three. Comparison: [Type I vs Type II vs Type III](/exams/epa-608/guides/type-1-vs-type-2).
2. Practice [Core](/exams/epa-608/core) and each type until you are above 80%. The bar on test day is [18 of 25](/exams/epa-608/guides/passing-score) on every section.
3. Sit the exam with an EPA-approved organization (ESCO, RSES, Mainstream, HVAC Excellence, and others). EPA approves them. EPA does not hand you the card.
4. Pass each section you attempt. A failed section does not erase the sections you passed.
5. Keep the wallet card that organization prints. Wholesalers and employers ask for it. A lost card is replaced by that organization, not by EPA and not by CertReady.

Many techs test [online with a live proctor](/exams/epa-608/guides/certification-online). Closed book still applies to Core, Type II, Type III, and Universal.

## ESCO’s 2026 bank is a different product

ESCO Institute says it released an updated Section 608 test bank in August 2026, and that its 2018 exam stays available until January 1, 2027. If you book ESCO, study the manual and pressure-temperature chart that match that sitting. Other approved organizations publish their own materials and their own dates.

CertReady is not ESCO’s practice exam, the 9th edition, or the 10th. The questions here are original practice on the public rules: recovery percentages, leak rates, evacuation levels, and the venting prohibition. Use them to learn the numbers, then take the proctored exam you paid for.

## How to prepare on CertReady

1. Read the [certification requirements](/exams/epa-608/requirements) and [study guide](/exams/epa-608/study-guide)
2. Take the [free EPA 608 practice test](/exams/epa-608/practice-test)
3. Drill weak sections until you are above 80%
4. Sit a timed [mock exam](/mock/epa-608) at the [72% passing bar](/exams/epa-608/guides/passing-score)

CertReady is independent practice material. We are not affiliated with EPA or any certifying organization, and our questions are not the live exam.`,
      faq: [
        {
          question: "What is EPA Section 608 certification?",
          answer:
            "Section 608 of the Clean Air Act requires a certified technician to maintain, service, repair, or dispose of stationary air-conditioning and refrigeration equipment that could release refrigerant, and to buy most regulated refrigerants. An EPA-approved organization gives the exam and prints the card. Motor vehicle air conditioning is Section 609, a different card.",
        },
        {
          question: "Do I need EPA 608 to buy refrigerant?",
          answer:
            "Yes for most regulated refrigerants. Wholesalers may sell them only to Section 608 certified technicians (or businesses that employ them). Small MVAC cans with self-sealing valves follow Section 609 rules instead.",
        },
        {
          question: "Does EPA 608 expire?",
          answer:
            "No. Once you pass, the certification is valid for life unless it is revoked for a violation. Replacement cards come from the organization that tested you.",
        },
        {
          question: "Can a helper pull gauges without a card?",
          answer:
            "If the work is maintaining, servicing, repairing or disposing of equipment that can release refrigerant, the person doing that work needs to be certified. Holding gauges on a charged system is the classic example.",
        },
        {
          question: "How do I get EPA 608 certification?",
          answer:
            "Pick the type or Universal, pass Core plus that type at 18 of 25 with an EPA-approved organization, and keep the card they issue. EPA does not administer the exam or print the card.",
        },
        {
          question: "How much does EPA 608 certification cost?",
          answer:
            "EPA does not set a national fee. Approved organizations commonly charge somewhere from about $20 to about $150, depending on how many sections you sit and whether a live proctor is included. Ask the organization that will print your card.",
        },
        {
          question: "Is CertReady the ESCO EPA 608 practice test?",
          answer:
            "No. ESCO publishes its own practice exams, including a 2026 bank and a 2018 bank that ESCO says remains available until January 1, 2027. CertReady’s questions are an independent English bank on the same rules.",
        },
      ],
    },
    {
      slug: "universal",
      title: "EPA 608 Universal Certification",
      seoTitle: "EPA 608 Universal Certification — Core + Type I, II & III",
      seoDescription:
        "EPA 608 Universal is Core plus Type I, Type II and Type III: 100 questions, 72% on each section. What Universal covers, how it is scored, and how to practice before you book.",
      intro:
        "Universal is not a fifth test. It is Core plus Type I, Type II and Type III in one sitting — 100 questions and four separate 72% bars. Most HVAC/R employers ask for this card.",
      markdown: `## What Universal is

**Universal = Core + Type I + Type II + Type III.**

You are certified to service:

- Factory-sealed small appliances (refrigerators, window A/C, vending) — Type I
- Field-charged high-pressure equipment (splits, rooftops, walk-ins, racks) — Type II
- Low-pressure centrifugal chillers — Type III

Plus the Core rules that apply to every type: venting prohibition, recover/recycle/reclaim, cylinders, sales restriction, safety.

It does **not** cover motor vehicle A/C. That is [Section 609](/exams/epa-608/guides/who-needs-certification). A Universal 608 card does not let you empty a car.

If you only ever open one class of equipment, you can sit Core plus that type. Universal is the employment default because shops do not want to track which systems you are allowed to touch. Full type breakdown: [Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2).

## How the exam is scored

Each section is 25 multiple-choice questions. You need **18 correct (72%) on each section**, not 72% overall.

| Section | Questions | To pass |
| --- | --- | --- |
| Core | 25 | 18 |
| Type I | 25 | 18 |
| Type II | 25 | 18 |
| Type III | 25 | 18 |
| **Universal total** | **100** | **18 on every section** |

Fail Type III at 17/25 and you still receive Core + I + II if those passed. You retake only Type III. Fail Core and you take home no types from that sitting.

Details: [EPA 608 passing score](/exams/epa-608/guides/passing-score).

## Closed book and proctored

Universal is **closed-book** and **proctored**. Some organizations still offer a Type I-only exam that is open-book and not proctored. That does not apply once you add Type II, Type III or Universal.

You can sit Universal **in a testing center or online with a live proctor**. Online is still a locked-down, ID-checked exam — not an open-tab take-home. See [EPA 608 certification online](/exams/epa-608/guides/certification-online).

EPA does not print the wallet card. An [EPA-approved certifying organization](https://www.epa.gov/section608/section-608-technician-certification-programs) does. Fees are set by the provider.

## What people actually miss on Universal

The failure mode is mixing numbers across types:

- Type I **80% / 90% / 4 in. Hg** is not a Type II vacuum
- Type II leak rates: comfort cooling **10%**, commercial refrigeration **20%**, industrial process **30%** (appliances with 50 lb or more)
- Type II evacuation: 0 / 10 / 15 in. Hg by refrigerant and charge; very-high-pressure is 0
- Type III: **10 psig** leak test, **15 psig** rupture disc, **25 mm Hg absolute** for a major repair, vapor-first charging

Memorize the [study-guide table](/exams/epa-608/study-guide), then drill the weak type. A 90% mock that hid a 60% Type III is how Universal is lost by one section.

## How to prepare on CertReady

1. Core until you can recite dates, 80% cylinder fill, and recover/recycle/reclaim — [Core practice](/exams/epa-608/core)
2. Type I definition and 80/90% — [Type I](/exams/epa-608/type-1)
3. Type II leak rates and evacuation table — [Type II](/exams/epa-608/type-2)
4. Type III vacuum operation — [Type III](/exams/epa-608/type-3)
5. Timed [mock exams](/mock/epa-608) until every category is above 80%

All CertReady questions are original practice material, not the live exam. We are not affiliated with EPA or any certifying organization.`,
      faq: [
        {
          question: "What is 608 universal certification?",
          answer:
            "608 universal certification is EPA Section 608 Core plus Type I, Type II, and Type III. That is 100 questions, with 18 of 25 correct on every section, closed book and proctored. It does not cover motor vehicle air conditioning.",
        },
        {
          question: "Is Universal a separate EPA 608 exam?",
          answer:
            "No. Universal is Core plus Type I, II and III. There is no fifth booklet. You select Universal when you book, and you sit all four sections.",
        },
        {
          question: "Can I add Universal later if I only passed Type II?",
          answer:
            "You keep the sections you passed. Book the missing types (and Core if you do not have it). You do not retake Type II.",
        },
        {
          question: "Does Universal expire?",
          answer:
            "No. Section 608 certification does not expire. Replacement cards come from the organization that tested you, not from EPA or CertReady.",
        },
        {
          question: "Do employers require Universal or just Type II?",
          answer:
            "Type II is enough for splits and rooftops. Most shops still want Universal so you can also recover a refrigerator or work a chiller without a second test day.",
        },
      ],
    },
    {
      slug: "certification-online",
      title: "EPA 608 Certification Online",
      seoTitle: "EPA 608 Certification Online — Proctored Test From Home",
      seoDescription:
        "You can take EPA 608 online with a live proctor through an EPA-approved organization. How online testing works for Core, Type I–III and Universal, what you need at home, and how to practice first.",
      intro:
        "EPA 608 can be taken online. That means a live proctor watching you on camera — not an unsupervised quiz. EPA still does not give the test itself.",
      markdown: `## What “online” actually means

Section 608 exams are administered by **EPA-approved certifying organizations** (ESCO Institute, RSES, Mainstream Engineering, HVAC Excellence and others), not by EPA and not by CertReady.

Online usually means:

- You book with one of those organizations
- You sit at home (or another quiet room) with a webcam, microphone and government ID
- A **live proctor** checks your ID, scans the room, and watches the session
- Core, Type II, Type III and **Universal are closed-book**

Some providers still offer a **Type I-only** exam that is open-book and not proctored. If you are booking Universal, assume closed-book with a proctor. [Universal](/exams/epa-608/guides/universal) is Core + I + II + III.

Confirm current rules, price and software with the organization you book. EPA’s list: [approved technician certification programs](https://www.epa.gov/section608/section-608-technician-certification-programs).

## What you need on test day

Typical online-proctor requirements (providers differ — read their checklist):

- Quiet, private room; no second monitor, notes or phone in reach
- Webcam the proctor can pan around the room
- Government photo ID that matches the name on the booking
- A computer that meets their lock-down browser / app requirements
- Stable internet — a drop can void the sitting

You cannot open CertReady, a P/T chart, or your notes during a closed-book section. Practice here **before** you book, not during.

## Online vs in-person

| | Online with live proctor | Testing center |
| --- | --- | --- |
| Same exam | Yes — same sections, same 72% bar | Yes |
| Closed book | Yes for Core / II / III / Universal | Yes |
| Schedule | Often evenings and weekends | Center hours |
| Travel | None | Drive to a site |
| Failure mode | Room scan, ID, tech issues | Parking and wait time |

The passing score does not change because you are at home: **18 of 25 on each section**. See the [passing score guide](/exams/epa-608/guides/passing-score).

## Cost and the card

EPA does not set a national fee. Providers commonly charge on the order of **$20–$150** depending on how many sections you sit and whether you test online or in person. The **wallet card comes from that organization**. It does not expire. Lost-card replacements are also from them.

CertReady is free practice. We do not sell the official exam, and a completed mock here is not a certification.

## Who this is for

- Apprentices and helpers who need the card before a wholesaler will sell refrigerant — [EPA Section 608 certification](/exams/epa-608/guides/who-needs-certification)
- Residential techs booking [Universal](/exams/epa-608/guides/universal) on a weekend
- Anyone who cannot get to a testing center during work hours

If you only service cars, you need **Section 609**, which is a different online/in-person program. If you need the sitting in Spanish, confirm that with the organization before you pay — see [EPA 608 in Spanish](/exams/epa-608/guides/spanish).

## Practice first, then book

1. Drill [Core](/exams/epa-608/core), [Type I](/exams/epa-608/type-1), [Type II](/exams/epa-608/type-2) and [Type III](/exams/epa-608/type-3) until each is above 80%
2. Sit a timed [mock exam](/mock/epa-608) (25 questions / 30 minutes)
3. Read the [study guide numbers](/exams/epa-608/study-guide)
4. Book with an EPA-approved organization when category scores are consistently high

All questions on CertReady are original study material, not live exam items.`,
      faq: [
        {
          question: "Can I take EPA 608 online from home?",
          answer:
            "Yes, through many EPA-approved organizations that offer live online proctoring. Core, Type II, Type III and Universal are closed-book. Some Type I-only exams are still unproctored — check the provider.",
        },
        {
          question: "Does EPA itself offer an online 608 test?",
          answer:
            "No. EPA approves certifying organizations. Those organizations give the exam, take the fee and print the card.",
        },
        {
          question: "Is the online exam easier?",
          answer:
            "No. Same question counts, same 72% per section, same closed-book rule for Universal. The only difference is where you sit.",
        },
        {
          question: "Is CertReady the official online exam?",
          answer:
            "No. CertReady is independent practice. Passing a mock here does not certify you. Book the live exam with an EPA-approved program.",
        },
        {
          question: "Can I take the online EPA 608 exam in Spanish?",
          answer:
            "Some EPA-approved organizations offer the scored exam in Spanish, and ESCO publishes Spanish practice exams. Others are English only. Confirm the language with the provider you book. CertReady’s practice bank is English. Details: the EPA 608 in Spanish guide.",
        },
      ],
    },
    {
      slug: "spanish",
      title: "EPA 608 in Spanish",
      seoTitle: "EPA 608 in Spanish — Exam Language, ESCO Practice, and What Stays the Same",
      seoDescription:
        "Some EPA-approved organizations offer the 608 exam in Spanish, and ESCO publishes Spanish practice exams. The 72% score and the type rules do not change. CertReady’s bank is English.",
      intro:
        "Spanish is a language option some certifying organizations offer. It is not a different certification. Core, Type I, Type II, Type III, and Universal use the same rules in either language.",
      markdown: `## Who decides the language

EPA does not sit you for the test and does not print the card. An **EPA-approved certifying organization** does (ESCO, RSES, Mainstream, HVAC Excellence, and others).

That organization decides whether your sitting is offered in Spanish. ESCO publishes **Spanish practice exams** for Core and for Type I, Type II, and Type III, next to the English set. A Spanish practice exam on a provider’s site is not proof that the sitting you booked is in Spanish. Ask before you pay.

[Taking the exam online](/exams/epa-608/guides/certification-online) does not change this. A live proctor can run a Spanish form or an English form. The room rules — ID, webcam, closed book for Universal — stay.

## What does not change

| Rule | Either language |
| --- | --- |
| Questions per section | **25** |
| To pass | **18 correct (72%)** on that section |
| Universal | Core + Type I + Type II + Type III, each at 72% |
| Type I | Factory-sealed, **5 lb or less** |
| Type II | High-pressure equipment that is not a small appliance |
| Type III | Low-pressure chillers |
| Card | Does **not** expire |

The numbers people miss are the same in Spanish: Type I recovery **90%** with a working compressor and **80%** with a dead one, Type II leak rates **10% / 20% / 30%**, Type III evacuation **25 mm Hg absolute**. Mixing those across types fails a section at 17 whether the booklet is in Spanish or English.

Full comparison: [Type 1 vs Type 2 vs Type 3](/exams/epa-608/guides/type-1-vs-type-2). Scoring: [passing score](/exams/epa-608/guides/passing-score). Who must hold the card: [EPA Section 608](/exams/epa-608/guides/who-needs-certification).

Section **609** (car and truck A/C) is still a different exam. A Spanish 608 card does not cover motor-vehicle refrigerant work.

## CertReady’s practice is English

The questions, explanations, and timed mocks on this site are **English**. Use them if you can read the items. If you need to drill in Spanish, use the Spanish practice exam from the organization that will print your card, and use the [study-guide table](/exams/epa-608/study-guide) for the numbers.

We do not publish a translated copy of the live exam, and we are not ESCO. Their Spanish practice set is theirs. Ours is an independent English bank:

- [Free EPA 608 practice test](/exams/epa-608/practice-test)
- [Core](/exams/epa-608/core) · [Type I](/exams/epa-608/type-1) · [Type II](/exams/epa-608/type-2) · [Type III](/exams/epa-608/type-3)
- [Universal](/exams/epa-608/guides/universal) · [timed mock](/mock/epa-608)

Study until each section is above 80% here or on the provider’s Spanish practice, then book the language you will actually test in.`,
      faq: [
        {
          question: "Is the EPA 608 test offered in Spanish?",
          answer:
            "Sometimes. EPA-approved organizations choose the language. ESCO publishes Spanish practice exams for Core and each type. Confirm that the sitting you paid for is in Spanish before test day.",
        },
        {
          question: "Is CertReady’s EPA 608 practice test in Spanish?",
          answer:
            "No. The CertReady bank, explanations, and mocks are English. For a Spanish drill, use the practice exam from the organization that will give you the card.",
        },
        {
          question: "Does the passing score change in Spanish?",
          answer:
            "No. You still need 18 of 25 correct (72%) on each section. Universal is still four separate scores, not an average.",
        },
        {
          question: "Is Universal a different test in Spanish?",
          answer:
            "No. Universal is still Core plus Type I, Type II, and Type III. The language of the booklet does not add a fifth section.",
        },
      ],
    },
  ],
};

export const EPA_608_PRACTICE_COPY = `## How this practice test is set up

The live EPA 608 exam is **25 multiple-choice questions per section**, **18 correct (72%)** to pass each one. CertReady’s bank covers the same topics with original questions — ozone and the venting rule in Core, 80/90% recovery in Type I, leak rates and evacuation levels in Type II, vacuum operation and 25 mm Hg in Type III.

Start with a 10-question mixed set if you have ten minutes. Switch to one type when a mock shows a weak section. Sit the timed mock when you can hit **80%+** on each category; passing is 72%, and you want margin.

- [Type I vs Type II vs Type III](/exams/epa-608/guides/type-1-vs-type-2)
- [Universal certification](/exams/epa-608/guides/universal)
- [Take EPA 608 online](/exams/epa-608/guides/certification-online)
- [Passing score (72%)](/exams/epa-608/guides/passing-score)
- [EPA Section 608 certification](/exams/epa-608/guides/who-needs-certification) — who needs the card, what it costs, and how you get it
- [EPA 608 in Spanish](/exams/epa-608/guides/spanish)

CertReady is not ESCO’s practice exam. ESCO’s 2026 test bank and its 2018 bank are theirs. The rules those sittings still test — 18 of 25, recovery percentages, leak rates — are what this bank drills.
`;

export function getExamGuides(examSlug: string): ExamGuide[] {
  return EXAM_GUIDES[examSlug] ?? [];
}

export function getExamGuide(examSlug: string, guideSlug: string): ExamGuide | undefined {
  return getExamGuides(examSlug).find((guide) => guide.slug === guideSlug);
}
