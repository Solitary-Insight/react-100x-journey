import { OrderStatusView } from './OrderStatusView'
import { useOrderStatus } from './useOrderStatus'

export function OrderStatusPanel() {
  const lookup = useOrderStatus()

  return (
    <OrderStatusView
      orderId={lookup.orderId}
      onOrderIdChange={lookup.setOrderId}
      status={lookup.status}
      trackingNumber={lookup.trackingNumber}
      errorMessage={lookup.errorMessage}
      onLoad={lookup.load}
    />
  )
}
