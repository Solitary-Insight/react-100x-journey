import type { ReactNode } from 'react'

export type WarehouseSessionState = {
  operatorName: string
  dockId: string
}

export type WarehouseSessionActions = {
  setOperatorName: (name: string) => void
  setDockId: (dockId: string) => void
}

/** Implement provider + hooks in this file — see PROBLEM.md. */
export function WarehouseSessionProvider(_props: { children: ReactNode }) {
  return null
}

export function useWarehouseOperatorName(): string {
  return ''
}

export function useWarehouseDockId(): string {
  return ''
}

export function useWarehouseSessionActions(): WarehouseSessionActions {
  return {
    setOperatorName: () => {},
    setDockId: () => {},
  }
}
