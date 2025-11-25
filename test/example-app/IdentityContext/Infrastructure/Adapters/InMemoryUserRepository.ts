import { User } from '@identity/domain/Entities/User.js';
import { UserId } from '@identity/domain/ValueObjects/UserId.js';
import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';
import { UserRepository } from '@identity/domain/Ports/UserRepository.js';

/**
 * InMemoryUserRepository - Outbound Adapter (Infrastructure)
 * Implements UserRepository port using in-memory storage.
 * This is where framework/technical concerns live (e.g., DB, ORM).
 */
export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();
  private readonly usersByEmail = new Map<string, User>();

  async save(user: User): Promise<void> {
    const id = user.getId().toString();
    const email = user.getEmail().toString();
    this.users.set(id, user);
    this.usersByEmail.set(email, user);
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.get(id.toString()) || null;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    return this.usersByEmail.get(email.toString()) || null;
  }

  async existsByEmail(email: UserEmail): Promise<boolean> {
    return this.usersByEmail.has(email.toString());
  }
}

