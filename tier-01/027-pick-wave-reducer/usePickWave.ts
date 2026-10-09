import { useEffect, useReducer } from 'react'
import type { PickWaveStatus } from './PickWaveView'

export type PickWaveState = {
  status: PickWaveStatus
  pickedCount: number
}

export type UsePickWaveResult = {
  status: PickWaveStatus
  pickedCount: number
  canStart: boolean
  canPick: boolean
  canPause: boolean
  canResume: boolean
  canComplete: boolean
  canReset: boolean
  start: () => void
  pickUnit: () => void
  pause: () => void
  resume: () => void
  complete: () => void
  reset: () => void
}


type State ={ status: 'idle' | 'picking' | 'paused' | 'complete'; pickedCount: number }

type Action =
  | { type: 'start' }
  | { type: 'pick',target_count:number }
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'complete' }
  | { type: 'reset' }




export function usePickWave(_targetCount: number): UsePickWaveResult {
  const [state,dispatch]=useReducer(reducer,{status:'idle',pickedCount:0})
  const values={
    status: state.status,
    pickedCount: state.pickedCount,
    canStart: state.status=='idle',
    canPick: state.status=='picking'  &&  state.pickedCount<_targetCount,
    canPause: state.status=='picking',
    canResume: state.status=='paused',
    canComplete: state.status=='picking' && state.pickedCount>=_targetCount,
    canReset: true,
  }

  useEffect(()=>{
    dispatch({type:'reset'})
  },[_targetCount])
  function reducer(state:State,action : Action):State{
  switch(action.type){
    case 'start':
      return {status:'picking',pickedCount:0}
      break
    case 'pick':
      const newCount=state.pickedCount+1
      if(newCount<action.target_count) return {...state,pickedCount:newCount}
      return {pickedCount:newCount,status:'complete'}
       break
    case 'pause':
      return {...state,status:'paused'}
      break
    case 'resume':
      return {...state,status:'picking'}
      break;
    case 'complete':
      return {...state,status:'complete'}
      break
    case 'reset':
      return {pickedCount:0,status:'idle'}
      break
    
  }
}
  return {
    ...values,
    start: () => {
      if(values.canStart) dispatch({type:'start'})
    },
    pickUnit: () => {
        dispatch({type:'pick',target_count:_targetCount})
    

    },
    pause: () => {
      if(values.canPause) dispatch({type:'pause'})

    },
    resume: () => {
      if(values.canResume) dispatch({type:'resume'})

    },
    complete: () => {
      if(values.canComplete) dispatch({type:'complete'})

    },
    reset: () => {
      dispatch({type:'reset'})

    },
  }
}
