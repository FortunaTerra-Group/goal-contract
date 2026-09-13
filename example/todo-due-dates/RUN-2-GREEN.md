# Run 2: GREEN

Command: `npx vitest run`, executed from `example/todo-due-dates/impl/` after adding
due-date support to `src/todo.ts` (the minimal `setDueDate`/`getDueDate`/`clearDueDate`/
`ordered`/`isOverdue` needed to satisfy the four RED tests, nothing more). Only edits
made to this output: real ANSI color codes stripped, and the local absolute path
shortened to `/goal-contract/...`.

```
 RUN  v3.2.7 /goal-contract/example/todo-due-dates/impl

 ✓ tests/overdue.single-writer.test.ts (1 test) 4ms
 ✓ tests/list-order.overdue-first.test.ts (1 test) 3ms
 ✓ tests/due-date.set-clear.test.ts (2 tests) 3ms
 ✓ tests/due-date.malformed.test.ts (1 test) 4ms

 Test Files  4 passed (4)
      Tests  5 passed (5)
   Start at  22:55:44
   Duration  377ms (transform 93ms, setup 0ms, collect 140ms, tests 13ms, environment 1ms, prepare 387ms)

EXIT CODE: 0
```

All four must-have predicates that have a RED test (`set-date`, `overdue-first`, `one-truth`,
`fallback`) are green with the smallest implementation that satisfies them: due dates are
stored on the item, malformed input is silently treated as no due date instead of thrown,
`isOverdue()` is the single function that compares a due date to now, and `ordered()` sorts
on its result. `view.ts` still only reads the `overdue` flag it's handed; it was not
touched to make this pass, which is itself evidence for the `one-truth` predicate.

## The `no-regression` guard

`RED-TESTS.md`'s fifth row is a guard, not a RED test: "the existing suite, pinned to its
current set of 212 passing test ids." That guard is a real, service-specific artifact
(a baseline commit's passing-test-id list). A fresh toy module doesn't have one: the module
didn't exist before this exercise, so there is no prior suite to pin against. In a real
service this run would be the same `npx vitest run` (or the project's equivalent) executed
against the actual pre-existing regression suite, and the guard is satisfied by the same
test-id set coming back unchanged, not by a new number picked after the fact.
