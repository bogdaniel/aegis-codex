import { Order } from '@orders/domain/Entities/Order.js';
import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';

/**
 * OrderRepository - Port (Interface)
 * Defined in Domain layer; implemented in Infrastructure.
 * No framework dependencies.
 */
export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
}

