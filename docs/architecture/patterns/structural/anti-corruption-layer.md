# Anti-Corruption Layer (ACL)

- **Intent:** Protect a clean domain from leaking models and semantics of an external/legacy system.
- **Use when:** Integrating with systems that use different language, data shapes, or reliability/consistency guarantees.
- **How:** Introduce translators, adapters, and gateways that convert to your domain concepts; enforce validation, defaults, and invariants at the boundary.
- **Pitfalls:** Skipping translation leads to model drift; avoid coupling ACL to internal domain details that change frequently.
- **Check:** Domain code never manipulates external DTOs; changes in the external system are absorbed within the ACL with minimal ripple.
