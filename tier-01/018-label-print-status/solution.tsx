export type PrintStatus =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; message: string }

export type LabelPrintStatusProps = {
  status: PrintStatus
}
export function LabelPrintStatus({ status }: LabelPrintStatusProps) {


  
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