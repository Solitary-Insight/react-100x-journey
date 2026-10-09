# Problem 023 — Pick line filter list (derived data)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 71 / 100 |
| **Concept** | Derive filtered collections during render — do not store filtered arrays in state |

## Scenario

Warehouse pickers search open **pick lines** while the parent owns the search query (controlled). The list panel should show only lines whose label matches the query (case-insensitive). When nothing matches, show an empty state.

## Requirements

Implement `PickLineFilterList` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type PickLine = {
     id: string
     label: string
   }

   export type PickLineFilterListProps = {
     lines: PickLine[]
     query: string
   }
   ```

2. **Filtering**

   - `const normalized = query.trim().toLowerCase()`
   - If `normalized` is empty, show **all** `lines`.
   - Otherwise include lines where `line.label.toLowerCase().includes(normalized)`.
   - Compute during render — **no `useState` / `useMemo` for the filtered list**.

3. **Layout**

   - Root: `<section className="pick-line-filter" data-testid="pick-line-filter">`
   - When filtered list is **non-empty**: `<ul className="pick-line-filter__list" data-testid="pick-line-list">` with `<li key={line.id} className="pick-line-filter__item" data-testid={`pick-line-${line.id}`}>{line.label}</li>` per line.
   - When filtered list is **empty**: `<p className="pick-line-filter__empty" data-testid="pick-line-empty">No matching pick lines</p>` (no `<ul>`).

4. Export `PickLineFilterList`, `PickLineFilterListProps`, and `PickLine`.

## Acceptance criteria

- Empty query shows every line.
- Query filters case-insensitively; whitespace-only query shows all.
- No matches → empty message, list not in document.
- `npm test` passes.

## Constraints

- No external UI libraries.

## Hints

3 steps on request (−1 point each).
