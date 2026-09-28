import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FulfillmentBanner } from './solution'

describe('FulfillmentBanner', () => {
  it.each([
    ['processing', 'banner--processing', 'Order ORD-9 is being prepared.'],
    ['shipped', 'banner--shipped', 'Order ORD-9 has shipped.'],
    ['delivered', 'banner--delivered', 'Order ORD-9 was delivered.'],
    ['cancelled', 'banner--cancelled', 'Order ORD-9 was cancelled.'],
  ] as const)(
    'renders %s message and modifier class',
    (status, modifier, message) => {
      render(<FulfillmentBanner status={status} orderId="ORD-9" />)

      const root = screen.getByTestId('fulfillment-banner')
      expect(root).toHaveAttribute('role', 'status')
      expect(root).toHaveClass('banner', modifier)
      expect(screen.getByText(message)).toHaveClass('banner__message')
    },
  )

  it('shows tracking only for shipped with a non-empty tracking number', () => {
    render(
      <FulfillmentBanner
        status="shipped"
        orderId="ORD-1"
        trackingNumber="1Z999"
      />,
    )

    expect(screen.getByTestId('tracking')).toHaveTextContent('Tracking: 1Z999')
  })

  it('hides tracking when shipped but trackingNumber is missing', () => {
    render(<FulfillmentBanner status="shipped" orderId="ORD-1" />)

    expect(screen.queryByTestId('tracking')).not.toBeInTheDocument()
  })

  it('hides tracking when trackingNumber is empty string', () => {
    render(
      <FulfillmentBanner
        status="shipped"
        orderId="ORD-1"
        trackingNumber=""
      />,
    )

    expect(screen.queryByTestId('tracking')).not.toBeInTheDocument()
  })

  it('does not show tracking for non-shipped statuses even if trackingNumber is set', () => {
    render(
      <FulfillmentBanner
        status="delivered"
        orderId="ORD-1"
        trackingNumber="1Z999"
      />,
    )

    expect(screen.queryByTestId('tracking')).not.toBeInTheDocument()
  })
})
