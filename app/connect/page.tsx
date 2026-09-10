import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ConnectForm from "@/components/connect-form";

export const metadata: Metadata = {
  title: "Connect | Faith Community Church",
  description: "Connect with Faith Community Church in Moss Bluff, Louisiana.",
};

export default function ConnectPage() {
  return (
    <section className="min-h-[calc(100svh-4.5rem)] bg-white px-4 py-12 sm:px-8 md:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/tap"
          className="mb-10 inline-flex items-center gap-2 text-xs font-black tracking-[0.18em] uppercase transition-opacity hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to menu
        </Link>

        <header className="mb-12 border-b border-black pb-6 md:mb-16">
          <p className="text-xs font-black tracking-[0.22em] uppercase">Faith Community Church</p>
          <h1 className="mt-3 text-5xl font-black leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl">
            Let&apos;s connect.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-black/60 sm:text-base">
            We&apos;d love to know you better and help you take your next step.
          </p>
        </header>

        <ConnectForm />
      </div>
    </section>
  );
}
