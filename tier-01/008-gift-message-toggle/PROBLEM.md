# Problem 008 — Gift message toggle (conditional UI)

| Field | Value |
|-------|-------|
| **Tier** | 1 — Foundations |
| **Level** | 26 / 100 |
| **Concept** | Conditional rendering from boolean state; reset dependent fields when section closes |

## Scenario

Checkout offers an optional **gift message**. The shopper toggles “Include gift message”; only then should the message field and character counter appear. Turning the option off should hide that UI and clear any draft so a hidden message is not submitted accidentally.

## Requirements

Implement `GiftMessageSection` in `solution.tsx`.

1. **Types** (export from `solution.tsx`):

   ```ts
   export type GiftMessageSectionProps = {
     maxLength: number
   }
   ```

2. **Layout** (always visible)

   - Root: `<section className="gift-message-section" data-testid="gift-message-section">`
   - Toggle: `<label className="gift-message-section__toggle">` wrapping:
     - `<input type="checkbox" className="gift-message-section__checkbox" data-testid="gift-toggle" />`
     - Text: `Include gift message` (checkbox must be associated — label wraps input or uses `htmlFor` + `id`)

3. **Layout** (only when checkbox is **checked**)

   - Wrapper: `<div className="gift-message-section__body" data-testid="gift-message-body">`
   - Label: `<label className="gift-message-section__label" htmlFor="gift-message">Gift message</label>`
   - Textarea: `<textarea id="gift-message" className="gift-message-section__input" data-testid="gift-message-input" maxLength={maxLength} value={message} onChange={...} />`
   - Counter: `<p className="gift-message-section__counter" data-testid="gift-char-counter">{message.length} / {maxLength}</p>`

4. **Behavior**

   - `useState(false)` for whether the gift option is enabled.
   - `useState('')` for `message` (only meaningful while enabled, but keep in state while toggling for this exercise).
   - When the user **unchecks** the box: set enabled to `false` and reset `message` to `''`.
   - When unchecked, `gift-message-body` must **not** be in the document (`queryByTestId` returns null).
   - `maxLength` comes from props on the textarea.

5. Export `GiftMessageSection` and `GiftMessageSectionProps`.

## Acceptance criteria

- Body hidden by default; appears after checking the toggle.
- Typing updates textarea and counter while open.
- Unchecking hides body and clears the message; re-checking shows an empty field.
- `npm test` passes.

## Constraints

- No `useEffect` for show/hide — use conditional render (`{enabled && ...}` or equivalent).
- No external UI libraries.

## Hints

3 steps on request (−1 point each).
