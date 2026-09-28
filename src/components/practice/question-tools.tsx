"use client";

import { Bookmark, BookmarkCheck, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { reportQuestion, toggleBookmark } from "@/lib/engine/practice-actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label, NativeSelect, Textarea } from "@/components/ui/input";

export function BookmarkButton({
  questionId,
  bookmarked,
  isSignedIn,
  onChange,
}: {
  questionId: string;
  bookmarked: boolean;
  isSignedIn: boolean;
  onChange: (bookmarked: boolean) => void;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      aria-pressed={bookmarked}
      onClick={() => {
        if (!isSignedIn) {
          toast("Sign in to bookmark questions.", {
            action: { label: "Log in", onClick: () => router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`) },
          });
          return;
        }
        start(async () => {
          const res = await toggleBookmark(questionId);
          if (res.ok) onChange(res.bookmarked);
          else toast.error(res.error);
        });
      }}
    >
      {bookmarked ? <BookmarkCheck className="text-brand" /> : <Bookmark />}
      <span className="hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
    </Button>
  );
}

const REASONS = [
  ["WRONG_ANSWER", "The marked answer is wrong"],
  ["TYPO", "Typo or formatting problem"],
  ["UNCLEAR", "Question is unclear"],
  ["OUTDATED", "Information is outdated"],
  ["OTHER", "Something else"],
] as const;

export function ReportButton({ questionId }: { questionId: string }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          <Flag />
          <span className="hidden sm:inline">Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent title="Report a problem" description="Tell us what's wrong and we'll review the question.">
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            start(async () => {
              const res = await reportQuestion({
                questionId,
                reason: form.get("reason") as (typeof REASONS)[number][0],
                details: String(form.get("details") ?? "") || undefined,
              });
              if (res.ok) {
                toast.success("Thanks — we'll take a look.");
                setOpen(false);
              } else toast.error(res.error);
            });
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="reason">Reason</Label>
            <NativeSelect id="reason" name="reason" required defaultValue="WRONG_ANSWER">
              {REASONS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </NativeSelect>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="details">Details (optional)</Label>
            <Textarea id="details" name="details" maxLength={1000} placeholder="What should it say instead?" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              Send report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
