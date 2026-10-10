# Problem 031 — Order status fetch (`useReducer` + abort)

| Field | Value |
|-------|-------|
| **Tier** | 2 — State & effects (expert track) |
| **Level** | 97 / 100 |
| **Concept** | **`useReducer`** for async UI state + **`AbortController`** per load |

## Scenario

Support loads tracking for an order ID. Each **Load** click fetches status; changing the ID and loading again must not apply a stale response.

## Provided (do not edit)

| File | Role |
|------|------|
| `OrderStatusView.tsx` | Form + button + status regions |
| `OrderStatusPanel.tsx` | Wires view to your hook |
| `orderStatusApi.ts` | `fetchOrderStatus(orderId, signal)` |
| `solution.tsx` | Re-export |

## What you implement

Edit **`useOrderStatus.ts` only.**

1. **`useReducer`** with states: `idle` | `loading` | `success` | `error`, plus `orderId`, `trackingNumber`, `errorMessage`.

2. **`load()`**

   - Abort any in-flight request (keep `AbortController` in a `useRef`).
   - Dispatch loading; call `fetchOrderStatus(orderId, signal)`.
   - Success → `success` + tracking number.
   - `AbortError` → ignore.
   - Other errors → `error` with `error.message` (or `Load failed`).

3. **`setOrderId`**

   - Update draft id; reset status to `idle` and clear tracking/error (new search).

4. **Do not read** `EXPLANATION.md` until grading.

## Acceptance criteria

- `solution.test.tsx` passes.
- Rapid double-load or load after id change does not show wrong tracking.

## Hints

3 steps on request (−1 point each).
