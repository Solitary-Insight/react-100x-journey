import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SupportNoteField } from './solution'

describe('SupportNoteField', () => {
  it('associates label with textarea', () => {
    render(
      <SupportNoteField
        id="note-1"
        label="Internal note"
        value=""
        maxLength={200}
        onChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('Internal note')).toHaveAttribute('id', 'note-1')
  })

  it('shows character counter from controlled value', () => {
    render(
      <SupportNoteField
        id="n"
        label="Note"
        value="hello"
        maxLength={100}
        onChange={() => {}}
      />,
    )

    expect(screen.getByTestId('char-counter')).toHaveTextContent('5 / 100')
  })

  it('calls onChange with updated string when user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <SupportNoteField
        id="note"
        label="Note"
        value=""
        maxLength={50}
        onChange={onChange}
      />,
    )

    const field = screen.getByLabelText('Note')
    await user.type(field, 'abc')

    expect(onChange).toHaveBeenCalled()
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(lastCall).toBe('abc')
  })

  it('passes maxLength to the textarea', () => {
    render(
      <SupportNoteField
        id="n"
        label="Note"
        value=""
        maxLength={42}
        onChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('Note')).toHaveAttribute('maxLength', '42')
  })
})
