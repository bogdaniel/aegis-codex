# Value Object

- **Intent:** Represent an immutable concept defined by its value, not identity.
- **Use when:** Modeling money, dates, coordinates, emails—where equality is by value and invariants matter.
- **How:** Make immutable; validate on creation; provide meaningful equality; avoid exposing raw primitives directly; keep behavior close to the concept.
- **Pitfalls:** Allowing mutation breaks guarantees; bypassing constructors/validators; leaking unvalidated primitives across boundaries.
- **Check:** Two instances with the same data are equal; invalid values cannot be constructed; usage improves readability over raw primitives.
