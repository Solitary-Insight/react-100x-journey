import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { NotifyCustomerButton } from './solution'

describe('NotifyCustomerButton', () => {
  it('renders notify label with customer name', () => {
    render(<NotifyCustomerButton customerName="Acme Corp" onNotify={() => {}} />)

    expect(screen.getByTestId('notify-customer-button')).toHaveTextContent('Notify Acme Corp')
  })

  it('calls onNotify when clicked and enabled', async () => {
    const user = userEvent.setup()
    const onNotify = vi.fn()

    render(<NotifyCustomerButton customerName="Beta" onNotify={onNotify} />)

    await user.click(screen.getByTestId('notify-customer-button'))

    expect(onNotify).toHaveBeenCalledTimes(1)
  })

  it('does not call onNotify when disabled', async () => {
    const user = userEvent.setup()
    const onNotify = vi.fn()

    render(<NotifyCustomerButton customerName="Gamma" onNotify={onNotify} disabled />)

    const button = screen.getByTestId('notify-customer-button')
    expect(button).toBeDisabled()

    await user.click(button)

    expect(onNotify).not.toHaveBeenCalled()
  })
})
