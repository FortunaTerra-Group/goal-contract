# The Goal Contract: contract before code

A goal contract is a short, machine-readable statement of *what done means* that is written, reviewed and agreed **before** an agent writes a line of code. It is not a ticket, a spec, or a prompt. It is the thing the tests are derived from and the thing an independent gate checks the result against.

## Why a contract and not a prompt

A prompt tells an agent what to do. A contract tells everyone, the agent, the reviewer, the gate, the person paying, how they will know it was done. The difference matters most at the end: with a prompt, "done" is whatever the agent says when it stops; with a contract, "done" is a set of predicates that were true or false before the work started and are re-evaluated after.

## The seven parts

| # | Part | What it answers | Rule |
|---|---|---|---|
| 1 | **Goal** | What outcome, for whom, in one paragraph | Names the *outcome*, not the implementation. If it says "add a column" it is a ticket, not a goal. |
| 2 | **Acceptance predicates** (KPIs) | How will we know | Each is `metric · operator · value · unit`, e.g. `overdue_writers == 1 (count)`. Each is marked *must-have* or *should-have*. A predicate that cannot be evaluated by someone other than the author is not a predicate. |
| 3 | **Pin policy** | Which two of cost / scope / time are fixed | Pin two, float one, say which. "All three fixed" is a wish; the agent will float one silently, usually scope. |
| 4 | **Budget** | The cost ceiling | A number with a unit (dollars, agent-hours, tokens). If cost is pinned this is the hard line; if cost floats, it is how far the float may go. |
| 5 | **Evidence contract** | What artifact proves each predicate | Per predicate: the test file, the log line, the screenshot sequence, the query. If the evidence is "the agent said so", the predicate is unproven. |
| 6 | **Quality axes** | Accuracy · reasonableness · liveness | For each: *asserted* (there is a check) or *unassessed* (there is not). Never *assumed*. An unassessed axis is a stated gap, not a pass. |
| 7 | **Independent gate** | Who or what checks the result, other than the author | A second loop, a reviewer, or a script that re-evaluates the predicates from the evidence. The author's own green is an input to the gate, never its verdict. The gate returns one of PASS · FAIL · BLOCKED (the evidence could not be produced); a gate that cannot return BLOCKED will report its own inability to measure as the author's success. |

## The two rules that make it work

**Review the contract before any code, with more than one lens.** On the product this pattern comes from, a three-wave hardening iteration went through a seven-perspective review *of the contract* before the first branch was opened. Two of its tickets were removed because two independent reviewers found their premise false, the defect was already fixed. Two more were pulled forward because their live severity was higher than the plan assumed. None of that costs anything to discover before code; all of it is expensive after.

**RED first, from the predicates.** Every must-have predicate becomes a failing test before implementation starts. The test is the predicate written in the language of the codebase. If a predicate cannot be turned into a failing test, it is not measurable (rewrite it), already true (delete it), or a *guard*: a baseline that must not move, which is green today by design and exists to go red later. Name guards as guards. And a `== 0` predicate is green over an empty population; state the floor it is measured over ("zero regressions across the 212 baseline tests"), or it proves nothing.

## What it is not

- Not a PRD. A PRD says why; the contract says how we will know.
- Not a task list. Tasks are derived from it; it does not enumerate them.
- Not an estimate. The pin policy says which dimension may move; the contract does not predict by how much. When the floating dimension is exhausted, a human re-pins the contract; it is never stretched silently.

## Minimal schema

See [`schema/goal-contract.schema.json`](./schema/goal-contract.schema.json): eight top-level keys (the seven parts plus an `id`), all required; only should-have predicates and an axis's `detail` are optional. The schema enforces "pin two, float one"; the must-have ↔ evidence pairing is checked by the gate, not the schema. A worked example is in [`example/todo-due-dates/`](./example/todo-due-dates/).
