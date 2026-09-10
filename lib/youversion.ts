import "server-only";

import {
  NIV_ABBREVIATION,
  NIV_BIBLE_ID,
  scriptureReferenceKey,
  type BiblePassage,
  type ScriptureReference,
} from "@/lib/bible";
import type { SermonNotes } from "@/lib/sermon-notes";

const API_BASE_URL = "https://api.youversion.com/v1";

type YouVersionVerse = {
  id?: string;
  passage_id?: string;
  title?: string;
};

type YouVersionPassage = {
  id?: string;
  content?: string;
  reference?: string;
};

type YouVersionBible = {
  abbreviation?: string;
  copyright?: string;
  promotional_content?: string;
};

type CollectionResponse<T> = {
  data?: T[];
};

export class YouVersionError extends Error {
  constructor(
    message: string,
    public readonly status = 502
  ) {
    super(message);
  }
}

function getAppKey() {
  const appKey = process.env.YOUVERSION_APP_KEY;
  if (!appKey) {
    throw new YouVersionError(
      "NIV scripture is not configured. Add YOUVERSION_APP_KEY to the environment.",
      503
    );
  }
  return appKey;
}

async function youVersionFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "X-YVP-App-Key": getAppKey() },
    next: { revalidate: 86_400 },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new YouVersionError(
        "NIV access is not enabled for this YouVersion app key. Check the key and accept the NIV license in YouVersion Platform.",
        503
      );
    }
    if (response.status === 404) {
      throw new YouVersionError("That NIV verse could not be found.", 404);
    }
    if (response.status === 429) {
      throw new YouVersionError("The Bible service is busy. Please try again shortly.", 503);
    }
    throw new YouVersionError("The Bible service is temporarily unavailable.", 502);
  }

  return (await response.json()) as T;
}

export async function getNivVerses(bookUsfm: string, chapter: number) {
  const result = await youVersionFetch<CollectionResponse<YouVersionVerse>>(
    `/bibles/${NIV_BIBLE_ID}/books/${encodeURIComponent(bookUsfm)}/chapters/${chapter}/verses`
  );

  const verses = (result.data ?? [])
    .map((verse) => Number(verse.id ?? verse.title ?? verse.passage_id?.split(".").at(-1)))
    .filter((verse) => Number.isInteger(verse) && verse > 0);

  if (!verses.length) throw new YouVersionError("No verses were found for that chapter.", 404);
  return [...new Set(verses)].sort((a, b) => a - b);
}

export async function getNivPassage(reference: ScriptureReference): Promise<BiblePassage> {
  const passageId = scriptureReferenceKey(reference);
  const [passage, bible] = await Promise.all([
    youVersionFetch<YouVersionPassage>(
      `/bibles/${NIV_BIBLE_ID}/passages/${encodeURIComponent(passageId)}?format=text`
    ),
    youVersionFetch<YouVersionBible>(`/bibles/${NIV_BIBLE_ID}`),
  ]);

  const attribution = bible.copyright?.trim() || bible.promotional_content?.trim();
  if (!passage.content || !passage.reference || !attribution) {
    throw new YouVersionError("The Bible service returned an incomplete verse.", 502);
  }

  return {
    reference: passage.reference,
    content: passage.content.trim(),
    copyright: attribution,
    version: NIV_ABBREVIATION,
  };
}

export function getSermonScriptureReferences(notes: SermonNotes) {
  const references = [notes.scripture, ...notes.points.flatMap((point) => point.scriptures)].filter(
    (reference): reference is ScriptureReference => reference !== null
  );
  return [...new Map(references.map((reference) => [scriptureReferenceKey(reference), reference])).values()];
}

export async function getSermonPassages(notes: SermonNotes, strict = false) {
  const references = getSermonScriptureReferences(notes);
  const entries = await Promise.all(
    references.map(async (reference) => {
      try {
        return [scriptureReferenceKey(reference), await getNivPassage(reference)] as const;
      } catch (error) {
        if (strict) throw error;
        console.error(`Unable to load ${scriptureReferenceKey(reference)} from YouVersion.`, error);
        return null;
      }
    })
  );

  return Object.fromEntries(entries.filter((entry): entry is NonNullable<typeof entry> => entry !== null));
}
