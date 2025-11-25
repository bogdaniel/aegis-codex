/**
 * PlaceOrderCommand - Command DTO
 * Input for PlaceOrder use case.
 */
export interface PlaceOrderCommand {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
}

