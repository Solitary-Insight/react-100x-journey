# Problem 017 — Label print error (conditional message prop)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 53 / 100 |
| **Concept** | Render feedback from props; `null` means no error UI |

## Scenario

When label printing fails, the parent passes an **error message** string. When there is no error, the parent passes `null` and nothing extra should appear — no empty red box.

## Requirements

Implement `LabelPrintError` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type LabelPrintErrorProps = {
     message: string | null
   }
   ```

2. **Behavior**

   - When `message === null`, render **`null`** (no wrapper, no placeholder).
   - When `message` is a non-empty string, render:
     - `<p role="alert" className="label-print-error" data-testid="label-print-error">{message}</p>`

3. **Constraints**

   - No hooks.
   - Do not trim or transform `message` — display as given.

4. Export `LabelPrintError` and `LabelPrintErrorProps`.

## Acceptance criteria

- `message={null}` → `queryByTestId('label-print-error')` is null.
- `message="Printer offline"` → alert visible with exact text.
- `npm test` passes.

## Hints

3 steps on request (−1 point each).
