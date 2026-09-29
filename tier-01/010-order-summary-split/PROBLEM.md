# Problem 010 — Order summary split (composition)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 32 / 100 |
| **Concept** | Split UI into small presentational components; parent passes props (no new state) |

## Scenario

Order detail sidebar shows a compact **summary card**. The page already has `orderId`, `customerName`, and money fields from the API. Implement one **container** that composes two **dumb** children — header and totals — each receiving only the props they need.

## Requirements

Implement in `solution.tsx`:

1. **Types** (export all):

   ```ts
   export type OrderSummaryHeaderProps = {
     orderId: string
     customerName: string
   }

   export type OrderSummaryTotalsProps = {
     subtotalCents: number
     taxCents: number
   }

   export type OrderSummaryCardProps = {
     orderId: string
     customerName: string
     subtotalCents: number
     taxCents: number
   }
   ```

2. **`OrderSummaryHeader`** (export) — presentational only, **no hooks**:

   - Root: `<header className="order-summary__header">`
   - Title: `<h2 className="order-summary__order-id" data-testid="order-id">Order {orderId}</h2>`
   - Customer: `<p className="order-summary__customer" data-testid="customer-name">{customerName}</p>`

3. **`OrderSummaryTotals`** (export) — presentational only, **no hooks**:

   - Root: `<footer className="order-summary__totals">`
   - Derive `totalCents = subtotalCents + taxCents` during render (do not store in `useState`).
   - Subtotal line: `<p className="order-summary__line" data-testid="subtotal">Subtotal: ${formatted}</p>`
   - Tax line: `<p className="order-summary__line" data-testid="tax">Tax: ${formatted}</p>`
   - Total line: `<p className="order-summary__line order-summary__line--total" data-testid="grand-total">Total: ${formatted}</p>`
   - Use `(cents / 100).toFixed(2)` for all three formatted amounts.

4. **`OrderSummaryCard`** (export) — composes the children:

   - Root: `<article className="order-summary" data-testid="order-summary">`
   - Renders `OrderSummaryHeader` with `orderId` and `customerName` from card props.
   - Renders `OrderSummaryTotals` with `subtotalCents` and `taxCents` from card props.
   - **No `useState`** in any of the three components.

5. Export all components and prop types listed above.

## Acceptance criteria

- Card shell renders header + totals with correct copy and test ids.
- Money lines use two decimal places.
- Grand total equals subtotal + tax cents.
- Header and totals remain reusable (props-only).
- `npm test` passes.

## Constraints

- No hooks in this problem.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
