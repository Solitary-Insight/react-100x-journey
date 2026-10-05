export type PrintStatus =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; message: string }

export type LabelPrintStatusProps = {
  status: PrintStatus
}

export function LabelPrintStatus(_props: LabelPrintStatusProps) {
  return null
}
