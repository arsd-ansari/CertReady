"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setUserRoleAction, setUserStatusAction } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function UserControls({ userId, status, role }: { userId: string; status: "ACTIVE" | "SUSPENDED"; role: "USER" | "ADMIN" }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-wrap gap-2">
      {status === "ACTIVE" ? (
        <Button
          size="sm"
          variant="destructive"
          disabled={pending}
          onClick={() => {
            if (window.confirm("Suspend this user? Their sessions will be revoked.")) {
              start(async () => {
                await setUserStatusAction(userId, "SUSPENDED");
                toast.success("User suspended.");
              });
            }
          }}
        >
          Suspend
        </Button>
      ) : (
        <Button
          size="sm"
          variant="success"
          disabled={pending}
          onClick={() =>
            start(async () => {
              await setUserStatusAction(userId, "ACTIVE");
              toast.success("User reactivated.");
            })
          }
        >
          Reactivate
        </Button>
      )}
      <Button
        size="sm"
        variant="secondary"
        disabled={pending}
        onClick={() => {
          const next = role === "ADMIN" ? "USER" : "ADMIN";
          if (window.confirm(`Change role to ${next}?`)) {
            start(async () => {
              await setUserRoleAction(userId, next);
              toast.success(`Role set to ${next.toLowerCase()}.`);
            });
          }
        }}
      >
        {role === "ADMIN" ? "Remove admin" : "Make admin"}
      </Button>
    </div>
  );
}
