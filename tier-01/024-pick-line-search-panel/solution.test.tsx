import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PickLineSearchPanel } from './solution'

const lines = [
  { id: 'a', label: 'Widget Pro' },
  { id: 'b', label: 'Gadget Lite' },
  { id: 'c', label: 'Widget Basic' },
]

describe('PickLineSearchPanel', () => {
  it('shows all lines before typing', () => {
    render(<PickLineSearchPanel lines={lines} />)

    expect(screen.getByTestId('pick-line-search-input')).toHaveValue('')
    expect(screen.getByTestId('pick-line-a')).toBeInTheDocument()
    expect(screen.getByTestId('pick-line-b')).toBeInTheDocument()
  })

  it('filters as the user types', async () => {
    const user = userEvent.setup()
    render(<PickLineSearchPanel lines={lines} />)

    await user.type(screen.getByTestId('pick-line-search-input'), 'widget')

    expect(screen.getByTestId('pick-line-a')).toBeInTheDocument()
    expect(screen.getByTestId('pick-line-c')).toBeInTheDocument()
    expect(screen.queryByTestId('pick-line-b')).not.toBeInTheDocument()
  })

  it('shows empty state when filter matches nothing', async () => {
    const user = userEvent.setup()
    render(<PickLineSearchPanel lines={lines} />)

    await user.type(screen.getByTestId('pick-line-search-input'), 'zzzz')

    expect(screen.getByTestId('pick-line-empty')).toBeInTheDocument()
    expect(screen.queryByTestId('pick-line-list')).not.toBeInTheDocument()
  })

  it('associates the search label with the input', () => {
    render(<PickLineSearchPanel lines={lines} />)

    expect(screen.getByLabelText('Search pick lines')).toBe(screen.getByTestId('pick-line-search-input'))
  })
})
