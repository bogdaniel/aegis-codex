# Proxy

- **Intent:** Interpose a stand-in object that controls access to a real subject while keeping the same interface.
- **Use when:** You need lazy loading, access control, caching, remote invocation, rate limiting, or audit at a boundary.
- **How:** Implement the subject interface; delegate with added behavior (auth, retries, batching); keep latency/timeout policies explicit.
- **Pitfalls:** Avoid surprising behavior differences from the real subject; don’t hide failures—surface clear errors and metrics.
- **Check:** Swapping in the real subject preserves correctness; added behavior is intentional, observable, and tested.
