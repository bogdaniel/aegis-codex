# Data Mapper

- **Intent:** Isolate domain objects from persistence details by mapping between domain models and storage representations.
- **Use when:** You want a clean domain layer without persistence concerns, especially with ORMs or bespoke serialization.
- **How:** Implement mappers that translate to/from persistence DTOs; keep mapping pure and covered by tests; enforce invariants in the domain, not the mapper.
- **Pitfalls:** Avoid leaking persistence types (rows/entities) into domain; prevent duplicate mapping logic scattered across services.
- **Check:** Domain objects remain persistence-agnostic, and changes to the database schema only touch mappers and adapters.
