import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PickWavePanel } from './solution'

describe('PickWavePanel', () => {
  it('starts idle and can start a wave', async () => {
    const user = userEvent.setup()
    render(<PickWavePanel targetCount={3} />)

    expect(screen.getByText(/Status:/)).toHaveTextContent('idle')
    await user.click(screen.getByRole('button', { name: 'Start wave' }))
    expect(screen.getByText(/Status:/)).toHaveTextContent('picking')
  })

  it('increments picked count and auto-completes at target', async () => {
    const user = userEvent.setup()
    render(<PickWavePanel targetCount={2} />)

    await user.click(screen.getByRole('button', { name: 'Start wave' }))
    await user.click(screen.getByRole('button', { name: 'Pick one unit' }))
    expect(screen.getByText(/Picked/)).toHaveTextContent('Picked 1 of 2')

    await user.click(screen.getByRole('button', { name: 'Pick one unit' }))
    expect(screen.getByText(/Status:/)).toHaveTextContent('complete')
    expect(screen.getByText(/Picked/)).toHaveTextContent('Picked 2 of 2')
  })

  it('supports pause and resume without losing count', async () => {
    const user = userEvent.setup()
    render(<PickWavePanel targetCount={5} />)

    await user.click(screen.getByRole('button', { name: 'Start wave' }))
    await user.click(screen.getByRole('button', { name: 'Pick one unit' }))
    await user.click(screen.getByRole('button', { name: 'Pause' }))
    expect(screen.getByText(/Status:/)).toHaveTextContent('paused')

    await user.click(screen.getByRole('button', { name: 'Resume' }))
    expect(screen.getByText(/Status:/)).toHaveTextContent('picking')
    expect(screen.getByText(/Picked/)).toHaveTextContent('Picked 1 of 5')
  })

  it('resets to idle from any status', async () => {
    const user = userEvent.setup()
    render(<PickWavePanel targetCount={1} />)

    await user.click(screen.getByRole('button', { name: 'Start wave' }))
    await user.click(screen.getByRole('button', { name: 'Pick one unit' }))
    expect(screen.getByText(/Status:/)).toHaveTextContent('complete')

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText(/Status:/)).toHaveTextContent('idle')
    expect(screen.getByText(/Picked/)).toHaveTextContent('Picked 0 of 1')
  })

  it('resets when targetCount changes', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<PickWavePanel targetCount={3} />)

    await user.click(screen.getByRole('button', { name: 'Start wave' }))
    await user.click(screen.getByRole('button', { name: 'Pick one unit' }))
    expect(screen.getByText(/Picked/)).toHaveTextContent('Picked 1 of 3')

    rerender(<PickWavePanel targetCount={10} />)
    expect(screen.getByText(/Status:/)).toHaveTextContent('idle')
    expect(screen.getByText(/Picked/)).toHaveTextContent('Picked 0 of 10')
  })
})
