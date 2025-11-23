# Bridge

- **Intent:** Decouple an abstraction from its implementation so each can vary independently.
- **Use when:** Combinatorial explosion of subclasses looms (e.g., shape × renderer, storage × format) or you need runtime swapping.
- **How:** Split into two orthogonal interfaces; inject the implementation into the abstraction; keep contracts small and stable.
- **Pitfalls:** Over-separation without real variability adds complexity; avoid tight coupling between the two hierarchies.
- **Check:** You can add a new implementation or abstraction without touching the other hierarchy’s classes.
