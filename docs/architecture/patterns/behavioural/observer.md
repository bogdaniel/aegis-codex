# Observer / Publish–Subscribe

- **Intent:** Notify multiple observers about subject events without tight coupling.
- **Use when:** Many parts of the system should react to events (UI updates, domain events, notifications).
- **How:** Define clear event types and payloads; support subscribe/unsubscribe; ensure delivery policies (sync/async, at-least-once) are explicit.
- **Pitfalls:** Unbounded observers or slow handlers can stall subjects; beware memory leaks from missed unsubscriptions; avoid leaking sensitive payloads.
- **Check:** Adding/removing observers does not require subject changes, and event delivery is observable with metrics/logs.
