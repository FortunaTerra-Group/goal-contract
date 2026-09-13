# Run 1: RED

Command: `npx vitest run`, executed from `example/todo-due-dates/impl/` before any
due-date support existed in `src/todo.ts`. The only edits made to this output: real
ANSI color codes stripped for plain-text rendering, and the local absolute path
shortened to `/goal-contract/...`. Nothing else was changed, including the `(list as
any)` casts below, which is what the test files looked like at this point, before
the real methods existed to call without a cast.

```
 RUN  v3.2.7 /goal-contract/example/todo-due-dates/impl

 ❯ tests/list-order.overdue-first.test.ts (1 test | 1 failed) 6ms
   × overdue-first: overdue items sort above all others when the list opens > places the overdue item at index 0 of three items 4ms
     → list.setDueDate is not a function
 ❯ tests/overdue.single-writer.test.ts (1 test | 1 failed) 15ms
   × one-truth: overdue is computed in exactly one place > exactly one source file defines the overdue computation, and the view module never re-derives it from a date comparison 13ms
     → expected [] to deeply equal [ 'todo.ts' ]
 ❯ tests/due-date.set-clear.test.ts (2 tests | 2 failed) 7ms
   × set-date: a due date can be set and cleared on any item > sets a due date and reads it back 5ms
     → list.setDueDate is not a function
   × set-date: a due date can be set and cleared on any item > clears a due date back to null 1ms
     → list.setDueDate is not a function
 ❯ tests/due-date.malformed.test.ts (1 test | 1 failed) 12ms
   × fallback: a malformed due date never hides the item and never crashes > does not throw and keeps the item visible with no overdue badge 10ms
     → expected [Function] to not throw an error but 'TypeError: list.setDueDate is not a f…' was thrown

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/due-date.malformed.test.ts > fallback: a malformed due date never hides the item and never crashes > does not throw and keeps the item visible with no overdue badge
AssertionError: expected [Function] to not throw an error but 'TypeError: list.setDueDate is not a f…' was thrown

- Expected: 
undefined

+ Received: 
"TypeError: list.setDueDate is not a function"

 ❯ tests/due-date.malformed.test.ts:14:71
     12|     const item = list.add('call the plumber');
     13| 
     14|     expect(() => (list as any).setDueDate(item.id, 'not-a-date')).not.…
       |                                                                       ^
     15| 
     16|     const ordered = (list as any).ordered();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/5]⎯

 FAIL  tests/due-date.set-clear.test.ts > set-date: a due date can be set and cleared on any item > sets a due date and reads it back
TypeError: list.setDueDate is not a function
 ❯ tests/due-date.set-clear.test.ts:12:19
     10|     const item = list.add('buy milk');
     11| 
     12|     (list as any).setDueDate(item.id, '2026-09-20');
       |                   ^
     13| 
     14|     expect((list as any).getDueDate(item.id)).toBe('2026-09-20');

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/5]⎯

 FAIL  tests/due-date.set-clear.test.ts > set-date: a due date can be set and cleared on any item > clears a due date back to null
TypeError: list.setDueDate is not a function
 ❯ tests/due-date.set-clear.test.ts:21:19
     19|     const item = list.add('buy milk');
     20| 
     21|     (list as any).setDueDate(item.id, '2026-09-20');
       |                   ^
     22|     (list as any).clearDueDate(item.id);
     23| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/5]⎯

 FAIL  tests/list-order.overdue-first.test.ts > overdue-first: overdue items sort above all others when the list opens > places the overdue item at index 0 of three items
TypeError: list.setDueDate is not a function
 ❯ tests/list-order.overdue-first.test.ts:12:19
     10|     const list = new TodoList();
     11|     const future = list.add('renew passport');
     12|     (list as any).setDueDate(future.id, '2099-01-01');
       |                   ^
     13| 
     14|     list.add('read a book'); // no due date

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/5]⎯

 FAIL  tests/overdue.single-writer.test.ts > one-truth: overdue is computed in exactly one place > exactly one source file defines the overdue computation, and the view module never re-derives it from a date comparison
AssertionError: expected [] to deeply equal [ 'todo.ts' ]

- Expected
+ Received

- [
-   "todo.ts",
- ]
+ []

 ❯ tests/overdue.single-writer.test.ts:26:21
     24|       overdueWriterPattern.test(fs.readFileSync(path.join(srcDir, f), …
     25|     );
     26|     expect(writers).toEqual(['todo.ts']);
       |                     ^
     27| 
     28|     const viewSource = fs.readFileSync(path.join(srcDir, 'view.ts'), '…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/5]⎯


 Test Files  4 failed (4)
      Tests  5 failed (5)
   Start at  22:55:14
   Duration  421ms (transform 105ms, setup 0ms, collect 149ms, tests 39ms, environment 1ms, prepare 457ms)

EXIT CODE: 1
```

Every predicate fails for the reason `RED-TESTS.md` names: `setDueDate`, `getDueDate`, `clearDueDate`, and `ordered()` do not exist yet on `TodoList` (the `set-date`, `overdue-first`, and `fallback` predicates), and zero source files compute overdue at all, so the one-truth check gets an empty array where it expects `['todo.ts']`. The `(list as any)` casts in the excerpts above are a TypeScript-only device to call a method that does not exist yet without a compile error; the runtime failure (`is not a function`) is real and is what actually failed.
