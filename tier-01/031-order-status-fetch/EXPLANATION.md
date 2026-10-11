# Explanation — Problem 031: Order status fetch

## Reference pattern

- One `useReducer` for `status`, `orderId`, `trackingNumber`, `errorMessage`.
- `load`: abort prior controller → dispatch `loading` → `fetch` → `success` | `error`; ignore `AbortError`.
- `setOrderId`: update id + dispatch reset to `idle` with cleared result fields.

## Issues in typical submissions

- `import 'fs'` in a client hook.
- `loading` never dispatched (button `disabled` wrong).
- Splitting `useReducer(status)` + `useState(rest)` duplicates the spec.
- `setOrderId` must reset status/results for a new search.
