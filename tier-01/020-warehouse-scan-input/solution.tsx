export type WarehouseScanInputProps = {
  onScan: (code: string) => void
}

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

export function WarehouseScanInput({ onScan }: WarehouseScanInputProps) {
  const [code, setCode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = code.trim()
    if (trimmed.length === 0) return
    onScan(trimmed)
    setCode('')
  }

  return (
    <form data-testid="warehouse-scan-form" onSubmit={handleSubmit}>
      <label className="warehouse-scan__label" htmlFor="warehouse-scan-input">Bin code</label>
      <input id="warehouse-scan-input" ref={inputRef} className="warehouse-scan__input" data-testid="warehouse-scan-input" value={code} onChange={(e)=>setCode(e.target.value)}/>
     <button type="submit" className="warehouse-scan__submit" data-testid="warehouse-scan-submit">Confirm scan</button>
    </form>
  )
}
