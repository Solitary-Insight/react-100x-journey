import { cp } from "fs"
import { useReducer, useRef, useState } from "react"
import { fetchOrderStatus, OrderStatusResult } from './orderStatusApi'
export type OrderStatus = 'idle' | 'loading' | 'success' | 'error'

export type UseOrderStatusResult = {
  orderId: string
  setOrderId: (id: string) => void
  status: OrderStatus
  trackingNumber: string | null
  errorMessage: string | null
  load: () => void
}

function reducer(state, event) {

  switch (event.status) {
    case "loading":
      return { ...state, status: 'loading' }
      break;
    case 'success':
      return { ...state, status: 'success'}
      break;
    case 'idle':
      return { ...state, status: "idle" }
    case 'error':
      return { ...state, status: "error"}
  }

}

type State = {
  status: OrderStatus,
  orderId: string,
  errorMessage: string,
  trackingNumber: number | null,
}
export function useOrderStatus(): UseOrderStatusResult {
  const controllerRef = useRef<null | AbortController>(null)
  const defState = {status: 'idle' }
  const [state, dispatch] = useReducer(reducer, defState)

  const [data,setData]=useState({ orderId: '', errorMessage: "", trackingNumber: '', })

  async function load() {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    controllerRef.current = new AbortController()

    try {
      const res: OrderStatusResult = await fetchOrderStatus(data.orderId, controllerRef.current.signal)
      dispatch({ status: 'success' })
      // if(!res.trackingNumber) return setData(p=>({...p,errorMessage:"Order not found"}))
      setData(prev=>({...prev,trackingNumber:res.trackingNumber}))
    } catch (e) {
      if (e.name == "AbortError") {

      } else {
        dispatch({ status: 'error' })
        setData(prev=>({...prev, errorMessage: e.message}))
      }
    }


  }
  return {
    status: state.status,
    errorMessage: data.errorMessage,
    orderId: data.orderId,
    trackingNumber: data.trackingNumber,
    setOrderId: (id) => { setData(prev=>({...prev,orderId:id})) },
    load,
  }
}
