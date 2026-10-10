export type OrderStatusResult = {
  trackingNumber: string
}

export async function fetchOrderStatus(
  orderId: string,
  signal: AbortSignal,
): Promise<OrderStatusResult> {
  const delayMs = orderId === 'slow' ? 120 : 30

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      if (signal.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }
      if (orderId.trim().length === 0) {
        reject(new Error('Order ID required'))
        return
      }
      if (orderId === 'fail') {
        reject(new Error('Order not found'))
        return
      }
      resolve({ trackingNumber: `TRK-${orderId}` })
    }, delayMs)

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
