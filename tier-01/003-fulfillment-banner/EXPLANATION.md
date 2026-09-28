# Explanation — Problem 003: Fulfillment status banner

## Concept

**Discriminated `status` props** drive which UI branch renders. In production, a small **lookup map** (status → class + message) scales better than four copy-pasted JSX blocks, as long as the map stays colocated and typed with `FulfillmentStatus`.

## Why it matters

- **`role="status"`** exposes live updates to assistive tech on order pages that poll or websocket new fulfillment state.
- **Narrow tracking visibility** (`shipped` + non-empty string) prevents leaking tracking UI on cancelled/delivered orders when parents pass stale props.
- **Exact copy** in support tools reduces mis-clicks and ticket volume — treat strings as API.

## Your approach (strong)

You extracted `statusToClassName` outside the component so the map is not recreated each render, and you guarded tracking with `status === 'shipped'` plus empty-string check — both are production-minded choices.

## Reference shape (equivalent)

```tsx
const statusConfig: Record<
  FulfillmentStatus,
  { modifier: string; message: (orderId: string) => string }
> = {
  processing: {
    modifier: 'banner--processing',
    message: (id) => `Order ${id} is being prepared.`,
  },
  // ...other statuses
}

export function FulfillmentBanner({
  status,
  orderId,
  trackingNumber,
}: FulfillmentBannerProps) {
  const { modifier, message } = statusConfig[status]
  const showTracking =
    status === 'shipped' &&
    trackingNumber !== undefined &&
    trackingNumber.length > 0

  return (
    <div
      role="status"
      className={`banner ${modifier}`}
      data-testid="fulfillment-banner"
    >
      <p className="banner__message">{message(orderId)}</p>
      {showTracking ? (
        <p className="banner__tracking" data-testid="tracking">
          Tracking: {trackingNumber}
        </p>
      ) : null}
    </div>
  )
}
```

## Minor polish

- Name the map key `modifier` vs `className` inside the object to avoid shadowing the DOM `className` prop mentally.
- A `showTracking` boolean local can read clearer than a long `&&` chain in JSX.
- Prefer `{ status, orderId, trackingNumber }` in the function parameter list instead of `_props`.

## Common mistakes

- Showing tracking whenever `trackingNumber` is set, regardless of `status`.
- Wrong tense in copy (`has delivered` vs `was delivered`) — tests catch this; users notice in prod.
- Forgetting `role="status"` on the root.

## Read next

- [Conditional rendering](https://react.dev/learn/conditional-rendering)
- [ARIA live regions / status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role)
