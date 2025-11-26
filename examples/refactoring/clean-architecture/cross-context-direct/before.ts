/**
 * BEFORE: Direct cross-context imports
 * Violates DDD: bounded contexts have no boundaries
 */

// ❌ OrdersContext directly imports IdentityContext Domain
import { User } from '@identity/domain/Entities/User.js';
import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';

// ❌ OrdersContext directly imports IdentityContext Infrastructure
import { InMemoryUserRepository } from '@identity/infra/Adapters/InMemoryUserRepository.js';

// ❌ OrdersContext Domain depends on IdentityContext Domain
export class Order {
  constructor(
    public readonly id: OrderId,
    public readonly userId: string,
    private readonly user: User // ❌ Direct Domain import
  ) {}

  // ❌ Uses IdentityContext Domain entity directly
  getCustomerEmail(): string {
    return this.user.email.toString(); // ❌ Tight coupling
  }
}

// ❌ OrdersContext Application directly uses IdentityContext Infrastructure
export class PlaceOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: InMemoryUserRepository // ❌ Direct Infrastructure import
  ) {}

  async execute(command: PlaceOrderCommand): Promise<void> {
    // ❌ Directly uses IdentityContext Infrastructure
    const user = await this.userRepository.findByEmail(
      UserEmail.create(command.userEmail) // ❌ Direct Domain import
    );

    if (!user) {
      throw new Error('User not found');
    }

    const order = new Order(
      OrderId.create(this.generateOrderId()),
      user.id.toString(),
      user // ❌ Direct Domain entity
    );

    await this.orderRepository.save(order);
  }

  private generateOrderId(): string {
    return `order_${Date.now()}`;
  }
}

// Problems:
// - Tight coupling between contexts
// - Changes to IdentityContext break OrdersContext
// - Cannot test OrdersContext without IdentityContext
// - Violates bounded context boundaries
// - No clear contracts between contexts


