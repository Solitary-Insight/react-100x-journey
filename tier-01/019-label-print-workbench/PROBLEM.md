# Problem 019 — Label print workbench (compose status + form)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 59 / 100 |
| **Concept** | Compose patterns from 016–018 in one screen; shared types, clear layout regions |

## Scenario

The **print workbench** shows print feedback (idle / error / success) above the carrier form. Reuse the same rules as Problems 016 and 018 in a single component — do not import from other problem folders.

## Requirements

Implement `LabelPrintWorkbench` in `solution.tsx`.

1. **Types** (export all):

   ```ts
   export type CarrierCode = 'ups' | 'fedex' | 'dhl'

   export type PrintStatus =
     | { kind: 'idle' }
     | { kind: 'error'; message: string }
     | { kind: 'success'; message: string }

   export type LabelPrintWorkbenchProps = {
     status: PrintStatus
     isPrinting: boolean
     onCreateLabel: (carrier: CarrierCode) => void
   }
   ```

2. **Layout**

   - Root: `<section className="label-print-workbench" data-testid="print-workbench">`
   - **Status region** — same behavior and markup as Problem 018 (`label-print-status-error` / `label-print-status-success` test ids, classes, roles).
   - **Form region** — wrapper `<div className="label-print-workbench__form" data-testid="print-workbench-form">` containing the same behavior and markup as Problem 016:
     - `useState<CarrierCode>('ups')`
     - Select `id="workbench-carrier"`, `data-testid="workbench-carrier-select"`, disabled when `isPrinting`
     - Label `htmlFor="workbench-carrier"` text `Carrier`
     - Button `type="button"`, `data-testid="create-label-button"`, text `Create label`, disabled when `isPrinting`, calls `onCreateLabel(carrier)`

   - Carrier options: UPS / FedEx / DHL with values `ups`, `fedex`, `dhl`.

3. **Constraints**

   - No `useEffect`.
   - `isPrinting` from props only (not copied into state).

4. Export `LabelPrintWorkbench`, `LabelPrintWorkbenchProps`, `PrintStatus`, and `CarrierCode`.

## Acceptance criteria

- Status + form behaviors match 016 and 018 when used together.
- Regions use the test ids above.
- `npm test` passes.

## Hints

3 steps on request (−1 point each).
