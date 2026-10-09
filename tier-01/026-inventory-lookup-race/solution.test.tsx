import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { InventoryLookup } from './solution'
import { __setSkuSearchImplForTests, type SkuHit } from './skuSearchApi'

const warehouses = [
  { id: 'east', label: 'East DC' },
  { id: 'west', label: 'West DC' },
]

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

afterEach(() => {
  __setSkuSearchImplForTests(null)
  vi.useRealTimers()
})

describe('InventoryLookup', () => {
  it('stays idle with an empty query', () => {
    render(
      <InventoryLookup
        warehouseId="east"
        warehouses={warehouses}
        onWarehouseChange={() => {}}
      />,
    )

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'SKU results' })).not.toBeInTheDocument()
  })

  it('shows hits after a successful search', async () => {
    const user = userEvent.setup()
    render(
      <InventoryLookup
        warehouseId="east"
        warehouses={warehouses}
        onWarehouseChange={() => {}}
      />,
    )

    await user.type(screen.getByRole('textbox', { name: 'Search SKUs' }), 'pallet')

    await waitFor(() => {
      expect(screen.getByRole('list', { name: 'SKU results' })).toBeInTheDocument()
    })
    expect(screen.getByText(/E-100/)).toBeInTheDocument()
  })

  it('does not apply stale results when a newer query finishes first', async () => {
    const user = userEvent.setup({ delay: null })

    __setSkuSearchImplForTests(async (_warehouseId, query, signal) => {
      if (query === 'slow') {
        await delay(120)
      } else {
        await delay(10)
      }
      if (signal.aborted) {
        throw new DOMException('Aborted', 'AbortError')
      }
      const hit: SkuHit = { sku: query, title: `Title ${query}` }
      return [hit]
    })

    render(
      <InventoryLookup
        warehouseId="east"
        warehouses={warehouses}
        onWarehouseChange={() => {}}
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Search SKUs' })

    await user.type(input, 'slow')
    await user.clear(input)
    await user.type(input, 'fast')

    await waitFor(() => {
      expect(screen.getByText(/fast — Title fast/)).toBeInTheDocument()
    })
    expect(screen.queryByText(/slow — Title slow/)).not.toBeInTheDocument()
  })

  it('clears results when warehouse prop changes', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <InventoryLookup
        warehouseId="east"
        warehouses={warehouses}
        onWarehouseChange={() => {}}
      />,
    )

    await user.type(screen.getByRole('textbox', { name: 'Search SKUs' }), 'pallet')
    await waitFor(() => {
      expect(screen.getByText(/E-100/)).toBeInTheDocument()
    })

    rerender(
      <InventoryLookup
        warehouseId="west"
        warehouses={warehouses}
        onWarehouseChange={() => {}}
      />,
    )

    expect(screen.getByRole('textbox', { name: 'Search SKUs' })).toHaveValue('')
    expect(screen.queryByText(/E-100/)).not.toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'SKU results' })).not.toBeInTheDocument()
  })
})
