# Problem 020 — Warehouse scan input (`useRef` + focus)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 62 / 100 |
| **Concept** | `useRef` for DOM focus; mount effect for scanner-ready field |

## Scenario

Handheld scanners send keystrokes into a focused text field. When the scan page loads, the **bin code** input should receive focus automatically so operators can scan immediately.

## Requirements

Implement `WarehouseScanInput` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type WarehouseScanInputProps = {
     onScan: (code: string) => void
   }
   ```

2. **State & refs**

   - `useState('')` for draft scan text.
   - `useRef<HTMLInputElement>(null)` for the input.

3. **Focus**

   - `useEffect` on mount (empty dependency array): call `inputRef.current?.focus()`.

4. **Layout**

   - `<form className="warehouse-scan" data-testid="warehouse-scan-form" onSubmit={...}>`
   - Label: `<label className="warehouse-scan__label" htmlFor="warehouse-scan-input">Bin code</label>`
   - Input: `<input id="warehouse-scan-input" ref={inputRef} className="warehouse-scan__input" data-testid="warehouse-scan-input" value={...} onChange={...} />`
   - Submit: `<button type="submit" className="warehouse-scan__submit" data-testid="warehouse-scan-submit">Confirm scan</button>`

5. **Submit behavior** (same rules as Problem 013)

   - `preventDefault()` on submit.
   - Trim; if empty after trim, do not call `onScan`.
   - Otherwise `onScan(trimmed)` and clear draft.

6. Export `WarehouseScanInput` and `WarehouseScanInputProps`.

## Acceptance criteria

- Input receives focus on mount (test uses spy or `document.activeElement`).
- Valid submit calls `onScan` with trimmed code and clears field.
- Whitespace-only submit is a no-op.
- `npm test` passes.

## Constraints

- One mount `useEffect` for focus only.
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
