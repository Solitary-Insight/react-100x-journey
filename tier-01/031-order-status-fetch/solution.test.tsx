import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OrderStatusPanel } from './solution'

describe('OrderStatusPanel', () => {
  it('loads tracking for a valid order', async () => {
    render(<OrderStatusPanel />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Order ID' }), {
      target: { value: '1001' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Load status' }))

    await waitFor(() => {
      expect(screen.getByText(/Tracking: TRK-1001/)).toBeInTheDocument()
    })
  })

  it('shows error for fail order id', async () => {
    render(<OrderStatusPanel />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Order ID' }), {
      target: { value: 'fail' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Load status' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Order not found')
    })
  })

  it('ignores stale response when a newer load starts', async () => {
    render(<OrderStatusPanel />)
    const input = screen.getByRole('textbox', { name: 'Order ID' })

    fireEvent.change(input, { target: { value: 'slow' } })
    fireEvent.click(screen.getByRole('button', { name: 'Load status' }))

    fireEvent.change(input, { target: { value: 'fast' } })
    fireEvent.click(screen.getByRole('button', { name: 'Load status' } })

    await waitFor(() => {
      expect(screen.getByText(/Tracking: TRK-fast/)).toBeInTheDocument()
    })
    expect(screen.queryByText(/TRK-slow/)).not.toBeInTheDocument()
  })
})
