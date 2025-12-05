<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Ports;

use IdentityContext\Domain\Entities\User;

interface UserRepository
{
    public function save(User $user): void;

    public function findByEmail(string $email): ?User;

    public function findById(string $id): ?User;
}

