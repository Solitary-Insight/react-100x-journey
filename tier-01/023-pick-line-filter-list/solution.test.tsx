import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PickLineFilterList } from './solution'

const lines = [
  { id: 'a', label: 'Widget Pro' },
  { id: 'b', label: 'Gadget Lite' },
  { id: 'c', label: 'Widget Basic' },
]

describe('PickLineFilterList', () => {
  it('shows all lines when query is empty', () => {
    render(<PickLineFilterList lines={lines} query="" />)

    expect(screen.getByTestId('pick-line-list')).toBeInTheDocument()
    expect(screen.getByTestId('pick-line-a')).toHaveTextContent('Widget Pro')
    expect(screen.getByTestId('pick-line-b')).toHaveTextContent('Gadget Lite')
    expect(screen.getByTestId('pick-line-c')).toHaveTextContent('Widget Basic')
    expect(screen.queryByTestId('pick-line-empty')).not.toBeInTheDocument()
  })

  it('filters lines case-insensitively', () => {
    render(<PickLineFilterList lines={lines} query="WIDGET" />)

    expect(screen.getByTestId('pick-line-a')).toBeInTheDocument()
    expect(screen.getByTestId('pick-line-c')).toBeInTheDocument()
    expect(screen.queryByTestId('pick-line-b')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pick-line-empty')).not.toBeInTheDocument()
  })

  it('treats whitespace-only query as empty', () => {
    render(<PickLineFilterList lines={lines} query="   " />)

    expect(screen.getByTestId('pick-line-list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('shows empty state when nothing matches', () => {
    render(<PickLineFilterList lines={lines} query="zzzz" />)

    expect(screen.getByTestId('pick-line-empty')).toHaveTextContent('No matching pick lines')
    expect(screen.queryByTestId('pick-line-list')).not.toBeInTheDocument()
  })
})
