import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OrderLineItems } from './solution'

describe('OrderLineItems', () => {
  it('shows empty state when there are no items', () => {
    const { container } = render(<OrderLineItems items={[]} />)

    expect(screen.getByTestId('empty')).toHaveTextContent('No items in this order.')
    expect(container.querySelector('ul.order-lines')).toBeNull()
  })

  it('renders each line with name and quantity test ids', () => {
    render(
      <OrderLineItems
        items={[
          { id: 'li-1', name: 'Bearing Assembly', quantity: 2 },
          { id: 'li-2', name: 'Grease Tube', quantity: 5 },
        ]}
      />,
    )

    expect(screen.getByText('Bearing Assembly')).toHaveClass('order-lines__name')
    expect(screen.getByTestId('qty-li-1')).toHaveTextContent('Qty: 2')
    expect(screen.getByTestId('qty-li-2')).toHaveTextContent('Qty: 5')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('shows backorder badge only when backordered is true', () => {
    render(
      <OrderLineItems
        items={[
          { id: 'a', name: 'In stock part', quantity: 1, backordered: false },
          { id: 'b', name: 'Delayed part', quantity: 3, backordered: true },
          { id: 'c', name: 'Default flag', quantity: 1 },
        ]}
      />,
    )

    const badges = screen.getAllByText('Backordered')
    expect(badges).toHaveLength(1)
    expect(badges[0]).toHaveClass('order-lines__badge')
    expect(badges[0].closest('li')).toHaveTextContent('Delayed part')
  })

  it('uses list semantics with order-lines class', () => {
    const { container } = render(
      <OrderLineItems items={[{ id: 'x', name: 'Widget', quantity: 1 }]} />,
    )

    const list = container.querySelector('ul.order-lines')
    expect(list).not.toBeNull()
    expect(list?.children[0]).toHaveClass('order-lines__item')
  })
})
