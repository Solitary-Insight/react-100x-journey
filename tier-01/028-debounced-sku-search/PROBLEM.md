# Problem 028 — Debounced value hook (`useEffect` + cleanup)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 93 / 100 |
| **Concept** | Custom **`useDebouncedValue`** — timer cleanup, flush on unmount, immediate sync when `delayMs` is 0 |

## Scenario

Catalog search should not hit the API on every keystroke. The parent keeps the **live** `query`; consumers read a **debounced** copy after `delayMs` of stability.

## Provided (do not edit)

| File | Role |
|------|------|
| `DebouncedSkuSearchView.tsx` | Input + “Debounced: …” readout |
| `DebouncedSkuSearch.tsx` | Local `query` state + your hook |
| `solution.tsx` | Re-export for tests |

## What you implement

Edit **`useDebouncedValue.ts` only.**

```ts
export function useDebouncedValue<T>(value: T, delayMs: number): T
```

### Rules

1. Return a debounced copy of `value` that updates **`delayMs` after `value` stops changing**.
2. Each time `value` or `delayMs` changes, **clear the pending timer** from the previous effect run (effect cleanup).
3. When **`delayMs === 0`**, return `value` immediately on every render (no timer).
4. On **unmount**, pending timers must not call `setState` (cleanup handles this).
5. When `value` changes, the returned debounced value must **not** jump to the new `value` until the delay elapses (except rule 3).

### Do not read `EXPLANATION.md` until after grading.

## Acceptance criteria

- `solution.test.tsx` passes (uses fake timers).
- Rapid typing yields one debounced update after the delay.
- Changing `delayMs` reschedules correctly.

## Hints

3 steps on request (−1 point each).
