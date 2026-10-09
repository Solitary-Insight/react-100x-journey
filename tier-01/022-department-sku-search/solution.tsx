export type DepartmentSkuSearchProps = {
  departmentId: string
  label: string
  value: string
  onChange: (next: string) => void
}
import { useEffect, useId, useRef } from 'react'

export function DepartmentSkuSearch({
  departmentId,
  label,
  value,
  onChange,
}: DepartmentSkuSearchProps) {
  const inputId = useId()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onChange('')
  }, [departmentId])

  return (
    <div className="department-sku-search" data-testid="department-sku-search">
      <label className="department-sku-search__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="department-sku-search__input"
        data-testid="department-sku-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}