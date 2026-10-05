# Explanation — Problem 017: Label print error

## Concept

**Null-as-absent** is a common React pattern: `message === null` → return `null` from the component so React renders nothing. Contrasts with Problem 008’s boolean toggle, but same idea — conditional UI from data.

## Reference approach

```tsx
export function LabelPrintError({ message }: LabelPrintErrorProps) {
  if (message === null) return null

  return (
    <p role="alert" className="label-print-error" data-testid="label-print-error">
      {message}
    </p>
  )
}
```

Use strict `=== null` so `undefined` is not silently treated the same unless the type allows it (here it does not).

## Common mistakes

- Rendering an empty `<p>` when there is no error.
- Using CSS `visibility: hidden` instead of not mounting.
- Wrapping `null` in a div that still occupies layout space.
