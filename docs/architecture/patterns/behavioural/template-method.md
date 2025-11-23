# Template Method

- **Intent:** Define the skeleton of an algorithm in a base class and let subclasses override specific steps.
- **Use when:** Variants share the same high-level flow but differ in a few steps; you want to enforce order and defaults.
- **How:** Implement fixed steps in the template; mark overridable hooks; document which steps must be provided; avoid calling overridable methods from constructors.
- **Pitfalls:** Inheritance can hide coupling; prefer composition/higher-order functions when feasible; avoid making every step overridable.
- **Check:** New variants require overriding only the intended hooks, and the base flow stays consistent and testable.
