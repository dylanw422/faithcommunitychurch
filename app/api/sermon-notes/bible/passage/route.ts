import { NextResponse } from "next/server";
import { parseScriptureReference } from "@/lib/bible";
import { getSermonAdminSession } from "@/lib/sermon-auth";
import { getNivPassage, YouVersionError } from "@/lib/youversion";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await getSermonAdminSession())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let reference = null;
  try {
    const body = (await request.json()) as { reference?: unknown };
    reference = parseScriptureReference(body.reference);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!reference) {
    return NextResponse.json({ error: "Choose a valid verse." }, { status: 400 });
  }

  try {
    return NextResponse.json({ passage: await getNivPassage(reference) });
  } catch (error) {
    const message = error instanceof YouVersionError ? error.message : "The verse could not be loaded.";
    const status = error instanceof YouVersionError ? error.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
