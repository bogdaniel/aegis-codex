# Singleton (use sparingly)

- **Intent:** Ensure exactly one instance exists and is globally accessible.
- **Use when:** There is a true single resource per process (e.g., hardware handle) and DI/configuration cannot manage lifetime more cleanly.
- **How:** Prefer dependency injection with a single binding; if you must implement directly, hide the constructor and expose a typed accessor.
- **Pitfalls:** Global state hurts testability and ordering; implicit dependencies become hard to replace; not suitable for multi-tenant or multi-instance needs.
- **Check:** Can you replace it with an injected instance or scoped lifetime? If yes, avoid Singleton; treat it as a smell detector.
