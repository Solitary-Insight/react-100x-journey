export type PickLine = {
  id: string
  label: string
}

export type PickListViewProps = {
  query: string
  onQueryChange: (next: string) => void
  visibleLines: PickLine[]
  isPending: boolean
}

/** Presentational UI — do not edit. */
export function PickListView({
  query,
  onQueryChange,
  visibleLines,
  isPending,
}: PickListViewProps) {
  return (
    <section aria-label="Pick list filter">
      <label>
        Filter picks
        <input
          aria-label="Filter picks"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
      {isPending && <p role="status">Updating list…</p>}
      <ul aria-label="Visible picks">
        {visibleLines.map((line) => (
          <li key={line.id}>{line.label}</li>
        ))}
      </ul>
      {visibleLines.length === 0 && !isPending && (
        <p role="status">No picks match</p>
      )}
    </section>
  )
}
