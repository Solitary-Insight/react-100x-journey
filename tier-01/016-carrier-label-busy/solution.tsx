import { useState } from "react"

export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type CarrierLabelBusyFormProps = {
  isPrinting: boolean
  onCreateLabel: (carrier: CarrierCode) => void
}

export function CarrierLabelBusyForm(_props: CarrierLabelBusyFormProps) {
  const [carrier, setCarrier] = useState('')
  const { isPrinting, onCreateLabel } = _props
  return (
    <section className="carrier-label-busy-form" data-testid="carrier-label-busy-form">
      <label htmlFor="busy-label-carrier"> Carrier </label>
      <select disabled={isPrinting}
        value={carrier}
        onChange={(e) => setCarrier(e.target.value as CarrierCode)} id="busy-label-carrier" className="carrier-label-busy-form__select" data-testid="busy-label-carrier-select">
        <option value="ups">UPS</option>
        <option value="fedex">FedEx</option>
        <option value="dhl">DHL</option>
      </select>

      <button disabled={isPrinting}
        onClick={() => onCreateLabel(carrier)} className="carrier-label-busy-form__create" data-testid="create-label-button" type="button">Create label</button>
    </section>
  )
}
