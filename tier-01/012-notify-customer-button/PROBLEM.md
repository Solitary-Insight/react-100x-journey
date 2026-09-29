# Problem 012 — Notify customer button (callback props)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 38 / 100 |
| **Concept** | Presentational control + `onNotify` callback; parent owns side effects |

## Scenario

After resolving a ticket, agents send a **notification email**. The button is dumb: it displays copy from props and calls `onNotify` when clicked. The parent supplies the handler (API call, toast, etc.) and can disable the button while a request is in flight.

## Requirements

Implement `NotifyCustomerButton` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type NotifyCustomerButtonProps = {
     customerName: string
     onNotify: () => void
     disabled?: boolean
   }
   ```

2. **Markup**

   - `<button type="button" className="notify-customer-button" data-testid="notify-customer-button">`
   - Visible label: `Notify {customerName}` (exact pattern — name from props).
   - `disabled` attribute when `disabled === true`; otherwise omit disabled or set `disabled={false}`.

3. **Behavior**

   - `onClick` calls `onNotify()` **only when** the button is not disabled.
   - Do not call `onNotify` on render.
   - No `useState` in this component.

4. Export `NotifyCustomerButton` and `NotifyCustomerButtonProps`.

## Acceptance criteria

- Renders label with customer name.
- Click invokes `onNotify` once when enabled.
- Does not invoke `onNotify` when `disabled` is true (click or keyboard).
- `npm test` passes.

## Constraints

- Functional component; no hooks.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
