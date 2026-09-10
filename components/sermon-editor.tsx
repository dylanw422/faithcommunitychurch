"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Eye,
  FilePenLine,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import SermonNotesView from "@/components/sermon-notes-view";
import ScriptureSelect from "@/components/scripture-select";
import type { SermonNotes, SermonPoint } from "@/lib/sermon-notes";

const inputClassName =
  "mt-2 h-13 w-full border border-black bg-white px-4 text-base font-normal normal-case tracking-normal outline-none transition-colors placeholder:text-black/30 hover:bg-neutral-50 focus:bg-neutral-100";
const textareaClassName =
  "mt-2 w-full resize-y border border-black bg-white px-4 py-3 text-base font-normal normal-case leading-7 tracking-normal outline-none transition-colors placeholder:text-black/30 hover:bg-neutral-50 focus:bg-neutral-100";

type PublishStatus = "idle" | "publishing" | "success" | "error";

type SermonEditorProps = {
  initialNotes: SermonNotes;
  initialSha: string | null;
  editorEmail: string;
  initialError?: string;
};

function createPoint(): SermonPoint {
  return {
    id: `point-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: "",
    scripture: null,
    content: "",
    reflection: "",
  };
}

export default function SermonEditor({
  initialNotes,
  initialSha,
  editorEmail,
  initialError = "",
}: SermonEditorProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [sha, setSha] = useState(initialSha);
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<PublishStatus>(initialError ? "error" : "idle");
  const [message, setMessage] = useState(initialError);

  function updateField<K extends keyof SermonNotes>(field: K, value: SermonNotes[K]) {
    setNotes((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setMessage("");
  }

  function updatePoint<K extends keyof SermonPoint>(id: string, field: K, value: SermonPoint[K]) {
    setNotes((current) => ({
      ...current,
      points: current.points.map((point) =>
        point.id === id ? { ...point, [field]: value } : point
      ),
    }));
    setStatus("idle");
    setMessage("");
  }

  function movePoint(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= notes.points.length) return;

    setNotes((current) => {
      const points = [...current.points];
      [points[index], points[nextIndex]] = [points[nextIndex], points[index]];
      return { ...current, points };
    });
  }

  function removePoint(id: string) {
    if (notes.points.length === 1) return;
    setNotes((current) => ({
      ...current,
      points: current.points.filter((point) => point.id !== id),
    }));
  }

  async function handlePublish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("publishing");
    setMessage("");

    try {
      const response = await fetch("/api/sermon-notes/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, sha }),
      });
      const result = (await response.json()) as {
        error?: string;
        notes?: SermonNotes;
        sha?: string;
      };

      if (!response.ok || !result.notes || !result.sha) {
        throw new Error(result.error ?? "The notes could not be published.");
      }

      setNotes(result.notes);
      setSha(result.sha);
      setStatus("success");
      setMessage("Published to GitHub. The live page will update after Vercel finishes deploying.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The notes could not be published.");
    }
  }

  return (
    <div className="min-h-[calc(100svh-4.5rem)] bg-white text-black">
      <div className="sticky top-[72px] z-30 border-y border-black bg-white/95 px-4 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black tracking-[0.18em] uppercase">Sermon editor</p>
            <p className="mt-0.5 text-xs text-black/50">Signed in as {editorEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview((current) => !current)}
              className="flex min-h-10 items-center gap-2 border border-black px-3 text-xs font-black uppercase transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {showPreview ? <FilePenLine className="size-4" /> : <Eye className="size-4" />}
              {showPreview ? "Edit" : "Preview"}
            </button>
            <form action="/api/sermon-notes/auth/logout" method="post">
              <button
                type="submit"
                className="flex size-10 items-center justify-center border border-black transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label="Sign out"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPreview ? (
        <div>
          <SermonNotesView notes={notes} />
        </div>
      ) : (
        <form onSubmit={handlePublish} className="mx-auto max-w-5xl px-4 py-12 sm:px-8 md:py-20">
          <div className="grid gap-8 border-b border-black pb-10 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
            <div>
              <p className="text-xs font-black tracking-[0.2em] uppercase">Message details</p>
              <h1 className="mt-4 text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-6xl">
                Prepare the notes.
              </h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                Sermon title
                <input
                  required
                  maxLength={140}
                  value={notes.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  className={inputClassName}
                />
              </label>
              <label className="text-xs font-black tracking-[0.14em] uppercase">
                Date
                <input
                  type="date"
                  required
                  value={notes.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  className={inputClassName}
                />
              </label>
              <label className="text-xs font-black tracking-[0.14em] uppercase">
                Speaker
                <input
                  required
                  maxLength={120}
                  value={notes.speaker}
                  onChange={(event) => updateField("speaker", event.target.value)}
                  className={inputClassName}
                />
              </label>
              <div className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                Main Scripture <span className="text-black/40">— optional</span>
                <ScriptureSelect
                  idPrefix="main-scripture"
                  value={notes.scripture}
                  onChange={(reference) => updateField("scripture", reference)}
                />
              </div>
              <label className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                Central idea
                <textarea
                  required
                  maxLength={600}
                  rows={3}
                  value={notes.keyIdea}
                  onChange={(event) => updateField("keyIdea", event.target.value)}
                  className={textareaClassName}
                />
              </label>
              <label className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                Introduction <span className="text-black/40">— optional</span>
                <textarea
                  maxLength={5000}
                  rows={5}
                  value={notes.introduction}
                  placeholder="Separate paragraphs with a blank line."
                  onChange={(event) => updateField("introduction", event.target.value)}
                  className={textareaClassName}
                />
              </label>
            </div>
          </div>

          <div className="py-10">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-xs font-black tracking-[0.2em] uppercase">Message points</p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-black/55">
                  Add each main point in order. Scripture and reflection prompts are optional.
                </p>
              </div>
              <span className="text-xs font-black tabular-nums">{notes.points.length}/12</span>
            </div>

            <div className="mt-8 space-y-5">
              {notes.points.map((point, index) => (
                <fieldset key={point.id} className="border border-black p-4 sm:p-6">
                  <legend className="px-2 text-xs font-black tracking-[0.16em] uppercase">
                    Point {index + 1}
                  </legend>

                  <div className="mb-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => movePoint(index, -1)}
                      disabled={index === 0}
                      className="flex size-10 items-center justify-center border border-black transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-25"
                      aria-label={`Move point ${index + 1} up`}
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => movePoint(index, 1)}
                      disabled={index === notes.points.length - 1}
                      className="flex size-10 items-center justify-center border border-black transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-25"
                      aria-label={`Move point ${index + 1} down`}
                    >
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removePoint(point.id)}
                      disabled={notes.points.length === 1}
                      className="flex size-10 items-center justify-center border border-black transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-25"
                      aria-label={`Delete point ${index + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="text-xs font-black tracking-[0.14em] uppercase">
                      Point title
                      <input
                        required
                        maxLength={180}
                        value={point.title}
                        onChange={(event) => updatePoint(point.id, "title", event.target.value)}
                        className={inputClassName}
                      />
                    </label>
                    <div className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                      Scripture <span className="text-black/40">— optional</span>
                      <ScriptureSelect
                        idPrefix={`point-${point.id}-scripture`}
                        value={point.scripture}
                        onChange={(reference) => updatePoint(point.id, "scripture", reference)}
                      />
                    </div>
                    <label className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                      Notes
                      <textarea
                        required
                        maxLength={8000}
                        rows={6}
                        value={point.content}
                        placeholder="Separate paragraphs with a blank line."
                        onChange={(event) => updatePoint(point.id, "content", event.target.value)}
                        className={textareaClassName}
                      />
                    </label>
                    <label className="text-xs font-black tracking-[0.14em] uppercase sm:col-span-2">
                      Reflection question <span className="text-black/40">— optional</span>
                      <textarea
                        maxLength={1200}
                        rows={2}
                        value={point.reflection}
                        onChange={(event) =>
                          updatePoint(point.id, "reflection", event.target.value)
                        }
                        className={textareaClassName}
                      />
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>

            <button
              type="button"
              onClick={() => updateField("points", [...notes.points, createPoint()])}
              disabled={notes.points.length >= 12}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 border border-dashed border-black text-xs font-black tracking-[0.12em] uppercase transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="size-4" />
              Add message point
            </button>
          </div>

          <label className="block border-t border-black pt-10 text-xs font-black tracking-[0.14em] uppercase">
            Closing thought <span className="text-black/40">— optional</span>
            <textarea
              maxLength={5000}
              rows={5}
              value={notes.closing}
              placeholder="A final challenge, prayer, or next step."
              onChange={(event) => updateField("closing", event.target.value)}
              className={textareaClassName}
            />
          </label>

          <div className="mt-10 border-t border-black pt-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === "publishing" || Boolean(initialError)}
                className="group flex min-h-16 flex-1 items-center justify-between bg-black px-5 text-left text-lg font-black text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-neutral-500"
              >
                {status === "publishing" ? "Publishing…" : "Publish sermon notes"}
                <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
              <Link
                href="/sermon-notes"
                target="_blank"
                className="flex min-h-16 items-center justify-center border border-black px-5 text-sm font-black uppercase transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                View live page
              </Link>
            </div>
            <p
              className={`mt-4 min-h-6 text-sm font-medium ${status === "error" ? "text-red-700" : "text-black/60"}`}
              aria-live="polite"
            >
              {message || "Publishing creates a versioned GitHub update and starts a Vercel deployment."}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
