# Problem 025 — Pick line select list (controlled selection)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 77 / 100 |
| **Concept** | Selection owned by parent; child reports clicks via callback; `aria-pressed` on toggle buttons |

## Scenario

After filtering, the picker **chooses one open line** to start a pick. The parent stores `selectedId`; this list renders each line as a button and highlights the current choice.

## Requirements

Implement `PickLineSelectList` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type PickLine = {
     id: string
     label: string
   }

   export type PickLineSelectListProps = {
     lines: PickLine[]
     selectedId: string | null
     onSelect: (id: string) => void
   }
   ```

2. **Layout**

   - Root: `<ul className="pick-line-select" data-testid="pick-line-select-list">`
   - Each line: `<li key={line.id} className="pick-line-select__item">` containing:
     - `<button type="button" className="pick-line-select__button" data-testid={`pick-line-select-${line.id}`} aria-pressed={selectedId === line.id} onClick={() => onSelect(line.id)}>{line.label}</button>`

3. **Behavior**

   - No local selection state — `selectedId` comes from props only.
   - Clicking a button calls `onSelect` with that line’s `id`.
   - When `lines` is empty, render the root `<ul>` with **no** `<li>` children (tests use empty array).

4. Export `PickLineSelectList`, `PickLineSelectListProps`, and `PickLine`.

## Acceptance criteria

- Buttons show line labels; exactly one has `aria-pressed="true"` when `selectedId` matches.
- Click invokes `onSelect` with the correct id.
- `npm test` passes.

## Constraints

- No external UI libraries.

## Hints

3 steps on request (−1 point each).
