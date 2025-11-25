import { AuthToken } from '@identity/domain/ValueObjects/AuthToken.js';
import type { ValidateTokenQuery } from '@identity/app/Queries/ValidateTokenQuery.js';

/**
 * ValidateToken - Use Case (Application Layer)
 * Validates tokens and returns user identity.
 * Used by other contexts (e.g., OrdersContext) to verify identity.
 * No framework dependencies.
 */
export class ValidateToken {
  constructor(
    private readonly parseToken: (token: string) => {
      userId: string;
      expiresAt: Date;
    } | null
  ) {}

  async execute(query: ValidateTokenQuery): Promise<{ userId: string } | null> {
    const parsed = this.parseToken(query.token);
    if (!parsed) {
      return null;
    }

    const token = AuthToken.create(
      query.token,
      parsed.expiresAt,
      parsed.userId
    );

    if (token.isExpired()) {
      return null;
    }

    return { userId: token.getUserId() };
  }
}

