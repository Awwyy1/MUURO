import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up endpoint.
 *
 * Forwards the address to whichever provider is configured, in this order:
 *   1. Google Apps Script webhook writing into a Sheet
 *   2. Resend Audiences (kept as a swap target when scaling up)
 *
 * If neither is configured, returns 503 so the form can show the
 * "follow @muuro.co" fallback instead of silently failing.
 */
export async function POST(req: Request) {
  let email: string;
  let source: string;
  try {
    const body = await req.json();
    email = String(body.email ?? "").trim();
    source = String(body.source ?? "web").slice(0, 40);
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const sheetsUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (sheetsUrl) {
    try {
      // Apps Script Web Apps redirect through script.googleusercontent.com;
      // following redirects keeps the POST body intact.
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
        redirect: "follow",
      });
      if (res.ok) return NextResponse.json({ ok: true });
      console.error("Sheets webhook failed:", res.status, await res.text());
    } catch (err) {
      console.error("Sheets webhook threw:", err);
    }
    // Fall through to Resend if Sheets failed but is configured.
  }

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (resendKey && audienceId) {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }
    );
    if (res.ok) return NextResponse.json({ ok: true });
    console.error("Resend subscribe failed:", res.status, await res.text());
    return NextResponse.json({ error: "provider_error" }, { status: 502 });
  }

  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
