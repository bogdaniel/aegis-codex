# Composite

- **Intent:** Treat individual objects and compositions uniformly (typically tree structures).
- **Use when:** Working with hierarchies such as file systems, UI components, menus, or nested rules.
- **How:** Define a common component interface; composites store children and delegate operations recursively; keep mutation and traversal predictable.
- **Pitfalls:** Be explicit about ownership/lifecycle of children; avoid deep recursion without guarding stack/complexity; prevent cycles.
- **Check:** Clients operate on `Component` without special-casing leaves vs composites, and operations behave consistently across the tree.
