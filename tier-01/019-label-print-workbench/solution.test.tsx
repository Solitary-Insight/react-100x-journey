import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LabelPrintWorkbench } from './solution'

describe('LabelPrintWorkbench', () => {
  it('shows error status and form regions together', () => {
    render(
      <LabelPrintWorkbench
        status={{ kind: 'error', message: 'Offline' }}
        isPrinting={false}
        onCreateLabel={() => {}}
      />,
    )

    expect(screen.getByTestId('print-workbench')).toBeInTheDocument()
    expect(screen.getByTestId('label-print-status-error')).toHaveTextContent('Offline')
    expect(screen.getByTestId('print-workbench-form')).toBeInTheDocument()
    expect(screen.getByTestId('workbench-carrier-select')).toBeEnabled()
  })

  it('disables form while printing but still shows success status', () => {
    render(
      <LabelPrintWorkbench
        status={{ kind: 'success', message: 'Sent' }}
        isPrinting
        onCreateLabel={() => {}}
      />,
    )

    expect(screen.getByTestId('label-print-status-success')).toHaveTextContent('Sent')
    expect(screen.getByTestId('workbench-carrier-select')).toBeDisabled()
    expect(screen.getByTestId('create-label-button')).toBeDisabled()
  })

  it('creates label with selected carrier when idle', async () => {
    const user = userEvent.setup()
    const onCreateLabel = vi.fn()

    render(
      <LabelPrintWorkbench
        status={{ kind: 'idle' }}
        isPrinting={false}
        onCreateLabel={onCreateLabel}
      />,
    )

    expect(screen.queryByTestId('label-print-status-error')).not.toBeInTheDocument()

    await user.selectOptions(screen.getByTestId('workbench-carrier-select'), 'dhl')
    await user.click(screen.getByTestId('create-label-button'))

    expect(onCreateLabel).toHaveBeenCalledWith('dhl')
  })
})
