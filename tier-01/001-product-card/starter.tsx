import type { ReactNode } from 'react'

export type ProductCardProps = {
  name: string
  sku: string
  priceCents: number
  inStock: boolean
  onSale?: boolean
  children?: ReactNode
}

/**
 * Reference types for Problem 001.
 * Implement ProductCard in solution.tsx — do not submit this file.
 */
export function ProductCard(_props: ProductCardProps) {
  return null
}
