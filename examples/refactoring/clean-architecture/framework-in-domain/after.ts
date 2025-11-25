/**
 * AFTER: Framework-free Domain following Clean Architecture
 * Domain has no framework dependencies
 * Ports defined in Domain, adapters in Infrastructure
 */

// ✅ Domain: Plain classes, no framework imports

// Domain Entity (framework-free)
export class User {
  private constructor(
    public readonly id: UserId,
    public readonly email: UserEmail,
    private readonly passwordHash: string
  ) {}

  static create(id: UserId, email: UserEmail, passwordHash: string): User {
    return new User(id, email, passwordHash);
  }

  // ✅ Domain logic only, no framework methods
  validatePassword(plainPassword: string, hasher: PasswordHasher): boolean {
    return hasher.verify(plainPassword, this.passwordHash);
  }
}

// Domain Value Objects (framework-free)
export class UserId {
  private constructor(private readonly value: string) {
    if (!value) throw new Error('User ID cannot be empty');
  }

  static create(value: string): UserId {
    return new UserId(value);
  }

  toString(): string {
    return this.value;
  }
}

export class UserEmail {
  private constructor(private readonly value: string) {
    if (!value.includes('@')) throw new Error('Invalid email');
  }

  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  toString(): string {
    return this.value;
  }
}

// ✅ Domain Port (interface, no framework)
export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  existsByEmail(email: UserEmail): Promise<boolean>;
}

// ✅ Domain Service (framework-free)
export class PasswordHasher {
  async hash(plainPassword: string): Promise<string> {
    // Domain logic for password hashing
    // Implementation details in Infrastructure
    throw new Error('Use Infrastructure adapter');
  }

  async verify(plainPassword: string, hash: string): Promise<boolean> {
    // Domain logic for password verification
    throw new Error('Use Infrastructure adapter');
  }
}

// ✅ Domain Event (framework-free)
export class UserRegisteredEvent {
  constructor(
    public readonly userId: UserId,
    public readonly email: UserEmail,
    public readonly occurredAt: Date
  ) {}
}

// ✅ Application Use Case (framework-free)
export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository, // ✅ Port, not framework
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
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

export interface RegisterUserCommand {
  email: string;
  password: string;
}

// ============================================
// Infrastructure: Framework adapters
// ============================================

// ✅ Infrastructure: ORM adapter (implements Domain port)
import { Model } from 'sequelize';

export class SequelizeUserModel extends Model {
  // Sequelize-specific code
}

export class SequelizeUserRepository implements UserRepository {
  constructor(private readonly model: typeof SequelizeUserModel) {}

  async save(user: User): Promise<void> {
    await this.model.create({
      id: user.id.toString(),
      email: user.email.toString(),
      // ... map Domain entity to ORM model
    });
  }

  async findById(id: UserId): Promise<User | null> {
    const record = await this.model.findByPk(id.toString());
    if (!record) return null;
    // Map ORM model to Domain entity
    return User.create(
      UserId.create(record.id),
      UserEmail.create(record.email),
      record.passwordHash
    );
  }

  async existsByEmail(email: UserEmail): Promise<boolean> {
    const count = await this.model.count({ where: { email: email.toString() } });
    return count > 0;
  }
}

// ✅ Infrastructure: HTTP adapter (implements Interface layer)
import { Request, Response } from 'express';

export class UserController {
  constructor(private readonly registerUser: RegisterUser) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const command: RegisterUserCommand = {
        email: req.body.email,
        password: req.body.password,
      };

      await this.registerUser.execute(command);
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// ✅ Benefits:
// - Domain is framework-free and testable
// - Domain can be reused in different contexts
// - Domain is independent of infrastructure changes
// - Clear separation of concerns

