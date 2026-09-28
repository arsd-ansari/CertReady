import "server-only";
import { redirect } from "next/navigation";
import { getCurrentUser, type CurrentUser } from "./session";

/** Redirects to login (preserving the return path) when no active user is signed in. */
export async function requireUser(returnTo?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    const suffix = returnTo ? `?next=${encodeURIComponent(returnTo)}` : "";
    redirect(`/login${suffix}`);
  }
  return user;
}

/** Admin-only. Non-admins get a 404-style redirect rather than a hint that the route exists. */
export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=%2Fadmin");
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}

export class AuthError extends Error {
  constructor(message = "You must be signed in to do that.") {
    super(message);
    this.name = "AuthError";
  }
}

/** For server actions: throw instead of redirect so the caller can render an error. */
export async function assertUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) throw new AuthError();
  return user;
}

export async function assertAdmin(): Promise<CurrentUser> {
  const user = await assertUser();
  if (user.role !== "ADMIN") throw new AuthError("Admin access required.");
  return user;
}
