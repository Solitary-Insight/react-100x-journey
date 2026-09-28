# Explanation — Problem 001: Product listing card

## Concept

Presentational components receive **data and slots via props** and render predictable markup. In production, stable **class names** (often BEM) and **composition via `children`** let design systems theme cards and let parents inject actions without the card knowing about cart logic.

## Why it matters

- **Contract-driven UI**: Tests and Figma specs agree on class names and copy (`Sale`, not `On sale`) so CSS and QA do not drift.
- **`children` as a slot**: The card stays reusable; the parent owns buttons, links, and permissions.
- **Format at render time**: Keep `priceCents` as a number; format in JSX so sorting/filtering stays correct upstream.

## Reference solution

```tsx
import type { ReactNode } from 'react'

export type ProductCardProps = {
  name: string
  sku: string
  priceCents: number
  inStock: boolean
  onSale?: boolean
  children?: ReactNode
}

export function ProductCard({
  name,
  sku,
  priceCents,
  inStock,
  onSale,
  children,
}: ProductCardProps) {
  const price = (priceCents / 100).toFixed(2)
  const statusClassName = inStock
    ? 'product-card__status product-card__status--in-stock'
    : 'product-card__status'

  return (
    <article className="product-card">
      <h2 className="product-card__title">{name}</h2>
      {onSale ? <span className="product-card__sale-badge">Sale</span> : null}
      <p className="product-card__sku">SKU: {sku}</p>
      <p className="product-card__price" data-testid="price">${price}</p>
      <span className={statusClassName}>
        {inStock ? 'In stock' : 'Out of stock'}
      </span>
      {children != null ? (
        <div className="product-card__footer">{children}</div>
      ) : null}
    </article>
  )
}
```

**Syntax notes**

- **Destructuring** in the parameter list keeps JSX readable vs `_props.name`.
- **Template for classes**: concatenate base + modifier only when `inStock` is true.
- **`children != null`**: Renders footer when children exist; omits footer for `undefined` (and avoids empty footer for `null`).
- **`<span>` for badges**: Inline status/sale chips; title stays in `<h2>`.

## What you did well

- Correct root `<article>`, SKU prefix, price math, and stock ternary.
- Optional sale via `{_props.onSale && ...}` — right idea for conditional UI.
- Exported `ProductCardProps` — good TypeScript habit.

## What a reviewer would flag

| Gap | Your code | Spec / tests |
|-----|-----------|----------------|
| Title class | `product-card__name` | `product-card__title` |
| Status element + modifier | `<p className="product-card__status">` only | `<span>` + `--in-stock` when in stock |
| Sale copy + class | `On sale` / `product-card__sale` | `Sale` / `product-card__sale-badge` |
| Composition | `children` not rendered | Footer wrapper when children provided |

Running `npm test` before **done** catches contract mismatches early — treat tests as the acceptance checklist.

## Common mistakes

- Inventing class names instead of reading the problem (breaks design system).
- Using `<p>` for every text node (badges are usually inline `<span>`).
- Forgetting `children` on “dumb” components that need action slots.

## Class component equivalent

Same render output; `this.props.children` replaces `children` prop. No lifecycle needed.

## Attempt 3 — what “2 failing tests” meant

If `npm test` showed failures on **“In stock”** (multiple elements) or **Sale** still in the document after `onSale` was omitted, your component was often already correct. Vitest was not clearing the DOM between tests until `cleanup()` was added in `src/test/setup.ts`. Re-run the full file after that change.

## Re-grade checklist (attempt 2)

If tests still fail, verify these one-liners against `PROBLEM.md`:

| Check | Wrong (common) | Right |
|-------|----------------|-------|
| Title class | `product-card__name` | `product-card__title` |
| In-stock modifier | on `<article>` | on `<span className="product-card__status product-card__status--in-stock">` |
| Sale | `On sale` / `product-card__sale` | `Sale` / `product-card__sale-badge` |
| Children | `{children}` bare | `{children != null ? <div className="product-card__footer">{children}</div> : null}` |

## Read next

- [Passing JSX as children](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [Conditional rendering](https://react.dev/learn/conditional-rendering)
