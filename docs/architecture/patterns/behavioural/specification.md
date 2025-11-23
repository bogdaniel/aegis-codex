# Specification

- **Intent:** Encapsulate business rules/predicates so they can be combined, reused, and tested independently.
- **Use when:** Complex filtering/eligibility rules must be reused across services or translated to queries.
- **How:** Model specifications as composable predicates (e.g., `and`, `or`, `not`); keep them pure; provide translation hooks for persistence if needed.
- **Pitfalls:** Avoid scattering rules across services; ensure translations to queries are correct and safe from injection; don’t over-engineer for simple predicates.
- **Check:** Rules are expressed once, reused across contexts, and covered by tests; combining specs is straightforward and intention-revealing.
