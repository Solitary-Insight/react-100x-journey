import React, { useState } from 'react'
export type GiftMessageSectionProps = {
  maxLength: number
}

/**
 * Problem 008 — implement GiftMessageSection here.
 */
export function GiftMessageSection({maxLength}: GiftMessageSectionProps) {
  const [enabled, setEnabled] = useState(false)
  const [message, setMessage] = useState('')
  
  function handleToggle(checked: boolean) {
    setEnabled(checked)
    if (!checked) setMessage('')
  }

  return (
    <section className="gift-message-section" data-testid="gift-message-section" >
      <label className="gift-message-section__toggle">
        <input className="gift-message-section__checkbox" data-testid="gift-toggle"
          type="checkbox"
          checked={enabled}
          onChange={(e) => handleToggle(e.target.checked)}
        />
        Include gift message
      </label>
      {enabled && (
        <div className="gift-message-section__body" data-testid="gift-message-body">
          <label className="gift-message-section__label" htmlFor="gift-message">Gift message</label>
          <textarea id="gift-message" className="gift-message-section__input" data-testid="gift-message-input" maxLength={maxLength} value={message} onChange={(e)=>setMessage(e.target.value)} />
          <p className="gift-message-section__counter" data-testid="gift-char-counter">{message.length} / {maxLength}</p>
        </div>
      )}
    </section>
  )
}
