import type { ExamGuide } from "./exam-guide-types";

export const CDL_GUIDES: ExamGuide[] = [
  {
    slug: "class-a-vs-class-b",
    title: "CDL Class A vs Class B vs Class C",
    seoTitle: "Class A vs Class B CDL Practice Test — Which Tests You Sit",
    seoDescription:
      "Class A CDL practice is General Knowledge, Combination, and Air Brakes. Class B skips Combination. Class C is 16+ passengers or placarded hazmat. Practice the tests for the license you are booking.",
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

## Class A CDL practice test

Class A is three knowledge tests, not one quiz:

1. [General Knowledge](/exams/cdl/general-knowledge)
2. [Combination Vehicles](/exams/cdl/combination-vehicles)
3. [Air Brakes](/exams/cdl/air-brakes), unless you are sure the truck is hydraulic-only

Then the skills test in a tractor-trailer. The walkaround includes the fifth wheel: [pre-trip inspection checklist](/exams/cdl/guides/pre-trip).

## Class B CDL practice test

Class B does **not** sit Combination Vehicles. Practice:

1. [General Knowledge](/exams/cdl/general-knowledge)
2. [Air Brakes](/exams/cdl/air-brakes) if the straight truck, dump, mixer, or bus has air brakes
3. [Passenger](/exams/cdl/passenger) when the vehicle is built for 16 or more, including the driver

The skills test is the same three parts, without a fifth-wheel script. Use the Class B half of the [pre-trip inspection checklist](/exams/cdl/guides/pre-trip).

## What to practice

1. [General Knowledge](/exams/cdl/general-knowledge) — every class
2. [Air Brakes](/exams/cdl/air-brakes) — unless you are sure the vehicle is hydraulic-only
3. [Combination Vehicles](/exams/cdl/combination-vehicles) — Class A only
4. Timed [mock](/mock/cdl) once category scores are above 85%

Passing is **80% per test**: [CDL passing score](/exams/cdl/guides/passing-score). Those written tests are the [CDL permit practice test](/exams/cdl/guides/cdl-permit). Pass them and the state prints the CLP you hold before the skills test.

State booking: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia). Skills test: [pre-trip inspection checklist](/exams/cdl/guides/pre-trip).`,
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
      {
        question: "Where is the Class A CDL practice test?",
        answer:
          "Class A is three knowledge tests, not one quiz: General Knowledge, Combination Vehicles, and Air Brakes if the truck has air brakes. Practice each section, then the timed mock. The permit is issued after those tests.",
      },
      {
        question: "Where is the Class B CDL practice test?",
        answer:
          "Class B is General Knowledge, plus Air Brakes if the truck has them. There is no Combination Vehicles test. A bus built for 16 or more people, including the driver, also needs the Passenger endorsement. Practice those sections, then the timed mock.",
      },
    ],
  },
  {
    slug: "cdl-permit",
    title: "CDL Permit Practice Test",
    seoTitle: "Free CDL Permit Practice Test — CLP Knowledge Questions",
    seoDescription:
      "Free CDL permit practice for the CLP knowledge tests: General Knowledge, Air Brakes, and Combination. 80% on each test. Your state scores the real exam; this site does not print a permit.",
    intro:
      "The CDL permit test is the set of knowledge tests your state gives before it prints a Commercial Learner's Permit. There is no second quiz called “permit.” Practice those tests here, then book the office that scores them.",
    markdown: `## What to practice for the permit

The appointment that gets you a **CLP** is the written knowledge tests. Drill them until each one is above **80%**, then schedule.

| Test | Who sits it for a permit | Usual questions | Correct to pass |
| --- | --- | --- | --- |
| [General Knowledge](/exams/cdl/general-knowledge) | Every class | 50 | 40 |
| [Air Brakes](/exams/cdl/air-brakes) | Any air-brake truck | 25 | 20 |
| [Combination Vehicles](/exams/cdl/combination-vehicles) | Class A | 20 | 16 |
| [Hazmat](/exams/cdl/hazardous-materials) | Placarded loads | 30 | 24 |
| [Tanker](/exams/cdl/tanker) | Tank vehicles | 20 | 16 |
| [Passenger](/exams/cdl/passenger) | 16+ including the driver | 20 | 16 |

A few states change the **count**. Illinois uses **30** General Knowledge questions. Pennsylvania lists a longer Class A written set and waits **15 days** (not 14) before the skills test. Both still use **80%** on the knowledge tests except Illinois school bus, which is 90%. Full table: [CDL passing score](/exams/cdl/guides/passing-score).

New York and other states use the same federal topics. The booklet at the window is what counts for the exact length. Start with General Knowledge either way.

CertReady’s [free CDL practice test](/exams/cdl/practice-test) is original questions on those topics, with explanations. It is not a copy of the DMV form, and a passing score here does not print a CLP. When category scores are **85%+**, sit the timed [mock](/mock/cdl) (50 questions, 50 minutes).

Class A adds Combination and almost always Air Brakes. Class B skips Combination. Compare them in [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b) before you pay for the wrong set.

## What a CLP is

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

## Can you take the General Knowledge test online?

Practice is online. The **scored** knowledge test is not a public webpage.

California lets you start a CDL **application** online, then you sit the knowledge tests at DMV. Texas DPS, Florida DHSMV and Georgia DDS work the same way: use their site to prepare, take the test at their office unless that agency is currently offering a supervised remote session. An open-internet quiz cannot print a CLP.

Use the [General Knowledge practice test](/exams/cdl/general-knowledge) before the appointment, not instead of it. State booking: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).

## What to study before you book

The permit exam **is** the knowledge tests. Use the table at the top of this page, then:

- [Free CDL practice test](/exams/cdl/practice-test) for a mixed set
- [Hazmat practice test](/exams/cdl/hazardous-materials) if the job is placarded freight (H on a permit is limited; you still learn the test)
- [Passing score](/exams/cdl/guides/passing-score) so a 39/50 does not surprise you
- Timed [mock exam](/mock/cdl)

## State notes

Waiting periods, fees, and whether you retest the same day are local. Start here:

- [California CDL](/exams/cdl/guides/california)
- [Texas CDL](/exams/cdl/guides/texas) — includes the Texas Commercial Rules test
- [Ohio CDL](/exams/cdl/guides/ohio)
- [Florida CDL](/exams/cdl/guides/florida)
- [Georgia CDL](/exams/cdl/guides/georgia)
- [Pre-trip inspection checklist](/exams/cdl/guides/pre-trip) — the skills test, after the permit

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
          "General Knowledge is the test every applicant takes. The permit also requires Air Brakes if the truck has them, Combination Vehicles for Class A, and any endorsement tests you need. Pass those and the state prints the CLP.",
      },
      {
        question: "Is there a free CDL permit practice test?",
        answer:
          "Yes. CertReady’s General Knowledge, Air Brakes, Combination, and endorsement sets are free to start, with an explanation on every answer. The scored permit test is still at your state licensing office.",
      },
      {
        question: "How many questions are on the CDL permit test?",
        answer:
          "Most states use 50 General Knowledge questions (40 correct), 25 Air Brakes (20 correct), and 20 Combination (16 correct). Illinois uses 30 General Knowledge questions. Pennsylvania’s Class A written set is longer. Passing is 80% on each test.",
      },
      {
        question: "Does CertReady give a CDL permit?",
        answer: "No. We are independent practice. Book knowledge tests with your state licensing agency.",
      },
      {
        question: "Can you take the CDL General Knowledge test online?",
        answer:
          "You can practice online. The test your state scores is given by that state's licensing agency, usually at a DMV, DPS, DHSMV or DDS office. California's application can be started online; the knowledge test is still a DMV exam. Passing a website quiz does not issue a CLP.",
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

A few states change the **count**, not the idea of a per-test pass:

| State | What is different | Still |
| --- | --- | --- |
| Most states | General Knowledge about **50** questions | **80%** (40 correct) |
| [Illinois](https://www.ilsos.gov/departments/drivers/drivers-license/cdl/cdl.html) | General Knowledge is **30** questions. The school bus test is **90%**, not 80%. | **80%** on the other knowledge tests (24 of 30 on General Knowledge) |
| [Pennsylvania](https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/commercial-drivers-license-faqs) | PennDOT’s table lists **70** knowledge questions for Class A and **50** for Class B and Class C. The skills test waits **15 days** after the permit, not 14. | **80%** |

Confirm the count on your state's handout before you walk in. [Texas](/exams/cdl/guides/texas) adds a separate Texas Commercial Rules test before General Knowledge. [Ohio](/exams/cdl/guides/ohio) uses the federal topics at a driver exam station.

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

The written tests are not the [pre-trip inspection checklist](/exams/cdl/guides/pre-trip). That is the first part of the skills test, after you already hold the permit.

Related: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b) · [CDL permit](/exams/cdl/guides/cdl-permit) · [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio)`,
    faq: [
      {
        question: "Is the CDL passing score 70% or 80%?",
        answer:
          "The federal standard states use is 80% on each knowledge test. Illinois requires 90% on the school bus knowledge test. Do not study to 70%. Skills tests, including the pre-trip inspection, are scored on the state's score sheet, not as a percentage of written items.",
      },
      {
        question: "If I fail one section, do I retake everything?",
        answer:
          "Usually you retake only the test you failed. Credit for tests you passed is a state timing rule — do not assume it lasts forever if you wait months.",
      },
      {
        question: "Does a 50-question CertReady mock match the real test?",
        answer:
          "It matches the usual General Knowledge length and the 80% bar. Illinois uses 30 General Knowledge questions, and Pennsylvania lists 70 for Class A. The topics are the same. Use category scores, not one lucky mock, to decide when to book.",
      },
    ],
  },
  {
    slug: "california",
    title: "California CDL Practice Test",
    seoTitle: "California CDL Practice Test — CA DMV General Knowledge & Endorsements",
    seoDescription:
      "California CDL practice test for the DMV knowledge exams: usually 50 General Knowledge questions, 80% to pass, three attempts. Original questions, then book DMV.",
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

## How many questions are on the California CDL test?

Each test is scored on its own at **80%**. Plan on the usual federal counts unless the handout at the DMV window says otherwise:

| Test | Usual questions | Correct to pass |
| --- | --- | --- |
| General Knowledge | 50 | 40 |
| Air Brakes | 25 | 20 |
| Combination Vehicles | 20 | 16 |

DMV gives you **three attempts** at each required knowledge test. Fail the same test three times and that application is no longer valid — you reapply. You also have **12 months** from the application to finish both the knowledge tests and the skills test, or you start over. Confirm both clocks on the [CA DMV CDL page](https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/commercial-driver-licenses-cdl/).

## How to pass the California CDL permit test

The permit test **is** the knowledge tests. There is not a second written exam after them.

1. Decide class: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b)
2. Drill [General Knowledge](/exams/cdl/general-knowledge) until you are above 85%
3. Add [Air Brakes](/exams/cdl/air-brakes) unless the truck is hydraulic-only
4. Class A: [Combination Vehicles](/exams/cdl/combination-vehicles)
5. Sit a timed [mock](/mock/cdl), then book DMV
6. After you pass, DMV issues the CLP. Hold it at least **14 days**, with a qualified CDL holder beside you, before the skills test

The written section people miss is **Air Brakes** — the 60 psi warning, leakage rates and spring brakes — not a trick question buried in General Knowledge. Class A applicants also drop Combination. Read the [passing score](/exams/cdl/guides/passing-score) page before you walk in.

Entry-level driver training (ELDT) is required before the **skills** test and before a hazmat knowledge test. It does not replace the DMV knowledge tests.

## Class and permit

- [Class A vs Class B CDL practice test](/exams/cdl/guides/class-a-vs-class-b)
- [CDL permit (CLP)](/exams/cdl/guides/cdl-permit)
- Interstate still means age **21** and a current medical certificate

## Practice

[Free California-oriented CDL practice test](/exams/cdl/practice-test) — original questions, explanations, no DMV affiliation.

Other states: [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia). The skills-test walkaround is the [pre-trip inspection checklist](/exams/cdl/guides/pre-trip), not this written bank.`,
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
      {
        question: "How many questions are on the California CDL test?",
        answer:
          "Plan on 50 General Knowledge questions (40 correct), 25 Air Brakes (20 correct) and 20 Combination Vehicles (16 correct), each at 80%. Use the DMV handout if your office shows a different count. You get three attempts per test; a third fail voids the application.",
      },
      {
        question: "How do you pass the California CDL permit test?",
        answer:
          "The permit test is the knowledge tests at DMV. Practice General Knowledge, Air Brakes and Combination (Class A) above 85%, then book DMV. After you pass, DMV issues the CLP. Hold it at least 14 days before the skills test. A website quiz does not issue the permit.",
      },
      {
        question: "What is the hardest part of the CDL test?",
        answer:
          "On the written side, Air Brakes is the section people fail: low-air warning, leakage and spring brakes. Class A also loses points on Combination Vehicles. The pre-trip skills test is a separate exam and is not in this practice bank.",
      },
    ],
  },
  {
    slug: "texas",
    title: "Texas CDL Practice Test",
    seoTitle: "Texas CDL Practice Test — Commercial Rules, General Knowledge & DPS",
    seoDescription:
      "Texas CDL practice for DPS: Texas Commercial Rules (special requirements) first, then General Knowledge, Air Brakes and endorsements. English-only knowledge tests since June 1, 2026. 80% each.",
    intro:
      "Texas is not only the federal CDL bank. DPS makes you pass Texas Commercial Rules — the test people still call special requirements — before General Knowledge. Practice the federal topics here, and study Section 14 of the Texas handbook for the state test.",
    markdown: `## How Texas CDL testing works

The Department of Public Safety issues the license. Knowledge tests are at a DPS driver license office. After you pass, DPS prints a **CLP**. You hold it at least **14 days**, finish entry-level driver training, then take the skills test in a representative vehicle.

Official steps: [How to apply for a Texas CDL](https://www.dps.texas.gov/section/driver-license/how-do-i-apply-commercial-driver-license).

DPS gives the knowledge exams in this order:

1. **Texas Commercial Rules**
2. **General Knowledge**
3. **Combination** — Class A only
4. **Air Brakes** — if the truck has them
5. **Endorsements** you are adding

The CLP is valid for **180 days** or until your Texas driver license expires, whichever is sooner. It can be renewed once, up to 30 days before it expires, without retaking the knowledge exams. A qualified CDL holder age 21 or older, with the same class, has to sit beside you on the road.

## Texas Commercial Rules (special requirements)

This is a **separate** knowledge test. It is not General Knowledge with a Texas flag on it. DPS still lists it as Texas Commercial Rules. The source in the handbook is **Section 14, Special Requirements for Texas Commercial Motor Vehicles**.

The handbook says you need **80%** on each knowledge test before the skills test. DPS does not publish one fixed public question count for Commercial Rules on the application page. Study Section 14, not a recycled answer key.

Numbers Section 14 actually tests:

| Topic | Texas rule |
| --- | --- |
| Height, including the load | **14 feet**. You still have to clear the bridge in front of you. |
| Width, including the load | **102 inches**, with the handbook’s exceptions |
| Gross weight | **80,000 lb** unless TxDOT issued an oversize/overweight permit |
| Single vehicle length (not a truck-tractor) | **45 feet** |
| Semitrailer in a tractor-semitrailer combo | **59 feet** |
| Mud flaps | Within **8 inches** of the road, on trucks and trailers with four or more rear-axle tires. Not required on a bobtail tractor or a pole trailer. |
| Slow-moving vehicle emblem | Vehicles **designed for 25 mph or less**. Do not put that emblem on an ordinary truck. |
| Disabled vehicle | Carry three flares, red lanterns, or reflective triangles. Put them out first. No flame devices if you are hauling explosives or flammable cargo. |
| Registration papers | On the vehicle, showing empty weight and registered weight |
| Oversize load | TxDOT permit. A permit is not for a load you could reasonably take apart. |
| Trailer brakes | Trailers, semitrailers, and pole trailers at **4,500 lb or less** are exempt. Heavier trailers pick up a brake requirement once weight and speed cross the lines in Section 14. Read that section before you memorize a shortcut. |

General Knowledge will not ask you the 14-foot Texas height limit. Commercial Rules will not ask you the 11-hour driving clock. Drill them as two tests.

## Knowledge tests are in English

Since **June 1, 2026**, DPS gives every CDL and CLP **knowledge** exam in English only. Spanish-language versions are no longer offered, and interpreters are not allowed. The skills test (pre-trip, basic control, road) was already in English.

You have to be able to read signs, talk with the public, and answer an officer, under the federal English rule DPS cites (49 CFR 391.11). If you cannot show that during the test, DPS will not issue the CLP or CDL.

## What to practice on CertReady

The federal half of the Texas appointment is the same bank as every other state:

- [General Knowledge](/exams/cdl/general-knowledge)
- [Air Brakes](/exams/cdl/air-brakes)
- [Combination Vehicles](/exams/cdl/combination-vehicles) for Class A
- Endorsements: [H](/exams/cdl/hazardous-materials), [N](/exams/cdl/tanker), [P](/exams/cdl/passenger)

[Free CDL practice test](/exams/cdl/practice-test) · [mock exam](/mock/cdl) · **80%** [passing score](/exams/cdl/guides/passing-score)

Class lines: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b). On the DPS page, Class A is a combination with a GCWR of 26,001 lb or more when the towed vehicle’s GVWR **exceeds 10,000 lb**. Class B is a single vehicle of 26,001 lb or more and may tow a vehicle that does not exceed 10,000 lb. Permit timing: [CLP](/exams/cdl/guides/cdl-permit). The walkaround is a skills test: [pre-trip inspection checklist](/exams/cdl/guides/pre-trip).

Other states: [California](/exams/cdl/guides/california) · [Ohio](/exams/cdl/guides/ohio) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).`,
    faq: [
      {
        question: "What is the Texas CDL special requirements test?",
        answer:
          "DPS calls it Texas Commercial Rules. It is its own knowledge test, taken before General Knowledge, from Section 14 of the Texas Commercial Motor Vehicle Driver Handbook (special requirements). It covers Texas size, weight, equipment, and paperwork — not the federal hours-of-service chapter.",
      },
      {
        question: "Is the Texas CDL test only the federal test?",
        answer:
          "No. You take Texas Commercial Rules and then the federal-style tests (General Knowledge, Combination for Class A, Air Brakes if equipped, and any endorsement). Both are at DPS.",
      },
      {
        question: "What score do I need in Texas?",
        answer:
          "80% on each knowledge test, including Texas Commercial Rules. A high General Knowledge score does not cover a failed Commercial Rules test.",
      },
      {
        question: "Can I take the Texas CDL knowledge test in Spanish?",
        answer:
          "Not since June 1, 2026. DPS administers CDL and CLP knowledge exams in English only. Interpreters are not allowed. The skills test was already in English.",
      },
      {
        question: "Where do I take the Texas CDL written exam?",
        answer:
          "At a Texas DPS driver license office, by appointment. CertReady does not give the official test and does not issue a CLP.",
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

Other states: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio) · [Georgia](/exams/cdl/guides/georgia). The walkaround is the [pre-trip inspection checklist](/exams/cdl/guides/pre-trip).`,
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

Other states: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio) · [Florida](/exams/cdl/guides/florida). The walkaround is the [pre-trip inspection checklist](/exams/cdl/guides/pre-trip).`,
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
  {
    slug: "ohio",
    title: "Ohio CDL Practice Test",
    seoTitle: "Ohio CDL Practice Test — BMV Knowledge Test, CLP & Skills",
    seoDescription:
      "Ohio CDL practice for the BMV knowledge tests: General Knowledge, Air Brakes, Combination and endorsements. Written tests at a driver exam station, CLP valid 12 months, 80% to pass.",
    intro:
      "Ohio writes the CDL through the Bureau of Motor Vehicles. The knowledge tests are the federal topics, taken in person at a driver exam station. Practice those here, then buy the permit and book the skills test.",
    markdown: `## How Ohio CDL testing works

You already need an Ohio driver license, a Social Security number, and proof of citizenship or lawful permanent residency. Knowledge tests are **in person at a driver exam station**. The CLP and the final license are issued at a **deputy registrar**. Skills tests are at a CDL skills site, and you bring a vehicle that matches the class.

Official start: [Ohio BMV CDL classes](https://www.bmv.ohio.gov/dl-cdl-classes.aspx). The handbook is HSY 7605 (English) and HSY 7606 (Spanish). A Spanish handbook is for study. Translation aids are not allowed on the test, and you have to read, speak, and write English well enough to handle signs, the public, and an officer.

Under **21**, the license is **intrastate** — Ohio only. Interstate driving still waits until 21.

## Permit, then skills

Pass the knowledge test for the class, each endorsement, and air brakes if you want that restriction off. Then purchase the **Commercial Learner’s Permit** and self-certify the kind of driving you will do.

- A CLP is valid for **12 months** in Ohio.
- You may drive a CMV on a highway only with a properly endorsed CDL holder beside you.
- Entry-level driver training has to be on file **before** you schedule or attempt the skills test, unless you are exempt.
- After you pass the skills test, buy the CDL at a deputy registrar **before the CLP expires**.

Ohio’s skills test is three parts, with the clocks the BMV publishes for the state sites:

| Part | Time limit | State-site fee |
| --- | --- | --- |
| Pre-trip inspection | 30 minutes | $10 |
| Basic maneuverability | 40 minutes | $10 |
| Road test | — | $30 |

You buy a CDL test receipt at a deputy registrar before a state-owned site will test you. Third-party sites set their own fees. Fail any part and you wait **two days** to retest. The walkaround itself is covered in the [pre-trip inspection checklist](/exams/cdl/guides/pre-trip). This bank is the written half.

## What to practice

Ohio does not add a separate state-rules knowledge test the way [Texas Commercial Rules](/exams/cdl/guides/texas) does. Use the federal topics:

- [General Knowledge](/exams/cdl/general-knowledge)
- [Air Brakes](/exams/cdl/air-brakes) if the truck has air brakes
- [Combination Vehicles](/exams/cdl/combination-vehicles) for Class A
- [Hazmat](/exams/cdl/hazardous-materials), [Tanker](/exams/cdl/tanker), [Passenger](/exams/cdl/passenger) if you need the letter

Passing is **80% on each knowledge test** — [passing score](/exams/cdl/guides/passing-score). Class lines match the usual split: [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b). Hazmat still needs the TSA threat assessment before the endorsement goes on the license.

[Free CDL practice test](/exams/cdl/practice-test) · [timed mock](/mock/cdl) · [permit](/exams/cdl/guides/cdl-permit)

Other states: [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia).`,
    faq: [
      {
        question: "Where do I take the Ohio CDL written test?",
        answer:
          "At a driver exam station. The permit and the license card are issued at a deputy registrar. Skills tests are at a CDL skills location. CertReady is not an Ohio testing site.",
      },
      {
        question: "How long is an Ohio CDL permit good for?",
        answer:
          "12 months. You still need a qualified CDL holder with you when you practice on a highway, and you must finish skills testing and pay for the license before that permit expires.",
      },
      {
        question: "What is the Ohio CDL passing score?",
        answer:
          "80% on each knowledge test — General Knowledge, Air Brakes, Combination, and each endorsement — scored separately.",
      },
      {
        question: "Does Ohio have a special requirements test like Texas?",
        answer:
          "No. Ohio uses the federal knowledge tests for the class and endorsements. Texas is the state that adds Texas Commercial Rules before General Knowledge.",
      },
      {
        question: "Can I use a Spanish translator on the Ohio CDL test?",
        answer:
          "No. Ohio publishes a Spanish handbook (HSY 7606) for study, and translation aids are prohibited at the test. You have to be able to read, speak, and write English.",
      },
    ],
  },
  {
    slug: "pre-trip",
    title: "CDL Pre-Trip Inspection Checklist",
    seoTitle: "CDL Pre-Trip Inspection Checklist — Class A and Class B",
    seoDescription:
      "CDL pre-trip inspection checklist for the skills test: engine, cab, lights, walkaround, and the in-cab air test. Class A adds the fifth wheel. A practice script, not your state's score sheet.",
    intro:
      "The pre-trip inspection is a skills test. You walk the truck with an examiner and say what you are checking and what would make it illegal to drive. The checklist below is a practice script. A website quiz cannot print that score.",
    markdown: `## Where pre-trip sits

The CDL is two appointments, not one.

1. **Knowledge tests** at the state office. Pass them and you get a [permit](/exams/cdl/guides/cdl-permit).
2. **Skills test** after the waiting period, in a truck that matches the class you want. The skills test is three parts, in order: **vehicle inspection (pre-trip)**, **basic control**, then the **road test**.

People search “pre-trip practice test” because the inspection feels like a quiz. It is scored like a demonstration. You point, you name the part, you say the defect that would put the truck out of service, and you say why. Touching a tire without saying “looking for cuts, bulges, and tread depth” does not count.

CertReady’s question bank is the **written** half: [General Knowledge](/exams/cdl/general-knowledge), [Air Brakes](/exams/cdl/air-brakes), [Combination Vehicles](/exams/cdl/combination-vehicles), and the endorsements. Use it before the permit appointment. Use the state handbook’s inspection section, out loud, on a real truck, before the skills appointment.

## What examiners are listening for

They are not impressed by a memorized paragraph you cannot attach to a part. The pattern that scores is short:

- **Name** the item (steering shaft, slack adjuster, gladhand, tread).
- **Condition** you would reject (cracked, loose, leaking, missing, worn past the limit).
- **Why** it matters (loss of steering, no trailer brakes, a blowout).

Do that for the area they point at, then move. Silence while you stare at a component is a miss even if you know the answer.

Group the truck so you do not skip a side:

| Area | What you are proving |
| --- | --- |
| Engine compartment | Fluids, belts, hoses, steering, and leaks you can see with the hood open |
| Cab and start | Gauges, horn, wipers, emergency equipment, and that the parking brake will hold |
| Lights and glass | Lights work, glass is not broken, mirrors are secure |
| Coupling (Class A) | Fifth wheel, locking jaws, air lines, and the kingpin area — see [Combination Vehicles](/exams/cdl/combination-vehicles) |
| Walkaround | Tires, wheels, suspension, brakes, frame, and cargo securement |
| Brake test | The in-cab air test if the truck has air brakes: applied leak, low-air warning, and spring brakes. Numbers are in the checklist below. |

Class B is the same idea without the fifth wheel. A bus adds passenger items; school bus adds student-specific checks. Those endorsement scripts are not in this bank.

## Pre-trip inspection checklist

This is a practice script, not a state score sheet and not a PDF. The examiner marks the list in your state's current CDL manual. On a parked truck, point at the part and say three things: the **name**, the **condition you would reject**, and **why** the truck should not move.

### Every truck — Class A and Class B

**Under the hood**

- Oil, coolant, and power-steering fluid at the mark, and no fresh leak on the ground
- Hoses and belts not cut, cracked, or glazed. A belt-driven compressor or alternator should not have a loose belt
- Air compressor, alternator, and water pump mounted, with no bare wires
- Steering shaft and box not bent or cracked, no play you can see, no leak at the box

**In the cab, before you roll**

- Seat belt, mirrors, horn, wipers, and washer fluid
- Extinguisher charged, triangles in reach, spare fuses if that truck uses them
- After start, oil pressure rises and the air gauges climb
- Parking brake holds the truck

**Lights**

- Front markers amber, rear lamps red
- Headlights, turn signals, brake lights, and hazards work on both sides
- Lenses not cracked or painted over

**Walkaround, both sides**

- Tires: at least **4/32 inch** in every major groove on the steering axle, **2/32 inch** on the other axles, no cut that shows cord
- Wheels: no cracked rim, no loose or missing lug nuts, no leak at the hub
- Suspension: springs not broken or shifted, U-bolts tight, shocks not leaking
- Brakes: hoses not rubbed through, chambers not cracked. A slack adjuster that moves more than about an inch where the push rod attaches needs adjustment
- Frame and cargo: no fresh crack at a crossmember, nothing that can shift

**In-cab air test**, engine off and key on, after pressure is built:

- Hold the foot brake. After the needle settles from the first application, pressure should not drop more than **3 psi in one minute** on a single vehicle or **4 psi** on a combination
- Fan the pedal. The warning light or buzzer must come on **before pressure drops below 55 psi**, unless the manufacturer marks a different point and your score sheet uses that
- Keep fanning. The parking-brake knob should pop out between **20 and 45 psi**

The written [Air Brakes](/exams/cdl/air-brakes) set still drills a **60 psi** warning, which is the older knowledge-test line. On the skills test, say **55 psi**, because that is the cutoff in the current national manual. If the sheet the examiner is holding prints another number, say that number.

### Class A only — coupling

Skip this block on a straight truck.

- Fifth-wheel plate not cracked, greased, and mounted solid to the frame
- Locking jaws closed on the kingpin shank, lever seated, no daylight between the upper and lower fifth wheel
- Air lines and the electric cord connected, gladhands seated, lines with enough slack to turn and not so much that they drag
- Landing gear fully up. Trailer tires, lights, and brakes are part of the same walkaround

The written version of that hardware is [Combination Vehicles](/exams/cdl/combination-vehicles). The checklist is those parts, said out loud. Which class sits that test is in [Class A vs Class B](/exams/cdl/guides/class-a-vs-class-b).

### Class B

No fifth wheel, and the air-leak limit is the single-vehicle **3 psi** figure. If the truck tows a trailer rated under 10,001 lb, say the hitch, safety chains, and trailer lights. That hitch is not a Class A fifth wheel. The written tests for this license are General Knowledge and Air Brakes: [Class B CDL practice test](/exams/cdl/guides/class-a-vs-class-b).

CertReady does not publish a PDF of this list. Use the inspection section in your state handbook next to this script.

## Air brakes are part of the inspection

If the test truck has air brakes and you skipped the air-brake knowledge test, you already have a restriction and you should not be testing in that truck. On the pre-trip, the examiner still wants the **in-cab air test**, not just a look at a hose.

Say the checklist numbers as you do the test: applied leak no more than **3 psi** in one minute on a single vehicle or **4 psi** on a combination, warning before **55 psi**, parking brake popping out between **20 and 45 psi**. Guessing the sequence on test day is how people fail a truck they can otherwise drive. The written drill, which still uses the 60 psi wording, is the [Air Brakes](/exams/cdl/air-brakes) practice page and the [study guide](/exams/cdl/study-guide).

## State clocks, same inspection

The inspection is federal in outline and local in the score sheet.

- **Ohio** gives the pre-trip **30 minutes** at state sites and charges $10 for that part. Fail it and you wait two days. Details: [Ohio CDL](/exams/cdl/guides/ohio).
- **Texas** uses the modernized AAMVA inspection, with a checklist to help you, at every CDL test site except Del Rio and Wichita Falls. Details: [Texas CDL](/exams/cdl/guides/texas).
- **California** scores the inspection as a skills test after the knowledge tests. The written bank is separate. Details: [California CDL](/exams/cdl/guides/california).

Bring a truck that matches the class. A Class A permit tested in a straight truck does not give you Class A. Rented or school trucks are normal; the examiner does not care whose name is on the title if the vehicle is legal and representative.

## How to practice this week

1. Pass the written tests in practice first: [free CDL practice test](/exams/cdl/practice-test) and a [mock](/mock/cdl) above 85%.
2. Print your state’s inspection list from the handbook. Do not use a random photo set from another state.
3. Walk a parked truck once a day. Say the part, the bad condition, and why, until you can do one side without reading.
4. Add the air-brake test only after the walkaround is boring. Mixing both on day one is how the 55 psi warning step gets skipped.
5. Book the skills test only after the [permit wait](/exams/cdl/guides/cdl-permit) (often 14 days; Pennsylvania uses 15).

All CertReady questions are original written practice. We do not administer pre-trip exams and we are not your state licensing agency.`,
    faq: [
      {
        question: "Is the CDL pre-trip the same as the General Knowledge test?",
        answer:
          "No. General Knowledge is a written test you take to get the permit. The pre-trip is the vehicle inspection at the start of the skills test, after you already hold that permit.",
      },
      {
        question: "Can I take a CDL pre-trip practice test online?",
        answer:
          "You can rehearse the script online and drill the written air-brake and combination questions here. The scored inspection is in person, on a truck, with an examiner. Passing a webpage does not waive it.",
      },
      {
        question: "What do people fail on the pre-trip?",
        answer:
          "They point and stay quiet, they skip the in-cab air-brake test, or they never look at the coupling on a combination vehicle. Name the part, the defect, and why it matters.",
      },
      {
        question: "How long is the pre-trip inspection?",
        answer:
          "There is no single national clock. Ohio allows 30 minutes for the pre-trip at state sites. Other states publish their own limit on the score sheet. Ask when you schedule.",
      },
      {
        question: "Does CertReady include pre-trip questions?",
        answer:
          "The bank covers the written tests, including air brakes and combination vehicles, which supply the numbers you recite during the inspection. It is not a scored walkaround. The checklist on this page is the practice script.",
      },
      {
        question: "Is there a CDL pre-trip inspection checklist?",
        answer:
          "Yes. The checklist on this page is the practice script: hood, cab, lights, both sides of the walkaround, and the in-cab air test. Class A adds the fifth wheel. Your state handbook is the sheet the examiner scores. This site does not publish that sheet as a PDF.",
      },
      {
        question: "What is different on a Class A pre-trip versus Class B?",
        answer:
          "Class A includes the fifth wheel, kingpin, gladhands, and the combination air-leak limit of 4 psi in one minute. Class B is the straight truck: no fifth wheel, and the air-leak limit is 3 psi in one minute. Both still do the engine, cab, lights, tires, and brakes.",
      },
    ],
  },
];

export const CDL_PRACTICE_COPY = `## How this practice test is set up

CDL knowledge tests are **80% to pass**, scored **one test at a time**. Most states use **50 questions** for General Knowledge (40 correct), **25** for Air Brakes, **20** for Combination Vehicles, and **20–30** for endorsements. Illinois uses **30** General Knowledge questions, and Pennsylvania lists **70** for Class A. The percentage stays 80% except Illinois school bus, which is 90%. See the [passing score](/exams/cdl/guides/passing-score) page.

CertReady’s bank is original CDL test questions on those topics — space and hours of service in General Knowledge, 60 psi and spring brakes in Air Brakes, coupling and off-tracking in Combination, placards, surge and passenger railroad stops. It is not a Georgia-only or California-only quiz; the federal manual is the same, and we add [state landing pages](/exams/cdl/guides/california) for booking.

Start with a 10-question mixed set. Drill a weak category. Sit the timed mock (50 questions / 50 minutes) when category scores are **85%+**.

- [Class A vs Class B CDL practice test](/exams/cdl/guides/class-a-vs-class-b)
- [CDL permit practice test](/exams/cdl/guides/cdl-permit) — the knowledge tests that get you a CLP
- [Hazmat practice test](/exams/cdl/hazardous-materials) · [Air Brakes](/exams/cdl/air-brakes) · [Combination Vehicles](/exams/cdl/combination-vehicles)
- [Passing score (80%)](/exams/cdl/guides/passing-score)
- [California](/exams/cdl/guides/california) · [Texas](/exams/cdl/guides/texas) · [Ohio](/exams/cdl/guides/ohio) · [Florida](/exams/cdl/guides/florida) · [Georgia](/exams/cdl/guides/georgia)
- [Pre-trip inspection checklist](/exams/cdl/guides/pre-trip) — skills test, not this written bank
`;
