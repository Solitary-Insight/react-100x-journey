# Explanation — Problem 026: Inventory lookup race

## Concept

Async UI needs **request cancellation** when inputs change. `AbortController` + effect cleanup aborts in-flight work; **`AbortError`** must not surface as user-facing errors. Reset local draft state when `warehouseId` changes so parents do not show cross-warehouse results.

## Reference hook

See `useInventoryLookup.ts` in this folder after grading.

## Common mistakes

- Putting fetch logic in `InventoryLookupView` (presentational components stay dumb).
- `useEffect(() => onChange(''), [warehouseId])` without skipping mount when you only want prop-driven resets — here resetting on `warehouseId` change **including** remount is intended.
- Empty query sets `idle` but leaves stale `hits` on screen.
- Non-abort errors set `errorMessage` but forget `status: 'error'`.

## What production reviewers look for

- One effect owns fetch lifecycle (load → abort on deps change).
- No race between overlapping requests without abort or explicit request ids.
- Loading UI tied to the **current** request, not global mutexes unless measured need.
