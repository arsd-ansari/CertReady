import type { Metadata } from "next";
import Link from "next/link";
import { BookmarkList } from "@/components/dashboard/bookmark-list";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";
import { requireUser } from "@/lib/auth/guards";
import { getBookmarks } from "@/lib/dashboard/queries";

export const metadata: Metadata = { title: "Bookmarks", robots: { index: false } };

export default async function BookmarksPage() {
  const user = await requireUser("/dashboard/bookmarks");
  const bookmarks = await getBookmarks(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-navy">Bookmarked questions</h1>
        <p className="mt-1 text-sm text-zinc-600">Questions you saved to revisit. Tap a card to reveal the answer.</p>
      </div>
      {bookmarks.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          description="Use the bookmark button while practicing to save tricky questions here."
          action={
            <Button asChild>
              <Link href="/exams">Start practicing</Link>
            </Button>
          }
        />
      ) : (
        <BookmarkList items={bookmarks} />
      )}
    </div>
  );
}
