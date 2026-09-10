import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedInterests = new Set(["Jesus", "Baptism", "Groups", "Volunteering", "Salvation"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ConnectSubmission = {
  name: string;
  email: string;
  phone: string;
  city: string;
  firstTimeGuest: "Yes" | "No";
  interests: string[];
  heardAboutUs: string;
  website?: string;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength) return null;

  return cleaned;
}

function validateSubmission(value: unknown): ConnectSubmission | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const submission = value as Record<string, unknown>;
  const name = cleanText(submission.name, 120);
  const email = cleanText(submission.email, 254);
  const phone = cleanText(submission.phone, 40);
  const city = cleanText(submission.city, 120);
  const heardAboutUs = cleanText(submission.heardAboutUs, 1000);
  const firstTimeGuest = submission.firstTimeGuest;
  const interests = Array.isArray(submission.interests)
    ? submission.interests.filter(
        (interest): interest is string =>
          typeof interest === "string" && allowedInterests.has(interest)
      )
    : [];

  if (
    !name ||
    !email ||
    !emailPattern.test(email) ||
    !phone ||
    !city ||
    !heardAboutUs ||
    (firstTimeGuest !== "Yes" && firstTimeGuest !== "No")
  ) {
    return null;
  }

  return {
    name,
    email,
    phone,
    city,
    firstTimeGuest,
    interests,
    heardAboutUs,
    website: typeof submission.website === "string" ? submission.website : undefined,
  };
}

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const submission = validateSubmission(requestBody);

  if (!submission) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  // Silently accept bot submissions caught by the hidden field.
  if (submission.website) {
    return NextResponse.json({ ok: true });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");

  if (!smtpHost || !smtpUser || !smtpPassword || !Number.isInteger(smtpPort)) {
    console.error("Connect form SMTP environment variables are not configured.");
    return NextResponse.json(
      { error: "The connection form is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const selectedInterests = submission.interests.join(", ") || "None selected";
  const message = [
    "New connection card",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone}`,
    `City: ${submission.city}`,
    `First-time guest: ${submission.firstTimeGuest}`,
    `Interested in: ${selectedInterests}`,
    `How they heard about us: ${submission.heardAboutUs}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: process.env.CONNECT_FORM_FROM ?? `Faith Community Church <${smtpUser}>`,
      to: process.env.CONNECT_FORM_TO ?? "melvin@fcclc.com",
      replyTo: submission.email,
      subject: `New Connect Form — ${submission.name}`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to send connect form email.", error);
    return NextResponse.json(
      { error: "We couldn't send your connection card. Please try again." },
      { status: 502 }
    );
  }
}
