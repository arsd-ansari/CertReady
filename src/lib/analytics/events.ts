/** Event names shared by client (GA) and server (AnalyticsEvent table). */
export const EVENTS = {
  examViewed: "exam_viewed",
  practiceStarted: "practice_started",
  questionAnswered: "question_answered",
  mockStarted: "mock_exam_started",
  mockCompleted: "mock_exam_completed",
  registered: "registration",
  loggedIn: "login",
  subscribed: "subscription",
  upgradeClicked: "upgrade_clicked",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
