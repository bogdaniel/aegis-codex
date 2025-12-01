## Scenario — Backend Change Workflow (Multi-Agent)

A Tier M backend service within a bounded context exposes a stable HTTP API endpoint used by another context:
- The team needs to adjust behavior to:
  - Add a new optional response field,
  - Tighten validation on an input parameter,
  - And fix a subtle bug discovered in production.
- The service already has:
  - Passing tests,
  - API documentation/spec,
  - Runbooks and basic observability.

The requested change:
- Touches a public API (response shape and validation),
- Requires a bugfix and tightened validation,
- Needs a safe rollout with a feature flag,
- Requires regression tests and documentation updates.

The workflow MUST involve at least:
- `@orchestrator` to plan the multi-agent workflow,
- `@architect` to ensure architecture/DDD, config/env, flags, and API lifecycle are respected,
- `@test-engineer` to design/add regression and behavior tests,
- `@security-auditor` if validation or data-handling security is impacted,
- `@supervisor` to enforce final quality gates and change-discipline compliance.


