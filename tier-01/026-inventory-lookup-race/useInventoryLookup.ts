import { useEffect, useState } from 'react'
import type { LookupStatus } from './InventoryLookupView'
import { searchSkus, type SkuHit } from './skuSearchApi'

export type UseInventoryLookupParams = {
  warehouseId: string
  onWarehouseChange: (nextWarehouseId: string) => void
}

export type UseInventoryLookupResult = {
  query: string
  onQueryChange: (value: string) => void
  status: LookupStatus
  errorMessage: string | null
  hits: SkuHit[]
  onWarehouseChange: (nextWarehouseId: string) => void
}

export function useInventoryLookup({
  warehouseId,
  onWarehouseChange,
}: UseInventoryLookupParams): UseInventoryLookupResult {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<LookupStatus>('idle')
  const [hits, setHits] = useState<SkuHit[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setQuery('')
    setStatus('idle')
    setHits([])
    setErrorMessage(null)
  }, [warehouseId])

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length === 0) {
      setStatus('idle')
      setHits([])
      setErrorMessage(null)
      return
    }

    const controller = new AbortController()

    async function runSearch() {
      try {
        setStatus('loading')
        setErrorMessage(null)
        const rows = await searchSkus(warehouseId, trimmed, controller.signal)
        setHits(rows)
        setStatus('success')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        setStatus('error')
        setErrorMessage('Search failed')
      }
    }

    void runSearch()

    return () => {
      controller.abort()
    }
  }, [query, warehouseId])

  return {
    query,
    onQueryChange: setQuery,
    status,
    errorMessage,
    hits,
    onWarehouseChange,
  }
}
