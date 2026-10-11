# Problem 032 — Composed SKU lookup (debounce + abort fetch)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 98 / 100 |
| **Concept** | **Compose** patterns from 028 + 026: debounced query → fetch with `AbortController` |

## Scenario

Same as inventory lookup, but you **own one hook** that chains **debounce** then **search**. UI is provided.

## Provided (do not edit)

`ComposedSkuLookupView.tsx`, `ComposedSkuLookupPanel.tsx`, `skuLookupApi.ts`, `solution.tsx`

## What you implement

Edit **`useComposedSkuLookup.ts` only.**

1. State: `warehouseId` (default `'east'`), live `query`, `status`, `hits`, `errorMessage`.

2. **Debounce** `query` by **200ms** (implement inline or reuse your 028 pattern).

3. **`useEffect`** when `debouncedQuery` or `warehouseId` changes:

   - Empty trimmed debounced query → `idle`, `hits = []`, no fetch.
   - Else abort prior request, `loading`, `searchSkus(warehouseId, debouncedQuery, signal)`.
   - `AbortError` → ignore; other errors → `error` + message `Search failed`.
   - Success → `success` + `hits`.

4. **`setWarehouseId`**: update id, clear `query`, reset to `idle` / empty hits.

5. **`setQuery`**: update live query only (debounce handles fetch).

## Acceptance criteria

`solution.test.tsx` passes.

## Do not read `EXPLANATION.md` until grading.
