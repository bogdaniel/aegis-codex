<?php

declare(strict_types=1);

namespace IdentityContext\Domain\ValueObjects;

final class HashedPassword
{
    private function __construct(
        private readonly string $hash
    ) {
    }

    public static function fromHash(string $hash): self
    {
        return new self($hash);
    }

    public static function fromPlainText(string $plainText): self
    {
        if (strlen($plainText) < 8) {
            throw new \InvalidArgumentException('Password must be at least 8 characters long');
        }
        
        $hash = password_hash($plainText, PASSWORD_BCRYPT);
        if ($hash === false) {
            throw new \RuntimeException('Failed to hash password');
        }
        return new self($hash);
    }

    public function verify(string $plainText): bool
    {
        return password_verify($plainText, $this->hash);
    }

    public function hash(): string
    {
        return $this->hash;
    }
}

