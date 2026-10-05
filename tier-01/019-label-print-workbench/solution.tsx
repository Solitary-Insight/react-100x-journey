import { useState } from "react";

export type CarrierCode = 'ups' | 'fedex' | 'dhl'

export type PrintStatus =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; message: string }

export type LabelPrintWorkbenchProps = {
  status: PrintStatus
  isPrinting: boolean
  onCreateLabel: (carrier: CarrierCode) => void
}

export function LabelPrintWorkbench({ status, isPrinting, onCreateLabel }: LabelPrintWorkbenchProps) {
  const [carrier, setCarrier] = useState<CarrierCode>('ups')

  function renderStatus(status){
    switch (status.kind) {
      case 'idle':
        return null
      case 'error':
        return (
          <p role="alert" className="label-print-status label-print-status--error" data-testid="label-print-status-error">
            {status.message}
          </p>
        )
      case 'success':
        return (
          <p role="status" className="label-print-status label-print-status--success" data-testid="label-print-status-success">
            {status.message}
          </p>
        )
    }
  }
  return (
    <section className="label-print-workbench" data-testid="print-workbench">
      {renderStatus(status)}
      <div className="label-print-workbench__form" data-testid="print-workbench-form">
        <label htmlFor="busy-label-carrier"> Carrier </label>
        <select disabled={isPrinting}
          value={carrier}
          onChange={(e) => setCarrier(e.target.value as CarrierCode)} id="busy-label-carrier" className="carrier-label-busy-form__select" data-testid="workbench-carrier-select">
          <option value="ups">UPS</option>
          <option value="fedex">FedEx</option>
          <option value="dhl">DHL</option>
        </select>

        <button disabled={isPrinting}
          onClick={() => onCreateLabel(carrier)} className="carrier-label-busy-form__create" data-testid="create-label-button" type="button">Create label</button>      </div>
    </section>
  )



}
