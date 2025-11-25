import { OrderRepository } from '@orders/domain/Ports/OrderRepository.js';
import type { CancelOrderCommand } from '@orders/app/Commands/CancelOrderCommand.js';

/**
 * CancelOrder - Use Case (Application Layer)
 * Orchestrates order cancellation with authorization checks.
 * No framework dependencies.
 */
export class CancelOrder {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: CancelOrderCommand): Promise<void> {
    const order = await this.orderRepository.findById(command.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Authorization: user can only cancel their own orders
    if (order.getUserId() !== command.userId) {
      throw new Error('Unauthorized: cannot cancel another user\'s order');
    }

    // Domain logic: cancel order (enforces invariants)
    order.cancel();

    // Persist
    await this.orderRepository.save(order);
  }
}

