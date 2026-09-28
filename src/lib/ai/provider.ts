import "server-only";
import type { StudyAssistantProvider } from "./types";

const NOT_ENABLED = "AI features are not enabled in this deployment.";

/**
 * Registered assistant. The MVP ships a provider that declines every call, so any
 * UI wired to it in Phase 2 can show "coming soon" rather than crash.
 */
const notConfigured: StudyAssistantProvider = {
  name: "not-configured",
  async explainQuestion() {
    throw new Error(NOT_ENABLED);
  },
  async generateSimilarQuestions() {
    throw new Error(NOT_ENABLED);
  },
  async buildStudyPlan() {
    throw new Error(NOT_ENABLED);
  },
  async analyzeWeakTopics() {
    throw new Error(NOT_ENABLED);
  },
};

let provider: StudyAssistantProvider = notConfigured;

export function getStudyAssistant(): StudyAssistantProvider {
  return provider;
}

/** Phase 2: call once at startup with a real implementation. */
export function registerStudyAssistant(next: StudyAssistantProvider) {
  provider = next;
}

export const aiEnabled = () => provider.name !== "not-configured";
