import { PickWaveView } from './PickWaveView'
import { usePickWave } from './usePickWave'

export type PickWavePanelProps = {
  targetCount: number
}

export function PickWavePanel({ targetCount }: PickWavePanelProps) {
  const wave = usePickWave(targetCount)

  return (
    <PickWaveView
      targetCount={targetCount}
      status={wave.status}
      pickedCount={wave.pickedCount}
      canStart={wave.canStart}
      canPick={wave.canPick}
      canPause={wave.canPause}
      canResume={wave.canResume}
      canComplete={wave.canComplete}
      canReset={wave.canReset}
      onStart={wave.start}
      onPickUnit={wave.pickUnit}
      onPause={wave.pause}
      onResume={wave.resume}
      onComplete={wave.complete}
      onReset={wave.reset}
    />
  )
}
