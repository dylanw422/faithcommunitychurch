import { NextResponse } from "next/server";
import {
  createSermonAuthToken,
  sermonSessionCookie,
  verifySermonAuthToken,
} from "@/lib/sermon-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token");
  const magicSession = token ? verifySermonAuthToken(token, "magic") : null;
  const redirectUrl = new URL("/admin/sermon-notes", requestUrl.origin);

  if (!magicSession) {
    redirectUrl.searchParams.set("auth", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  const sessionMaxAge = 7 * 24 * 60 * 60;
  const sessionToken = createSermonAuthToken(magicSession.email, "session", sessionMaxAge);
  if (!sessionToken) {
    redirectUrl.searchParams.set("auth", "invalid");
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.redirect(redirectUrl);
  response.headers.set("Referrer-Policy", "no-referrer");
  response.cookies.set(sermonSessionCookie, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: sessionMaxAge,
    path: "/",
  });
  return response;
}
