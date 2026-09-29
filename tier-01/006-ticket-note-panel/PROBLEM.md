# Problem 006 — Ticket note panel (lifting state)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 20 / 100 |
| **Concept** | Lifting state up — parent owns state, child stays controlled |

## Scenario

Escalation UI needs a **panel** that owns the draft note in React state and passes `value` / `onChange` into a dumb note field (same contract as Problem 005). A **Clear** control resets the draft without the field knowing about ticket IDs or APIs.

## Requirements

Implement in `solution.tsx`:

1. **`NoteField`** — presentational (export it):

   ```ts
   export type NoteFieldProps = {
     id: string
     label: string
     value: string
     maxLength: number
     onChange: (next: string) => void
   }
   ```

   Same DOM contract as Problem 005 (`support-note-field` classes, `htmlFor`, textarea, `char-counter` test id). **No `useState` inside `NoteField`.**

2. **`TicketNotePanel`** — stateful container (export it):

   - `useState('')` for `note`.
   - `const maxLength = 200` (constant in component — do not prop-drill for this problem).
   - Renders:
     - `<section className="ticket-note-panel" data-testid="ticket-note-panel">`
     - `<h2 className="ticket-note-panel__title">Escalation note</h2>`
     - `NoteField` with `id="escalation-note"`, `label="Note for tier-2"`, `value={note}`, `onChange={setNote}`, `maxLength={maxLength}`
     - `<button type="button" className="ticket-note-panel__clear" data-testid="clear-note">Clear</button>` — sets `note` to `''` on click.

3. Export `NoteField`, `NoteFieldProps`, `TicketNotePanel`.

## Acceptance criteria

- Typing updates the textarea and character counter.
- Clear empties the field and shows `0 / 200`.
- `NoteField` remains reusable (props-only, no panel state inside it).
- `npm test` passes.

## Constraints

- `useState` only in `TicketNotePanel`, not in `NoteField`.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
