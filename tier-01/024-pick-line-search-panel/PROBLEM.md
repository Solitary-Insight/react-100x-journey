# Problem 024 — Pick line search panel (local query state)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 74 / 100 |
| **Concept** | Colocate search `query` state with the list; reuse derived filtering from Problem 023 |

## Scenario

Pickers need one panel: a **search box** and the **filtered pick lines** below. The parent only passes `lines`; the panel owns the draft query until the picker changes it.

## Requirements

Implement `PickLineSearchPanel` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type PickLine = {
     id: string
     label: string
   }

   export type PickLineSearchPanelProps = {
     lines: PickLine[]
   }
   ```

2. **State**

   - `const [query, setQuery] = useState('')` for the search draft.

3. **Filtering** (same rules as Problem 023)

   - `normalized = query.trim().toLowerCase()`
   - Empty normalized → all lines; else `label.toLowerCase().includes(normalized)`.
   - Derive during render — no extra state for filtered lines.

4. **Layout**

   - Root: `<section className="pick-line-search-panel" data-testid="pick-line-search-panel">`
   - Label + input:
     - `<label className="pick-line-search-panel__label" htmlFor="pick-line-search-input">Search pick lines</label>`
     - `<input id="pick-line-search-input" className="pick-line-search-panel__input" data-testid="pick-line-search-input" value={query} onChange={...} />`
   - List / empty (same structure and test ids as 023):
     - `pick-line-list`, `pick-line-${id}`, `pick-line-empty` with text `No matching pick lines`

5. Export `PickLineSearchPanel`, `PickLineSearchPanelProps`, and `PickLine`.

## Acceptance criteria

- Typing in the search input filters the list live.
- Clearing the input shows all lines again.
- No matches → empty message, no `<ul>`.
- `npm test` passes.

## Constraints

- No external UI libraries.
- Implement in this file only (do not import other problem folders).

## Hints

3 steps on request (−1 point each).
