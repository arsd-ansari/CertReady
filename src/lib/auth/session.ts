import "server-only";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { generateToken, hashToken } from "./tokens";

export const SESSION_COOKIE = "certready_session";

const ttlMs = () => env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

export async function createSession(userId: string) {
  const token = generateToken();
  const userAgent = (await headers()).get("user-agent")?.slice(0, 255) ?? null;
  const expiresAt = new Date(Date.now() + ttlMs());

  await db.session.create({
    data: { userId, tokenHash: hashToken(token), expiresAt, userAgent },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function destroyAllSessions(userId: string) {
  await db.session.deleteMany({ where: { userId } });
}

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  targetExamId: string | null;
  examDate: Date | null;
  createdAt: Date;
};

/**
 * Resolves the signed-in user for the current request, or null.
 * Wrapped in React `cache` so layouts, pages, and actions share one lookup per request.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          targetExamId: true,
          examDate: true,
          createdAt: true,
        },
      },
    },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  if (session.user.status === "SUSPENDED") return null;

  return session.user;
});
