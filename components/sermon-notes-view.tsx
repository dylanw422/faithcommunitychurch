import type { SermonNotes } from "@/lib/sermon-notes";
import { textBlocks } from "@/lib/sermon-notes";
import {
  formatScriptureReference,
  scriptureReferenceKey,
  type BiblePassage,
  type ScriptureReference,
} from "@/lib/bible";

function formatSermonDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function Paragraphs({ value }: { value: string }) {
  return textBlocks(value).map((paragraph, index) => (
    <p key={`${paragraph.slice(0, 24)}-${index}`} className="whitespace-pre-line">
      {paragraph}
    </p>
  ));
}

function ScriptureQuote({
  reference,
  passage,
}: {
  reference: ScriptureReference;
  passage?: BiblePassage;
}) {
  return (
    <div>
      <p className="text-xs font-black tracking-[0.14em] text-black/50 uppercase">
        {formatScriptureReference(reference)} · NIV
      </p>
      {passage ? (
        <blockquote className="mt-3 text-lg font-bold leading-7 tracking-[-0.015em] sm:text-xl sm:leading-8">
          {passage.content}
        </blockquote>
      ) : null}
    </div>
  );
}

export default function SermonNotesView({
  notes,
  passages = {},
}: {
  notes: SermonNotes;
  passages?: Record<string, BiblePassage>;
}) {
  const copyright = Object.values(passages).find((passage) => passage.copyright)?.copyright;

  return (
    <article className="bg-white text-black">
      <header className="px-4 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black pb-4 text-[10px] font-black tracking-[0.18em] uppercase sm:text-xs">
          <span>{formatSermonDate(notes.date)}</span>
          <span>{notes.speaker}</span>
        </div>

        <h1 className="max-w-5xl py-10 text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.82] tracking-[-0.07em] sm:py-14">
          {notes.title}
        </h1>

        {notes.scripture ? (
          <div className="border-t border-black pt-5">
            <ScriptureQuote
              reference={notes.scripture}
              passage={passages[scriptureReferenceKey(notes.scripture)]}
            />
          </div>
        ) : null}
      </header>

      <section className="bg-black px-4 py-12 text-white sm:px-8 md:py-16">
        <p className="text-[10px] font-black tracking-[0.2em] text-white/55 uppercase">
          The central idea
        </p>
        <p className="mt-5 max-w-4xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">
          {notes.keyIdea}
        </p>
      </section>

      <div className="px-4 py-16 sm:px-8 md:py-24">
        {notes.introduction ? (
          <section className="mb-16 grid gap-5 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="text-xs font-black tracking-[0.2em] uppercase">Before we begin</h2>
            <div className="space-y-5 text-base leading-7 text-black/70 sm:text-lg">
              <Paragraphs value={notes.introduction} />
            </div>
          </section>
        ) : null}

        <div className="border-t border-black">
          {notes.points.map((point) => (
            <section
              key={point.id}
              className="grid gap-7 border-b border-black py-10 md:grid-cols-[0.8fr_1.6fr] md:gap-12 md:py-14"
            >
              <div>
                <h2 className="text-3xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                  {point.title}
                </h2>
                {point.scripture ? (
                  <div className="mt-4 md:hidden">
                    <ScriptureQuote
                      reference={point.scripture}
                      passage={passages[scriptureReferenceKey(point.scripture)]}
                    />
                  </div>
                ) : null}
              </div>

              <div>
                {point.scripture ? (
                  <div className="mb-7 hidden md:block">
                    <ScriptureQuote
                      reference={point.scripture}
                      passage={passages[scriptureReferenceKey(point.scripture)]}
                    />
                  </div>
                ) : null}
                <div className="space-y-5 text-base leading-7 sm:text-lg">
                  <Paragraphs value={point.content} />
                </div>
                {point.reflection ? (
                  <aside className="mt-8 border-l-4 border-black bg-neutral-100 px-5 py-5">
                    <p className="text-[10px] font-black tracking-[0.18em] text-black/50 uppercase">
                      Reflect
                    </p>
                    <p className="mt-2 text-sm font-bold leading-6 sm:text-base">
                      {point.reflection}
                    </p>
                  </aside>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        {notes.closing ? (
          <section className="mt-16 max-w-3xl">
            <p className="text-xs font-black tracking-[0.2em] uppercase">Take it with you</p>
            <div className="mt-5 space-y-5 text-xl font-medium leading-8 tracking-[-0.02em] sm:text-2xl">
              <Paragraphs value={notes.closing} />
            </div>
          </section>
        ) : null}

        {copyright ? (
          <footer className="mt-5">
            <p className="max-w-4xl text-[10px] leading-4 text-black/45">{copyright}</p>
          </footer>
        ) : null}
      </div>
    </article>
  );
}
