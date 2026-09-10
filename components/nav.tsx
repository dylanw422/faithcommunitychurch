"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export default function Nav() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="sticky top-0 z-40 flex w-full items-center justify-center bg-background/80 px-4 py-4 font-medium backdrop-blur-sm md:px-0 md:backdrop-blur-md">
      <div className="flex w-full md:w-2/3 justify-between items-center">
        <Link href="/">
          <Image src="/fcclogominimal.webp" alt="FCC Logo" width={40} height={40} priority />
        </Link>
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex size-10 items-center justify-center transition-colors hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          aria-label="Open navigation menu"
        >
          <Menu className="size-6" />
        </button>
      </div>
    </div>
  );
}
