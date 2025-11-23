# Object Pool

- **Intent:** Reuse a limited set of heavy or scarce objects instead of creating/destroying them per request.
- **Use when:** Allocation is expensive (sockets, DB connections, buffers) and throughput suffers from churn.
- **How:** Manage checkout/return with timeouts and max size; guard against leaks; reset objects before reuse; apply back-pressure when exhausted.
- **Pitfalls:** Unbounded pools become leaks; stale state or cross-request contamination if reset is incomplete; not needed for cheap, short-lived objects.
- **Check:** Pool metrics show bounded size, low wait times, and safe cleanup under load; callers handle acquisition failures gracefully.
