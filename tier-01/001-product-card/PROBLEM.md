# Problem 001 — Product listing card

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 5 / 100 |
| **Concept** | JSX, typed props, `children`, conditional rendering |

## Scenario

You are building the catalog grid for a B2B parts marketplace. Each cell is a **reusable card** that marketing can drop into list pages, carousels, and comparison tables. The card must stay dumb (presentational): it receives data via props and optionally renders action buttons supplied by the parent.

## Requirements

Implement `ProductCard` in `solution.tsx` (use `starter.tsx` as reference for types only—do not import from starter in tests).

1. **Props** (`ProductCardProps`):
   - `name` (string, required) — shown as the product title.
   - `sku` (string, required) — shown as secondary text, prefixed with `SKU:`.
   - `priceCents` (number, required) — display as USD with two decimals (e.g. `1299` → `$12.99`). Use `(priceCents / 100).toFixed(2)`; do not store formatted strings in props.
   - `inStock` (boolean, required) — when `false`, show an **“Out of stock”** badge; when `true`, show **“In stock”** with a distinct class `product-card__status--in-stock` for styling hooks.
   - `onSale` (optional boolean) — when `true`, show a **“Sale”** badge near the title.
   - `children` (optional `ReactNode`) — rendered in a footer region below the price (e.g. “Add to cart” buttons from the parent).

2. **Structure & semantics**
   - Root element: `<article className="product-card">`.
   - Title: `<h2 className="product-card__title">`.
   - SKU: `<p className="product-card__sku">`.
   - Price: `<p className="product-card__price">` with `data-testid="price"`.
   - Status badge: `<span className="product-card__status ...">`.
   - Sale badge (when applicable): `<span className="product-card__sale-badge">`.
   - Footer (only if `children` is provided): `<div className="product-card__footer">`.

3. **Export** the component and `ProductCardProps` type from `solution.tsx`.

## Acceptance criteria

- Renders name, SKU, and formatted price for a typical in-stock product.
- Shows correct stock and sale badges for all combinations of `inStock` and `onSale`.
- Renders `children` in the footer when passed; omits the footer entirely when `children` is absent.
- Tests in `solution.test.tsx` pass when run via `npm test`.

## Constraints

- Functional component only; no hooks required for this problem.
- No external UI libraries.
- Do not fetch data or use global state.

## Hints

Available on request in 3 steps (−1 rubric point each).
