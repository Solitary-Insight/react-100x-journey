export type DebouncedSkuSearchViewProps = {
  query: string
  onQueryChange: (next: string) => void
  debouncedQuery: string
}

/** Presentational UI — do not edit. */
export function DebouncedSkuSearchView({
  query,
  onQueryChange,
  debouncedQuery,
}: DebouncedSkuSearchViewProps) {
  return (
    <section aria-label="Debounced SKU search">
      <label>
        Search
        <input
          aria-label="Search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
      <p role="status">
        Debounced: <strong>{debouncedQuery || '(empty)'}</strong>
      </p>
    </section>
  )
}
