export type OrderStatus = 'idle' | 'loading' | 'success' | 'error'

export type OrderStatusViewProps = {
  orderId: string
  onOrderIdChange: (id: string) => void
  status: OrderStatus
  trackingNumber: string | null
  errorMessage: string | null
  onLoad: () => void
}

/** Presentational UI — do not edit. */
export function OrderStatusView({
  orderId,
  onOrderIdChange,
  status,
  trackingNumber,
  errorMessage,
  onLoad,
}: OrderStatusViewProps) {
  return (
    <section aria-label="Order status lookup">
      <label>
        Order ID
        <input
          aria-label="Order ID"
          value={orderId}
          onChange={(e) => onOrderIdChange(e.target.value)}
        />
      </label>
      <button type="button" onClick={onLoad} disabled={status === 'loading'}>
        Load status
      </button>
      {status === 'loading' && <p role="status">Loading order…</p>}
      {status === 'success' && trackingNumber && (
        <p role="status">Tracking: {trackingNumber}</p>
      )}
      {status === 'error' && errorMessage && <p role="alert">{errorMessage}</p>}
    </section>
  )
}
