import { createHash, randomBytes } from "node:crypto";
import { env } from "@/lib/env";

/** Opaque, URL-safe random token. Only its hash is stored. */
export function generateToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

/** Keyed hash so a leaked database alone cannot forge a valid cookie. */
export function hashToken(token: string) {
  return createHash("sha256").update(`${env.AUTH_SECRET}:${token}`).digest("hex");
}
