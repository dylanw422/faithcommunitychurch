import { getStarterSermonNotes, parseSermonNotes, type SermonNotes } from "@/lib/sermon-notes";

type GitHubContentResponse = {
  content?: string;
  encoding?: string;
  sha?: string;
};

type GitHubUpdateResponse = {
  content?: {
    sha?: string;
  };
};

export class SermonRepositoryError extends Error {
  constructor(
    message: string,
    public readonly status = 500
  ) {
    super(message);
  }
}

function getRepositoryConfig() {
  const owner = process.env.SERMON_NOTES_GITHUB_OWNER;
  const repository = process.env.SERMON_NOTES_GITHUB_REPO;
  const token = process.env.SERMON_NOTES_GITHUB_TOKEN;
  const branch = process.env.SERMON_NOTES_GITHUB_BRANCH ?? "main";
  const path = (process.env.SERMON_NOTES_GITHUB_PATH ?? "content/sermon-notes.json").replace(
    /^\/+/,
    ""
  );

  if (!owner || !repository || !token || !branch || !path || path.includes("..")) {
    throw new SermonRepositoryError("The sermon notes repository is not configured.", 503);
  }

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return { owner, repository, token, branch, path, encodedPath };
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getSermonNotesFromRepository() {
  const config = getRepositoryConfig();
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repository)}/contents/${config.encodedPath}?ref=${encodeURIComponent(config.branch)}`;
  const response = await fetch(endpoint, {
    headers: githubHeaders(config.token),
    cache: "no-store",
  });

  if (response.status === 404) {
    return { notes: getStarterSermonNotes(), sha: null };
  }

  if (!response.ok) {
    throw new SermonRepositoryError("Unable to load sermon notes from GitHub.", 502);
  }

  const result = (await response.json()) as GitHubContentResponse;
  if (result.encoding !== "base64" || !result.content || !result.sha) {
    throw new SermonRepositoryError("GitHub returned an invalid sermon notes file.", 502);
  }

  try {
    const decoded = Buffer.from(result.content.replace(/\n/g, ""), "base64").toString("utf8");
    const notes = parseSermonNotes(JSON.parse(decoded));
    if (!notes) throw new Error("Invalid notes");
    return { notes, sha: result.sha };
  } catch {
    throw new SermonRepositoryError("The sermon notes file in GitHub is invalid.", 422);
  }
}

export async function publishSermonNotes(notes: SermonNotes, expectedSha: string | null) {
  const config = getRepositoryConfig();
  const serialized = `${JSON.stringify(notes, null, 2)}\n`;

  if (Buffer.byteLength(serialized, "utf8") > 100_000) {
    throw new SermonRepositoryError("The sermon notes are too large to publish.", 413);
  }

  const endpoint = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repository)}/contents/${config.encodedPath}`;
  const body: Record<string, string> = {
    message: `Update sermon notes: ${notes.title.replace(/\s+/g, " ")}`,
    content: Buffer.from(serialized).toString("base64"),
    branch: config.branch,
  };

  if (expectedSha) body.sha = expectedSha;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      ...githubHeaders(config.token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (response.status === 409 || response.status === 422) {
    throw new SermonRepositoryError(
      "These notes changed elsewhere. Refresh the editor before publishing again.",
      409
    );
  }

  if (!response.ok) {
    throw new SermonRepositoryError("GitHub could not publish the sermon notes.", 502);
  }

  const result = (await response.json()) as GitHubUpdateResponse;
  const sha = result.content?.sha;
  if (!sha) throw new SermonRepositoryError("GitHub did not confirm the update.", 502);

  return sha;
}
