import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { WarehouseScanInput } from './solution'

describe('WarehouseScanInput', () => {
  it('focuses the scan input on mount', () => {
    render(<WarehouseScanInput onScan={() => {}} />)

    expect(screen.getByTestId('warehouse-scan-input')).toHaveFocus()
  })

  it('submits trimmed code and clears input', async () => {
    const user = userEvent.setup()
    const onScan = vi.fn()

    render(<WarehouseScanInput onScan={onScan} />)

    const input = screen.getByTestId('warehouse-scan-input')
    await user.type(input, '  BIN-42  ')
    await user.click(screen.getByTestId('warehouse-scan-submit'))

    expect(onScan).toHaveBeenCalledWith('BIN-42')
    expect(input).toHaveValue('')
  })

  it('ignores whitespace-only submit', async () => {
    const user = userEvent.setup()
    const onScan = vi.fn()

    render(<WarehouseScanInput onScan={onScan} />)

    await user.type(screen.getByTestId('warehouse-scan-input'), '   ')
    await user.click(screen.getByTestId('warehouse-scan-submit'))

    expect(onScan).not.toHaveBeenCalled()
  })
})
