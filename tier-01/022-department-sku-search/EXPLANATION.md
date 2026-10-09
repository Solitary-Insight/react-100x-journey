# Explanation — Problem 022: Department SKU search

## Concept

When a **filter context** changes (here `departmentId`), dependent UI state in the parent (search text) is often stale. A small `useEffect` can notify the parent to reset. Skip the **initial mount** so you do not wipe a hydrated or prefilled value.

## Reference approach

```tsx
import { useEffect, useId, useRef } from 'react'

export function DepartmentSkuSearch({
  departmentId,
  label,
  value,
  onChange,
}: DepartmentSkuSearchProps) {
  const inputId = useId()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onChange('')
  }, [departmentId, onChange])

  return (
    <div className="department-sku-search" data-testid="department-sku-search">
      <label className="department-sku-search__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="department-sku-search__input"
        data-testid="department-sku-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
```

## Common mistakes

- `useEffect(() => onChange(''), [departmentId])` with no guard — clears on mount.
- Storing `value` locally while also resetting from props — keep one source of truth (controlled).
- Missing `onChange` in the dependency array when your lint rules require it.
