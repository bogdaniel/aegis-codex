# Layered Architecture

- **Intent:** Separate concerns into layers (e.g., presentation → application → domain → infrastructure) with clear dependencies pointing inward.
- **Use when:** Building services that benefit from isolation between business logic and IO/frameworks; most backends by default.
- **How:** Keep domain pure; application orchestrates use cases; infrastructure implements interfaces/ports; enforce dependency rules via tooling/reviews.
- **Pitfalls:** Leaky boundaries (domain depending on frameworks), anemic domain models, and “service” layers that just pass through.
- **Check:** A layer depends only on the next inner layer; swapping infrastructure (DB, transport) doesn’t change domain logic.
