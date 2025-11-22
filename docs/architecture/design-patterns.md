# Design Patterns

Patterns are **named shapes** for common problems. They provide shared vocabulary between humans and agents.

Key rules:

- Prefer **simple, explicit code** over forcing a pattern.
- Only introduce a pattern when it **clearly reduces complexity** or enables required variability.
- Agents must always justify pattern use with the **problem it solves**, not “because it’s a pattern”.

---

## 1. Creational Patterns – How Objects Are Created

### Factory Method

- **What:** A base class or interface defines a method for creating objects; subclasses decide which concrete type to instantiate.
- **Use when:**
  - You need to vary the concrete type depending on configuration, environment, or subclass.
  - You want to avoid `if/else` or `switch` on types at every call site.
- **Why:** Localizes object creation, makes it easier to add new variants without editing existing calling code.

---

### Abstract Factory

- **What:** A factory that creates **families of related objects** that are meant to be used together.
- **Use when:**
  - You have multiple “families” (e.g., `WinButton/WinCheckbox` vs `MacButton/MacCheckbox`) and you want to switch the whole family at once.
  - UI themes, DB driver stacks, or plugin ecosystems must stay internally consistent.
- **Why:** Ensures compatibility inside a family and centralizes the choice of which family is active.

---

### Builder

- **What:** Step-by-step construction of complex objects, often with a fluent API.
- **Use when:**
  - Objects have many optional parameters or configuration combinations.
  - Constructors are getting long and hard to read, or invalid intermediate states are common.
- **Why:** Keeps creation readable and helps enforce validity (e.g., required fields before `build()`).

---

### Prototype

- **What:** Creating new objects by **cloning a prototypical instance** instead of constructing from scratch.
- **Use when:**
  - Object creation is expensive or complicated and many instances share most of their configuration.
- **Why:** Allows fast creation of variants by copying and tweaking a base instance.

---

### Singleton (Use Sparingly)

- **What:** Ensures there is exactly one instance of a class and provides a global way to access it.
- **Use when:**
  - There truly must be a **single process-wide instance** (e.g., a specific hardware handle).
- **Why:** Centralizes access to a unique resource.
- **Caveats:** Often abused. Hides dependencies, hurts testability. Prefer normal objects managed by DI and configuration.

---

## 2. Structural Patterns – How Objects Are Composed

### Adapter

- **What:** Wraps an object with an incompatible interface to make it match what the client expects.
- **Use when:**
  - Integrating third-party/legacy APIs that don’t match your project’s interfaces.
- **Why:** Keeps the rest of the codebase unaware of external quirks; you own the interface at your boundaries.

---

### Facade

- **What:** Provides a **simple, high-level API** over a complex subsystem.
- **Use when:**
  - A subsystem has many classes and steps, but callers should see a single “entry point”.
- **Why:** Reduces coupling and cognitive load; callers interact with a small surface, internals can evolve behind it.

---

### Composite

- **What:** Treats individual objects and compositions of objects **uniformly** (tree structures).
- **Use when:**
  - Working with hierarchies like UIs (widgets), file systems (files/folders), or nested menus.
- **Why:** Enables recursive operations and consistent handling of “leaf vs group” nodes.

---

### Decorator

- **What:** Wraps an object to **add behavior** before/after delegating to the wrapped object.
- **Use when:**
  - You want optional cross-cutting behavior (logging, caching, metrics, retries, encryption) without modifying the core class.
- **Why:** Lets you stack behaviors dynamically, combining them as needed without inheritance creep.

---

### Proxy

- **What:** An object that looks like the real thing but **controls access** to it.
- **Use when:**
  - You need lazy loading, remote access, permissions checks, caching, or rate limiting for a resource.
- **Why:** Centralizes access control and indirection; callers use the same interface as the underlying object.

---

### Flyweight

- **What:** Shares common state between many similar objects to reduce memory usage.
- **Use when:**
  - You have a huge number of small objects with lots of duplicated state (e.g., characters in a text document).
- **Why:** Splits state into shared (intrinsic) and unique (extrinsic), drastically reducing footprint.

---

### Bridge

- **What:** Decouples an abstraction from its implementation so both can vary independently.
- **Use when:**
  - You risk combinatorial explosion of subclasses (e.g., `RedCircle`, `BlueCircle`, `RedSquare`, `BlueSquare`).
- **Why:** You get two orthogonal hierarchies (e.g., Shape vs Rendering) and compose them at runtime instead of baking combinations into the type system.

---

## 3. Behavioral Patterns – How Behavior Varies and Interacts

### Strategy

- **What:** Encapsulates interchangeable algorithms/behaviors behind a common interface.
- **Use when:**
  - You have multiple ways to perform a task (sorting, pricing, caching) and want to pick at runtime or per configuration.
- **Why:** Removes `if/else` on “mode”; callers depend on the strategy interface, not concrete implementations.
- **Note:** In many modern languages, a first-class function or callback is a natural “strategy”.

---

### Observer / Publish–Subscribe

- **What:** Allows multiple observers to subscribe to updates from a subject without tight coupling.
- **Use when:**
  - Many parts of the system should react to events (GUI updates, domain events, notifications).
- **Why:** The subject doesn’t know who listens; observers can be added/removed without changing the subject.

---

### Command

- **What:** Represents an action as an object with `execute()` (and often `undo()`).
- **Use when:**
  - You need to queue, log, retry, or undo operations (jobs, workflows, UI actions).
- **Why:** Makes operations first-class: storable, serializable, composable.

---

### State

- **What:** Encapsulates state-dependent behavior in separate state objects.
- **Use when:**
  - An object’s behavior changes substantially based on its internal state, leading to big `switch`/`if` ladders.
- **Why:** Each state becomes its own class; switching behavior means swapping the current state object.

---

### Template Method

- **What:** Puts the skeleton of an algorithm in a base class and lets subclasses override specific steps.
- **Use when:**
  - Several variants share the same high-level process but differ in a few steps.
- **Why:** Keeps the overall flow consistent while allowing customization at defined points.
- **Note:** In composition-friendly designs, higher-order functions can often replace inheritance here.

---

### Iterator

- **What:** Provides a standard way to traverse a collection without exposing its internal representation.
- **Use when:**
  - You want a uniform iteration API over different collection types.
- **Why:** Hides collection details; callers just use `next()/hasNext()` or the language’s iteration constructs.

---

### Mediator

- **What:** Centralizes communication between many objects that would otherwise talk to each other directly.
- **Use when:**
  - UI widgets/components or services form a messy web of interactions.
- **Why:** Reduces many-to-many dependencies to many-to-one; behavior is coordinated by the mediator.

---

### Chain of Responsibility

- **What:** Passes a request along a chain of handlers until one handles it.
- **Use when:**
  - You have pipelines like middleware, filters, or validation steps where any step may handle or pass on.
- **Why:** Makes it easy to add/reorder behaviors without changing each handler’s code.

---

### Visitor

- **What:** Encapsulates operations over a fixed object structure in separate visitor objects.
- **Use when:**
  - You have a stable hierarchy (e.g., AST, scene graph) and keep adding new operations on it.
- **Why:** Adds new operations without changing the node classes every time.
- **Trade-off:** Adding new node types becomes more painful; best when the structure is stable.

---

### Memento

- **What:** Captures and externalizes an object’s internal state so it can be restored later.
- **Use when:**
  - You need undo/redo, snapshots, or checkpoints.
- **Why:** Allows state capture/restore without exposing the object’s internals to the rest of the system.

---

### Interpreter

- **What:** Represents and evaluates sentences in a simple language using a class hierarchy.
- **Use when:**
  - You have a small DSL or expression grammar to evaluate frequently (rules, filters, formulas).
- **Why:** Makes extending the language expressive and OO-friendly, though for complex languages other techniques (parsers, visitors, table-driven interpreters) are often better.

---

## 4. When *Not* to Introduce a Pattern

Patterns are tools, not goals. Avoid them when:

- A **simple function or class** solves the problem clearly.
- The pattern would **increase indirection** without reducing real complexity.
- You’re introducing it “just because” you recognise it from a book.
- The language already has a more idiomatic feature (e.g., functions/lambdas instead of Strategy, modules instead of Singleton).

Agents must always be able to answer:

> *“What concrete pain does this pattern remove here, and what is the trade-off?”*

If that answer isn’t convincing, prefer the simpler design.
