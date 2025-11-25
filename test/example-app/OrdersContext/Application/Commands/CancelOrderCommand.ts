import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';

/**
 * CancelOrderCommand - Command DTO
 * Input for CancelOrder use case.
 */
export interface CancelOrderCommand {
  orderId: OrderId;
  userId: string;
}

