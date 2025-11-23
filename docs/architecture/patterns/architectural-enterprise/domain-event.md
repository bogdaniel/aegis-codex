# Domain Event

- **Intent:** Publish significant state changes in a bounded context using the ubiquitous language.
- **Use when:** Other parts of the system should react to business events without tight coupling; needed for projections, integrations, or auditing.
- **How:** Name events after business facts (`OrderPaid`); include minimal, non-sensitive payloads; version schemas; ensure at-least-once delivery with idempotent handlers.
- **Pitfalls:** Using events as RPC; leaking persistence IDs or internals; missing contracts for ordering and delivery semantics.
- **Check:** Subscribers can evolve independently; emitting an event never bypasses invariants; events are observable (metrics/traces) and durable.
