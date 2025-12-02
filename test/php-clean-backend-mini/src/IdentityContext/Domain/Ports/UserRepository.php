<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Ports;

use IdentityContext\Domain\Entities\User;
use IdentityContext\Domain\ValueObjects\UserEmail;

interface UserRepository
{
    public function save(User $user): void;

    public function findByEmail(UserEmail $email): ?User;

    public function findById(string $id): ?User;
}

