# Abstract Factory

- **Intent:** Provide a single point to create families of related objects that must be used together.
- **Use when:** You need to swap whole stacks (e.g., UI theme widgets, storage providers, driver suites) while keeping internal consistency.
- **How:** Define a factory interface with methods for each family member; each concrete factory returns compatible implementations.
- **Pitfalls:** Avoid leaking factory internals to callers; don’t let factories smuggle configuration everywhere—prefer explicit inputs.
- **Check:** Switching the factory should swap the whole family without conditionals scattered across the codebase.
