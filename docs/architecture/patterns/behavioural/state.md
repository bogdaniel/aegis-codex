# State

- **Intent:** Encapsulate state-specific behavior into separate state objects instead of branching in one class.
- **Use when:** Behavior changes meaningfully with internal state, leading to large `switch`/`if` ladders.
- **How:** Model each state as its own type implementing a common interface; transition explicitly; keep the context small and safe to mutate.
- **Pitfalls:** Hidden transitions make flows hard to follow; avoid duplicating shared logic across states; guard against invalid transitions.
- **Check:** Adding a new state does not require editing unrelated states, and transitions are covered by tests.
