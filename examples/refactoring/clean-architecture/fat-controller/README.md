# Clean Architecture: Fat Controller → Thin Controller

## Problem

Controller contains business logic:
- Email validation
- Password validation
- Email uniqueness check
- Password hashing
- User creation

This violates Clean Architecture: business logic belongs in Application layer, not Interface layer.

## Solution

Move business logic to Application use case:
- Controller only translates HTTP ↔ Application commands
- Use case contains all business logic
- Controller is thin (delegate to use case)

## Files

- `before.ts` — Fat controller with business logic
- `after.ts` — Thin controller + Application use case

## Principles Applied

- **Clean Architecture:** Business logic in Application layer, not Interface layer
- **SRP:** Controller has one responsibility (HTTP translation)
- **DIP:** Controller depends on Application use case (abstraction)

