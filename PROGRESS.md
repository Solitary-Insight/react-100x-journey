# React Mastery Progress

**Learner:** Abdul Haseeb  
**Stack:** React 19.2 + TypeScript + Vite + Vitest + RTL  
**Started:** 2026-09-28

## Problems

| # | Title | Tier | Level | Total | Status | Date |
|---|-------|------|-------|-------|--------|------|
| 001 | Product listing card | 1 | 5 | 87 | completed | 2026-09-28 |
| 002 | Order line items list | 1 | 8 | 85 | completed | 2026-09-28 |
| 003 | Fulfillment status banner | 1 | 11 | 92 | completed | 2026-09-28 |
| 004 | Cart quantity stepper | 1 | 14 | 88 | completed | 2026-09-28 |
| 005 | Support note field | 1 | 17 | 81 | completed | 2026-09-28 |

## Rubric history

| # | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | Total |
|---|----|----|----|----|----|----|----|----|----|-----|-------|
| 001 | 5 | 7 | 9 | 9 | 9 | 4 | 6 | 5 | 5 | 5 | **58** |
| 001-R2 | 5 | 8 | 9 | 9 | 8 | 5 | 7 | 5 | 5 | 6 | **63** |
| 001-R3 | 10 | 8 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 9 | **87** |
| 002 | 10 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | **85** |
| 003 | 10 | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 9 | 9 | **92** |
| 004 | 10 | 7 | 10 | 9 | 9 | 8 | 7 | 9 | 10 | 9 | **88** |
| 005 | 9 | 7 | 10 | 9 | 7 | 8 | 7 | 8 | 7 | 8 | **81** |

### Problem 005 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 9 | Markup/contract met; `slice` + `console.log` are unnecessary/wrong for prod. |
| 2 Idiomatic React | 7 | Extra React import; handler noise. |
| 3 State design | 10 | Value controlled from props only. |
| 4 Effects | 9 | None required. |
| 5 Performance | 7 | `console.log` on every keystroke. |
| 6 Composition | 8 | Single field component — appropriate. |
| 7 Readability | 7 | Inline handler with debug noise. |
| 8 Edge cases | 8 | `maxLength` attr present; redundant slice. |
| 9 Accessibility | 7 | Redundant `aria-label` with visible label. |
| 10 Testability / types | 8 | Works when parent updates state (see harness in test). |

**Infra:** Typing test now uses a state harness — required for realistic controlled-input tests.

## Running weaknesses

1. **Remove debug code** before submit (`console.log` in 005).
2. **Controlled input loop** — parent must update `value` when `onChange` fires.
3. **Imports & formatting** — no default React import; run formatter (004–005).

## Advancement

- **005 complete** (81). **006** when you say **next** (lifting state — ~level 20).

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
