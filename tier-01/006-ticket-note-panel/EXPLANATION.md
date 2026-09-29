# Explanation — Problem 006: Ticket note panel

## Concept

**Lifting state** means the parent owns the data (`useState`) and the child only renders `value` and reports edits through `onChange`. `NoteField` stays the same dumb field as Problem 005. `TicketNotePanel` decides the initial draft, the max length, and what Clear does.

## Why it matters

- **One source of truth.** The panel can clear, submit, or replace the draft without the field holding a second copy.
- **Reusable field.** `NoteField` must not know about tickets, Clear, or panel class names. The next screen can reuse it with a different parent.
- **`maxLength` on the textarea.** The browser blocks extra characters and still allows backspace, delete, and replacing a selection. A guard of `if (value.length >= maxLength) return` freezes the field at the cap and still lets a paste jump far past the limit.

## Reference solution

```tsx
import { useState } from 'react'

export function NoteField({
  id,
  label,
  value,
  maxLength,
  onChange,
}: NoteFieldProps) {
  return (
    <div className="support-note-field">
      <label className="support-note-field__label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="support-note-field__input"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="support-note-field__counter" data-testid="char-counter">
        {value.length} / {maxLength}
      </p>
    </div>
  )
}

export function TicketNotePanel() {
  const [note, setNote] = useState('')
  const maxLength = 200

  return (
    <section className="ticket-note-panel" data-testid="ticket-note-panel">
      <h2 className="ticket-note-panel__title">Escalation note</h2>
      <NoteField
        id="escalation-note"
        label="Note for tier-2"
        value={note}
        maxLength={maxLength}
        onChange={setNote}
      />
      <button
        type="button"
        className="ticket-note-panel__clear"
        data-testid="clear-note"
        onClick={() => setNote('')}
      >
        Clear
      </button>
    </section>
  )
}
```

`setNote` is already `(next: string) => void`, so it can be passed straight to `onChange`. Clear calls `setNote('')` on the panel, not inside the field.

## What you did well

- Draft state lives in `TicketNotePanel` with `useState('')`.
- `NoteField` is controlled: `value={note}` and `onChange={setNote}`.
- No `console.log` on each keystroke (that was the 005 flag).
- Panel shell (`section`, title, test id) matches the spec.
- Tests: **3 / 3 passed**.

## What a reviewer would flag

| Issue | Fix |
|-------|-----|
| `<input>` plus `aria-label` | Reuse the 005 contract: visible `<label htmlFor>`, `<textarea>`, `support-note-field` classes |
| Clear button inside `NoteField` | Render it in `TicketNotePanel` and call `setNote('')` |
| `if (value.length >= maxLength) return` | Put `maxLength={maxLength}` on the textarea and always forward `event.target.value` |
| `import React` | Import only `useState` |

The tests passed because they check typing, the counter, and Clear. They do not check element type, classes, or which component owns the button. The spec still requires those.

## Read next

- [React: Sharing state between components](https://react.dev/learn/sharing-state-between-components)
- [React: Input — controlling with state](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
