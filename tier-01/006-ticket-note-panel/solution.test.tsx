import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TicketNotePanel } from './solution'

describe('TicketNotePanel', () => {
  it('renders panel shell and labeled field', () => {
    render(<TicketNotePanel />)

    expect(screen.getByTestId('ticket-note-panel')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Escalation note' })).toBeInTheDocument()
    expect(screen.getByLabelText('Note for tier-2')).toHaveAttribute('id', 'escalation-note')
  })

  it('updates note and counter when user types', async () => {
    const user = userEvent.setup()
    render(<TicketNotePanel />)

    const field = screen.getByLabelText('Note for tier-2')
    await user.type(field, 'ping')

    expect(field).toHaveValue('ping')
    expect(screen.getByTestId('char-counter')).toHaveTextContent('4 / 200')
  })

  it('clears note when Clear is clicked', async () => {
    const user = userEvent.setup()
    render(<TicketNotePanel />)

    const field = screen.getByLabelText('Note for tier-2')
    await user.type(field, 'draft text')
    await user.click(screen.getByTestId('clear-note'))

    expect(field).toHaveValue('')
    expect(screen.getByTestId('char-counter')).toHaveTextContent('0 / 200')
  })
})
