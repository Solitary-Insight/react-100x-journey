import type { PickLine } from './PickListView'

export type UsePickListFilterResult = {
  query: string
  onQueryChange: (next: string) => void
  visibleLines: PickLine[]
  isPending: boolean
}

export function usePickListFilter(_lines: PickLine[]): UsePickListFilterResult {
  return {
    query: '',
    onQueryChange: () => {},
    visibleLines: [],
    isPending: false,
  }
}
