export type Choice = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  topicId: string;
  prompt: string;
  choices: Choice[];
  correctChoiceId: string;
  /** Teaches the miss: why the right answer is right and the tempting one is wrong. */
  explanation: string;
};

export type Topic = {
  id: string;
  name: string;
  /** Rough share of the real exam, as a percentage. Used to weight mocks. */
  weight: number;
};

export type Exam = {
  slug: string;
  title: string;
  shortTitle: string;
  /** e.g. "Grade 1" */
  level: string;
  /** Who writes the real exam. */
  body: string;
  description: string;
  /** Real-exam facts shown on the overview page. */
  format: {
    questions: number;
    minutes: number;
    passingScore: string;
  };
  topics: Topic[];
  questions: Question[];
  /** Minutes allowed for a timed mock built from this bank. */
  mockMinutes: number;
};

export type AttemptMode = "practice" | "mock";

export type Attempt = {
  examSlug: string;
  mode: AttemptMode;
  completedAt: string;
  total: number;
  correct: number;
  byTopic: Record<string, { correct: number; total: number }>;
};
