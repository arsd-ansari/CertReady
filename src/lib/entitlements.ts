import "server-only";
import { db } from "@/lib/db";

/**
 * Single place that decides what a user may access.
 * Practice, mock, dashboard, and content pages call this rather than checking
 * subscriptions directly, so Stripe wiring later only touches the Subscription table.
 */
export type Entitlement = {
  isPremium: boolean;
  /** Null means all exams (site-wide plan). */
  examIds: string[] | null;
  plan: "FREE" | "MONTHLY" | "ANNUAL" | "EXAM_PACKAGE";
};

export async function getEntitlement(userId: string | null): Promise<Entitlement> {
  if (!userId) return { isPremium: false, examIds: null, plan: "FREE" };

  const subs = await db.subscription.findMany({
    where: {
      userId,
      status: { in: ["ACTIVE", "TRIALING"] },
      OR: [{ currentPeriodEnd: null }, { currentPeriodEnd: { gt: new Date() } }],
    },
    select: { plan: true, examId: true },
  });

  if (subs.length === 0) return { isPremium: false, examIds: null, plan: "FREE" };

  const siteWide = subs.find((s) => s.plan !== "EXAM_PACKAGE");
  if (siteWide) return { isPremium: true, examIds: null, plan: siteWide.plan };

  return {
    isPremium: true,
    examIds: subs.map((s) => s.examId).filter((id): id is string => Boolean(id)),
    plan: "EXAM_PACKAGE",
  };
}

export function hasPremiumFor(entitlement: Entitlement, examId: string) {
  if (!entitlement.isPremium) return false;
  if (entitlement.examIds === null) return true;
  return entitlement.examIds.includes(examId);
}

/** Most questions a premium user can request in one practice set. */
export const PREMIUM_MAX_QUESTIONS = 50;

/** Free-tier caps. Kept here so pricing pages and the engine agree. */
export const FREE_LIMITS = {
  /** Mock exams a free account may complete per exam. */
  mockExamsPerExam: 2,
  /** Guests (no account) get a shorter mock. */
  guestMockQuestions: 10,
} as const;
