import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { SkuLookupField } from './solution'

describe('SkuLookupField', () => {
  it('associates label with input via useId', () => {
    render(<SkuLookupField label="SKU" value="" onChange={() => {}} />)

    const input = screen.getByLabelText('SKU')
    expect(input).toHaveAttribute('id')
    expect(input).toHaveAttribute('data-testid', 'sku-lookup-input')
  })

  it('supports two instances without id collision', () => {
    render(
      <>
        <SkuLookupField label="Primary SKU" value="" onChange={() => {}} />
        <SkuLookupField label="Alternate SKU" value="" onChange={() => {}} />
      </>,
    )

    expect(screen.getByLabelText('Primary SKU')).not.toBe(screen.getByLabelText('Alternate SKU'))
    const ids = [
      screen.getByLabelText('Primary SKU').id,
      screen.getByLabelText('Alternate SKU').id,
    ]
    expect(ids[0]).not.toBe(ids[1])
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function Harness() {
      const [value, setValue] = useState('')
      return (
        <SkuLookupField
          label="SKU"
          value={value}
          onChange={(next) => {
            onChange(next)
            setValue(next)
          }}
        />
      )
    }

    render(<Harness />)

    await user.type(screen.getByLabelText('SKU'), 'ABC')

    expect(onChange).toHaveBeenCalled()
    expect(screen.getByLabelText('SKU')).toHaveValue('ABC')
  })
})
