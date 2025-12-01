<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Application\UseCase\RegisterUser;

use AegisCodex\IdentityContext\Domain\Entity\User;
use AegisCodex\IdentityContext\Domain\Event\UserRegistered;
use AegisCodex\IdentityContext\Domain\Port\PasswordHasher;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use AegisCodex\Shared\Application\Port\EventPublisher;
use DomainException;

final class RegisterUserHandler
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly PasswordHasher $passwordHasher,
        private readonly EventPublisher $eventPublisher
    ) {
    }

    public function handle(RegisterUserCommand $command): UserId
    {
        $email = UserEmail::fromString($command->email);

        if ($this->userRepository->findByEmail($email) !== null) {
            throw new DomainException("User with email {$command->email} already exists");
        }

        $userId = UserId::generate();
        $passwordHash = $this->passwordHasher->hash($command->password);

        $user = User::create($userId, $email, $passwordHash);
        $this->userRepository->save($user);

        $this->eventPublisher->publish(
            new UserRegistered($userId, $email)
        );

        return $userId;
    }
}

