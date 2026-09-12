# RED tests, written from the predicates, before implementation

Each must-have predicate becomes one failing test. The test names are the predicate ids so the gate can map evidence back to the contract without reading the code.

| Predicate | Test | Fails before implementation because |
|---|---|---|
| `set-date` | `due-date.set-clear.test.ts`: set a date, read it back, clear it, read null | the field does not exist yet |
| `overdue-first` | `list-order.overdue-first.test.ts`: three items, one overdue, assert index 0 | ordering ignores due dates |
| `one-truth` | `overdue.single-writer.test.ts`: static check: exactly one file computes overdue; client code contains no date comparison | no server flag exists, so the only place it *could* be computed is the client |
| `no-regression` | the existing suite, pinned to its current set of 212 passing test ids | it is a **guard**: green today by design, exists to go red if a due-date change touches items that have none |
| `fallback` | `due-date.malformed.test.ts`: store `"not-a-date"`, open the list, assert item present with no badge, no throw | the default scenario has no code path yet |

Rule: if you cannot write the RED test, the predicate is not measurable (rewrite it), already true (delete it), or a guard on a baseline (name it as one, with the floor it is measured over).
