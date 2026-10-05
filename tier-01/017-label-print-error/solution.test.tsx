import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LabelPrintError } from './solution'

describe('LabelPrintError', () => {
  it('renders nothing when message is null', () => {
    const { container } = render(<LabelPrintError message={null} />)

    expect(screen.queryByTestId('label-print-error')).not.toBeInTheDocument()
    expect(container).toBeEmptyDOMElement()
  })

  it('shows alert with message when provided', () => {
    render(<LabelPrintError message="Printer offline" />)

    const alert = screen.getByTestId('label-print-error')
    expect(alert).toHaveTextContent('Printer offline')
    expect(alert).toHaveAttribute('role', 'alert')
    expect(alert).toHaveClass('label-print-error')
  })
})
