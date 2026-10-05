export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type CarrierLabelBusyFormProps = {
  isPrinting: boolean
  onCreateLabel: (carrier: CarrierCode) => void
}

export function CarrierLabelBusyForm(_props: CarrierLabelBusyFormProps) {
  return null
}
