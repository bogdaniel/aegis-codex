import { User } from '@identity/domain/Entities/User.js';
import { UserId } from '@identity/domain/ValueObjects/UserId.js';
import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';
import { UserRepository } from '@identity/domain/Ports/UserRepository.js';
import type { RegisterUserCommand } from '@identity/app/Commands/RegisterUserCommand.js';

/**
 * RegisterUser - Use Case (Application Layer)
 * Orchestrates user registration with domain invariants.
 * No framework dependencies.
 */
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: (password: string) => Promise<string>
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    const email = UserEmail.create(command.email);

    // Invariant: email must be unique
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new Error(`User with email ${email.toString()} already exists`);
    }

    // Hash password (domain concern: credentials must be hashed)
    const passwordHash = await this.hashPassword(command.password);

    // Create aggregate
    const userId = UserId.create(this.generateUserId());
    const user = User.create(userId, email, passwordHash);

    // Persist
    await this.userRepository.save(user);
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

