import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUser } from '@identity/app/UseCases/RegisterUser.js';
import { InMemoryUserRepository } from '@identity/infra/Adapters/InMemoryUserRepository.js';
import { UserEmail } from '@identity/domain/ValueObjects/UserEmail.js';

describe('RegisterUser', () => {
  let registerUser: RegisterUser;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUser = new RegisterUser(
      userRepository,
      async (password: string) => `hashed_${password}` // Simple hash function for testing
    );
  });

  it('should register a new user successfully', async () => {
    const command = {
      email: 'test@example.com',
      password: 'securePassword123',
    };

    await registerUser.execute(command);

    const email = UserEmail.create('test@example.com');
    const user = await userRepository.findByEmail(email);

    expect(user).not.toBeNull();
    expect(user?.getEmail().toString()).toBe('test@example.com');
    expect(user?.getPasswordHash()).toBe('hashed_securePassword123');
  });

  it('should throw error if email already exists', async () => {
    const command = {
      email: 'existing@example.com',
      password: 'password123',
    };

    await registerUser.execute(command);

    await expect(registerUser.execute(command)).rejects.toThrow(
      'User with email existing@example.com already exists'
    );
  });

  it('should hash password before storing', async () => {
    const command = {
      email: 'newuser@example.com',
      password: 'plainPassword',
    };

    await registerUser.execute(command);

    const email = UserEmail.create('newuser@example.com');
    const user = await userRepository.findByEmail(email);

    expect(user?.getPasswordHash()).toBe('hashed_plainPassword');
    expect(user?.getPasswordHash()).not.toBe('plainPassword');
  });
});

