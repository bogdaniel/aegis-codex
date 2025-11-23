# Gateway

- **Intent:** Encapsulate calls to external systems (payment provider, partner API, legacy service) behind a stable interface.
- **Use when:** You need to shield the application from API quirks, retries, authentication, and error shapes of external dependencies.
- **How:** Define a clear interface with domain-friendly inputs/outputs; handle auth, retries with jitter, timeouts, idempotency, and error normalization inside.
- **Pitfalls:** Avoid leaking provider error codes or DTOs; do not let gateways grow business logic—keep them focused on integration.
- **Check:** Swapping providers or adding mocks/fakes requires changing only the gateway implementation, not application code.
