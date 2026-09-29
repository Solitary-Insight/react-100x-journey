import React from 'react'
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
export function StockAlertList({ alerts }: StockAlertListProps) {
  const totalUnits = alerts.reduce((sum, alert) => sum + alert.units, 0)

  return (
    <section className="stock-alerts" data-testid="stock-alert-list">
      <h2 className="stock-alerts__title">Stock alerts</h2>
      {alerts.length === 0 ? (
        <p className="stock-alerts__empty" data-testid="stock-alerts-empty">
          No stock alerts.
        </p>
      ) : (
        <>
          <ul className="stock-alerts__list">
            {alerts.map((alert) => (
              <li className="stock-alerts__item" key={alert.id}>
                <span className="stock-alerts__sku">{alert.sku}</span>
                <span className="stock-alerts__units" data-testid={`alert-units-${alert.id}`}>{alert.units} left</span>
                {alert.critical === true && <span className="stock-alerts__badge">Critical</span>}
                </li>
            ))}
          </ul>
          <p className="stock-alerts__total" data-testid="total-units">Total units at risk: {totalUnits}</p>
        </>
      )}
    </section>
  )
}
