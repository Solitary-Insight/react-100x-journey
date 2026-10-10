import { render, screen, act, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DebouncedSkuSearch } from './solution'

describe('useDebouncedValue via DebouncedSkuSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows empty debounced label initially', () => {
    render(<DebouncedSkuSearch delayMs={300} />)
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')
  })

  it('updates debounced text only after delay', () => {
    render(<DebouncedSkuSearch delayMs={300} />)
    const input = screen.getByRole('textbox', { name: 'Search' })

    fireEvent.change(input, { target: { value: 'abc' } })

    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')

    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: abc')
  })

  it('resets the timer when typing continues', () => {
    render(<DebouncedSkuSearch delayMs={200} />)
    const input = screen.getByRole('textbox', { name: 'Search' })

    fireEvent.change(input, { target: { value: 'a' } })
    act(() => {
      vi.advanceTimersByTime(150)
    })
    fireEvent.change(input, { target: { value: 'ab' } })

    act(() => {
      vi.advanceTimersByTime(199)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: ab')
  })

  it('mirrors value immediately when delayMs is 0', () => {
    render(<DebouncedSkuSearch delayMs={0} />)
    const input = screen.getByRole('textbox', { name: 'Search' })

    fireEvent.change(input, { target: { value: 'x' } })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: x')
  })
})
