import { describe, it, expect, beforeEach } from 'vitest';
import { PlaceOrder } from '@orders/app/UseCases/PlaceOrder.js';
import { InMemoryOrderRepository } from '@orders/infra/Adapters/InMemoryOrderRepository.js';
import { InMemoryEventPublisher } from '@orders/infra/Adapters/InMemoryEventPublisher.js';
import { IdentityValidationPort } from '@orders/app/Ports/IdentityValidationPort.js';
import { OrderId } from '@orders/domain/ValueObjects/OrderId.js';
import { OrderPlaced } from '@orders/domain/Events/OrderPlaced.js';

class MockIdentityValidationPort implements IdentityValidationPort {
  async validateToken(_token: string): Promise<{ userId: string } | null> {
    return { userId: 'user_123' };
  }
}

describe('PlaceOrder', () => {
  let placeOrder: PlaceOrder;
  let orderRepository: InMemoryOrderRepository;
  let eventPublisher: InMemoryEventPublisher;
  let identityPort: MockIdentityValidationPort;

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    eventPublisher = new InMemoryEventPublisher();
    identityPort = new MockIdentityValidationPort();
    placeOrder = new PlaceOrder(orderRepository, eventPublisher, identityPort);
  });

  it('should place an order successfully', async () => {
    const command = {
      userId: 'user_123',
      items: [
        { productId: 'prod_1', quantity: 2, unitPrice: 10.0 },
        { productId: 'prod_2', quantity: 1, unitPrice: 5.0 },
      ],
    };

    const orderId = await placeOrder.execute(command);

    expect(orderId).toBeInstanceOf(OrderId);
    const order = await orderRepository.findById(orderId);
    expect(order).not.toBeNull();
    expect(order?.getUserId()).toBe('user_123');
    expect(order?.getItems().length).toBe(2);
    expect(order?.getTotalAmount()).toBe(25.0);
  });

  it('should publish OrderPlaced event', async () => {
    const command = {
      userId: 'user_123',
      items: [{ productId: 'prod_1', quantity: 1, unitPrice: 10.0 }],
    };

    await placeOrder.execute(command);

    const events = eventPublisher.getPublishedEvents();
    expect(events.length).toBe(1);
    expect(events[0]).toBeInstanceOf(OrderPlaced);

    const orderPlacedEvent = events[0] as OrderPlaced;
    expect(orderPlacedEvent.userId).toBe('user_123');
    expect(orderPlacedEvent.totalAmount).toBe(10.0);
  });

  it('should throw error if order has no items', async () => {
    const command = {
      userId: 'user_123',
      items: [],
    };

    await expect(placeOrder.execute(command)).rejects.toThrow(
      'Order must have at least one item'
    );
  });

  it('should calculate total amount correctly', async () => {
    const command = {
      userId: 'user_123',
      items: [
        { productId: 'prod_1', quantity: 3, unitPrice: 10.0 },
        { productId: 'prod_2', quantity: 2, unitPrice: 5.0 },
      ],
    };

    const orderId = await placeOrder.execute(command);
    const order = await orderRepository.findById(orderId);

    expect(order?.getTotalAmount()).toBe(40.0); // (3 * 10) + (2 * 5)
  });
});

