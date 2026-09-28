"use client";

import type { EventName } from "./events";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Client-side event to Google Analytics when configured. No-op otherwise. */
export function track(name: EventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
