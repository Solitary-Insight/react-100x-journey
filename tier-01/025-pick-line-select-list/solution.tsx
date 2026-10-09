export type PickLine = {
  id: string
  label: string
}

export type PickLineSelectListProps = {
  lines: PickLine[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function PickLineSelectList({
  lines,
  selectedId,
  onSelect,
}: PickLineSelectListProps) {
  return (
    <ul className="pick-line-select" data-testid="pick-line-select-list">
      {lines.map((line) => (
        <li key={line.id} className="pick-line-select__item">
          <button
            type="button"
            className="pick-line-select__button"
            data-testid={`pick-line-select-${line.id}`}
            aria-pressed={selectedId === line.id}
            onClick={() => onSelect(line.id)}
          >
            {line.label}
          </button>
        </li>
      ))}
    </ul>
  )
}