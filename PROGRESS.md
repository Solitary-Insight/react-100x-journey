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
| 006 | Ticket note panel | 1 | 20 | 62 | completed | 2026-09-29 |
| 007 | Shipping method summary | 1 | 23 | 72 | completed | 2026-09-29 |

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
| 006 | 5 | 6 | 8 | 9 | 8 | 4 | 6 | 4 | 5 | 7 | **62** |
| 007 | 9 | 6 | 8 | 9 | 7 | 8 | 6 | 5 | 7 | 7 | **72** |

### Problem 007 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 9 | All tests pass; fee, ETA, and totals derive correctly from `method`. |
| 2 Idiomatic React | 6 | `useMemo` for trivial lookups; `onClick` on label vs `onChange`; `==`; default `React` import. |
| 3 State design | 8 | Single `method` state — good; derived values not duplicated in `useState`. |
| 4 Effects | 9 | None required. |
| 5 Performance | 7 | Extra memoization without benefit at this scale. |
| 6 Composition | 8 | Maps + shared constants are reasonable for three options. |
| 7 Readability | 6 | `Object.entries` loop is fine; loose typing on `setMethod(key)`. |
| 8 Edge cases | 5 | `total` `useMemo` omits `subtotalCents` from deps — stale total if prop changes. |
| 9 Accessibility | 7 | Labels wrap inputs; redundant `role="radio"` on native radios. |
| 10 Testability / types | 7 | Radio `value` is display text, not `standard` / `express` / `pickup` per spec. |

### Problem 006 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 5 | 3/3 tests pass; field DOM contract and Clear placement miss the spec. |
| 2 Idiomatic React | 6 | Controlled props are right; default React import and length guard are not. |
| 3 State design | 8 | `note` lives in the panel; field stays props-only. |
| 4 Effects | 9 | None required. |
| 5 Performance | 8 | No per-keystroke logging. |
| 6 Composition | 4 | Clear button and panel class live inside `NoteField`. |
| 7 Readability | 6 | Short, but the guard and button placement obscure the split. |
| 8 Edge cases | 4 | At 200 chars edits freeze; a paste can exceed `maxLength`. |
| 9 Accessibility | 5 | `aria-label` on an `<input>` instead of a labeled textarea. |
| 10 Testability / types | 7 | Exported types match; tests do not lock the DOM contract. |

## Running weaknesses

1. **Match the stated DOM contract** — element type, classes, `htmlFor`, radio `value`s (005–007).
2. **Keep parent actions on the parent** — Clear belongs on `TicketNotePanel`, not inside the field (006).
3. **Derive during render** — plain `const` is enough here; if you `useMemo`, list every dependency (007 `subtotalCents`).
4. **Imports** — `useState` / `useMemo` only; no default `React` import.

## Advancement

- **007 scored 72** — advance to **008** when you say **next** (~level 26, conditional UI).
- Optional: re-implement **006** to spec for a re-grade.

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
