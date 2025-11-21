# Performance Standards
- **Purpose:** Guide efficient, scalable implementations without premature micro-optimization.
- **Scope:** Applies to services, libraries, and data access paths.

## Principles
- Measure first; optimize hot paths only. Use realistic workloads.
- Choose appropriate complexity (time/space) and data structures; avoid accidental O(n²+).
- Prefer simplicity over cleverness when cost is negligible.

## Application & API
- Avoid unbounded work per request; enforce limits (page size, batch size).
- Paginate large result sets; prefer cursor-based pagination for unbounded streams.
- Cache idempotent, read-heavy endpoints (HTTP caching, in-memory, or Redis).

## Data & Storage
- Use indexes for common query patterns; avoid N+1 queries by batching or joins.
- Reuse DB connections via pools; set timeouts; avoid long-lived transactions.
- Compress large payloads; avoid over-fetching and under-fetching.

## Concurrency & Async
- Bound concurrency: use worker pools/semaphores; no unbounded goroutines/promises/threads.
- Apply timeouts and retries with jitter on remote calls; respect back-pressure.
- Avoid shared mutable state; prefer message passing or immutability.

## Resource Management
- Close connections/streams; free handles; enforce limits on memory, file descriptors, and threads.
- Use streaming for large payloads where possible instead of buffering whole content.

## Verification
- Use profilers/benchmarks appropriate to the stack (e.g., pprof, perf, flamegraphs).
- Track p50/p95/p99 latencies and resource usage; alert on regressions.
