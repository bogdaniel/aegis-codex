# OCP: Open/Closed Principle — Extension via Interfaces

## Problem

Payment processor that requires modification to add new payment methods:
- Uses if/switch statements to handle different payment types
- Adding a new payment method requires modifying existing code
- Violates Open/Closed Principle (open for extension, closed for modification)

## Solution

Extend via interfaces:
- Define `PaymentMethod` interface
- Each payment method implements the interface
- Add new payment methods by creating new implementations (no modification needed)
- Payment processor depends on interface, not concrete implementations

## Files

- `before.ts` — Payment processor with if/switch on payment type
- `after.ts` — Payment processor using interface-based extension

## Principles Applied

- **OCP:** Open for extension (new implementations), closed for modification
- **DIP:** Depend on abstractions (PaymentMethod interface)
- **Strategy Pattern:** Each payment method is a strategy


