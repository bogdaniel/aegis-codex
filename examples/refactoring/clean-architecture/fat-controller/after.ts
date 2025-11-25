/**
 * AFTER: Thin controller following Clean Architecture
 * Controller only translates HTTP ↔ Application commands
 * Business logic moved to Application use case
 */

import { Request, Response } from 'express';
import { RegisterUser } from '@identity/app/index.js'; // Public API module
import type { RegisterUserCommand } from '@identity/app/index.js';

export class UserController {
  // ✅ Thin controller: only translates HTTP ↔ Application
  constructor(private readonly registerUser: RegisterUser) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      // Map HTTP → Command
      const command: RegisterUserCommand = {
        email: req.body.email,
        password: req.body.password,
      };

      // Delegate to Application use case
      await this.registerUser.execute(command);

      // Map result → HTTP
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle errors (map domain errors to HTTP status codes)
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          res.status(409).json({ error: error.message });
        } else if (error.message.includes('Invalid')) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    }
  }
}

// Application: Use Case (contains business logic)
// File: IdentityContext/Application/UseCases/RegisterUser.ts
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    // ✅ Business logic in Application layer
    const email = UserEmail.create(command.email);
    
    const exists = await this.userRepository.existsByEmail(email);
    if (exists) {
      throw new Error(`User with email ${email.toString()} already exists`);
    }

    const passwordHash = await this.passwordHasher.hash(command.password);
    const userId = UserId.create(this.generateUserId());
    const user = User.create(userId, email, passwordHash);

    await this.userRepository.save(user);
  }

  private generateUserId(): string {
    return `user_${Date.now()}`;
  }
}

