<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Infrastructure\Persistence;

use AegisCodex\IdentityContext\Domain\Entity\User;
use AegisCodex\IdentityContext\Domain\Port\UserRepository;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;

final class InMemoryUserRepository implements UserRepository
{
    /** @var array<string, User> */
    private array $users = [];

    /** @var array<string, User> */
    private array $usersByEmail = [];

    public function save(User $user): void
    {
        $idString = $user->id()->toString();
        $emailString = $user->email()->toString();

        $this->users[$idString] = $user;
        $this->usersByEmail[$emailString] = $user;
    }

    public function findById(UserId $id): ?User
    {
        return $this->users[$id->toString()] ?? null;
    }

    public function findByEmail(UserEmail $email): ?User
    {
        return $this->usersByEmail[$email->toString()] ?? null;
    }
}

