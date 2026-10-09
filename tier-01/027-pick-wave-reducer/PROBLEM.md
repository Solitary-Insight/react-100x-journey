# Problem 027 — Pick wave reducer (`useReducer` state machine)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 91 / 100 |
| **Concept** | **`useReducer`** for a finite state machine; illegal transitions are no-ops |

## Scenario

A **pick wave** moves through `idle` → `picking` ↔ `paused` → `complete`. Pickers scan units until `pickedCount` reaches `targetCount`. Buttons are enabled/disabled from derived `can*` flags — the view is already built.

## Provided (do not edit)

| File | Role |
|------|------|
| `PickWaveView.tsx` | Buttons + status text |
| `PickWavePanel.tsx` | Wires view to your hook |
| `solution.tsx` | Re-export for tests |

## What you implement

Edit **`usePickWave.ts` only.** Use **`useReducer`** (not multiple `useState` flags for status).

### State shape

```ts
{ status: 'idle' | 'picking' | 'paused' | 'complete'; pickedCount: number }
```

### Actions (define a discriminated union)

| Action | When allowed | Effect |
|--------|----------------|--------|
| `START` | `idle` | `status → picking`, `pickedCount` stays `0` |
| `PICK_UNIT` | `picking` and `pickedCount < targetCount` | `pickedCount + 1`; if now `>= targetCount`, `status → complete` |
| `PAUSE` | `picking` | `status → paused` |
| `RESUME` | `paused` | `status → picking` |
| `COMPLETE` | `picking` and `pickedCount >= targetCount` | `status → complete` |
| `RESET` | any | `idle`, `pickedCount → 0` |

Illegal actions: **return previous state** (no throws).

### `can*` flags (derive from state + `targetCount`)

| Flag | Meaning |
|------|---------|
| `canStart` | `status === 'idle'` |
| `canPick` | `status === 'picking'` and `pickedCount < targetCount` |
| `canPause` | `status === 'picking'` |
| `canResume` | `status === 'paused'` |
| `canComplete` | `status === 'picking'` and `pickedCount >= targetCount` |
| `canReset` | always `true` |

Dispatch helpers: `start`, `pickUnit`, `pause`, `resume`, `complete`, `reset` call `dispatch` with the matching action.

### `targetCount`

- Passed into `usePickWave(targetCount)`.
- If `targetCount` prop changes while mounted, **reset** to initial state (`idle`, `pickedCount 0`) via `useEffect` — do not keep picking an old target.

## Acceptance criteria

- `solution.test.tsx` passes.
- Illegal clicks leave state unchanged (buttons disabled in UI; reducer must still guard).
- Auto-complete on last `PICK_UNIT` without requiring `COMPLETE`.

## Do not read `EXPLANATION.md` until after grading.

## Hints

3 steps on request (−1 point each).
