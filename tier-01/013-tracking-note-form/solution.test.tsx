import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TrackingNoteForm } from './solution'

describe('TrackingNoteForm', () => {
  it('shows order id and labeled input', () => {
    render(<TrackingNoteForm orderId="ORD-7" onSubmit={() => {}} />)

    expect(screen.getByTestId('tracking-order-id')).toHaveTextContent('Order ORD-7')
    expect(screen.getByLabelText('Tracking note')).toHaveAttribute('id', 'tracking-note')
  })

  it('submits trimmed note and clears input', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TrackingNoteForm orderId="ORD-1" onSubmit={onSubmit} />)

    const input = screen.getByTestId('tracking-note-input')
    await user.type(input, '  left at dock  ')
    await user.click(screen.getByTestId('tracking-note-submit'))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith('left at dock')
    expect(input).toHaveValue('')
  })

  it('does not call onSubmit for empty or whitespace-only notes', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TrackingNoteForm orderId="ORD-2" onSubmit={onSubmit} />)

    await user.click(screen.getByTestId('tracking-note-submit'))
    expect(onSubmit).not.toHaveBeenCalled()

    await user.type(screen.getByTestId('tracking-note-input'), '   ')
    await user.click(screen.getByTestId('tracking-note-submit'))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits when Enter is pressed in the input', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<TrackingNoteForm orderId="X" onSubmit={onSubmit} />)

    const input = screen.getByTestId('tracking-note-input')
    await user.type(input, 'dock scan{Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith('dock scan')
    expect(input).toHaveValue('')
  })
})
