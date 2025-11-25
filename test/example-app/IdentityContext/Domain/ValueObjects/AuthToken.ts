/**
 * AuthToken - Value Object
 * Represents an authentication token issued by the Identity context.
 */
export class AuthToken {
  private constructor(
    private readonly token: string,
    private readonly expiresAt: Date,
    private readonly userId: string
  ) {
    if (!token || token.trim().length === 0) {
      throw new Error('Token cannot be empty');
    }
    if (expiresAt <= new Date()) {
      throw new Error('Token expiration must be in the future');
    }
  }

  static create(token: string, expiresAt: Date, userId: string): AuthToken {
    return new AuthToken(token, expiresAt, userId);
  }

  isExpired(): boolean {
    return new Date() >= this.expiresAt;
  }

  getToken(): string {
    return this.token;
  }

  getExpiresAt(): Date {
    return this.expiresAt;
  }

  getUserId(): string {
    return this.userId;
  }

  equals(other: AuthToken): boolean {
    return this.token === other.token;
  }
}

