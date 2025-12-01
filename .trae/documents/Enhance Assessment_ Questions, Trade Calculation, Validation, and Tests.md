## Scope
- Extend `src/pages/Assessment.tsx` to add dynamic assessment question generation and real-time trade calculations with validation and responsive UI.
- Augment `src/lib/questionBank.ts` with a tagged assessment question bank, reusing existing UI primitives.
- Persist values to localStorage and validate on submit and server-side.
- Add Vitest + Testing Library for unit/integration tests.

## Changes in Assessment Page
1. Trade Calculation System
- Inputs: `Total trades` and `Successful trades` (required, numeric). Derive `Failed trades = Total - Successful` in real time.
- Replace the editable `failed_trades` input with a read-only field that updates as the user types.
- Validation rules:
  - `success_trades <= no_of_trade`
  - Both are positive integers (allow 0)
  - Prevent non-numeric and negative values; normalize blanks to `0`.
- Immediate feedback:
  - Inline error text under fields using existing `Label`/`Input` components and red text classes.
  - `aria-invalid` and `aria-describedby` for accessibility (match `Login.tsx` patterns).
- Implementation:
  - Keep numeric state as strings for input, derive `failed` via `useMemo`.
  - Guard submit: disable button when invalid; on submit, revalidate and block webhook.
  - Persist: write `{ total, success, failed }` into `cryptoquest_user` and as a separate `cryptoquest_trade_stats` key; on mount, hydrate and recompute failed.
- File references to update:
  - `src/pages/Assessment.tsx`: Trading Statistics section (around 206–273) — replace `failed_trades` manual entry with computed read-only, add errors and button disabling.

2. Dynamic Assessment Questions
- Add a "Question Topic" `Select` with topics: `Risk Management`, `Trading Strategy`, `Psychology`, `Technical Analysis`.
- Create `ASSESSMENT_QUESTION_BANK` with items `{ id, topic, question, options[] }` (multiple-choice). Place this alongside `QUESTION_BANK` in `src/lib/questionBank.ts` and export.
- Generation logic:
  - On topic select, filter bank by topic.
  - Shuffle deterministically (Fisher–Yates) and pick 20 unique questions; track used IDs to prevent duplicates.
  - Validate: if fewer than 20 available, show toast and cap to available.
- UI:
  - Render questions as a list with `RadioGroup` and `Label` (consistent with `Quiz.tsx`: 176–191). Each question shows its text and options.
  - Store answers in `assessment_answers` state keyed by question ID.
  - Responsive grid with spacing similar to existing Card sections.

3. Data Handling
- On submit:
  - Compose payload with `assessment` object plus `trade_stats` and optional `assessment_answers`, ensuring numbers are parsed and validated.
  - Server-side validation (client-enforced before POST): reject and toast if rules fail; otherwise POST to existing webhook `https://cryptoagent.app.n8n.cloud/webhook-test/quiz-form`.
- Persistence:
  - Save `trade_stats`, selected topic, and generated questions in localStorage to survive refresh.
  - Rehydrate in `useEffect` before rendering; recompute `failed` to avoid drift.

4. UI/UX
- Clear labels for all inputs and select.
- Inline error messages appear as soon as invalid values are entered.
- Read-only failed trades field with subtle background tint.
- Mobile-first layout: maintain current grid; ensure fields stack on small screens.

## Testing
1. Tooling
- Add devDependencies: `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`.
- Add scripts: `test`, `test:watch`.

2. Unit Tests
- `src/__tests__/tradeCalc.test.ts`:
  - `calculateFailedTrades(total, success)` returns `max(total - success, 0)`.
  - Validations: success > total → invalid; negatives → invalid; zero/equal cases.

3. Integration Tests
- `src/__tests__/AssessmentForm.test.tsx`:
  - Render `Assessment`, input total/success, assert failed updates immediately and errors show/hide.
  - Select topic, assert 20 unique questions render.
  - Submit valid form, mock `fetch`, assert payload contains parsed numbers and persisted keys.

4. Edge and Compatibility
- Test zeros and equal totals/success.
- Confirm layout and behavior in Chromium/Firefox: rely on standard inputs and no browser-specific APIs.

## Implementation Steps
1. Update `src/lib/questionBank.ts`: add `ASSESSMENT_QUESTION_BANK` with topics and export types.
2. Update `src/pages/Assessment.tsx`:
- Add topic `Select`, question generation state/effects, and rendering.
- Implement trade calc, validation, read-only failed field, inline errors, disabled submit.
- Persist/rehydrate topic, questions, and trade stats.
3. Adjust webhook submission: include `trade_stats` and `assessment_answers`; revalidate numbers before POST.
4. Add test tooling and write unit/integration tests.

## Notes
- No backend changes required; server-side validation emulated by blocking POST when rules fail.
- Reuse existing shadcn/Radix components to keep design consistent.
- Follow existing accessibility patterns in `Login.tsx` and `Quiz.tsx` for `aria-*`.

Please confirm this plan, and I will implement the changes and add tests accordingly.