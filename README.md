This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connect form email

The `/connect` form sends connection cards through the church mailbox using SMTP. Copy
`.env.example` to `.env.local` and replace the placeholder values with the SMTP settings supplied
by the mailbox provider. Use port `465` with `SMTP_SECURE=true`, or port `587` with
`SMTP_SECURE=false` for STARTTLS.

Add the same variables to the deployment environment. `CONNECT_FORM_FROM` must use an address the
SMTP account is permitted to send from. Mailbox providers such as Gmail or Microsoft may require an
app password instead of the normal account password.

## Sermon notes editor

The public notes are available at `/sermon-notes`. Authorized team members can update them from a
phone at `/admin/sermon-notes` using a passwordless email link. Publishing updates
`content/sermon-notes.json` through GitHub, which preserves every revision and starts the connected
Vercel production deployment.

Copy `.env.example` to `.env.local`, then configure these values locally and in the Vercel project:

- `SERMON_NOTES_ADMIN_EMAILS`: comma-separated email addresses allowed to use the editor.
- `SERMON_NOTES_AUTH_SECRET`: at least 32 random characters. Generate one with
  `openssl rand -base64 32`.
- `SERMON_NOTES_SITE_URL`: the production origin, normally `https://fcclc.com`.
- `SERMON_NOTES_EMAIL_FROM`: an SMTP-authorized sender such as `welcome@fcclc.com`.
- `SERMON_NOTES_GITHUB_OWNER`: the GitHub account or organization that owns the repository.
- `SERMON_NOTES_GITHUB_REPO`: the repository name.
- `SERMON_NOTES_GITHUB_TOKEN`: a fine-grained GitHub personal access token restricted to this
  repository with **Contents: Read and write** permission.
- `SERMON_NOTES_GITHUB_BRANCH`: the Vercel production branch, normally `main`.
- `SERMON_NOTES_GITHUB_PATH`: leave as `content/sermon-notes.json` unless the file moves.
- `YOUVERSION_APP_KEY`: the App Key from YouVersion Platform. Enable access to Bible version 111
  (NIV) and accept its publisher license in the YouVersion dashboard.

Keep the GitHub token, SMTP password, and auth secret in environment variables only. Never commit
them. The GitHub account that creates the token should also be connected to the Vercel project so
its commits trigger production deployments.

The app stores Bible book/chapter navigation metadata in `content/bible-metadata.json`. NIV verse
text is fetched from YouVersion's licensed API when an editor selects a verse and when the public
page is rendered; the copyrighted NIV text is intentionally not committed to the repository.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
