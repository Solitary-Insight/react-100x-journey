export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type CarrierSelectFieldProps = {
  id: string
  label: string
  value: CarrierCode
  onChange: (next: CarrierCode) => void
}

export function CarrierSelectField({ id, label, value, onChange }: CarrierSelectFieldProps) {
  return (
    <div className="carrier-select-field">
      <label className="carrier-select-field__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="carrier-select-field__select"
        data-testid="carrier-select"
        value={value}
        onChange={(e) => onChange(e.target.value as CarrierCode)}
      >
        <option value="ups">UPS</option>
        <option value="fedex">FedEx</option>
        <option value="dhl">DHL</option>
      </select>
    </div>
  )
}