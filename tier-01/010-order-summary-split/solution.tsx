
import React from 'react'

export type OrderSummaryHeaderProps = {
  orderId: string
  customerName: string
}

export type OrderSummaryTotalsProps = {
  subtotalCents: number
  taxCents: number
}

export type OrderSummaryCardProps = {
  orderId: string
  customerName: string
  subtotalCents: number
  taxCents: number
}


export function OrderSummaryHeader({orderId,customerName}: OrderSummaryHeaderProps) {
  return <header className="order-summary__header">
    <h2 className="order-summary__order-id" data-testid="order-id">Order {orderId}</h2>
    <p className="order-summary__customer" data-testid="customer-name">{customerName}</p>
  </header>

}

const  formate=(cents:number)=>(cents / 100).toFixed(2)
export function OrderSummaryTotals({subtotalCents,taxCents}: OrderSummaryTotalsProps) {
  const formatedSt=formate(subtotalCents)
  const formatedTx=formate(taxCents)
  const formatedTotal=formate(subtotalCents+taxCents)
  return <footer className="order-summary__totals">
    <p className="order-summary__line" data-testid="subtotal">Subtotal: ${formatedSt}</p>
    <p className="order-summary__line" data-testid="tax">Tax: ${formatedTx}</p>
    <p className="order-summary__line order-summary__line--total" data-testid="grand-total">Total: ${formatedTotal}</p>
  </footer>
}

export function OrderSummaryCard(_props: OrderSummaryCardProps) {
  return <article className="order-summary" data-testid="order-summary">
    <OrderSummaryHeader orderId={_props.orderId} customerName={_props.customerName} ></OrderSummaryHeader>

    <OrderSummaryTotals  taxCents={_props.taxCents} subtotalCents={_props.subtotalCents}></OrderSummaryTotals>
  </article>
}
