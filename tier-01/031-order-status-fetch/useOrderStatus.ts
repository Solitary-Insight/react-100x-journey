export type OrderStatus = 'idle' | 'loading' | 'success' | 'error'

export type UseOrderStatusResult = {
  orderId: string
  setOrderId: (id: string) => void
  status: OrderStatus
  trackingNumber: string | null
  errorMessage: string | null
  load: () => void
}

export function useOrderStatus(): UseOrderStatusResult {
  return {
    orderId: '',
    setOrderId: () => {},
    status: 'idle',
    trackingNumber: null,
    errorMessage: null,
    load: () => {},
  }
}
