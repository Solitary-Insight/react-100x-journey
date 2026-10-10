# Problem 030 — Pick list filter (`useTransition`)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 96 / 100 |
| **Concept** | **`useTransition`** — keep input snappy while expensive filter work is non-urgent |

## Scenario

A pick list has hundreds of lines. Filtering on every keystroke can jank the input. Keep **`query`** immediate; run the **filter** off a transitioned update and expose **`isPending`** while React finishes.

## Provided (do not edit)

| File | Role |
|------|------|
| `PickListView.tsx` | Input + pending status + list |
| `PickListPanel.tsx` | Wires view to your hook |
| `solution.tsx` | Re-export for tests |

## What you implement

Edit **`usePickListFilter.ts` only.**

1. **State**

   - `query` — immediate (controlled input).
   - Use **`useTransition`**: `const [isPending, startTransition] = useTransition()`.

2. **`onQueryChange`**

   - Update `query` **synchronously** (input must not lag).
   - Inside `startTransition`, update whatever drives the filtered list (e.g. `deferredQuery` state, or filter from `query` inside transition — see tests).

3. **Filtering**

   - Case-insensitive `label.includes(normalizedQuery)` where `normalizedQuery = query.trim().toLowerCase()`.
   - Empty normalized query → all `lines`.
   - `visibleLines` reflects the **transitioned** filter result (not an extra `useMemo` on the urgent path unless deps are correct).

4. **Return**

   ```ts
   { query, onQueryChange, visibleLines, isPending }
   ```

## Acceptance criteria

- `solution.test.tsx` passes.
- Input `value` matches typed text immediately.
- `isPending` can be `true` while filter catches up (asserted via mock slow filter in one test).

## Do not read `EXPLANATION.md` until after grading.

## Hints

3 steps on request (−1 point each).
