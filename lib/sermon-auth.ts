import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const sermonSessionCookie = "fcc_sermon_session";

type TokenPurpose = "magic" | "session";

type AuthPayload = {
  email: string;
  exp: number;
  purpose: TokenPurpose;
  nonce: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getSecret() {
  const secret = process.env.SERMON_NOTES_AUTH_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function getAllowedSermonAdminEmails() {
  return new Set(
    (process.env.SERMON_NOTES_ADMIN_EMAILS ?? "")
      .split(",")
      .map(normalizeEmail)
      .filter(Boolean)
  );
}

export function isAllowedSermonAdmin(email: string) {
  return getAllowedSermonAdminEmails().has(normalizeEmail(email));
}

export function isSermonAuthConfigured() {
  return Boolean(getSecret() && getAllowedSermonAdminEmails().size);
}

function signatureFor(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function createSermonAuthToken(
  email: string,
  purpose: TokenPurpose,
  maxAgeSeconds: number
) {
  const secret = getSecret();
  if (!secret || !isAllowedSermonAdmin(email)) return null;

  const payload: AuthPayload = {
    email: normalizeEmail(email),
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
    purpose,
    nonce: randomBytes(16).toString("base64url"),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encodedPayload}.${signatureFor(encodedPayload, secret)}`;
}

export function verifySermonAuthToken(token: string, purpose: TokenPurpose) {
  const secret = getSecret();
  const parts = token.split(".");
  if (!secret || parts.length !== 2) return null;

  const [encodedPayload, suppliedSignature] = parts;
  const expectedSignature = signatureFor(encodedPayload, secret);
  const suppliedBuffer = Buffer.from(suppliedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<AuthPayload>;

    if (
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp <= Math.floor(Date.now() / 1000) ||
      payload.purpose !== purpose ||
      typeof payload.nonce !== "string" ||
      !isAllowedSermonAdmin(payload.email)
    ) {
      return null;
    }

    return { email: normalizeEmail(payload.email), exp: payload.exp };
  } catch {
    return null;
  }
}

export async function getSermonAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sermonSessionCookie)?.value;
  return token ? verifySermonAuthToken(token, "session") : null;
}
