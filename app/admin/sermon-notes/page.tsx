import type { Metadata } from "next";
import SermonEditor from "@/components/sermon-editor";
import SermonLogin from "@/components/sermon-login";
import {
  getSermonNotesFromRepository,
  SermonRepositoryError,
} from "@/lib/github-sermon-notes";
import { getSermonAdminSession } from "@/lib/sermon-auth";
import { getStarterSermonNotes } from "@/lib/sermon-notes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sermon Notes Editor | Faith Community Church",
  robots: { index: false, follow: false },
};

type AdminPageProps = {
  searchParams: Promise<{ auth?: string }>;
};

export default async function SermonNotesAdminPage({ searchParams }: AdminPageProps) {
  const [session, params] = await Promise.all([getSermonAdminSession(), searchParams]);

  if (!session) {
    return <SermonLogin invalidLink={params.auth === "invalid"} />;
  }

  try {
    const current = await getSermonNotesFromRepository();
    return (
      <SermonEditor
        initialNotes={current.notes}
        initialSha={current.sha}
        editorEmail={session.email}
      />
    );
  } catch (error) {
    const message =
      error instanceof SermonRepositoryError
        ? error.message
        : "The sermon notes repository could not be loaded.";

    return (
      <SermonEditor
        initialNotes={getStarterSermonNotes()}
        initialSha={null}
        editorEmail={session.email}
        initialError={message}
      />
    );
  }
}
