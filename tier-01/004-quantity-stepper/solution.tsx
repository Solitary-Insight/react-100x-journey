export type QuantityStepperProps = {
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}

/**
 * 
 */

/**
 * Problem 004 — implement QuantityStepper here.
 */
import React from 'react'
export function QuantityStepper(_props: QuantityStepperProps) {
  const {value,min,max,onChange}=_props
  return (
    <div className="quantity-stepper" data-testid="quantity-stepper">
      <button disabled={value<=min} onClick={()=>onChange(value-1)} type="button" className="quantity-stepper__btn quantity-stepper__btn--decrease" aria-label="Decrease quantity">−</button>
      <span className="quantity-stepper__value" data-testid="quantity-value">{value}</span>
      <button disabled={value>=max} onClick={()=>onChange(value+1)} type="button" className="quantity-stepper__btn quantity-stepper__btn--increase" aria-label="Increase quantity">+</button>
    </div>
  )
}
