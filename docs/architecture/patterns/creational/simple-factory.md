# Simple Factory

- **Intent:** Centralize straightforward object creation logic behind a single function or module.
- **Use when:** You need one place to map inputs/config to concrete implementations, but full Factory Method/Abstract Factory is overkill.
- **How:** Implement a small function returning the correct type; keep branching minimal and validated; prefer pure functions over classes.
- **Pitfalls:** Don’t let it grow into a God factory with business logic; avoid hiding side effects or global state behind it.
- **Check:** Callers stay simple, and adding a new variant means updating only this function plus tests—not scattering conditionals.
