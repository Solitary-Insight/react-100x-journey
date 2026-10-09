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

export function usePickWave(_targetCount: number): UsePickWaveResult {
  return {
    status: 'idle',
    pickedCount: 0,
    canStart: false,
    canPick: false,
    canPause: false,
    canResume: false,
    canComplete: false,
    canReset: false,
    start: () => {},
    pickUnit: () => {},
    pause: () => {},
    resume: () => {},
    complete: () => {},
    reset: () => {},
  }
}
