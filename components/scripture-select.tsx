"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  NIV_ABBREVIATION,
  NIV_BIBLE_ID,
  bibleBooks,
  formatScriptureReference,
  type BiblePassage,
  type ScriptureReference,
} from "@/lib/bible";

const selectClassName =
  "peer h-13 w-full appearance-none border border-black bg-white py-0 pr-11 pl-3 text-base font-normal normal-case tracking-normal outline-none transition-colors hover:bg-neutral-50 focus:bg-neutral-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-black/35";

const selectIconClassName =
  "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-black/65 peer-disabled:text-black/25";

type ScriptureSelectProps = {
  value: ScriptureReference | null;
  onChange: (value: ScriptureReference | null) => void;
  idPrefix: string;
};

export default function ScriptureSelect({ value, onChange, idPrefix }: ScriptureSelectProps) {
  const [bookUsfm, setBookUsfm] = useState(value?.bookUsfm ?? "");
  const [chapter, setChapter] = useState(value?.chapter.toString() ?? "");
  const [verse, setVerse] = useState(value?.verse.toString() ?? "");
  const [endVerse, setEndVerse] = useState(
    value && value.endVerse !== value.verse ? value.endVerse.toString() : ""
  );
  const [verses, setVerses] = useState<number[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [passage, setPassage] = useState<BiblePassage | null>(null);
  const [error, setError] = useState("");

  const book = bibleBooks.find((candidate) => candidate.usfm === bookUsfm);

  useEffect(() => {
    if (!bookUsfm || !chapter) {
      setVerses([]);
      return;
    }

    const controller = new AbortController();
    setLoadingVerses(true);
    setError("");

    fetch(
      `/api/sermon-notes/bible/verses?book=${encodeURIComponent(bookUsfm)}&chapter=${encodeURIComponent(chapter)}`,
      { signal: controller.signal }
    )
      .then(async (response) => {
        const result = (await response.json()) as { verses?: number[]; error?: string };
        if (!response.ok || !result.verses) {
          throw new Error(result.error ?? "The verses could not be loaded.");
        }
        setVerses(result.verses);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setVerses([]);
        setError(requestError instanceof Error ? requestError.message : "The verses could not be loaded.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingVerses(false);
      });

    return () => controller.abort();
  }, [bookUsfm, chapter]);

  useEffect(() => {
    if (!value) {
      setPassage(null);
      return;
    }

    const controller = new AbortController();
    setPassage(null);
    setError("");

    fetch("/api/sermon-notes/bible/passage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: value }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = (await response.json()) as { passage?: BiblePassage; error?: string };
        if (!response.ok || !result.passage) {
          throw new Error(result.error ?? "The verse could not be loaded.");
        }
        setPassage(result.passage);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(requestError instanceof Error ? requestError.message : "The verse could not be loaded.");
      });

    return () => controller.abort();
  }, [value]);

  function clearSelection() {
    setBookUsfm("");
    setChapter("");
    setVerse("");
    setEndVerse("");
    setVerses([]);
    setPassage(null);
    setError("");
    onChange(null);
  }

  return (
    <div className="mt-2 border border-black p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1.35fr_0.65fr_0.8fr_0.8fr]">
        <label
          htmlFor={`${idPrefix}-book`}
          className="col-span-2 text-[10px] font-black tracking-[0.12em] uppercase sm:col-span-1"
        >
          Book
          <div className="relative mt-2">
            <select
              id={`${idPrefix}-book`}
              value={bookUsfm}
              onChange={(event) => {
                setBookUsfm(event.target.value);
                setChapter("");
                setVerse("");
                setEndVerse("");
                setVerses([]);
                setPassage(null);
                setError("");
                onChange(null);
              }}
              className={selectClassName}
            >
              <option value="">Select book</option>
              {bibleBooks.map((candidate) => (
                <option key={candidate.usfm} value={candidate.usfm}>
                  {candidate.name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className={selectIconClassName} />
          </div>
        </label>

        <label
          htmlFor={`${idPrefix}-chapter`}
          className="text-[10px] font-black tracking-[0.12em] uppercase"
        >
          Chapter
          <div className="relative mt-2">
            <select
              id={`${idPrefix}-chapter`}
              value={chapter}
              disabled={!book}
              onChange={(event) => {
                setChapter(event.target.value);
                setVerse("");
                setEndVerse("");
                setPassage(null);
                setError("");
                onChange(null);
              }}
              className={selectClassName}
            >
              <option value="">Select</option>
              {book
                ? Array.from({ length: book.chapters }, (_, index) => index + 1).map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))
                : null}
            </select>
            <ChevronDown aria-hidden="true" className={selectIconClassName} />
          </div>
        </label>

        <label
          htmlFor={`${idPrefix}-verse`}
          className="text-[10px] font-black tracking-[0.12em] uppercase"
        >
          Start verse
          <div className="relative mt-2">
            <select
              id={`${idPrefix}-verse`}
              value={verse}
              disabled={!book || !chapter || loadingVerses || !verses.length}
              onChange={(event) => {
                const nextVerse = event.target.value;
                setVerse(nextVerse);
                setEndVerse("");
                setPassage(null);
                setError("");

                if (!book || !chapter || !nextVerse) {
                  onChange(null);
                  return;
                }

                onChange({
                  versionId: NIV_BIBLE_ID,
                  version: NIV_ABBREVIATION,
                  book: book.name,
                  bookUsfm: book.usfm,
                  chapter: Number(chapter),
                  verse: Number(nextVerse),
                  endVerse: Number(nextVerse),
                });
              }}
              className={selectClassName}
            >
              <option value="">{loadingVerses ? "Loading…" : "Select"}</option>
              {verses.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className={selectIconClassName} />
          </div>
        </label>

        <label
          htmlFor={`${idPrefix}-end-verse`}
          className="col-span-2 text-[10px] font-black tracking-[0.12em] uppercase sm:col-span-1"
        >
          End verse <span className="text-black/40 sm:hidden">— optional</span>
          <div className="relative mt-2">
            <select
              id={`${idPrefix}-end-verse`}
              value={endVerse}
              disabled={!book || !chapter || !verse || loadingVerses || !verses.length}
              onChange={(event) => {
                const nextEndVerse = event.target.value;
                setEndVerse(nextEndVerse);
                setPassage(null);
                setError("");

                if (!book || !chapter || !verse) {
                  onChange(null);
                  return;
                }

                onChange({
                  versionId: NIV_BIBLE_ID,
                  version: NIV_ABBREVIATION,
                  book: book.name,
                  bookUsfm: book.usfm,
                  chapter: Number(chapter),
                  verse: Number(verse),
                  endVerse: nextEndVerse ? Number(nextEndVerse) : Number(verse),
                });
              }}
              className={selectClassName}
            >
              <option value="">Single verse</option>
              {verses
                .filter((number) => number > Number(verse))
                .map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
            </select>
            <ChevronDown aria-hidden="true" className={selectIconClassName} />
          </div>
        </label>
      </div>

      {bookUsfm || chapter || verse ? (
        <button
          type="button"
          onClick={clearSelection}
          className="mt-3 text-[10px] font-black tracking-[0.12em] text-black/50 uppercase underline decoration-1 underline-offset-4 transition-colors hover:text-black"
        >
          Clear scripture
        </button>
      ) : null}

      {value ? (
        <div className="mt-4 border-t border-black/20 pt-4 normal-case tracking-normal">
          <p className="text-xs font-black tracking-[0.1em] uppercase">
            {formatScriptureReference(value)} · NIV
          </p>
          {passage ? (
            <>
              <p className="mt-2 text-sm font-medium leading-6">{passage.content}</p>
              {passage.copyright ? (
                <p className="mt-2 text-[10px] leading-4 text-black/45">{passage.copyright}</p>
              ) : null}
            </>
          ) : error ? null : (
            <p className="mt-2 text-xs text-black/45">Loading NIV text…</p>
          )}
        </div>
      ) : null}

      {error ? <p className="mt-3 text-xs font-medium normal-case text-red-700">{error}</p> : null}
    </div>
  );
}
