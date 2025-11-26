// ✅ GOOD: Focused interfaces (clients depend only on what they use)

// Split into focused interfaces (ports in Domain/Application)

// Interface 1: User management
interface UserRepository {
  create(user: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
}

// Interface 2: Validation
interface UserValidator {
  validateEmail(email: string): boolean;
  validatePassword(password: string): boolean;
}

// Interface 3: Formatting
interface UserFormatter {
  formatName(user: User): string;
  formatEmail(user: User): string;
}

// Interface 4: Email sending
interface EmailSender {
  sendWelcomeEmail(userId: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
}

// Interface 5: Reporting
interface UserReporter {
  generateReport(userId: string): Promise<Report>;
  exportData(userId: string): Promise<string>;
}

class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {}
}

class Report {
  constructor(public readonly content: string) {}
}

// Client 1: Only depends on UserRepository
class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  
  async createUser(email: string, password: string): Promise<User> {
    // ✅ Depends only on UserRepository interface
    // ✅ No dependency on EmailSender, UserReporter, etc.
    const user = new User('generated-id', email, '');
    return await this.userRepository.create(user);
  }
}

// Client 2: Only depends on UserValidator
class RegistrationForm {
  constructor(private readonly validator: UserValidator) {}
  
  validate(email: string, password: string): boolean {
    // ✅ Depends only on UserValidator interface
    // ✅ No dependency on UserRepository, EmailSender, etc.
    return this.validator.validateEmail(email) && 
           this.validator.validatePassword(password);
  }
}

// Client 3: Only depends on EmailSender
class EmailNotificationService {
  constructor(private readonly emailSender: EmailSender) {}
  
  async sendWelcome(userId: string): Promise<void> {
    // ✅ Depends only on EmailSender interface
    // ✅ No dependency on UserRepository, UserReporter, etc.
    await this.emailSender.sendWelcomeEmail(userId);
  }
}

// Client 4: Needs multiple interfaces (composition)
class UserRegistrationUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validator: UserValidator,
    private readonly emailSender: EmailSender
  ) {}
  
  async register(email: string, password: string): Promise<User> {
    // ✅ Depends only on interfaces it actually uses
    if (!this.validator.validateEmail(email) || 
        !this.validator.validatePassword(password)) {
      throw new Error('Validation failed');
    }
    
    const user = new User('generated-id', email, '');
    const created = await this.userRepository.create(user);
    await this.emailSender.sendWelcomeEmail(created.id);
    
    return created;
  }
}

// ✅ Benefits:
// - Clients depend only on interfaces they use
// - Changes to one interface don't affect unrelated clients
// - Interfaces are focused and cohesive
// - Easy to test (mock only what you need)


