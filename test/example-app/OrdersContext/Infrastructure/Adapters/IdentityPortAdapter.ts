import { IdentityValidationPort } from '@orders/app/Ports/IdentityValidationPort.js';
// Cross-context import: use public API module
import { IdentityPort as IdentityContextPort } from '@identity/app/index.js';

/**
 * IdentityPortAdapter - Outbound Adapter (Infrastructure)
 * Implements OrdersContext.IdentityValidationPort (ACL) by calling IdentityContext.IdentityPort (canonical).
 * This is the Anti-Corruption Layer (ACL) that translates between contexts.
 * In a real system, this might call IdentityContext via HTTP or message bus.
 */
export class IdentityPortAdapter implements IdentityValidationPort {
  constructor(private readonly identityContextPort: IdentityContextPort) {}

  async validateToken(token: string): Promise<{ userId: string } | null> {
    return this.identityContextPort.validateToken(token);
  }
}

