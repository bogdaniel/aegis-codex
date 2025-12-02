<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Application;

use IdentityContext\Application\Commands\RegisterUserCommand;
use IdentityContext\Application\UseCases\RegisterUser;
use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\Email;
use IdentityContext\Domain\ValueObjects\HashedPassword;
use PHPUnit\Framework\TestCase;

final class RegisterUserTest extends TestCase
{
    private UserRepository $userRepository;
    private RegisterUser $registerUser;

    protected function setUp(): void
    {
        $this->userRepository = $this->createMock(UserRepository::class);
        $this->registerUser = new RegisterUser($this->userRepository);
    }

    public function testRegistersNewUser(): void
    {
        $command = new RegisterUserCommand('test@example.com', 'password123');

        $this->userRepository
            ->expects($this->once())
            ->method('findByEmail')
            ->willReturn(null);

        $this->userRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (User $user) {
                return $user->email()->value() === 'test@example.com';
            }));

        $uuid = $this->registerUser->execute($command);
        $this->assertNotEmpty($uuid);
    }

    public function testThrowsExceptionWhenEmailAlreadyExists(): void
    {
        $command = new RegisterUserCommand('existing@example.com', 'password123');
        $existingUser = User::create(
            'existing-uuid',
            Email::create('existing@example.com'),
            HashedPassword::fromPlainText('password123')
        );

        $this->userRepository
            ->expects($this->once())
            ->method('findByEmail')
            ->willReturn($existingUser);

        $this->userRepository
            ->expects($this->never())
            ->method('save');

        $this->expectException(\DomainException::class);
        $this->expectExceptionMessage('User with this email already exists');
        $this->registerUser->execute($command);
    }

    public function testThrowsExceptionForInvalidEmail(): void
    {
        $command = new RegisterUserCommand('invalid-email', 'password123');

        $this->userRepository
            ->expects($this->never())
            ->method('findByEmail');

        $this->expectException(\InvalidArgumentException::class);
        $this->registerUser->execute($command);
    }
}

