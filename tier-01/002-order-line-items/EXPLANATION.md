# Explanation — Problem 002: Order line items list

## Concept

Lists in React are **arrays mapped to elements**, each child needing a **stable `key`** (here `item.id`) so React can reconcile updates when rows are reordered, inserted, or removed. **Empty states** are a first-class branch: return different markup when `items.length === 0`, not an empty `<ul>`.

## Why it matters

- **Index keys** break when the list is sorted or filtered — always prefer server-provided ids.
- **Explicit empty UI** avoids “is this loading or truly empty?” confusion in ops tools.
- **Strict boolean checks** (`backordered === true`) avoid accidental badges if the API ever sends odd values.

## Reference solution

```tsx
export function OrderLineItems({ items }: OrderLineItemsProps) {
  if (items.length === 0) {
    return (
      <p className="order-lines__empty" data-testid="empty">
        No items in this order.
      </p>
    )
  }

  return (
    <ul className="order-lines">
      {items.map((item) => (
        <li className="order-lines__item" key={item.id}>
          <span className="order-lines__name">{item.name}</span>
          <span
            className="order-lines__qty"
            data-testid={`qty-${item.id}`}
          >
            Qty: {item.quantity}
          </span>
          {item.backordered === true ? (
            <span className="order-lines__badge">Backordered</span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
```

## What you did well

- Early return for empty state — no stray list markup.
- Correct `key={item.id}`, class names, and quantity `data-testid` pattern.
- Clean `.map()` structure; tests all green on first submit.

## What a reviewer would flag

- **Pasted spec comments** in `solution.tsx` — delete before PR; the spec lives in `PROBLEM.md`.
- **`item.backordered &&`** works for `false`/`undefined`, but **`=== true`** matches the written contract and guards against non-boolean API data.
- Prefer **`{ items }`** in the signature over `_props` + destructure (consistency with 001’s final style).

## Common mistakes

- Rendering `<ul>` with zero `<li>` instead of the empty paragraph.
- Using `key={index}` — fails when list order changes.
- Showing badge for any truthy value instead of explicit `true`.

## Read next

- [Rendering lists](https://react.dev/learn/rendering-lists)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
