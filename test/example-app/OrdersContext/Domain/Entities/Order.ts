import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';
import { OrderItem } from '@orders/domain/ValueObjects/OrderItem.js';
import { OrderStatus } from '@orders/domain/ValueObjects/OrderStatus.js';
import { OrderPlaced } from '@orders/domain/Events/OrderPlaced.js';

/**
 * Order - Aggregate Root (Tier M)
 * Encapsulates order business logic and invariants.
 * Enforces: orders cannot be cancelled if already completed, etc.
 */
export class Order {
  private constructor(
    private readonly id: OrderId,
    private readonly userId: string,
    private readonly items: readonly OrderItem[],
    private status: OrderStatus,
    private readonly createdAt: Date
  ) {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    if (!userId || userId.trim().length === 0) {
      throw new Error('Order must have a valid userId');
    }
  }

  static create(id: OrderId, userId: string, items: OrderItem[]): Order {
    return new Order(id, userId, items, OrderStatus.PENDING, new Date());
  }

  static reconstitute(
    id: OrderId,
    userId: string,
    items: OrderItem[],
    status: OrderStatus,
    createdAt: Date
  ): Order {
    return new Order(id, userId, items, status, createdAt);
  }

  getId(): OrderId {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getItems(): readonly OrderItem[] {
    return this.items;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getTotalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }

  cancel(): void {
    if (this.status === OrderStatus.COMPLETED) {
      throw new Error('Cannot cancel a completed order');
    }
    if (this.status === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }
    this.status = OrderStatus.CANCELLED;
  }

  confirm(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be confirmed');
    }
    this.status = OrderStatus.CONFIRMED;
  }

  complete(): void {
    if (this.status !== OrderStatus.CONFIRMED) {
      throw new Error('Only confirmed orders can be completed');
    }
    this.status = OrderStatus.COMPLETED;
  }

  toOrderPlacedEvent(): OrderPlaced {
    return OrderPlaced.create(this.id, this.userId, this.getTotalAmount());
  }
}

