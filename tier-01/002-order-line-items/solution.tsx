export type LineItem = {
  id: string
  name: string
  quantity: number
  backordered?: boolean
}

export type OrderLineItemsProps = {
  items: LineItem[]
}

// Inside each row:
// - Name: `<span className="order-lines__name">{item.name}</span>`
// - Quantity: `<span className="order-lines__qty" data-testid={\`qty-${item.id}\`}>Qty: {item.quantity}</span>`
// - If `item.backordered === true`, render `<span className="order-lines__badge">Backordered</span>` inside that `<li>`.
// - If `backordered` is omitted or `false`, do not render the badge.

// 4. Export `OrderLineItems`, `LineItem`, and `OrderLineItemsProps`.


/**
 * Problem 002 — implement OrderLineItems here.
 * Say "done" when ready for grading.
 */
export function OrderLineItems(_props: OrderLineItemsProps) {
  const { items } = _props
  if (items.length === 0) {
    return <p className="order-lines__empty" data-testid="empty">No items in this order.</p>
  }

  return (
    <ul className="order-lines">
      {items.map((item) => (
        <li className="order-lines__item" key={item.id}>
          <span className="order-lines__name">{item.name}</span>
          <span className="order-lines__qty" data-testid={`qty-${item.id}`}>Qty: {item.quantity}</span>
          {item.backordered && <span className="order-lines__badge">Backordered</span>}
        </li>
      ))}
    </ul>
  )
}
