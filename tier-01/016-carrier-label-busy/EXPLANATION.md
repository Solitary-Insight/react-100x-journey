# Explanation — Problem 016: Carrier label busy state

## Concept

**Busy/disabled UI** driven by props keeps async state in the parent (where the fetch lives). The form only mirrors `isPrinting` onto `disabled` attributes — no duplicate “loading” state inside the child.

## Reference approach

```tsx
<select
  disabled={isPrinting}
  value={carrier}
  onChange={(e) => setCarrier(e.target.value as CarrierCode)}
/>
<button
  type="button"
  disabled={isPrinting}
  onClick={() => onCreateLabel(carrier)}
>
  Create label
</button>
```

When `disabled` is true, clicks do not run `onClick` — you do not need an extra `if (isPrinting) return` unless you want defense in depth.

## Common mistakes

- Copying `isPrinting` into `useState` and syncing with `useEffect`.
- Only disabling the button but leaving the select active (double-submit via changed carrier mid-print).
