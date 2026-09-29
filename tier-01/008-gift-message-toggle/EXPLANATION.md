# Explanation — Problem 008: Gift message toggle

## Concept

**Conditional UI** renders different trees based on state (`enabled`). The toggle is always visible; the message block mounts only when needed. Unchecking should **reset** dependent state so you do not leak a hidden value to a future submit handler.

## Why it matters

- Matches real checkout flows (gift options, invoice details, B2B fields).
- Teaches colocating “open section” state with “fields inside section” state in one component.
- Prepares you for later patterns (dialogs, accordions) without `useEffect` for visibility.

## Reference approach

```tsx
const [enabled, setEnabled] = useState(false)
const [message, setMessage] = useState('')

function handleToggle(checked: boolean) {
  setEnabled(checked)
  if (!checked) setMessage('')
}

return (
  <section ...>
    <label>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => handleToggle(e.target.checked)}
        data-testid="gift-toggle"
      />
      Include gift message
    </label>
    {enabled && (
      <div data-testid="gift-message-body">...</div>
    )}
  </section>
)
```

Use a **controlled** checkbox (`checked` + `onChange`) so React state stays the source of truth.

## Common mistakes

- Leaving `gift-message-body` in the DOM with `hidden` or `display: none` when the spec asks for conditional mount.
- Forgetting to clear `message` on uncheck (tests will fail on re-open).
- Using `useEffect` to sync message when `enabled` flips — handle it in the toggle handler instead.
