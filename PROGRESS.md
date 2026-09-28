# React Mastery Progress

**Learner:** Abdul Haseeb  
**Stack:** React 19.2 + TypeScript + Vite + Vitest + RTL  
**Started:** 2026-09-28

## Problems

| # | Title | Tier | Level | Total | Status | Date |
|---|-------|------|-------|-------|--------|------|
| 001 | Product listing card | 1 | 5 | 87 | completed | 2026-09-28 |

## Rubric history

| # | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | Total |
|---|----|----|----|----|----|----|----|----|----|-----|-------|
| 001 | 5 | 7 | 9 | 9 | 9 | 4 | 6 | 5 | 5 | 5 | **58** |
| 001-R2 | 5 | 8 | 9 | 9 | 8 | 5 | 7 | 5 | 5 | 6 | **63** |
| 001-R3 | 10 | 8 | 9 | 9 | 9 | 9 | 8 | 8 | 8 | 9 | **87** |

### Problem 001 — final (attempt 3) notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | 7/7 tests pass. |
| 2 Idiomatic React | 8 | Clear destructuring and conditionals; minor style nits (`name,  sku` spacing). |
| 3 State design | 9 | Presentational — no redundant state. |
| 4 Effects | 9 | None required. |
| 5 Performance | 9 | Single `price` format — good. |
| 6 Composition | 9 | Footer slot with `children`; `<footer>` is fine (spec said `div`). |
| 7 Readability | 8 | Locals for status/classes read well. |
| 8 Edge cases | 8 | `children &&` skips empty footer; `onSale` ternary is explicit. |
| 9 Accessibility | 8 | `article` + title; semantic `<footer>` for actions; status still `<p>` vs spec `<span>`. |
| 10 Testability / types | 9 | Matches contract; types exported. |

**Infra note:** Added RTL `cleanup()` in `src/test/setup.ts` so tests do not leak DOM between cases (your local “2 failures” were pollution, not logic bugs).

## Running weaknesses

1. **Run full suite before submit** — isolated passes can hide cleanup issues (now fixed in setup).
2. **Read element type in spec** — status as `<span>` for inline badges (you used `<p>`; works, but match design system docs when given).

## Advancement

- **001 cleared** (87 ≥ 60, tests green). **002 unlocked** when you say you are ready.

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
