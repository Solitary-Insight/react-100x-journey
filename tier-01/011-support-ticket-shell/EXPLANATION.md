# Explanation — Problem 011: Support ticket shell

## Concept

**Slots** let parents inject UI without the layout knowing implementation details:

- `children` — main content (default slot).
- `actions?: ReactNode` — optional footer slot.

Check optional slots with `actions !== undefined` so an omitted prop does not render an empty footer.

## Why it matters

- Same shell on list drill-down, modal, and split-pane layouts.
- Parents pass buttons with real handlers; the shell stays presentational.
- Builds toward compound components and context later; here props are enough.

## Reference approach

```tsx
export function SupportTicketShell({ title, children, actions }: SupportTicketShellProps) {
  return (
    <section className="support-ticket-shell" data-testid="support-ticket-shell">
      <header className="support-ticket-shell__header">
        <h2 className="support-ticket-shell__title" data-testid="ticket-title">
          {title}
        </h2>
      </header>
      <div className="support-ticket-shell__body" data-testid="ticket-body">
        {children}
      </div>
      {actions !== undefined && (
        <footer className="support-ticket-shell__actions" data-testid="ticket-actions">
          {actions}
        </footer>
      )}
    </section>
  )
}
```

## Common mistakes

- Always rendering `<footer>` and hiding with CSS when `actions` is missing.
- Wrapping `children` in extra markup that breaks test queries (keep one body wrapper).
- Using `import React` instead of `import type { ReactNode } from 'react'`.
