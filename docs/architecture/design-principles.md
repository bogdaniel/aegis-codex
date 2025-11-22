# Design Principles (High-Level)

These are the everyday principles that should shape how code is written and reviewed.
Agents (especially `@architect`, `@code-reviewer`, `@refactorer`, and `@test-engineer`) should treat them as defaults.

Think of this file as the **“mental checklist”**; details for specific areas (security, testing, architecture) live in their own docs.

---

## 1. Foundational Software Design

These are the base rules for structuring any non-trivial codebase.

### Separation of Concerns

- Each module/class should have a **single, clear concern**: IO, orchestration, domain logic, persistence, etc.
- Avoid “god” modules that mix HTTP, domain rules, DB access, and logging in one place.
- See also: `docs/architecture/architecture-patterns.md` for Clean/Hexagonal & vertical slices.

### High Cohesion, Low Coupling

- **High cohesion:** things that change together live together (feature modules, domain services).
- **Low coupling:** modules communicate through small, stable interfaces; no deep knowledge of each other’s internals.
- Smell: a change in one feature forces edits across unrelated modules.

### Abstraction, Encapsulation, Information Hiding

- Hide internals behind narrow, well-named APIs.
- Don’t expose raw data structures where invariants can be violated; prefer methods that enforce rules.
- Consumers should not need to know *how* something is done, only *what* it does.

### Composition Over Inheritance

- Prefer composing behavior out of smaller objects/functions over inheritance hierarchies.
- Use inheritance only for true “is-a + same contract” relationships that respect LSP.
- Decorators, strategies, and simple helpers usually beat deep base classes.

### Single Source of Truth (SSOT)

- Each piece of information has **one authoritative representation**.
- Derived values should be computed, not copied and manually kept in sync.
- Smell: fields like `status` + `isActive` + `archived` that can contradict each other.

### Immutability by Default & Idempotence at Boundaries

- Prefer immutable data structures in core logic; reuse is safer when objects don’t change under your feet.
- Side-effectful operations (sending events, persisting state) should be **idempotent** where feasible, so they can safely be retried.
- Good defaults: pure functions inside, mutation at well-controlled edges.

### Locality of Reference & Minimal Global State

- Keep related data and behavior close together (same module, same feature).
- Avoid hidden global state and singletons; pass dependencies explicitly or via DI.
- Smell: “magic” configuration or state shared across unrelated areas.

### Design by Contract & Fail Fast

- Each function/module has implicit **contracts**:
  - Preconditions (what callers must provide),
  - Postconditions (what is guaranteed on return),
  - Invariants (what is always true).
- Fail **early and loudly** when contracts are violated; don’t let invalid state leak deeper into the system.

### Principle of Least Astonishment

- Code and APIs should behave in the way that **surprises other engineers the least**.
- Names, performance characteristics, and side effects should match what a reasonable reader expects.
- If using an API feels “tricky” or surprising, the design is probably wrong.

### Law of Demeter (“Don’t Talk to Strangers”)

- Avoid long chains like `order.customer.address.city.name.toUpperCase()`.
- Call methods on immediate collaborators; let them handle their own internals.
- Prefer expressive methods: `order.customerCityUppercase()` over poking through nested structures.

### Command–Query Separation (CQS)

- Prefer functions that either:
  - **Command:** change state and return nothing, or
  - **Query:** return data and have no side effects.
- Mixing both in one method makes code harder to reason about and test.
- System-level CQRS guidance lives in `docs/architecture/architecture-patterns.md`.

---

## 2. Code-Level Heuristics (Daily Tactics)

These are the “small habits” that keep codebases sane.

### DRY (Don’t Repeat Yourself)

- Avoid duplicating **knowledge**, not just lines of code.
- Extract shared logic into helpers/components once it is clearly shared and stable.
- Beware over-DRY: premature abstractions that couple unrelated things are worse than a little duplication.

### KISS (Keep It Simple, Stupid)

- Prefer the **simplest design** that satisfies the requirements and constraints.
- Avoid clever generic abstractions when a straightforward implementation will do.
- Complexity must be justified (e.g., for resilience, performance, or flexibility), not just “felt cool”.

### YAGNI (You Aren’t Gonna Need It)

- Don’t build features, extension points, or configuration “just in case”.
- Base abstractions on **actual use-cases**, not hypothetical futures.
- Tension with OCP is intentional: extensibility must pay for itself.

### Tell, Don’t Ask

- Tell objects what to do instead of pulling their data out and making decisions externally.
- Example: prefer `cart.applyDiscount(discount)` over `if (cart.total > 0) { cart.total -= discount; }`.
- This keeps invariants and rules **inside** the type that owns the data.

### Explicit Over Implicit Magic

- Be explicit about behavior, dependencies, and data flow.
- Avoid hidden behavior (e.g., surprising side effects in getters, “magic” global hooks).
- Agents should remove “clever” but opaque constructs in favor of explicit, boring code.

### Small, Focused Units

- Functions should typically do **one thing well** and be short enough to hold in your head (~20–30 lines is a soft guideline, not a law).
- Classes and modules should have a tight, coherent purpose (one main responsibility).
- Large units are often a sign that boundaries are missing.

---

## 3. Object-Oriented & Architectural Principles

These bind the local design rules into larger structures.

### SOLID (OO Design Defaults)

Use SOLID as the default OO lens:

- **SRP:** one reason to change.
- **OCP:** open for extension, closed for modification.
- **LSP:** subtypes behave as promised by their base type.
- **ISP:** many small interfaces, not one giant one.
- **DIP:** high-level code depends on abstractions, not concretes.

See `docs/architecture/solid-principles.md` for more detail.

### GRASP (Responsibility Assignment)

Use GRASP ideas (implicitly or explicitly) when distributing behavior:

- **Information Expert:** put behavior where the relevant data lives.
- **Creator:** types that aggregate or closely use another type should create it.
- **Controller:** a single coordinator object receives system events and delegates work, instead of every object talking to every other.
- **Polymorphism:** use polymorphic types to handle variations instead of switch/if chains on type.

You don’t need to name GRASP in code reviews, but the **intent** should be obvious: responsibilities are placed where they make the most sense.

### Clean / Hexagonal Architecture & DDD

- Separate **domain** from frameworks and IO: domain → application → infrastructure → interface.
- Keep dependencies pointing **inwards**; frameworks and drivers are plugins, not the center.
- Use **bounded contexts** and clear contracts between them (HTTP, messages, events, ACLs).
- Only reach for full DDD (aggregates, value objects, domain events) when domain complexity justifies it.

Detailed guidance lives in:

- `docs/architecture/architecture-patterns.md`
- `docs/architecture/system-decomposition.md`
- `docs/architecture/architecture-anti-patterns.md`

---

## 4. Testing, Quality, and Observability

These principles overlap with `docs/testing-standards.md` and `docs/observability-standards.md`; this section is the design-side summary.

### Design for Testability

- Prefer pure functions and side-effect-free modules where possible.
- Inject external dependencies (DB, HTTP clients, clocks, random sources) so they can be faked in tests.
- Avoid hidden singletons that block isolation.

### Determinism Where Feasible

- Keep non-determinism (time, randomness, concurrency) at the **edges**, behind abstractions.
- Use injectable clocks and random sources for anything that needs to be tested.
- Idempotent and deterministic operations are easier to reason about and recover.

### Observability from Day 0

- Design with **structured logs**, metrics, and traces in mind—not as an afterthought.
- Critical paths should emit enough telemetry to reconstruct what happened without attaching a debugger.
- Align code boundaries with places you want to instrument.

### Error Handling & Resilience

- Avoid swallowing errors; propagate or handle them explicitly with context.
- Fail fast on invalid inputs and impossible states.
- Use timeouts, retries with backoff, and circuit breakers where appropriate (see architecture and performance docs).

---

## 5. Security & Robustness (Pointers)

Security has its own doc (`docs/security-standards.md`), but the design-side principles are:

- **Least Privilege:** limit what each component can do and see.
- **Secure by Default:** safe behavior should be the default mode; “dangerous” behavior must be explicit and visible.
- **Validate inputs, encode outputs:** never trust external input; always encode for the target sink (SQL, HTML, logs, etc.).
- **No secrets in code:** secrets must come from secure configuration, not hardcoded values.

Agents should treat security as **non-negotiable**, not an optional add-on.

---

Use this page as the **baseline lens**. When there’s tension between principles (e.g., DRY vs KISS, OCP vs YAGNI), agents must make the trade-off explicit in their reasoning and prefer the option that reduces **long-term risk and complexity** for the actual project, not theoretical purity.
