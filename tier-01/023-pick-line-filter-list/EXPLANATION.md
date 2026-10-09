# Explanation — Problem 023: Pick line filter list

## Concept

**Derived data** should be computed from props during render (`const visible = ...`) instead of copied into state with `useEffect`. That avoids sync bugs when `lines` or `query` change.

## Reference approach

```tsx
export function PickLineFilterList({ lines, query }: PickLineFilterListProps) {
  const normalized = query.trim().toLowerCase()
  const visible =
    normalized.length === 0
      ? lines
      : lines.filter((line) => line.label.toLowerCase().includes(normalized))

  return (
    <section className="pick-line-filter" data-testid="pick-line-filter">
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
      )}
    </section>
  )
}
```

## Common mistakes

- `useState` + `useEffect` to mirror `lines`/`query` into filtered state.
- Forgetting `trim()` so `"   "` filters everything out.
- Rendering an empty `<ul>` instead of the empty-state paragraph.
