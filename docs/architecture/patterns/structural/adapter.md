# Adapter

- **Intent:** Wrap an incompatible interface to match what clients expect without changing the underlying component.
- **Use when:** Integrating third-party/legacy APIs or differing domain models at boundaries.
- **How:** Define a stable target interface; translate inputs/outputs and normalize errors inside the adapter; keep it thin and well-tested.
- **Pitfalls:** Do not leak foreign types; avoid business logic drift—adapters are translation layers, not service layers.
- **Check:** Callers are unaware of the original interface and can swap implementations by switching the adapter.
