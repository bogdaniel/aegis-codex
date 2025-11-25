/**
 * BEFORE: God class violating SRP
 * This class has multiple responsibilities:
 * - User validation
 * - User persistence
 * - Email formatting
 * - Email sending
 * - Password hashing
 */

export class UserService {
  private db: any; // Database connection
  private emailClient: any; // Email client

  async registerUser(email: string, password: string): Promise<void> {
    // Responsibility 1: Validation
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (!password || password.length < 8) {
      throw new Error('Password too short');
    }

    // Responsibility 2: Password hashing
    const hashedPassword = await this.hashPassword(password);

    // Responsibility 3: Email formatting
    const formattedEmail = email.toLowerCase().trim();

    // Responsibility 4: Persistence
    await this.db.users.insert({
      email: formattedEmail,
      passwordHash: hashedPassword,
    });

    // Responsibility 5: Email sending
    await this.emailClient.send({
      to: formattedEmail,
      subject: 'Welcome',
      body: `Welcome, ${formattedEmail}!`,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    // Password hashing logic
    return `hashed_${password}`;
  }
}

