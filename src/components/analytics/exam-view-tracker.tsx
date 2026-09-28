"use client";

import { useEffect } from "react";
import { trackExamView } from "@/lib/analytics/actions";
import { track } from "@/lib/analytics/client";
import { EVENTS } from "@/lib/analytics/events";

export function ExamViewTracker({ examId, slug }: { examId: string; slug: string }) {
  useEffect(() => {
    track(EVENTS.examViewed, { exam: slug });
    void trackExamView(examId);
  }, [examId, slug]);
  return null;
}
