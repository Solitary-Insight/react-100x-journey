import { ComposedSkuLookupView } from './ComposedSkuLookupView'
import { useComposedSkuLookup } from './useComposedSkuLookup'

export function ComposedSkuLookupPanel() {
  const lookup = useComposedSkuLookup()

  return (
    <ComposedSkuLookupView
      warehouseId={lookup.warehouseId}
      onWarehouseChange={lookup.setWarehouseId}
      query={lookup.query}
      onQueryChange={lookup.setQuery}
      status={lookup.status}
      errorMessage={lookup.errorMessage}
      hits={lookup.hits}
    />
  )
}
