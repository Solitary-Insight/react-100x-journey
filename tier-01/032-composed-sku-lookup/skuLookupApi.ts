export type SkuHit = {
  sku: string
  title: string
}

const CATALOG: Record<string, SkuHit[]> = {
  east: [
    { sku: 'E-1', title: 'East wrap' },
    { sku: 'E-2', title: 'East labels' },
  ],
  west: [
    { sku: 'W-1', title: 'West wrap' },
    { sku: 'W-9', title: 'West liner' },
  ],
}

export async function searchSkus(
  warehouseId: string,
  query: string,
  signal: AbortSignal,
): Promise<SkuHit[]> {
  await new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(resolve, 25)
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(id)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
  if (signal.aborted) {
    throw new DOMException('Aborted', 'AbortError')
  }
  const needle = query.trim().toLowerCase()
  const rows = CATALOG[warehouseId] ?? []
  if (needle.length === 0) return []
  return rows.filter(
    (r) => r.sku.toLowerCase().includes(needle) || r.title.toLowerCase().includes(needle),
  )
}
