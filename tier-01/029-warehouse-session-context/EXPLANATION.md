# Explanation — Problem 029: Warehouse session context

## Intended approach (split contexts)

```tsx
// Three providers: operator string, dock string, stable dispatch object.
// Updating dock replaces only DockContext.Provider value.
```

## Your approach (`useSyncExternalStore`)

Per-field snapshots (`() => store.getSnapshot().operatorName`) give **selective re-renders** without three contexts — valid, and matches Problem **030** on the track. Trade-offs:

- Singleton store persists across tests unless you reset it.
- `WarehouseSessionProvider` context value is unused if all reads go through the store hooks.
- Use `Context.Provider` (not `<Context value={...}>`).

## Common mistakes

- One context object `{ operatorName, dockId }` → every consumer re-renders on any change.
- Unstable `actions` object recreated each render → dispatch consumers re-render constantly.
