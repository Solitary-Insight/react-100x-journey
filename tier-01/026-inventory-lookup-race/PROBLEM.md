# Problem 026 — Inventory lookup race (`AbortController`)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 88 / 100 |
| **Concept** | Async search with **abort/cleanup**, ignore stale responses, loading/error UI states |

## Scenario

Ops searches SKUs per **warehouse**. Network calls are slow; typing fast or switching warehouse must **not** flash results from an outdated query. You own React state/effects only — markup lives in `InventoryLookupView.tsx`.

## What you implement

Edit **`solution.tsx` only** (unless you extract a custom hook in the same file).

1. **Exports**

   ```ts
   export type InventoryLookupProps = {
     warehouseId: string
     warehouses: WarehouseOption[]  // from InventoryLookupView
     onWarehouseChange: (nextWarehouseId: string) => void
   }

   export function InventoryLookup(props: InventoryLookupProps): React.ReactElement
   ```

2. **Local state**

   - `query` string (draft in the input).
   - `status`: `'idle' | 'loading' | 'success' | 'error'`.
   - `hits: SkuHit[]`.
   - `errorMessage: string | null`.

3. **Fetch rules** (use `searchSkus` from `./skuSearchApi`)

   - When `query.trim()` is empty → `status = 'idle'`, `hits = []`, **no request**.
   - When there is a trimmed query → run search inside `useEffect` with **`AbortController`**; abort on cleanup when `warehouseId` or `query` changes.
   - While a request is in flight for the current effect run → `loading`.
   - On success → `success` + `hits` from the API.
   - On failure → if `AbortError`, **do nothing** (stale request). Any other error → `error` with message `Search failed`.
   - When **`warehouseId` prop changes** → reset `query` to `''` and return UI to `idle` (same behavior as switching warehouse in the view).

4. **UI**

   - Render `<InventoryLookupView />` with handlers; **do not** hand-write duplicate markup.

5. **Do not read** `EXPLANATION.md` until after grading.

## Acceptance criteria

- Tests pass (`solution.test.tsx`).
- No `hits` from a **previous** query after the user types a newer query (race test).
- Warehouse change clears the search and does not leave old results on screen.

## Constraints

- No external data libraries (no React Query for this problem).
- Abort via `AbortController` + effect cleanup (not a manual “request id” counter unless you also abort).

## Hints

3 steps on request (−1 point each).
