# Problem 005 — Support note field (controlled)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 17 / 100 |
| **Concept** | Controlled text input, `onChange` events, label association, character limit display |

## Scenario

Agents append an internal note when escalating a ticket. The note field is **controlled**: the ticket page holds `note` in state and passes `value` + `onChange`. The field shows a live character count against a maximum length from policy (not hard-coded in the component).

## Requirements

Implement `SupportNoteField` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type SupportNoteFieldProps = {
     id: string
     label: string
     value: string
     maxLength: number
     onChange: (next: string) => void
   }
   ```

2. **Markup**

   - Root: `<div className="support-note-field">`
   - Label: `<label className="support-note-field__label" htmlFor={id}>{label}</label>`
   - Textarea: `<textarea id={id} className="support-note-field__input" value={value} onChange={...} maxLength={maxLength} />`
   - Counter: `<p className="support-note-field__counter" data-testid="char-counter">{value.length} / {maxLength}</p>`

3. **Behavior**

   - `value` comes from props only (no `useState` for the note text).
   - `onChange` receives the **full next string** from `event.target.value`.
   - `maxLength` on the textarea must match the prop (browser enforces limit).
   - Counter always reflects `value.length` and the prop `maxLength`.

4. Export `SupportNoteField` and `SupportNoteFieldProps`.

## Acceptance criteria

- Typing updates `onChange` with the new string (tested via `userEvent.type`).
- Label is associated with textarea (`htmlFor` / `id`).
- Counter shows correct counts for empty and partial input.
- `npm test` passes.

## Constraints

- Functional component; no `useState` for `value`.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
