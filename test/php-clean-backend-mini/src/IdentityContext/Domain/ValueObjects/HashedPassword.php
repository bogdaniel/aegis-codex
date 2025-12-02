<?php

declare(strict_types=1);

namespace IdentityContext\Domain\ValueObjects;

final class HashedPassword
{
    private function __construct(
        private readonly string $hash
    ) {
        if (empty($hash)) {
            throw new \InvalidArgumentException('Password hash cannot be empty');
        }
    }

    public static function fromHash(string $hash): self
    {
        return new self($hash);
    }

    public function hash(): string
    {
        return $this->hash;
    }

    public function verify(string $plainPassword): bool
    {
        return password_verify($plainPassword, $this->hash);
    }
}

