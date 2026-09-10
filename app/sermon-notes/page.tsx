import type { Metadata } from "next";
import SermonNotesView from "@/components/sermon-notes-view";
import { getStarterSermonNotes } from "@/lib/sermon-notes";
import { getSermonPassages } from "@/lib/youversion";

export const metadata: Metadata = {
  title: "Sermon Notes | Faith Community Church",
  description: "Follow along with the latest message from Faith Community Church.",
};

export default async function SermonNotesPage() {
  const notes = getStarterSermonNotes();
  const passages = await getSermonPassages(notes);
  return <SermonNotesView notes={notes} passages={passages} />;
}
