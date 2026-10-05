# Problem 015 — Carrier label form (local state + callback)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 47 / 100 |
| **Concept** | Combine controlled `<select>` with local state; pass choice to parent on action |

## Scenario

Before printing a shipping label, the clerk picks a **carrier** and clicks **Create label**. This form owns the carrier selection in `useState`; the parent supplies `onCreateLabel` to run the print API.

## Requirements

Implement `CarrierLabelForm` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type CarrierCode = 'ups' | 'fedex' | 'dhl'

   export type CarrierLabelFormProps = {
     onCreateLabel: (carrier: CarrierCode) => void
   }
   ```

2. **State**

   - `useState<CarrierCode>('ups')` for the selected carrier.

3. **Layout**

   - Root: `<section className="carrier-label-form" data-testid="carrier-label-form">`
   - Label: `<label className="carrier-label-form__label" htmlFor="label-carrier">Carrier</label>`
   - Select: `<select id="label-carrier" className="carrier-label-form__select" data-testid="label-carrier-select" value={carrier} onChange={...}>`
   - Same three options as Problem 014 (`ups` / `fedex` / `dhl` with labels UPS, FedEx, DHL).
   - Action: `<button type="button" className="carrier-label-form__create" data-testid="create-label-button">Create label</button>`

4. **Behavior**

   - Changing the select updates local state.
   - Clicking **Create label** calls `onCreateLabel(carrier)` with the **current** selection.
   - Do not call `onCreateLabel` on render.

5. Export `CarrierLabelForm`, `CarrierLabelFormProps`, and `CarrierCode`.

## Acceptance criteria

- Default selection is UPS.
- Select changes update which carrier is sent on create.
- Create button invokes callback once per click with the active carrier.
- `npm test` passes.

## Constraints

- No `useEffect`.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
