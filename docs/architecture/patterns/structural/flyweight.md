# Flyweight

- **Intent:** Share intrinsic state across many fine-grained objects to reduce memory/creation cost.
- **Use when:** Large numbers of similar objects duplicate most state (e.g., text glyphs, map tiles) and memory/GC pressure matters.
- **How:** Separate shared (intrinsic) vs unique (extrinsic) data; centralize shared objects in a factory/cache; ensure thread safety.
- **Pitfalls:** Overheads of lookup may outweigh savings for small sets; beware mutating shared state; measure before and after.
- **Check:** Memory use drops without changing behavior, and extrinsic state remains correctly associated per caller.
