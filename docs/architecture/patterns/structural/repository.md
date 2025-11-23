# Repository

- **Intent:** Provide a collection-like interface for aggregate persistence, encapsulating queries and storage concerns.
- **Use when:** Aggregates need to be retrieved/stored with clear boundaries, especially in DDD contexts.
- **How:** Define repository interfaces per aggregate; expose intent-revealing methods (`findById`, `save`); implement with data mappers/ORM behind the interface.
- **Pitfalls:** Do not leak query languages or join-heavy logic to callers; avoid God repositories covering unrelated aggregates.
- **Check:** Domain/application code uses repositories without knowing DB/schema details; tests can swap implementations or fakes easily.
