import { useState } from 'react'

export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type CarrierLabelFormProps = {
  onCreateLabel: (carrier: CarrierCode) => void
}

export function CarrierLabelForm({ onCreateLabel }: CarrierLabelFormProps) {
  const [carrier, setCarrier] = useState<CarrierCode>('ups')

  return (
    <section className="carrier-label-form" data-testid="carrier-label-form">
      <label className="carrier-label-form__label" htmlFor="label-carrier">Carrier</label>
      <select
        id="label-carrier"
        data-testid="label-carrier-select"
        value={carrier}
        onChange={(e) => setCarrier(e.target.value as CarrierCode)}
      >
         <option value="ups">UPS</option>
        <option value="fedex">FedEx</option>
        <option value="dhl">DHL</option>
      </select>
      <button type="button" data-testid="create-label-button" onClick={() => onCreateLabel(carrier)}>
        Create label
      </button>
    </section>
  )
}