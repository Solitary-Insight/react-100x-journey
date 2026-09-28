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

## Rubric history

| # | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | Total |
|---|----|----|----|----|----|----|----|----|----|-----|-------|
| 001 | 5 | 7 | 9 | 9 | 9 | 4 | 6 | 5 | 5 | 5 | **58** |
| 001-R2 | 5 | 8 | 9 | 9 | 8 | 5 | 7 | 5 | 5 | 6 | **63** |
| 001-R3 | 10 | 8 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 9 | **87** |
| 002 | 10 | 8 | 9 | 9 | 9 | 8 | 7 | 9 | 7 | 9 | **85** |
| 003 | 10 | 9 | 9 | 9 | 9 | 9 | 9 | 10 | 9 | 9 | **92** |

### Problem 003 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | 8/8 cases pass; copy and classes exact. |
| 2 Idiomatic React | 9 | Status map pattern scales well; minor `_props` nit. |
| 3 State design | 9 | Pure derivation from props. |
| 4 Effects | 9 | None required. |
| 5 Performance | 9 | Config object defined outside component. |
| 6 Composition | 9 | Single focused banner component. |
| 7 Readability | 9 | Clear map + JSX; could extract `showTracking` local. |
| 8 Edge cases | 10 | Empty `trackingNumber` and wrong status both handled. |
| 9 Accessibility | 9 | `role="status"` on root. |
| 10 Testability / types | 9 | Exported types; stable test ids. |

## Running weaknesses

1. **Strict boolean props** — prefer `flag === true` over `flag &&` when API sends booleans (002 feedback).
2. **Keep solution files free of pasted specs** — (002) requirements belong in `PROBLEM.md` only.
3. **Match design-system element types** when spec names them (001 status `<span>`).

## Strengths (building)

- Lookup/config maps for variant UI (003).
- Contract-first development — tests green without re-grade loops on 002–003.

## Advancement

- **003 complete** (92). **004** when you say **next**.
- Two consecutive 90+ scores unlock skip rule — need one more 90+ on 004 to consider skip.

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
