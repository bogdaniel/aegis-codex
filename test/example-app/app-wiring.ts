/**
 * Application Wiring - Dependency Injection
 * Creates and wires all layers together.
 * In a real application, use a DI container (Inversify, TSyringe, etc.).
 */

// Use public API modules for cross-context imports
import { RegisterUser, AuthenticateUser, ValidateToken } from '@identity/app/index.js';
import { PlaceOrder, CancelOrder, GetOrderSummary } from '@orders/app/index.js';

// Infrastructure adapters (within-context, can use full paths)
import { InMemoryUserRepository } from '@identity/infra/Adapters/InMemoryUserRepository.js';
import { IdentityPortAdapter as IdentityContextIdentityPortAdapter } from '@identity/infra/Adapters/IdentityPortAdapter.js';
import { IdentityHttpHandlers } from '@identity/interface/Adapters/HttpHandlers.js';

import { InMemoryOrderRepository } from '@orders/infra/Adapters/InMemoryOrderRepository.js';
import { InMemoryEventPublisher } from '@orders/infra/Adapters/InMemoryEventPublisher.js';
import { IdentityPortAdapter as OrdersIdentityPortAdapter } from '@orders/infra/Adapters/IdentityPortAdapter.js';
import { OrdersHttpHandlers } from '@orders/interface/Adapters/HttpHandlers.js';

export function createApp() {
  // IdentityContext wiring (Tier H)
  const identityUserRepository = new InMemoryUserRepository();
  const identityRegisterUser = new RegisterUser(
    identityUserRepository,
    async (password: string) => `hashed_${password}` // In real system, use bcrypt
  );
  const identityAuthenticateUser = new AuthenticateUser(
    identityUserRepository,
    async (password: string) => `hashed_${password}`,
    (userId: string) => `token_${userId}_${Date.now()}`
  );
  const identityValidateToken = new ValidateToken((token: string) => {
    // Simple token parsing (in real system, use JWT)
    const parts = token.split('_');
    if (parts.length < 3) return null;
    return {
      userId: parts[1] || '',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  });
  const identityPort = new IdentityContextIdentityPortAdapter(identityValidateToken);
  const identityHandlers = new IdentityHttpHandlers(
    identityRegisterUser,
    identityAuthenticateUser
  );

  // OrdersContext wiring (Tier M)
  const ordersRepository = new InMemoryOrderRepository();
  const ordersEventPublisher = new InMemoryEventPublisher();
  const ordersIdentityValidationPort = new OrdersIdentityPortAdapter(identityPort);
  const ordersPlaceOrder = new PlaceOrder(
    ordersRepository,
    ordersEventPublisher,
    ordersIdentityValidationPort
  );
  const ordersCancelOrder = new CancelOrder(ordersRepository);
  const ordersGetOrderSummary = new GetOrderSummary(ordersRepository);
  const ordersHandlers = new OrdersHttpHandlers(
    ordersPlaceOrder,
    ordersCancelOrder,
    ordersGetOrderSummary
  );

  return {
    identityHandlers,
    ordersHandlers,
    ordersEventPublisher, // Exposed for testing/debugging
  };
}

