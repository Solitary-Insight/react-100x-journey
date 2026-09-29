import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SupportTicketShell } from './solution'

describe('SupportTicketShell', () => {
  it('renders title and children in the body', () => {
    render(
      <SupportTicketShell title="Ticket #8812">
        <p>Customer cannot reset password.</p>
      </SupportTicketShell>,
    )

    expect(screen.getByTestId('support-ticket-shell')).toHaveClass('support-ticket-shell')
    expect(screen.getByTestId('ticket-title')).toHaveTextContent('Ticket #8812')
    expect(screen.getByTestId('ticket-body')).toHaveTextContent('Customer cannot reset password.')
    expect(screen.queryByTestId('ticket-actions')).not.toBeInTheDocument()
  })

  it('renders actions footer when actions slot is provided', () => {
    render(
      <SupportTicketShell
        title="Ticket #99"
        actions={
          <button type="button">
            Resolve
          </button>
        }
      >
        <span>Details here</span>
      </SupportTicketShell>,
    )

    const footer = screen.getByTestId('ticket-actions')
    expect(footer).toHaveClass('support-ticket-shell__actions')
    expect(footer).toHaveTextContent('Resolve')
  })

  it('omits actions footer when actions prop is omitted', () => {
    const { container } = render(
      <SupportTicketShell title="T">
        <div>Only body</div>
      </SupportTicketShell>,
    )

    expect(container.querySelector('footer.support-ticket-shell__actions')).toBeNull()
  })
})
