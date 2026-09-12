# Goal contract: contract before code

**A goal contract is the thing you write before an agent writes anything: what done means, how you will know, and who checks.**

> The pattern is in [`PATTERN.md`](./PATTERN.md), a minimal schema in [`schema/`](./schema/goal-contract.schema.json), a worked example in [`example/todo-due-dates/`](./example/todo-due-dates/), and a Claude Code skill that writes the contract in-session in [`plugin/`](./plugin/). Apache-2.0. The rest of this page is the argument.

---

Ask a coding agent to "add due dates to the to-do app" and it will. It will add a column, a date picker, a sort, and an overdue badge, and it will report success, and it will be right about all of that. What it will not tell you is that the sort is computed on the server in UTC while the badge is computed on the client in local time, so for anyone west of Greenwich an item can sit at the top of the list as overdue with no overdue badge on it. Nothing in the prompt said that mattered. Nothing in the prompt said anything about what done meant.

A goal contract is the sentence you write instead of that prompt, and then the six sentences after it.

## The shape

1. **Goal.** The outcome, for whom, one paragraph. Not the implementation.
2. **Acceptance predicates.** Each one `metric · operator · value · unit`, marked must-have or should-have. `overdue_writers == 1 (count)` is a predicate. "Overdue should be consistent" is a hope.
3. **Pin policy.** Which two of cost, scope, time are fixed. Pin two, float one, say which. If you pin all three the agent floats scope without telling you.
4. **Budget.** A number, with a unit.
5. **Evidence contract.** For every must-have predicate, the artifact that proves it: a test file, a log line, an ordered set of screenshots, a query. "The agent said so" is not an artifact.
6. **Quality axes.** Accuracy, reasonableness, liveness, each marked *asserted* (there is a check) or *unassessed* (there is not). Never assumed. An unassessed axis you have named is a known gap; one you have not named ships as a defect.
7. **Independent gate.** Whoever re-evaluates the predicates from the evidence, and it is not the author. The gate returns PASS, FAIL, or BLOCKED (the evidence could not be produced); it never returns the author's summary.

That is the whole thing. A real one fits on a screen. The [example](./example/todo-due-dates/goals.yaml) is under thirty lines.

## Two habits that do the work

**Review the contract, not the code, first.** We run every contract past more than one reviewer before a branch is opened. On our own product, a three-wave hardening iteration went through a seven-perspective review of its contract; two tickets were deleted because two reviewers separately found the defect they targeted was already fixed, and two were pulled forward because their live severity was higher than the plan assumed. Finding that before any code existed cost one review. Finding it after would have cost the code.

**Write the RED tests from the predicates before implementation.** Each must-have becomes one failing test named after the predicate, so the gate can map evidence back to the contract without reading the diff. If a predicate can't become a failing test, it is unmeasurable (rewrite it), already true (delete it), or a guard on a baseline that must not move (say so). The example's [RED-TESTS.md](./example/todo-due-dates/RED-TESTS.md) shows the five.

## Why this matters more with agents

An agent's "done" is the moment it stops. A human engineer's "done" is shaped by knowing what the team will ask in review. The contract is that knowledge, written down in a form the agent reads before it starts and the gate reads after it stops. It also changes what you review: a reviewer who reads a contract reads seven things; a reviewer who reads a diff reads everything and has nothing to check it against.

## Adopting it

- Start with one feature. Write the contract in the example's shape; get one non-author to read it before code.
- Derive the RED tests from the must-haves. Don't start until they fail.
- At the end, re-evaluate the predicates from the evidence column, not from the agent's summary.
- Keep the contract in the repo next to the code it governed. A year on it says what the change was for; the commit log only says what it touched.

## Provenance and license

The pattern comes from FortunaTerra's own products, where every product increment since mid-2026 has run as a goal contract with an independent quality loop as its merge gate. It pairs with [CHOP](https://github.com/FortunaTerra-Group/chop), the state-machine standard the same work produced. Copyright 2026 FortunaTerra Technologies Inc. Written and maintained by Vivek Iyer ([FortunaTerra-Group](https://github.com/FortunaTerra-Group)). Released under [Apache-2.0](./LICENSE). The bar for a change to the pattern is a contract that followed it and still shipped the wrong thing; tell us how.
