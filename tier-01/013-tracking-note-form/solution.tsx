
import { useState } from 'react'
import type { FormEvent } from 'react'

export type TrackingNoteFormProps = {
  orderId: string
  onSubmit: (note: string) => void
}

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
      <p className="tracking-note-form__order" data-testid="tracking-order-id">Order {orderId}</p>
      <label  className="tracking-note-form__label" htmlFor="tracking-note">Tracking note</label>
      <input id='tracking-note' data-testid='tracking-note-input' value={note} onChange={(e) => setNote(e.target.value)} />
      <button data-testid='tracking-note-submit' type="submit">Add note</button>
    </form>
  )
}