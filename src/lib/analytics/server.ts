import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import type { EventName } from "./events";

type TrackInput = {
  name: EventName;
  userId?: string | null;
  anonymousId?: string | null;
  examId?: string | null;
  properties?: Prisma.InputJsonValue;
};

/**
 * Server-side event log. Fire-and-forget: analytics must never break a user flow.
 * Powers the admin analytics page; GA receives the same event names from the client.
 */
export function trackServer(input: TrackInput) {
  db.analyticsEvent
    .create({
      data: {
        name: input.name,
        userId: input.userId ?? null,
        anonymousId: input.anonymousId ?? null,
        examId: input.examId ?? null,
        properties: input.properties,
      },
    })
    .catch((error) => console.error("[analytics] failed to record event", error));
}
