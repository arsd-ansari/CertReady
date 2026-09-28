import "server-only";
import { headers } from "next/headers";

/**
 * Fixed-window rate limiter held in process memory.
 * Adequate for a single Node instance and for slowing credential stuffing on auth actions.
 * Swap `store` for Upstash Redis (or similar) when running multiple serverless instances.
 */
type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

export function rateLimit(key: string, limit: number, windowSec: number): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    if (store.size > 10_000) pruneExpired(now);
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}

function pruneExpired(now: number) {
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }
}

export async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

/** Convenience: limit an action by client IP. */
export async function rateLimitByIp(action: string, limit: number, windowSec: number) {
  const ip = await clientIp();
  return rateLimit(`${action}:${ip}`, limit, windowSec);
}
