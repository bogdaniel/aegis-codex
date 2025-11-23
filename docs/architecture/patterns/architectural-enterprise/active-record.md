# Active Record (anti-pattern note)

- **Intent:** Combine data access and domain logic in the same object.
- **Use when:** Only for simple CRUD with minimal business logic; otherwise prefer repositories/data mappers.
- **Risks:** Couples domain to persistence; encourages fat models with mixed concerns; hard to test invariants and swap storage.
- **Guidance:** Treat as a smell in rich domains; isolate persistence behind repositories and services; keep domain logic in aggregates/value objects.
- **Check:** If adding rules requires touching DB plumbing or vice versa, move away from Active Record toward cleaner separation.
