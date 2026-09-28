import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuantityStepper } from './solution'

describe('QuantityStepper', () => {
  it('displays the controlled value', () => {
    render(<QuantityStepper value={3} min={1} max={10} onChange={() => {}} />)

    expect(screen.getByTestId('quantity-value')).toHaveTextContent('3')
    expect(screen.getByTestId('quantity-stepper')).toBeInTheDocument()
  })

  it('disables decrease at min and increase at max', () => {
    const { rerender } = render(
      <QuantityStepper value={1} min={1} max={5} onChange={() => {}} />,
    )

    expect(
      screen.getByRole('button', { name: 'Decrease quantity' }),
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Increase quantity' }),
    ).not.toBeDisabled()

    rerender(<QuantityStepper value={5} min={1} max={5} onChange={() => {}} />)

    expect(
      screen.getByRole('button', { name: 'Increase quantity' }),
    ).toBeDisabled()
  })

  it('calls onChange with value + 1 when increase is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<QuantityStepper value={2} min={1} max={5} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Increase quantity' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('calls onChange with value - 1 when decrease is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<QuantityStepper value={4} min={1} max={5} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(3)
  })

  it('does not call onChange when clicking a disabled button', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<QuantityStepper value={1} min={1} max={5} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Decrease quantity' }))

    expect(onChange).not.toHaveBeenCalled()
  })
})
