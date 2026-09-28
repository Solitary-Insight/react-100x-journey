# Problem 004 — Cart quantity stepper

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 14 / 100 |
| **Concept** | Controlled values, event handlers, disabled UI, accessible buttons |

## Scenario

Checkout uses a **quantity stepper** on each line item. The cart page owns the numeric quantity in state; the stepper is a controlled widget that requests changes via callbacks— it never keeps its own copy of `value`.

## Requirements

Implement `QuantityStepper` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type QuantityStepperProps = {
     value: number
     min: number
     max: number
     onChange: (next: number) => void
   }
   ```

2. **Layout**

   - Root: `<div className="quantity-stepper" data-testid="quantity-stepper">`
   - Decrease: `<button type="button" className="quantity-stepper__btn quantity-stepper__btn--decrease" aria-label="Decrease quantity">−</button>` (unicode minus U+2212 is fine, or `-`)
   - Value: `<span className="quantity-stepper__value" data-testid="quantity-value">{value}</span>`
   - Increase: `<button type="button" className="quantity-stepper__btn quantity-stepper__btn--increase" aria-label="Increase quantity">+</button>`

3. **Behavior**

   - Display `value` from props (do not store quantity in `useState` for this problem).
   - On decrease click: call `onChange(value - 1)` **only if** `value > min`.
   - On increase click: call `onChange(value + 1)` **only if** `value < max`.
   - Decrease button is `disabled` when `value <= min`.
   - Increase button is `disabled` when `value >= max`.

4. Export `QuantityStepper` and `QuantityStepperProps`.

## Acceptance criteria

- Renders current `value` between two buttons.
- Disabled states match min/max boundaries.
- Clicks invoke `onChange` with the correct next integer; no call when disabled.
- Accessible names on both buttons.
- `npm test` passes.

## Constraints

- Functional component; **no `useState` for `value`** (controlled-only).
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
