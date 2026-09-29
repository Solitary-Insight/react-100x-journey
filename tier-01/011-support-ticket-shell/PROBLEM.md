# Problem 011 — Support ticket shell (`children` + actions slot)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 35 / 100 |
| **Concept** | Layout components with `children` and optional `ReactNode` slots |

## Scenario

Support tooling wraps each ticket view in a **shell**: fixed chrome (title) plus a **body** supplied by the route, and an optional **actions** row (Resolve, Escalate) from the parent. The shell does not know ticket IDs or APIs — it only lays out what the parent passes in.

## Requirements

Implement `SupportTicketShell` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   import type { ReactNode } from 'react'

   export type SupportTicketShellProps = {
     title: string
     children: ReactNode
     actions?: ReactNode
   }
   ```

2. **Layout**

   - Root: `<section className="support-ticket-shell" data-testid="support-ticket-shell">`
   - Header: `<header className="support-ticket-shell__header">` containing `<h2 className="support-ticket-shell__title" data-testid="ticket-title">{title}</h2>`
   - Body: `<div className="support-ticket-shell__body" data-testid="ticket-body">{children}</div>`
   - Actions (only when `actions` is **provided** — truthy check is not enough; treat `undefined` as absent):
     - If `actions` is `undefined`, do **not** render the footer at all.
     - If `actions` is provided (including `null` is still “provided” for this problem — only omit footer when prop is omitted/`undefined`), render:
       - `<footer className="support-ticket-shell__actions" data-testid="ticket-actions">{actions}</footer>`

   For this problem, tests only pass `actions` as a node or omit the prop entirely. You do not need to handle `actions={null}` unless you want to be strict; the spec above matches the tests.

3. **Behavior**

   - Functional component; **no hooks**.
   - `children` render inside the body wrapper unchanged.
   - Export `SupportTicketShell` and `SupportTicketShellProps`.

## Acceptance criteria

- Title and body test ids show parent content.
- Footer with `ticket-actions` appears only when `actions` prop is passed.
- No footer when `actions` is omitted.
- `npm test` passes.

## Constraints

- No external UI libraries.

## Hints

3 steps on request (−1 point each).
