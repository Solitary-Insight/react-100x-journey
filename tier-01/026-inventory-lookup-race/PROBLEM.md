# Problem 026 — Inventory lookup race (`AbortController`)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 88 / 100 |
| **Concept** | Async search with **abort/cleanup**, ignore stale responses, loading/error UI states |

## Scenario

Ops searches SKUs per **warehouse**. Network calls are slow; typing fast or switching warehouse must **not** flash results from an outdated query.

## Provided for you (do not edit)

| File | Role |
|------|------|
| `InventoryLookupView.tsx` | All HTML / form controls |
| `InventoryLookup.tsx` | Wires the view to your hook |
| `skuSearchApi.ts` | Fake network + test overrides |
| `solution.tsx` | Re-exports the container for tests |

## What you implement

Edit **`useInventoryLookup.ts` only.**

1. **Signature** (keep exports as-is):

   ```ts
   export function useInventoryLookup(params: UseInventoryLookupParams): UseInventoryLookupResult
   ```

2. **Local state**

   - `query` string.
   - `status`: `'idle' | 'loading' | 'success' | 'error'`.
   - `hits: SkuHit[]`.
   - `errorMessage: string | null`.

3. **Fetch rules** (use `searchSkus` from `./skuSearchApi`)

   - When `query.trim()` is empty → `status = 'idle'`, `hits = []`, **no request**.
   - When there is a trimmed query → run search inside `useEffect` with **`AbortController`**; abort on cleanup when `warehouseId` or `query` changes.
   - While a request is in flight for the current effect run → `loading`.
   - On success → `success` + `hits` from the API.
   - On failure → if `AbortError`, **do nothing** (stale request). Any other error → `error` with message `Search failed`.
   - When **`warehouseId` prop changes** → reset `query` to `''` and return UI to `idle`.

4. **Handlers**

   - `onQueryChange` updates `query`.
   - `onWarehouseChange` forwards to `params.onWarehouseChange` (parent updates `warehouseId`).

5. **Do not read** `EXPLANATION.md` until after grading.

## Acceptance criteria

- Tests pass (`solution.test.tsx`).
- No stale `hits` after a newer query wins the race.
- Warehouse change clears the search and old results.

## Constraints

- No external data libraries (no React Query for this problem).
- Abort via `AbortController` + effect cleanup.

## Hints

3 steps on request (−1 point each).
