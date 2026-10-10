import { useState } from 'react'
import { DebouncedSkuSearchView } from './DebouncedSkuSearchView'
import { useDebouncedValue } from './useDebouncedValue'

export type DebouncedSkuSearchProps = {
  delayMs: number
}

export function DebouncedSkuSearch({ delayMs }: DebouncedSkuSearchProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, delayMs)

  return (
    <DebouncedSkuSearchView
      query={query}
      onQueryChange={setQuery}
      debouncedQuery={debouncedQuery}
    />
  )
}
