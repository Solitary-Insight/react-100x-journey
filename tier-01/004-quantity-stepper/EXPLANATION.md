# Explanation — Problem 004: Cart quantity stepper

## Concept

A **controlled component** displays `value` from the parent and reports intent via `onChange(next)`. The stepper does not own quantity state—checkout/cart state does—so multiple line items stay in sync with server totals and promos.

## Why it matters

- **Single source of truth** prevents desync between displayed qty and API payload.
- **`disabled` at bounds** is both UX and guard: browsers won’t fire `click` on disabled buttons (what your tests assert).
- **Named buttons** (`aria-label`) let screen reader users adjust quantity without guessing “−” / “+”.

## Reference solution

```tsx
export function QuantityStepper({
  value,
  min,
  max,
  onChange,
}: QuantityStepperProps) {
  const canDecrease = value > min
  const canIncrease = value < max

  return (
    <div className="quantity-stepper" data-testid="quantity-stepper">
      <button
        type="button"
        className="quantity-stepper__btn quantity-stepper__btn--decrease"
        aria-label="Decrease quantity"
        disabled={!canDecrease}
        onClick={() => canDecrease && onChange(value - 1)}
      >
        −
      </button>
      <span className="quantity-stepper__value" data-testid="quantity-value">
        {value}
      </span>
      <button
        type="button"
        className="quantity-stepper__btn quantity-stepper__btn--increase"
        aria-label="Increase quantity"
        disabled={!canIncrease}
        onClick={() => canIncrease && onChange(value + 1)}
      >
        +
      </button>
    </div>
  )
}
```

Handlers can double-guard (`canDecrease &&`) even when `disabled`—useful if the button is ever enabled via CSS override.

## What you did well

- Fully controlled — no local `useState`.
- Correct `disabled` rules and `onChange` payloads.
- All class names and a11y labels match the contract.

## Reviewer nits

- Drop `import React from 'react'` — Vite + React 17+ JSX transform does not need it.
- Put imports at the top; remove empty comment blocks.
- Formatting (spaces in `{value,min,max}`) — run formatter before PR.

## Read next

- [Sharing state between components (lifting state up)](https://react.dev/learn/sharing-state-between-components)
- [Controlled components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
