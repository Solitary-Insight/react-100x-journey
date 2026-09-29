# Explanation — Problem 009: Stock alert list

## Concept

Pass **data down** as props, **map** to list rows with stable `key={alert.id}`, and **derive** the footer total with `reduce` (or a loop) in the render body — same idea as Problem 007’s shipping math, applied to arrays.

## Why it matters

- Real dashboards constantly combine list rendering with rollups (counts, sums, “all clear” states).
- Stable keys keep React reconciliation predictable when rows are inserted or reordered upstream.
- Empty vs non-empty branches avoid shipping meaningless totals when there is nothing to sum.

## Reference approach

```tsx
export function StockAlertList({ alerts }: StockAlertListProps) {
  const totalUnits = alerts.reduce((sum, alert) => sum + alert.units, 0)

  return (
    <section className="stock-alerts" data-testid="stock-alert-list">
      <h2 className="stock-alerts__title">Stock alerts</h2>
      {alerts.length === 0 ? (
        <p className="stock-alerts__empty" data-testid="stock-alerts-empty">
          No stock alerts.
        </p>
      ) : (
        <>
          <ul className="stock-alerts__list">
            {alerts.map((alert) => (
              <li className="stock-alerts__item" key={alert.id}>
                ...
              </li>
            ))}
          </ul>
          <p className="stock-alerts__total" data-testid="total-units">
            Total units at risk: {totalUnits}
          </p>
        </>
      )}
    </section>
  )
}
```

## Common mistakes

- Using array index as `key` when `id` is available (Problem 002 pattern).
- Storing `totalUnits` in `useState` and syncing in `useEffect`.
- Rendering the total when the list is empty.
- Showing the Critical badge for truthy values other than strict `true`.
