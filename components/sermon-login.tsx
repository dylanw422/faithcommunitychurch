"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

type LoginStatus = "idle" | "sending" | "sent" | "error";

export default function SermonLogin({ invalidLink = false }: { invalidLink?: boolean }) {
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [message, setMessage] = useState(
    invalidLink ? "That sign-in link is invalid or expired. Request a new one." : ""
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/sermon-notes/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(result.error ?? "We couldn't send the sign-in link.");

      form.reset();
      setStatus("sent");
      setMessage(result.message ?? "Check your inbox for a secure sign-in link.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't send the sign-in link.");
    }
  }

  return (
    <section className="min-h-[calc(100svh-4.5rem)] bg-white px-4 py-12 sm:px-8 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="border-b border-black pb-6">
          <p className="text-xs font-black tracking-[0.2em] uppercase">Private editor</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-7xl">
            Sermon notes.
          </h1>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-[0.7fr_1.3fr] md:py-14">
          <div>
            <Mail className="size-8" strokeWidth={1.5} aria-hidden="true" />
            <p className="mt-4 text-sm leading-6 text-black/60">
              Enter an authorized church email. We’ll send a secure link that opens the editor—no
              password required.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-xs font-black tracking-[0.14em] uppercase">
              Email address
              <input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@fcclc.com"
                className="mt-2 h-14 w-full border border-black bg-white px-4 text-base normal-case tracking-normal outline-none transition-colors placeholder:text-black/30 hover:bg-neutral-50 focus:bg-neutral-100"
              />
            </label>

            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-5 flex min-h-15 w-full items-center justify-between bg-black px-5 text-left text-base font-black text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:bg-neutral-500"
            >
              {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
              <ArrowUpRight
                className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <p
              className={`mt-4 min-h-6 text-sm font-medium ${status === "error" || (status === "idle" && invalidLink) ? "text-red-700" : "text-black/60"}`}
              aria-live="polite"
            >
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
