"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { EVENTS } from "@/lib/analytics/events";
import { trackServer } from "@/lib/analytics/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { rateLimit, rateLimitByIp } from "@/lib/rate-limit";
import { absoluteUrl } from "@/lib/site";
import { hashPassword, verifyPassword } from "./password";
import { createSession, destroyAllSessions, destroySession, getCurrentUser } from "./session";
import { generateToken, hashToken } from "./tokens";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: string;
};

const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(128, "Password is too long.");

/** Only allow same-origin relative paths for post-login redirects. */
function safeNext(value: FormDataEntryValue | null, fallback = "/dashboard") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------

const registerSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(80),
  email: z.email("Enter a valid email address.").transform((v) => v.toLowerCase()),
  password: passwordSchema,
});

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const limit = await rateLimitByIp("register", 10, 3600);
  if (!limit.ok) return { error: "Too many sign-up attempts. Please try again later." };

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

  const existing = await db.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
  if (existing) return { fieldErrors: { email: "An account with this email already exists." } };

  const user = await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      lastLoginAt: new Date(),
    },
    select: { id: true },
  });

  await createSession(user.id);
  trackServer({ name: EVENTS.registered, userId: user.id });
  redirect(safeNext(formData.get("next")));
}

// ---------------------------------------------------------------------------
// Login / logout
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z.email("Enter a valid email address.").transform((v) => v.toLowerCase()),
  password: z.string().min(1, "Enter your password."),
});

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

  const ipLimit = await rateLimitByIp("login", 20, 900);
  const emailLimit = rateLimit(`login:${parsed.data.email}`, 8, 900);
  if (!ipLimit.ok || !emailLimit.ok) {
    return { error: "Too many login attempts. Please wait a few minutes and try again." };
  }

  const user = await db.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, passwordHash: true, status: true },
  });

  const valid = user ? await verifyPassword(parsed.data.password, user.passwordHash) : false;
  if (!user || !valid) return { error: "Incorrect email or password." };
  if (user.status === "SUSPENDED") return { error: "This account has been suspended. Contact support." };

  await db.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createSession(user.id);
  trackServer({ name: EVENTS.loggedIn, userId: user.id });
  redirect(safeNext(formData.get("next")));
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

// ---------------------------------------------------------------------------
// Forgot / reset password
// ---------------------------------------------------------------------------

export async function forgotPasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const limit = await rateLimitByIp("forgot-password", 5, 900);
  if (!limit.ok) return { error: "Too many requests. Please try again later." };

  const parsed = z.email().safeParse(String(formData.get("email") ?? "").toLowerCase());
  if (!parsed.success) return { fieldErrors: { email: "Enter a valid email address." } };

  const generic = { success: "If an account exists for that email, a reset link is on its way." };
  const user = await db.user.findUnique({ where: { email: parsed.data }, select: { id: true, email: true } });
  if (!user) return generic;

  const token = generateToken();
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const link = absoluteUrl(`/reset-password?token=${token}`);
  try {
    await sendEmail({
      to: user.email,
      subject: "Reset your CertReady password",
      text: `Use this link to reset your password (valid for 1 hour):\n\n${link}\n\nIf you did not request this, you can ignore this email.`,
    });
  } catch (error) {
    console.error("[auth] reset email failed", error);
  }
  return generic;
}

const resetSchema = z.object({
  token: z.string().min(10),
  password: passwordSchema,
});

export async function resetPasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = resetSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(parsed.data.token) },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired. Request a new one." };
  }

  await db.$transaction([
    db.user.update({
      where: { id: record.userId },
      data: { passwordHash: await hashPassword(parsed.data.password) },
    }),
    db.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);
  await destroyAllSessions(record.userId);
  await createSession(record.userId);
  redirect("/dashboard?reset=1");
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

const profileSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(80),
  targetExamId: z.string().optional().nullable(),
  examDate: z.string().optional().nullable(),
});

export async function updateProfileAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { error: "You must be signed in." };

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    targetExamId: formData.get("targetExamId") || null,
    examDate: formData.get("examDate") || null,
  });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

  let examDate: Date | null = null;
  if (parsed.data.examDate) {
    const d = new Date(parsed.data.examDate);
    if (Number.isNaN(d.getTime())) return { fieldErrors: { examDate: "Enter a valid date." } };
    examDate = d;
  }

  if (parsed.data.targetExamId) {
    const exam = await db.exam.findFirst({ where: { id: parsed.data.targetExamId, status: "PUBLISHED" }, select: { id: true } });
    if (!exam) return { fieldErrors: { targetExamId: "Choose a valid exam." } };
  }

  await db.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name, targetExamId: parsed.data.targetExamId || null, examDate },
  });
  // Refresh server-rendered defaults so React's post-action form reset shows the saved values.
  revalidatePath("/dashboard", "layout");
  return { success: "Profile updated." };
}

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password."),
  newPassword: passwordSchema,
});

export async function changePasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) return { error: "You must be signed in." };

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error) };

  const row = await db.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } });
  if (!(await verifyPassword(parsed.data.currentPassword, row?.passwordHash))) {
    return { fieldErrors: { currentPassword: "Current password is incorrect." } };
  }

  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.newPassword) },
  });
  return { success: "Password changed." };
}
