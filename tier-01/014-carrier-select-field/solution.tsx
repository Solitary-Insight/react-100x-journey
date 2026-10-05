export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type CarrierSelectFieldProps = {
  id: string
  label: string
  value: CarrierCode
  onChange: (next: CarrierCode) => void
}

export function CarrierSelectField(_props: CarrierSelectFieldProps) {
  return null
}
