# Explanation — Problem 019: Label print workbench

## Concept

**Composition** without new patterns: lift the `switch (status.kind)` block and the carrier form into one parent layout. Keep status logic and form logic visually separated (status first, then form wrapper).

## Reference structure

```tsx
export function LabelPrintWorkbench({ status, isPrinting, onCreateLabel }: LabelPrintWorkbenchProps) {
  const [carrier, setCarrier] = useState<CarrierCode>('ups')

  return (
    <section className="label-print-workbench" data-testid="print-workbench">
      {/* status switch — copy from 018 */}
      <div className="label-print-workbench__form" data-testid="print-workbench-form">
        {/* label + select + button — copy from 016 with new ids */}
      </div>
    </section>
  )
}
```

Extracting tiny inner components in the same file is optional; inline is fine for this problem.

## Common mistakes

- Dropping `disabled={isPrinting}` when merging with status UI.
- Changing test ids from the spec.
- Storing `isPrinting` in `useState`.
