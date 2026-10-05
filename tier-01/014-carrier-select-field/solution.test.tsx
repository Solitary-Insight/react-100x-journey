import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { CarrierSelectField, type CarrierCode } from './solution'

describe('CarrierSelectField', () => {
  it('associates label with select', () => {
    render(
      <CarrierSelectField
        id="carrier-1"
        label="Carrier"
        value="ups"
        onChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('Carrier')).toHaveAttribute('id', 'carrier-1')
    expect(screen.getByTestId('carrier-select')).toHaveValue('ups')
  })

  it('renders all carrier options in order', () => {
    render(
      <CarrierSelectField id="c" label="Carrier" value="ups" onChange={() => {}} />,
    )

    const options = screen.getAllByRole('option')
    expect(options.map((o) => o.textContent)).toEqual(['UPS', 'FedEx', 'DHL'])
    expect(options.map((o) => (o as HTMLOptionElement).value)).toEqual([
      'ups',
      'fedex',
      'dhl',
    ])
  })

  it('calls onChange with selected carrier code', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function Harness() {
      const [value, setValue] = useState<CarrierCode>('ups')
      return (
        <CarrierSelectField
          id="carrier"
          label="Carrier"
          value={value}
          onChange={(next) => {
            onChange(next)
            setValue(next)
          }}
        />
      )
    }

    render(<Harness />)

    await user.selectOptions(screen.getByTestId('carrier-select'), 'fedex')

    expect(onChange).toHaveBeenLastCalledWith('fedex')
    expect(screen.getByTestId('carrier-select')).toHaveValue('fedex')
  })
})
