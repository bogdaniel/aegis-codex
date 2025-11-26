// ❌ BAD: Repository implementations that violate the base contract

// Base interface (port) defined in Domain
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class User {
  constructor(
    public readonly id: string,
    public readonly email: string
  ) {}
}

// Implementation 1: InMemoryUserRepository
// ❌ VIOLATION: Throws exception for valid input (widens precondition)
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    if (!id) {
      throw new Error('ID is required'); // ❌ Widens precondition: base contract doesn't require this
    }
    return this.users.get(id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }
}

// Implementation 2: JpaUserRepository
// ❌ VIOLATION: Returns different shape (weakens postcondition)
class JpaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Simulating JPA query
    const result = await this.queryDatabase(id);
    if (!result) {
      return null;
    }
    // ❌ Returns different shape: includes extra fields not in User
    return {
      id: result.id,
      email: result.email,
      createdAt: result.createdAt, // ❌ Extra field not in User type
      updatedAt: result.updatedAt  // ❌ Extra field not in User type
    } as User;
  }

  async save(user: User): Promise<void> {
    await this.saveToDatabase(user);
  }

  private async queryDatabase(id: string): Promise<any> {
    // Mock database query
    return null;
  }

  private async saveToDatabase(user: User): Promise<void> {
    // Mock database save
  }
}

// Usage: These implementations cannot be safely substituted
// If code expects UserRepository contract, these will break


