export type LineItem = {
  id: string
  name: string
  quantity: number
  backordered?: boolean
}

export type OrderLineItemsProps = {
  items: LineItem[]
}

/** Reference types only — implement in solution.tsx */
export function OrderLineItems(_props: OrderLineItemsProps) {
  return null
}
