import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ComposedSkuLookupPanel } from './solution'

describe('ComposedSkuLookupPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('searches after debounce', async () => {
    render(<ComposedSkuLookupPanel />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), {
      target: { value: 'wrap' },
    })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    await waitFor(() => {
      expect(screen.getByText(/E-1/)).toBeInTheDocument()
    })
  })

  it('clears when warehouse changes', async () => {
    render(<ComposedSkuLookupPanel />)
    fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), {
      target: { value: 'wrap' },
    })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    await waitFor(() => {
      expect(screen.getByText(/E-1/)).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole('combobox', { name: 'Warehouse' }), {
      target: { value: 'west' },
    })
    expect(screen.queryByText(/E-1/)).not.toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('')
  })
})
