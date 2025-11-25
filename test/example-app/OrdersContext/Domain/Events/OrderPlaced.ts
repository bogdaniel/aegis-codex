import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';

/**
 * OrderPlaced - Domain Event
 * Published when an order is successfully placed.
 * Used for cross-context communication and integration.
 */
export class OrderPlaced {
  constructor(
    public readonly orderId: OrderId,
    public readonly userId: string,
    public readonly totalAmount: number,
    public readonly occurredAt: Date
  ) {}

  static create(orderId: OrderId, userId: string, totalAmount: number): OrderPlaced {
    return new OrderPlaced(orderId, userId, totalAmount, new Date());
  }
}

