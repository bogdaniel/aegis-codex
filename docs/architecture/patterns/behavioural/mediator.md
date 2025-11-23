# Mediator

- **Intent:** Centralize complex interactions between many collaborators to avoid a mesh of direct dependencies.
- **Use when:** Components/widgets/services would otherwise call each other in many-to-many fashion; coordination logic needs a home.
- **How:** Route interactions through a mediator interface; keep participants dumb about each other; ensure mediator enforces ordering and validation.
- **Pitfalls:** Mediator can become a God object; watch for hidden coupling through shared state; keep logic cohesive.
- **Check:** Adding a new participant or interaction mostly touches the mediator, not all other components.
