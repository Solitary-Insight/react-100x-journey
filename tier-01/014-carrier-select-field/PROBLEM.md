# Problem 014 — Carrier select field (controlled select)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 44 / 100 |
| **Concept** | Controlled `<select>`, typed option values, label association |

## Scenario

Shipping labels require a **carrier** before printing. The parent stores the selected carrier in state; your field is a controlled dropdown that reports changes through `onChange`.

## Requirements

Implement `CarrierSelectField` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type CarrierCode = 'ups' | 'fedex' | 'dhl'

   export type CarrierSelectFieldProps = {
     id: string
     label: string
     value: CarrierCode
     onChange: (next: CarrierCode) => void
   }
   ```

2. **Layout**

   - Root: `<div className="carrier-select-field">`
   - Label: `<label className="carrier-select-field__label" htmlFor={id}>{label}</label>`
   - Select: `<select id={id} className="carrier-select-field__select" data-testid="carrier-select" value={value} onChange={...}>`
   - Options (exact `value` and visible text):

     | `value` | Option text |
     |---------|-------------|
     | `ups` | UPS |
     | `fedex` | FedEx |
     | `dhl` | DHL |

3. **Behavior**

   - `value` and `onChange` only — **no `useState`** for the carrier in this component.
   - `onChange` receives the next `CarrierCode` from `event.target.value` (cast or narrow safely).
   - Three options always rendered in the order above.

4. Export `CarrierSelectField`, `CarrierSelectFieldProps`, and `CarrierCode`.

## Acceptance criteria

- Label is associated with the select (`htmlFor` / `id`).
- Changing selection calls `onChange` with the new code.
- Selected option matches `value` prop.
- `npm test` passes.

## Constraints

- No external UI libraries.

## Hints

3 steps on request (−1 point each).
