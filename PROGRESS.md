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
| 008 | Gift message toggle | 1 | 26 | 91 | completed | 2026-09-29 |
| 009 | Stock alert list | 1 | 29 | 92 | completed | 2026-09-29 |
| 010 | Order summary split | 1 | 32 | 90 | completed | 2026-09-29 |
| 011 | Support ticket shell | 1 | 35 | 85 | completed | 2026-09-29 |
| 012 | Notify customer button | 1 | 38 | — | in progress | — |

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
| 008 | 10 | 8 | 10 | 10 | 9 | 9 | 9 | 10 | 9 | 7 | **91** |
| 009 | 10 | 8 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | 9 | **92** |
| 010 | 10 | 7 | 10 | 10 | 9 | 10 | 7 | 10 | 8 | 9 | **90** |
| 011 | 8 | 7 | 10 | 10 | 9 | 8 | 7 | 10 | 7 | 9 | **85** |

### Problem 011 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 8 | 3/3 tests pass; `ticket-body` should be sibling of `header`, not inside it. |
| 2 Idiomatic React | 7 | Correct `actions !== undefined` guard; remove unused default `React` import; use `!==`. |
| 3 State design | 10 | Props-only slots — no local state. |
| 4 Effects | 10 | None required. |
| 5 Performance | 9 | Fine. |
| 6 Composition | 8 | Children + optional actions work; DOM structure drifts from spec. |
| 7 Readability | 7 | Tight formatting; structure would be clearer with body outside header. |
| 8 Edge cases | 10 | Optional footer omitted when `actions` undefined. |
| 9 Accessibility | 7 | `header` should wrap title only; body outside landmark header. |
| 10 Testability / types | 9 | `ReactNode` typing and exports correct. |

### Problem 010 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | Header, totals, card composition; money and grand total; 4/4 tests. |
| 2 Idiomatic React | 7 | Solid split; drop unused `React` import; rename `formate` → `formatDollars`. |
| 3 State design | 10 | Props-only; total derived in totals component. |
| 4 Effects | 10 | None required. |
| 5 Performance | 9 | Fine for scope. |
| 6 Composition | 10 | Card drills props into focused children — goal of the problem. |
| 7 Readability | 7 | `formatedSt` / `formate` typos; destructure card props like header. |
| 8 Edge cases | 10 | Zero cents formats correctly in tests. |
| 9 Accessibility | 8 | Semantic `header` / `footer` inside `article`. |
| 10 Testability / types | 9 | All exports present for isolated tests. |

### Problem 009 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | Empty vs list branches, keys, badge, footer sum; 4/4 tests. |
| 2 Idiomatic React | 8 | Clean map/reduce; remove unused default `React` import. |
| 3 State design | 10 | Props-only; `totalUnits` derived — no redundant state. |
| 4 Effects | 10 | None needed. |
| 5 Performance | 9 | Single reduce per render is fine at this size. |
| 6 Composition | 9 | Clear ternary + fragment for non-empty branch. |
| 7 Readability | 9 | Straightforward structure; minor formatting on `</li>`. |
| 8 Edge cases | 10 | Strict `critical === true`; no total when empty. |
| 9 Accessibility | 8 | List semantics; no extra requirements this problem. |
| 10 Testability / types | 9 | Exported types; template test ids match spec. |

### Problem 008 — notes

| # | Score | Note |
|---|-------|------|
| 1 Correctness | 10 | Spec markup, conditional mount, reset-on-uncheck; 4/4 tests. |
| 2 Idiomatic React | 8 | Controlled checkbox + `handleToggle`; drop default `React` import. |
| 3 State design | 10 | `enabled` + `message`; clear coupled to toggle off — no leaked draft. |
| 4 Effects | 10 | No `useEffect` for visibility. |
| 5 Performance | 9 | Appropriate for scope. |
| 6 Composition | 9 | Single section component fits the problem. |
| 7 Readability | 9 | `handleToggle` names intent clearly. |
| 8 Edge cases | 10 | Re-open after uncheck shows empty field. |
| 9 Accessibility | 9 | Toggle label wraps input; gift field uses `htmlFor` / `id`. |
| 10 Testability / types | 7 | Exported types; `GiftMessageSectionProps` could stay grouped above component (style). |

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

1. **Imports** — `import type { ReactNode }` or hooks only; no default `React` import (005–011).
2. **Layout structure** — match spec nesting (`header` vs body siblings in 011).
3. **Match the stated DOM contract** — element type, classes, `htmlFor`, radio `value`s (005–007).
4. **Keep parent actions on the parent** — Clear belongs on `TicketNotePanel`, not inside the field (006).
5. **Derive during render** — plain `const` is enough; if you `useMemo`, list every dependency (007).

## Advancement

- **Current:** Problem **012** — `tier-01/012-notify-customer-button/` (callback props + `disabled`).
- Optional: re-implement **006** to spec for a re-grade.

## Notes

- Push workflow (on request): `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/ssh_keygen_for_github` → `ssh -T git@github.com` → then push.
