/**
 * OrderItem - Value Object
 * Represents a line item in an order.
 */
export class OrderItem {
  private constructor(
    private readonly productId: string,
    private readonly quantity: number,
    private readonly unitPrice: number
  ) {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    if (unitPrice < 0) {
      throw new Error('Unit price cannot be negative');
    }
  }

  static create(productId: string, quantity: number, unitPrice: number): OrderItem {
    return new OrderItem(productId, quantity, unitPrice);
  }

  getProductId(): string {
    return this.productId;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getUnitPrice(): number {
    return this.unitPrice;
  }

  getTotal(): number {
    return this.quantity * this.unitPrice;
  }
}

