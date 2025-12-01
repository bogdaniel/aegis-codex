<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Application\UseCase\AuthenticateUser;

use AegisCodex\IdentityContext\Domain\Port\PasswordHasher;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;
use DomainException;

final class AuthenticateUserHandler
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly PasswordHasher $passwordHasher
    ) {
    }

    public function handle(AuthenticateUserCommand $command): UserId
    {
        $email = UserEmail::fromString($command->email);
        $user = $this->userRepository->findByEmail($email);

        if ($user === null) {
            throw new DomainException("Invalid credentials");
        }

        if (!$this->passwordHasher->verify($command->password, $user->passwordHash())) {
            throw new DomainException("Invalid credentials");
        }

        return $user->id();
    }
}

