<?php

declare(strict_types=1);

namespace Tests\Unit\IdentityContext\Application\UseCases;

use IdentityContext\Application\Commands\RegisterUserCommand;
use IdentityContext\Application\UseCases\RegisterUser;
use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\PasswordHasher;
use IdentityContext\Domain\Ports\UserRepository;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

final class RegisterUserTest extends TestCase
{
    private UserRepository&MockObject $userRepository;
    private PasswordHasher&MockObject $passwordHasher;
    private RegisterUser $registerUser;

    protected function setUp(): void
    {
        $this->userRepository = $this->createMock(UserRepository::class);
        $this->passwordHasher = $this->createMock(PasswordHasher::class);
        $this->registerUser = new RegisterUser($this->userRepository, $this->passwordHasher);
    }

    public function testRegisterNewUser(): void
    {
        $command = new RegisterUserCommand('test@example.com', 'password123');

        $this->userRepository
            ->expects($this->once())
            ->method('findByEmail')
            ->with('test@example.com')
            ->willReturn(null);

        $this->passwordHasher
            ->expects($this->once())
            ->method('hash')
            ->with('password123')
            ->willReturn('hashed_password');

        $this->userRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (User $user) {
                return $user->email() === 'test@example.com'
                    && $user->passwordHash() === 'hashed_password';
            }));

        $userId = $this->registerUser->execute($command);
        $this->assertStringStartsWith('user_', $userId);
    }

    public function testRegisterExistingUserThrowsException(): void
    {
        $command = new RegisterUserCommand('existing@example.com', 'password123');
        $existingUser = new User('user_123', 'existing@example.com', 'hash');

        $this->userRepository
            ->expects($this->once())
            ->method('findByEmail')
            ->with('existing@example.com')
            ->willReturn($existingUser);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('User with this email already exists');

        $this->registerUser->execute($command);
    }
}

