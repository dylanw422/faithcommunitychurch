"use client";
import { Facebook } from "lucide-react";

const details = [
  {
    title: "ADDRESS",
    description: "1226 Kirkman Street, Lake Charles, LA 70601",
  },
  {
    title: "CONTACT US",
    description: "melvin@fcclc.com",
  },
  {
    title: "FOLLOW US",
    description: (
      <Facebook
        onClick={() => window.open("https://www.facebook.com/profile.php?id=61571280872859")}
        className="w-4 h-4 md:w-6 md:h-6 rounded-full my-2"
      />
    ),
  },
  {
    title: "FAITH COMMUNITY CHURCH",
    description: new Date().getFullYear() + " | " + "All Rights Reserved",
  },
];

export default function Footer() {
  return (
    <div className={`w-full bg-black text-white p-4 text-xs space-y-4`}>
      {details.map((detail, index) => {
        return (
          <div
            key={index}
            className={
              index === details.length - 1
                ? "text-center text-sm border-t border-white/20 pt-4"
                : "text-start"
            }
          >
            <h1 className="md:text-base font-bold">{detail.title}</h1>
            <h1 className="md:text-base">{detail.description}</h1>
          </div>
        );
      })}
    </div>
  );
}
