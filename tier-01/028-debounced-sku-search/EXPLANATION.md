# Explanation — Problem 028: Debounced value

## Concept

Debounce = commit `value` to displayed state only after it stops changing for `delayMs`. The effect schedules work; **cleanup** cancels the previous timer when `value` or `delayMs` changes.

## Reference pattern

```tsx
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    if (delayMs === 0) {
      setDebounced(value)
      return
    }
    const id = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(id)
  }, [value, delayMs])

  return delayMs === 0 ? value : debounced
}
```

## Common mistakes

- `setState` in cleanup besides `clearTimeout`.
- Initial state `null` instead of `value`.
- Forgetting `delayMs === 0` fast path.
