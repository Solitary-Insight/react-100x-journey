import { WarehouseSessionView } from './WarehouseSessionView'
import {
  useWarehouseDockId,
  useWarehouseOperatorName,
  useWarehouseSessionActions,
} from './warehouseSession'

export function WarehouseSessionPanel() {
  const operatorName = useWarehouseOperatorName()
  const dockId = useWarehouseDockId()
  const { setOperatorName, setDockId } = useWarehouseSessionActions()

  return (
    <WarehouseSessionView
      operatorName={operatorName}
      dockId={dockId}
      onOperatorChange={setOperatorName}
      onDockChange={setDockId}
    />
  )
}
