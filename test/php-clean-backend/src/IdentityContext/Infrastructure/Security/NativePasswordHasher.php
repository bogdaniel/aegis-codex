<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Infrastructure\Security;

use AegisCodex\IdentityContext\Domain\Port\PasswordHasher;

final class NativePasswordHasher implements PasswordHasher
{
    public function hash(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public function verify(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }
}

