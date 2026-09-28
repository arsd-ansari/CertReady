import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";

/**
 * AdSense-ready placement. Renders nothing unless NEXT_PUBLIC_ADSENSE_CLIENT_ID is set and
 * the viewer is not premium, so the layout never reserves empty space for missing ads.
 * Kept to one slot per page and never inside the question runner.
 */
export function AdSlot({
  slot,
  hidden = false,
  className,
}: {
  slot: string;
  hidden?: boolean;
  className?: string;
}) {
  const client = publicEnv.adsenseClientId;
  if (!client || hidden) return null;
  return (
    <div className={cn("my-8 flex justify-center", className)} aria-label="Advertisement">
      <ins
        className="adsbygoogle block w-full max-w-3xl"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
