# SRP: Splitting a God Class

## Problem

A `UserService` class that mixes multiple responsibilities:
- User validation
- User persistence
- Email formatting
- Email sending
- Password hashing

## Solution

Split into focused classes:
- `User` (Domain entity) — encapsulates user data and invariants
- `UserRepository` (Domain port) — persistence interface
- `PasswordHasher` (Domain service) — password hashing
- `EmailFormatter` (Domain service) — email formatting
- `EmailSender` (Application port) — email sending interface
- `RegisterUser` (Application use case) — orchestrates registration

## Files

- `before.ts` — God class with multiple responsibilities
- `after.ts` — Split into focused classes following Clean Architecture

## Principles Applied

- **SRP:** Each class has one responsibility
- **Clean Architecture:** Domain/Application/Infrastructure separation
- **DIP:** Depend on interfaces, not concrete classes

