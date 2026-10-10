import { PickListView, type PickLine } from './PickListView'
import { usePickListFilter } from './usePickListFilter'

export type PickListPanelProps = {
  lines: PickLine[]
}

export function PickListPanel({ lines }: PickListPanelProps) {
  const { query, onQueryChange, visibleLines, isPending } = usePickListFilter(lines)

  return (
    <PickListView
      query={query}
      onQueryChange={onQueryChange}
      visibleLines={visibleLines}
      isPending={isPending}
    />
  )
}
