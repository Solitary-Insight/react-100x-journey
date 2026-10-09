import type { SkuHit } from './skuSearchApi'

export type LookupStatus = 'idle' | 'loading' | 'success' | 'error'

export type WarehouseOption = {
  id: string
  label: string
}

export type InventoryLookupViewProps = {
  warehouseId: string
  warehouses: WarehouseOption[]
  onWarehouseChange: (id: string) => void
  query: string
  onQueryChange: (value: string) => void
  status: LookupStatus
  errorMessage: string | null
  hits: SkuHit[]
}

/** Presentational shell — do not edit; wire props from your container logic. */
export function InventoryLookupView({
  warehouseId,
  warehouses,
  onWarehouseChange,
  query,
  onQueryChange,
  status,
  errorMessage,
  hits,
}: InventoryLookupViewProps) {
  return (
    <section aria-label="Inventory lookup">
      <label>
        Warehouse
        <select
          aria-label="Warehouse"
          value={warehouseId}
          onChange={(e) => onWarehouseChange(e.target.value)}
        >
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Search SKUs
        <input
          aria-label="Search SKUs"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>

      {status === 'loading' && <p role="status">Loading results…</p>}
      {status === 'error' && errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}
      {status === 'success' && hits.length === 0 && (
        <p role="status">No SKUs match this search.</p>
      )}
      {status === 'success' && hits.length > 0 && (
        <ul aria-label="SKU results">
          {hits.map((hit) => (
            <li key={hit.sku}>
              {hit.sku} — {hit.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
