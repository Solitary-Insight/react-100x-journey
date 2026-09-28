import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductCard } from './solution'

describe('ProductCard', () => {
  it('renders name, sku, and formatted price', () => {
    render(
      <ProductCard
        name="Hydraulic Seal Kit"
        sku="HSK-4402"
        priceCents={1299}
        inStock={true}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Hydraulic Seal Kit' })).toBeInTheDocument()
    expect(screen.getByText('SKU: HSK-4402')).toBeInTheDocument()
    expect(screen.getByTestId('price')).toHaveTextContent('$12.99')
  })

  it('shows in-stock status with modifier class', () => {
    render(
      <ProductCard name="Bolt" sku="B-1" priceCents={100} inStock={true} />,
    )
    const status = screen.getByText('In stock')
    expect(status).toHaveClass('product-card__status', 'product-card__status--in-stock')
  })

  it('shows out of stock without in-stock modifier', () => {
    render(
      <ProductCard name="Bolt" sku="B-1" priceCents={100} inStock={false} />,
    )
    const status = screen.getByText('Out of stock')
    expect(status).toHaveClass('product-card__status')
    expect(status).not.toHaveClass('product-card__status--in-stock')
  })

  it('shows sale badge when onSale is true', () => {
    render(
      <ProductCard
        name="Gasket"
        sku="G-9"
        priceCents={500}
        inStock={true}
        onSale={true}
      />,
    )
    expect(screen.getByText('Sale')).toHaveClass('product-card__sale-badge')
  })

  it('does not show sale badge when onSale is omitted', () => {
    render(
      <ProductCard name="Gasket" sku="G-9" priceCents={500} inStock={true} />,
    )
    expect(screen.queryByText('Sale')).not.toBeInTheDocument()
  })

  it('renders children in footer when provided', () => {
    render(
      <ProductCard name="X" sku="X-1" priceCents={0} inStock={true}>
        <button type="button">Add to cart</button>
      </ProductCard>,
    )
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeInTheDocument()
    expect(screen.getByRole('button').parentElement).toHaveClass('product-card__footer')
  })

  it('omits footer when children are not provided', () => {
    const { container } = render(
      <ProductCard name="X" sku="X-1" priceCents={0} inStock={true} />,
    )
    expect(container.querySelector('.product-card__footer')).toBeNull()
  })
})
