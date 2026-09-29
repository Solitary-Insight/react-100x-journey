import React, { useMemo, useState } from 'react'

const SHIPPING_CENTS: Record<ShippingMethod, number> = {
  standard: 599,
  express: 1499,
  pickup: 0,
}

const SHIPPING_ETA: Record<ShippingMethod, string> = {
  standard: '5–7 business days',
  express: '2 business days',
  pickup: 'Pick up today',
}

function formatDollars(cents: number): string {
  return (cents / 100).toFixed(2)
}

export type ShippingMethod = 'standard' | 'express' | 'pickup'

export type ShippingMethodSummaryProps = {
  subtotalCents: number
}

/**
 * Problem 007 — implement ShippingMethodSummary here.
 */
export function ShippingMethodSummary({ subtotalCents }: ShippingMethodSummaryProps) {

  const [method, setMethod] = useState<ShippingMethod>('standard')

  const obj = { standard: "Standard", express: "Express", pickup: "Store pickup" }
  const shippingFee = useMemo(() => SHIPPING_CENTS[method], [method])
  const shippingEta = useMemo(() => SHIPPING_ETA[method], [method])
  const total = useMemo(() => shippingFee + subtotalCents, [shippingFee])

  return <section className="shipping-method-summary" data-testid="shipping-method-summary">
    <fieldset className="shipping-method-summary__fieldset">
      <legend className="shipping-method-summary__legend">Shipping method</legend>
      {Object.entries(obj).map(([key, val], index) => {
        return < label  onClick={() => setMethod(key)} className="shipping-method-summary__option">
          <input role='radio' name='shipping-method'  checked={method == key} type='radio' value={val} />
          {val}
        </label>
      })


      }


      <p className="shipping-method-summary__fee" data-testid="shipping-fee">Shipping: ${formatDollars(shippingFee)}</p>
      <p className="shipping-method-summary__eta" data-testid="shipping-eta">{shippingEta}</p>
      <p className="shipping-method-summary__total" data-testid="order-total">Total: ${formatDollars(total)}</p>
    </fieldset>
  </section >

}
