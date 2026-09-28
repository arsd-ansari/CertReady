import "server-only";
import { env } from "@/lib/env";

type Mail = { to: string; subject: string; text: string; html?: string };

/**
 * Transactional email. Uses Resend when RESEND_API_KEY is set; otherwise logs to the
 * server console so password-reset links are usable in local development.
 */
export async function sendEmail(mail: Mail): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.info(`\n[email:dev] To: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.text}\n`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Email send failed (${res.status}): ${body}`);
  }
}
