# System Decomposition & Boundaries

## Monolith-First vs Microservices
- Start with a well-structured monolith (modular, feature-sliced) unless there is a proven need for distributed services.
- Split into services when driven by clear forces: independent deployment, scaling characteristics, team ownership, regulatory boundaries.

## Bounded Contexts & Services
- Align services with bounded contexts: each owns its language, invariants, and data.
- One service owns a given record of truth; others consume via APIs/events or read models.
- Keep boundaries stable; prefer adding contracts over reshaping contexts frequently.

## Cross-Service Communication
- Prefer synchronous calls (HTTP/gRPC) for request/response workflows where latency budgets allow.
- Use asynchronous messaging (events/queues) for decoupling, fan-out, retries, and eventual consistency.
- Keep contracts explicit and versioned; avoid “just sharing the DB”.

## Deployment Topologies
- Favor simple topologies (few services, clear responsibilities) over early microservice sprawl.
- Co-locate highly coupled components; split along seams of autonomy and change.
