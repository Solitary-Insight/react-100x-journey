# Explanation — Problem 021: SKU lookup field

## Concept

**`useId()`** returns a stable unique string per component instance (safe for SSR). Use it for `id` / `htmlFor` instead of hard-coded strings when a field component may appear multiple times.

## Reference approach

```tsx
import { useId } from 'react'

export function SkuLookupField({ label, value, onChange }: SkuLookupFieldProps) {
  const inputId = useId()

  return (
    <div className="sku-lookup-field">
      <label className="sku-lookup-field__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="sku-lookup-field__input"
        data-testid="sku-lookup-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
```

## Common mistakes

- Calling `useId()` conditionally or in a loop (must be top-level per render).
- Using `useId()` output as a CSS selector without escaping (ids may contain `:`).
- Adding `useState` for `value` when the parent already controls it.
