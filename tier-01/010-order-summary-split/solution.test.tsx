import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OrderSummaryCard, OrderSummaryHeader, OrderSummaryTotals } from './solution'

describe('OrderSummaryCard', () => {
  it('composes header and totals with drilled props', () => {
    render(
      <OrderSummaryCard
        orderId="ORD-42"
        customerName="Acme Corp"
        subtotalCents={1999}
        taxCents={160}
      />,
    )

    expect(screen.getByTestId('order-summary')).toHaveClass('order-summary')
    expect(screen.getByTestId('order-id')).toHaveTextContent('Order ORD-42')
    expect(screen.getByTestId('customer-name')).toHaveTextContent('Acme Corp')
    expect(screen.getByTestId('subtotal')).toHaveTextContent('Subtotal: $19.99')
    expect(screen.getByTestId('tax')).toHaveTextContent('Tax: $1.60')
    expect(screen.getByTestId('grand-total')).toHaveTextContent('Total: $21.59')
  })
})

describe('OrderSummaryHeader', () => {
  it('renders order id and customer from props only', () => {
    render(<OrderSummaryHeader orderId="X-1" customerName="Beta LLC" />)

    expect(screen.getByTestId('order-id')).toHaveTextContent('Order X-1')
    expect(screen.getByTestId('customer-name')).toHaveTextContent('Beta LLC')
  })
})

describe('OrderSummaryTotals', () => {
  it('derives grand total from subtotal and tax cents', () => {
    render(<OrderSummaryTotals subtotalCents={500} taxCents={45} />)

    expect(screen.getByTestId('subtotal')).toHaveTextContent('Subtotal: $5.00')
    expect(screen.getByTestId('tax')).toHaveTextContent('Tax: $0.45')
    expect(screen.getByTestId('grand-total')).toHaveTextContent('Total: $5.45')
  })

  it('uses totals footer semantics', () => {
    const { container } = render(<OrderSummaryTotals subtotalCents={0} taxCents={0} />)

    expect(container.querySelector('footer.order-summary__totals')).not.toBeNull()
  })
})
