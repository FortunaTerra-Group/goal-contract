---
name: governed-build-loop
description: >
  Run non-trivial work through a short written contract before touching code, instead of
  ad-hoc implement-then-PR. Invoke before starting a new feature, a cross-cutting change, or
  anything you'd otherwise start by opening a file and editing. Produces a contract artifact
  BEFORE code exists. Do NOT use for a trivial edit, a one-line fix, or a pure question.
---

# Governed build loop — contract before code

## The failure mode this replaces

A capable operator with an AI coding tool can produce good work ad hoc: orient with a few
greps, write code, open a PR, let review catch what planning should have caught. It ships —
but it isn't reproducible by anyone else, it pushes quality defects downstream into review
instead of surfacing them at design time, and independent parallel work streams end up
serialized because nobody wrote down which pieces don't actually depend on each other.

The alternative: write a short **build contract** before the first edit. Not a full PRD, not
a design doc nobody reads — a document small enough to write in one sitting and binary enough
that "is this done" has a yes/no answer.

## How this relates to the goal-contract pattern

This skill is the in-session form of the [goal contract](../../../PATTERN.md). The pattern names
seven parts (goal · acceptance predicates · pin policy · budget · evidence contract · quality axes ·
independent gate); this skill writes them in four sections a person can produce in one sitting:

| Skill section | Pattern parts it carries |
|---|---|
| GOAL | goal · acceptance predicates (`metric · operator · value · unit`, must-have / should-have) · pin policy (pin two of cost/scope/time, float one) · budget |
| CONTEXT | what exists and must not be rebuilt; the quality-axes declaration (accuracy / reasonableness / liveness: asserted or unassessed) |
| DECOMPOSITION | spine · slices · waves · keystone (the part the pattern leaves to the team) |
| DO-NOT | scope guards; plus the evidence contract: for every must-have predicate, the artifact that proves it |

The independent-review gate below is the pattern's gate applied to the contract before code; the
same gate re-evaluates the predicates from the evidence at the end (PASS · FAIL · BLOCKED).

## The contract (four sections, in order)

1. **GOAL** — one or two sentences: what is being built, the measurable bar for done, and any
   hard constraint (a deadline, a compatibility requirement, a budget).
2. **CONTEXT** — what already exists that must not be rebuilt, the relevant files/services,
   and anything a fresh reader would need to not duplicate existing work.
3. **DECOMPOSITION** — break the work into a **spine** (the minimal serial path that has to
   land for anything to work at all) and **slices** (independent units of work that don't
   depend on each other). Group slices into **waves**: everything in a wave can run in
   parallel; a wave doesn't start until the previous wave's keystone piece has actually landed.
   Name the keystone explicitly — "the rest of wave 2 is blocked on the auth-middleware slice
   from wave 1" is a decomposition; "these are the tasks" is a list.
4. **DO-NOT** — an explicit list of things this change must not do: scope it shouldn't creep
   into, existing behavior it shouldn't change, shortcuts that would make the acceptance
   criteria pass without actually being done.

Skip a section and the contract stops being self-contained — a reader (including future-you)
has to go rediscover the missing context from the code instead of reading it off the page.

## The gate before implementing

Before writing code against the contract, get an independent read on it — a second pair of
eyes (human or a fresh agent instance with no stake in the plan as written) checking: does the
decomposition actually decompose (are the "independent" slices really independent?), does the
GOAL's bar for done match what DO-NOT excludes, is the spine actually minimal? This is cheap
to do on a document and expensive to do after code exists, which is the entire point of
writing the contract first. (A structured multi-lens version of this review step — several
independent reviewers each checking a different concern — is its own pattern; see a
multi-perspective review-panel skill if you want to formalize that step further.)

## Then, and only then, implement

Work the slices in wave order. A slice that turns out not to be independent once you start is
a sign the DECOMPOSITION section was wrong, not a reason to quietly serialize and move on —
fix the contract, don't just route around it.

## Anti-patterns

- Writing the contract *after* the code, to document what was already decided ad hoc — that's
  not governance, it's a changelog.
- A DECOMPOSITION section that's a flat task list with no spine/slice/wave distinction — it
  gives you nothing to parallelize and nothing to check dependencies against.
- Treating the contract as done once it's *written* rather than once it's been through the
  independent-review gate above.
