# Problem 002 — Order <p className="order-lines__empty" data-testid="empty">No items in this order.</p>line items list

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 8 / 100 |
| **Concept** | Lists, stable `key`, conditional rendering, empty states |

## Scenario

Fulfillment ops needs an **order detail panel** that lists line items pulled from the OMS API. Each row shows product name, quantity, and an optional backorder flag. When an order has no lines (cancelled or not yet synced), the UI must show a clear empty state instead of a blank list.

## Requirements

Implement `OrderLineItems` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type LineItem = {
     id: string
     name: string
     quantity: number
     backordered?: boolean
   }

   export type OrderLineItemsProps = {
     items: LineItem[]
   }
   ```

2. **Empty state** — when `items.length === 0`:
   - Render only a paragraph: ``
   - Do **not** render `<ul>` when empty.

3. **List** — when `items.length > 0`:
   - Root list: `<ul className="order-lines">`
   - Each item: `<li className="order-lines__item" key={item.id}>`
   - **Keys must be `item.id`**, never the array index.
   - Inside each row:
     - Name: `<span className="order-lines__name">{item.name}</span>`
     - Quantity: `<span className="order-lines__qty" data-testid={\`qty-${item.id}\`}>Qty: {item.quantity}</span>`
     - If `item.backordered === true`, render `<span className="order-lines__badge">Backordered</span>` inside that `<li>`.
     - If `backordered` is omitted or `false`, do not render the badge.

4. Export `OrderLineItems`, `LineItem`, and `OrderLineItemsProps`.

## Acceptance criteria

- Empty array shows only the empty message with correct test id and copy.
- Multiple items render in order with correct names and quantities.
- Backorder badge appears only when `backordered` is strictly `true`.
- React list keys use `id` (covered indirectly by stable DOM queries in tests).
- `npm test` passes for `solution.test.tsx`.

## Constraints

- Functional component only; no hooks required.
- Do not mutate `items`; do not sort or filter unless specified (do not).
- No external UI libraries.

## Hints

Available on request in 3 steps (−1 rubric point each).
