// ❌ BAD: Large interface with many methods (god interface)

// Large interface that mixes multiple responsibilities
interface UserService {
  // User management
  createUser(email: string, password: string): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<void>;
  deleteUser(id: string): Promise<void>;
  
  // Validation
  validateEmail(email: string): boolean;
  validatePassword(password: string): boolean;
  
  // Formatting
  formatUserName(user: User): string;
  formatUserEmail(user: User): string;
  
  // Email sending
  sendWelcomeEmail(userId: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
  
  // Reporting
  generateUserReport(userId: string): Promise<Report>;
  exportUserData(userId: string): Promise<string>;
}

class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {}
}

// Client 1: Only needs user management
class UserController {
  constructor(private readonly userService: UserService) {}
  
  async createUser(email: string, password: string): Promise<User> {
    // ❌ Depends on entire UserService, but only uses createUser
    // ❌ Forced to depend on methods it doesn't use (sendWelcomeEmail, generateUserReport, etc.)
    return await this.userService.createUser(email, password);
  }
}

// Client 2: Only needs validation
class RegistrationForm {
  constructor(private readonly userService: UserService) {}
  
  validate(email: string, password: string): boolean {
    // ❌ Depends on entire UserService, but only uses validateEmail and validatePassword
    // ❌ Forced to depend on methods it doesn't use
    return this.userService.validateEmail(email) && 
           this.userService.validatePassword(password);
  }
}

// Client 3: Only needs email sending
class EmailNotificationService {
  constructor(private readonly userService: UserService) {}
  
  async sendWelcome(userId: string): Promise<void> {
    // ❌ Depends on entire UserService, but only uses sendWelcomeEmail
    // ❌ Forced to depend on methods it doesn't use
    await this.userService.sendWelcomeEmail(userId);
  }
}

// Problem: Any change to UserService affects all clients, even if they don't use that method
// Problem: Clients are tightly coupled to methods they don't need


