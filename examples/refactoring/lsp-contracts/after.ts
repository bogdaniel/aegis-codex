// ✅ GOOD: Repository implementations that preserve the base contract

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
// ✅ PRESERVES CONTRACT: Handles all valid inputs consistently
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    // ✅ Same contract: returns null for invalid/missing, not exception
    if (!id) {
      return null; // ✅ Consistent with base contract
    }
    return this.users.get(id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }
}

// Implementation 2: JpaUserRepository
// ✅ PRESERVES CONTRACT: Returns same shape as interface promises
class JpaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await this.queryDatabase(id);
    if (!result) {
      return null;
    }
    // ✅ Returns same shape: only User fields, no extra fields
    return new User(result.id, result.email);
  }

  async save(user: User): Promise<void> {
    // ✅ Map User to database entity (extra fields handled internally)
    await this.saveToDatabase({
      id: user.id,
      email: user.email,
      // Internal fields (createdAt, updatedAt) handled by JPA
    });
  }

  private async queryDatabase(id: string): Promise<{ id: string; email: string } | null> {
    // Mock database query - returns only User fields
    return null;
  }

  private async saveToDatabase(data: { id: string; email: string }): Promise<void> {
    // Mock database save - maps User to database entity internally
  }
}

// Usage: These implementations can be safely substituted
function processUser(repo: UserRepository, userId: string): Promise<User | null> {
  // ✅ Works with any UserRepository implementation
  // ✅ No need to know which implementation is used
  return repo.findById(userId);
}

// Both implementations work correctly
const inMemoryRepo = new InMemoryUserRepository();
const jpaRepo = new JpaUserRepository();

// ✅ Both can be used interchangeably
await processUser(inMemoryRepo, 'user-1');
await processUser(jpaRepo, 'user-1');

// ✅ Liskov Substitution: subtypes are truly substitutable


