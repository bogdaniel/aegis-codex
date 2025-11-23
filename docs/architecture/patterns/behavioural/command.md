# Command

- **Intent:** Represent an action as an object to enable queuing, logging, retrying, or undoing.
- **Use when:** Operations must be scheduled, audited, retried, or composed; UI actions and job systems benefit most.
- **How:** Define a command interface (`execute`/`undo`); keep payloads small and serializable; handle idempotency and error reporting.
- **Pitfalls:** Commands that reach deep into infrastructure hurt testability; avoid mixing command and query logic; ensure retries are safe.
- **Check:** Commands can be persisted or queued without losing meaning; execution is deterministic and observable.
