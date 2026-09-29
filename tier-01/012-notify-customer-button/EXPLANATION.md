# Explanation — Problem 012: Notify customer button

## Concept

**Callback props** (`onNotify`) invert control: the child announces “user clicked notify”; the parent decides what happens. The button stays reusable across pages with different APIs.

## Why it matters

- Keeps fetch/mutation logic out of presentational UI (test buttons with `vi.fn()`).
- `disabled` from the parent reflects loading state without the button knowing about HTTP.

## Reference approach

```tsx
export function NotifyCustomerButton({
  customerName,
  onNotify,
  disabled = false,
}: NotifyCustomerButtonProps) {
  return (
    <button
      type="button"
      className="notify-customer-button"
      data-testid="notify-customer-button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) onNotify()
      }}
    >
      Notify {customerName}
    </button>
  )
}
```

Native `disabled` buttons do not fire `click` in the browser; forwarding `onNotify` in `onClick` is enough when `disabled={disabled}` is set.

## Common mistakes

- Calling `onNotify()` during render.
- Storing “loading” inside the button instead of accepting `disabled` from parent.
- Using `type="submit"` inside forms unintentionally.
