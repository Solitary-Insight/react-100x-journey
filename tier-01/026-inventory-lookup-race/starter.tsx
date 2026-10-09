import type { WarehouseOption } from './InventoryLookupView'

export type InventoryLookupProps = {
  warehouseId: string
  warehouses: WarehouseOption[]
  onWarehouseChange: (nextWarehouseId: string) => void
}

export function InventoryLookup(_props: InventoryLookupProps) {
  return null
}
