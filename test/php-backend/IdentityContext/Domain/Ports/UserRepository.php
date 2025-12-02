<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Ports;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\ValueObjects\Email;

interface UserRepository
{
    public function save(User $user): void;

    public function findByEmail(Email $email): ?User;

    public function findByUuid(string $uuid): ?User;

    /**
     * @return array<User>
     */
    public function findAll(): array;
}

