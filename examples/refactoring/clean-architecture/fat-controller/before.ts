/**
 * BEFORE: Fat controller with business logic
 * Violates Clean Architecture: business logic in Interface layer
 */

import { Request, Response } from 'express';
import { db } from '../infrastructure/database';

export class UserController {
  // ❌ Business logic in controller
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // Business rule: email validation
    if (!email || !email.includes('@')) {
      res.status(400).json({ error: 'Invalid email' });
      return;
    }

    // Business rule: password validation
    if (!password || password.length < 8) {
      res.status(400).json({ error: 'Password too short' });
      return;
    }

    // Business rule: email uniqueness
    const existing = await db.users.findOne({ email });
    if (existing) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    // Business rule: password hashing
    const passwordHash = await bcrypt.hash(password, 10);

    // Business rule: user creation
    const user = await db.users.insert({
      email,
      passwordHash,
      createdAt: new Date(),
    });

    res.status(201).json({ id: user.id, email: user.email });
  }
}

