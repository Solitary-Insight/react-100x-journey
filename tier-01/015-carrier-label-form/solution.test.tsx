import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CarrierLabelForm } from './solution'

describe('CarrierLabelForm', () => {
  it('defaults to ups and shows carrier select', () => {
    render(<CarrierLabelForm onCreateLabel={() => {}} />)

    expect(screen.getByTestId('carrier-label-form')).toBeInTheDocument()
    expect(screen.getByLabelText('Carrier')).toHaveValue('ups')
  })

  it('calls onCreateLabel with current carrier when create is clicked', async () => {
    const user = userEvent.setup()
    const onCreateLabel = vi.fn()

    render(<CarrierLabelForm onCreateLabel={onCreateLabel} />)

    await user.click(screen.getByTestId('create-label-button'))

    expect(onCreateLabel).toHaveBeenCalledTimes(1)
    expect(onCreateLabel).toHaveBeenCalledWith('ups')
  })

  it('passes updated carrier after select change', async () => {
    const user = userEvent.setup()
    const onCreateLabel = vi.fn()

    render(<CarrierLabelForm onCreateLabel={onCreateLabel} />)

    await user.selectOptions(screen.getByTestId('label-carrier-select'), 'dhl')
    await user.click(screen.getByTestId('create-label-button'))

    expect(onCreateLabel).toHaveBeenCalledWith('dhl')
  })
})
