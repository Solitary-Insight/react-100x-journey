import type { ReactNode } from 'react'
import React from 'react'
export type SupportTicketShellProps = {
  title: string
  children: ReactNode
  actions?: ReactNode
}

export function SupportTicketShell({title,children,actions}: SupportTicketShellProps) {
  return <section className="support-ticket-shell" data-testid="support-ticket-shell">
    <header className="support-ticket-shell__header">
    <h2 className="support-ticket-shell__title" data-testid="ticket-title">{title}</h2>
    <div className="support-ticket-shell__body" data-testid="ticket-body">{children}</div>

    </header>
    {actions!=undefined &&<footer className="support-ticket-shell__actions" data-testid="ticket-actions">{actions}</footer>}
  </section>
}
