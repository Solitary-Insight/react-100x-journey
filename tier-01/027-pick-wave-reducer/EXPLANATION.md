# Explanation — Problem 027: Pick wave reducer

## Concept

**`useReducer`** fits finite state machines: one `status`, transitions in a pure `reducer`, illegal actions return `state`. UI enables buttons via derived `can*` flags; the reducer still guards if something dispatches anyway.

## Reference shape

- Define `PickWaveAction` union and `pickWaveReducer(state, action)` **outside** the hook.
- Pass `targetCount` into the reducer via `useReducer` + wrapper dispatch, or close over `targetCount` in `pickUnit` only for the `PICK_UNIT` guard.
- `useEffect(() => dispatch({ type: 'RESET' }), [targetCount])` — do **not** call `onReset` from the view.

## Common mistakes

- Reducer declared inside the component body (hard to test, easy to recreate each render if not a hoisted `function`).
- `pause` / `pick` allowed from any status — guard on `state.status`.
- Duplicating reset logic in `PickWaveView` when the hook already resets on `targetCount`.

## Next

Problem **028** — custom `useDebouncedValue` with effect cleanup.
