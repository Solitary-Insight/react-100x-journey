# Problem 029 — Warehouse session context (split contexts)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 95 / 100 |
| **Concept** | **Multiple contexts** — subscribers only re-render when their slice changes |

## Scenario

Handheld apps show **operator** and **dock** session fields. Changing dock must not re-render components that only read **operator**.

Putting `{ operatorName, dockId }` in one context still re-renders everyone when either field changes. Split **by field** (and separate **dispatch**).

## Provided (do not edit)

| File | Role |
|------|------|
| `WarehouseSessionView.tsx` | Form UI |
| `WarehouseSessionPanel.tsx` | Wires view to your hooks |
| `solution.tsx` | Re-export for tests |

## What you implement

Edit **`warehouseSession.tsx` only.**

1. **`useReducer`** (recommended) for internal state:

   ```ts
   { operatorName: string; dockId: string }
   ```

2. **Three contexts** (required):

   | Context | Value |
   |---------|--------|
   | Operator name | `string` |
   | Dock ID | `string` |
   | Dispatch | stable `{ setOperatorName, setDockId }` |

   Provider updates **only** the operator context value when `operatorName` changes, and **only** the dock context when `dockId` changes. Dispatch context value must be **stable** (`useMemo` on dispatch fns).

3. **`WarehouseSessionProvider`** wraps `children`.

4. **Hooks**

   - `useWarehouseOperatorName()` → operator context
   - `useWarehouseDockId()` → dock context
   - `useWarehouseSessionActions()` → dispatch context

5. **Do not** expose one combined `{ state, actions }` context.

## Acceptance criteria

- Tests pass (`solution.test.tsx`).
- Render-count test: changing **dock** does not re-render `OperatorRenderCounter` (operator-only hook).

## Do not read `EXPLANATION.md` until after grading.

## Hints

3 steps on request (−1 point each).
