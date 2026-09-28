export type FulfillmentStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type FulfillmentBannerProps = {
  status: FulfillmentStatus
  orderId: string
  trackingNumber?: string
}

export function FulfillmentBanner(_props: FulfillmentBannerProps) {
  return null
}
