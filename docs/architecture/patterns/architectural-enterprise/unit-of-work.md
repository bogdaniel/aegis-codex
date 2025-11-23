# Unit of Work

- **Intent:** Track changes during a business transaction and commit them atomically.
- **Use when:** Multiple repositories/aggregates participate in one transaction and should commit/rollback together.
- **How:** Accumulate changes, manage transaction boundaries, and flush once; coordinate with repositories; ensure idempotent retries on failure.
- **Pitfalls:** Hidden implicit transactions; long-lived units causing contention; mixing cross-boundary work in one unit.
- **Check:** All writes for a use case commit together or rollback together; transactional scope is explicit and bounded.
