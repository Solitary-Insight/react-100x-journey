export type WarehouseSessionViewProps = {
  operatorName: string
  dockId: string
  onOperatorChange: (name: string) => void
  onDockChange: (dockId: string) => void
}

/** Presentational UI — do not edit. */
export function WarehouseSessionView({
  operatorName,
  dockId,
  onOperatorChange,
  onDockChange,
}: WarehouseSessionViewProps) {
  return (
    <section aria-label="Warehouse session">
      <p>
        Operator: <strong data-testid="session-operator">{operatorName || '(none)'}</strong>
      </p>
      <p>
        Dock: <strong data-testid="session-dock">{dockId || '(none)'}</strong>
      </p>
      <label>
        Operator name
        <input
          aria-label="Operator name"
          value={operatorName}
          onChange={(e) => onOperatorChange(e.target.value)}
        />
      </label>
      <label>
        Dock ID
        <input
          aria-label="Dock ID"
          value={dockId}
          onChange={(e) => onDockChange(e.target.value)}
        />
      </label>
    </section>
  )
}
