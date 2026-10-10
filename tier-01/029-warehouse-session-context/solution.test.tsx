import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useRef } from 'react'
import { WarehouseSessionPanel } from './WarehouseSessionPanel'
import {
  WarehouseSessionProvider,
  useWarehouseDockId,
  useWarehouseOperatorName,
} from './warehouseSession'

function OperatorRenderCounter() {
  const name = useWarehouseOperatorName()
  const renders = useRef(0)
  renders.current += 1
  return (
    <span data-testid="operator-render-count" data-count={renders.current}>
      {name}
    </span>
  )
}

function DockReadout() {
  const dockId = useWarehouseDockId()
  return <span data-testid="dock-readout">{dockId}</span>
}

describe('WarehouseSessionPanel', () => {
  it('updates operator and dock fields', () => {
    render(
      <WarehouseSessionProvider>
        <WarehouseSessionPanel />
      </WarehouseSessionProvider>,
    )

    fireEvent.change(screen.getByRole('textbox', { name: 'Operator name' }), {
      target: { value: 'Haseeb' },
    })
    fireEvent.change(screen.getByRole('textbox', { name: 'Dock ID' }), {
      target: { value: 'D-12' },
    })

    expect(screen.getByTestId('session-operator')).toHaveTextContent('Haseeb')
    expect(screen.getByTestId('session-dock')).toHaveTextContent('D-12')
  })

  it('does not re-render operator-only subscriber when dock changes', () => {
    render(
      <WarehouseSessionProvider>
        <OperatorRenderCounter />
        <DockReadout />
        <WarehouseSessionPanel />
      </WarehouseSessionProvider>,
    )

    const counter = screen.getByTestId('operator-render-count')
    const rendersAfterMount = Number(counter.getAttribute('data-count'))

    fireEvent.change(screen.getByRole('textbox', { name: 'Dock ID' }), {
      target: { value: 'D-99' },
    })

    expect(screen.getByTestId('dock-readout')).toHaveTextContent('D-99')
    expect(Number(counter.getAttribute('data-count'))).toBe(rendersAfterMount)
  })
})
