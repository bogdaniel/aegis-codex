/**
 * OrderStatus - Value Object (Enum-like)
 * Represents the lifecycle state of an order.
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

