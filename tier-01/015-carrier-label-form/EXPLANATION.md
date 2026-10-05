# Explanation — Problem 015: Carrier label form

## Concept

Problem 014 was **fully controlled** from the parent. Here the **form owns** the carrier draft in `useState` until the user clicks **Create label** — then you hand off the chosen code via `onCreateLabel`. Same select markup pattern, different state boundary.

## Reference approach

```tsx
import { useState } from 'react'

export function CarrierLabelForm({ onCreateLabel }: CarrierLabelFormProps) {
  const [carrier, setCarrier] = useState<CarrierCode>('ups')

  return (
    <section className="carrier-label-form" data-testid="carrier-label-form">
      <label className="carrier-label-form__label" htmlFor="label-carrier">Carrier</label>
      <select
        id="label-carrier"
        data-testid="label-carrier-select"
        value={carrier}
        onChange={(e) => setCarrier(e.target.value as CarrierCode)}
      >
        ...
      </select>
      <button type="button" data-testid="create-label-button" onClick={() => onCreateLabel(carrier)}>
        Create label
      </button>
    </section>
  )
}
```

## Common mistakes

- Calling `onCreateLabel` inside `onChange` (should only fire on button click).
- Using `type="submit"` without a form (use `type="button"`).
- Lifting carrier to parent when the spec keeps it local until create.
