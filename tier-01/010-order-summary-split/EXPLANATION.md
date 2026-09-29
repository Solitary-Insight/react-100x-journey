# Explanation — Problem 010: Order summary split

## Concept

**Composition** breaks a screen into focused components. The **container** (`OrderSummaryCard`) knows the full prop shape from the page; **presentational** children receive a narrow slice. That is intentional **prop drilling** at a small scale — fine until many layers need the same data (later: context).

## Why it matters

- Matches how design systems ship `Card`, `CardHeader`, `CardFooter`.
- Keeps money formatting and total math in one place (`OrderSummaryTotals`).
- Tests can target header and totals in isolation.

## Reference approach

```tsx
function formatDollars(cents: number): string {
  return (cents / 100).toFixed(2)
}

export function OrderSummaryTotals({ subtotalCents, taxCents }: OrderSummaryTotalsProps) {
  const totalCents = subtotalCents + taxCents
  return (
    <footer className="order-summary__totals">
      <p data-testid="subtotal">Subtotal: ${formatDollars(subtotalCents)}</p>
      ...
    </footer>
  )
}

export function OrderSummaryCard(props: OrderSummaryCardProps) {
  const { orderId, customerName, subtotalCents, taxCents } = props
  return (
    <article className="order-summary" data-testid="order-summary">
      <OrderSummaryHeader orderId={orderId} customerName={customerName} />
      <OrderSummaryTotals subtotalCents={subtotalCents} taxCents={taxCents} />
    </article>
  )
}
```

Share `formatDollars` in the same file (or duplicate minimally) — no hooks required.

## Common mistakes

- Putting `useState` for `totalCents` in totals (derive instead).
- Hard-coding money in the card instead of passing cents into `OrderSummaryTotals`.
- Skipping exports so tests cannot import children directly.
