"use client";
import Community from "@/components/community";
import Hero from "@/components/hero";
import Leaders from "@/components/leaders";
import Mission from "@/components/mission";
import Tithe from "@/components/tithe";
import Vision from "@/components/vision";

export default function Home() {
  return (
    <div>
      <div className={`w-full items-center justify-center text-center bg-white`}>
        <Hero />
        <div className="flex w-full h-[200px] md:h-[400px] px-4">
          <img src="./fcc6.webp" className="w-full py-4 object-cover" />
        </div>
        <Mission />
        <Community />
        <Leaders />
        <Vision />
        <Tithe />
      </div>
    </div>
  );
}
