"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export default function Nav() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex w-full justify-center items-center py-4 font-medium px-4 md:px-0 bg-background/80 backdrop-blur-sm md:backdrop-blur-md sticky top-0">
      <div className="flex w-full md:w-2/3 justify-between items-center">
        <Link href="/">
          <img src="./fcclogominimal.webp" alt="FCC Logo" className="h-10" />
        </Link>
        <div>
          <Menu onClick={toggleSidebar} className="hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
