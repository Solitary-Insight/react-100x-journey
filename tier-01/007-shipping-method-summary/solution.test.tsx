import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ShippingMethodSummary } from './solution'

describe('ShippingMethodSummary', () => {
  it('defaults to standard shipping and derived totals', () => {
    render(<ShippingMethodSummary subtotalCents={2500} />)

    expect(screen.getByTestId('shipping-method-summary')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Standard' })).toBeChecked()
    expect(screen.getByTestId('shipping-fee')).toHaveTextContent('Shipping: $5.99')
    expect(screen.getByTestId('shipping-eta')).toHaveTextContent('5–7 business days')
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: $30.99')
  })

  it('updates derived fee, eta, and total when express is selected', async () => {
    const user = userEvent.setup()
    render(<ShippingMethodSummary subtotalCents={1000} />)

    await user.click(screen.getByRole('radio', { name: 'Express' }))

    expect(screen.getByRole('radio', { name: 'Express' })).toBeChecked()
    expect(screen.getByTestId('shipping-fee')).toHaveTextContent('Shipping: $14.99')
    expect(screen.getByTestId('shipping-eta')).toHaveTextContent('2 business days')
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: $24.99')
  })

  it('shows zero shipping and pickup eta for store pickup', async () => {
    const user = userEvent.setup()
    render(<ShippingMethodSummary subtotalCents={4200} />)

    await user.click(screen.getByRole('radio', { name: 'Store pickup' }))

    expect(screen.getByTestId('shipping-fee')).toHaveTextContent('Shipping: $0.00')
    expect(screen.getByTestId('shipping-eta')).toHaveTextContent('Pick up today')
    expect(screen.getByTestId('order-total')).toHaveTextContent('Total: $42.00')
  })

  it('uses one radio group name for all options', () => {
    render(<ShippingMethodSummary subtotalCents={0} />)

    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
    for (const radio of radios) {
      expect(radio).toHaveAttribute('name', 'shipping-method')
    }
  })
})
