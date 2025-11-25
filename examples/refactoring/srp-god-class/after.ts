/**
 * AFTER: Split into focused classes following SRP and Clean Architecture
 * 
 * Domain Layer:
 * - User (entity) — encapsulates user data and invariants
 * - UserEmail (value object) — email validation and formatting
 * - UserRepository (port) — persistence interface
 * - PasswordHasher (domain service) — password hashing
 * 
 * Application Layer:
 * - RegisterUser (use case) — orchestrates registration
 * - EmailSender (port) — email sending interface
 * 
 * Infrastructure Layer:
 * - JpaUserRepository (adapter) — implements UserRepository
 * - SmtpEmailSender (adapter) — implements EmailSender
 */

// Domain: Value Object
export class UserEmail {
  private constructor(private readonly value: string) {
    if (!value || !value.includes('@')) {
      throw new Error('Invalid email');
    }
  }

  static create(value: string): UserEmail {
    return new UserEmail(value.toLowerCase().trim());
  }

  toString(): string {
    return this.value;
  }
}

// Domain: Entity
export class User {
  private constructor(
    private readonly id: string,
    private readonly email: UserEmail,
    private readonly passwordHash: string
  ) {}

  static create(id: string, email: UserEmail, passwordHash: string): User {
    return new User(id, email, passwordHash);
  }

  getId(): string {
    return this.id;
  }

  getEmail(): UserEmail {
    return this.email;
  }
}

// Domain: Port (interface)
export interface UserRepository {
  save(user: User): Promise<void>;
}

// Domain: Domain Service
export interface PasswordHasher {
  hash(password: string): Promise<string>;
}

// Application: Port (interface)
export interface EmailSender {
  sendWelcomeEmail(email: string): Promise<void>;
}

// Application: Use Case (single responsibility: orchestrate registration)
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly emailSender: EmailSender
  ) {}

  async execute(email: string, password: string): Promise<void> {
    // Responsibility: Validation (delegated to value object)
    const userEmail = UserEmail.create(email);

    // Responsibility: Password validation
    if (!password || password.length < 8) {
      throw new Error('Password too short');
    }

    // Responsibility: Password hashing (delegated to domain service)
    const passwordHash = await this.passwordHasher.hash(password);

    // Responsibility: Create aggregate
    const userId = this.generateUserId();
    const user = User.create(userId, userEmail, passwordHash);

    // Responsibility: Persistence (delegated to repository)
    await this.userRepository.save(user);

    // Responsibility: Email sending (delegated to port)
    await this.emailSender.sendWelcomeEmail(userEmail.toString());
  }

  private generateUserId(): string {
    return `user_${Date.now()}`;
  }
}

// Infrastructure: Adapter (implements UserRepository port)
export class JpaUserRepository implements UserRepository {
  constructor(private readonly db: any) {}

  async save(user: User): Promise<void> {
    await this.db.users.insert({
      id: user.getId(),
      email: user.getEmail().toString(),
      // ... map other fields
    });
  }
}

// Infrastructure: Adapter (implements EmailSender port)
export class SmtpEmailSender implements EmailSender {
  constructor(private readonly emailClient: any) {}

  async sendWelcomeEmail(email: string): Promise<void> {
    await this.emailClient.send({
      to: email,
      subject: 'Welcome',
      body: `Welcome, ${email}!`,
    });
  }
}

