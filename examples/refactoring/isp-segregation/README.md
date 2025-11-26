# ISP: Interface Segregation Principle — Focused Interfaces

## Problem

Large "god" interface with many methods:
- Clients depend on methods they don't use
- Changes to one method affect all clients
- Violates Interface Segregation Principle (clients should not depend on unused methods)

## Solution

Split into focused interfaces:
- Each interface has a single, cohesive responsibility
- Clients depend only on interfaces they actually use
- Changes to one interface don't affect unrelated clients

## Files

- `before.ts` — Large interface with many methods
- `after.ts` — Split into focused interfaces

## Principles Applied

- **ISP:** Clients should not depend on methods they don't use
- **SRP:** Each interface has one responsibility
- **Clean Architecture:** Ports are focused and cohesive


