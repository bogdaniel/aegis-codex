# Retry / Timeout

- **Intent:** Bound waiting time and add controlled retries with jitter for transient failures.
- **Use when:** Calling unreliable or slow dependencies where transient errors occur, and latency budgets matter.
- **How:** Set per-call timeouts aligned to SLOs; apply limited retries with exponential backoff + jitter; classify errors as retryable/non-retryable; add idempotency.
- **Pitfalls:** Retrying non-idempotent actions can duplicate work; missing jitter causes thundering herds; timeouts without cancellation leak resources.
- **Check:** Latency stays within budget under failure; retries stop on persistent errors; logs/metrics show retry counts and outcomes.
