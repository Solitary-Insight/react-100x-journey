import { useId } from "react"

export type SkuLookupFieldProps = {
  label: string
  value: string
  onChange: (next: string) => void
}



  export function SkuLookupField({ label, value, onChange }: SkuLookupFieldProps) {
    const inputId = useId()
  
    return (
      <div className="sku-lookup-field">
        <label className="sku-lookup-field__label" htmlFor={inputId}>
          {label}
        </label>
        <input
          id={inputId}
          className="sku-lookup-field__input"
          data-testid="sku-lookup-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    )
  }