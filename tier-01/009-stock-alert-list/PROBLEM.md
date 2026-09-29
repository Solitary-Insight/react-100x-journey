# Problem 009 — Stock alert list (lists + derived summary)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 29 / 100 |
| **Concept** | Render lists with stable `key`; derive aggregate UI from props (no extra state) |

## Scenario

Inventory ops views **stock alerts** for a warehouse lane. The parent fetches `alerts` from the API and passes them down. Your component renders each SKU row and a **footer total** of units at risk across all alerts — computed from the same array, not stored separately.

## Requirements

Implement `StockAlertList` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type StockAlert = {
     id: string
     sku: string
     units: number
     critical?: boolean
   }

   export type StockAlertListProps = {
     alerts: StockAlert[]
   }
   ```

2. **Shell** (always render)

   - Root: `<section className="stock-alerts" data-testid="stock-alert-list">`
   - Title: `<h2 className="stock-alerts__title">Stock alerts</h2>`

3. **Empty state** — when `alerts.length === 0`:

   - Only add: `<p className="stock-alerts__empty" data-testid="stock-alerts-empty">No stock alerts.</p>`
   - Do **not** render `<ul>` or the total footer.

4. **List** — when `alerts.length > 0`:

   - `<ul className="stock-alerts__list">`
   - Each alert: `<li className="stock-alerts__item" key={alert.id}>`
     - SKU: `<span className="stock-alerts__sku">{alert.sku}</span>`
     - Units: `<span className="stock-alerts__units" data-testid={\`alert-units-${alert.id}\`}>{alert.units} left</span>`
     - If `alert.critical === true`, render `<span className="stock-alerts__badge">Critical</span>` inside that `<li>`.
     - If `critical` is omitted or `false`, no badge.
   - After the `</ul>`, footer: `<p className="stock-alerts__total" data-testid="total-units">Total units at risk: {total}</p>` where `total` is the **sum** of `units` across all alerts (derive during render).

5. Export `StockAlertList`, `StockAlert`, and `StockAlertListProps`.

## Acceptance criteria

- Empty array shows only the empty message; no list or total.
- Rows preserve API order; keys use `alert.id`.
- Footer total matches the sum of row units.
- Critical badge only when `critical === true`.
- `npm test` passes.

## Constraints

- Functional component; **no hooks** required.
- Do not mutate `alerts`; do not sort or filter.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
