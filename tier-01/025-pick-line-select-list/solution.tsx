export type PickLine = {
  id: string
  label: string
}

export type PickLineSelectListProps = {
  lines: PickLine[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function PickLineSelectList(_props: PickLineSelectListProps) {
  return null
}
