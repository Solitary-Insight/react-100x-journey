import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CarrierLabelBusyForm } from './solution'

describe('CarrierLabelBusyForm', () => {
  it('disables select and button while printing', () => {
    render(<CarrierLabelBusyForm isPrinting onCreateLabel={() => {}} />)

    expect(screen.getByTestId('busy-label-carrier-select')).toBeDisabled()
    expect(screen.getByTestId('create-label-button')).toBeDisabled()
  })

  it('enables controls when not printing', () => {
    render(<CarrierLabelBusyForm isPrinting={false} onCreateLabel={() => {}} />)

    expect(screen.getByTestId('busy-label-carrier-select')).toBeEnabled()
    expect(screen.getByTestId('create-label-button')).toBeEnabled()
  })

  it('does not call onCreateLabel when printing', async () => {
    const user = userEvent.setup()
    const onCreateLabel = vi.fn()

    render(<CarrierLabelBusyForm isPrinting onCreateLabel={onCreateLabel} />)

    await user.click(screen.getByTestId('create-label-button'))

    expect(onCreateLabel).not.toHaveBeenCalled()
  })

  it('calls onCreateLabel with carrier when idle', async () => {
    const user = userEvent.setup()
    const onCreateLabel = vi.fn()

    render(<CarrierLabelBusyForm isPrinting={false} onCreateLabel={onCreateLabel} />)

    await user.selectOptions(screen.getByTestId('busy-label-carrier-select'), 'fedex')
    await user.click(screen.getByTestId('create-label-button'))

    expect(onCreateLabel).toHaveBeenCalledWith('fedex')
  })
})
