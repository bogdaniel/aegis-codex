import { OrderRepository } from '@orders/domain/Ports/OrderRepository.js';
import type { GetOrderSummaryQuery } from '@orders/app/Queries/GetOrderSummaryQuery.js';

/**
 * GetOrderSummary - Use Case (Application Layer)
 * Retrieves order summary with authorization checks.
 * No framework dependencies.
 */
export class GetOrderSummary {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(query: GetOrderSummaryQuery): Promise<{
    id: string;
    userId: string;
    status: string;
    totalAmount: number;
    itemCount: number;
  }> {
    const order = await this.orderRepository.findById(query.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    // Authorization: user can only view their own orders
    if (order.getUserId() !== query.userId) {
      throw new Error('Unauthorized: cannot view another user\'s order');
    }

    return {
      id: order.getId().toString(),
      userId: order.getUserId(),
      status: order.getStatus(),
      totalAmount: order.getTotalAmount(),
      itemCount: order.getItems().length,
    };
  }
}

