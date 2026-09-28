"use server";

import { getCurrentUser } from "@/lib/auth/session";
import { EVENTS } from "./events";
import { trackServer } from "./server";

/** Called from the client on exam page mount so static pages still record views. */
export async function trackExamView(examId: string) {
  if (!examId || examId.length > 64) return;
  const user = await getCurrentUser();
  trackServer({ name: EVENTS.examViewed, examId, userId: user?.id });
}
