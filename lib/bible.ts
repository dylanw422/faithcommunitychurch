import bibleMetadata from "@/content/bible-metadata.json";

export const NIV_BIBLE_ID = 111 as const;
export const NIV_ABBREVIATION = "NIV" as const;

export type ScriptureReference = {
  versionId: typeof NIV_BIBLE_ID;
  version: typeof NIV_ABBREVIATION;
  book: string;
  bookUsfm: string;
  chapter: number;
  verse: number;
};

export type BiblePassage = {
  reference: string;
  content: string;
  copyright: string;
  version: typeof NIV_ABBREVIATION;
};

export const bibleBooks = bibleMetadata.books;

export function parseScriptureReference(value: unknown): ScriptureReference | null {
  if (value === undefined || value === null || value === "") return null;
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const input = value as Record<string, unknown>;
  const book = bibleBooks.find(
    (candidate) => candidate.usfm === input.bookUsfm && candidate.name === input.book
  );

  if (
    !book ||
    input.versionId !== NIV_BIBLE_ID ||
    input.version !== NIV_ABBREVIATION ||
    !Number.isInteger(input.chapter) ||
    !Number.isInteger(input.verse)
  ) {
    return null;
  }

  const chapter = input.chapter as number;
  const verse = input.verse as number;
  if (chapter < 1 || chapter > book.chapters || verse < 1 || verse > 176) return null;

  return {
    versionId: NIV_BIBLE_ID,
    version: NIV_ABBREVIATION,
    book: book.name,
    bookUsfm: book.usfm,
    chapter,
    verse,
  };
}

export function scriptureReferenceKey(reference: ScriptureReference) {
  return `${reference.bookUsfm}.${reference.chapter}.${reference.verse}`;
}

export function formatScriptureReference(reference: ScriptureReference) {
  return `${reference.book} ${reference.chapter}:${reference.verse}`;
}
