import { NextResponse } from "next/server";
import { sermonSessionCookie } from "@/lib/sermon-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/sermon-notes", request.url), 303);
  response.cookies.set(sermonSessionCookie, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
  return response;
}
