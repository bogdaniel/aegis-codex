# CQRS (Command Query Responsibility Segregation)

- **Intent:** Split write models (commands) from read models (queries) when their requirements diverge.
- **Use when:** Reads and writes have very different performance, consistency, or schema needs (e.g., projections, timelines, analytics feeds).
- **How:** Maintain authoritative write model enforcing invariants; build read models/projections asynchronously from events; document consistency expectations.
- **Pitfalls:** Added complexity without clear benefit; eventual consistency surprises; duplicated validation logic; requires strong observability.
- **Check:** Reads are faster/simpler without weakening write invariants, and consumers understand staleness/consistency contracts.
