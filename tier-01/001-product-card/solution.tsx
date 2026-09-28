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
 * Problem 001 — implement ProductCard here.
 * Say "done" in chat when ready for grading.
 */
export function ProductCard({name,  sku, priceCents, inStock, onSale, children}: ProductCardProps) {
  const price = (priceCents / 100).toFixed(2);
  const status = inStock ? 'In stock' : 'Out of stock';
  const className = `product-card__status ${
    inStock ? 'product-card__status--in-stock' : ''
  }`;

  return (
    <article className="product-card">
      <h2 className="product-card__title">{name}</h2>
      <p className="product-card__sku">SKU: {sku}</p>
      <p className="product-card__price" data-testid="price">
        ${price}
      </p>
      <p className={className}>{status}</p>

      {onSale ? (
        <span className="product-card__sale-badge">Sale</span>
      ) : null}

      {children && <footer className="product-card__footer">{children}</footer>}
    </article>
  );
}