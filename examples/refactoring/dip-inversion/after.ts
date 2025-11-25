/**
 * AFTER: Following DIP
 * High-level modules depend on abstractions (interfaces)
 * Low-level modules implement those abstractions
 */

// Domain: Port (interface) - defined in Domain layer
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// Domain: Port (interface) - defined in Application layer
export interface EmailSender {
  sendWelcomeEmail(email: string): Promise<void>;
}

// Domain: Entity (depends on port interface, not concrete class)
export class User {
  constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly passwordHash: string
  ) {}

  // ✅ Entity doesn't know about persistence implementation
  // Persistence is handled by repository adapter
}

// Application: Use Case (depends on port interfaces, not concrete classes)
export class RegisterUser {
  // ✅ Dependencies injected via constructor
  // ✅ Depend on abstractions (interfaces), not concretions
  constructor(
    private readonly userRepository: UserRepository, // Port interface
    private readonly emailSender: EmailSender // Port interface
  ) {}

  async execute(email: string, password: string): Promise<void> {
    // Use case is decoupled from infrastructure
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }
    
    const newUser = new User('id', email, 'hashed');
    await this.userRepository.save(newUser);
    await this.emailSender.sendWelcomeEmail(email);
  }
}

// Infrastructure: Adapter (implements port interface)
export class JpaUserRepository implements UserRepository {
  constructor(private readonly db: any) {}

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.db.users.findOne({ email });
    return data ? new User(data.id, data.email, data.passwordHash) : null;
  }

  async save(user: User): Promise<void> {
    await this.db.users.insert({
      id: user.getId(),
      email: user.getEmail(),
      passwordHash: user.getPasswordHash(),
    });
  }
}

// Infrastructure: Adapter (implements port interface)
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

// Wiring (Infrastructure layer): Injects concrete adapters into use cases
export function createRegisterUser(): RegisterUser {
  const userRepository = new JpaUserRepository(/* db */);
  const emailSender = new SmtpEmailSender(/* emailClient */);
  return new RegisterUser(userRepository, emailSender);
}

