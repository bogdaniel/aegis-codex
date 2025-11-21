# Observability Standards
- **Purpose:** Ensure services ship with actionable logs, metrics, and health signals by default.
- **Scope:** Applies to all services/components; tune specifics per language guide if needed.

## Logging
- Structured logs (JSON) with level, timestamp (UTC), correlation/request ID, user/session IDs (non-PII), and event context.
- Levels: DEBUG (dev only), INFO (state changes), WARN (recoverable anomalies), ERROR (actionable failures). No stack traces to clients; keep stack traces in logs.
- Redact secrets/PII; never log credentials, tokens, or full payloads. Include error codes, not sensitive data.
- Use stable event names; avoid log spam; cap cardinality; throttle noisy emitters.

## Metrics
- Emit RED/USE basics: request rate, errors, duration (p50/p95/p99); resource usage where relevant (CPU, mem, disk, queue depth).
- Tag with service/component, endpoint, status, region/zone. Keep cardinality bounded.
- Define SLOs and alert thresholds: examples — p95 latency +20% for 15m; error rate >0.5% over 10m; queue depth over threshold for 10m.

## Tracing
- Propagate distributed trace/context headers (e.g., W3C Trace Context). Include span names matching operations; annotate with key attributes (tenant, endpoint, db table, cache key).
- Avoid recording sensitive payloads; cap span events and attributes.

## Health & Readiness
- Expose `/health` (liveness) and `/ready` (readiness) endpoints; readiness should check dependencies (DB/cache/message broker) with timeouts and fail-fast.
- Include build/version/hash in health payload; keep responses lightweight and non-sensitive.

## Error Handling & Resilience
- Return user-safe errors; log internal details with correlation IDs. Use retries with jitter and timeouts; add circuit breakers for critical dependencies.
- Capture and log exceptions centrally; avoid silent failures.

## Verification
- Ensure logging, metrics, and health endpoints are covered in integration tests.
- Run lint/static checks for forbidden secret logging where available; smoke-test health endpoints in CI/CD.
