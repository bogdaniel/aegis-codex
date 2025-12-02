<?php

declare(strict_types=1);

namespace IdentityContext\Infrastructure\Security;

use IdentityContext\Domain\ValueObjects\HashedPassword;

final class PasswordHasher
{
    public function hash(string $plainText): string
    {
        $hash = password_hash($plainText, PASSWORD_BCRYPT);
        if ($hash === false) {
            throw new \RuntimeException('Failed to hash password');
        }
        return $hash;
    }

    public function verify(string $plainText, string $hash): bool
    {
        return password_verify($plainText, $hash);
    }
}

