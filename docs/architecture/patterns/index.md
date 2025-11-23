# Design Pattern Reference

Use these notes to apply patterns intentionally. Start from the problem (coupling, testability, extensibility) and pick the minimal pattern that solves it. Avoid cargo-cult usage; favor composition and plain functions when they suffice.

## Creational
- [Factory Method](creational/factory-method.md)
- [Abstract Factory](creational/abstract-factory.md)
- [Builder](creational/builder.md)
- [Prototype](creational/prototype.md)
- [Singleton](creational/singleton.md) (smell detector)
- [Object Pool](creational/object-pool.md)
- [Simple Factory](creational/simple-factory.md)

## Structural
- [Adapter](structural/adapter.md)
- [Bridge](structural/bridge.md)
- [Composite](structural/composite.md)
- [Decorator](structural/decorator.md)
- [Facade](structural/facade.md)
- [Flyweight](structural/flyweight.md)
- [Proxy](structural/proxy.md)
- [Data Mapper](structural/data-mapper.md)
- [Repository](structural/repository.md)
- [Gateway](structural/gateway.md)
- [Anti-Corruption Layer](structural/anti-corruption-layer.md)

## Behavioural
- [Chain of Responsibility](behavioural/chain-of-responsibility.md)
- [Command](behavioural/command.md)
- [Iterator](behavioural/iterator.md)
- [Mediator](behavioural/mediator.md)
- [Memento](behavioural/memento.md)
- [Observer](behavioural/observer.md)
- [State](behavioural/state.md)
- [Strategy](behavioural/strategy.md)
- [Template Method](behavioural/template-method.md)
- [Visitor](behavioural/visitor.md)
- [Null Object](behavioural/null-object.md)
- [Specification](behavioural/specification.md)
- [Pipeline / Filter](behavioural/pipeline-filter.md)

## Architectural & Enterprise
- [Layered Architecture](architectural-enterprise/layered-architecture.md)
- [CQRS](architectural-enterprise/cqrs.md)
- [Event Sourcing](architectural-enterprise/event-sourcing.md)
- [Saga / Process Manager](architectural-enterprise/saga-process-manager.md)
- [Domain Event](architectural-enterprise/domain-event.md)
- [Aggregate](architectural-enterprise/aggregate.md)
- [Value Object](architectural-enterprise/value-object.md)
- [Unit of Work](architectural-enterprise/unit-of-work.md)
- [Active Record](architectural-enterprise/active-record.md) (anti-pattern note)
- [Circuit Breaker](architectural-enterprise/circuit-breaker.md)
- [Retry / Timeout](architectural-enterprise/retry-timeout.md)
- [Bulkhead](architectural-enterprise/bulkhead.md)
- [Strangler Fig](architectural-enterprise/strangler-fig.md)
- [Outbox Pattern](architectural-enterprise/outbox-pattern.md)
