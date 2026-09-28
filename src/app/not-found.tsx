import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy">Page not found</h1>
      <p className="mt-3 text-zinc-600">That page doesn&apos;t exist or has moved. Try the exam directory instead.</p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/exams">Browse exams</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
