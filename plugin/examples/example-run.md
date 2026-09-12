# Example run: "add per-tenant rate limiting to the public API"

A worked example of the contract this skill asks for, on a fictional SaaS API service
("Acme Metrics API"). This is the artifact the skill produces *before* any code is written.

---

## GOAL

Ship configurable per-tenant rate limiting on the public REST API so that one tenant's
traffic burst can't degrade response times for other tenants. Must not change behavior for
existing unlimited-tier customers, and must ship within the current sprint without adding a
new datastore.

## CONTEXT

- A global (not per-tenant) rate limiter middleware already exists and stays in place for
  unauthenticated endpoints — out of scope for this change.
- Per-request auth middleware already resolves `tenant_id` before the request reaches business
  logic; this change can rely on that, not re-derive it.
- Redis is already provisioned and used elsewhere for caching — reuse it rather than adding a
  new counter store.
- Existing "unlimited" tier customers (a fixed, known list) must see no behavior change.

## DECOMPOSITION

**Spine:** a tenant-aware limiter middleware that reads a per-tenant limit and enforces it
using a Redis-backed counter. Nothing else in this contract works until this lands.

**Wave 1** (parallel, both depend only on the spine existing, not on each other):
- *(a)* Redis-backed sliding-window counter implementation, keyed by `tenant_id`.
- *(b)* Tenant tier → limit config lookup (reads the existing tenant/tier table; no schema
  change).

**Keystone for wave 1 → wave 2:** the tenant-aware limiter middleware, with (a) and (b) both
folded in and enforcing real limits in production.

**Wave 2** (blocked on the wave-1 keystone landing):
- *(c)* Admin API endpoint to adjust a tenant's limit without a deploy.
- *(d)* Dashboard panel showing each tenant's current usage against their limit.

## DO-NOT

- Do not change the existing global unauthenticated-endpoint limiter.
- Do not introduce a new datastore beyond the already-provisioned Redis instance.
- Do not apply limits to tenants on the unlimited-tier list — check that list before enforcing,
  not after.
- Do not let the per-request limit check add a synchronous database round-trip to the request
  hot path (config lookup must be cached, not queried live).

---

## What the independent-review gate caught

Before implementation started, an independent read of this contract flagged that
**DECOMPOSITION** listed (a) and (b) as parallel wave-1 slices but the tier-lookup slice (b) as
originally drafted would have queried the tenant/tier table on every request — which directly
violates the **DO-NOT** clause on hot-path DB calls, and would have made (a) and (b) not
actually independent (the counter implementation would have had to wait on a caching decision
for (b) anyway). The contract was corrected to specify a cached lookup before implementation
began, rather than being caught in review after the code existed.

This is the point of writing the contract first: the conflict between DECOMPOSITION and
DO-NOT was visible on the page, before it was visible in a diff.

See the [multi-persona-review-panel](https://github.com/vivekv77/multi-persona-review-panel-skill)
example for the pre-push review of the resulting spine PR, and the
[usability-heuristic-review](https://github.com/vivekv77/usability-heuristic-review-skill)
example for an audit of the wave-2 dashboard panel this contract produced.
