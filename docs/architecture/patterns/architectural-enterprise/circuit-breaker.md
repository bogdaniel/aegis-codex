# Circuit Breaker

- **Intent:** Prevent cascading failures by opening the circuit when a dependency is unhealthy and only retrying after a cooldown.
- **Use when:** Remote calls can fail or hang, and you need to protect upstream latency/error budgets.
- **How:** Track failures/latency; open after thresholds; provide half-open probe; fail fast with clear errors; integrate with timeouts/retries and metrics.
- **Pitfalls:** Missing timeouts make breakers useless; improper thresholds can flap; ensure fallback behavior is safe and observable.
- **Check:** Under dependency failure, requests fail fast with metrics/alerts; recovery happens after cooldown without thundering herd.
