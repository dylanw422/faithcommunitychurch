import type { Metadata } from "next";
import SermonNotesView from "@/components/sermon-notes-view";
import { getStarterSermonNotes } from "@/lib/sermon-notes";

export const metadata: Metadata = {
  title: "Sermon Notes | Faith Community Church",
  description: "Follow along with the latest message from Faith Community Church.",
};

export default function SermonNotesPage() {
  return <SermonNotesView notes={getStarterSermonNotes()} />;
}
