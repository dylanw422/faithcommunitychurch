"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const interests = ["Jesus", "Baptism", "Groups", "Volunteering", "Salvation"];

const inputClassName =
  "mt-2 h-13 w-full border border-black bg-white px-4 text-base outline-none transition-colors placeholder:text-black/30 hover:bg-neutral-50 focus:bg-neutral-100";

export default function ConnectForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          city: formData.get("city"),
          firstTimeGuest: formData.get("firstTimeGuest"),
          interests: formData.getAll("interests"),
          heardAboutUs: formData.get("heardAboutUs"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "We couldn't send your connection card.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "We couldn't send your connection card."
      );
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="text-xs font-black tracking-[0.14em] uppercase">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder="Your full name"
            className={inputClassName}
          />
        </label>

        <label className="text-xs font-black tracking-[0.14em] uppercase">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={inputClassName}
          />
        </label>

        <label className="text-xs font-black tracking-[0.14em] uppercase">
          Phone number
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            required
            placeholder="(555) 555-5555"
            className={inputClassName}
          />
        </label>

        <label className="text-xs font-black tracking-[0.14em] uppercase">
          City
          <input
            type="text"
            name="city"
            autoComplete="address-level2"
            required
            placeholder="Where do you live?"
            className={inputClassName}
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-xs font-black tracking-[0.14em] uppercase">
          Are you a first-time guest?
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className="flex min-h-14 cursor-pointer items-center gap-3 border border-black px-4 text-sm font-bold transition-colors hover:bg-neutral-100 has-[:checked]:bg-black has-[:checked]:text-white"
            >
              <input
                type="radio"
                name="firstTimeGuest"
                value={option}
                required
                className="size-4 accent-black"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-black tracking-[0.14em] uppercase">
          I would like to learn more about
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {interests.map((interest) => (
            <label
              key={interest}
              className="flex min-h-14 cursor-pointer items-center gap-3 border border-black px-4 text-sm font-bold transition-colors hover:bg-neutral-100 has-[:checked]:bg-black has-[:checked]:text-white"
            >
              <input
                type="checkbox"
                name="interests"
                value={interest}
                className="size-4 accent-black"
              />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-xs font-black tracking-[0.14em] uppercase">
        How did you hear about us?
        <textarea
          name="heardAboutUs"
          required
          rows={4}
          placeholder="A friend, social media, driving by..."
          className="mt-2 w-full resize-y border border-black bg-white px-4 py-3 text-base normal-case tracking-normal outline-none transition-colors placeholder:text-black/30 hover:bg-neutral-50 focus:bg-neutral-100"
        />
      </label>

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="border-t border-black pt-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex min-h-16 w-full items-center justify-between bg-black px-5 text-left text-lg font-black text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:bg-neutral-600"
        >
          {status === "submitting" ? "Sending..." : "Send connection card"}
          <ArrowUpRight
            className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
        <div className="mt-3 min-h-5 text-xs leading-5" aria-live="polite">
          {status === "success" ? (
            <p className="font-bold">Thanks—your connection card has been sent.</p>
          ) : status === "error" ? (
            <p className="font-bold text-red-700">{errorMessage}</p>
          ) : (
            <p className="text-black/50">Your connection card will be sent directly to our team.</p>
          )}
        </div>
      </div>
    </form>
  );
}
