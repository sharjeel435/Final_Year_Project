# Personalized Crypto

AI-powered trading insights. Complete an assessment, take a short quiz, and receive a personalized results dashboard with charts, recommendations, and export options.

## Tech Stack

- Vite 5
- React 18 + TypeScript
- Tailwind CSS, shadcn/ui, Radix Primitives
- TanStack Query
- Recharts

## Getting Started

### Requirements
- Node.js 18+ and npm

### Setup
```sh
npm install
npm run dev
```
The dev server starts on an available port (often `http://localhost:8080/` or `http://localhost:8081/`).

### Environment
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon key

PowerShell example:
```powershell
$env:VITE_SUPABASE_URL="https://<project-ref>.supabase.co"
$env:VITE_SUPABASE_ANON_KEY="<anon-key>"
npm run dev
```

### Assets
Optional background images (for the wallpaper effect):
- `public/backgrounds/crypto-1.jpg`
- `public/backgrounds/crypto-2.jpg`

Global background styles live in `src/index.css`.

## Pages & Flow

1) Assessment (`/assessment`)
- Captures user profile and trading statistics.
- Persists data to localStorage (`cryptoquest_user`).
- Sends data to webhook: `https://cryptoagent.app.n8n.cloud/webhook-test/quiz-form`.

2) Quiz (`/quiz`)
- Generates 10 randomized questions across trading topics.
- Stores results in localStorage (`cryptoquest_quiz_results`).
- Submits a quiz report to webhook: `https://cryptoagent.app.n8n.cloud/webhook/quiz-report`.

3) Results (`/results`)
- Computes derived metrics: win/failure rates, profit/loss ratios, net performance, trade efficiency, composite score.
- Displays charts and recommendations.
- “Ask AI Agent” opens the chat in a new tab: `https://fyp-crypto.app.n8n.cloud/webhook/d8017fec-1fd7-40fa-aad2-7802c65b51d5/chat`.
- “Email Report” opens Gmail compose in a new tab with a professional summary.

### Print / PDF
- Use your browser’s Print to save the results as PDF.
- Interactive buttons are hidden automatically in print mode.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview built assets
- `npm run lint` — run ESLint
- `npm run test` — run unit tests (vitest)

## Troubleshooting

- If the dev server picks a different port, open the printed URL in the console output.
- Ensure environment variables are set before running locally.
- For webhook issues, confirm the endpoints are reachable and authenticated where required.

## Security

- Do not expose Supabase service role keys or other secrets in the client.
- Keep sensitive operations server-side; store only non-sensitive data in localStorage.
