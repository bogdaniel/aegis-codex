<?php

declare(strict_types=1);

namespace AegisCodex\Tests\IdentityContext\Application\UseCase;

use AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser\AuthenticateUserCommand;
use AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser\AuthenticateUserHandler;
use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserCommand;
use AegisCodex\IdentityContext\Application\UseCase\RegisterUser\RegisterUserHandler;
use AegisCodex\IdentityContext\Domain\Port\PasswordHasher;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Infrastructure\Persistence\InMemoryUserRepository;
use AegisCodex\IdentityContext\Infrastructure\Security\NativePasswordHasher;
use AegisCodex\Shared\Application\Port\EventPublisher;
use AegisCodex\Shared\Infrastructure\Event\InMemoryEventPublisher;
use DomainException;
use PHPUnit\Framework\TestCase;

final class AuthenticateUserHandlerTest extends TestCase
{
    private UserRepository $userRepository;
    private PasswordHasher $passwordHasher;
    private EventPublisher $eventPublisher;
    private RegisterUserHandler $registerHandler;
    private AuthenticateUserHandler $authenticateHandler;

    protected function setUp(): void
    {
        $this->userRepository = new InMemoryUserRepository();
        $this->passwordHasher = new NativePasswordHasher();
        $this->eventPublisher = new InMemoryEventPublisher();
        $this->registerHandler = new RegisterUserHandler(
            $this->userRepository,
            $this->passwordHasher,
            $this->eventPublisher
        );
        $this->authenticateHandler = new AuthenticateUserHandler(
            $this->userRepository,
            $this->passwordHasher
        );
    }

    public function testAuthenticateUserWithValidCredentials(): void
    {
        $registerCommand = new RegisterUserCommand('test@example.com', 'password123');
        $userId = $this->registerHandler->handle($registerCommand);

        $authenticateCommand = new AuthenticateUserCommand('test@example.com', 'password123');
        $authenticatedUserId = $this->authenticateHandler->handle($authenticateCommand);

        $this->assertTrue($userId->equals($authenticatedUserId));
    }

    public function testAuthenticateUserWithInvalidEmailThrowsException(): void
    {
        $command = new AuthenticateUserCommand('nonexistent@example.com', 'password123');

        $this->expectException(DomainException::class);
        $this->expectExceptionMessage('Invalid credentials');

        $this->authenticateHandler->handle($command);
    }

    public function testAuthenticateUserWithInvalidPasswordThrowsException(): void
    {
        $registerCommand = new RegisterUserCommand('test@example.com', 'password123');
        $this->registerHandler->handle($registerCommand);

        $authenticateCommand = new AuthenticateUserCommand('test@example.com', 'wrongpassword');

        $this->expectException(DomainException::class);
        $this->expectExceptionMessage('Invalid credentials');

        $this->authenticateHandler->handle($authenticateCommand);
    }
}

