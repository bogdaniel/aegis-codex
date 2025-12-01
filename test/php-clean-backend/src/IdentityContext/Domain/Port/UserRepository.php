<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Domain\Port;

use AegisCodex\IdentityContext\Domain\Entity\User;
use AegisCodex\IdentityContext\Domain\ValueObject\UserEmail;
use AegisCodex\IdentityContext\Domain\ValueObject\UserId;

interface UserRepository
{
    public function save(User $user): void;

    public function findById(UserId $id): ?User;

    public function findByEmail(UserEmail $email): ?User;
}

