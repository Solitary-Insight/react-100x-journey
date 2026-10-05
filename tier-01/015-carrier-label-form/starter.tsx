export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type CarrierLabelFormProps = {
  onCreateLabel: (carrier: CarrierCode) => void
}

export function CarrierLabelForm(_props: CarrierLabelFormProps) {
  return null
}
