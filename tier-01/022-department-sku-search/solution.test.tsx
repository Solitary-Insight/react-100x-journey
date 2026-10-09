import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { DepartmentSkuSearch } from './solution'

describe('DepartmentSkuSearch', () => {
  it('associates label with input via useId', () => {
    render(
      <DepartmentSkuSearch
        departmentId="dept-a"
        label="Search SKUs"
        value=""
        onChange={() => {}}
      />,
    )

    expect(screen.getByTestId('department-sku-search-input')).toBe(screen.getByLabelText('Search SKUs'))
  })

  it('does not call onChange on initial mount when value is non-empty', () => {
    const onChange = vi.fn()

    render(
      <DepartmentSkuSearch
        departmentId="dept-a"
        label="Search SKUs"
        value="widget"
        onChange={onChange}
      />,
    )

    expect(onChange).not.toHaveBeenCalled()
  })

  it('clears search when departmentId changes', () => {
    const onChange = vi.fn()

    const { rerender } = render(
      <DepartmentSkuSearch
        departmentId="dept-a"
        label="Search SKUs"
        value="widget"
        onChange={onChange}
      />,
    )

    rerender(
      <DepartmentSkuSearch
        departmentId="dept-b"
        label="Search SKUs"
        value="widget"
        onChange={onChange}
      />,
    )

    expect(onChange).toHaveBeenCalledWith('')
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function Harness() {
      const [value, setValue] = useState('')
      return (
        <DepartmentSkuSearch
          departmentId="dept-a"
          label="Search SKUs"
          value={value}
          onChange={(next) => {
            onChange(next)
            setValue(next)
          }}
        />
      )
    }

    render(<Harness />)

    await user.type(screen.getByLabelText('Search SKUs'), 'x')

    expect(onChange).toHaveBeenCalled()
    expect(screen.getByLabelText('Search SKUs')).toHaveValue('x')
  })
})
