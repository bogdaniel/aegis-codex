# Visitor

- **Intent:** Separate operations from the objects they operate on, enabling new operations without changing those objects.
- **Use when:** You have a stable set of element types forming a structure (ASTs, document nodes) and expect to add many operations.
- **How:** Define a visitor interface with methods per element type; elements accept a visitor and dispatch to the correct method; keep visitors stateless where possible.
- **Pitfalls:** Adding new element types is costly; avoid if element set changes frequently; double-dispatch can add complexity.
- **Check:** New operations are added by creating new visitors without editing element classes; traversal remains clear and tested.
