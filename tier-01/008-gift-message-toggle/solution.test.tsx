import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { GiftMessageSection } from './solution'

describe('GiftMessageSection', () => {
  it('hides message body until toggle is checked', async () => {
    const user = userEvent.setup()
    render(<GiftMessageSection maxLength={120} />)

    expect(screen.getByTestId('gift-message-section')).toBeInTheDocument()
    expect(screen.queryByTestId('gift-message-body')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('gift-toggle'))

    expect(screen.getByTestId('gift-message-body')).toBeInTheDocument()
    expect(screen.getByLabelText('Gift message')).toHaveValue('')
    expect(screen.getByTestId('gift-char-counter')).toHaveTextContent('0 / 120')
  })

  it('updates message and counter while open', async () => {
    const user = userEvent.setup()
    render(<GiftMessageSection maxLength={50} />)

    await user.click(screen.getByTestId('gift-toggle'))
    const field = screen.getByLabelText('Gift message')
    await user.type(field, 'hi')

    expect(field).toHaveValue('hi')
    expect(screen.getByTestId('gift-char-counter')).toHaveTextContent('2 / 50')
  })

  it('clears message and hides body when toggle is unchecked', async () => {
    const user = userEvent.setup()
    render(<GiftMessageSection maxLength={80} />)

    await user.click(screen.getByTestId('gift-toggle'))
    await user.type(screen.getByLabelText('Gift message'), 'secret')
    await user.click(screen.getByTestId('gift-toggle'))

    expect(screen.queryByTestId('gift-message-body')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('gift-toggle'))
    expect(screen.getByLabelText('Gift message')).toHaveValue('')
    expect(screen.getByTestId('gift-char-counter')).toHaveTextContent('0 / 80')
  })

  it('passes maxLength to the textarea', async () => {
    const user = userEvent.setup()
    render(<GiftMessageSection maxLength={33} />)

    await user.click(screen.getByTestId('gift-toggle'))

    expect(screen.getByLabelText('Gift message')).toHaveAttribute('maxLength', '33')
  })
})
