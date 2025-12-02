<?php

declare(strict_types=1);

namespace IdentityContext\Infrastructure\Adapters;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\Ports\UserRepository;
use IdentityContext\Domain\ValueObjects\UserEmail;

final class InMemoryUserRepository implements UserRepository
{
    /** @var array<string, User> */
    private array $users = [];

    /** @var array<string, User> */
    private array $usersByEmail = [];

    public function save(User $user): void
    {
        $this->users[$user->id()] = $user;
        $this->usersByEmail[$user->email()->value()] = $user;
    }

    public function findByEmail(UserEmail $email): ?User
    {
        return $this->usersByEmail[$email->value()] ?? null;
    }

    public function findById(string $id): ?User
    {
        return $this->users[$id] ?? null;
    }
}

