export type StockAlert = {
  id: string
  sku: string
  units: number
  critical?: boolean
}

export type StockAlertListProps = {
  alerts: StockAlert[]
}

/**
 * Problem 009 — implement StockAlertList here.
 */
export function StockAlertList(_props: StockAlertListProps) {
  return null
}
