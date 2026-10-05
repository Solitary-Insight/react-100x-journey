# Problem 018 — Label print status (discriminated union)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 56 / 100 |
| **Concept** | Discriminated union props; branch on `kind` (like Problem 003) |

## Scenario

The label printer reports **idle**, **error**, or **success**. The parent passes a single `status` object; your component picks the correct message UI — or renders nothing when idle.

## Requirements

Implement `LabelPrintStatus` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type PrintStatus =
     | { kind: 'idle' }
     | { kind: 'error'; message: string }
     | { kind: 'success'; message: string }

   export type LabelPrintStatusProps = {
     status: PrintStatus
   }
   ```

2. **Behavior**

   - `kind: 'idle'` → return `null` (no DOM).
   - `kind: 'error'` → `<p role="alert" className="label-print-status label-print-status--error" data-testid="label-print-status-error">{message}</p>`
   - `kind: 'success'` → `<p role="status" className="label-print-status label-print-status--success" data-testid="label-print-status-success">{message}</p>`

3. **Constraints**

   - No hooks.
   - Use `status.kind` to branch (switch or if/else).

4. Export `LabelPrintStatus`, `LabelPrintStatusProps`, and `PrintStatus`.

## Acceptance criteria

- Idle renders nothing.
- Error and success show exact message text and test ids.
- Correct `role` per variant.
- `npm test` passes.

## Hints

3 steps on request (−1 point each).
