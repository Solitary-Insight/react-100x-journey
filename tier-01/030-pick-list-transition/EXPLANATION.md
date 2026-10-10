# Explanation — Problem 030: Pick list transition

## Concept

`useTransition` marks state updates inside `startTransition` as **non-urgent**, so React can keep the input responsive and set `isPending` while work finishes.

## Reference pattern

```tsx
function onQueryChange(next: string) {
  setQuery(next) // urgent
  startTransition(() => {
    const normalized = next.trim().toLowerCase()
    const nextVisible =
      normalized.length === 0
        ? lines
        : lines.filter((l) => l.label.toLowerCase().includes(normalized))
    setVisibleLines(nextVisible)
  })
}
```

Use **`next`** (or `deferredQuery` state set in the transition), not stale `query` from the closure.

## Common mistakes

- Filtering with `query` inside `startTransition` right after `setQuery` — one keystroke behind; empty string matches all labels via `.includes('')`.
- Forgetting case-insensitive normalize.
- Not resetting `visibleLines` when `lines` prop changes (`useEffect`).
