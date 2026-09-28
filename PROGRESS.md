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
| 005 | Support note field | 1 | 17 | — | in_progress | 2026-09-28 |

## Rubric history

| # | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | Total |
|---|----|----|----|----|----|----|----|----|----|-----|-------|
| 001 | 5 | 7 | 9 | 9 | 9 | 4 | 6 | 5 | 5 | 5 | **58** |
| 001-R2 | 5 | 8 | 9 | 9 | 8 | 5 | 7 | 5 | 5 | 6 | **63** |
| 001-R3 | 10 | 8 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 9 | **87** |
| 002 | 10 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | **85** |
| 003 | 10 | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 9 | 9 | **92** |
| 004 | 10 | 7 | 10 | 9 | 9 | 8 | 7 | 9 | 10 | 9 | **88** |

### Problem 004 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | 5/5 tests pass; controlled pattern correct. |
| 2 Idiomatic React | 7 | Unneeded `import React`; import order / formatting. |
| 3 State design | 10 | No local quantity state — textbook controlled widget. |
| 4 Effects | 9 | None required. |
| 5 Performance | 9 | Fine for scope. |
| 6 Composition | 8 | Appropriate single widget. |
| 7 Readability | 7 | Dense one-line JSX; empty comments. |
| 8 Edge cases | 9 | `disabled` covers bounds; optional handler guard omitted. |
| 9 Accessibility | 10 | Correct `aria-label`s and `type="button"`. |
| 10 Testability / types | 9 | Contract met. |

## Running weaknesses

1. **Imports & formatting** — drop default React import; use formatter (004).
2. **Strict boolean props** — (002) `=== true` for API flags when specified.
3. **Keep solution files clean** — no pasted specs or empty comment blocks.

## Strengths (building)

- Controlled components without local duplicate state (004).
- Config maps for variants (003).

## Advancement

- **005 in progress** — controlled textarea + char counter.
- Skip rule: need **two consecutive 90+** — 003 was 92, 004 was 88 (not eligible).

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
