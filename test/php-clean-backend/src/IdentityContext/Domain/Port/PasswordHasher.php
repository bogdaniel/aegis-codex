<?php

declare(strict_types=1);

namespace AegisCodex\IdentityContext\Domain\Port;

interface PasswordHasher
{
    public function hash(string $password): string;

    public function verify(string $password, string $hash): bool;
}

