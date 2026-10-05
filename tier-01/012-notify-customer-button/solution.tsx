export type NotifyCustomerButtonProps = {
  customerName: string
  onNotify: () => void
  disabled?: boolean
}

export function NotifyCustomerButton({
  customerName,
  onNotify,
  disabled = false,
}: NotifyCustomerButtonProps) {
  return (
    <button
      type="button"
      className="notify-customer-button"
      data-testid="notify-customer-button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) onNotify()
      }}
    >
      Notify {customerName}
    </button>
  )
}