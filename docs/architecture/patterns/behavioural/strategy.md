# Strategy

- **Intent:** Encapsulate interchangeable algorithms behind a stable interface.
- **Use when:** Multiple ways exist to accomplish a task (pricing, caching, parsing) and you need to choose per configuration or runtime.
- **How:** Define a small interface; inject the chosen strategy; keep inputs/outputs consistent; prefer pure functions where possible.
- **Pitfalls:** Avoid strategies with divergent contracts; don’t hide selection logic all over—centralize it; avoid needless class hierarchies when a function suffices.
- **Check:** Swapping strategies does not require caller changes, and each strategy is independently testable.
