import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';
import { AuthToken } from '@identity/domain/ValueObjects/AuthToken.js';
import { UserRepository } from '@identity/domain/Ports/UserRepository.js';
import type { AuthenticateUserCommand } from '@identity/app/Commands/AuthenticateUserCommand.js';

/**
 * AuthenticateUser - Use Case (Application Layer)
 * Issues authentication tokens for valid credentials.
 * No framework dependencies.
 */
export class AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: (password: string) => Promise<string>,
    private readonly generateToken: (userId: string) => string
  ) {}

  async execute(command: AuthenticateUserCommand): Promise<AuthToken> {
    const email = UserEmail.create(command.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const providedHash = await this.hashPassword(command.password);
    if (!user.verifyPassword(providedHash)) {
      throw new Error('Invalid credentials');
    }

    // Issue token
    const token = this.generateToken(user.getId().toString());
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    return AuthToken.create(token, expiresAt, user.getId().toString());
  }
}

