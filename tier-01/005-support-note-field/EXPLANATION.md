# Explanation — Problem 005: Support note field

## Concept

**Controlled inputs** tie `value` to React state in a parent. The field calls `onChange(next)` on every edit; the parent updates state and passes the new `value` back down. Without that loop, the textarea appears “stuck” — only the last keystroke seems to register.

## Why it matters

- **`htmlFor` + `id`** — clicking the label focuses the field (larger hit target for agents on long shifts).
- **`maxLength` on the element** — browser enforces limit; duplicating slice logic in `onChange` is easy to get wrong.
- **No debug logging** in `onChange` — fires on every keystroke; kills performance and leaks data in prod.

## Reference solution

```tsx
export function SupportNoteField({
  id,
  label,
  value,
  maxLength,
  onChange,
}: SupportNoteFieldProps) {
  return (
    <div className="support-note-field">
      <label className="support-note-field__label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="support-note-field__input"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="support-note-field__counter" data-testid="char-counter">
        {value.length} / {maxLength}
      </p>
    </div>
  )
}
```

Do **not** add `aria-label` when a visible `<label>` is already associated — screen readers can announce the field twice.

## What you did well

- Correct structure, counter, `htmlFor`, and `maxLength` attribute.
- Destructured props; no local note state.

## What a reviewer would flag

| Issue | Fix |
|-------|-----|
| `console.log` in `onChange` | Remove before merge |
| `e.target.value.slice(0, maxLength)` | Use `e.target.value`; `maxLength` already caps input |
| `aria-label='Note'` | Remove — conflicts with visible label |
| `import React` | Unnecessary with Vite JSX runtime |

## Testing controlled fields

Tests that type into a controlled field must **lift state in a harness** (or mock `onChange` to update `value` + `rerender`). Otherwise each keypress sees `value=""` and only the latest character is in `event.target.value`.

## Read next

- [React: Input — controlling with state](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [MDN: label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
