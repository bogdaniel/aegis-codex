<?php

declare(strict_types=1);

namespace IdentityContext\Domain\Entities;

final class User
{
    public function __construct(
        private readonly string $id,
        private readonly string $email,
        private readonly string $passwordHash
    ) {
    }

    public function id(): string
    {
        return $this->id;
    }

    public function email(): string
    {
        return $this->email;
    }

    public function passwordHash(): string
    {
        return $this->passwordHash;
    }
}

