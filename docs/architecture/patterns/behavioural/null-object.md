# Null Object

- **Intent:** Provide a do-nothing implementation to avoid `null` checks and accidental `null` behavior.
- **Use when:** A default benign behavior exists and callers frequently check for presence before calling.
- **How:** Implement the same interface with safe defaults (no-ops, empty collections); document that it is intentional.
- **Pitfalls:** Hides errors when absence should be exceptional; avoid masking required data; do not overuse to avoid proper validation.
- **Check:** Replacing `null` branches with the null object simplifies callers without hiding legitimate failures.
