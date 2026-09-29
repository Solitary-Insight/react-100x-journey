# Explanation — Problem 007: Shipping method summary

## Concept

**Derived UI** means values like shipping fee and order total are computed **during render** from a small amount of state (`method`) and props (`subtotalCents`). Event handlers only update the source of truth — they do not also `setState` for every displayed number.

## Why it matters

- Avoids sync bugs (total updated but fee forgotten).
- Keeps components easy to reason about: one state transition → one re-render → all dependent UI updates together.
- Matches how you will use `useMemo` later — but for this problem, plain `const` bindings are enough.

## Reference solution

```tsx
import { useState } from 'react'

const SHIPPING_CENTS: Record<ShippingMethod, number> = {
  standard: 599,
  express: 1499,
  pickup: 0,
}

const SHIPPING_ETA: Record<ShippingMethod, string> = {
  standard: '5–7 business days',
  express: '2 business days',
  pickup: 'Pick up today',
}

function formatDollars(cents: number): string {
  return (cents / 100).toFixed(2)
}

export function ShippingMethodSummary({ subtotalCents }: ShippingMethodSummaryProps) {
  const [method, setMethod] = useState<ShippingMethod>('standard')
  const shippingCents = SHIPPING_CENTS[method]
  const totalCents = subtotalCents + shippingCents
  // …radios + fee / eta / total lines using formatDollars
}
```

Key ideas:

- `useState<ShippingMethod>('standard')` only.
- `const shippingCents = SHIPPING_CENTS[method]` and `const totalCents = subtotalCents + shippingCents` in the component body.
- Radios are **controlled**: `checked={method === 'express'}` and `onChange` calls `setMethod`.

## Common mistakes

- Storing `totalCents` or `shippingCents` in `useState` and trying to keep them in sync in every handler.
- Using `useEffect` to recompute totals when `method` changes (unnecessary here).
- Formatting money inconsistently (always two decimal places for this spec).

## Tie-in to 006

Panel-owned state + presentational children (006) pairs with **one state knob + derived readouts** (007) — the pattern you will use for filters, tabs, and wizards throughout Tier 1.
