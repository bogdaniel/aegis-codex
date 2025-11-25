/**
 * BEFORE: Violating DIP
 * High-level modules (use cases) depend on low-level modules (concrete repositories)
 */

import { JpaUserRepository } from '../infrastructure/JpaUserRepository';
import { SmtpEmailService } from '../infrastructure/SmtpEmailService';

// Application use case depends on concrete Infrastructure classes
export class RegisterUser {
  // ❌ Direct dependency on concrete class
  private userRepository = new JpaUserRepository();
  
  // ❌ Direct dependency on concrete class
  private emailService = new SmtpEmailService();

  async execute(email: string, password: string): Promise<void> {
    // Use case is tightly coupled to infrastructure
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }
    
    await this.userRepository.save({ email, password });
    await this.emailService.sendWelcomeEmail(email);
  }
}

// Domain entity depends on infrastructure
export class User {
  // ❌ Domain entity knows about persistence
  save(): void {
    const repo = new JpaUserRepository();
    repo.save(this);
  }
}

