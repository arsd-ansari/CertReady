import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  tone = "brand",
}: {
  value: number;
  className?: string;
  tone?: "brand" | "success" | "warning" | "auto";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const color =
    tone === "auto"
      ? clamped >= 70
        ? "bg-success"
        : "bg-amber-500"
      : tone === "success"
        ? "bg-success"
        : tone === "warning"
          ? "bg-amber-500"
          : "bg-brand";
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-zinc-200", className)}
    >
      <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${clamped}%` }} />
    </div>
  );
}
