import { User } from '@identity/domain/Entities/User.js';
import { UserId } from '@identity/domain/ValueObjects/UserId.js';
import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';

/**
 * UserRepository - Port (Interface)
 * Defined in Domain layer; implemented in Infrastructure.
 * No framework dependencies.
 */
export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  existsByEmail(email: UserEmail): Promise<boolean>;
}

