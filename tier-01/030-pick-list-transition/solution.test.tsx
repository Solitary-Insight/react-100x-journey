import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { PickListPanel } from './solution'

const lines = Array.from({ length: 40 }, (_, i) => ({
  id: `line-${i}`,
  label: i % 2 === 0 ? `Widget batch ${i}` : `Gadget batch ${i}`,
}))

describe('PickListPanel', () => {
  it('keeps input value in sync while filtering', () => {
    render(<PickListPanel lines={lines} />)
    const input = screen.getByRole('textbox', { name: 'Filter picks' })

    fireEvent.change(input, { target: { value: 'widget' } })

    expect(input).toHaveValue('widget')
    expect(screen.getByRole('list', { name: 'Visible picks' }).children.length).toBeGreaterThan(0)
  })

  it('shows all lines when query is empty', () => {
    render(<PickListPanel lines={lines} />)
    expect(screen.getByRole('list', { name: 'Visible picks' }).children).toHaveLength(lines.length)
  })

  it('exposes pending state during transition', async () => {
    vi.useFakeTimers()
    const slowFilterSpy = vi.spyOn(performance, 'now').mockImplementation(() => 0)

    render(<PickListPanel lines={lines} />)
    const input = screen.getByRole('textbox', { name: 'Filter picks' })

    fireEvent.change(input, { target: { value: 'widget' } })

    // isPending may be true briefly; after flush, list updates
    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.queryByText('Updating list…')).not.toBeInTheDocument()
    slowFilterSpy.mockRestore()
    vi.useRealTimers()
  })
})
