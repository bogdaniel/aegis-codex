/**
 * BEFORE: Domain layer with framework dependencies
 * Violates Clean Architecture: Domain depends on frameworks
 */

// ❌ Domain imports framework classes
import { Model } from 'sequelize';
import { Request, Response } from 'express';
import { db } from '../infrastructure/database';

// ❌ Domain entity extends ORM model
export class User extends Model {
  // ❌ Framework-specific annotations
  static associate(models: any) {
    // Sequelize associations
  }

  // ❌ Framework-specific methods
  async save(): Promise<void> {
    await super.save(); // Sequelize save
  }

  // ❌ Domain logic mixed with framework concerns
  static async findByEmail(email: string): Promise<User | null> {
    // ❌ Direct database access in Domain
    return await db.users.findOne({ where: { email } });
  }
}

// ❌ Domain service depends on framework
export class UserService {
  // ❌ Framework types in Domain
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // Business logic
    const user = new User({ email, password });
    await user.save(); // ❌ Framework method

    res.status(201).json({ id: user.id });
  }

  // ❌ Direct database access
  async findById(id: string): Promise<User | null> {
    return await db.users.findOne({ where: { id } });
  }
}

// ❌ Domain event depends on framework
export class UserRegisteredEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly request: Request // ❌ Framework type in Domain
  ) {}
}

// Problems:
// - Domain cannot be tested without framework
// - Domain cannot be reused in different contexts
// - Domain is tightly coupled to infrastructure
// - Changes to framework affect Domain

