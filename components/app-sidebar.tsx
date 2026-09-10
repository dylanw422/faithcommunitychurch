"use client";

import * as React from "react";
import { ArrowUpRight, Clock3, MapPin, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";

type NavigationItem = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

const navigation: readonly NavigationItem[] = [
  {
    title: "Home",
    description: "Welcome to Faith Community Church",
    href: "/",
  },
  {
    title: "Beliefs",
    description: "What we believe and why it matters",
    href: "/beliefs",
  },
  {
    title: "Connect",
    description: "Introduce yourself and take a next step",
    href: "/connect",
  },
  {
    title: "Give",
    description: "Support the ministry of our church",
    href: "https://tithe.ly/give_new/www/#/tithely/give-one-time/7549136",
    external: true,
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar className="border-l-black" side="right" variant="sidebar" {...props}>
      <SidebarContent className="bg-white text-black">
        <div className="flex min-h-full flex-col">
          <header className="flex items-start justify-between px-5 py-6 sm:px-7">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-black/50 uppercase">
                Navigation
              </p>
              <p className="mt-2 max-w-48 text-2xl font-black leading-[0.9] tracking-[-0.045em]">
                Faith Community Church.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="flex size-11 shrink-0 items-center justify-center border border-black transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              aria-label="Close navigation menu"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          <nav aria-label="Main navigation">
            <ul className="divide-y divide-black">
              {navigation.map((item) => {
                const isActive =
                  !item.external &&
                  (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));

                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      onClick={toggleSidebar}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-24 w-full items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none sm:px-7 ${
                        isActive ? "bg-neutral-100" : "bg-white"
                      }`}
                    >
                      <span>
                        <span className="text-3xl font-black tracking-[-0.045em]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-black/50">
                          {item.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <footer className="mt-auto border-t border-black bg-black px-5 py-6 text-white sm:px-7">
            <div className="flex gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-black tracking-[0.16em] text-white/50 uppercase">
                  Join us Sunday
                </p>
                <p className="mt-1 text-sm font-bold">10:00 AM</p>
              </div>
            </div>
            <div className="mt-5 flex gap-3 border-t border-white/20 pt-5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-black tracking-[0.16em] text-white/50 uppercase">
                  Moss Bluff, Louisiana
                </p>
                <p className="mt-1 text-sm leading-5">
                  1999 N Perkins Ferry Rd
                  <br />
                  Lake Charles, LA 70611
                </p>
              </div>
            </div>
          </footer>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
