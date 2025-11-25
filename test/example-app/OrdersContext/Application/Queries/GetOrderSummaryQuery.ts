import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';

/**
 * GetOrderSummaryQuery - Query DTO
 * Input for GetOrderSummary use case.
 */
export interface GetOrderSummaryQuery {
  orderId: OrderId;
  userId: string;
}

