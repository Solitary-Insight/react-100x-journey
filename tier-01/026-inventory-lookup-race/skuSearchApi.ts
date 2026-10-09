export type SkuHit = {
  sku: string
  title: string
}

const CATALOG: Record<string, SkuHit[]> = {
  east: [
    { sku: 'E-100', title: 'East pallet wrap' },
    { sku: 'E-200', title: 'East shipping label roll' },
  ],
  west: [
    { sku: 'W-100', title: 'West pallet wrap' },
    { sku: 'W-300', title: 'West cold-chain liner' },
  ],
}

export type SkuSearchFn = (
  warehouseId: string,
  query: string,
  signal: AbortSignal,
) => Promise<SkuHit[]>

let searchImpl: SkuSearchFn = defaultSearch

function defaultSearch(
  warehouseId: string,
  query: string,
  signal: AbortSignal,
): Promise<SkuHit[]> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      if (signal.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }
      const rows = CATALOG[warehouseId] ?? []
      const needle = query.toLowerCase()
      resolve(
        rows.filter(
          (row) =>
            row.sku.toLowerCase().includes(needle) ||
            row.title.toLowerCase().includes(needle),
        ),
      )
    }, 40)

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

export function searchSkus(
  warehouseId: string,
  query: string,
  signal: AbortSignal,
): Promise<SkuHit[]> {
  return searchImpl(warehouseId, query, signal)
}

/** Test-only hook to simulate slow networks and race bugs. */
export function __setSkuSearchImplForTests(next: SkuSearchFn | null): void {
  searchImpl = next ?? defaultSearch
}
