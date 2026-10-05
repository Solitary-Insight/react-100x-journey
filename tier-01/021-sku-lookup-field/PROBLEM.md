# Problem 021 — SKU lookup field (`useId`)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 65 / 100 |
| **Concept** | `useId` for stable, unique `id` / `htmlFor` pairs in reusable fields |

## Scenario

Catalog search renders multiple **SKU lookup** fields on one page. Hard-coding `id="sku"` collides when the component is used twice. React’s `useId()` generates a unique id per instance for label association.

## Requirements

Implement `SkuLookupField` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type SkuLookupFieldProps = {
     label: string
     value: string
     onChange: (next: string) => void
   }
   ```

2. **Hooks**

   - `const inputId = useId()` — use for both `htmlFor` and input `id`.

3. **Layout**

   - Root: `<div className="sku-lookup-field">`
   - Label: `<label className="sku-lookup-field__label" htmlFor={inputId}>{label}</label>`
   - Input: `<input id={inputId} className="sku-lookup-field__input" data-testid="sku-lookup-input" value={value} onChange={...} />`

4. **Behavior**

   - Fully controlled from props — **no `useState`** for `value`.
   - `onChange` receives `event.target.value`.

5. Export `SkuLookupField` and `SkuLookupFieldProps`.

## Acceptance criteria

- Label associates with input (`getByLabelText` works).
- Two instances on one page both work (unique ids).
- `npm test` passes.

## Constraints

- No external UI libraries.

## Hints

3 steps on request (−1 point each).
