<?php

declare(strict_types=1);

namespace AegisCodex\Tests\IdentityContext\Application\UseCase;

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

final class RegisterUserHandlerTest extends TestCase
{
    private UserRepository $userRepository;
    private PasswordHasher $passwordHasher;
    private EventPublisher $eventPublisher;
    private RegisterUserHandler $handler;

    protected function setUp(): void
    {
        $this->userRepository = new InMemoryUserRepository();
        $this->passwordHasher = new NativePasswordHasher();
        $this->eventPublisher = new InMemoryEventPublisher();
        $this->handler = new RegisterUserHandler(
            $this->userRepository,
            $this->passwordHasher,
            $this->eventPublisher
        );
    }

    public function testRegisterUserSuccessfully(): void
    {
        $command = new RegisterUserCommand('test@example.com', 'password123');
        $userId = $this->handler->handle($command);

        $this->assertNotNull($userId);
        $this->assertNotEmpty($userId->toString());

        $user = $this->userRepository->findByEmail(
            \AegisCodex\IdentityContext\Domain\ValueObject\UserEmail::fromString('test@example.com')
        );

        $this->assertNotNull($user);
        $this->assertTrue($user->id()->equals($userId));
        $this->assertEquals('test@example.com', $user->email()->toString());
    }

    public function testRegisterUserWithDuplicateEmailThrowsException(): void
    {
        $command = new RegisterUserCommand('test@example.com', 'password123');
        $this->handler->handle($command);

        $this->expectException(DomainException::class);
        $this->expectExceptionMessage('already exists');

        $this->handler->handle($command);
    }

    public function testRegisterUserPublishesEvent(): void
    {
        $command = new RegisterUserCommand('test@example.com', 'password123');
        $userId = $this->handler->handle($command);

        /** @var \AegisCodex\Shared\Infrastructure\Event\InMemoryEventPublisher $eventPublisher */
        $eventPublisher = $this->eventPublisher;
        $events = $eventPublisher->getPublishedEvents();
        $this->assertCount(1, $events);

        $event = $events[0];
        $this->assertInstanceOf(
            \AegisCodex\IdentityContext\Domain\Event\UserRegistered::class,
            $event
        );
        $this->assertTrue($event->userId()->equals($userId));
    }
}

