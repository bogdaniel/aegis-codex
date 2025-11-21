# Architecture Anti-Patterns

## Big Ball of Mud
- Symptoms: no clear boundaries; everything depends on everything; hard to reason about impact of changes.
- Detection: frequent cross-module imports, broad “utils” modules, ad-hoc coupling.
- Mitigation: introduce feature/vertical slices; identify bounded contexts; extract modules incrementally.

## God Service / God Object
- Symptoms: one service or class handles many unrelated responsibilities, grows without bound.
- Detection: large files, many reasons to change, frequent merge conflicts.
- Mitigation: apply SRP/SoC; split by responsibility or bounded context; extract smaller services or modules.

## Shared Database Between Services
- Symptoms: multiple services write to the same database schema/tables.
- Risks: tight coupling, hidden contracts, hard migrations.
- Mitigation: assign data ownership to a single service; expose APIs/events; build read models for others.

## Chatty Services
- Symptoms: many small calls between services in a single workflow; high latency and fragility.
- Mitigation: aggregate calls; move orchestration into a single service; consider co-locating functionality.

## Anemic Domain Model
- Symptoms: domain objects are just data; all behavior in services/helpers.
- Mitigation: move business rules closer to domain types when justified; enforce invariants there.
