import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/auth-forms";
import { AuthShell } from "@/components/auth/auth-shell";
import { Alert } from "@/components/ui/misc";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default async function ResetPasswordPage({ searchParams }: PageProps<"/reset-password">) {
  const sp = await searchParams;
  const token = Array.isArray(sp.token) ? sp.token[0] : sp.token;

  return (
    <AuthShell
      title="Choose a new password"
      footer={
        <Link href="/login" className="font-medium text-brand hover:underline">
          Back to log in
        </Link>
      }
    >
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <Alert tone="warning">
          This reset link is missing its token. <Link href="/forgot-password" className="underline">Request a new one.</Link>
        </Alert>
      )}
    </AuthShell>
  );
}
