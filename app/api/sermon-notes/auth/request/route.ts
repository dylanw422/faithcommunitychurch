import { NextResponse } from "next/server";
import { createSmtpTransporter, MailConfigurationError } from "@/lib/mail";
import {
  createSermonAuthToken,
  isAllowedSermonAdmin,
  isSermonAuthConfigured,
} from "@/lib/sermon-auth";

export const runtime = "nodejs";

const recentRequests = new Map<string, number>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const genericMessage = "If that address is authorized, a sign-in link is on its way.";

function getSiteOrigin(request: Request) {
  const configuredUrl = process.env.SERMON_NOTES_SITE_URL;
  if (process.env.NODE_ENV === "production" && !configuredUrl) {
    throw new Error("SERMON_NOTES_SITE_URL is required in production.");
  }
  const url = new URL(configuredUrl || request.url);

  if (url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "localhost")) {
    throw new Error("SERMON_NOTES_SITE_URL must use HTTPS.");
  }

  return url.origin;
}

export async function POST(request: Request) {
  if (!isSermonAuthConfigured()) {
    return NextResponse.json(
      { error: "Sermon notes sign-in is not configured yet." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const website = typeof input.website === "string" ? input.website.trim() : "";

  if (website || !emailPattern.test(email) || !isAllowedSermonAdmin(email)) {
    return NextResponse.json({ ok: true, message: genericMessage });
  }

  const now = Date.now();
  const lastRequest = recentRequests.get(email) ?? 0;
  if (now - lastRequest < 60_000) {
    return NextResponse.json({ ok: true, message: genericMessage });
  }
  recentRequests.set(email, now);

  const token = createSermonAuthToken(email, "magic", 15 * 60);
  if (!token) {
    return NextResponse.json(
      { error: "Sermon notes sign-in is not configured yet." },
      { status: 503 }
    );
  }

  let magicUrl: URL;
  try {
    magicUrl = new URL("/api/sermon-notes/auth/verify", getSiteOrigin(request));
  } catch (error) {
    console.error("Invalid sermon notes site URL.", error);
    return NextResponse.json({ error: "Sign-in is temporarily unavailable." }, { status: 503 });
  }
  magicUrl.searchParams.set("token", token);

  try {
    const { transporter, user } = createSmtpTransporter();
    const link = magicUrl.toString();

    await transporter.sendMail({
      from:
        process.env.SERMON_NOTES_EMAIL_FROM ??
        process.env.CONNECT_FORM_FROM ??
        `Faith Community Church <${user}>`,
      to: email,
      subject: "Your sermon notes editor sign-in link",
      text: [
        "Sign in to the Faith Community Church sermon notes editor:",
        "",
        link,
        "",
        "This link expires in 15 minutes. If you did not request it, you can ignore this email.",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
          <p style="font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Faith Community Church</p>
          <h1 style="font-size:34px;line-height:1.05;margin:24px 0">Edit sermon notes</h1>
          <p style="line-height:1.6">Use the secure link below to open the sermon notes editor.</p>
          <p style="margin:28px 0"><a href="${link.replace(/&/g, "&amp;")}" style="display:inline-block;background:#111;color:#fff;padding:16px 20px;text-decoration:none;font-weight:700">Open sermon notes editor</a></p>
          <p style="font-size:13px;line-height:1.6;color:#666">This link expires in 15 minutes. If you did not request it, you can ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: genericMessage });
  } catch (error) {
    if (error instanceof MailConfigurationError) {
      console.error("Sermon notes sign-in SMTP is not configured.");
      return NextResponse.json({ error: "Sign-in email is not configured yet." }, { status: 503 });
    }

    console.error("Unable to send sermon notes sign-in email.", error);
    return NextResponse.json({ error: "We couldn't send the sign-in link." }, { status: 502 });
  }
}
