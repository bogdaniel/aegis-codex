# Event Sourcing

- **Intent:** Persist state as an immutable log of domain events and derive current state by replaying them.
- **Use when:** Auditability, temporal queries, or complex invariants require full history; projections/read models benefit from event streams.
- **How:** Model domain events carefully (semantic, versioned, immutable); rebuild state through aggregates; create projections for queries; handle idempotent replays.
- **Pitfalls:** Complexity and storage costs; evolving event schemas requires careful versioning; debugging without strong tooling/observability is hard.
- **Check:** You can answer “what happened and when,” rebuild state deterministically, and migrate events safely with tests and backfills.
