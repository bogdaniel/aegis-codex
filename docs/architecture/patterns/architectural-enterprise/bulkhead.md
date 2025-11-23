# Bulkhead

- **Intent:** Isolate resources so failure or overload in one area does not sink the whole system.
- **Use when:** Different workloads/tenants/operations have distinct risk profiles or contention (threads, connections, queues).
- **How:** Partition pools (threads, DB connections), set per-partition limits, apply back-pressure, and shed load per bulkhead; monitor utilization separately.
- **Pitfalls:** Over-partitioning wastes capacity; shared single points (DB, cache) can still cascade; ensure fallbacks are safe.
- **Check:** A spike in one partition does not degrade others beyond defined thresholds; metrics/alerts exist per bulkhead.
