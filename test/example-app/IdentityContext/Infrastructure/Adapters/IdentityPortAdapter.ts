import { IdentityPort } from '@identity/app/Ports/IdentityPort.js';
import { ValidateToken } from '@identity/app/UseCases/ValidateToken.js';

/**
 * IdentityPortAdapter - Outbound Adapter (Infrastructure)
 * Implements IdentityPort for cross-context communication.
 * In a real system, this might call Identity via HTTP or message bus.
 * For this example, we use the ValidateToken use case directly.
 */
export class IdentityPortAdapter implements IdentityPort {
  constructor(private readonly validateTokenUseCase: ValidateToken) {}

  async validateToken(token: string): Promise<{ userId: string } | null> {
    return this.validateTokenUseCase.execute({ token });
  }
}

