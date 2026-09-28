# React Mastery Progress

**Learner:** Abdul Haseeb  
**Stack:** React 19.2 + TypeScript + Vite + Vitest + RTL  
**Started:** 2026-09-28

## Problems

| # | Title | Tier | Level | Total | Status | Date |
|---|-------|------|-------|-------|--------|------|
| 001 | Product listing card | 1 | 5 | 87 | completed | 2026-09-28 |
| 002 | Order line items list | 1 | 8 | 85 | completed | 2026-09-28 |

## Rubric history

| # | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | Total |
|---|----|----|----|----|----|----|----|----|----|-----|-------|
| 001 | 5 | 7 | 9 | 9 | 9 | 4 | 6 | 5 | 5 | 5 | **58** |
| 001-R2 | 5 | 8 | 9 | 9 | 8 | 5 | 7 | 5 | 5 | 6 | **63** |
| 001-R3 | 10 | 8 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 9 | **87** |
| 002 | 10 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | **85** |

### Problem 002 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | 4/4 tests pass; empty + list branches correct. |
| 2 Idiomatic React | 8 | Solid map/keys; use `=== true` for optional flags. |
| 3 State design | 9 | Derived UI from props only. |
| 4 Effects | 9 | None required. |
| 5 Performance | 9 | No unnecessary work. |
| 6 Composition | 8 | Appropriate single component. |
| 7 Readability | 7 | Large pasted spec comments should be removed in real PRs. |
| 8 Edge cases | 9 | Empty array and `backordered: false` handled. |
| 9 Accessibility | 7 | `ul`/`li` semantics good; no live region for empty (not required here). |
| 10 Testability / types | 9 | Types exported; test ids match contract. |

## Running weaknesses

1. **Don’t paste requirements into source** — keep implementation files clean.
2. **Strict boolean props** — prefer `flag === true` over `flag &&` for API-driven booleans.
3. **Read element type in spec** — (from 001) match design-system elements when specified.

## Advancement

- **002 complete** (85). **003** when you say **ready** or **next**.

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
