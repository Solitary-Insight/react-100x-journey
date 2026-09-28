export type FulfillmentStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type FulfillmentBannerProps = {
  status: FulfillmentStatus
  orderId: string
  trackingNumber?: string
}


const statusToClassName = {
  processing: { className: 'banner--processing', text: (orderId: string) => `Order ${orderId} is being prepared.` },
  shipped: { className: 'banner--shipped', text: (orderId: string) => `Order ${orderId} has shipped.` },
  delivered: { className: 'banner--delivered', text: (orderId: string) => `Order ${orderId} was delivered.` },
  cancelled: { className: 'banner--cancelled', text: (orderId: string) => `Order ${orderId} was cancelled.` },
}
/**
 * Problem 003 — implement FulfillmentBanner here.
 */
export function FulfillmentBanner(_props: FulfillmentBannerProps) {
  const { status, orderId, trackingNumber } = _props

  return <div role="status" className={`banner ${statusToClassName[status].className}`} data-testid="fulfillment-banner">
    <p className="banner__message">{statusToClassName[status].text(orderId)}</p>
    {status === 'shipped' && trackingNumber && trackingNumber.length > 0 && <p className="banner__tracking" data-testid="tracking">
      Tracking: {trackingNumber}
    </p>}
  </div>
}
