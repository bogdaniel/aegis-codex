# Builder

- **Intent:** Construct complex objects step-by-step with readable defaults while preventing invalid intermediate states.
- **Use when:** Objects have many optional/conditional fields, or constructors are unreadable; you need validation before build.
- **How:** Expose fluent setters for optional parts, enforce required fields, and validate invariants in `build()`; keep builders immutable where feasible.
- **Pitfalls:** Builders that ignore validation or leak partially built state defeat the purpose; don’t use when a small typed factory or record suffices.
- **Check:** Can a caller assemble valid objects without giant constructors, and does `build()` reject incomplete/invalid configurations?
