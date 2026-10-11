export type SkuHit = {
  sku: string
  title: string
}

export type ComposedSkuLookupViewProps = {
  warehouseId: string
  onWarehouseChange: (id: string) => void
  query: string
  onQueryChange: (value: string) => void
  status: 'idle' | 'loading' | 'success' | 'error'
  errorMessage: string | null
  hits: SkuHit[]
}

const warehouses = [
  { id: 'east', label: 'East' },
  { id: 'west', label: 'West' },
]

/** Presentational UI — do not edit. */
export function ComposedSkuLookupView({
  warehouseId,
  onWarehouseChange,
  query,
  onQueryChange,
  status,
  errorMessage,
  hits,
}: ComposedSkuLookupViewProps) {
  return (
    <section aria-label="Composed SKU lookup">
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
        Search
        <input
          aria-label="Search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
      {status === 'loading' && <p role="status">Searching…</p>}
      {status === 'error' && errorMessage && <p role="alert">{errorMessage}</p>}
      {status === 'success' && hits.length > 0 && (
        <ul aria-label="SKU hits">
          {hits.map((h) => (
            <li key={h.sku}>{h.sku} — {h.title}</li>
          ))}
        </ul>
      )}
      {status === 'success' && hits.length === 0 && (
        <p role="status">No matches</p>
      )}
    </section>
  )
}
