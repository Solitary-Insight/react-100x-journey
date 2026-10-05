# Explanation — Problem 020: Warehouse scan input

## Concept

**`useRef`** holds a stable reference to the DOM node without causing re-renders. **`useEffect(() => { ... }, [])`** runs after mount — the right time to call `.focus()` on the input.

## Reference approach

```tsx
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
      <input ref={inputRef} value={code} onChange={(e) => setCode(e.target.value)} ... />
      ...
    </form>
  )
}
```

## Common mistakes

- Calling `focus()` during render (React warning / unreliable).
- Putting `code` in the focus effect deps (steals focus every keystroke).
- Forgetting `ref={inputRef}` on the input.
