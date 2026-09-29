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

export function OrderSummaryHeader(_props: OrderSummaryHeaderProps) {
  return null
}

export function OrderSummaryTotals(_props: OrderSummaryTotalsProps) {
  return null
}

export function OrderSummaryCard(_props: OrderSummaryCardProps) {
  return null
}
