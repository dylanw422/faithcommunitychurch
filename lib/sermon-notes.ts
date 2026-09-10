import starterNotes from "@/content/sermon-notes.json";
import {
  parseScriptureReference,
  scriptureReferenceKey,
  type ScriptureReference,
} from "@/lib/bible";

export type SermonPoint = {
  id: string;
  title: string;
  scriptures: ScriptureReference[];
  content: string;
  reflection: string;
};

export type SermonNotes = {
  title: string;
  date: string;
  speaker: string;
  scripture: ScriptureReference | null;
  keyIdea: string;
  introduction: string;
  points: SermonPoint[];
  closing: string;
  updatedAt: string;
};

function cleanRequired(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned && cleaned.length <= maxLength ? cleaned : null;
}

function cleanOptional(value: unknown, maxLength: number) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned.length <= maxLength ? cleaned : null;
}

function isBlankScripture(value: unknown) {
  return value === undefined || value === null || value === "";
}

export function parseSermonNotes(value: unknown): SermonNotes | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const input = value as Record<string, unknown>;
  const title = cleanRequired(input.title, 140);
  const date = cleanRequired(input.date, 10);
  const speaker = cleanRequired(input.speaker, 120);
  const scripture = parseScriptureReference(input.scripture);
  const keyIdea = cleanRequired(input.keyIdea, 600);
  const introduction = cleanOptional(input.introduction, 5000);
  const closing = cleanOptional(input.closing, 5000);
  const updatedAt = cleanOptional(input.updatedAt, 40);

  if (
    !title ||
    !date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !speaker ||
    (!scripture && !isBlankScripture(input.scripture)) ||
    !keyIdea ||
    introduction === null ||
    closing === null ||
    updatedAt === null ||
    !Array.isArray(input.points) ||
    input.points.length < 1 ||
    input.points.length > 12
  ) {
    return null;
  }

  const points: SermonPoint[] = [];
  const ids = new Set<string>();

  for (const valuePoint of input.points) {
    if (!valuePoint || typeof valuePoint !== "object" || Array.isArray(valuePoint)) return null;

    const point = valuePoint as Record<string, unknown>;
    const id = cleanRequired(point.id, 100);
    const pointTitle = cleanRequired(point.title, 180);
    if (point.scriptures !== undefined && !Array.isArray(point.scriptures)) return null;
    const scriptureInputs = Array.isArray(point.scriptures)
      ? point.scriptures
      : isBlankScripture(point.scripture)
        ? []
        : [point.scripture];
    const content = cleanRequired(point.content, 8000);
    const reflection = cleanOptional(point.reflection, 1200);

    if (scriptureInputs.length > 8) return null;

    const pointScriptures: ScriptureReference[] = [];
    const scriptureKeys = new Set<string>();
    for (const scriptureInput of scriptureInputs) {
      const pointScripture = parseScriptureReference(scriptureInput);
      if (!pointScripture) return null;
      const key = scriptureReferenceKey(pointScripture);
      if (scriptureKeys.has(key)) return null;
      scriptureKeys.add(key);
      pointScriptures.push(pointScripture);
    }

    if (
      !id ||
      !/^[a-zA-Z0-9_-]+$/.test(id) ||
      ids.has(id) ||
      !pointTitle ||
      !content ||
      reflection === null
    ) {
      return null;
    }

    ids.add(id);
    points.push({
      id,
      title: pointTitle,
      scriptures: pointScriptures,
      content,
      reflection,
    });
  }

  return {
    title,
    date,
    speaker,
    scripture,
    keyIdea,
    introduction,
    points,
    closing,
    updatedAt,
  };
}

export function getStarterSermonNotes() {
  const notes = parseSermonNotes(starterNotes);
  if (!notes) throw new Error("The bundled sermon notes are invalid.");
  return notes;
}

export function textBlocks(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}
