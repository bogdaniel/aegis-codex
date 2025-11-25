import { UserId } from '@identity/domain/ValueObjects/UserId.js';
import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';

/**
 * User - Aggregate Root (Tier H)
 * Encapsulates user identity and credentials.
 * Enforces invariants: email must be unique, password must be hashed.
 */
export class User {
  private constructor(
    private readonly id: UserId,
    private readonly email: UserEmail,
    private readonly passwordHash: string,
    private readonly createdAt: Date
  ) {
    if (!passwordHash || passwordHash.trim().length === 0) {
      throw new Error('Password hash cannot be empty');
    }
  }

  static create(id: UserId, email: UserEmail, passwordHash: string): User {
    return new User(id, email, passwordHash, new Date());
  }

  static reconstitute(
    id: UserId,
    email: UserEmail,
    passwordHash: string,
    createdAt: Date
  ): User {
    return new User(id, email, passwordHash, createdAt);
  }

  getId(): UserId {
    return this.id;
  }

  getEmail(): UserEmail {
    return this.email;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  verifyPassword(providedHash: string): boolean {
    return this.passwordHash === providedHash;
  }
}

