import type { SkuHit } from './skuLookupApi'

export type ComposedSkuLookupStatus = 'idle' | 'loading' | 'success' | 'error'

export type UseComposedSkuLookupResult = {
  warehouseId: string
  setWarehouseId: (id: string) => void
  query: string
  setQuery: (value: string) => void
  status: ComposedSkuLookupStatus
  errorMessage: string | null
  hits: SkuHit[]
}

export function useComposedSkuLookup(): UseComposedSkuLookupResult {
  return {
    warehouseId: 'east',
    setWarehouseId: () => {},
    query: '',
    setQuery: () => {},
    status: 'idle',
    errorMessage: null,
    hits: [],
  }
}
