import type { LookupStatus } from './InventoryLookupView'
import type { SkuHit } from './skuSearchApi'

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

export function useInventoryLookup(
  _params: UseInventoryLookupParams,
): UseInventoryLookupResult {
  return {
    query: '',
    onQueryChange: () => {},
    status: 'idle',
    errorMessage: null,
    hits: [],
    onWarehouseChange: () => {},
  }
}
