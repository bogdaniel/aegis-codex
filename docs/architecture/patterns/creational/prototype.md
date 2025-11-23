# Prototype

- **Intent:** Clone a configured instance to create similar objects cheaply and consistently.
- **Use when:** Object creation is expensive or complicated, and new instances mostly share state with a template.
- **How:** Provide safe cloning (`copy/clone`) that duplicates mutable state correctly; ensure deep vs shallow copy rules are explicit.
- **Pitfalls:** Hidden shared references cause bugs; prefer explicit constructors when cloning is not cheaper or clearer.
- **Check:** Can callers tweak only the differing fields after cloning, without unexpected shared state?
