# Explanation — Problem 018: Label print status

## Concept

A **discriminated union** (`kind` field) lets TypeScript narrow which fields exist — `message` only when `kind` is `error` or `success`. Same pattern as Problem 003’s fulfillment statuses.

## Reference approach

```tsx
export function LabelPrintStatus({ status }: LabelPrintStatusProps) {
  switch (status.kind) {
    case 'idle':
      return null
    case 'error':
      return (
        <p role="alert" className="label-print-status label-print-status--error" data-testid="label-print-status-error">
          {status.message}
        </p>
      )
    case 'success':
      return (
        <p role="status" className="label-print-status label-print-status--success" data-testid="label-print-status-success">
          {status.message}
        </p>
      )
  }
}
```

## Common mistakes

- Checking `message` without checking `kind` first.
- Using the same `role` for success and error.
- Rendering an empty paragraph for `idle`.
