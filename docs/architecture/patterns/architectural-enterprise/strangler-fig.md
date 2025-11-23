# Strangler Fig

- **Intent:** Incrementally replace a legacy system by routing traffic through a façade and migrating capabilities slice by slice.
- **Use when:** A big-bang rewrite is too risky; you need gradual migration with measurable safety.
- **How:** Introduce a routing facade; carve out capabilities behind feature flags; dual-run/verify; decommission legacy pieces as slices stabilize.
- **Pitfalls:** Mixed routing without clear ownership; long-lived dual writes without reconciliation; forgetting observability on both sides.
- **Check:** Each migrated slice has a rollback path, flags, and parity checks; legacy surface area shrinks steadily.
