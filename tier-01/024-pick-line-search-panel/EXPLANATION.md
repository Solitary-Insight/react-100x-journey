# Explanation — Problem 024: Pick line search panel

## Concept

**Colocate** UI state with the component that consumes it. The parent supplies data (`lines`); the panel keeps the ephemeral **search draft** in `useState` and derives the visible rows on each render.

## Reference approach

```tsx
import { useState } from 'react'

export function PickLineSearchPanel({ lines }: PickLineSearchPanelProps) {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const visible =
    normalized.length === 0
      ? lines
      : lines.filter((line) => line.label.toLowerCase().includes(normalized))

  return (
    <section className="pick-line-search-panel" data-testid="pick-line-search-panel">
      <label className="pick-line-search-panel__label" htmlFor="pick-line-search-input">
        Search pick lines
      </label>
      <input
        id="pick-line-search-input"
        className="pick-line-search-panel__input"
        data-testid="pick-line-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* same list / empty branch as Problem 023 */}
    </section>
  )
}
```

## Common mistakes

- Lifting `query` to the parent when only this panel needs it.
- Storing `visible` in state and syncing with `useEffect`.
- Hard-coding a different empty message or test ids than Problem 023.
