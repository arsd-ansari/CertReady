/**
 * Phase 2 AI boundary.
 *
 * The question engine and dashboard depend only on these interfaces. A concrete
 * provider (OpenAI, Anthropic, a fine-tuned model, or a rules-based fallback) is
 * registered in `provider.ts`. Nothing in the MVP calls a model.
 */

export type StudyContext = {
  userId: string;
  examId: string;
  /** Category id -> accuracy 0..1 from recent activity. */
  categoryAccuracy: Record<string, number>;
  examDate?: Date | null;
};

export type ExplainRequest = {
  questionId: string;
  /** Option the learner chose, if any. */
  selectedOptionId?: string | null;
  /** Free-text follow-up, e.g. "why not B?" */
  followUp?: string;
};

export type SimilarQuestionsRequest = {
  questionId: string;
  count: number;
};

export type GeneratedQuestion = {
  prompt: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

export type StudyPlan = {
  summary: string;
  weeks: { week: number; focus: string[]; targetQuestions: number }[];
};

export interface StudyAssistantProvider {
  readonly name: string;
  explainQuestion(req: ExplainRequest): Promise<string>;
  generateSimilarQuestions(req: SimilarQuestionsRequest): Promise<GeneratedQuestion[]>;
  buildStudyPlan(ctx: StudyContext): Promise<StudyPlan>;
  analyzeWeakTopics(ctx: StudyContext): Promise<{ categoryId: string; advice: string }[]>;
}
