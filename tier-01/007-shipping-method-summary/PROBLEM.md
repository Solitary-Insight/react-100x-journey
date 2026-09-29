# Problem 007 — Shipping method summary (derived UI)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 23 / 100 |
| **Concept** | Event handlers update source state; fees and totals are **derived during render** (no extra `useState` for them) |

## Scenario

Checkout shows **shipping options** as a radio group. The cart already knows the merchandise **subtotal** (prop). When the shopper picks a method, only the **selected method** lives in React state; shipping fee, ETA copy, and order total are computed from `subtotalCents` + the current method.

## Requirements

Implement `ShippingMethodSummary` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type ShippingMethod = 'standard' | 'express' | 'pickup'

   export type ShippingMethodSummaryProps = {
     subtotalCents: number
   }
   ```

2. **Rates** (use these exact values in your component — constants or a map is fine):

   | Method | `shippingCents` | ETA copy (`data-testid="shipping-eta"`) |
   |--------|-----------------|----------------------------------------|
   | `standard` | `599` | `5–7 business days` |
   | `express` | `1499` | `2 business days` |
   | `pickup` | `0` | `Pick up today` |

3. **Layout**

   - Root: `<section className="shipping-method-summary" data-testid="shipping-method-summary">`
   - `<fieldset className="shipping-method-summary__fieldset">` with `<legend className="shipping-method-summary__legend">Shipping method</legend>`
   - Three **radio** inputs, `name="shipping-method"`, each in a `<label className="shipping-method-summary__option">`:
     - `value="standard"` — visible label text `Standard`
     - `value="express"` — `Express`
     - `value="pickup"` — `Store pickup`
   - Fee line: `<p className="shipping-method-summary__fee" data-testid="shipping-fee">Shipping: ${formatted}</p>` where `formatted` is dollars with **two decimals** (e.g. `5.99` for 599 cents).
   - ETA: `<p className="shipping-method-summary__eta" data-testid="shipping-eta">…</p>` (exact strings from the table).
   - Total: `<p className="shipping-method-summary__total" data-testid="order-total">Total: ${formatted}</p>` where total cents = `subtotalCents + shippingCents` for the selected method.

4. **Behavior**

   - Initial selection: `standard`.
   - Changing radios updates selection via `onChange` (controlled `checked` from state).
   - **Do not** store `shippingCents` or order total in `useState` — derive them from `method` and `subtotalCents` when rendering.
   - Money helper: `(cents / 100).toFixed(2)` is enough for this problem.

5. Export `ShippingMethodSummary`, `ShippingMethodSummaryProps`, and `ShippingMethod`.

## Acceptance criteria

- Default view shows Standard fee, ETA, and total = subtotal + 599 cents.
- Selecting Express or Pickup updates fee, ETA, and total without stale values.
- Radios are a single group (`name="shipping-method"`).
- `npm test` passes.

## Constraints

- One piece of UI state: selected `ShippingMethod` (plus props).
- No `useEffect` for totals or fees.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
