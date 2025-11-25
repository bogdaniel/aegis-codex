/**
 * OrderId - Value Object
 * Immutable identifier for an Order aggregate.
 */
export class OrderId {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
  }

  static create(value: string): OrderId {
    return new OrderId(value);
  }

  equals(other: OrderId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  getValue(): string {
    return this.value;
  }
}

