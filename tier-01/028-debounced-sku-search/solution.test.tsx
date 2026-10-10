import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('updates debounced text only after delay', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<DebouncedSkuSearch delayMs={300} />)

    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'abc')

    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')

    await act(async () => {
      vi.advanceTimersByTime(299)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')

    await act(async () => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: abc')
  })

  it('resets the timer when typing continues', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<DebouncedSkuSearch delayMs={200} />)

    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'a')
    await act(async () => {
      vi.advanceTimersByTime(150)
    })
    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'b')

    await act(async () => {
      vi.advanceTimersByTime(199)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: (empty)')

    await act(async () => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: ab')
  })

  it('mirrors value immediately when delayMs is 0', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<DebouncedSkuSearch delayMs={0} />)

    await user.type(screen.getByRole('textbox', { name: 'Search' }), 'x')
    expect(screen.getByRole('status')).toHaveTextContent('Debounced: x')
  })
})
