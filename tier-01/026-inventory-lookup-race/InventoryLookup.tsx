import { InventoryLookupView, type WarehouseOption } from './InventoryLookupView'
import { useInventoryLookup } from './useInventoryLookup'

export type InventoryLookupProps = {
  warehouseId: string
  warehouses: WarehouseOption[]
  onWarehouseChange: (nextWarehouseId: string) => void
}

/** Container wiring — provided; implement logic in `useInventoryLookup.ts`. */
export function InventoryLookup({
  warehouseId,
  warehouses,
  onWarehouseChange,
}: InventoryLookupProps) {
  const lookup = useInventoryLookup({ warehouseId, onWarehouseChange })

  return (
    <InventoryLookupView
      warehouseId={warehouseId}
      warehouses={warehouses}
      onWarehouseChange={lookup.onWarehouseChange}
      query={lookup.query}
      onQueryChange={lookup.onQueryChange}
      status={lookup.status}
      errorMessage={lookup.errorMessage}
      hits={lookup.hits}
    />
  )
}
