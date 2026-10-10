import { useState, useTransition } from 'react'
import type { PickLine } from './PickListView'

export type UsePickListFilterResult = {
  query: string
  onQueryChange: (next: string) => void
  visibleLines: PickLine[]
  isPending: boolean
}

export function usePickListFilter(_lines: PickLine[]): UsePickListFilterResult {
  const [query,setQuery]=useState('')
  const [visibleLines,setVisibleLines]=useState(_lines)
  const [isPending,startTransition]=useTransition()


  function onQueryChange(q:string){
    setQuery(q)

    startTransition(()=>{
      const trimmed=q.trim()
      const filtered=trimmed.length==0?_lines:_lines.filter(l=> l.label.toLowerCase().includes(trimmed.toLowerCase()))
      setVisibleLines(filtered)
    })

  }

  return {
    query,
    onQueryChange,
    visibleLines,
    isPending,
  }
}
