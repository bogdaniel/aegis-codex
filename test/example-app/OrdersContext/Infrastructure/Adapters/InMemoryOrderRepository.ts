import { Order } from '@orders/domain/Entities/Order.js';
import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';
import { OrderRepository } from '@orders/domain/Ports/OrderRepository.js';

/**
 * InMemoryOrderRepository - Outbound Adapter (Infrastructure)
 * Implements OrderRepository port using in-memory storage.
 */
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.orders.set(order.getId().toString(), order);
  }

  async findById(id: OrderId): Promise<Order | null> {
    return this.orders.get(id.toString()) || null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.getUserId() === userId
    );
  }
}

