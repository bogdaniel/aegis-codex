# Outbox Pattern

- **Intent:** Guarantee reliable message/event publication alongside database changes by writing to an outbox table within the same transaction.
- **Use when:** You must publish events/notifications consistently with state changes without two-phase commit.
- **How:** In the same transaction, write domain changes and an outbox record; a relay process reads the outbox, publishes with idempotency, marks sent; include retries and dead-letter handling.
- **Pitfalls:** Missing idempotency leads to duplicate downstream effects; outbox cleanup/compaction ignored; relay without back-pressure can overwhelm brokers.
- **Check:** No message loss or duplication beyond accepted semantics; outbox lag and failure metrics are monitored with alerts.
