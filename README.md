# CryptoQuest

AI-Powered Personalized System for Crypto Traders. Users complete an assessment, take a 10‑question quiz, and receive personalized insights with charts.

## Tech Stack

- Vite 5 (dev server on `http://localhost:8080/`)
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui + Radix
- TanStack Query
- Recharts

## Requirements

- Node.js 18+ and npm

## Setup

```sh
npm install
npm run dev
# open http://localhost:8080/
```

### Environment Variables

Client-side Supabase configuration (do not use service role on the frontend):

- `VITE_SUPABASE_URL` = `https://<project-ref>.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `<your-anon-key>`

Place them in your shell session (PowerShell):

```powershell
$env:VITE_SUPABASE_URL="https://<your-ref>.supabase.co"
$env:VITE_SUPABASE_ANON_KEY="<anon-key>"
npm run dev
```

### Background Images

To enable the crypto-themed wallpaper, add image assets:

- `public/backgrounds/crypto-1.jpg`
- `public/backgrounds/crypto-2.jpg`

The site-wide background layering is defined in `src/index.css`.

## Workflow

1. Assessment (`/assessment`):
   - Collects user profile and trading stats.
   - Posts all stored parameters to webhook `https://cryptoagent.app.n8n.cloud/webhook-test/quiz-form`.
   - Saves `cryptoquest_user` and initializes quiz state in local storage.

2. Quiz (`/quiz`):
   - Auto-generates 10 questions covering trading concepts.
   - Randomizes question and option order.
   - Provides accessible answer selection and progress.
   - On submit, computes score against correct answers.
   - Adds a 25s anticipation delay before navigating to results.

3. Results (`/results`):
   - Derives performance metrics from assessment and quiz.
   - Displays composite score and charts (win/fail/efficiency/quiz).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview built assets
- `npm run lint` — run ESLint

## Troubleshooting

- Webhook test mode: if you see “webhook not registered,” initialize the workflow once and retry.
- Port conflicts: change `server.port` in `vite.config.ts`.
- Missing env vars: ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set before running.

## Security Notes

- Never embed Supabase service role keys in frontend code.
- Store only non-sensitive values client-side; send sensitive data via a secure backend.
