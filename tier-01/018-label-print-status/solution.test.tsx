import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LabelPrintStatus } from './solution'

describe('LabelPrintStatus', () => {
  it('renders nothing when idle', () => {
    const { container } = render(<LabelPrintStatus status={{ kind: 'idle' }} />)

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByTestId('label-print-status-error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('label-print-status-success')).not.toBeInTheDocument()
  })

  it('shows error alert with message', () => {
    render(<LabelPrintStatus status={{ kind: 'error', message: 'Paper jam' }} />)

    const el = screen.getByTestId('label-print-status-error')
    expect(el).toHaveTextContent('Paper jam')
    expect(el).toHaveAttribute('role', 'alert')
    expect(el).toHaveClass('label-print-status--error')
  })

  it('shows success status with message', () => {
    render(<LabelPrintStatus status={{ kind: 'success', message: 'Label sent' }} />)

    const el = screen.getByTestId('label-print-status-success')
    expect(el).toHaveTextContent('Label sent')
    expect(el).toHaveAttribute('role', 'status')
    expect(el).toHaveClass('label-print-status--success')
  })
})
