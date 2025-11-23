# Decorator

- **Intent:** Add behavior around an object without changing its interface or core logic.
- **Use when:** You need optional cross-cutting concerns (logging, metrics, caching, retries, auth) composed dynamically.
- **How:** Implement the same interface as the wrapped object; delegate after/before adding behavior; ensure decorators are order-safe.
- **Pitfalls:** Stacking can change semantics (e.g., double caching, double retries); avoid stateful decorators leaking across requests.
- **Check:** Removing the decorator leaves core behavior intact; composition order is deliberate and tested for side effects.
