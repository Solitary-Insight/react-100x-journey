import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { PickLineSelectList } from './solution'

const lines = [
  { id: 'a', label: 'Widget Pro' },
  { id: 'b', label: 'Gadget Lite' },
]

describe('PickLineSelectList', () => {
  it('marks the selected line with aria-pressed', () => {
    render(<PickLineSelectList lines={lines} selectedId="b" onSelect={() => {}} />)

    expect(screen.getByTestId('pick-line-select-a')).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByTestId('pick-line-select-b')).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onSelect when a line is clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(<PickLineSelectList lines={lines} selectedId={null} onSelect={onSelect} />)

    await user.click(screen.getByTestId('pick-line-select-a'))

    expect(onSelect).toHaveBeenCalledWith('a')
  })

  it('renders an empty list when there are no lines', () => {
    render(<PickLineSelectList lines={[]} selectedId={null} onSelect={() => {}} />)

    const list = screen.getByTestId('pick-line-select-list')
    expect(list).toBeEmptyDOMElement()
  })
})
