# Integration & Data Consistency

## Synchronous Patterns
- Request/response via HTTP/gRPC for user-facing workflows; enforce timeouts and retries with jitter.
- Idempotent commands for operations that may be retried; use identifiers or tokens to guard against duplicates.

## Asynchronous Patterns
- Event-driven integration for cross-context side effects and projections (e.g., `UserRegistered`, `OrderPlaced`).
- Use durable queues/topic systems; accept at-least-once delivery and design idempotent consumers.
- Prefer outbox pattern for reliable event publication from transactional systems.

## Data Ownership & Consistency
- Each service owns its data; no shared mutable databases across services.
- Use read models or API calls to obtain data from other contexts; avoid cross-service joins.
- Choose consistency model explicitly: strong (in-context) vs eventual (cross-context).

## Sagas & Long-Running Workflows
- Use sagas or process managers for multi-step workflows spanning services.
- Model compensating actions; keep saga state explicit and observable.
