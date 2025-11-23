# Factory Method

- **Intent:** Let subclasses or injected factories decide which concrete implementation to create while keeping callers on an abstract type.
- **Use when:** Callers should not know concrete classes; you expect new variants over time; construction needs per-environment decisions.
- **How:** Define a creation hook (`create()`) on a base class or pass in a factory interface; keep parameters narrow and typed.
- **Pitfalls:** A long `switch` inside the factory is just indirection; overuse can hide simple constructors; avoid global registries without validation.
- **Check:** Can you add a new implementation by adding a class and wiring the factory, without touching callers? If not, simplify the design.
