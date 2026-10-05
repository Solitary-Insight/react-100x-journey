export type LabelPrintErrorProps = {
  message: string | null
}

export function LabelPrintError({ message }: LabelPrintErrorProps) {
  if (message === null) return null

  return (
    <p role="alert" className="label-print-error" data-testid="label-print-error">
      {message}
    </p>
  )
}