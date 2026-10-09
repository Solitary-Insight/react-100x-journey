export type PickLine = {
  id: string
  label: string
}

export type PickLineSearchPanelProps = {
  lines: PickLine[]
}

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
      {visible.length === 0 ? (
        <p className="pick-line-filter__empty" data-testid="pick-line-empty">
          No matching pick lines
        </p>
      ) : (
        <ul className="pick-line-filter__list" data-testid="pick-line-list">
          {visible.map((line) => (
            <li
              key={line.id}
              className="pick-line-filter__item"
              data-testid={`pick-line-${line.id}`}
            >
              {line.label}
            </li>
          ))}
        </ul>
      )}    </section>
  )
}