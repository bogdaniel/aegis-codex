# Saga / Process Manager

- **Intent:** Coordinate long-running, multi-step workflows across services using a sequence of actions and compensations.
- **Use when:** Transactions span multiple systems without distributed transactions; you need reliable orchestration with rollback/compensation.
- **How:** Define a state machine; drive steps via commands/events; include timeouts, retries with jitter, and compensating actions; make transitions observable.
- **Pitfalls:** Orchestrators can become monoliths; missing idempotency/ordering leads to double work; ensure correlation IDs and persistence of saga state.
- **Check:** Each step is idempotent or compensated; failures trigger defined compensations; saga progress is traceable with logs/metrics.
