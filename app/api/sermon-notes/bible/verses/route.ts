import { NextResponse } from "next/server";
import { bibleBooks } from "@/lib/bible";
import { getSermonAdminSession } from "@/lib/sermon-auth";
import { getNivVerses, YouVersionError } from "@/lib/youversion";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await getSermonAdminSession())) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const bookUsfm = searchParams.get("book") ?? "";
  const chapter = Number(searchParams.get("chapter"));
  const book = bibleBooks.find((candidate) => candidate.usfm === bookUsfm);

  if (!book || !Number.isInteger(chapter) || chapter < 1 || chapter > book.chapters) {
    return NextResponse.json({ error: "Choose a valid Bible book and chapter." }, { status: 400 });
  }

  try {
    const verses = await getNivVerses(bookUsfm, chapter);
    return NextResponse.json({ verses }, { headers: { "Cache-Control": "private, max-age=86400" } });
  } catch (error) {
    const message = error instanceof YouVersionError ? error.message : "The verses could not be loaded.";
    const status = error instanceof YouVersionError ? error.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
