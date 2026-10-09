export type PickWaveStatus = 'idle' | 'picking' | 'paused' | 'complete'

export type PickWaveViewProps = {
  targetCount: number
  status: PickWaveStatus
  pickedCount: number
  canStart: boolean
  canPick: boolean
  canPause: boolean
  canResume: boolean
  canComplete: boolean
  canReset: boolean
  onStart: () => void
  onPickUnit: () => void
  onPause: () => void
  onResume: () => void
  onComplete: () => void
  onReset: () => void
}

/** Presentational UI — do not edit. */
export function PickWaveView({
  targetCount,
  status,
  pickedCount,
  canStart,
  canPick,
  canPause,
  canResume,
  canComplete,
  canReset,
  onStart,
  onPickUnit,
  onPause,
  onResume,
  onComplete,
  onReset,
}: PickWaveViewProps) {
  return (
    <section aria-label="Pick wave">
      <p>
        Status: <strong>{status}</strong>
      </p>
      <p>
        Picked <strong>{pickedCount}</strong> of <strong>{targetCount}</strong>
      </p>

      <button type="button" disabled={!canStart} onClick={onStart}>
        Start wave
      </button>
      <button type="button" disabled={!canPick} onClick={onPickUnit}>
        Pick one unit
      </button>
      <button type="button" disabled={!canPause} onClick={onPause}>
        Pause
      </button>
      <button type="button" disabled={!canResume} onClick={onResume}>
        Resume
      </button>
      <button type="button" disabled={!canComplete} onClick={onComplete}>
        Complete wave
      </button>
      <button type="button" disabled={!canReset} onClick={onReset}>
        Reset
      </button>
    </section>
  )
}
