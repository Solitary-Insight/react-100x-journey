# Explanation — Problem 014: Carrier select field

## Concept

A **controlled select** mirrors Problem 005’s text field: the parent owns `value`, the child renders `value={value}` and forwards changes via `onChange`. Use a string union (`CarrierCode`) so only valid carriers compile.

## Reference approach

```tsx
export function CarrierSelectField({ id, label, value, onChange }: CarrierSelectFieldProps) {
  return (
    <div className="carrier-select-field">
      <label className="carrier-select-field__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="carrier-select-field__select"
        data-testid="carrier-select"
        value={value}
        onChange={(e) => onChange(e.target.value as CarrierCode)}
      >
        <option value="ups">UPS</option>
        <option value="fedex">FedEx</option>
        <option value="dhl">DHL</option>
      </select>
    </div>
  )
}
```

## Common mistakes

- Storing carrier in local `useState` while also receiving `value` from props (split source of truth).
- Wrong option `value` strings (`UPS` vs `ups`).
- Forgetting `htmlFor` / `id` link.
