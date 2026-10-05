# Explanation — Problem 013: Tracking note form

## Concept

Combine **controlled state** (draft note) with a **form submit** event. Always `preventDefault()` on submit in SPAs. Validate (trim, non-empty) before calling the parent’s `onSubmit`.

## Why it matters

- Real apps submit through forms for Enter key and accessibility defaults.
- Trimming avoids saving `"   "` notes.
- Clearing after submit supports rapid sequential warehouse scans.

## Reference approach

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'

export function TrackingNoteForm({ orderId, onSubmit }: TrackingNoteFormProps) {
  const [note, setNote] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = note.trim()
    if (trimmed.length === 0) return
    onSubmit(trimmed)
    setNote('')
  }

  return (
    <form data-testid="tracking-note-form" onSubmit={handleSubmit}>
      ...
      <input value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit">Add note</button>
    </form>
  )
}
```

## Common mistakes

- Forgetting `preventDefault()` (full page reload in some environments).
- Calling `onSubmit` with untrimmed text.
- Using `onClick` on the button instead of `onSubmit` on the form (Enter key won’t work in all cases).
