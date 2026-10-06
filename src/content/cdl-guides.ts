import type { ExamGuide } from "./exam-guide-types";

export const CDL_GUIDES: ExamGuide[] = [
  {
    slug: "class-a-vs-class-b",
    title: "CDL Class A vs Class B vs Class C",
    seoTitle: "CDL Class A vs Class B vs Class C — Which License Do You Need?",
    seoDescription:
      "Class A is combination vehicles (trailer 10,001 lb+). Class B is a single heavy vehicle. Class C is 16+ passengers or placarded hazmat. Compare tests, endorsements and practice each section.",
    intro:
      "Class is about what the truck is rated to weigh and what you may tow — not the job title on the application. Book the wrong class and you either sit extra tests you do not need, or you cannot legally pull the trailer on day one.",
    markdown: `## The short answer

| Class | Vehicle | Extra knowledge tests |
| --- | --- | --- |
| **A** | Combination with **GCWR 26,001 lb or more** and a towed unit **10,001 lb GVWR or more** | General Knowledge + **Combination Vehicles**. Air Brakes if the truck has air brakes (almost always). |
| **B** | **Single** vehicle **26,001 lb GVWR or more** (may tow under 10,001 lb) | General Knowledge. Air Brakes if equipped. **No** Combination test. |
| **C** | Not A or B, but **16 or more persons including the driver**, or **placarded hazmat** | General Knowledge + **P** and/or **H** as required |

A Class A covers Class B and C vehicles (with the right endorsements). A Class B does **not** let you pull a 10,001 lb+ trailer.

## What people mix up

- **Straight truck vs tractor.** A heavy box truck with no heavy trailer is Class B. Hook a heavy pup and it can become Class A.
- **Actual weight vs rating.** CDL class uses **GVWR / GCWR** on the data plate, even if you are empty.
- **Job ads that say “CDL A or B.”** If the account is tractor-trailer, you need A. If it is a dump truck, mixer or transit bus, B (plus P for many buses) can be enough.
- **Pickup + gooseneck.** Plenty of farm and oilfield combos cross the Class A line once the trailer is rated 10,001 lb+ and the GCWR is 26,001+.

Air brakes are a **restriction**, not a class. Skip the [Air Brakes](/exams/cdl/air-brakes) test and the state stamps an **air-brake restriction** — you may not drive air-brake vehicles.

## Endorsements sit on top of class

- **H** hazmat — [practice](/exams/cdl/hazardous-materials) plus TSA
- **N** tanker — [practice](/exams/cdl/tanker)
- **P** passenger — [practice](/exams/cdl/passenger)
- **T** doubles/triples (Class A) and **S** school bus (needs P) are not in this bank yet
- **X** is H+N printed as one code in many states

## What to practice

1. [General Knowledge](/exams/cdl/general-knowledge) — every class
2. [Air Brakes](/exams/cdl/air-brakes) — unless you are sure the vehicle is hydraulic-only
3. [Combination Vehicles](/exams/cdl/combination-vehicles) — Class A only
4. Timed [mock](/mock/cdl) once category scores are above 85%

Passing is **80% per test**: [CDL passing score](/exams/cdl/guides/passing-score). New drivers also need a [CLP](/exams/cdl/guides/cdl-permit) before the skills test.

State booking: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).`,
    faq: [
      {
        question: "Can I drive a Class B truck with a Class A CDL?",
        answer:
          "Yes, if you also have any endorsements that vehicle needs (passenger, tanker, air brakes without restriction). Class A is the broader license.",
      },
      {
        question: "Does Class B include tractor-trailers?",
        answer:
          "Not when the trailer is 10,001 lb GVWR or more. That combination is Class A. Class B may tow a trailer under 10,001 lb.",
      },
      {
        question: "Is a bus Class B or Class C?",
        answer:
          "A heavy transit or motorcoach is usually Class B plus P. A smaller vehicle designed for 16+ that is under the Class B weight can be Class C plus P. School bus adds S.",
      },
      {
        question: "Do I need Combination Vehicles for Class B?",
        answer: "No. Combination Vehicles is the Class A knowledge test.",
      },
    ],
  },
  {
    slug: "cdl-permit",
    title: "CDL Permit (CLP)",
    seoTitle: "CDL Permit (CLP) — Knowledge Tests, Wait Time and What You Can Drive",
    seoDescription:
      "A Commercial Learner's Permit is what you get after CDL knowledge tests. Typical 14-day wait, qualified CDL holder in the seat, and no passengers or hazmat. How to practice before you book.",
    intro:
      "The CDL is not one exam. You pass the written tests, the state prints a Commercial Learner's Permit, you wait, you practice, then you take the skills test. Searching “CDL permit” is the beginning of that sequence — not a different license.",
    markdown: `## What a CLP is

A **Commercial Learner's Permit** lets you **practice** in a commercial motor vehicle with a qualified CDL holder beside you. It is not a solo CDL. It is not valid for:

- Passengers (except supervisors, examiners, trainees)
- Placarded hazardous materials
- Operating without that qualified driver

You must already hold a valid auto license. Most states require a **DOT medical certificate** on file before they will print the CLP.

## Order of operations

1. Medical examiner's certificate (DOT physical)
2. Knowledge tests: [General Knowledge](/exams/cdl/general-knowledge), plus [Air Brakes](/exams/cdl/air-brakes) / [Combination](/exams/cdl/combination-vehicles) / endorsements you need
3. State issues the **CLP** for the same class and endorsements you passed (H is limited on a permit)
4. **Waiting period** — federal rules require the CLP to be held at least **14 days** before the skills test
5. Skills test: vehicle inspection, basic control, road test in a **representative vehicle**
6. State prints the CDL

Fail a knowledge test and you do not get that piece of the permit. Fail Air Brakes and you can still get a CLP **with an air-brake restriction**.

## What to study for the permit appointment

The permit exam **is** the knowledge tests. There is not a separate “permit quiz.” Drill until you are comfortably above **80%** — [passing score](/exams/cdl/guides/passing-score) — then book.

- [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b) so you do not pay for the wrong tests
- [Free CDL practice test](/exams/cdl/practice-test)
- Timed [mock exam](/mock/cdl)

## State notes

Waiting periods, fees, and whether you retest the same day are local. Start here:

- [California CDL](/exams/cdl/guides/california)
- [Texas CDL](/exams/cdl/guides/texas)
- [Florida CDL](/exams/cdl/guides/florida)
- [Georgia CDL](/exams/cdl/guides/georgia)

CertReady does not issue permits. Only your state DMV / DPS / DHSMV / DDS does.`,
    faq: [
      {
        question: "How long do I have to hold a CDL permit?",
        answer:
          "Federal rules require at least 14 days with the CLP before the skills test. States may require longer. The permit itself also expires — you cannot sit on it forever without testing.",
      },
      {
        question: "Can I drive a truck alone on a CLP?",
        answer:
          "No. A qualified CDL holder with the right class must be in the passenger seat. You also cannot haul passengers or placarded hazmat on a CLP.",
      },
      {
        question: "Is the CDL permit test different from General Knowledge?",
        answer:
          "No. The permit is issued after you pass the knowledge tests for that class. Practice General Knowledge, Air Brakes and Combination Vehicles (for Class A) the same way.",
      },
      {
        question: "Does CertReady give a CDL permit?",
        answer: "No. We are independent practice. Book knowledge tests with your state licensing agency.",
      },
    ],
  },
  {
    slug: "passing-score",
    title: "CDL Passing Score (80%)",
    seoTitle: "CDL Passing Score — 80% on Each Knowledge Test",
    seoDescription:
      "The CDL passing score is 80% on each knowledge test, not an average. Typical 40 of 50 on General Knowledge, 20 of 25 on Air Brakes. How scoring and restrictions work.",
    intro:
      "You do not pass the CDL written exams with a blended score. Each test is pass/fail on its own. 90% on General Knowledge and 76% on Air Brakes is a fail on Air Brakes.",
    markdown: `## The short answer

**80% on each knowledge test.**

| Test | Typical questions | Need correct (80%) |
| --- | --- | --- |
| General Knowledge | 50 | **40** |
| Air Brakes | 25 | **20** |
| Combination Vehicles | 20 | **16** |
| Hazmat (H) | 30 | **24** |
| Tanker (N) | 20 | **16** |
| Passenger (P) | 20 | **16** |

A few states use a slightly different bank size. The **percentage** is still 80%. Confirm the question count on your state's handbook before you walk in.

## Restrictions vs full fail

- **Fail General Knowledge** — no CLP for that visit
- **Fail Air Brakes** — you can still be licensed **with an air-brake restriction** (no air-brake vehicles)
- **Fail Combination Vehicles** — you do not get Class A; Class B may still be available if you passed the rest
- **Fail an endorsement** — you get the CDL without that letter; add it later

That is why you drill **weak categories**, not one overall mock percentage. CertReady’s dashboard is built for that.

## How to study to 80%

80% is the floor. Aim at **85–90%** on [General Knowledge](/exams/cdl/general-knowledge) and [Air Brakes](/exams/cdl/air-brakes) so a bad cluster does not drop you to 38/50.

1. Quick sets of 10 until explanations feel obvious
2. One category at a time until it is above 85%
3. Timed [50-question mock](/mock/cdl)
4. Read the [study-guide numbers](/exams/cdl/study-guide)

All CertReady items are original practice, not live DMV questions.

Related: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b) · [CDL permit](/exams/cdl/guides/cdl-permit)`,
    faq: [
      {
        question: "Is the CDL passing score 70% or 80%?",
        answer:
          "Knowledge tests are 80% in the federal standard used by states. Do not study to 70%. Skills tests are scored on the state's score sheet, not as a percentage of written items.",
      },
      {
        question: "If I fail one section, do I retake everything?",
        answer:
          "Usually you retake only the test you failed. Credit for tests you passed is a state timing rule — do not assume it lasts forever if you wait months.",
      },
      {
        question: "Does a 50-question CertReady mock match the real test?",
        answer:
          "It matches General Knowledge length and the 80% bar. The live exam may draw a different mix. Use category scores, not one lucky mock, to decide when to book.",
      },
    ],
  },
  {
    slug: "california",
    title: "California CDL Practice Test",
    seoTitle: "California CDL Practice Test — CA DMV General Knowledge & Endorsements",
    seoDescription:
      "Practice for the California CDL knowledge tests: General Knowledge, Air Brakes, Combination Vehicles and endorsements. Same federal topics the CA DMV uses, with original questions.",
    intro:
      "California issues the CDL through DMV, to federal standards. The knowledge tests are the national topics — classes, space, air brakes, combination vehicles — plus CA’s own handbook. This page is practice for that written appointment, not a driving school.",
    markdown: `## How California CDL testing works

You book **knowledge tests at CA DMV**, not on CertReady. After you pass, DMV prints a **CLP**. You hold it (at least **14 days** under federal rules; follow DMV if they require longer), practice with a qualified CDL driver, then take the **skills test**.

Use the official [California CDL](https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-licenses-cdl/) pages for fees, REAL ID, medical cards, and whether your office uses walk-in or appointment testing.

## What to study (same bank as every state)

Federal knowledge tests do not change at the state line. Drill:

- [General Knowledge](/exams/cdl/general-knowledge)
- [Air Brakes](/exams/cdl/air-brakes) if the truck has air brakes
- [Combination Vehicles](/exams/cdl/combination-vehicles) for Class A
- [Hazmat](/exams/cdl/hazardous-materials), [Tanker](/exams/cdl/tanker), [Passenger](/exams/cdl/passenger) if you need the letter

Then sit a timed [mock](/mock/cdl). Passing is **80% per test** — [passing score](/exams/cdl/guides/passing-score).

Read CA’s commercial handbook for state-specific rules (HOV, chain controls, smog-related items, and any extra knowledge DMV lists). CertReady does not replace that handbook.

## Class and permit

- [Class A vs Class B vs Class C](/exams/cdl/guides/class-a-vs-class-b)
- [CDL permit (CLP)](/exams/cdl/guides/cdl-permit)
- Interstate still means age **21** and a current medical certificate

## Practice

[Free California-oriented CDL practice test](/exams/cdl/practice-test) — original questions, explanations, no DMV affiliation.

Other states: [Texas](/exams/cdl/guides/texas) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).`,
    faq: [
      {
        question: "Does California use the same CDL test as other states?",
        answer:
          "Knowledge tests follow the federal CDL manual, so topics match. You still take them at CA DMV and should read the California commercial driver handbook for state rules.",
      },
      {
        question: "Where do I take the California CDL written test?",
        answer:
          "At participating DMV offices (or as DMV currently offers). CertReady is practice only. Check DMV for appointments and fees.",
      },
      {
        question: "What is the passing score in California?",
        answer: "80% on each knowledge test, scored separately — the same federal bar used across states.",
      },
    ],
  },
  {
    slug: "texas",
    title: "Texas CDL Practice Test",
    seoTitle: "Texas CDL Practice Test — TX DPS General Knowledge & Endorsements",
    seoDescription:
      "Practice for the Texas CDL knowledge tests at DPS: General Knowledge, Air Brakes, Combination Vehicles and endorsements. Original questions on the federal topics Texas uses.",
    intro:
      "Texas CDLs are issued by the Department of Public Safety. The written tests are the federal knowledge bank — General Knowledge, Air Brakes, Combination, endorsements — administered in Texas. Practice here, then book DPS.",
    markdown: `## How Texas CDL testing works

Knowledge tests and skills tests are **DPS** (and some third-party skills testers DPS authorizes). Pass the written tests, receive a **CLP**, wait the required period, then take the skills test in a representative vehicle.

Official info: [Texas DPS Commercial Driver License](https://www.dps.texas.gov/section/driver-license/commercial-driver-license). Use that page for fees, ELDT, medical self-certification, and office identifiers.

## What to practice

Texas does not invent a different General Knowledge syllabus. Use:

- [General Knowledge](/exams/cdl/general-knowledge)
- [Air Brakes](/exams/cdl/air-brakes)
- [Combination Vehicles](/exams/cdl/combination-vehicles) for Class A
- Endorsements: [H](/exams/cdl/hazardous-materials), [N](/exams/cdl/tanker), [P](/exams/cdl/passenger)

[Free CDL practice test](/exams/cdl/practice-test) · [mock exam](/mock/cdl) · **80%** [passing score](/exams/cdl/guides/passing-score)

Read the Texas CDL handbook DPS publishes. Oilfield and oversize work still sit on the same class rules: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b). Permit wait: [CLP](/exams/cdl/guides/cdl-permit).

Other states: [California](/exams/cdl/guides/california) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).`,
    faq: [
      {
        question: "Is the Texas CDL test the federal test?",
        answer:
          "Yes — knowledge tests follow FMCSA/AAMVA topics. You still test with DPS and should study the Texas CDL handbook.",
      },
      {
        question: "Where do I take the Texas CDL written exam?",
        answer: "Texas DPS driver license offices (follow current DPS appointment rules). CertReady does not give the official test.",
      },
      {
        question: "What score do I need in Texas?",
        answer: "80% on each knowledge test.",
      },
    ],
  },
  {
    slug: "florida",
    title: "Florida CDL Practice Test",
    seoTitle: "Florida CDL Practice Test — FL DHSMV General Knowledge & Endorsements",
    seoDescription:
      "Practice for the Florida CDL knowledge tests: General Knowledge, Air Brakes, Combination Vehicles and endorsements. Original questions aligned to the federal manual Florida uses.",
    intro:
      "Florida CDLs go through DHSMV / tax collector offices that offer driver services. The knowledge tests are the national CDL topics. Use this bank for the written part, then book Florida for the real exam.",
    markdown: `## How Florida CDL testing works

Pass the knowledge tests, get a **CLP**, hold it for the waiting period, take the skills test. Florida publishes the process at [DHSMV commercial motor vehicle drivers](https://www.flhsmv.gov/driver-licenses-id-cards/commercial-motor-vehicle-drivers/).

Check that site for fees, ELDT, third-party testers, and medical certification. Hurricane-season office closures are a Florida-specific booking problem — confirm the location is open.

## What to practice

- [General Knowledge](/exams/cdl/general-knowledge)
- [Air Brakes](/exams/cdl/air-brakes)
- [Combination Vehicles](/exams/cdl/combination-vehicles) (Class A)
- [Hazmat](/exams/cdl/hazardous-materials) · [Tanker](/exams/cdl/tanker) · [Passenger](/exams/cdl/passenger)

[Practice test](/exams/cdl/practice-test) · [timed mock](/mock/cdl) · [80% passing score](/exams/cdl/guides/passing-score) · [Class A vs B](/exams/cdl/guides/class-a-vs-class-b) · [permit](/exams/cdl/guides/cdl-permit)

Passenger and school-bus work is common in Florida tourism and districts — P is in this bank; **S** is not yet.

Other states: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Georgia](/exams/cdl/guides/georgia).`,
    faq: [
      {
        question: "Does Florida have its own CDL questions?",
        answer:
          "Florida administers federal-style knowledge tests. Study the Florida CDL handbook DHSMV provides plus the same topics as every other state.",
      },
      {
        question: "Where is the Florida CDL written test given?",
        answer:
          "Driver license offices under DHSMV / tax collectors that offer testing. CertReady is not a Florida testing site.",
      },
      {
        question: "What is the Florida CDL passing score?",
        answer: "80% on each knowledge test.",
      },
    ],
  },
  {
    slug: "georgia",
    title: "Georgia CDL Practice Test",
    seoTitle: "Georgia CDL Practice Test — GA DDS General Knowledge & Endorsements",
    seoDescription:
      "Practice for the Georgia CDL knowledge tests at DDS: General Knowledge, Air Brakes, Combination Vehicles and endorsements. Original questions on the federal CDL topics.",
    intro:
      "Georgia’s Department of Driver Services issues CDLs. The written exams are the federal knowledge tests. Practice the topics here, then schedule DDS.",
    markdown: `## How Georgia CDL testing works

DDS handles knowledge testing, CLPs and skills tests (including third-party examiners where DDS allows). Official start: [Georgia DDS CDL](https://dds.georgia.gov/cdl).

Use DDS for appointments, fees, ELDT proof, and medical self-certification. Do not show up without the documents DDS lists that week.

## What to practice

- [General Knowledge](/exams/cdl/general-knowledge)
- [Air Brakes](/exams/cdl/air-brakes)
- [Combination Vehicles](/exams/cdl/combination-vehicles) for Class A
- Endorsements: [H](/exams/cdl/hazardous-materials), [N](/exams/cdl/tanker), [P](/exams/cdl/passenger)

[Free CDL practice](/exams/cdl/practice-test) · [mock exam](/mock/cdl) · [passing score 80%](/exams/cdl/guides/passing-score)

Atlanta-area Class A demand is combination work: do not skip Combination Vehicles. [Class A vs B](/exams/cdl/guides/class-a-vs-class-b) · [CLP](/exams/cdl/guides/cdl-permit).

Other states: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Florida](/exams/cdl/guides/florida).`,
    faq: [
      {
        question: "Is the Georgia CDL test different from other states?",
        answer:
          "Topics are the federal CDL knowledge tests. You still use the Georgia DDS handbook and test at DDS.",
      },
      {
        question: "Where do I take the Georgia CDL written test?",
        answer: "DDS customer service centers that offer commercial testing. CertReady does not administer DDS exams.",
      },
      {
        question: "What score does Georgia require?",
        answer: "80% on each knowledge test.",
      },
    ],
  },
];

export const CDL_PRACTICE_COPY = `## How this practice test is set up

CDL knowledge tests are **80% to pass**, scored **one test at a time**. Most states use **50 questions** for General Knowledge (40 correct), **25** for Air Brakes, **20** for Combination Vehicles, and **20–30** for endorsements.

CertReady’s bank is original practice on those topics — space and hours of service in General Knowledge, 60 psi and spring brakes in Air Brakes, coupling and off-tracking in Combination, placards, surge and passenger railroad stops. It is not a Georgia-only or California-only quiz; the federal manual is the same, and we add [state landing pages](/exams/cdl/guides/california) for booking.

Start with a 10-question mixed set. Drill a weak category. Sit the timed mock (50 questions / 50 minutes) when category scores are **85%+**.

- [Class A vs Class B vs Class C](/exams/cdl/guides/class-a-vs-class-b)
- [CDL permit (CLP)](/exams/cdl/guides/cdl-permit)
- [Passing score (80%)](/exams/cdl/guides/passing-score)
- [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia)
`;
