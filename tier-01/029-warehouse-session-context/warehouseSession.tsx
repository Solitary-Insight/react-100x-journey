import { useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { createContext } from 'react'

export type WarehouseSessionState = {
  operatorName: string
  dockId: string

}

export type WarehouseSessionActions = {
  setOperatorName: (name: string) => void
  setDockId: (dockId: string) => void
}

class WareHouseStore{
  static instance : WareHouseStore;
  constructor(){
    this.state={operatorName:'',dockId:""}
    this.callbacks=new Set()
  }

  static getInstance(){
    if(!this.instance) {
      this.instance=new WareHouseStore()
    }
    return this.instance
  }

  subscribe=(cb:()=>void)=>{
    this.callbacks.add(cb)
    return ()=>{
      this.callbacks.delete(cb)
    }
  }

  update(updates:Partial <WarehouseSessionState>){
    this.state={...this.state,...updates}
    this.notify()
  }

  notify(){
    this.callbacks.forEach(cb=>cb?.())
  }

  getSnaphot=()=>this.state
}

const store=WareHouseStore.getInstance()
const WareHouseContext=createContext<WarehouseSessionState>({operatorName:'',dockId:""})

/** Implement provider + hooks in this file — see PROBLEM.md. */
export function WarehouseSessionProvider({children}: { children: ReactNode }) {
  const [st,_]=useState(store.getSnaphot())


  return( <WareHouseContext value={st}>
            {children}
        </WareHouseContext>)
}




type events="UPNAME"|"UPID"


export function useWarehouseOperatorName(): string {
  const name=useSyncExternalStore(store.subscribe,()=>store.getSnaphot().operatorName)
  return name
}

export function useWarehouseDockId(): string {
  const id=useSyncExternalStore(store.subscribe,()=>store.getSnaphot().dockId)
  return id
}

export function useWarehouseSessionActions(): WarehouseSessionActions {
  

  return {
    setOperatorName: (name:string) => {store.update({operatorName:name})},
    setDockId: (id:string) => {store.update({dockId:id})},
  }
}
