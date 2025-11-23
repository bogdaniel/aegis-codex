# Facade

- **Intent:** Provide a simple, cohesive API over a complex subsystem.
- **Use when:** Callers should not manage multiple collaborators or sequence steps manually; you need a single entry point.
- **How:** Expose a small surface that orchestrates underlying services; keep inputs/outputs domain-friendly; hide plumbing details.
- **Pitfalls:** Do not let the facade become a God object; keep subsystem abstractions intact behind it; avoid leaking low-level errors.
- **Check:** Callers interact with the facade only, and subsystem changes rarely require caller changes.
