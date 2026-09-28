export type SupportNoteFieldProps = {
  id: string
  label: string
  value: string
  maxLength: number
  onChange: (next: string) => void
}

/**
 * Problem 005 — implement SupportNoteField here.
 */
import React, { useState } from 'react'
export function SupportNoteField(_props: SupportNoteFieldProps) {
  const { id, label, value, maxLength, onChange } = _props
  return <div className="support-note-field">
    <label className="support-note-field__label" htmlFor={id}>{label}</label>
    <textarea aria-label='Note' id={id} className="support-note-field__input" value={value} onChange={(e)=>{
     console.log('value', value)
     onChange(e.target.value)
    }} maxLength={maxLength} />

    <p className="support-note-field__counter" data-testid="char-counter">{value.length} / {maxLength}</p>
  </div>
}
