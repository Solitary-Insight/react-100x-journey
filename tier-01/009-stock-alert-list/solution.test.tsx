import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StockAlertList } from './solution'

describe('StockAlertList', () => {
  it('shows empty state without list or total', () => {
    const { container } = render(<StockAlertList alerts={[]} />)

    expect(screen.getByTestId('stock-alert-list')).toBeInTheDocument()
    expect(screen.getByTestId('stock-alerts-empty')).toHaveTextContent('No stock alerts.')
    expect(container.querySelector('ul.stock-alerts__list')).toBeNull()
    expect(screen.queryByTestId('total-units')).not.toBeInTheDocument()
  })

  it('renders rows with sku, units test ids, and list semantics', () => {
    render(
      <StockAlertList
        alerts={[
          { id: 'a1', sku: 'SKU-100', units: 4 },
          { id: 'b2', sku: 'SKU-200', units: 12 },
        ]}
      />,
    )

    expect(screen.getByText('SKU-100')).toHaveClass('stock-alerts__sku')
    expect(screen.getByTestId('alert-units-a1')).toHaveTextContent('4 left')
    expect(screen.getByTestId('alert-units-b2')).toHaveTextContent('12 left')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('derives total units at risk in the footer', () => {
    render(
      <StockAlertList
        alerts={[
          { id: 'x', sku: 'A', units: 3 },
          { id: 'y', sku: 'B', units: 7 },
        ]}
      />,
    )

    expect(screen.getByTestId('total-units')).toHaveTextContent('Total units at risk: 10')
  })

  it('shows critical badge only when critical is true', () => {
    render(
      <StockAlertList
        alerts={[
          { id: '1', sku: 'OK', units: 50, critical: false },
          { id: '2', sku: 'LOW', units: 2, critical: true },
          { id: '3', sku: 'DEFAULT', units: 8 },
        ]}
      />,
    )

    const badges = screen.getAllByText('Critical')
    expect(badges).toHaveLength(1)
    expect(badges[0]).toHaveClass('stock-alerts__badge')
    expect(badges[0].closest('li')).toHaveTextContent('LOW')
  })
})
