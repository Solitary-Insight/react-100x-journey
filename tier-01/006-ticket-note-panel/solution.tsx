import React, { useState } from "react"

export type NoteFieldProps = {
  id: string
  label: string
  value: string
  maxLength: number
  onChange: (next: string) => void
}

export function NoteField(_props: NoteFieldProps) {
  const { id, maxLength, label, onChange, value } = _props
  return <>
    <span id='char-counter' data-testid='char-counter'>{value.length} / {maxLength}</span>
    
    <input id={id} value={value} type="text" aria-label={label} onChange={(e) => { 
      if (value.length >= maxLength) return 
      onChange(e.target.value)
    }} />

    <button type="button"  className="ticket-note-panel__clear" onClick={()=>onChange('')} data-testid="clear-note">Clear</button>
  </>
}

export function TicketNotePanel() {
  const [note, setNote] = useState('')
  const maxLength = 200

  return (<section className="ticket-note-panel" data-testid="ticket-note-panel">
    <h2 className="ticket-note-panel__title">Escalation note</h2>
    <NoteField id="escalation-note" maxLength={maxLength} label="Note for tier-2" onChange={setNote} value={note}>

    </NoteField>
  </section>)


}
