# Problem 016 — Carrier label busy state (props + disabled UI)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 50 / 100 |
| **Concept** | Parent signals in-flight work; child disables controls (no local loading state) |

## Scenario

While a label PDF is generating, the **parent** sets `isPrinting` to true. The form must disable the carrier select and **Create label** button so clerks cannot double-submit. When printing finishes, the parent clears the flag and controls become interactive again.

## Requirements

Implement `CarrierLabelBusyForm` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type CarrierCode = 'ups' | 'fedex' | 'dhl'

   export type CarrierLabelBusyFormProps = {
     isPrinting: boolean
     onCreateLabel: (carrier: CarrierCode) => void
   }
   ```

2. **State**

   - `useState<CarrierCode>('ups')` for carrier (same options as Problem 015).

3. **Layout** — same structure as 015 with these classes and test ids:

   - Root: `<section className="carrier-label-busy-form" data-testid="carrier-label-busy-form">`
   - Label `htmlFor="busy-label-carrier"` text `Carrier`
   - Select: `id="busy-label-carrier"`, `className="carrier-label-busy-form__select"`, `data-testid="busy-label-carrier-select"`
   - Button: `className="carrier-label-busy-form__create"`, `data-testid="create-label-button"`, text `Create label`, `type="button"`

4. **Behavior**

   - `select` and `button` are **`disabled` when `isPrinting === true`**.
   - When `isPrinting` is false, both are enabled.
   - `onCreateLabel(carrier)` only from button `onClick` when **not** printing (disabled buttons should not fire in tests).
   - Do **not** store `isPrinting` in `useState` — use the prop only.

5. Export `CarrierLabelBusyForm`, `CarrierLabelBusyFormProps`, and `CarrierCode`.

## Acceptance criteria

- Controls disabled while `isPrinting` is true.
- Create calls back with selected carrier when idle.
- `npm test` passes.

## Constraints

- No `useEffect`.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
