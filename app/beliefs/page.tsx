import type { Metadata } from "next";

import Beliefs from "@/components/beliefs";

export const metadata: Metadata = {
  title: "Our Beliefs | Faith Community Church",
  description: "Read the foundational beliefs of Faith Community Church in Moss Bluff, Louisiana.",
};

export default function BeliefsPage() {
  return <Beliefs />;
}
