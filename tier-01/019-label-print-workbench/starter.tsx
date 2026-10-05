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

export function LabelPrintWorkbench(_props: LabelPrintWorkbenchProps) {
  return null
}
