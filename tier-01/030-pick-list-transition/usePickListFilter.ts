import { useEffect, useState, useTransition } from 'react'
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

      const filtered=_lines.filter(l=>l.label.includes(query.trim()))
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
