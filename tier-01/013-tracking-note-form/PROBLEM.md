# Problem 013 — Tracking note form (submit + controlled field)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 41 / 100 |
| **Concept** | Controlled input + `onSubmit` with `preventDefault`; parent receives note via callback |

## Scenario

Warehouse staff attach a **tracking note** to an order before handoff. The form owns the draft text locally; on submit it passes the trimmed note to the parent (save API) and clears the field for the next scan.

## Requirements

Implement `TrackingNoteForm` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type TrackingNoteFormProps = {
     orderId: string
     onSubmit: (note: string) => void
   }
   ```

2. **State**

   - `useState('')` for the draft note text (controlled input).

3. **Layout**

   - `<form className="tracking-note-form" data-testid="tracking-note-form" onSubmit={...}>`
   - Context: `<p className="tracking-note-form__order" data-testid="tracking-order-id">Order {orderId}</p>`
   - Label: `<label className="tracking-note-form__label" htmlFor="tracking-note">Tracking note</label>`
   - Input: `<input id="tracking-note" className="tracking-note-form__input" data-testid="tracking-note-input" value={...} onChange={...} />`
   - Submit: `<button type="submit" className="tracking-note-form__submit" data-testid="tracking-note-submit">Add note</button>`

4. **Behavior**

   - `onChange` updates draft from `event.target.value`.
   - `onSubmit` handler:
     - `event.preventDefault()` so the page does not reload.
     - `const trimmed = note.trim()`
     - If `trimmed.length === 0`, do **not** call `onSubmit` (no-op submit).
     - Otherwise call `onSubmit(trimmed)` and reset draft to `''`.

5. Export `TrackingNoteForm` and `TrackingNoteFormProps`.

## Acceptance criteria

- Shows order id from props.
- Typing updates the controlled input.
- Submit with text calls `onSubmit` once with trimmed string and clears the input.
- Empty or whitespace-only submit does not call `onSubmit`.
- `npm test` passes.

## Constraints

- No `useEffect` for submit side effects.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
