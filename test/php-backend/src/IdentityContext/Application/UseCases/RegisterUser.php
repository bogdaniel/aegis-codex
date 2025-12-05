<?php

declare(strict_types=1);

namespace IdentityContext\Application\UseCases;

use IdentityContext\Application\Commands\RegisterUserCommand;
use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\PasswordHasher;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\UserEmail;

final class RegisterUser
{
    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly PasswordHasher $passwordHasher
    ) {
    }

    public function execute(RegisterUserCommand $command): string
    {
        $email = new UserEmail($command->email);

        $existingUser = $this->userRepository->findByEmail($email->value());
        if ($existingUser !== null) {
            throw new \RuntimeException('User with this email already exists');
        }

        $passwordHash = $this->passwordHasher->hash($command->password);
        $userId = uniqid('user_', true);

        $user = new User($userId, $email->value(), $passwordHash);
        $this->userRepository->save($user);

        return $userId;
    }
}

