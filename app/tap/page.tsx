import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HandHeart, NotebookPen, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Tap | Faith Community Church",
  description: "Give, connect, and follow along with sermon notes at Faith Community Church.",
};

const actions = [
  {
    label: "Give",
    description: "Support the work of Faith Community Church",
    href: "https://tithe.ly/give_new/www/#/tithely/give-one-time/7549136",
    icon: HandHeart,
    external: true,
  },
  {
    label: "Connect",
    description: "Start a conversation and find your community",
    href: "/connect",
    icon: UsersRound,
    external: false,
  },
] as const;

export default function TapPage() {
  return (
    <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-white px-4 py-12 sm:px-8 md:py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col">
        <div className="mb-12 flex items-end justify-between border-b border-black pb-5 md:mb-16">
          <div>
            <p className="text-xs font-black tracking-[0.22em] uppercase">Faith Community Church</p>
            <h1 className="mt-3 max-w-xl text-5xl font-black leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl">
              Your next step.
            </h1>
          </div>
          <span className="hidden text-xs font-bold tracking-widest uppercase sm:block">
            Moss Bluff, LA
          </span>
        </div>

        <nav aria-label="Quick links">
          <ul className="divide-y divide-black border-y border-black">
            {actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <li key={action.label}>
                  <Link
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noreferrer" : undefined}
                    className="group grid min-h-32 grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 transition-colors duration-300 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none sm:gap-7 sm:px-5"
                  >
                    <span className="self-start pt-1 text-[10px] font-black tabular-nums tracking-widest">
                      0{index + 1}
                    </span>
                    <span className="flex items-center gap-4 sm:gap-6">
                      <span className="flex size-11 shrink-0 items-center justify-center border border-black bg-white transition-transform duration-300 group-hover:-rotate-3 sm:size-13">
                        <Icon className="size-5 sm:size-6" strokeWidth={1.7} />
                      </span>
                      <span>
                        <span className="block text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                          {action.label}
                        </span>
                        <span className="mt-1 block max-w-sm text-xs font-medium text-black/60 sm:text-sm">
                          {action.description}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-8"
                      strokeWidth={1.7}
                    />
                  </Link>
                </li>
              );
            })}

            <li>
              <button
                type="button"
                className="group grid min-h-32 w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 text-left transition-colors duration-300 hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none sm:gap-7 sm:px-5"
              >
                <span className="self-start pt-1 text-[10px] font-black tabular-nums tracking-widest">
                  03
                </span>
                <span className="flex items-center gap-4 sm:gap-6">
                  <span className="flex size-11 shrink-0 items-center justify-center border border-black bg-white transition-transform duration-300 group-hover:-rotate-3 sm:size-13">
                    <NotebookPen className="size-5 sm:size-6" strokeWidth={1.7} />
                  </span>
                  <span>
                    <span className="block text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                      Sermon Notes
                    </span>
                    <span className="mt-1 block max-w-sm text-xs font-medium text-black/60 sm:text-sm">
                      Follow along with today&apos;s message
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="size-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-8"
                  strokeWidth={1.7}
                />
              </button>
            </li>
          </ul>
        </nav>

        <p className="mt-6 text-xs font-medium text-black/50">
          Sundays at 10:00 AM · 1999 N Perkins Ferry Rd
        </p>
      </div>
    </section>
  );
}
