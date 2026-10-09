# Explanation — Problem 025: Pick line select list

## Concept

**Controlled selection:** the parent owns `selectedId`; the list is a pure view that notifies via `onSelect`. Use `aria-pressed` on toggle-style buttons so assistive tech knows which line is active.

## Reference approach

```tsx
export function PickLineSelectList({
  lines,
  selectedId,
  onSelect,
}: PickLineSelectListProps) {
  return (
    <ul className="pick-line-select" data-testid="pick-line-select-list">
      {lines.map((line) => (
        <li key={line.id} className="pick-line-select__item">
          <button
            type="button"
            className="pick-line-select__button"
            data-testid={`pick-line-select-${line.id}`}
            aria-pressed={selectedId === line.id}
            onClick={() => onSelect(line.id)}
          >
            {line.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
```

## Common mistakes

- `useState` for selection inside the list (breaks single source of truth).
- Using `aria-selected` on a `<div>` instead of `aria-pressed` on a `<button>`.
- Forgetting `type="button"` inside forms.
