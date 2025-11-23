# Aggregate

- **Intent:** Define a consistency boundary that enforces invariants across related entities/values.
- **Use when:** Multiple objects must change together under transactional consistency; DDD contexts with rich invariants.
- **How:** Choose a clear aggregate root; expose behaviors via methods on the root; keep invariants inside; persist via repositories; avoid leaking internals.
- **Pitfalls:** Oversized aggregates hurt performance; cross-aggregate references break boundaries; bypassing invariants via setters.
- **Check:** All modifications go through the root; invariants are enforced and tested; aggregate size supports required transactional behavior.
