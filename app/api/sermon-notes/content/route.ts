import { NextResponse } from "next/server";
import {
  getSermonNotesFromRepository,
  publishSermonNotes,
  SermonRepositoryError,
} from "@/lib/github-sermon-notes";
import { getSermonAdminSession } from "@/lib/sermon-auth";
import { parseSermonNotes } from "@/lib/sermon-notes";
import { getSermonPassages, YouVersionError } from "@/lib/youversion";

export const runtime = "nodejs";

function errorResponse(error: unknown) {
  if (error instanceof SermonRepositoryError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error("Unexpected sermon notes repository error.", error);
  return NextResponse.json({ error: "The sermon notes service is unavailable." }, { status: 500 });
}

export async function GET() {
  if (!(await getSermonAdminSession())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  try {
    const current = await getSermonNotesFromRepository();
    return NextResponse.json(current, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  const session = await getSermonAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Your session expired. Sign in again." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 120_000) {
    return NextResponse.json({ error: "The sermon notes are too large." }, { status: 413 });
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
  const parsedNotes = parseSermonNotes(input.notes);
  const sha = input.sha;

  if (!parsedNotes || (sha !== null && (typeof sha !== "string" || !/^[a-f0-9]{40}$/i.test(sha)))) {
    return NextResponse.json(
      { error: "Please complete every required sermon notes field." },
      { status: 400 }
    );
  }

  const notes = { ...parsedNotes, updatedAt: new Date().toISOString() };

  try {
    await getSermonPassages(notes, true);
    const nextSha = await publishSermonNotes(notes, sha as string | null);
    return NextResponse.json({ ok: true, notes, sha: nextSha });
  } catch (error) {
    if (error instanceof YouVersionError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return errorResponse(error);
  }
}
