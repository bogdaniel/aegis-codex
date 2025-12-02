<?php

declare(strict_types=1);

namespace Tests\IdentityContext\Application\UseCases\RegisterUser;

use IdentityContext\Application\Ports\EventPublisher;
use IdentityContext\Application\UseCases\RegisterUser\RegisterUser;
use IdentityContext\Application\UseCases\RegisterUser\RegisterUserCommand;
use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Events\UserRegistered;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\UserEmail;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

final class RegisterUserTest extends TestCase
{
    private UserRepository&MockObject $userRepository;
    private EventPublisher&MockObject $eventPublisher;
    private RegisterUser $registerUser;

    protected function setUp(): void
    {
        $this->userRepository = $this->createMock(UserRepository::class);
        $this->eventPublisher = $this->createMock(EventPublisher::class);
        $this->registerUser = new RegisterUser($this->userRepository, $this->eventPublisher);
    }

    public function testRegistersUserSuccessfully(): void
    {
        $command = new RegisterUserCommand('user@example.com', 'password123');
        
        $this->userRepository
            ->expects($this->once())
            ->method('findByEmail')
            ->willReturn(null);
        
        $this->userRepository
            ->expects($this->once())
            ->method('save')
            ->with($this->callback(function (User $user) {
                return $user->email()->value() === 'user@example.com';
            }));
        
        $this->eventPublisher
            ->expects($this->once())
            ->method('publish')
            ->with($this->isInstanceOf(UserRegistered::class));
        
        $this->registerUser->execute($command);
    }

    public function testThrowsExceptionWhenEmailAlreadyExists(): void
    {
        $command = new RegisterUserCommand('existing@example.com', 'password123');
        
        $existingUser = $this->createMock(User::class);
        $this->userRepository
            ->expects($this->once())
            ->method('findByEmail')
            ->willReturn($existingUser);
        
        $this->userRepository
            ->expects($this->never())
            ->method('save');
        
        $this->eventPublisher
            ->expects($this->never())
            ->method('publish');
        
        $this->expectException(\DomainException::class);
        $this->expectExceptionMessage('User with this email already exists');
        
        $this->registerUser->execute($command);
    }

    public function testThrowsExceptionWhenEmailIsInvalid(): void
    {
        $command = new RegisterUserCommand('invalid-email', 'password123');
        
        $this->userRepository
            ->expects($this->never())
            ->method('findByEmail');
        
        $this->userRepository
            ->expects($this->never())
            ->method('save');
        
        $this->eventPublisher
            ->expects($this->never())
            ->method('publish');
        
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid email format');
        
        $this->registerUser->execute($command);
    }

    public function testPublishesUserRegisteredEventWithCorrectData(): void
    {
        $command = new RegisterUserCommand('user@example.com', 'password123');
        
        $this->userRepository
            ->method('findByEmail')
            ->willReturn(null);
        
        $this->eventPublisher
            ->expects($this->once())
            ->method('publish')
            ->with($this->callback(function (UserRegistered $event) {
                return $event->email === 'user@example.com'
                    && !empty($event->userId)
                    && !empty($event->occurredAt);
            }));
        
        $this->registerUser->execute($command);
    }
}

