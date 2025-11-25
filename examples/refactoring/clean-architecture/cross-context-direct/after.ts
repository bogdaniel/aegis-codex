/**
 * AFTER: Public API modules with ACL pattern
 * Cross-context communication via explicit contracts
 */

// ============================================
// IdentityContext: Public API Module
// ============================================

// ✅ IdentityContext/Application/index.ts (Public API)
export { RegisterUser } from './UseCases/RegisterUser.js';
export { AuthenticateUser } from './UseCases/AuthenticateUser.js';

// ✅ Port exported for cross-context use (via ACL)
export { IdentityPort } from './Ports/IdentityPort.js';

// ✅ Commands/Queries exported as types only
export type { RegisterUserCommand } from './Commands/RegisterUserCommand.js';
export type { ValidateUserQuery } from './Queries/ValidateUserQuery.js';

// ✅ IdentityContext Domain is NOT exported (private to context)

// ============================================
// OrdersContext: Uses Public API Only
// ============================================

// ✅ OrdersContext imports from IdentityContext public API only
import { IdentityPort } from '@identity/app/index.js'; // ✅ Public API module
import type { ValidateUserQuery } from '@identity/app/index.js'; // ✅ Type-only import

// ❌ FORBIDDEN: Direct Domain/Infrastructure imports
// import { User } from '@identity/domain/Entities/User.js'; // ❌
// import { InMemoryUserRepository } from '@identity/infra/Adapters/InMemoryUserRepository.js'; // ❌

// ✅ OrdersContext defines its own ACL interface
export interface IdentityValidationPort {
  validateUser(email: string): Promise<{ userId: string; email: string } | null>;
}

// ✅ OrdersContext Domain is independent
export class Order {
  constructor(
    public readonly id: OrderId,
    public readonly userId: string, // ✅ Only ID, not full User entity
    public readonly customerEmail: string // ✅ Only needed data
  ) {}

  // ✅ No dependency on IdentityContext Domain
  getCustomerEmail(): string {
    return this.customerEmail;
  }
}

export class OrderId {
  private constructor(private readonly value: string) {
    if (!value) throw new Error('Order ID cannot be empty');
  }

  static create(value: string): OrderId {
    return new OrderId(value);
  }

  toString(): string {
    return this.value;
  }
}

// ✅ OrdersContext Application uses ACL interface
export class PlaceOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly identityValidation: IdentityValidationPort // ✅ ACL interface, not IdentityPort
  ) {}

  async execute(command: PlaceOrderCommand): Promise<void> {
    // ✅ Uses ACL interface (shielded from IdentityContext internals)
    const userInfo = await this.identityValidation.validateUser(command.userEmail);

    if (!userInfo) {
      throw new Error('User not found');
    }

    // ✅ OrdersContext Domain entity (no IdentityContext dependency)
    const order = new Order(
      OrderId.create(this.generateOrderId()),
      userInfo.userId,
      userInfo.email
    );

    await this.orderRepository.save(order);
  }

  private generateOrderId(): string {
    return `order_${Date.now()}`;
  }
}

export interface PlaceOrderCommand {
  userEmail: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
}

// ============================================
// OrdersContext Infrastructure: ACL Adapter
// ============================================

// ✅ ACL adapter translates between OrdersContext ACL and IdentityContext port
import { IdentityPort } from '@identity/app/index.js';

export class IdentityValidationPortAdapter implements IdentityValidationPort {
  constructor(private readonly identityPort: IdentityPort) {}

  async validateUser(email: string): Promise<{ userId: string; email: string } | null> {
    // ✅ Translates IdentityContext port to OrdersContext ACL interface
    const query: ValidateUserQuery = { email };
    const result = await this.identityPort.validateUser(query);

    if (!result) {
      return null;
    }

    // ✅ Maps IdentityContext result to OrdersContext format
    return {
      userId: result.userId,
      email: result.email,
    };
  }
}

// ============================================
// Wiring (outside bounded contexts)
// ============================================

// ✅ Wiring connects IdentityContext port to OrdersContext ACL adapter
export function wireOrdersContext(
  identityPort: IdentityPort
): {
  placeOrder: PlaceOrder;
} {
  // ✅ ACL adapter translates between contexts
  const identityValidation = new IdentityValidationPortAdapter(identityPort);

  const orderRepository = new InMemoryOrderRepository();
  const placeOrder = new PlaceOrder(orderRepository, identityValidation);

  return { placeOrder };
}

// ✅ Benefits:
// - Clear boundaries between contexts
// - Changes to IdentityContext don't break OrdersContext
// - OrdersContext can be tested independently (mock ACL interface)
// - Explicit contracts via public API modules
// - ACL pattern shields contexts from each other's internals

// Helper classes (for completeness)
class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<void> {
    this.orders.set(order.id.toString(), order);
  }

  async findById(id: OrderId): Promise<Order | null> {
    return this.orders.get(id.toString()) || null;
  }
}

