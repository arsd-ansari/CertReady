import type { SeedExam, SeedQuestion } from "./epa-608";
import type { Exam as LegacyExam } from "./legacy-types";

/**
 * Converts the original hardcoded water-operator exams into the seed format.
 * Free/premium split: the first 60% of each exam's bank is free.
 */
export function fromLegacy(exam: LegacyExam, opts: { categorySlug: string; states?: string[] }): SeedExam {
  const freeCutoff = Math.ceil(exam.questions.length * 0.6);

  const questions: SeedQuestion[] = exam.questions.map((question, index) => ({
    category: question.topicId,
    prompt: question.prompt,
    options: question.choices.map((choice, i) => ({
      label: "ABCD"[i],
      text: choice.text,
      correct: choice.id === question.correctChoiceId,
    })),
    explanation: question.explanation,
    difficulty: "MEDIUM",
    isFree: index < freeCutoff,
    tags: [question.topicId],
  }));

  return {
    slug: exam.slug,
    title: `${exam.title} — ${exam.level}`,
    shortTitle: `${exam.shortTitle} ${exam.level}`,
    summary: exam.description,
    certifyingBody: exam.body,
    categorySlug: opts.categorySlug,
    scope: "STATE",
    states: opts.states ?? [],
    difficulty: "MEDIUM",
    isFeatured: false,
    realQuestionCount: exam.format.questions,
    realTimeMinutes: exam.format.minutes,
    passingScoreText: exam.format.passingScore,
    mockQuestionCount: 20,
    mockTimeMinutes: exam.mockMinutes,
    freeQuestionLimit: 10,
    seoTitle: `${exam.title} ${exam.level} Practice Test — Free Questions`,
    seoDescription: `Free ${exam.title} ${exam.level} practice questions with explanations. ${exam.description}`,
    overview: `## About the ${exam.title} ${exam.level} exam\n\n${exam.description}\n\nThe exam is written by the ${exam.body}. Most states use it directly or adopt a closely aligned version, so the topic weights below are a reliable guide to what you will see.\n\n## Exam facts\n\n- **${exam.format.questions} questions**, multiple choice\n- **${exam.format.minutes} minutes**\n- Passing score: **${exam.format.passingScore}**`,
    whoShouldTake: `- Operators-in-training seeking their first ${exam.shortTitle.toLowerCase()} certification\n- Utility staff moving from maintenance or laboratory roles into operations\n- Anyone whose state requires ${exam.level} certification to operate a small system\n\nCheck your state's certification board for experience and education requirements before scheduling.`,
    requirements: `## Eligibility\n\nEligibility is set by each state's operator certification program, not by the exam author. ${exam.level} typically requires a high-school diploma or GED and little or no experience, with experience requirements increasing at higher grades.\n\n## Format\n\n- ${exam.format.questions} multiple-choice questions\n- ${exam.format.minutes} minutes\n- Passing score ${exam.format.passingScore}\n- Calculators are generally permitted; a formula and conversion sheet is normally provided.\n\nAlways confirm details with your state program.`,
    studyGuide: `## Topic weights\n\n| Topic | Approximate share |\n| --- | --- |\n${exam.topics.map((t) => `| ${t.name} | ${t.weight}% |`).join("\n")}\n\n## How to prepare\n\n1. Practice each topic until you consistently score above 80%.\n2. Work operator math by hand — unit conversions, flow, dosage and detention time appear on every exam.\n3. Take timed mock exams and review every missed question's explanation.\n4. Re-drill the weak categories your dashboard highlights.`,
    faq: [
      {
        question: `How many questions are on the ${exam.title} ${exam.level} exam?`,
        answer: `${exam.format.questions} multiple-choice questions in ${exam.format.minutes} minutes, with a passing score of ${exam.format.passingScore}. Confirm with your state program, as some states adjust the format.`,
      },
      {
        question: "Is a formula sheet provided?",
        answer: "Most administrations provide a formula and conversion sheet. You still need to know which formula applies and how to rearrange it.",
      },
      {
        question: "Are these the real exam questions?",
        answer: "No. All CertReady questions are original practice material covering the same topics as the official exam.",
      },
    ],
    officialResources: [
      {
        label: "Water Professionals International (formerly ABC) — Certification",
        url: "https://www.wpi.org/",
        description: "Exam author; publishes need-to-know criteria and formula sheets.",
      },
    ],
    categories: exam.topics.map((topic) => ({
      slug: topic.id,
      name: topic.name,
      description: `${topic.name} questions for the ${exam.title} ${exam.level} exam.`,
      longDescription: `Practice ${topic.name.toLowerCase()} questions for the ${exam.title} ${exam.level} exam. This topic makes up roughly ${topic.weight}% of the real exam.`,
      weight: topic.weight,
      seoTitle: `${exam.title} ${exam.level} — ${topic.name} Practice Questions`,
      seoDescription: `Free ${topic.name.toLowerCase()} practice questions with explanations for the ${exam.title} ${exam.level} certification exam.`,
    })),
    sources: [],
    questions,
  };
}
