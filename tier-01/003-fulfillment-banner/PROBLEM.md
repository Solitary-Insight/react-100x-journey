# Problem 003 — Fulfillment status banner

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 11 / 100 |
| **Concept** | Conditional rendering, discriminated props, accessible status messaging |

## Scenario

Customer support embeds a **fulfillment banner** at the top of order detail pages. The banner copy and styling depend on the order’s fulfillment state. Support agents need consistent semantics (`role="status"`) so screen readers announce updates when the parent re-renders with new data.

## Requirements

Implement `FulfillmentBanner` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type FulfillmentStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled'

   export type FulfillmentBannerProps = {
     status: FulfillmentStatus
     orderId: string
     /** Present only when status is `shipped` */
     trackingNumber?: string
   }
   ```

2. **Shared shell** — every variant renders:

   ```tsx
   <div role="status" className={/* see table */} data-testid="fulfillment-banner">
     ...
   </div>
   ```

3. **Variants** — use `status` to pick **exact** `className` on the root `div` and inner message copy:

   | `status` | Root `className` | Message (include `orderId` in the string) |
   |----------|------------------|---------------------------------------------|
   | `processing` | `banner banner--processing` | `Order {orderId} is being prepared.` |
   | `shipped` | `banner banner--shipped` | `Order {orderId} has shipped.` |
   | `delivered` | `banner banner--delivered` | `Order {orderId} was delivered.` |
   | `cancelled` | `banner banner--cancelled` | `Order {orderId} was cancelled.` |

   Wrap the message in: `<p className="banner__message">...</p>`.

4. **Tracking line** — only when `status === 'shipped'` **and** `trackingNumber` is a non-empty string:

   ```tsx
   <p className="banner__tracking" data-testid="tracking">
     Tracking: {trackingNumber}
   </p>
   ```

   Do not show tracking for `shipped` without a number, or for any other status.

5. Export `FulfillmentBanner`, `FulfillmentStatus`, and `FulfillmentBannerProps`.

## Acceptance criteria

- Each status renders the correct modifier class and message text.
- `role="status"` and `data-testid="fulfillment-banner"` on the root for all variants.
- Tracking paragraph appears only for shipped + non-empty `trackingNumber`.
- `npm test` passes.

## Constraints

- Functional component; no hooks required.
- Use conditional rendering (ternary / `&&` / early logic)—no mapping table object required, but clarity matters.
- Do not use external UI libraries.

## Hints

3 steps on request (−1 point each).
