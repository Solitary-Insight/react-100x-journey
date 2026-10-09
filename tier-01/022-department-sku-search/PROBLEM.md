# Problem 022 — Department SKU search (reset on context change)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 68 / 100 |
| **Concept** | `useEffect` to reset controlled input when a filter context (`departmentId`) changes |

## Scenario

Catalog admins search SKUs within a **department**. When the user switches department in a parent dropdown, the search box must **clear** so results from the previous department are not submitted. The field stays **controlled** from the parent (`value` / `onChange`).

## Requirements

Implement `DepartmentSkuSearch` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type DepartmentSkuSearchProps = {
     departmentId: string
     label: string
     value: string
     onChange: (next: string) => void
   }
   ```

2. **Hooks**

   - `useId()` for `id` / `htmlFor` on the search input.
   - `useEffect` with `[departmentId]` (and stable deps as needed): when `departmentId` **changes after the first mount**, call `onChange('')`.
   - **Do not** call `onChange` on the initial mount.

3. **Layout**

   - Root: `<div className="department-sku-search" data-testid="department-sku-search">`
   - Label: `<label className="department-sku-search__label" htmlFor={inputId}>{label}</label>`
   - Input: `<input id={inputId} className="department-sku-search__input" data-testid="department-sku-search-input" value={value} onChange={...} />`

4. **Behavior**

   - Fully controlled — no `useState` for `value`.
   - `onChange` receives `event.target.value` from typing.

5. Export `DepartmentSkuSearch` and `DepartmentSkuSearchProps`.

## Acceptance criteria

- Label associates with input.
- Initial render with a non-empty `value` does not invoke `onChange`.
- After `departmentId` changes (re-render with new id), `onChange('')` runs once.
- Typing still updates via `onChange`.
- `npm test` passes.

## Constraints

- No external UI libraries.

## Hints

3 steps on request (−1 point each).
